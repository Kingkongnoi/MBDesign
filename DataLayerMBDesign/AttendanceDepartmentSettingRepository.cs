using Dapper;
using EntitiesMBDesign;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayerMBDesign
{
    public class AttendanceDepartmentSettingRepository
    {
        public int? Add(tbAttendanceDepartmentSetting obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbAttendanceDepartmentSetting obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbAttendanceDepartmentSetting
                                set departmentId = @departmentId,
                                attendanceTimeIn = @attendanceTimeIn,
                                attendanceTimeOut = @attendanceTimeOut,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                status = @status
                                where isDeleted = 0 and id = @id
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.departmentId, obj.attendanceTimeIn, obj.attendanceTimeOut, obj.updateDate, obj.updateBy, obj.status, obj.id }, transaction: trans);
        }

        public List<AttendanceDepartmentSettingView> GetAll(string departmentId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(departmentId) && departmentId != "null")
            {
                condition += string.Format(" and a.departmentId = {0}", departmentId);
            }

            string queryString = string.Format(@"SELECT ROW_NUMBER() OVER (ORDER BY a.id) rowNo
            ,a.id
            ,a.departmentId
            ,a.attendanceTimeIn
            ,a.attendanceTimeOut
            ,a.status
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted
            ,b.departmentName
            , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.createBy and isDeleted = 0),'') createByName
            , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.updateBy and isDeleted = 0),'') updateByName
            FROM tbAttendanceDepartmentSetting a inner join tbDepartment b on a.departmentId = b.departmentId
            where a.isDeleted = 0 and b.isDeleted = 0
            {0}
            order by a.createDate DESC", condition);

            return conn.Query<AttendanceDepartmentSettingView>(queryString, new { }, transaction: trans).ToList();
        }

        public AttendanceDepartmentSettingView GetFirstByDepartmentId(int departmentId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
            SELECT top 1 a.id
            ,a.departmentId
            ,a.attendanceTimeIn
            ,a.attendanceTimeOut
            ,a.status
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted
            ,b.departmentName
            FROM tbAttendanceDepartmentSetting a inner join tbDepartment b on a.departmentId = b.departmentId
            where a.isDeleted = 0 and b.isDeleted = 0 and a.departmentId = @departmentId";

            return conn.QuerySingleOrDefault<AttendanceDepartmentSettingView>(queryString, new { departmentId }, transaction: trans);
        }

        public tbAttendanceDepartmentSetting GetFirstById(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
            SELECT top 1 a.id
            ,a.departmentId
            ,a.attendanceTimeIn
            ,a.attendanceTimeOut
            ,a.status
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted
            FROM tbAttendanceDepartmentSetting a
            where a.isDeleted = 0 and a.id = @id";

            return conn.QuerySingleOrDefault<tbAttendanceDepartmentSetting>(queryString, new { id }, transaction: trans);
        }
    }
}

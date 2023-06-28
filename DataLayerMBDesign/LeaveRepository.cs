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
    public class LeaveRepository
    {
        public List<LeaveView> GetAll(string empCode, string empName, string leaveType, string leaveStartDate, string leaveEndDate, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(empCode) && empCode != "null")
            {
                condition += string.Format(" and b.empCode like N'%{0}%'", empCode);
            }

            if (!string.IsNullOrEmpty(empName) && empName != "null")
            {
                condition += string.Format(" and (b.empFirstName + ' ' + b.empLastName) like N'%{0}%'", empName);
            }

            if (!string.IsNullOrEmpty(leaveType) && leaveType != "null")
            {
                condition += string.Format(" and c.leaveTypeName = N'{0}'", leaveType);
            }

            if (!string.IsNullOrEmpty(leaveStartDate) && leaveStartDate != "null")
            {
                condition += string.Format(" and FORMAT(a.leaveStartDate, 'yyyy-MM-dd') = '{0}'", leaveStartDate);
            }

            if (!string.IsNullOrEmpty(leaveEndDate) && leaveEndDate != "null")
            {
                condition += string.Format(" and FORMAT(a.leaveEndDate, 'yyyy-MM-dd') = '{0}'", leaveEndDate);
            }

            string queryString = string.Format(@"select a.leaveId, a.empId, a.leaveTypeId, b.empCode, b.empFirstName + ' ' + b.empLastName empFullName, c.leaveTypeName, a.leaveStartDate, a.leaveEndDate, a.leaveDays, a.createDate, a.createBy, a.updateDate, a.updateBy
                                , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.createBy and isDeleted = 0),'') createByName
                                , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.updateBy and isDeleted = 0),'') updateByName        
                                from tbLeave a inner join tbEmpData b on a.empId = b.id
                                inner join tbLeaveType c on a.leaveTypeId  = c.leaveTypeId
                                where a.isDeleted = 0 and b.isDeleted = 0 and c.isDeleted = 0
                                {0}
                                order by a.leaveId desc
                                ", condition);

            return conn.Query<LeaveView>(queryString, new { }, transaction: trans).ToList();
        }

        public LeaveView GetFirstByKeyId(int leaveId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
            SELECT TOP 1 a.leaveId
            ,a.empId
            ,a.leaveTypeId
            ,a.leaveStartDate
            ,a.leaveEndDate
            ,a.leaveHours
            ,a.leaveDays
            ,a.leaveRemark
            ,a.[status]
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted
			,b.leaveTypeName
            FROM tbLeave a inner join tbLeaveType b on a.leaveTypeId = b.leaveTypeId
            where a.isDeleted = 0 and b.isDeleted = 0 and a.leaveId = @leaveId";

            return conn.QuerySingleOrDefault<LeaveView>(queryString, new { leaveId }, transaction: trans);
        }

        public int? Add(tbLeave obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int UpdateLeave(tbLeave obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbLeave
            set empId = @empId
            ,leaveTypeId = @leaveTypeId
            ,leaveStartDate = @leaveStartDate
            ,leaveEndDate = @leaveEndDate
            ,leaveHours = @leaveHours
            ,leaveDays = @leaveDays
            ,leaveRemark = @leaveRemark
            ,leaveDocument = @leaveDocument
            ,updateDate = @updateDate
            ,updateBy = @updateBy
            ,status = @status
            where leaveId = @leaveId and isDeleted = 0
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.empId, obj.leaveTypeId, obj.leaveStartDate, obj.leaveEndDate, obj.leaveHours, obj.leaveDays,
                obj.leaveRemark, obj.leaveDocument, obj.updateDate, obj.updateBy, obj.status, obj.leaveId }, transaction: trans);
        }
    }
}

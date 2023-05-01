using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using EntitiesMBDesign;

namespace DataLayerMBDesign
{
    public class EmpDataRepository
    {
        public int? Add(tbEmpData obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbEmpData obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbEmpData
                                set empFirstName = @empFirstName,
                                empLastName = @empLastName,
                                departmentId = @departmentId,
                                positionId = @positionId,
                                salaryType = @salaryType,
                                salary = @salary,
                                hiringDate = @hiringDate,
                                signatureFileName = @signatureFileName,
                                timeStampType = @timeStampType,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                status = @status
                                where isDeleted = 0 and id = @id
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.empFirstName, obj.empLastName, obj.departmentId, obj.positionId, obj.salaryType, 
                obj.salary, obj.hiringDate, obj.signatureFileName, obj.timeStampType, obj.updateDate, obj.updateBy, obj.status, obj.id }, transaction: trans);
        }

        public List<EmpDataView> GetAll(string empId, string empName, string departmentId, string positionId, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(empId) && empId != "%%")
            {
                condition += string.Format(" and a.empCode like N'%{0}%'", empId);
            }

            if (!string.IsNullOrEmpty(empName) && empName != "%%")
            {
                condition += string.Format(" and (a.empFirstName + ' ' + a.empLastName) like N'%{0}%'", empName);
            }

            if (!string.IsNullOrEmpty(departmentId) && departmentId != "%%")
            {
                condition += string.Format(" and a.departmentId = {0}", departmentId);
            }

            if (!string.IsNullOrEmpty(positionId) && positionId != "%%")
            {
                condition += string.Format(" and a.positionId = {0}", positionId);
            }

            if (!string.IsNullOrEmpty(status) && status != "%%")
            {
                condition += string.Format(" and a.status = {0}", status);
            }

            string queryString = string.Format(@"select a.id, a.empCode, a.empFirstName + ' ' + a.empLastName fullName, a.departmentId, b.departmentName, a.positionId, c.positionName, a.createDate, a.createBy, a.updateDate, a.updateBy, a.status
                                from tbEmpData a inner join tbDepartment b on a.departmentId = b.departmentId
                                inner join tbPosition c on a.positionId = c.positionId
                                where a.isDeleted = 0
                                {0}
                                order by empCode", condition);

            return conn.Query<EmpDataView>(queryString, new { }, transaction: trans).ToList();
        }

        public tbEmpData GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                                if not exists(select top 1 1 from tbEmpData)
                                begin
	                                SELECT IDENT_CURRENT('tbEmpData') AS id;  
                                end
                                else
                                begin
	                                SELECT IDENT_CURRENT('tbEmpData') + 1 AS id;  
                                end";

            return conn.QueryFirstOrDefault<tbEmpData>(queryString, transaction: trans);
        }

        public EmpDataView GetFirstById(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 select a.id, a.empCode, a.empFirstName + ' ' + a.empLastName fullName, a.departmentId, b.departmentName, a.positionId, c.positionName, a.createDate, a.createBy, a.updateDate, a.updateBy, a.status, 
                                a.hiringDate, a.signatureFileName, a.timeStampType, a.salaryType, a.salary
                                from tbEmpData a inner join tbDepartment b on a.departmentId = b.departmentId
                                inner join tbPosition c on a.positionId = c.positionId
                                where a.isDeleted = 0 and id=@id";

            return conn.QueryFirstOrDefault<EmpDataView>(queryString, new { id }, transaction: trans);
        }
    }
}

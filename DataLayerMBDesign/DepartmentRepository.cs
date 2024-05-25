using Dapper;
using EntitiesMBDesign;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace DataLayerMBDesign
{
    public class DepartmentRepository
    {
        public int? Add(tbDepartment obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbDepartment obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbDepartment
                                set departmentName = @departmentName,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                status = @status
                                where isDeleted = 0 and departmentId = @departmentId
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.departmentName, obj.updateDate, obj.updateBy, obj.status, obj.departmentId }, transaction: trans);
        }

        public List<DepartmentView> GetAll(string departmentname, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(departmentname) && departmentname != "null")
            {
                condition += string.Format(" and departmentName like N'%{0}%'", departmentname);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and status = {0}", status);
            }

            string queryString = string.Format(@"select  a.[departmentId]
                                ,a.[departmentName]
                                ,a.[status]
                                ,a.[createDate]
                                ,a.[createBy]
                                ,a.[updateDate]
                                ,a.[updateBy]
                                , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.createBy and isDeleted = 0),'') createByName
                                , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.updateBy and isDeleted = 0),'') updateByName
                                from tbDepartment a
                                where a.isDeleted = 0
                                {0}
                                order by case when a.updateDate is not null then a.updateDate else a.createDate end desc", condition);

            return conn.Query<DepartmentView>(queryString, new {  }, transaction: trans).ToList();
        }

        public tbDepartment GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                                if not exists(select top 1 1 from tbDepartment)
                                begin
	                                SELECT IDENT_CURRENT('tbDepartment') AS departmentId;  
                                end
                                else
                                begin
	                                SELECT IDENT_CURRENT('tbDepartment') + 1 AS departmentId;  
                                end";

            return conn.QueryFirstOrDefault<tbDepartment>(queryString, transaction:trans);
        }

        public tbDepartment GetFirstById(int departmentId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 [departmentId]
                                ,[departmentName]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                from tbDepartment
                                where isDeleted = 0 and departmentId = @departmentId
                                order by departmentId";

            return conn.QueryFirstOrDefault<tbDepartment>(queryString, new { departmentId }, transaction: trans);
        }

        public tbDepartment GetFirstByName(string departmentName, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@"select top 1 [departmentId]
                                ,[departmentName]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                from tbDepartment
                                where isDeleted = 0 and departmentName = N'{0}'", departmentName);

            return conn.QueryFirstOrDefault<tbDepartment>(queryString, new { departmentName }, transaction: trans);
        }

        public List<tbDepartment> GetAllActiveSelect2(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select departmentId, departmentName
                                from tbDepartment
                                where isDeleted = 0 and status = 1
                                order by departmentName";

            return conn.Query<tbDepartment>(queryString, transaction: trans).ToList();
        }
    }
}

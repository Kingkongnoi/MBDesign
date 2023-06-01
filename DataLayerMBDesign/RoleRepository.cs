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
    public class RoleRepository
    {
        public int? Add(tbRole obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbRole obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbRole
                                set name = @name,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                status = @status
                                where isDeleted = 0 and roleId = @roleId
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.name, obj.updateDate, obj.updateBy, obj.status, obj.roleId }, transaction: trans);
        }

        public List<tbRole> GetAll(string rolename, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(rolename) && rolename != "null")
            {
                condition += string.Format(" and name like N'%{0}%'", rolename);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and status = {0}", status);
            }

            string queryString = string.Format(@"SELECT roleId
                                ,name
                                ,status
                                ,createDate
                                ,createBy
                                ,updateDate
                                ,updateBy
                                ,isDeleted
                                FROM tbRole
                                where isDeleted = 0
                                {0}
                                order by roleId", condition);

            return conn.Query<tbRole>(queryString, new { }, transaction: trans).ToList();
        }

        public tbRole GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                                if not exists(select top 1 1 from tbRole)
                                begin
	                                SELECT IDENT_CURRENT('tbRole') AS roleId;  
                                end
                                else
                                begin
	                                SELECT IDENT_CURRENT('tbRole') + 1 AS roleId;  
                                end";

            return conn.QueryFirstOrDefault<tbRole>(queryString, transaction: trans);
        }

        public tbRole GetFirstById(int roleId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT TOP 1 roleId
                                ,name
                                ,status
                                ,createDate
                                ,createBy
                                ,updateDate
                                ,updateBy
                                ,isDeleted
                                FROM tbRole
                                where isDeleted = 0 and roleId = @roleId
                                order by roleId";

            return conn.QueryFirstOrDefault<tbRole>(queryString, new { roleId }, transaction: trans);
        }

        public tbRole GetFirstByName(string roleName, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@"SELECT TOP 1 roleId
                                ,name
                                ,status
                                ,createDate
                                ,createBy
                                ,updateDate
                                ,updateBy
                                ,isDeleted
                                FROM tbRole
                                where isDeleted = 0 and name = N'{0}'", roleName);

            return conn.QueryFirstOrDefault<tbRole>(queryString, new { roleName }, transaction: trans);
        }

        public List<tbRole> GetAllActiveSelect2(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select roleId, name
                                from tbRole
                                where isDeleted = 0 and status = 1
                                order by name";

            return conn.Query<tbRole>(queryString, transaction: trans).ToList();
        }
    }
}

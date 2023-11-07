using Dapper;
using EntitiesMBDesign;
using System.Data.SqlClient;
using System.Reflection.Emit;
using System.Text;

namespace DataLayerMBDesign
{
    public class SubGroupRepository
    {
        public int? Add(tbSubGroup obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbSubGroup obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" update tbSubGroup");
            queryString.Append(" set groupid = @groupid,");
            queryString.Append(" subgroupname= @subgroupname,");
            queryString.Append(" updateDate = @updateDate,");
            queryString.Append(" updateBy = @updateBy,");
            queryString.Append(" status = @status");
            queryString.Append(" where isDeleted = 0 and id = @id");
            queryString.Append(" select @@ROWCOUNT;");
           
            return conn.QueryFirstOrDefault<int>(queryString.ToString(), new { obj.groupid,obj.subgroupname, obj.updateDate, obj.updateBy, obj.status, obj.id }, transaction: trans);
        }

        public List<SubGroupItemModel> GetAll(string subgroupcode, string subgroupname, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(subgroupcode) && subgroupcode != "null")
            {
                condition += string.Format(" and a.subgroupcode like N'%{0}%'", subgroupcode);
            }

            if (!string.IsNullOrEmpty(subgroupname) && subgroupname != "null")
            {
                condition += string.Format(" and a.subgroupname like N'%{0}%'", subgroupname);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and a.status = {0}", status);
            }

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT a.*,b.groupname");
            queryString.Append(" , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.createBy and isDeleted = 0),'') createByName");
            queryString.Append(" , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.updateBy and isDeleted = 0),'') updateByName");
            queryString.Append(" FROM tbSubGroup a");
            queryString.Append(" INNER JOIN tbGroup b on a.groupid = b.id");
            queryString.Append(" where a.isDeleted = 0");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" order by a.id desc");

            return conn.Query<SubGroupItemModel>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public tbSubGroup GetFirstByName(string subgroupname, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbSubGroup");
            queryString.AppendFormat(" where isDeleted = 0 and subgroupname = N'{0}'", subgroupname);


            return conn.QueryFirstOrDefault<tbSubGroup>(queryString.ToString(), new { subgroupname }, transaction: trans);
        }

        public int GetLastestId(int groupid,SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select Count(groupid)+1 as countgroup from tbSubGroup where groupid = @groupid";

            return conn.QueryFirstOrDefault<int>(queryString, new { groupid }, transaction: trans);
        }

        public tbSubGroup GetFirstById(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 *
                                FROM [tbSubGroup]
                                where isDeleted = 0 and id = @id
                                order by id";

            return conn.QueryFirstOrDefault<tbSubGroup>(queryString, new { id }, transaction: trans);
        }

        public List<tbGroup> GetGroupName(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select id, groupname
                                from tbGroup
                                where isDeleted = 0 and status = 1
                                group by id, groupname
                                order by id";

            return conn.Query<tbGroup>(queryString, new { }, transaction: trans).ToList();
        }
    }
}

using Dapper;
using EntitiesMBDesign;
using System.Data.SqlClient;
using System.Text;

namespace DataLayerMBDesign
{
    public class GroupRepository
    {
        public int? Add(tbGroup obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbGroup obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbGroup
                                set groupname = @groupname,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                status = @status
                                where isDeleted = 0 and id = @id
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.groupname,  obj.updateDate, obj.updateBy, obj.status, obj.id }, transaction: trans);
        }

        public List<GroupItemModel> GetAll(int groupcode, string groupname, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";
            if (groupcode != 0)
            {
                condition += string.Format(" and a.id = {0}", groupcode);
            }

            if (!string.IsNullOrEmpty(groupname) && groupname != "null")
            {
                condition += string.Format(" and a.groupname like N'%{0}%'", groupname);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and a.status = {0}", status);
            }

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT a.*");
            queryString.Append(" , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.createBy and isDeleted = 0),'') createByName");
            queryString.Append(" , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.updateBy and isDeleted = 0),'') updateByName");
            queryString.Append(" FROM tbGroup a");
            queryString.Append(" where isDeleted = 0");
            queryString.AppendFormat(" {0}",condition);
            queryString.Append(" order by case when a.updateDate is not null then a.updateDate else a.createDate end desc");

            return conn.Query<GroupItemModel>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public tbGroup GetFirstByName(string groupname, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbGroup");
            queryString.AppendFormat(" where isDeleted = 0 and groupname = N'{0}'", groupname);
            
            return conn.QueryFirstOrDefault<tbGroup>(queryString.ToString(), new { groupname }, transaction: trans);
        }

        public tbGroup GetFirstById(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 *
                                FROM [tbGroup]
                                where isDeleted = 0 and id = @id
                                order by id";

            return conn.QueryFirstOrDefault<tbGroup>(queryString, new { id }, transaction: trans);
        }

        public tbGroup GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                                if not exists(select top 1 1 from tbGroup)
                                begin
	                                SELECT IDENT_CURRENT('tbGroup') AS id;  
                                end
                                else
                                begin
	                                SELECT IDENT_CURRENT('tbGroup') + 1 AS id;  
                                end";

            return conn.QueryFirstOrDefault<tbGroup>(queryString, transaction: trans);
        }
    }
}

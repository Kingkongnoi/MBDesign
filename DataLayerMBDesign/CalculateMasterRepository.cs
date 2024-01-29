using Dapper;
using EntitiesMBDesign;
using System.Data.SqlClient;
using System.Text;

namespace DataLayerMBDesign
{
    public class CalculateMasterRepository
    {
        public int? Add(tbCalculateMaster obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                                if not exists(select top 1 1 from tbCalculateMaster)
                                begin
	                                SELECT IDENT_CURRENT('tbCalculateMaster') AS id;  
                                end
                                else
                                begin
	                                SELECT IDENT_CURRENT('tbCalculateMaster') + 1 AS id;  
                                end";

            return conn.QueryFirstOrDefault<int>(queryString, transaction: trans);
        }

        public int Update(tbCalculateMaster obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbCalculateMaster
                                set updateDate = @updateDate,
                                updateBy = @updateBy
                                where isDeleted = 0 and id = @id
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.calculatecode, obj.updateDate, obj.updateBy, obj.id }, transaction: trans);
        }

        public List<tbCalculateMaster> GetAll(int id, string CalCode, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";
            if (id != 0)
            {
                condition += string.Format(" and a.id = {0}", id);
            }

            if (!string.IsNullOrEmpty(CalCode) && CalCode != "null")
            {
                condition += string.Format(" and a.calculatecode like N'%{0}%'", CalCode);
            }

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT a.*");
            queryString.Append(" FROM tbCalculateMaster a");
            queryString.Append(" where isDeleted = 0");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" order by id desc");

            return conn.Query<tbCalculateMaster>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public tbCalculateMaster GetFirstCalculatecode(string calculatecode, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbCalculateMaster");
            queryString.AppendFormat(" where isDeleted = 0 and calculatecode = N'{0}'", calculatecode);

            return conn.QueryFirstOrDefault<tbCalculateMaster>(queryString.ToString(), new { calculatecode }, transaction: trans);
        }

        //public tbStock GetFirstById(int id, SqlConnection conn, SqlTransaction? trans = null)
        //{
        //    string queryString = @"select top 1 *
        //                        FROM [tbStock]
        //                        where isDeleted = 0 and id = @id
        //                        order by id";

        //    return conn.QueryFirstOrDefault<tbStock>(queryString, new { id }, transaction: trans);
        //}

        //public tbStock GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        //{
        //    string queryString = @"
        //                        if not exists(select top 1 1 from tbStock)
        //                        begin
        //                         SELECT IDENT_CURRENT('tbStock') AS id;  
        //                        end
        //                        else
        //                        begin
        //                         SELECT IDENT_CURRENT('tbStock') + 1 AS id;  
        //                        end";

        //    return conn.QueryFirstOrDefault<tbStock>(queryString, transaction: trans);
        //}
    }
}

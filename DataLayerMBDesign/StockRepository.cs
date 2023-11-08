using Dapper;
using EntitiesMBDesign;
using System.Data.SqlClient;
using System.Text;

namespace DataLayerMBDesign
{
    public class StockRepository
    {
        public int? Add(tbStock obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbStock obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbStock
                                set stockname = @stockname,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                status = @status
                                where isDeleted = 0 and id = @id
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.stockname, obj.updateDate, obj.updateBy, obj.status, obj.id }, transaction: trans);
        }

        public List<StockItemModel> GetAll(int stockid, string stockname, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";
            if (stockid != 0)
            {
                condition += string.Format(" and a.id = {0}", stockid);
            }

            if (!string.IsNullOrEmpty(stockname) && stockname != "null")
            {
                condition += string.Format(" and a.stockname like N'%{0}%'", stockname);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and a.status = {0}", status);
            }

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT a.*");
            queryString.Append(" , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.createBy and isDeleted = 0),'') createByName");
            queryString.Append(" , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.updateBy and isDeleted = 0),'') updateByName");
            queryString.Append(" FROM tbStock a");
            queryString.Append(" where isDeleted = 0");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" order by id desc");

            return conn.Query<StockItemModel>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public tbStock GetFirstByName(string stockname, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbStock");
            queryString.AppendFormat(" where isDeleted = 0 and stockname = N'{0}'", stockname);

            return conn.QueryFirstOrDefault<tbStock>(queryString.ToString(), new { stockname }, transaction: trans);
        }

        public tbStock GetFirstById(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 *
                                FROM [tbStock]
                                where isDeleted = 0 and id = @id
                                order by id";

            return conn.QueryFirstOrDefault<tbStock>(queryString, new { id }, transaction: trans);
        }

        public tbStock GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                                if not exists(select top 1 1 from tbStock)
                                begin
	                                SELECT IDENT_CURRENT('tbStock') AS id;  
                                end
                                else
                                begin
	                                SELECT IDENT_CURRENT('tbStock') + 1 AS id;  
                                end";

            return conn.QueryFirstOrDefault<tbStock>(queryString, transaction: trans);
        }
    }
}

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

        public List<listQuotationNumber> GetListQuotationNumbersCal(string type ,SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString =string.Format (@"select co.orderId,co.quotationNumber from tbCustOrder co
                                    inner join tbDesign3D d on co.orderId = d.orderId
                                    inner join tbSpec s on s.orderid = co.orderId
									inner join tbSpecListDetail sd on s.id = sd.specid
                                   where co.status = 1 and d.checklistStatusId =14  and d.orderId not in (select isnull(orderid,'') from tbCalculateMaster  where ISNULL(isDeleted,0) = 0 and calculatetype ='{0}')
                                   and sd.checkliststatus = 5
								   AND sd.transactionActive='A' and sd.transactionStatus = 'A'
                                  ",type);

            return conn.Query<listQuotationNumber>(queryString, transaction: trans).ToList();
        }

      

        public int getSpecID(int orderID, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@"
                                select s.id from tbSpec s
                                inner join tbCustOrder co on s.orderid = co.orderid
                                where s.status =1 and co.orderid = {0}", orderID);

            return conn.QueryFirstOrDefault<int>(queryString, new { orderID }, transaction: trans);
        }
    }
}

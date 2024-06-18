using Dapper;
using EntitiesMBDesign;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayerMBDesign
{
    public class PlanksRepository
    {
        public int? Add(tbPlanks obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbPlanks obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" update tbPlanks");
            //queryString.Append(" set orderid= @orderid,");
            queryString.Append(" SET updateDate = @updateDate,");
            queryString.Append(" updateBy = @updateBy,");
            queryString.Append(" status = @status");
            queryString.Append(" where isDeleted = 0 and id = @id");
            queryString.Append(" select @@ROWCOUNT;");

            return conn.QueryFirstOrDefault<int>(queryString.ToString(), new { obj.orderid, obj.updateDate, obj.updateBy, obj.status, obj.id }, transaction: trans);
        }

        public List<PlanksListItem> GetAll(string quatationcode, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(quatationcode) && quatationcode != "null")
            {
                condition += string.Format(" and b.quotationNumber like N'%{0}%'", quatationcode);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and a.status = {0}", status);
            }

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT a.id");
            queryString.Append(" ,a.orderid");
            queryString.Append(" ,b.quotationNumber");
            queryString.Append(" ,(select sum(amount) from tbPlanksDetails where plankid = a.id and thicknesstype = 1) amount18mm");
            queryString.Append(" ,(select sum(amount) from tbPlanksDetails where plankid = a.id and thicknesstype = 2) amount9mm");
            queryString.Append(" ,a.status");
            queryString.Append(" ,a.createBy");
            queryString.Append(" ,a.updateBy");
            queryString.Append(" FROM tbPlanks a");
            queryString.Append(" INNER JOIN tbCustOrder b on a.orderid = b.orderId");
            queryString.Append(" where a.isDeleted = 0");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" order by a.id desc");

            return conn.Query<PlanksListItem>(queryString.ToString(), new { }, transaction: trans).ToList();
        }
        public int GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                                if not exists(select top 1 1 from tbPlanks)
                                begin
	                                SELECT IDENT_CURRENT('tbPlanks') AS id;  
                                end
                                else
                                begin
	                                SELECT IDENT_CURRENT('tbPlanks') + 1 AS id;  
                                end";

            return conn.QueryFirstOrDefault<int>(queryString, transaction: trans);
        }

        public PlankWithCode GetFirstByID(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 a.*,b.quotationNumber");
            queryString.Append(" FROM tbPlanks a");
            queryString.Append(" INNER JOIN tbCustOrder b on a.orderid = b.orderid");
       
            queryString.AppendFormat(" where a.isDeleted = 0 and a.id = {0}", id);


            return conn.QueryFirstOrDefault<PlankWithCode>(queryString.ToString(), new { id }, transaction: trans);
        }

        public PlankWithCode GetFirstByOrderID(int orderid, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 a.*,b.quotationNumber");
            queryString.Append(" FROM tbPlanks a");
            queryString.Append(" INNER JOIN tbCustOrder b on a.orderid = b.orderid");

            queryString.AppendFormat(" where a.isDeleted = 0 and a.orderid = {0}", orderid);


            return conn.QueryFirstOrDefault<PlankWithCode>(queryString.ToString(), new { orderid }, transaction: trans);
        }

        public List<tbPlanksDetails> GetDetailsByID(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string sql = string.Format(@"SELECT * From tbPlanksDetails
                           WHERE plankid = {0}",id);
            return conn.Query<tbPlanksDetails>(sql.ToString(), new { id }, transaction: trans).ToList();
        }

        public List<tbCustOrder> GetCustOrderList(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select a.*
                                   FROM tbCustOrder a
                                   INNER JOIN tbDesign3D b on a.orderid = b.orderid
                                   WHERE a.status=1 and a.isDeleted = 0
                                   and b.checklistStatus = N'แบบ 3D Final'";
            //StringBuilder queryString = new StringBuilder();
            //queryString.Append(" SELECT a.*");
            //queryString.Append(" FROM tbCustOrder a");
            //queryString.Append(" INNER JOIN tb a");
            //queryString.Append(" FROM tbCustOrder a");
            //queryString.Append(" FROM tbCustOrder a");
            //queryString.Append(" FROM tbCustOrder a");
            //queryString.Append(" FROM tbCustOrder a");
            //queryString.Append(" FROM tbCustOrder a");
            //queryString.Append(" FROM tbCustOrder a");
            //queryString.Append(" FROM tbCustOrder a");
            //queryString.Append(" FROM tbCustOrder a");
            //queryString.Append(" FROM tbCustOrder a");
            //queryString.AppendFormat(" where isDeleted = 0 and id = {0}");

            return conn.QueryFirstOrDefault<List<tbCustOrder>>(queryString.ToString(), transaction: trans);
        }

        public int getSpecID(int orderID, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@"
                                select s.id from tbSpec s
                                inner join tbCustOrder co on s.orderid = co.orderid
                                where s.status =1 and co.orderid = {0}",orderID);

            return conn.QueryFirstOrDefault<int>(queryString,new { orderID}, transaction: trans);
        }
    }
}

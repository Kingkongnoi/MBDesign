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
            queryString.Append(" set orderid= @orderid,");
            queryString.Append(" colorCode = @colorCode,");
            queryString.Append(" thickness18MM = @thickness18MM,");
            queryString.Append(" thickness9MM = @thickness9MM,");
            queryString.Append(" updateDate = @updateDate,");
            queryString.Append(" updateBy = @updateBy,");
            queryString.Append(" status = @status");
            queryString.Append(" where isDeleted = 0 and id = @id");
            queryString.Append(" select @@ROWCOUNT;");

            return conn.QueryFirstOrDefault<int>(queryString.ToString(), new { obj.orderid,obj.colorCode,obj.thickness18MM,obj.thickness9MM, obj.updateDate, obj.updateBy, obj.status, obj.id }, transaction: trans);
        }

        public List<PlanksItemModel> GetAll(string quatationcode, string status, SqlConnection conn, SqlTransaction? trans = null)
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
            queryString.Append(" ,a.colorCode");
            queryString.Append(" ,a.thickness18MM");
            queryString.Append(" ,a.thickness9MM");
            queryString.Append(" ,a.status");
            queryString.Append(" ,a.createBy");
            queryString.Append(" ,a.updateBy");
            queryString.Append(" FROM tbPlanks a");
            queryString.Append(" INNER JOIN tbCustOrder b on a.orderid = b.id");
            queryString.Append(" where a.isDeleted = 0");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" order by a.id desc");

            return conn.Query<PlanksItemModel>(queryString.ToString(), new { }, transaction: trans).ToList();
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

        public tbPlanks GetFirstByID(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbPlanks");
            queryString.AppendFormat(" where isDeleted = 0 and id = {0}", id);


            return conn.QueryFirstOrDefault<tbPlanks>(queryString.ToString(), new { id }, transaction: trans);
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
    }
}

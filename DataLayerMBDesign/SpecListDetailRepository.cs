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
    public class SpecListDetailRepository
    {
        public int? Add(tbSpecListDetail obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }
        public tbSpecListDetail GetFirstByID(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbSpecListDetail");
            queryString.AppendFormat(" where isDeleted = 0 and id = {0}", id);


            return conn.QueryFirstOrDefault<tbSpecListDetail>(queryString.ToString(), new { id }, transaction: trans);
        }
        //public int Update(tbSpecListDetail obj, SqlConnection conn, SqlTransaction? trans = null)
        //{
        //    StringBuilder queryString = new StringBuilder();
        //    queryString.Append(" update tbSpecListDetail");
        //    queryString.Append(" set orderid= @orderid,");
        //    queryString.Append(" updateDate = @updateDate,");
        //    queryString.Append(" updateBy = @updateBy");
        //    //queryString.Append(" status = @status");
        //    queryString.Append(" where isDeleted = 0 and id = @id");
        //    queryString.Append(" select @@ROWCOUNT;");

        //    return conn.QueryFirstOrDefault<int>(queryString.ToString(), new { obj.orderid, obj.updateDate, obj.updateBy, obj.id }, transaction: trans);
        //}
    }
}

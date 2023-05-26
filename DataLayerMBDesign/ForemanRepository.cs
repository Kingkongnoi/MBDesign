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
    public class ForemanRepository
    {
        public int? Add(tbForeman obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }
        public int UpdateForemanStatus(int orderId, string foremanStatus, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"UPDATE tbForeman
            SET [foremanStatus] = @foremanStatus
            WHERE orderId = @orderId
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { orderId, foremanStatus }, transaction: trans);
        }

        public List<tbForeman> GetForemanStatus(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select foremanStatus
            from tbForeman
            where isDeleted = 0 and [status] = 1
            group by foremanStatus
            order by foremanStatus";

            return conn.Query<tbForeman>(queryString, transaction: trans).ToList();
        }

        public tbForeman GetByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT TOP 1 id
            ,orderId
            ,foremanStatus
            ,[status]
            ,createDate
            ,createBy
            ,updateDate
            ,updateBy
            ,isDeleted
            FROM tbForeman
            where orderId = @orderId and isDeleted = 0 and status = 1";

            return conn.QueryFirstOrDefault<tbForeman>(queryString, new { orderId }, transaction: trans);
        }
    }
}

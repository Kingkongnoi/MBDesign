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

        public ForemanView GetEditForemanByForemanId(int foremanId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @" select top 1 a.*, isnull(b.quotationNumber,'') quotationNumber, isnull(c.contractNumber, '') contractNumber
            from tbForeman a inner join tbCustOrder b on a.orderId = b.orderId
            inner join tbContractAgreement c on b.quotationNumber = c.quotationNumber
            where a.isDeleted = 0 and a.status = 1 and b.isDeleted = 0 and b.status = 1 and c.isDeleted = 0 and c.status = 1
            and a.id = @foremanId";

            return conn.QueryFirstOrDefault<ForemanView>(queryString, new { foremanId }, transaction: trans);
        }
    }
}

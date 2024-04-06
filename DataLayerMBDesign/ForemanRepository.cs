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
        public int UpdateForemanStatus(int orderId, int foremanStatusId, DateTime updateDate, string updateBy, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"UPDATE tbForeman
            SET [foremanStatusId] = @foremanStatusId,
            updateDate = @updateDate,
            updateBy = @updateBy
            WHERE orderId = @orderId
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { orderId, foremanStatusId, updateDate, updateBy }, transaction: trans);
        }

        public List<ForemanView> GetForemanStatus(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select b.name foremanStatus 
			from tbContractAgreement a inner join tbstatus b on a.isDeleted = 0 and b.isDeleted = 0
            inner join tbCategory c on b.categoryId = c.categoryId and c.isDeleted = 0
            where c.name = N'Foreman'
			group by b.name 
			order by b.name";

            return conn.Query<ForemanView>(queryString, transaction: trans).ToList();
        }

        public ForemanView GetByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT TOP 1 id
            ,orderId
            ,isnull((select top 1 name from tbStatus where isDeleted = 0 and status = 1 and statusId = isnull(foremanStatusId,0)),'') foremanStatus
            ,foremanStatusId
            ,[status]
            ,createDate
            ,createBy
            ,updateDate
            ,updateBy
            ,isDeleted
            FROM tbForeman
            where orderId = @orderId and isDeleted = 0 and status = 1";

            return conn.QueryFirstOrDefault<ForemanView>(queryString, new { orderId }, transaction: trans);
        }

        public ForemanView GetEditForemanByForemanId(int foremanId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @" select top 1 a.id
            ,a.orderId
            ,isnull((select top 1 name from tbStatus where isDeleted = 0 and status = 1 and statusId = isnull(a.foremanStatusId,0)),'') foremanStatus
            ,a.foremanStatusId
            ,a.[status]
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted, isnull(b.quotationNumber,'') quotationNumber, isnull(c.contractNumber, '') contractNumber, 
            b.orderNote, b.orderNotePrice, b.discount, b.vat, b.grandTotal, b.accountId, d.accountName, d.accountNumber, d.accountType, d.bank
            from tbForeman a inner join tbCustOrder b on a.orderId = b.orderId
            inner join tbContractAgreement c on b.quotationNumber = c.quotationNumber
            inner join tbBankAccount d on b.accountId = d.accountId
            where a.isDeleted = 0 and a.status = 1 and b.isDeleted = 0 and b.status = 1 and c.isDeleted = 0 and c.status = 1 and d.isDeleted = 0 and d.status = 1
            and a.id = @foremanId";

            return conn.QueryFirstOrDefault<ForemanView>(queryString, new { foremanId }, transaction: trans);
        }
    }
}

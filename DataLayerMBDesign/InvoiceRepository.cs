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
    public class InvoiceRepository
    {
        public int? Add(tbInvoice obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }
        public int UpdateInvoiceStatus(tbInvoice obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbInvoice
                                set [period] = @period,
                                invoiceStatus = @invoiceStatus,
                                updateDate = @updateDate,
                                updateBy = @updateBy
                                where isDeleted = 0 and id = @id
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.period, obj.invoiceStatus, obj.updateDate, obj.updateBy, obj.id }, transaction: trans);
        }
        public int GetLastestInvoiceNumberByYearMonthGen(string yearMonthGen, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 isnull(invoiceNumberGen,0) invoiceNumberGen
            from tbInvoice
            where invoiceYearMonthGen = @yearMonthGen
            order by invoiceNumberGen desc";

            return conn.QueryFirstOrDefault<int>(queryString, new { yearMonthGen }, transaction: trans);
        }

        public tbInvoice GetFirstByOrderIdAndCustId(int orderId, int custId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT TOP 1 id
                                ,invoiceNumber
                                ,invoiceNumberGen
                                ,invoiceYearMonthGen
                                ,quotationNumber
                                ,[period]
                                ,orderId
                                ,custId
                                ,unitPrice
                                ,invoiceStatus
                                ,[status]
                                ,createDate
                                ,createBy
                                ,updateDate
                                ,updateBy
                                ,isDeleted
                                FROM tbInvoice
                                where orderId = @orderId and custId = @custId and isDeleted = 0 and status = 1
                                order by id desc";

            return conn.QueryFirstOrDefault<tbInvoice>(queryString, new { orderId, custId }, transaction:trans);
        }

        public List<tbInvoice> GetInvoiceStatus(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"	select invoiceStatus 
			from tbInvoice 
			where isDeleted = 0 
			group by invoiceStatus 
			order by invoiceStatus";

            return conn.Query<tbInvoice>(queryString, transaction: trans).ToList();
        }
    }
}

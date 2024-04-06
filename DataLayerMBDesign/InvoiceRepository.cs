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
                                set [periodStatusId] = @periodStatusId,
                                orderId=@orderId,
                                custId=@custId,
                                invoiceStatusId = @invoiceStatusId,
                                unitPrice = @unitPrice,
                                updateDate = @updateDate,
                                updateBy = @updateBy
                                where isDeleted = 0 and id = @id
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.periodStatusId, obj.orderId, obj.custId, obj.invoiceStatusId, obj.unitPrice, obj.updateDate, obj.updateBy, obj.id }, transaction: trans);
        }
        public int GetLastestInvoiceNumberByYearMonthGen(string yearMonthGen, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 isnull(invoiceNumberGen,0) invoiceNumberGen
            from tbInvoice
            where invoiceYearMonthGen = @yearMonthGen
            order by invoiceNumberGen desc";

            return conn.QueryFirstOrDefault<int>(queryString, new { yearMonthGen }, transaction: trans);
        }

        public InvoiceView GetFirstByOrderIdAndCustId(int orderId, int custId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT TOP 1 id
                                ,invoiceNumber
                                ,invoiceNumberGen
                                ,invoiceYearMonthGen
                                ,quotationNumber
                                ,isnull((select top 1 name from tbStatus where isDeleted = 0 and status = 1 and statusId = isnull(periodStatusId,0)),'') [period]
                                ,orderId
                                ,custId
                                ,unitPrice
                                ,isnull((select top 1 name from tbStatus where isDeleted = 0 and status = 1 and statusId = isnull(invoiceStatusId,0)),'') invoiceStatus
                                ,[status]
                                ,createDate
                                ,createBy
                                ,updateDate
                                ,updateBy
                                ,isDeleted
                                ,invoiceStatusId
								,periodStatusId
                                FROM tbInvoice
                                where orderId = @orderId and custId = @custId and isDeleted = 0 and status = 1
                                order by id desc";

            return conn.QueryFirstOrDefault<InvoiceView>(queryString, new { orderId, custId }, transaction:trans);
        }

        public List<InvoiceView> GetInvoiceStatus(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @" select b.name invoiceStatus 
			from tbInvoice a inner join tbstatus b on a.isDeleted = 0 and b.isDeleted = 0
            inner join tbCategory c on b.categoryId = c.categoryId and c.isDeleted = 0
            where c.name = N'Invoice'
			group by b.name 
			order by b.name";

            return conn.Query<InvoiceView>(queryString, transaction: trans).ToList();
        }

        public InvoiceView GetByInvoiceId(int invoiceId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT TOP 1 id
                                ,invoiceNumber
                                ,invoiceNumberGen
                                ,invoiceYearMonthGen
                                ,quotationNumber
                                ,isnull((select top 1 name from tbStatus where isDeleted = 0 and status = 1 and statusId = isnull(periodStatusId,0)),'') [period]
                                ,orderId
                                ,custId
                                ,unitPrice
                                ,isnull((select top 1 name from tbStatus where isDeleted = 0 and status = 1 and statusId = isnull(invoiceStatusId,0)),'')  invoiceStatus
                                ,[status]
                                ,createDate
                                ,createBy
                                ,updateDate
                                ,updateBy
                                ,isDeleted
								,invoiceStatusId
								,periodStatusId
                                FROM tbInvoice
                                where id = @invoiceId and isDeleted = 0 and status = 1
                                order by id desc";

            return conn.QueryFirstOrDefault<InvoiceView>(queryString, new { invoiceId }, transaction: trans);
        }

        public InvoiceView GetFirstByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT TOP 1 id
                                ,invoiceNumber
                                ,invoiceNumberGen
                                ,invoiceYearMonthGen
                                ,quotationNumber
                                ,isnull((select top 1 name from tbStatus where isDeleted = 0 and status = 1 and statusId = isnull(periodStatusId,0)),'') [period]
                                ,orderId
                                ,custId
                                ,unitPrice
                                ,isnull((select top 1 name from tbStatus where isDeleted = 0 and status = 1 and statusId = isnull(invoiceStatusId,0)),'')  invoiceStatus
                                ,[status]
                                ,createDate
                                ,createBy
                                ,updateDate
                                ,updateBy
                                ,isDeleted
                                ,invoiceStatusId
                                ,periodStatusId
                                FROM tbInvoice
                                where orderId = @orderId and isDeleted = 0 and status = 1
                                order by id desc";

            return conn.QueryFirstOrDefault<InvoiceView>(queryString, new { orderId }, transaction: trans);
        }
    }
}

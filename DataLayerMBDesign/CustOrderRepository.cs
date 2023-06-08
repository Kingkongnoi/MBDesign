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
    public class CustOrderRepository
    {
        public int? Add(tbCustOrder obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbCustOrder obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"UPDATE tbCustOrder
            SET quotationType = @quotationType
            ,[installDate] = @installDate
            ,[orderNote] = @orderNote
            ,[discount] = @discount
            ,[subTotal] = @subTotal
            ,[grandTotal] = @grandTotal
            ,[disposite] = @disposite
            ,[accountId] = @accountId
            ,[updateDate] = @updateDate
            ,[updateBy] = @updateBy
            ,[status] = @status
            ,[orderStatus] = @orderStatus
            ,[quotationComment] = @quotationComment
            ,[orderNotePrice] = @orderNotePrice
            WHERE orderId = @orderId and isDeleted = 0
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.quotationType, obj.installDate, obj.orderNote, obj.discount, obj.subTotal, obj.grandTotal, obj.disposite, obj.accountId, 
                obj.updateDate, obj.updateBy, obj.status, obj.orderStatus, obj.quotationComment, obj.orderNotePrice, obj.orderId }, transaction: trans);
        }
        public int UpdateForeman(tbCustOrder obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"UPDATE tbCustOrder
            SET [orderNote] = @orderNote
            ,[discount] = @discount
            ,[subTotal] = @subTotal
            ,[grandTotal] = @grandTotal
            ,[disposite] = @disposite
            ,[updateDate] = @updateDate
            ,[updateBy] = @updateBy
            ,[orderNotePrice] = @orderNotePrice
            WHERE orderId = @orderId and isDeleted = 0
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new
            {
                obj.orderNote,
                obj.discount,
                obj.subTotal,
                obj.grandTotal,
                obj.disposite,
                obj.updateDate,
                obj.updateBy,
                obj.orderNotePrice,
                obj.orderId
            }, transaction: trans);
        }
        public int GetLastestQuotationNumberByTypeAndYearMonthGen(string type, string yearMonthGen, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 isnull(quotationNumberGen,0) quotationNumberGen
                                from tbCustOrder
                                where quotationNumberType = @type and quotationYearMonthGen = @yearMonthGen
                                order by quotationNumberGen desc";

            return conn.QueryFirstOrDefault<int>(queryString, new { type, yearMonthGen }, transaction: trans);
        }
        public tbCustOrder GetFirstByOrderIdSortDesc(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 *
                                from tbCustOrder
                                where orderId = @orderId and isDeleted = 0
                                order by orderId desc";

            return conn.QueryFirstOrDefault<tbCustOrder>(queryString, new { orderId }, transaction: trans);
        }
        public List<CustOrderView> GetQuotationList(string quotationNumber, string quotationCusName, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(quotationNumber) && quotationNumber != "null")
            {
                condition += string.Format(" and a.quotationNumber like '%{0}%'", quotationNumber);
            }

            if (!string.IsNullOrEmpty(quotationCusName) && quotationCusName != "null")
            {
                condition += string.Format(" and (b.custFirstName + ' ' + b.custSurName) like N'%{0}%'", quotationCusName);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and a.orderStatus = N'{0}'", status);
            }
            string queryString = string.Format(@"select a.orderId, a.quotationNumber, b.custFirstName + ' ' + b.custSurName fullName, a.createDate, a.createBy, a.updateDate, a.updateBy, a.orderStatus
                                from tbCustOrder a inner join tbCust b on a.custId = b.custId 
                                where a.isDeleted = 0 and b.isDeleted = 0
                                {0}
                                order by orderId", condition);

            return conn.Query<CustOrderView>(queryString, transaction:trans ).ToList();

        }
        public List<CustOrderView> GetOrderDetailByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
            SELECT co.orderId,co.quotationType,co.custId,co.installDate,isnull(co.orderNote,'') orderNote,isnull(co.orderNotePrice,0) orderNotePrice,co.discount,co.vat,co.subTotal,co.grandTotal,co.disposite,co.accountId,co.quotationNumber,co.quotationFileName,co.[status],co.createDate,co.installDate
            ,co.createBy,co.updateDate,co.updateBy,co.isDeleted,co.quotationNumberGen,co.quotationNumberType,co.orderStatus, isnull(co.quotationComment,'') quotationComment, cd.itemId, cd.orderLength, cd.orderDepth, cd.orderHeight, isnull(cio.custOrderDetailId,0) custOrderDetailId, 
            isnull(cio.custOrderItemOptionsId,0) custOrderItemOptionsId, p.itemName, p.itemPrice, isnull(cio.optionsId,0) optionsId, isnull(pio.options,'') options, isnull(pio.optionsPrice,0) optionsPrice,
            ps.styleId, ps.styleName,cd.[floor], cd.[zone]
            FROM tbCustOrder co inner join tbCustOrderDetail cd on co.orderId = cd.orderId and co.isDeleted = 0 and cd.isDeleted = 0
            left join tbCustOrderItemOptions cio on cd.custOrderDetailId = cio.custOrderDetailId and isnull(cio.isDeleted,0) = 0
            left join tbProductItem p on cd.itemId = p.itemId and isnull(p.isDeleted,0) = 0
            left join tbProductItemOptions pio on cio.optionsId = pio.optionsId and isnull(pio.isDeleted,0) = 0
            left join tbProductStyle ps on cd.styleId = ps.styleId and isnull(ps.isDeleted,0) = 0
            where cd.orderId = @orderId
            ";

            return conn.Query<CustOrderView>(queryString, new { orderId }, transaction:trans).ToList();
        }
        public CustOrderView GetCustOrderByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 a.orderId
            ,a.quotationType
            ,a.custId
            ,a.installDate
            ,a.orderNote
            ,a.discount
            ,a.vat
            ,a.subTotal
            ,a.grandTotal
            ,a.disposite
            ,a.accountId
            ,a.quotationNumber
            ,a.quotationFileName
            ,a.status
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted
            ,a.quotationNumberGen
            ,a.quotationNumberType
            ,a.orderStatus
            ,a.quotationComment
            ,a.orderNotePrice, b.accountName, b.accountNumber, b.accountType, b.bank
            , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.createBy and isDeleted = 0),'') createByName
            , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.updateBy and isDeleted = 0),'') updateByName  
            from tbCustOrder a inner join tbBankAccount b on a.accountId = b.accountId
            where a.orderId = @orderId and a.isDeleted = 0 and b.isDeleted = 0
            order by a.orderId desc";

            return conn.QueryFirstOrDefault<CustOrderView>(queryString, new { orderId }, transaction: trans);
        }
        public List<CustOrderView> GetDesign3DList(string quotationNumber, string empName, string checklistStatus, string installDate, string orderStatus, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(quotationNumber) && quotationNumber != "null")
            {
                condition += string.Format(" and a.quotationNumber like '%{0}%'", quotationNumber);
            }

            if (!string.IsNullOrEmpty(empName) && empName != "null")
            {
                condition += string.Format(" and isnull(c.empFirstName + ' ' + c.empLastName,'') like N'%{0}%'", empName);
            }

            if (!string.IsNullOrEmpty(checklistStatus) && checklistStatus != "null")
            {
                condition += string.Format(" and isnull(b.checklistStatus,'') = N'{0}'", checklistStatus);
            }

            if (!string.IsNullOrEmpty(installDate) && installDate != "null")
            {
                condition += string.Format(" and  FORMAT(a.installDate, 'yyyy-MM-dd') = N'{0}'", installDate);
            }

            if (!string.IsNullOrEmpty(orderStatus))
            {
                condition += string.Format(" and a.orderStatus = N'{0}'", orderStatus);
            }

            string queryString = string.Format(@"select a.orderId, b.id design3dId, a.quotationNumber, a.installDate, isnull(c.empFirstName + ' ' + c.empLastName,'') ownerEmpName, b.dueDate, isnull(b.checklistStatus,'') checklistStatus,
            case when b.updateDate is not null then b.updateDate else b.createDate end lastUpdateDate,
            case when b.updateBy is not null then isnull(b.updateBy,'') else isnull(b.createBy,'') end lastUpdateBy
            from tbCustOrder a left join tbDesign3D b on a.orderId = isnull(b.orderId,0)
            left join tbEmpData c on isnull(b.ownerEmpId,0) = isnull(c.id,0)
            where a.isDeleted = 0 and a.[status] = 1 and isnull(b.isDeleted,0) = 0  and isnull(c.isDeleted,0) = 0
            {0}
            order by a.orderId
            ", condition);

            return conn.Query<CustOrderView>(queryString, transaction: trans).ToList();
        }
        public List<CustOrderView> GetForemanList(string quotationNumber, string cusName, string foremanStatus, string installDate, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(quotationNumber) && quotationNumber != "null")
            {
                condition += string.Format(" and a.quotationNumber like '%{0}%'", quotationNumber);
            }

            if (!string.IsNullOrEmpty(cusName) && cusName != "null")
            {
                condition += string.Format(" and isnull(c.custFirstName + ' ' + c.custSurName,'') like N'%{0}%'", cusName);
            }

            if (!string.IsNullOrEmpty(foremanStatus) && foremanStatus != "null")
            {
                condition += string.Format(" and isnull(b.foremanStatus,'') = N'{0}'", foremanStatus);
            }

            if (!string.IsNullOrEmpty(installDate) && installDate != "null")
            {
                condition += string.Format(" and  FORMAT(a.installDate, 'yyyy-MM-dd') = N'{0}'", installDate);
            }

            string queryString = string.Format(@"select a.orderId, d.id foremanId, a.quotationNumber, a.installDate, isnull(c.custFirstName + ' ' + c.custSurName,'') cusName, isnull(b.foremanStatus,'') foremanStatus,
            case when b.updateDate is not null then b.updateDate else b.createDate end lastUpdateDate,
            case when b.updateBy is not null then isnull(b.updateBy,'') else isnull(b.createBy,'') end lastUpdateBy
            from tbCustOrder a left join tbForeman b on a.orderId = isnull(b.orderId,0)
            left join tbCust c on isnull(a.custId,0) = isnull(c.custId,0)
            inner join tbForeman d on a.orderId = d.orderId and isnull(d.isDeleted,0) = 0
            where a.isDeleted = 0 and a.[status] = 1 and isnull(b.isDeleted,0) = 0  and isnull(c.isDeleted,0) = 0
            {0}
            order by a.orderId
            ", condition);

            return conn.Query<CustOrderView>(queryString, transaction: trans).ToList();
        }
        public int GetCountCustOrderWaitForApprove(string orderStatus, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@"select count(*) from tbCustOrder where orderStatus = N'{0}' and isDeleted = 0 and status = 1", orderStatus);

            return conn.QueryFirstOrDefault<int>(queryString, transaction: trans);
        }
        public List<CustOrderView> GetAllByorderStatus(string orderStatus, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@"SELECT a.orderId
            ,a.quotationType
            ,a.custId
            ,a.installDate
            ,a.orderNote
            ,a.discount
            ,a.vat
            ,a.subTotal
            ,a.grandTotal
            ,a.disposite
            ,a.accountId
            ,a.quotationNumber
            ,a.quotationFileName
            ,a.[status]
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted
            ,a.quotationNumberGen
            ,a.quotationNumberType
            ,a.orderStatus
            ,a.quotationComment
            ,a.orderNotePrice
            ,a.quotationYearMonthGen
            ,b.custFirstName + ' ' + b.custSurName cusName
            from tbCustOrder a inner join tbCust b on a.custId = b.custId
            where a.isDeleted = 0 and a.[status] = 1 and b.isDeleted = 0 and b.[status] = 1
            and a.orderStatus = N'{0}'
            order by a.orderId", orderStatus);

            return conn.Query<CustOrderView>(queryString, transaction: trans).ToList();
        }
        public int UpdateOrderStatus(int orderId, string orderStatus, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"UPDATE tbCustOrder
            SET [orderStatus] = @orderStatus
            WHERE orderId = @orderId and isDeleted = 0
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new{ orderId, orderStatus }, transaction: trans);
        }
        public CustOrderView GetAccountingByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 a.orderId, b.custFirstName, b.custSurName, b.custFirstName + ' ' + b.custSurName fullName, b.custAddress, isnull(a.quotationNumber,'') quotationNumber, isnull(c.contractNumber,'') contractNumber, isnull(c.contractStatus,'') contractStatus, isnull(d.invoiceStatus,'') invoiceStatus, isnull(d.period,'') invoicePeriod,
            c.createDate contractCreateDate, c.createBy contractCreateBy, c.updateDate contractUpdateDate, c.updateBy contractUpdateBy, a.grandTotal, a.custId
            from tbCustOrder a inner join tbCust b on a.custId = b.custId and a.isDeleted = 0 and b.isDeleted = 0
            left join tbContractAgreement c on a.custId = c.custId and isnull(c.isDeleted,0) = 0
            left join tbInvoice d on a.custId = d.custId and isnull(d.isDeleted,0) = 0
            where a.status = 1 and b.status = 1 and isnull(c.status,1) = 1 and isnull(d.status,1) = 1
            and a.orderId = @orderId";

            return conn.QueryFirstOrDefault<CustOrderView>(queryString, new { orderId }, transaction: trans);
        }
        public List<CustOrderView> GetAccountingListByParams(string contractNumber, string quotationNumber, string customerName, string contractStatus, string contractCreateDate, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(contractNumber) && contractNumber != "null")
            {
                condition += string.Format(" and c.contractNumber like '%{0}%'", contractNumber);
            }

            if (!string.IsNullOrEmpty(quotationNumber) && quotationNumber != "null")
            {
                condition += string.Format(" and a.quotationNumber like '%{0}%'", quotationNumber);
            }

            if (!string.IsNullOrEmpty(customerName) && customerName != "null")
            {
                condition += string.Format(" and isnull(b.custFirstName + ' ' + b.custSurName,'') like N'%{0}%'", customerName);
            }

            if (!string.IsNullOrEmpty(contractStatus) && contractStatus != "null")
            {
                condition += string.Format(" and isnull(c.contractStatus,'') = N'{0}'", contractStatus);
            }

            if (!string.IsNullOrEmpty(contractCreateDate) && contractCreateDate != "null")
            {
                condition += string.Format(" and  FORMAT(c.createDate, 'yyyy-MM-dd') = N'{0}'", contractCreateDate);
            }

            string queryString = string.Format(@"select a.orderId, b.custFirstName, b.custSurName, b.custFirstName + ' ' + b.custSurName fullName, b.custAddress, isnull(a.quotationNumber,'') quotationNumber, isnull(c.contractNumber,'') contractNumber, isnull(c.contractStatus,'') contractStatus, isnull(d.invoiceStatus,'') invoiceStatus, isnull(d.period,'') invoicePeriod,
            c.createDate contractCreateDate, c.createBy contractCreateBy, c.updateDate contractUpdateDate, c.updateBy contractUpdateBy, isnull(c.id,0) contractId, isnull(d.id,0) invoiceId, a.custId
            from tbCustOrder a inner join tbCust b on a.custId = b.custId and a.isDeleted = 0 and b.isDeleted = 0
            left join tbContractAgreement c on a.custId = c.custId and isnull(c.isDeleted,0) = 0
            left join tbInvoice d on a.custId = d.custId and isnull(d.isDeleted,0) = 0
            where a.status = 1 and b.status = 1 and isnull(c.status,1) = 1 and isnull(d.status,1) = 1
            {0}
            order by a.orderId", condition);

            return conn.Query<CustOrderView>(queryString, transaction: trans).ToList();
        }
        public List<CustOrderView> GetInvoiceListByParams(string quotationNumber, string invoiceNumber, string customerName, string invoiceStatus, string invoiceDate, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(quotationNumber) && quotationNumber != "null")
            {
                condition += string.Format(" and a.quotationNumber like '%{0}%'", quotationNumber);
            }

            if (!string.IsNullOrEmpty(invoiceNumber) && invoiceNumber != "null")
            {
                condition += string.Format(" and d.invoiceNumber like '%{0}%'", invoiceNumber);
            }

            if (!string.IsNullOrEmpty(customerName) && customerName != "null")
            {
                condition += string.Format(" and isnull(b.custFirstName + ' ' + b.custSurName,'') like N'%{0}%'", customerName);
            }

            if (!string.IsNullOrEmpty(invoiceStatus) && invoiceStatus != "null")
            {
                condition += string.Format(" and isnull(d.invoiceStatus,'') = N'{0}'", invoiceStatus);
            }

            if (!string.IsNullOrEmpty(invoiceDate) && invoiceDate != "null")
            {
                condition += string.Format(" and  FORMAT(d.createDate, 'yyyy-MM-dd') = N'{0}'", invoiceDate);
            }

            string queryString = string.Format(@"select a.orderId, b.custFirstName, b.custSurName, b.custFirstName + ' ' + b.custSurName fullName, b.custInstallAddress, b.custTel, isnull(a.quotationNumber,'') quotationNumber, isnull(d.invoiceStatus,'') invoiceStatus, isnull(d.period,'') invoicePeriod,
            isnull(d.id,0) invoiceId, a.custId, d.createDate, d.createBy, d.updateDate, d.updateBy, d.invoiceNumber
            from tbCustOrder a inner join tbCust b on a.custId = b.custId and a.isDeleted = 0 and b.isDeleted = 0
            inner join tbInvoice d on a.custId = d.custId and isnull(d.isDeleted,0) = 0
            where a.status = 1 and b.status = 1 and isnull(d.status,1) = 1
            {0}
            order by a.orderId", condition);

            return conn.Query<CustOrderView>(queryString, transaction: trans).ToList();
        }
        public List<tbCustOrder> GetQuotaionSelect2(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"	select quotationNumber, orderId
            from tbCustOrder
            where isDeleted = 0 and status = 1
            group by quotationNumber,orderId
            order by quotationNumber,orderId";

            return conn.Query<tbCustOrder>(queryString, transaction: trans).ToList();
        }
        public List<CustOrderView> GetReceiptListByParams(string invoiceNumber, string receiptNumber, string customerName, string receiptDate, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(invoiceNumber) && invoiceNumber != "null")
            {
                condition += string.Format(" and d.invoiceNumber like '%{0}%'", invoiceNumber);
            }

            if (!string.IsNullOrEmpty(receiptNumber) && receiptNumber != "null")
            {
                condition += string.Format(" and e.receiptNumber like '%{0}%'", receiptNumber);
            }

            if (!string.IsNullOrEmpty(customerName) && customerName != "null")
            {
                condition += string.Format(" and isnull(b.custFirstName + ' ' + b.custSurName,'') like N'%{0}%'", customerName);
            }

            if (!string.IsNullOrEmpty(receiptDate) && receiptDate != "null")
            {
                condition += string.Format(" and  FORMAT(e.createDate, 'yyyy-MM-dd') = N'{0}'", receiptDate);
            }

            string queryString = string.Format(@"select a.orderId, b.custFirstName, b.custSurName, b.custFirstName + ' ' + b.custSurName fullName, b.custInstallAddress, b.custTel, isnull(a.quotationNumber,'') quotationNumber, isnull(d.invoiceStatus,'') invoiceStatus, isnull(d.period,'') invoicePeriod,
            isnull(d.id,0) invoiceId, a.custId, e.createDate, e.createBy, e.updateDate, e.updateBy, d.invoiceNumber, e.receiptNumber, e.id receiptId
            from tbCustOrder a inner join tbCust b on a.custId = b.custId and a.isDeleted = 0 and b.isDeleted = 0
            inner join tbInvoice d on a.custId = d.custId and isnull(d.isDeleted,0) = 0
            inner join tbReceipt e on d.id = e.invoiceId and isnull(e.isDeleted,0) = 0
            where a.status = 1 and b.status = 1 and isnull(d.status,1) = 1
            and isnull(d.invoiceStatus,'') = N'จ่ายแล้ว'
            {0}
            order by a.orderId", condition);

            return conn.Query<CustOrderView>(queryString, transaction: trans).ToList();
        }
    }
}

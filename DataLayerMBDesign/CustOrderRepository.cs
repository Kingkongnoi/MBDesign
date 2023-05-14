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

            if (!string.IsNullOrEmpty(quotationNumber) && quotationNumber != "%%")
            {
                condition += string.Format(" and a.quotationNumber like '%{0}%'", quotationNumber);
            }

            if (!string.IsNullOrEmpty(quotationCusName) && quotationCusName != "%%")
            {
                condition += string.Format(" and (b.custFirstName + ' ' + b.custSurName) like N'%{0}%'", quotationCusName);
            }

            if (!string.IsNullOrEmpty(status) && status != "%%")
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
            ,a.orderNotePrice, b.accountName, b.accountNumber, b.accountType
            from tbCustOrder a inner join tbBankAccount b on a.accountId = b.accountId
            where a.orderId = @orderId and a.isDeleted = 0 and b.isDeleted = 0
            order by a.orderId desc";

            return conn.QueryFirstOrDefault<CustOrderView>(queryString, new { orderId }, transaction: trans);
        }

    }
}

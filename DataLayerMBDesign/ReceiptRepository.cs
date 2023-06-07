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
    public class ReceiptRepository
    {
        public int? Add(tbReceipt obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int GetLastestReceiptNumberByYearMonthGen(string yearMonthGen, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 isnull(receiptNumber,0) receiptNumber
            from tbReceipt
            where receiptYearMonthGen = @yearMonthGen
            order by receiptNumberGen desc";

            return conn.QueryFirstOrDefault<int>(queryString, new { yearMonthGen }, transaction: trans);
        }

        public tbReceipt GetFirstByOrderIdAndCustId(int orderId, int custId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT TOP 1 id
                                ,receiptNumber  
                                ,receiptNumberGen
                                ,receiptYearMonthGen
                                ,orderId
                                ,custId
                                ,invoiceId
                                ,[status]
                                ,createDate
                                ,createBy
                                ,updateDate
                                ,updateBy
                                ,isDeleted
                                FROM tbReceipt
                                where orderId = @orderId and custId = @custId and isDeleted = 0 and status = 1
                                order by id desc";

            return conn.QueryFirstOrDefault<tbReceipt>(queryString, new { orderId, custId }, transaction: trans);
        }

        public tbReceipt GetByReceiptId(int receiptId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT TOP 1 id
                                ,receiptNumber
                                ,receiptNumberGen
                                ,receiptYearMonthGen
                                ,orderId
                                ,custId
                                ,invoiceId
                                ,[status]
                                ,createDate
                                ,createBy
                                ,updateDate
                                ,updateBy
                                ,isDeleted
                                FROM tbReceipt
                                where id = @receiptId and isDeleted = 0 and status = 1
                                order by id desc";

            return conn.QueryFirstOrDefault<tbReceipt>(queryString, new { receiptId }, transaction: trans);
        }
    }
}

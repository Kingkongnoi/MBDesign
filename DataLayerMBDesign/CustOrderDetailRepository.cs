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
    public class CustOrderDetailRepository
    {
        public int? Add(tbCustOrderDetail obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public List<CustOrderDetailView> GetByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select a.custOrderDetailId
            ,a.orderId
            ,a.styleId
            ,a.[floor]
            ,a.[zone]
            ,a.typeId
            ,a.itemId
            ,a.orderLength
            ,a.orderDepth
            ,a.orderHeight
            ,a.[status]
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted
            ,b.itemName
            ,b.itemPrice
            FROM tbCustOrderDetail a inner join tbProductItem b on a.itemId = b.itemId
            where a.orderId = @orderId and a.isDeleted = 0 and b.isDeleted = 0
            order by a.custOrderDetailId";

            return conn.Query<CustOrderDetailView>(queryString, new { orderId }, transaction: trans).ToList();

        }

        public int HardDeleteByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"delete tbCustOrderDetail where orderId = @orderId and isDeleted = 0
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { orderId }, transaction: trans);
        }
    }
}

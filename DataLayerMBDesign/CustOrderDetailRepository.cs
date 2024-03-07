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
            ,isnull(b.itemName,'') itemName
            ,isnull(b.itemPrice,0) itemPrice
            ,(select top 1 styleName from tbProductStyle where styleId = a.styleId and isDeleted = 0) styleName
            ,c.typeName
			,c.typePrice
            FROM tbCustOrderDetail a left join tbProductItem b on isnull(a.itemId,0) = isnull(b.itemId,0)
            inner join tbProductType c on a.typeId = c.typeId
            where a.orderId = @orderId and isnull(a.isDeleted,0) = 0 and isnull(b.isDeleted,0) = 0 and isnull(c.isDeleted,0) = 0
            order by a.custOrderDetailId";

            return conn.Query<CustOrderDetailView>(queryString, new { orderId }, transaction: trans).ToList();

        }

        public int HardDeleteByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"delete tbCustOrderDetail where orderId = @orderId and isDeleted = 0
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { orderId }, transaction: trans);
        }

        public int UpdateForemanValue(tbCustOrderDetail obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"UPDATE tbCustOrderDetail
            SET [orderLength] = @orderLength,
            [orderDepth] = @orderDepth,
            [orderHeight] = @orderHeight,
            [updateDate] = @updateDate,
            [updateBy] = @updateBy
            WHERE custOrderDetailId = @custOrderDetailId
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.orderLength, obj.orderDepth, obj.orderHeight, obj.updateDate, obj.updateBy, obj.custOrderDetailId }, transaction: trans);
        }
    }
}

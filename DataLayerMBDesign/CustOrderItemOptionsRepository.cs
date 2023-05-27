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
    public class CustOrderItemOptionsRepository
    {
        public int? Add(tbCustOrderItemOptions obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public List<CustOrderItemOptionsView> GetItemOptionsByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select a.custOrderItemOptionsId
            ,a.custOrderDetailId
            ,a.optionsId
            ,a.[status]
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted 
            ,b.options
            ,b.optionsPrice
            from tbCustOrderItemOptions a inner join tbProductItemOptions b on a.optionsId = b.optionsId
            where a.custOrderDetailId in 
            (SELECT custOrderDetailId FROM tbCustOrderDetail where orderId = @orderId and isDeleted = 0)
            and a.isDeleted = 0 and b.isDeleted = 0";

            return conn.Query<CustOrderItemOptionsView>(queryString, new { orderId }, transaction: trans).ToList();
        }

        public int HardDeleteByCustOrderDetailId(int custOrderDetailId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"delete tbCustOrderItemOptions where custOrderDetailId = @custOrderDetailId and isDeleted = 0
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { custOrderDetailId }, transaction: trans);
        }
    }
}

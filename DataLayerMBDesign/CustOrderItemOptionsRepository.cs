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

        public List<tbCustOrderItemOptions> GetItemOptionsByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select custOrderItemOptionsId
            ,custOrderDetailId
            ,optionsId
            ,[status]
            ,createDate
            ,createBy
            ,updateDate
            ,updateBy
            ,isDeleted 
            from tbCustOrderItemOptions where custOrderDetailId in 
            (SELECT custOrderDetailId FROM tbCustOrderDetail where orderId = @orderId and isDeleted = 0)
            and isDeleted = 0";

            return conn.Query<tbCustOrderItemOptions>(queryString, new { orderId }, transaction: trans).ToList();
        }

        public int HardDeleteByCustOrderDetailId(int custOrderDetailId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"delete tbCustOrderItemOptions where custOrderDetailId = @custOrderDetailId and isDeleted = 0
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { custOrderDetailId }, transaction: trans);
        }
    }
}

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

        public List<tbCustOrderDetail> GetByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT custOrderDetailId
            ,orderId
            ,styleId
            ,[floor]
            ,[zone]
            ,typeId
            ,itemId
            ,orderLength
            ,orderDepth
            ,orderHeight
            ,[status]
            ,createDate
            ,createBy
            ,updateDate
            ,updateBy
            ,isDeleted
            FROM tbCustOrderDetail
            where orderId = @orderId and isDeleted = 0
            order by custOrderDetailId";

            return conn.Query<tbCustOrderDetail>(queryString, new { orderId }, transaction: trans).ToList();

        }

        public int HardDeleteByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"delete tbCustOrderDetail where orderId = @orderId and isDeleted = 0
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { orderId }, transaction: trans);
        }
    }
}

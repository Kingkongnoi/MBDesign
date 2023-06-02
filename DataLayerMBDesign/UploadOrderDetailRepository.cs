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
    public class UploadOrderDetailRepository
    {
        public int? Add(tbUploadOrderDetail obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }
        public List<UploadOrderDetailView> GetByOrderIdAndOrderDetailId(int orderId, int orderDetailId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT a.uploadOrderDetailId
            ,a.orderId
            ,a.orderDetailId
            ,a.uploadCategoryId
            ,a.urlId
            ,a.[status]
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted
            ,b.name categoryName
            ,c.[url]
            ,c.[fileName]
            ,c.fileSize
            FROM tbUploadOrderDetail a inner join tbUploadCategory b  on a.uploadCategoryId = b.id
            inner join tbUploadUrl c on a.urlId = c.urlId
            where a.isDeleted = 0 and b.isDeleted = 0 and a.status = 1 and b.status = 1 and c.isDeleted = 0 and c.status = 1
            and a.orderId = @orderId and a.orderDetailId = @orderDetailId
            order by a.uploadOrderDetailId";

            return conn.Query<UploadOrderDetailView>(queryString, new { orderId, orderDetailId }, transaction: trans).ToList();
        }
        public List<UploadOrderDetailView> GetByOrderIdAndOrderDetailIdWithCategory(int orderId, int orderDetailId, string categoryName, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT a.uploadOrderDetailId
            ,a.orderId
            ,a.orderDetailId
            ,a.uploadCategoryId
            ,a.urlId
            ,a.[status]
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted
            ,b.name categoryName
            ,c.[url]
            ,c.[fileName]
            ,c.fileSize
            FROM tbUploadOrderDetail a inner join tbUploadCategory b  on a.uploadCategoryId = b.id
            inner join tbUploadUrl c on a.urlId = c.urlId
            where a.isDeleted = 0 and b.isDeleted = 0 and a.status = 1 and b.status = 1 and c.isDeleted = 0 and c.status = 1
            and a.orderId = @orderId and a.orderDetailId = @orderDetailId and b.name = @categoryName
            order by a.uploadOrderDetailId";

            return conn.Query<UploadOrderDetailView>(queryString, new { orderId, orderDetailId, categoryName }, transaction: trans).ToList();
        }
    }
}

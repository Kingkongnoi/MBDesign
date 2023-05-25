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
    public class UploadRepository
    {
        public int? Add(tbUpload obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public List<UploadView> GetByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT a.uploadId
            ,a.orderId
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
            FROM tbUpload a inner join tbUploadCategory b  on a.uploadCategoryId = b.id
            inner join tbUploadUrl c on a.urlId = c.urlId
            where a.isDeleted = 0 and b.isDeleted = 0 and a.status = 1 and b.status = 1 and c.isDeleted = 0 and c.status = 1
            and a.orderId = @orderId
            order by a.uploadId";

            return conn.Query<UploadView>(queryString, new { orderId }, transaction: trans).ToList();
        }

        public List<UploadView> GetByOrderIdWithCategoryName(int orderId, string categoryName, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT a.uploadId
            ,a.orderId
            ,a.uploadCategoryId
            ,a.urlId
            ,a.[status]
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted
            ,b.name categoryName
            FROM tbUpload a inner join tbUploadCategory b  on a.uploadCategoryId = b.id
            where a.isDeleted = 0 and b.isDeleted = 0 and a.status = 1 and b.status = 1
            and a.orderId = @orderId and b.name = @categoryName";

            return conn.Query<UploadView>(queryString, new { orderId, categoryName }, transaction: trans).ToList();
        }

        public int HardDeleteByParam(int orderId, int uploadCategoryId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"  
            delete tbUpload where orderId = @orderId and uploadCategoryId = @uploadCategoryId
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { orderId, uploadCategoryId }, transaction: trans);
        }
    }
}

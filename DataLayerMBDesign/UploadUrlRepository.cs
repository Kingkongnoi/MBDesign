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
    public class UploadUrlRepository
    {
        public int? Add(tbUploadUrl obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int HardDeleteByParam(int orderId, int uploadCategoryId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"  
            delete tbUploadUrl where urlId in (select urlId from tbUpload where orderId = @orderId and uploadCategoryId = @uploadCategoryId)
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { orderId, uploadCategoryId }, transaction:  trans);
        }
    }
}

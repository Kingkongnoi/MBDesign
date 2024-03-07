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
    public class UploadCategoryRepository
    {
        public tbUploadCategory GetFirstByName(string name, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 * from tbUploadCategory where name  = @name and isDeleted = 0 and status = 1";

            return conn.QueryFirstOrDefault<tbUploadCategory>(queryString, new { name }, transaction:  trans);
        }

        public int? Add(tbUploadCategory obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }
    }
}

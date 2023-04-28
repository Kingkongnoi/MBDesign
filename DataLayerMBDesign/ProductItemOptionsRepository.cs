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
    public class ProductItemOptionsRepository
    {
        public int? Add(tbProductItemOptions obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int HardDeleteByItemId(int itemId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"delete tbProductItemOptions where itemId = @itemId and isDeleted = 0
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { itemId }, transaction: trans);
        }

        public List<tbProductItemOptions> GetByItemId(int itemId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT optionsId
                                ,options
                                ,optionsPrice
                                ,itemId
                                ,status
                                ,createDate
                                ,createBy
                                ,updateDate
                                ,updateBy
                                ,isDeleted
                                FROM tbProductItemOptions
                                where isDeleted = 0 and itemId = @itemId
                                order by optionsId";

            return conn.Query<tbProductItemOptions>(queryString, new { itemId }, transaction: trans).ToList();
        }

        public List<tbProductItemOptions> GetProductItemOptionsSelect2(int itemId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select optionsId, options, optionsPrice
                                from tbProductItemOptions 
                                where itemId = @itemId and isDeleted = 0 and status = 1";

            return conn.Query<tbProductItemOptions>(queryString, new { itemId }, transaction: trans).ToList();
        }
    }
}

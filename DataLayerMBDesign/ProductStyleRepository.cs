using Dapper;
using EntitiesMBDesign;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace DataLayerMBDesign
{
    public class ProductStyleRepository
    {
        public int? Add(tbProductStyle obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbProductStyle obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbProductStyle
                                set styleName = @styleName,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                status = @status
                                where isDeleted = 0 and styleId = @styleId
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.styleName, obj.updateDate, obj.updateBy, obj.status, obj.styleId }, transaction: trans);
        }

        public List<tbProductStyle> GetAll(/*string styleId, */string styleName, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            //if (!string.IsNullOrEmpty(styleId) && styleId != "%%")
            //{
            //    condition += string.Format(" and styleId = {0}", styleId);
            //}

            if (!string.IsNullOrEmpty(styleName) && styleName != "null")
            {
                condition += string.Format(" and styleName like N'%{0}%'", styleName);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and status = {0}", status);
            }

            string queryString = string.Format(@"select [styleId]
                                ,[styleName]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                ,[isDeleted]
                                from tbProductStyle
                                where isDeleted = 0
                                {0}
                                order by styleId", condition);

            return conn.Query<tbProductStyle>(queryString, new { }, transaction: trans).ToList();
        }

        public tbProductStyle GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                                if not exists(select top 1 1 from tbProductStyle)
                                begin
	                                SELECT IDENT_CURRENT('tbProductStyle') AS styleId;  
                                end
                                else
                                begin
	                                SELECT IDENT_CURRENT('tbProductStyle') + 1 AS styleId;  
                                end";

            return conn.QueryFirstOrDefault<tbProductStyle>(queryString, transaction: trans);
        }

        public tbProductStyle GetFirstById(int styleId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 [styleId]
                                ,[styleName]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                ,[isDeleted]
                                from tbProductStyle
                                where isDeleted = 0 and styleId = @styleId
                                order by styleId";

            return conn.QueryFirstOrDefault<tbProductStyle>(queryString, new { styleId }, transaction: trans);
        }

        public tbProductStyle GetFirstByName(string styleName, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@"select top 1 [styleId]
                                ,[styleName]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                ,[isDeleted]
                                from tbProductStyle
                                where isDeleted = 0 and styleName = N'{0}'", styleName);

            return conn.QueryFirstOrDefault<tbProductStyle>(queryString, new { styleName }, transaction: trans);
        }

        public List<tbProductStyle> GetAllActiveForSelect2(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select [styleId]
                                ,[styleName]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                ,[isDeleted]
                                from tbProductStyle
                                where isDeleted = 0 and status = 1
                                order by styleName";

            return conn.Query<tbProductStyle>(queryString, transaction: trans).ToList();
        }
    }
}

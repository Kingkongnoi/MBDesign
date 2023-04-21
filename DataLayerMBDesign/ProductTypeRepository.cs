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
    public class ProductTypeRepository
    {
        public int? Add(tbProductType obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbProductType obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbProductType
                                set typeName = @typeName,
                                typePrice = @typePrice,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                status = @status
                                where isDeleted = 0 and typeId = @typeId
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.typeName, obj.typePrice, obj.updateDate, obj.updateBy, obj.status, obj.typeId }, transaction: trans);
        }

        public List<tbProductType> GetAll(/*string typeId, */string typeName, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            //if (!string.IsNullOrEmpty(typeId) && typeId != "%%")
            //{
            //    condition += string.Format(" and typeId = {0}", typeId);
            //}

            if (!string.IsNullOrEmpty(typeName) && typeName != "%%")
            {
                condition += string.Format(" and typeName like N'%{0}%'", typeName);
            }

            if (!string.IsNullOrEmpty(status) && status != "%%")
            {
                condition += string.Format(" and status = {0}", status);
            }

            string queryString = string.Format(@"select [typeId]
                                ,[typeName]
                                ,[length]
                                ,[depth]
                                ,[height]
                                ,[typePrice]
                                ,[imageFileName]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                ,[isDeleted]
                                from tbProductType
                                where isDeleted = 0
                                {0}
                                order by typeId", condition);

            return conn.Query<tbProductType>(queryString, new { }, transaction: trans).ToList();
        }

        public tbProductType GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                                if not exists(select top 1 1 from tbProductType)
                                begin
	                                SELECT IDENT_CURRENT('tbProductType') AS typeId;  
                                end
                                else
                                begin
	                                SELECT IDENT_CURRENT('tbProductType') + 1 AS typeId;  
                                end";

            return conn.QueryFirstOrDefault<tbProductType>(queryString, transaction: trans);
        }

        public tbProductType GetFirstById(int typeId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1  [typeId]
                                ,[typeName]
                                ,[length]
                                ,[depth]
                                ,[height]
                                ,[typePrice]
                                ,[imageFileName]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                ,[isDeleted]
                                from tbProductType
                                where isDeleted = 0 and typeId = @typeId
                                order by typeId";

            return conn.QueryFirstOrDefault<tbProductType>(queryString, new { typeId }, transaction: trans);
        }

        public tbProductType GetFirstByName(string typeName, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@"select top 1 [typeId]
                                ,[typeName]
                                ,[length]
                                ,[depth]
                                ,[height]
                                ,[typePrice]
                                ,[imageFileName]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                ,[isDeleted]
                                from tbProductType
                                where isDeleted = 0 and typeName = N'{0}'", typeName);

            return conn.QueryFirstOrDefault<tbProductType>(queryString, new { typeName }, transaction: trans);
        }
    }
}

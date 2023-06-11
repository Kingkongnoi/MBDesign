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
    public class ProductItemRepository
    {
        public int? Add(tbProductItem obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbProductItem obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbProductItem
                                set itemName = @itemName,
                                typeId = @typeId,
                                itemPrice = @itemPrice,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                status = @status
                                where isDeleted = 0 and itemId = @itemId
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.itemName, obj.itemPrice, obj.typeId, obj.updateDate, obj.updateBy, obj.status, obj.itemId }, transaction: trans);
        }

        public List<ProductItemView> GetAll(string itemName, int typeId, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(itemName) && itemName != "null")
            {
                condition += string.Format(" and a.itemName like N'%{0}%'", itemName);
            }

            if (typeId != 0)
            {
                condition += string.Format(" and a.typeId = {0}", typeId);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and a.status = {0}", status);
            }

            string queryString = string.Format(@"select a.itemId, a.itemName, a.typeId, b.typeName, sum(isnull(a.itemPrice,0)+isnull(b.typePrice,0)) price, a.createDate, a.createBy, a.updateDate, a.updateBy, a.status
            , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.createBy and isDeleted = 0),'') createByName
            , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.updateBy and isDeleted = 0),'') updateByName
            from tbProductItem a inner join tbProductType b on a.typeId = b.typeId
            where a.isDeleted = 0 and b.isDeleted = 0
            {0}
            group by a.itemId, a.itemName, a.typeId, b.typeName, a.createDate, a.createBy, a.updateDate, a.updateBy, a.status
            order by a.itemId desc
            ", condition);

            return conn.Query<ProductItemView>(queryString, new { }, transaction: trans).ToList();
        }

        public tbProductItem GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                                if not exists(select top 1 1 from tbProductItem)
                                begin
	                                SELECT IDENT_CURRENT('tbProductItem') AS itemId;  
                                end
                                else
                                begin
	                                SELECT IDENT_CURRENT('tbProductItem') + 1 AS itemId;  
                                end";

            return conn.QueryFirstOrDefault<tbProductItem>(queryString, transaction: trans);
        }

        public tbProductItem GetFirstById(int itemId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 [itemId]
                                ,[itemName]
                                ,[typeId]
                                ,[itemPrice]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                ,[isDeleted]
                                FROM [dbo].[tbProductItem]
                                where isDeleted = 0 and itemId = @itemId
                                order by itemId";

            return conn.QueryFirstOrDefault<tbProductItem>(queryString, new { itemId }, transaction: trans);
        }

        public tbProductItem GetFirstByName(string itemName, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@"select top 1 [itemId]
                                ,[itemName]
                                ,[typeId]
                                ,[itemPrice]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                ,[isDeleted]
                                FROM [dbo].[tbProductItem]
                                where isDeleted = 0 and itemName = N'{0}'", itemName);

            return conn.QueryFirstOrDefault<tbProductItem>(queryString, new { itemName }, transaction: trans);
        }

        public List<ProductItemView> GetProductItemSelect2(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select itemId, itemName, itemName + ' - ' + convert(varchar(50),itemPrice) fullItemPrice, itemPrice
                                from tbProductItem
                                where isDeleted = 0 and status = 1
                                group by itemId, itemName, itemPrice
                                order by itemName";

            return conn.Query<ProductItemView>(queryString, new { }, transaction: trans).ToList();
        }
        public List<ProductItemView> GetProductItemSelect2ByTypeId(int typeId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select itemId, itemName, itemName + ' - ' + convert(varchar(50),itemPrice) fullItemPrice, itemPrice
                                from tbProductItem
                                where isDeleted = 0 and status = 1 and typeId = @typeId
                                group by itemId, itemName, itemPrice
                                order by itemName";

            return conn.Query<ProductItemView>(queryString, new { typeId }, transaction: trans).ToList();
        }
    }
}

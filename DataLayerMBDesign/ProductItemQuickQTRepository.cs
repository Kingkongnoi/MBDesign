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
    public class ProductItemQuickQTRepository
    {
        public int? Add(tbProductItemQuickQT obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbProductItemQuickQT obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbProductItemQuickQT
                                set itemText = @itemText,
                                typeId = @typeId,
                                itemPrice = @itemPrice,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                status = @status
                                where isDeleted = 0 and itemId = @itemId
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.itemText, obj.itemPrice, obj.typeId, obj.updateDate, obj.updateBy, obj.status, obj.itemId }, transaction: trans);
        }

        public List<ProductItemQuickQTView> GetAll(string itemCode, int typeId, string itemText, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(itemCode) && itemCode != "null")
            {
                condition += string.Format(" and a.itemCode like N'%{0}%'", itemCode);
            }

            if (typeId != 0)
            {
                condition += string.Format(" and a.typeId = {0}", typeId);
            }

            if (!string.IsNullOrEmpty(itemText) && itemText != "null")
            {
                condition += string.Format(" and a.itemText like N'%{0}%'", itemText);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and a.status = {0}", status);
            }

            string queryString = string.Format(@"select a.itemId, a.itemCode, a.itemText, a.typeId, b.typeName, sum(isnull(a.itemPrice,0)+isnull(b.typePrice,0)) price, a.createDate, a.createBy, a.updateDate, a.updateBy, a.status
            , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.createBy and isDeleted = 0),'') createByName
            , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.updateBy and isDeleted = 0),'') updateByName
            from tbProductItemQuickQT a inner join tbProductType b on a.typeId = b.typeId
            where a.isDeleted = 0 and b.isDeleted = 0
            {0}
            group by a.itemId, a.itemCode, a.itemText, a.typeId, b.typeName, a.createDate, a.createBy, a.updateDate, a.updateBy, a.status
            order by case when a.updateDate is not null then a.updateDate else a.createDate end desc
            ", condition);

            return conn.Query<ProductItemQuickQTView>(queryString, new { }, transaction: trans).ToList();
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

        public tbProductItemQuickQT GetFirstById(int itemId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT TOP 1 [itemId]
                                ,[itemCode]
                                ,[itemText]
                                ,[typeId]
                                ,[itemPrice]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                ,[isDeleted]
                                FROM [tbProductItemQuickQT]
                                where isDeleted = 0 and itemId = @itemId
                                order by itemId desc";

            return conn.QueryFirstOrDefault<tbProductItemQuickQT>(queryString, new { itemId }, transaction: trans);
        }

        public tbProductItemQuickQT GetFirstByCode(string itemCode, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@"SELECT TOP 1 [itemId]
                                ,[itemCode]
                                ,[itemText]
                                ,[typeId]
                                ,[itemPrice]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                ,[isDeleted]
                                FROM [tbProductItemQuickQT]
                                where isDeleted = 0 and itemCode = '{0}'", itemCode);

            return conn.QueryFirstOrDefault<tbProductItemQuickQT>(queryString, new { itemCode }, transaction: trans);
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

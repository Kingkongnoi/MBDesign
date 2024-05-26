using Dapper;
using EntitiesMBDesign;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DataLayerMBDesign
{
    public class StockProductRepository
    {
        public int? Add(tbStockProduct obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbStockProduct obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbStockProduct
                                set productname = @productname,
                                stockamount = @stockamount,
                                productprice = @productprice,
                                groupid = @groupid,
                                subgroupid = @subgroupid,
                                brandid = @brandid,
                                stockid = @stockid,
                                unitmasterid = @unitmasterid,
                                updateBy = @updateBy,
                                status = @status
                                where isDeleted = 0 and id = @id
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.productname, obj.stockamount, obj.productprice, obj.groupid, obj.subgroupid, obj.brandid, obj.stockid, obj.unitmasterid, obj.updateDate, obj.updateBy, obj.status, obj.id }, transaction: trans);
        }

        public List<StockProductItemModel> GetAll(int groupid, int subgroupid, int brandid, int stockid, string productcode, string productname, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (groupid != 0)
            {
                condition += string.Format(" and a.groupid = {0}", groupid);
            }
            if (subgroupid != 0)
            {
                condition += string.Format(" and a.subgroupid = {0}", subgroupid);
            }
            if (brandid != 0)
            {
                condition += string.Format(" and a.brandid = {0}", brandid);
            }
            if (stockid != 0)
            {
                condition += string.Format(" and a.stockid = {0}", stockid);
            }

            if (!string.IsNullOrEmpty(productcode) && productcode != "null")
            {
                condition += string.Format(" and a.productcode like N'%{0}%'", productcode);
            }
            if (!string.IsNullOrEmpty(productname) && productname != "null")
            {
                condition += string.Format(" and a.productname like N'%{0}%'", productname);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and a.status = {0}", status);
            }

            StringBuilder queryString = new StringBuilder();
            queryString.Append("SELECT a.id,a.productcode,a.productname" +
                ",ISNULL((SELECT Sum(isnull(pm.amount,0)) from tbStockProductManageMaster pmm inner join tbStockProductManage pm on pmm.id = pm.stockmanagemasterid where pm.stockproductcode = a.productcode and pm.isDeleted =0 and pm.status =1 and pmm.actiontype= 'I'),0) - ISNULL((SELECT Sum(isnull(pm.amount,0)) from tbStockProductManageMaster pmm inner join tbStockProductManage pm on pmm.id = pm.stockmanagemasterid where pm.stockproductcode = a.productcode and pm.isDeleted =0 and pm.status =1 and pmm.actiontype='W'),0) as stockamount" +
                ",a.productprice,a.groupid,a.subgroupid,a.brandid,a.stockid,a.unitmasterid,g.groupname,gs.subgroupname,b.brandname,s.stockname,u.unitname");
            queryString.Append(" FROM tbStockProduct a");
            queryString.Append(" inner join tbGroup g on g.id = a.groupid");
            queryString.Append(" inner join tbSubGroup gs on gs.id = a.subgroupid");
            queryString.Append(" inner join tbBrand b on b.id = a.brandid");
            queryString.Append(" inner join tbStock s on s.id = a.stockid");
            queryString.Append(" inner join tbUnitMaster u on u.id = a.unitmasterid");
            queryString.Append(" where a.isDeleted = 0");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" order by a.id desc");

            return conn.Query<StockProductItemModel>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public tbStockProduct GetFirstByName(string productname, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbStockProduct");
            queryString.AppendFormat(" where isDeleted = 0 and productname = N'{0}'", productname);

            return conn.QueryFirstOrDefault<tbStockProduct>(queryString.ToString(), new { productname }, transaction: trans);
        }

        public tbStockProduct GetFirstById(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 *
                                FROM [tbStockProduct]
                                where isDeleted = 0 and id = @id
                                order by id";

            return conn.QueryFirstOrDefault<tbStockProduct>(queryString, new { id }, transaction: trans);
        }

        public int GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                                if not exists(select top 1 1 from tbStockProduct)
                                begin
	                                SELECT IDENT_CURRENT('tbStockProduct') AS id;  
                                end
                                else
                                begin
	                                SELECT IDENT_CURRENT('tbStockProduct') + 1 AS id;  
                                end";

            return conn.QueryFirstOrDefault<int>(queryString, transaction: trans);
        }

       

        public List<tbGroup> getGroupData(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select *
                                from tbGroup
                                where isDeleted = 0 and status = 1
                                order by id";

            return conn.Query<tbGroup>(queryString, new { }, transaction: trans).ToList();
        }
        public List<tbSubGroup> getSubGroupData(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select *
                                from tbSubGroup
                                where isDeleted = 0 and status = 1
                                order by id";

            return conn.Query<tbSubGroup>(queryString, new { }, transaction: trans).ToList();
        }
        public List<tbBrand> getBrandData(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select *
                                from tbBrand
                                where isDeleted = 0 and status = 1
                                order by id";

            return conn.Query<tbBrand>(queryString, new { }, transaction: trans).ToList();
        }
        public List<tbStock> getStockData(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select *
                                from tbStock
                                where isDeleted = 0 and status = 1
                                order by id";

            return conn.Query<tbStock>(queryString, new { }, transaction: trans).ToList();
        }
        public List<tbUnitMaster> getUnitData(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select *
                                from tbUnitMaster
                                where isDeleted = 0 and status = 1
                                order by id";

            return conn.Query<tbUnitMaster>(queryString, new { }, transaction: trans).ToList();
        }

        public stockunitprice GetStockunitprice(string productdcode, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select um.unitname,sp.productprice
                                from tbStockProduct sp inner join tbUnitMaster um on sp.unitmasterid = um.id
                                where sp.isDeleted = 0 and sp.status = 1
                                and sp.productcode = @productdcode
                                order by sp.id"
            ;

            return conn.QueryFirstOrDefault<stockunitprice>(queryString, new { productdcode}, transaction: trans);
        }
    }
}

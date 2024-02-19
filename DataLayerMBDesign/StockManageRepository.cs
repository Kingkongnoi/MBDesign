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
    public class StockManageRepository
    {
        public int? Add(tbStockProductManage obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }
        //public int Update(tbStockManage obj, SqlConnection conn, SqlTransaction? trans = null)
        //{
        //    string queryString = @"update tbStockProduct
        //                        set productname = @productname,
        //                        stockamount = @stockamount,
        //                        productprice = @productprice,
        //                        groupid = @groupid,
        //                        subgroupid = @subgroupid,
        //                        brandid = @brandid,
        //                        stockid = @stockid,
        //                        unitmasterid = @unitmasterid,
        //                        updateBy = @updateBy,
        //                        status = @status
        //                        where isDeleted = 0 and id = @id
        //                        select @@ROWCOUNT;";

        //    return conn.QueryFirstOrDefault<int>(queryString, new { obj.productname, obj.stockamount, obj.productprice, obj.groupid, obj.subgroupid, obj.brandid, obj.stockid, obj.unitmasterid, obj.updateDate, obj.updateBy, obj.status, obj.id }, transaction: trans);
        //}

        public List<StockManageItemModel> GetAll(string documentcode,string dealername,string getindate, int recieverid, int stockid, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(documentcode) && documentcode != "null")
            {
                condition += string.Format(" and sm.documentcode like N'%{0}%'", documentcode);
            }
            if (!string.IsNullOrEmpty(dealername) && dealername != "null")
            {
                condition += string.Format(" and sm.dealername like N'%{0}%'", dealername);
            }
            if (!string.IsNullOrEmpty(getindate) && getindate != "null")
            {
                condition += string.Format(" and sm.actiondate ='{0}'", getindate);
            }
            if (recieverid != 0)
            {
                condition += string.Format(" and sm.recieverid = {0}", recieverid);
            }
           
            if (stockid != 0)
            {
                condition += string.Format(" and sm.stockid = {0}", stockid);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and sm.status = {0}", status);
            }

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT sm.id" +
                               ",sm.documentcode" +
                               ",sm.stockproductcode" +
                               ",a.productname" +
                               ",s.stockname" +
                               ",ed.empFirstName + ed.empLastName as fullname" +
                               ",sm.actiondate" +
                               ",u.unitname" +
                               ",a.productprice" +
                               ",sm.amount");
            queryString.Append(" FROM tbStockProductManage sm");
            queryString.Append(" inner join tbStockProduct a on sm.stockproductcode = a.productcode");
            queryString.Append(" inner join tbReceiverProduct rp on sm.receiverid = rp.id");
            queryString.Append(" inner join tbEmpData ed on rp.empid = ed.id");
            queryString.Append(" inner join tbStock s on s.id = sm.stockid");
            queryString.Append(" inner join tbUnitMaster u on u.id = a.unitmasterid");
            queryString.Append(" where a.isDeleted = 0 and actiontype ='I'");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" group by sm.id" +
                               ",sm.documentcode" +
                               ",sm.stockproductcode" +
                               ",a.productname" +
                               ",s.stockname" +
                               ",ed.empFirstName" +
                               ",ed.empLastName" +
                               ",sm.actiondate" +
                               ",u.unitname" +
                               ",a.productprice,sm.amount");
            queryString.Append(" order by sm.id desc");

            return conn.Query<StockManageItemModel>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public List<StockManageItemModel> GetAllStockOut(string documentcode, string dealername, string getindate, int recieverid, int stockid, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(documentcode) && documentcode != "null")
            {
                condition += string.Format(" and sm.documentcode like N'%{0}%'", documentcode);
            }
            if (!string.IsNullOrEmpty(dealername) && dealername != "null")
            {
                condition += string.Format(" and sm.dealername like N'%{0}%'", dealername);
            }
            if (!string.IsNullOrEmpty(getindate) && getindate != "null")
            {
                condition += string.Format(" and sm.actiondate ='{0}'", getindate);
            }
            if (recieverid != 0)
            {
                condition += string.Format(" and sm.recieverid = {0}", recieverid);
            }

            if (stockid != 0)
            {
                condition += string.Format(" and sm.stockid = {0}", stockid);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and sm.status = {0}", status);
            }

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT sm.id" +
                               ",sm.documentcode" +
                               ",sm.stockproductcode" +
                               ",a.productname" +
                               ",s.stockname" +
                               ",ed.empFirstName + ed.empLastName as fullname" +
                               ",sm.actiondate" +
                               ",u.unitname" +
                               ",a.productprice" +
                               ",sm.amount");
            queryString.Append(" FROM tbStockProductManage sm");
            queryString.Append(" inner join tbStockProduct a on sm.stockproductcode = a.productcode");
            queryString.Append(" inner join tbReceiverProduct rp on sm.receiverid = rp.id");
            queryString.Append(" inner join tbEmpData ed on rp.empid = ed.id");
            queryString.Append(" inner join tbStock s on s.id = sm.stockid");
            queryString.Append(" inner join tbUnitMaster u on u.id = a.unitmasterid");
            queryString.Append(" where a.isDeleted = 0 and actiontype ='W'");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" group by sm.id" +
                               ",sm.documentcode" +
                               ",sm.stockproductcode" +
                               ",a.productname" +
                               ",s.stockname" +
                               ",ed.empFirstName" +
                               ",ed.empLastName" +
                               ",sm.actiondate" +
                               ",u.unitname" +
                               ",a.productprice,sm.amount");
            queryString.Append(" order by sm.id desc");

            return conn.Query<StockManageItemModel>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public tbStockProductManage GetFirstByCodeGetin(string DocGetInCode, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbStockProductManage");
            queryString.AppendFormat(" where isDeleted = 0 and documentcode = N'{0}'", DocGetInCode);

            return conn.QueryFirstOrDefault<tbStockProductManage>(queryString.ToString(), new { DocGetInCode }, transaction: trans);
        }
        public int GetLastestGetInId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                               if not exists(select top 1 1 from tbStockProductManage WHERE actiontype = 'I')
                               begin
                                  SELECT 1 as ID
                               end
                               else
                               begin
                                     SELECT MAX(Cast(SUBSTRING(documentcode, 2, LEN(documentcode)) as int))+1 as ID  FROM tbStockProductManage WHERE actiontype='I'
                               end";

            return conn.QueryFirstOrDefault<int>(queryString, transaction: trans);
        }

        public int GetLastestWithDrawId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                               if not exists(select top 1 1 from tbStockProductManage WHERE actiontype = 'W')
                               begin
                                  SELECT 1 as ID
                               end
                               else
                               begin
                                     SELECT MAX(Cast(SUBSTRING(documentcode, 2, LEN(documentcode)) as int))+1 as ID  FROM tbStockProductManage WHERE actiontype='W'
                               end";

            return conn.QueryFirstOrDefault<int>(queryString, transaction: trans);
        }
        public int Update(tbStockProductManage obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbStockProductManage
                                  SET stockid = @stockid
                                  ,stockproductcode = @stockproductcode
                                  ,dealername = @dealername
                                  ,receiverid = @receiverid
                                  
                                  ,actiondate = @actiondate
                                  ,amount = @amount
                                  ,remark = @remark
                                  ,status = @status
                                  ,updateDate = @updateDate
                                  ,updateBy = @updateBy       
                                   where isDeleted = 0 and id = @id
                                   select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.stockid, obj.stockproductcode, obj.dealername, obj.receiverid, obj.actiondate, obj.amount, obj.remark, obj.updateDate, obj.updateBy, obj.status, obj.id }, transaction: trans);
        }
        public tbStockProductManage GetFirstById(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 *
                                FROM [tbStockProductManage]
                                where isDeleted = 0 and id = @id
                                order by id";

            return conn.QueryFirstOrDefault<tbStockProductManage>(queryString, new { id }, transaction: trans);
        }
    }
}

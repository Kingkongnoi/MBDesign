using Dapper;
using EntitiesMBDesign;
using System.Data.SqlClient;
using System.Text;

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
                condition += string.Format(" and pmm.documentcode like N'%{0}%'", documentcode);
            }
            //if (!string.IsNullOrEmpty(dealername) && dealername != "null")
            //{
            //    condition += string.Format(" and sm.dealername like N'%{0}%'", dealername);
            //}
            if (!string.IsNullOrEmpty(getindate) && getindate != "null")
            {
                condition += string.Format(" and pmm.actiondate ='{0}'", getindate);
            }
            if (recieverid != 0)
            {
                condition += string.Format(" and pmm.recieverid = {0}", recieverid);
            }
           
            //if (stockid != 0)
            //{
            //    condition += string.Format(" and sm.stockid = {0}", stockid);
            //}

            //if (!string.IsNullOrEmpty(status) && status != "null")
            //{
            //    condition += string.Format(" and sm.status = {0}", status);
            //}

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT pmm.id" +
                               ",pmm.documentcode" +
                               ",ed.empFirstName + ed.empLastName as fullname" +
                               ",pmm.actiondate");
            queryString.Append(@" FROM tbStockProductManageMaster pmm");
            //queryString.Append(" inner join tbStockProduct a on sm.stockproductcode = a.productcode");
            queryString.Append(" inner join tbReceiverProduct rp on pmm.receiverid = rp.id");
            queryString.Append(" inner join tbEmpData ed on rp.empid = ed.id");
            //queryString.Append(" inner join tbStock s on s.id = sm.stockid");
            //queryString.Append(" inner join tbUnitMaster u on u.id = a.unitmasterid");
            queryString.Append(" where pmm.isDeleted = 0 and pmm.actiontype ='I'");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" group by pmm.id" +
                               ",pmm.documentcode" +
                               //",sm.stockproductcode" +
                               //",a.productname" +
                               //",s.stockname" +
                               ",ed.empFirstName" +
                               ",ed.empLastName" +
                               ",pmm.actiondate" );
            queryString.Append(" order by pmm.id desc");

            return conn.Query<StockManageItemModel>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public List<StockManageItemModel> GetAllStockOut(string documentcode, string dealername, string getindate, int recieverid, int stockid, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(documentcode) && documentcode != "null")
            {
                condition += string.Format(" and pmm.documentcode like N'%{0}%'", documentcode);
            }
            //if (!string.IsNullOrEmpty(dealername) && dealername != "null")
            //{
            //    condition += string.Format(" and sm.dealername like N'%{0}%'", dealername);
            //}
            if (!string.IsNullOrEmpty(getindate) && getindate != "null")
            {
                condition += string.Format(" and pmm.actiondate ='{0}'", getindate);
            }
            if (recieverid != 0)
            {
                condition += string.Format(" and pmm.recieverid = {0}", recieverid);
            }

            //if (stockid != 0)
            //{
            //    condition += string.Format(" and sm.stockid = {0}", stockid);
            //}

            //if (!string.IsNullOrEmpty(status) && status != "null")
            //{
            //    condition += string.Format(" and sm.status = {0}", status);
            //}

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT pmm.id" +
                               ",pmm.documentcode" +
                               ",ed.empFirstName + ed.empLastName as fullname" +
                               ",pmm.actiondate");
            queryString.Append(@" FROM tbStockProductManageMaster pmm");
            //queryString.Append(" inner join tbStockProduct a on sm.stockproductcode = a.productcode");
            queryString.Append(" inner join tbReceiverProduct rp on pmm.receiverid = rp.id");
            queryString.Append(" inner join tbEmpData ed on rp.empid = ed.id");
            //queryString.Append(" inner join tbStock s on s.id = sm.stockid");
            //queryString.Append(" inner join tbUnitMaster u on u.id = a.unitmasterid");
            queryString.Append(" where pmm.isDeleted = 0 and pmm.actiontype ='O'");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" group by pmm.id" +
                               ",pmm.documentcode" +
                               //",sm.stockproductcode" +
                               //",a.productname" +
                               //",s.stockname" +
                               ",ed.empFirstName" +
                               ",ed.empLastName" +
                               ",pmm.actiondate");
            queryString.Append(" order by pmm.id desc");

            return conn.Query<StockManageItemModel>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public int Update(tbStockProductManage obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbStockProductManage
                                  SET stockid = @stockid
                                  ,dealername = @dealername
                                  ,amount = @amount
                                  ,remark = @remark
                                  ,status = @status
                                  ,updateDate = @updateDate
                                  ,updateBy = @updateBy       
                                   where isDeleted = 0 and stockproductcode = @stockproductcode and stockmanagemasterid = @stockmanagemasterid
                                   select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.stockid, obj.dealername, obj.amount, obj.remark, obj.updateDate, obj.updateBy, obj.status, obj.id, obj.stockproductcode,obj.stockmanagemasterid }, transaction: trans);
        }

        public List<tbStockProductManage> GetProductManage(string productcode, int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT *
                                   FROM tbStockProductManage
                                   WHERE stockproductcode = @productcode
                                                 AND stockmanagemasterid = @id AND isDeleted = 0";
            return conn.Query<tbStockProductManage>(queryString, new { productcode, id }, transaction: trans).ToList();
        }
        public List<stockEditModel> GetFirstById(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select pm.*
                                  ,sp.productname
                                  ,s.stockname 
                                  ,um.unitname
                                  ,sp.productprice
                                  ,pm.remark
                                FROM [tbStockProductManage] pm
                                inner join tbStockProduct sp on pm.stockproductcode = sp.productcode
                                inner join tbStock s on pm.stockid = s.id
                                inner join tbUnitMaster um on sp.unitmasterid = um.id
                                where pm.isDeleted = 0 and stockmanagemasterid = @id
                                order by pm.id";

            return conn.Query<stockEditModel>(queryString, new { id }, transaction: trans).ToList();
        }

        public int DeleteProductManage(int id,string productcode, SqlConnection conn, SqlTransaction? trans = null)
        {
            int affectedRows = 0;
            string queryString = @"DELETE tbStockProductManage
                                                 WHERE stockproductcode = @productcode
                                                 AND stockmanagemasterid = @id";
            affectedRows = conn.Execute(queryString,new { productcode,id }, transaction: trans);

            return affectedRows;
        }
    }
}

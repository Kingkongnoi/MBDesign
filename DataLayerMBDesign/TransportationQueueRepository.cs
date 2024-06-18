using Dapper;
using EntitiesMBDesign;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayerMBDesign
{
    public class TransportationQueueRepository
    {
        public int? Add(tbTransportationQueue obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int? AddDetail(tbTransportationQueueDetail obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbTransportationQueue obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" update tbTransportationQueue");
            queryString.Append(" SET");
            queryString.Append(" transportationdate = @transportationdate,");
            queryString.Append(" drivername = @drivername,");
            queryString.Append(" subdrivername1 = @subdrivername1,");
            queryString.Append(" subdrivername2 = @subdrivername2,");
            queryString.Append(" outboundmileage = @outboundmileage,");
            queryString.Append(" inboundmileage = @inboundmileage,");
            queryString.Append(" outboundtime = @outboundtime,");
            queryString.Append(" inboundtime = @inboundtime,");
            queryString.Append(" remark = @remark,");
            queryString.Append(" updateDate = @updateDate,");
            queryString.Append(" updateBy = @updateBy");
            queryString.Append(" where id = @id");
            queryString.Append(" select @@ROWCOUNT;");

            return conn.QueryFirstOrDefault<int>(queryString.ToString(), new { obj.transportationdate, obj.drivername, obj.subdrivername1, obj.subdrivername2, obj.outboundmileage,obj.inboundmileage, obj.outboundtime, obj.inboundtime,obj.remark, obj.updateDate, obj.updateBy, obj.id }, transaction: trans);
        }

        public tbTransportationQueue GetFirstByID(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbTransportationQueue");
            queryString.AppendFormat(" where isDeleted = 0 and id = {0}", id);

            return conn.QueryFirstOrDefault<tbTransportationQueue>(queryString.ToString(), new { id }, transaction: trans);
        }
        public tbTransportationQueueDetail GetFirstDetailByID(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbTransportationQueueDetail");
            queryString.AppendFormat(" where id = {0}", id);

            return conn.QueryFirstOrDefault<tbTransportationQueueDetail>(queryString.ToString(), new { id }, transaction: trans);
        }

        public int checkHaveDetail(int detailid, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@"SELECT COUNT(*) FROM tbTransportationQueueDetail where id = {0}",detailid);
            return conn.QueryFirstOrDefault<int>(queryString.ToString(), new { detailid }, transaction: trans);
        }
    

        public List<tbTransportationQueue> GetAll(string drivername,int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";
            string queryString = string.Empty;

            if (!string.IsNullOrEmpty(drivername) && drivername != "null")
            {
                condition += string.Format(" and drivername like N'%{0}%'", drivername);
            }
            if (id !=0)
            {
                condition += string.Format(" and id = {0}", id);
            }
            queryString = string.Format(@"SELECT id
                                                ,transportationdate
                                                ,drivername
                                                ,subdrivername1
                                                ,subdrivername2
                                                ,outboundmileage
                                                ,inboundmileage
                                                ,outboundtime
                                                ,inboundtime
                                                ,remark
                                                ,createDate
                                                ,createBy
                                                ,updateDate
                                                ,updateBy
                                                ,isDeleted
                                                FROM tbTransportationQueue where isDeleted = 0 {0}", condition);

            return conn.Query<tbTransportationQueue>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public List<PrintQueueReport> GetAllDetail(int transportationqueueid, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Empty;

            queryString = string.Format(@"SELECT tqd.id
                                          ,tqd.seqno
                                          ,tqd.timeto
                                          ,tqd.timeout
                                          ,c.custFirstName + ' ' + c.custSurName as fullname
                                          ,c.custAddress as address
										  ,(select string_agg(itemName, ',') within group (order by pd.itemId)  from tbProductItem pd inner join tbCustOrderDetail cd on co.orderId = cd.orderId where pd.itemId = cd.itemId) as itemdescription
                                          ,tqd.orderid
                                          FROM tbTransportationQueueDetail tqd
                                          inner join tbCustOrder co on co.orderId = tqd.orderid
										  inner join tbCust c on co.custId = c.custId 
                                          where tqd.transportationqueueid = {0}", transportationqueueid);

            return conn.Query<PrintQueueReport>(queryString.ToString(), new { }, transaction: trans).ToList();
        }



        public List<GetCustSelect> getCustomerQuotationNumberSelect(string orderid, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";
            if (!string.IsNullOrEmpty(orderid) && orderid != "null")
            {
                condition += string.Format(" and co.orderId not in ({0})", orderid);
            }

            string queryString = string.Format(@"select co.orderId id,co.quotationNumber value from tbCustOrder co
                                   inner join tbCust c on c.custId = co.custId
                                   inner join tbDesign3D d on co.orderId = d.orderId
                                   inner join tbTransportationCheckList tp on tp.orderid = co.orderId
                                   inner join tbTransportationCheckListDetail tpd on tp.id = tpd.transportationchecklistid
                                   where d.checklistStatusId =14 and tpd.checkliststatus in (1) 
                                   and co.orderId not in (select ISNULL(orderid,'') from tbTransportationQueueDetail) {0}", condition);
            return conn.Query<GetCustSelect>(queryString.ToString(), new { }, transaction: trans).ToList();
        }
        public List<GetCustSelect> getCustomerNameSelect(string orderid, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";
            if (!string.IsNullOrEmpty(orderid) && orderid != "null")
            {
                condition += string.Format(" and co.orderId not in ({0})", orderid);
            }
            string queryString = string.Format(@"select co.orderId id,c.custFirstName +' '+ c.custSurName value from tbCustOrder co
                                   inner join tbCust c on c.custId = co.custId
                                   inner join tbDesign3D d on co.orderId = d.orderId
                                   inner join tbTransportationCheckList tp on tp.orderid = co.orderId
                                   inner join tbTransportationCheckListDetail tpd on tp.id = tpd.transportationchecklistid
                                   where d.checklistStatusId =14 and tpd.checkliststatus in (1) 
                                   and co.orderId not in (select ISNULL(orderid,'') from tbTransportationQueueDetail) {0}", condition);
            return conn.Query<GetCustSelect>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public List<GetListOrderDetail> getListOrder(int orderid, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@"select co.orderId 
                                                ,c.custFirstName + ' ' + c.custSurName as Fullname
                                                ,c.custAddress
                                                ,pd.itemName
                                                from tbCust c
                                                inner join tbCustOrder co on c.custId = co.custId
                                                inner join tbCustOrderDetail cd on co.orderId = cd.orderId
                                                inner join tbProductItem pd on pd.itemId =cd.itemId
                                                where co.orderId = {0}", orderid);

            return conn.Query<GetListOrderDetail>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public int geEmpid(int orderid, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@" select empid
                                                  from tbTransportationCheckListDetail tpd
                                                  inner join tbTransportationCheckList tp on tp.id = tpd.transportationchecklistid
                                                  where tp.orderid = {0} and tpd.checkliststatus = 3", orderid);

            return conn.QueryFirstOrDefault<int>(queryString.ToString(), new { }, transaction: trans);
        }
    }
}

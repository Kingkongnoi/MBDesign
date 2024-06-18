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
    public class TransportationRepository
    {
        public int? Add(tbTransportationCheckList obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int? AddDetail(tbTransportationCheckListDetail obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbTransportationCheckList obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" update tbTransportationCheckList");
            queryString.Append(" SET");
            queryString.Append(" updateDate = @updateDate,");
            queryString.Append(" updateBy = @updateBy");

            queryString.Append(" where isDeleted = 0 and id = @id");
            queryString.Append(" select @@ROWCOUNT;");

            return conn.QueryFirstOrDefault<int>(queryString.ToString(), new { obj.updateDate, obj.updateBy, obj.approveDate, obj.approveBy, obj.id }, transaction: trans);
        }

        public List<tbMasterCheckListTransportation> getCheckListTP(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT * FROM
                                            tbMasterCheckListTransportation
                                   WHERE status = 1 order by id asc";

            return conn.Query<tbMasterCheckListTransportation>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public tbTransportationCheckList GetFirstByID(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbTransportationCheckList");
            queryString.AppendFormat(" where isDeleted = 0 and id = {0}", id);

            return conn.QueryFirstOrDefault<tbTransportationCheckList>(queryString.ToString(), new { id }, transaction: trans);
        }

        public tbTransportationCheckListDetail GetFirstDetailByID(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbProductionChecklist");
            queryString.AppendFormat(" where isDeleted = 0 and id = {0}", id);

            return conn.QueryFirstOrDefault<tbTransportationCheckListDetail>(queryString.ToString(), new { id }, transaction: trans);
        }

        public List<TPListModel> GetAll(string quatationcode, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";
            string queryString = string.Empty;

            if (!string.IsNullOrEmpty(quatationcode) && quatationcode != "null")
            {
                condition += string.Format(" and co.quotationNumber like N'%{0}%'", quatationcode);
            }

            //if (!string.IsNullOrEmpty(empName) && empName != "null")
            //{
            //    condition += string.Format(" and (e.empFirstName + ' ' + e.empLastName) like N'%{0}%'", empName);
            //}
            if (string.IsNullOrWhiteSpace(condition))
            {
                queryString = @"select p.id,p.orderid,s.id specid,f.id as fittingid,co.quotationNumber
                                               ,(select empFirstName +' '+empLastName from tbEmpData where id = d.ownerEmpId) as FullName
                                               ,pd.checkliststatus as statusid
                                               ,(select checklistname from tbMasterCheckListTransportation where id = pd.checkliststatus) as checklistStatus
                                               ,case when s.updateDate is not null then s.updateDate else s.createDate end lastUpdateDate
                                               ,case when Isnull(s.updateDate,'') ='' then (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.createBy and isDeleted = 0) else (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.updateBy and isDeleted = 0) end lastUpdateBy
                                   from tbTransportationCheckList p
                                   inner join tbTransportationCheckListDetail pd on p.id = pd.transportationchecklistid
                                   inner join tbCustOrder co on p.orderid = co.orderid
								   inner join tbDesign3D d on co.orderId = d.orderId
								   inner join tbFitting f on f.orderid = co.orderId
								   inner join tbSpec s on s.orderid = co.orderid
                                   where d.checklistStatusId =14 and pd.checkliststatus = (select max(checkliststatus) from tbTransportationCheckListDetail where transportationchecklistid = p.id and transactionActive = 'A' and transactionStatus = 'A')
								   union
select 0 id,s.orderid,s.id specid,f.id as fittingid,co.quotationNumber
                                               ,(select empFirstName +' '+empLastName from tbEmpData where id = d.ownerEmpId) as FullName
                                               ,sd.checkliststatus as statusid
                                               ,(select checklistname from tbMasterCheckListSpec where id = sd.checkliststatus) as checklistStatus
                                               ,case when s.updateDate is not null then s.updateDate else s.createDate end lastUpdateDate
                                               ,case when Isnull(s.updateDate,'') ='' then (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.createBy and isDeleted = 0) else (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.updateBy and isDeleted = 0) end lastUpdateBy
                                   from tbSpec s
                                   inner join tbSpecListDetail sd on s.id = sd.specid
                                   inner join tbCustOrder co on s.orderid = co.orderid
                                   inner join tbDesign3D d on co.orderId = d.orderId
								   inner join tbFitting f on f.orderid = co.orderId
                                   where d.checklistStatusId =14 
								   and co.orderId in (select orderid from tbFitting where  isDeleted =0)
								   and sd.checkliststatus in (5) and sd.TransactionActive= 'A' and sd.TransactionStatus ='A'
                                   and co.orderid not in (select orderid from tbTransportationCheckList pc where pc.orderid = co.orderid)";
            }
            else
            {
                queryString = string.Format(@"select p.id,p.orderid,s.id specid,f.id as fittingid,co.quotationNumber
                                               ,(select empFirstName +' '+empLastName from tbEmpData where id = d.ownerEmpId) as FullName
                                               ,pd.checkliststatus as statusid
                                               ,(select checklistname from tbMasterCheckListTransportation where id = pd.checkliststatus) as checklistStatus
                                               ,case when s.updateDate is not null then s.updateDate else s.createDate end lastUpdateDate
                                               ,case when Isnull(s.updateDate,'') ='' then (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.createBy and isDeleted = 0) else (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.updateBy and isDeleted = 0) end lastUpdateBy
                                   from tbTransportationCheckList p
                                   inner join tbTransportationCheckListDetail pd on p.id = pd.transportationchecklistid
                                   inner join tbCustOrder co on p.orderid = co.orderid
								   inner join tbDesign3D d on co.orderId = d.orderId
								   inner join tbFitting f on f.orderid = co.orderId
								   inner join tbSpec s on s.orderid = co.orderid
                                   where d.checklistStatusId =14 and pd.checkliststatus = (select max(checkliststatus) from tbTransportationCheckListDetail where transportationchecklistid = p.id and transactionActive = 'A' and transactionStatus = 'A')
								   union
select 0 id,s.orderid,s.id specid,f.id as fittingid,co.quotationNumber
                                               ,(select empFirstName +' '+empLastName from tbEmpData where id = d.ownerEmpId) as FullName
                                               ,sd.checkliststatus as statusid
                                               ,(select checklistname from tbMasterCheckListSpec where id = sd.checkliststatus) as checklistStatus
                                               ,case when s.updateDate is not null then s.updateDate else s.createDate end lastUpdateDate
                                               ,case when Isnull(s.updateDate,'') ='' then (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.createBy and isDeleted = 0) else (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.updateBy and isDeleted = 0) end lastUpdateBy
                                   from tbSpec s
                                   inner join tbSpecListDetail sd on s.id = sd.specid
                                   inner join tbCustOrder co on s.orderid = co.orderid
                                   inner join tbDesign3D d on co.orderId = d.orderId
								   inner join tbFitting f on f.orderid = co.orderId
                                   where d.checklistStatusId =14 
								   and co.orderId in (select orderid from tbFitting where  isDeleted =0)
								   and sd.checkliststatus in (5) and sd.TransactionActive= 'A'  and co.orderid not in (select orderid from tbTransportationCheckList pc where pc.orderid = co.orderid) sd.TransactionStatus ='A' {0}", condition);
            }


            return conn.Query<TPListModel>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public List<TPListModel> GetAllTPListByID(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";


            condition += string.Format(" and p.id = {0}", id);


            string queryString = string.Format(@" select p.id,p.orderid,s.id specid,f.id as fittingid,co.quotationNumber
                                               ,(select empFirstName +' '+empLastName from tbEmpData where id = d.ownerEmpId) as FullName
                                               ,pd.checkliststatus as statusid
                                               ,(select checklistname from tbMasterCheckListTransportation where id = pd.checkliststatus) as checklistStatus
                                               ,case when s.updateDate is not null then s.updateDate else s.createDate end lastUpdateDate
                                               ,case when Isnull(s.updateDate,'') ='' then (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.createBy and isDeleted = 0) else (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.updateBy and isDeleted = 0) end lastUpdateBy
                                   from tbTransportationCheckList p
                                   inner join tbTransportationCheckListDetail pd on p.id = pd.transportationchecklistid
                                   inner join tbCustOrder co on p.orderid = co.orderid
								   inner join tbDesign3D d on co.orderId = d.orderId
								   inner join tbFitting f on f.orderid = co.orderId
								   inner join tbSpec s on s.orderid = co.orderid
								   inner join tbSpecListDetail sd on s.id = sd.specid
                                   where d.checklistStatusId =14 and pd.TransactionStatus ='A' and sd.checkliststatus in (5) {0}", condition);

            return conn.Query<TPListModel>(queryString.ToString(), new { id }, transaction: trans).ToList();
        }

        public List<EmpDataView> GetDataSelectTP(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                select *
                from (
                     select  a.empFirstName + ' ' + a.empLastName fullName, a.id empId
                     from tbEmpData a inner join tbDepartment d on a.departmentId = d.departmentId
                     where a.isDeleted = 0 and a.status = 1 and d.isDeleted= 0 and d.status= 1
                     and d.departmentName = N'ขนส่ง'
                ) a
                order by fullName";

            return conn.Query<EmpDataView>(queryString, transaction: trans).ToList();
        }

        public tbTransportationCheckListDetail GetTPBySpecIDStatus(int id, int statusid, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@" SELECT TOP 1 *
                                          FROM tbTransportationCheckListDetail
                                          WHERE transactionActive = 'A' AND transactionStatus = 'A'
                                          AND transportationchecklistid = {0} AND checkliststatus = {1}
                                        ", id, statusid);
            return conn.QueryFirstOrDefault<tbTransportationCheckListDetail>(queryString.ToString(), new { id, statusid }, transaction: trans);
        }

        public int GetIDByOrderID(int orderid, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 id");
            queryString.Append(" FROM tbProductionChecklist");
            queryString.AppendFormat(" where isDeleted = 0 and orderid = {0}", orderid);

            return conn.QueryFirstOrDefault<int>(queryString.ToString(), new { orderid }, transaction: trans);
        }
    }
}

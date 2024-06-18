using Dapper;
using EntitiesMBDesign;
using System.Data.SqlClient;
using System.Text;

namespace DataLayerMBDesign
{
    public class PDRepository
    {
        public int? Add(tbProductionChecklist obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int? AddDetail(tbProductionCheckListDetail obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbProductionChecklist obj,  SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" update tbProductionChecklist");
            queryString.Append(" SET");
            queryString.Append(" updateDate = @updateDate,");
            queryString.Append(" updateBy = @updateBy");
           
            queryString.Append(" where isDeleted = 0 and id = @id");
            queryString.Append(" select @@ROWCOUNT;");

            return conn.QueryFirstOrDefault<int>(queryString.ToString(), new { obj.updateDate, obj.updateBy, obj.approveDate, obj.approveBy, obj.id }, transaction: trans);
        }

        public List<tbMasterCheckListProduction> getCheckListPD(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT * FROM
                                            tbMasterCheckListProduction
                                   WHERE status = 1 order by id asc";

            return conn.Query<tbMasterCheckListProduction>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public List<PDListModel> GetAll(string quatationcode, SqlConnection conn, SqlTransaction? trans = null)
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
                                               ,(select checklistname from tbMasterCheckListProduction where id = pd.checkliststatus) as checklistStatus
                                               ,case when s.updateDate is not null then s.updateDate else s.createDate end lastUpdateDate
                                               ,case when Isnull(s.updateDate,'') ='' then (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.createBy and isDeleted = 0) else (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.updateBy and isDeleted = 0) end lastUpdateBy
                                   from tbProductionChecklist p
                                   inner join tbProductionCheckListDetail pd on p.id = pd.productchecklistid
                                   inner join tbCustOrder co on p.orderid = co.orderid
								   inner join tbDesign3D d on co.orderId = d.orderId
								   inner join tbFitting f on f.orderid = co.orderId
								   inner join tbSpec s on s.orderid = co.orderid
                                   where d.checklistStatusId =14 and pd.checkliststatus = (select max(checkliststatus) from tbProductionCheckListDetail where productchecklistid = p.id and transactionActive = 'A' and transactionStatus = 'A')
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
                                   and co.orderid not in (select orderid from tbProductionChecklist pc where pc.orderid = co.orderid)";
            }
            else
            {
                queryString = string.Format(@"select p.id,p.orderid,s.id specid,f.id as fittingid,co.quotationNumber
                                               ,(select empFirstName +' '+empLastName from tbEmpData where id = d.ownerEmpId) as FullName
                                               ,pd.checkliststatus as statusid
                                               ,(select checklistname from tbMasterCheckListProduction where id = pd.checkliststatus) as checklistStatus
                                               ,case when s.updateDate is not null then s.updateDate else s.createDate end lastUpdateDate
                                               ,case when Isnull(s.updateDate,'') ='' then (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.createBy and isDeleted = 0) else (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.updateBy and isDeleted = 0) end lastUpdateBy
                                   from tbProductionChecklist p
                                   inner join tbProductionCheckListDetail pd on p.id = pd.productchecklistid
                                   inner join tbCustOrder co on p.orderid = co.orderid
								   inner join tbDesign3D d on co.orderId = d.orderId
								   inner join tbFitting f on f.orderid = co.orderId
								   inner join tbSpec s on s.orderid = co.orderid
                                   where d.checklistStatusId =14 and pd.checkliststatus = (select max(checkliststatus) from tbProductionCheckListDetail where productchecklistid = p.id and transactionActive = 'A' and transactionStatus = 'A')
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
								   and sd.checkliststatus in (5) and sd.TransactionActive= 'A'  and co.orderid not in (select orderid from tbProductionChecklist pc where pc.orderid = co.orderid) sd.TransactionStatus ='A' {0}", condition);
            }
            

            return conn.Query<PDListModel>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public List<PDListModel> GetAllPDListByID(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";


            condition += string.Format(" and p.id = {0}", id);


            string queryString = string.Format(@" select p.id,p.orderid,s.id specid,f.id as fittingid,co.quotationNumber
                                               ,(select empFirstName +' '+empLastName from tbEmpData where id = d.ownerEmpId) as FullName
                                               ,pd.checkliststatus as statusid
                                               ,(select checklistname from tbMasterCheckListProduction where id = pd.checkliststatus) as checklistStatus
                                               ,case when s.updateDate is not null then s.updateDate else s.createDate end lastUpdateDate
                                               ,case when Isnull(s.updateDate,'') ='' then (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.createBy and isDeleted = 0) else (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.updateBy and isDeleted = 0) end lastUpdateBy
                                   from tbProductionChecklist p
                                   inner join tbProductionCheckListDetail pd on p.id = pd.productchecklistid
                                   inner join tbCustOrder co on p.orderid = co.orderid
								   inner join tbDesign3D d on co.orderId = d.orderId
								   inner join tbFitting f on f.orderid = co.orderId
								   inner join tbSpec s on s.orderid = co.orderid
								   inner join tbSpecListDetail sd on s.id = sd.specid
                                   where d.checklistStatusId =14 and pd.TransactionStatus ='A' and sd.checkliststatus in (5) {0}", condition);

            return conn.Query<PDListModel>(queryString.ToString(), new { id }, transaction: trans).ToList();
        }

        public tbProductionChecklist GetFirstByID(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbProductionChecklist");
            queryString.AppendFormat(" where isDeleted = 0 and id = {0}", id);

            return conn.QueryFirstOrDefault<tbProductionChecklist>(queryString.ToString(), new { id }, transaction: trans);
        }
        public tbProductionCheckListDetail GetFirstDetailByID(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbProductionCheckListDetail");
            queryString.AppendFormat(" where isDeleted = 0 and id = {0}", id);

            return conn.QueryFirstOrDefault<tbProductionCheckListDetail>(queryString.ToString(), new { id }, transaction: trans);
        }

        public tbProductionCheckListDetail GetPDBySpecIDStatus(int id, int statusid, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@" SELECT TOP 1 *
                                          FROM tbProductionCheckListDetail
                                          WHERE transactionActive = 'A' AND transactionStatus = 'A'
                                          AND productchecklistid = {0} AND checkliststatus = {1}
                                        ", id, statusid);
            return conn.QueryFirstOrDefault<tbProductionCheckListDetail>(queryString.ToString(), new { id, statusid }, transaction: trans);
        }

        public List<EmpDataView> GetDataSelectPD(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                select *
                from (
                     select  a.empFirstName + ' ' + a.empLastName fullName, a.id empId
                     from tbEmpData a inner join tbDepartment d on a.departmentId = d.departmentId
                     where a.isDeleted = 0 and a.status = 1 and d.isDeleted= 0 and d.status= 1
                     and d.departmentName = N'ฝ่ายผลิต'
                ) a
                order by fullName";

            return conn.Query<EmpDataView>(queryString, transaction: trans).ToList();
        }
    }
}

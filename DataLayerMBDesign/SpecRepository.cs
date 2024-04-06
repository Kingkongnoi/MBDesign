using Dapper;
using EntitiesMBDesign;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Text;

namespace DataLayerMBDesign
{
    public class SpecRepository
    {
        public int? Add(tbSpec obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbSpec obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" update tbPlanks");
            queryString.Append(" set orderid= @orderid,");
            queryString.Append(" updateDate = @updateDate,");
            queryString.Append(" updateBy = @updateBy");
            //queryString.Append(" status = @status");
            queryString.Append(" where isDeleted = 0 and id = @id");
            queryString.Append(" select @@ROWCOUNT;");

            return conn.QueryFirstOrDefault<int>(queryString.ToString(), new { obj.orderid, obj.updateDate, obj.updateBy, obj.id }, transaction: trans);
        }

        public List<specListModel> GetAll(string quatationcode, string empName, int checkListstatus, string installDate, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(quatationcode) && quatationcode != "null")
            {
                condition += string.Format(" and co.quotationNumber like N'%{0}%'", quatationcode);
            }

            if (!string.IsNullOrEmpty(empName) && empName != "null")
            {
                condition += string.Format(" and (e.empFirstName + ' ' + e.empLastName) like N'%{0}%'", empName);
            }
            if (checkListstatus != 0)
            {
                condition += string.Format(" and sd.checkliststatus = {0}", checkListstatus);
            }
            if (!string.IsNullOrEmpty(installDate) && installDate != "null")
            {
                condition += string.Format(" and  FORMAT(co.installDate, 'yyyy-MM-dd') = N'{0}'", installDate);
            }
            string queryString = string.Format(@"select top 1 s.id,s.orderid,co.quotationNumber
                                               ,co.installDate
                                               ,(select empFirstName +' '+empLastName from tbEmpData where id = d.ownerEmpId) as FullName
                                               ,sd.commitDate
                                               ,sd.checkliststatus as statusid
                                               ,(select checklistname from tbMasterCheckListSpec where id = sd.checkliststatus) as checklistStatus
                                               ,case when s.updateDate is not null then s.updateDate else s.createDate end lastUpdateDate
                                               ,case when Isnull(s.updateDate,'') ='' then (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.createBy and isDeleted = 0) else (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.updateDate and isDeleted = 0) end lastUpdateBy
                                   from tbSpec s
                                   inner join tbSpecListDetail sd on s.id = sd.specid
                                   inner join tbCustOrder co on s.orderid = co.orderid
                                   inner join tbDesign3D d on co.orderId = d.orderId
                                   where d.checklistStatus = N'แบบ 3D Final' {0}
                                   order by sd.createDate desc", condition);

            return conn.Query<specListModel>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public tbSpec GetFirstByID(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbSpec");
            queryString.AppendFormat(" where isDeleted = 0 and id = {0}", id);

            return conn.QueryFirstOrDefault<tbSpec>(queryString.ToString(), new { id }, transaction: trans);
        }

        public List<listQuotationNumber> GetListQuotationNumbers(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select co.orderId,co.quotationNumber from tbCustOrder co
                                   inner join tbDesign3D d on co.orderId = d.orderId
                                   where co.status = 1 and d.checklistStatus = N'แบบ 3D Final' and d.orderId not in (select orderId from tbSpec where status = 1)
                                  ";

            return conn.Query<listQuotationNumber>(queryString, transaction: trans).ToList();
        }

        public specListModel GetSpecListByID(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (id > 0)
            {
                condition += string.Format(" and s.id = {0}", id);
            }

            string queryString = string.Format(@"select top 1 s.id,s.orderid,co.quotationNumber
                                               ,co.installDate
                                               ,(select empFirstName +' '+empLastName from tbEmpData where id = d.ownerEmpId) as FullName
                                               ,sd.commitDate
                                               ,sd.checkliststatus as statusid
                                               ,(select checklistname from tbMasterCheckListSpec where id = sd.checkliststatus) as checklistStatus
                                               ,case when s.updateDate is not null then s.updateDate else s.createDate end lastUpdateDate
                                               ,case when Isnull(s.updateDate,'') ='' then (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.createBy and isDeleted = 0) else (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.updateDate and isDeleted = 0) end lastUpdateBy
                                   from tbSpec s
                                   inner join tbSpecListDetail sd on s.id = sd.specid
                                   inner join tbCustOrder co on s.orderid = co.orderid
                                   inner join tbDesign3D d on co.orderId = d.orderId
                                   where d.checklistStatus = N'แบบ 3D Final' {0}
                                   order by sd.createDate desc", condition);

            return conn.QueryFirstOrDefault<specListModel>(queryString.ToString(), new { id }, transaction: trans);
        }

        public List<specListModel> GetAllSpecListByID(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (id > 0)
            {
                condition += string.Format(" and s.id = {0}", id);
            }

            string queryString = string.Format(@"select s.id,s.orderid,co.quotationNumber
                                               ,co.installDate
                                               ,(select empFirstName +' '+empLastName from tbEmpData where id = d.ownerEmpId) as FullName
                                               ,sd.commitDate
                                               ,sd.checkliststatus as statusid
                                               ,(select checklistname from tbMasterCheckListSpec where id = sd.checkliststatus) as checklistStatus
                                               ,case when s.updateDate is not null then s.updateDate else s.createDate end lastUpdateDate
                                               ,case when Isnull(s.updateDate,'') ='' then (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.createBy and isDeleted = 0) else (select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = s.updateDate and isDeleted = 0) end lastUpdateBy
                                   from tbSpec s
                                   inner join tbSpecListDetail sd on s.id = sd.specid
                                   inner join tbCustOrder co on s.orderid = co.orderid
                                   inner join tbDesign3D d on co.orderId = d.orderId
                                   where d.checklistStatus = N'แบบ 3D Final' {0}
                                   order by sd.createDate desc", condition);

            return conn.Query<specListModel>(queryString.ToString(), new { id }, transaction: trans).ToList();
        }

        public specNewListModel getNewSpecByQuotationID(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (id > 0)
            {
                condition += string.Format(" and co.orderId = {0}", id);
            }

            string queryString = string.Format(@"select top 1 0 as id,co.orderId,co.quotationNumber
                                               ,co.installDate
                                               ,(select empFirstName +' '+empLastName from tbEmpData where id = d.ownerEmpId) as FullName
                                               ,'' as dueDate
                                               ,case when co.updateDate is not null then co.updateDate else co.createDate end lastUpdateDate
                                               ,case when co.updateBy is not null then isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = co.updateBy and isDeleted = 0),'') end lastUpdateBy
                                   from tbCustOrder co
                                   inner join tbDesign3D d on co.orderId = d.orderId
                                   
                                   where d.checklistStatus = N'แบบ 3D Final' {0}
                                   order by co.createDate desc", condition);

            return conn.QueryFirstOrDefault<specNewListModel>(queryString.ToString(), new { id }, transaction: trans);
        }

        public List<tbMasterCheckListSpec> getCheckList(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT * FROM
                                            tbMasterCheckListSpec
                                   WHERE status = 1 order by id asc";
           
            return conn.Query<tbMasterCheckListSpec>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public Design3DView GetEditDesign3DByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @" select top 1 a.*, b.quotationNumber, b.installDate, case when a.checklistStatus = N'แบบ 3D Final' then 1 else 0 end isCheckFinal3d,b.orderNote
                            from tbDesign3D a inner join tbCustOrder b on a.orderId = b.orderId
                            where a.isDeleted = 0 and a.status = 1 and b.isDeleted = 0 and b.status = 1
                            and a.orderId = @orderId";

            return conn.QueryFirstOrDefault<Design3DView>(queryString, new { orderId }, transaction: trans);
        }

        public List<UploadView> GetUploadByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT a.uploadId
            ,a.orderId
            ,a.uploadCategoryId
            ,a.urlId
            ,a.[status]
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted
            ,b.name categoryName
            ,c.[url]
            ,c.[fileName]
            ,c.fileSize
            FROM tbUpload a inner join tbUploadCategory b  on a.uploadCategoryId = b.id
            inner join tbUploadUrl c on a.urlId = c.urlId
            where a.isDeleted = 0 and b.isDeleted = 0 and a.status = 1 and b.status = 1 and c.isDeleted = 0 and c.status = 1
            and a.orderId = @orderId
            order by a.uploadId";

            return conn.Query<UploadView>(queryString, new { orderId }, transaction: trans).ToList();
        }
    }
}
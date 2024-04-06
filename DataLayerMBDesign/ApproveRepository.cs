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
    public class ApproveRepository
    {
        public int? Add(tbApprove obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public List<ApproveView> GetApproveHistory(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT a.approveId
            ,a.orderId
            ,isnull((select top 1 name from tbStatus where isDeleted = 0 and status = 1 and statusId = isnull(a.approveStatusId,0)),'') approveStatus
            ,isnull(a.approveComment,'') approveComment
            ,a.[status]
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted
            ,b.quotationNumber
            ,c.custFirstName + ' ' + c.custSurName cusName
            ,isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.createBy and isDeleted = 0),'') createByName     
            ,a.approveStatusId
            FROM tbApprove a inner join tbCustOrder b  on a.orderId = b.orderId
            inner join tbCust c on b.custId = c.custId
            where a.isDeleted = 0 and a.[status] = 1 and b.isDeleted = 0 and b.[status] = 1 and c.isDeleted = 0 and c.[status] = 1
            order by a.approveId";

            return conn.Query<ApproveView>(queryString, new { }, transaction:trans).ToList();
            
        }
    }
}

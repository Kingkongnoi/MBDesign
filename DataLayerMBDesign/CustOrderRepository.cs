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
    public class CustOrderRepository
    {
        public int? Add(tbCustOrder obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int GetLastestQuotationNumberByType(string type, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 isnull(quotationNumberGen,0) quotationNumberGen
                                from tbCustOrder
                                where quotationNumberType = @type
                                order by quotationNumberGen desc";

            return conn.QueryFirstOrDefault<int>(queryString, new { type }, transaction: trans);
        }

        public tbCustOrder GetFirstByOrderIdSortDesc(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 *
                                from tbCustOrder
                                where orderId = @orderId and isDeleted = 0
                                order by orderId desc";

            return conn.QueryFirstOrDefault<tbCustOrder>(queryString, new { orderId }, transaction: trans);
        }

        public List<CustOrderView> GetQuotationList(string quotationNumber, string quotationCusName, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(quotationNumber) && quotationNumber != "%%")
            {
                condition += string.Format(" and a.quotationNumber like '%{0}%'", quotationNumber);
            }

            if (!string.IsNullOrEmpty(quotationCusName) && quotationCusName != "%%")
            {
                condition += string.Format(" and (b.custFirstName + ' ' + b.custSurName) like N'%{0}%'", quotationCusName);
            }

            if (!string.IsNullOrEmpty(status) && status != "%%")
            {
                condition += string.Format(" and a.orderStatus = N'{0}'", status);
            }
            string queryString = string.Format(@"select a.orderId, a.quotationNumber, b.custFirstName + ' ' + b.custSurName fullName, a.createDate, a.createBy, a.updateDate, a.updateBy, a.orderStatus
                                from tbCustOrder a inner join tbCust b on a.custId = b.custId 
                                where a.isDeleted = 0 and b.isDeleted = 0
                                {0}
                                order by orderId", condition);

            return conn.Query<CustOrderView>(queryString, transaction:trans ).ToList();

        }
    }
}

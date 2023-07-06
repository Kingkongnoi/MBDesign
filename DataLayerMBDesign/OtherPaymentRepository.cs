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
    public class OtherPaymentRepository
    {
        public int? Add(tbOtherPayment obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public List<OtherPaymentView> GetAll(string empCode, string empName, string type, string installmentStartDate, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(empCode) && empCode != "null")
            {
                condition += string.Format(" and b.empCode like N'%{0}%'", empCode);
            }

            if (!string.IsNullOrEmpty(empName) && empName != "null")
            {
                condition += string.Format(" and (b.empFirstName + ' ' + b.empLastName) like N'%{0}%'", empName);
            }

            if (!string.IsNullOrEmpty(type) && type != "null")
            {
                condition += string.Format(" and a.type = N'{0}'", type);
            }

            if (!string.IsNullOrEmpty(installmentStartDate) && installmentStartDate != "null")
            {
                condition += string.Format(" and FORMAT(a.installmentStartDate, 'yyyy-MM') = '{0}'", installmentStartDate);
            }

            string queryString = string.Format(@"select a.otherPaymentId, a.empId, a.type, b.empCode, b.empFirstName + ' ' + b.empLastName empFullName, a.amount, a.installmentQty, a.installmentAmount, a.installmentStartDate, a.remark, a.createDate, a.createBy, a.updateDate, a.updateBy
                                , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.createBy and isDeleted = 0),'') createByName
                                , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.updateBy and isDeleted = 0),'') updateByName        
                                from tbOtherPayment a inner join tbEmpData b on a.empId = b.id
                                where a.isDeleted = 0 and b.isDeleted = 0
                                {0}
                                order by a.otherPaymentId desc
                                ", condition);

            return conn.Query<OtherPaymentView>(queryString, new { }, transaction: trans).ToList();
        }

        public tbOtherPayment GetFirstByKeyId(int otherPaymentId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
            SELECT TOP 1 otherPaymentId
            ,empId
            ,type
            ,amount
            ,installmentQty
            ,installmentAmount
            ,installmentStartDate
            ,remark
            ,[status]
            ,createDate
            ,createBy
            ,updateDate
            ,updateBy
            ,isDeleted
            FROM tbOtherPayment
            where isDeleted = 0 and otherPaymentId = @otherPaymentId";

            return conn.QueryFirstOrDefault<tbOtherPayment>(queryString, new { otherPaymentId }, transaction: trans);
        }
    }
}

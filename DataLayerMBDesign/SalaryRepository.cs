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
    public class SalaryRepository
    {
        public List<SalaryView> GetAll(string empCode, string empName, /*string leaveType,*/ string startDate, string endDate, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(empCode) && empCode != "null")
            {
                condition += string.Format(" and b.empCode like '%{0}%'", empCode);
            }

            if (!string.IsNullOrEmpty(empName) && empName != "null")
            {
                condition += string.Format(" and(b.empFirstName + ' ' + b.empLastName) like '%{0}%'", empName);
            }

            if ((!string.IsNullOrEmpty(startDate) && startDate != "null") && (string.IsNullOrEmpty(endDate) && endDate == "null"))
            {
                condition += string.Format(" and  FORMAT(a.paymentPeriod, 'yyyy-MM-dd') = N'{0}'", startDate);
            }

            if ((!string.IsNullOrEmpty(startDate) && startDate != "null") && (!string.IsNullOrEmpty(endDate) && endDate != "null"))
            {
                condition += string.Format(" and  FORMAT(a.paymentPeriod, 'yyyy-MM-dd') between N'{0}' and N'{1}'", startDate, endDate);
            }

            string queryString = string.Format(@"SELECT a.salaryId
            ,a.empId
            ,a.paymentPeriod
            ,a.salary
            ,a.diligenceAllowance
            ,a.ot
            ,a.bonus
            ,a.commission
            ,a.totalExpenses
            ,a.totalSalary
            ,a.status
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted
            ,b.empCode
            ,b.empFirstName + ' ' + b.empLastName employeeName
            ,b.salaryType
            ,c.departmentName
            FROM tbSalary a inner join tbEmpData b on a.empId = b.id
            inner join tbDepartment c on b.departmentId = c.departmentId
            where a.isDeleted = 0 and b.isDeleted = 0 and c.isDeleted = 0
            {0}
            order by b.empCode", condition);

            return conn.Query<SalaryView>(queryString, new { }, transaction: trans).ToList();
        }

        public SalaryView GetPaySlipDetailBySalaryId(int salaryId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT top 1 a.salaryId
            ,a.empId
            ,a.paymentPeriod
            ,a.salary
            ,a.diligenceAllowance
            ,a.ot
            ,a.bonus
            ,a.commission
            ,a.totalExpenses
            ,a.totalSalary
            ,a.status
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted
            ,b.empCode
            ,b.empFirstName + ' ' + b.empLastName employeeName
            ,b.salaryType
            ,c.departmentName
            ,a.social
            ,a.tax
            ,a.advance
            ,a.electricity
            ,a.installment
            ,a.home
            ,a.attendance
            FROM tbSalary a inner join tbEmpData b on a.empId = b.id
            inner join tbDepartment c on b.departmentId = c.departmentId
            where a.isDeleted = 0 and b.isDeleted = 0 and c.isDeleted = 0
            and a.salaryId = @salaryId
            order by b.empCode";

            return conn.QueryFirstOrDefault<SalaryView>(queryString, new { salaryId }, transaction: trans);
        }
    }
}

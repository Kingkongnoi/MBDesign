using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbSalary
    {
        [Key]
        public int salaryId { get; set; }
        public int empId { get; set; }
        public DateTime paymentPeriod { get; set; }
        public decimal salary { get; set; }
        public decimal diligenceAllowance { get; set; }
        public decimal ot { get; set; }
        public decimal bonus { get; set; }
        public decimal commission { get; set; }
        public decimal totalExpenses { get; set; }
        public decimal totalSalary { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class SalaryView : tbSalary
    {
        public string empCode { get; set; } = string.Empty;
        public string employeeName { get; set; } = string.Empty;
        public string departmentName { get; set; } = string.Empty;
        public string salaryType { get; set; } = string.Empty;
    }
}

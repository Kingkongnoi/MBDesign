using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbCommission
    {
        [Key]
        public int commissionId { get; set; }
        public DateTime commissionDate { get; set; }
        public decimal monthlySales { get; set; }
        public decimal commission { get; set; }
        public decimal bonus { get; set; }
        public string saleEmpCode { get; set; } = string.Empty;
        public string commissionStatus { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class CommissionView : tbCommission
    {
        public string cvtCommissionDate { get; set; } = string.Empty;
        public string saleEmpName { get; set; } = string.Empty;
        public string quotationNumber { get; set; } = string.Empty;
        public decimal unitPrice { get; set; }
        public string period { get; set; } = string.Empty;
        public string invoiceStatus { get; set; } = string.Empty;
        public string commissionBillStatus { get; set; } = string.Empty;
    }
}

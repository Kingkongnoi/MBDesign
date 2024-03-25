using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbInvoice
    {
        [Key]
        public int id { get; set; }
        public string invoiceNumber { get; set; } = string.Empty;
        public int invoiceNumberGen { get; set;}
        public string invoiceYearMonthGen { get; set; } = string.Empty;
        public string quotationNumber { get; set; } = string.Empty;
        public int orderId { get; set; }
        public int custId { get; set; }
        public decimal unitPrice { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
        public int invoiceStatusId { get; set; }
        public int periodStatusId { get; set; }
    }

    public class InvoiceView : tbInvoice
    {
        public string fullPeriod { get; set; } = string.Empty;
        public string invoiceStatus { get; set; } = string.Empty;
        public string period { get; set; } = string.Empty;
    }
}

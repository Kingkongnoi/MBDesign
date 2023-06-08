using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class AccountingModel
    {
        public string custFirstName { get; set; } = string.Empty;
        public string custSurName { get; set; } = string.Empty;
        public string custAddress { get; set; } = string.Empty;
        public int custId { get; set; }
        public string loginCode { get; set; } = string.Empty;

    }
    public class InvoiceModel
    {
        public string invoiceNumber { get; set; } = string.Empty;
        public int invoiceNumberGen { get; set; }
        public string invoiceYearMonthGen { get; set; } = string.Empty;
        public string quotationNumber { get; set; } = string.Empty;
        public string period { get; set; } = string.Empty;
        public int orderId { get; set; }
        public int custId { get; set; }
        public string custFirstName { get; set; } = string.Empty;
        public string custSurName { get; set; } = string.Empty;
        public string custTel { get; set; } = string.Empty;
        public decimal unitPrice { get; set; }
        public string invoiceStatus { get; set; } = string.Empty;
        public string custInstallAddress { get; set; } = string.Empty;
        public int invoiceId { get; set; }
        public string loginCode { get; set; } = string.Empty;
    }
}

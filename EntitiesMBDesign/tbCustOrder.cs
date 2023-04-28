using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbCustOrder
    {
        [Key]
        public int orderId { get; set; }
        public string quotationType { get; set; } = string.Empty;
        public int custId { get; set; }
        public DateTime installDate { get; set; }
        public string orderNote { get; set; } = string.Empty;
        public decimal discount { get; set; }
        public decimal vat { get; set; }
        public decimal subTotal { get; set; }
        public decimal grandTotal { get; set; }
        public decimal disposite { get; set; }
        public int accountId { get; set; }
        public string quotationNumber { get; set; } = string.Empty;
        public string quotationFileName { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
        public int quotationNumberGen { get; set; }
        public string quotationNumberType { get; set; } = string.Empty;
        public string orderStatus { get; set; } = string.Empty;
    }

    public class CustOrderView : tbCustOrder
    {
        public string fullName { get; set; } = string.Empty;
    }
}

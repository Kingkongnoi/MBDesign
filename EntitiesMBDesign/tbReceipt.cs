using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbReceipt
    {
        [Key]
        public int id { get; set; }
        public string receiptNumber { get; set; } = string.Empty;
        public int receiptNumberGen { get; set; }
        public string receiptYearMonthGen { get; set; } = string.Empty;
        public int? orderId { get; set; }
        public int? custId { get; set; }
        public int? invoiceId { get; set; }
        public string receiptFileName { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }
}

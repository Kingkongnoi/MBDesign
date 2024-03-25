using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbForeman
    {
        [Key]
        public int id { get; set; }
        public int orderId { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
        public int foremanStatusId { get; set; }
    }

    public class ForemanView : tbForeman
    {
        public string quotationNumber { get; set; } = string.Empty;
        public string contractNumber { get; set; } = string.Empty;
        public string orderNote { get; set; } = string.Empty;
        public decimal orderNotePrice { get; set; }
        public decimal discount { get; set; }
        public decimal vat { get; set; }
        public decimal grandTotal { get; set; }
        public int accountId { get; set; }
        public string accountName { get; set; } = string.Empty;
        public string accountNumber { get; set; } = string.Empty;
        public string accountType { get; set; } = string.Empty;
        public string bank { get; set; } = string.Empty;
        public string foremanStatus { get; set; } = string.Empty;
    }
}

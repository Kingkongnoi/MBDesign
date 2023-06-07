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
        public string quotationComment { get; set; } = string.Empty;
        public decimal orderNotePrice { get; set; }
        public string quotationYearMonthGen { get; set; } = string.Empty;
    }

    public class CustOrderView : tbCustOrder
    {
        public string fullName { get; set; } = string.Empty;
        public int itemId { get; set; }
        public decimal orderLength { get; set; }
        public decimal orderDepth { get; set; }
        public decimal orderHeight { get; set; }
        public int custOrderDetailId { get; set; }
        public int custOrderItemOptionsId { get; set; }
        public string itemName { get; set; } = string.Empty;
        public decimal itemPrice { get; set; }
        public int optionsId { get; set; }
        public string options { get; set; } = string.Empty;
        public decimal optionsPrice { get; set; }
        public int styleId { get; set; }
        public string styleName { get; set; } = string.Empty;
        public string floor { get; set; } = string.Empty;
        public string zone { get; set; } = string.Empty;
        public string accountName { get; set; } = string.Empty;
        public string accountNumber { get; set; } = string.Empty;
        public string accountType { get; set; } = string.Empty;
        public string ownerEmpName { get; set; } = string.Empty;
        public DateTime? dueDate { get; set; }
        public string checklistStatus { get; set; } = string.Empty;
        public DateTime? lastUpdateDate { get; set; }
        public string lastUpdateBy { get; set; } = string.Empty;
        public string cusName { get; set; } = string.Empty;
        public string foremanStatus { get; set; } = string.Empty;
        public int design3dId { get; set; }
        public int foremanId { get; set; }
        public string contractStatus { get; set; } = string.Empty;
        public string invoiceStatus { get; set; } = string.Empty;
        public string contractNumber { get; set; } = string.Empty;
        public string custAddress { get; set; } = string.Empty;
        public string custFirstName { get; set; } = string.Empty;
        public string custSurName { get; set; } = string.Empty;
        public DateTime? contractCreateDate { get; set; }
        public string contractCreateBy { get; set; } = string.Empty;
        public DateTime? contractUpdateDate { get; set; }
        public string contractUpdateBy { get; set; } = string.Empty;
        public int contractId { get; set; }
        public int invoiceId { get; set; }
        public string invoicePeriod { get; set; } = string.Empty;
        public string invoiceNumber { get; set; } = string.Empty;
        public string bank { get; set; } = string.Empty;
        public string receiptNumber { get; set; } = string.Empty;
    }
}

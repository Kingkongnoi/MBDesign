using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbCustOrderDetail
    {
        [Key]
        public int custOrderDetailId { get; set; }
        public int orderId { get; set; }
        public int styleId { get; set; }
        public string floor { get; set; } = string.Empty;
        public string zone { get; set; } = string.Empty;
        public int typeId { get; set; }
        public int itemId { get; set; }
        public decimal orderLength { get; set; }
        public decimal orderDepth { get; set; }
        public decimal orderHeight { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class CustOrderDetailView : tbCustOrderDetail
    {
        public string itemName { get; set; } = string.Empty;
        public decimal itemPrice { get; set; }
        public string styleName { get; set; } = string.Empty;
        public string typeName { get; set; } = string.Empty;
        public decimal typePrice { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbProductItemQuickQT
    {
        [Key]
        public int itemId { get; set; }
        public string itemCode { get; set; } = string.Empty;
        public string itemText { get; set; } = string.Empty;
        public int typeId { get; set; }
        public decimal itemPrice { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class ProductItemQuickQTView : tbProductItemQuickQT
    {
        public string typeName { get; set; } = string.Empty;
        public decimal price { get; set; }
        public string fullItemPrice { get; set; } = string.Empty;
        public string createByName { get; set; } = string.Empty;
        public string updateByName { get; set; } = string.Empty;
    }

    public class ProductItemQuickQTModel
    {
        public int itemId { get; set; }
        public string itemCode { get; set; } = string.Empty;
        public string itemText { get; set; } = string.Empty;
        public int typeId { get; set; }
        public decimal itemPrice { get; set; }
        public bool status { get; set; } = true;
        public string loginCode { get; set; } = string.Empty;
    }
}

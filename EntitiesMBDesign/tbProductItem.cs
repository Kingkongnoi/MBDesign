using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbProductItem
    {
        [Key]
        public int itemId { get; set; }
        public string itemName { get; set; } = string.Empty;
        public int typeId { get; set; }
        public decimal itemPrice { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class ProductItemView : tbProductItem
    {
        public string typeName { get; set; } = string.Empty;
        public decimal price { get; set; }
    }

    public class ProductItemModel
    {
        public int itemId { get; set; }
        public string itemName { get; set; } = string.Empty;
        public int typeId { get; set; }
        public decimal itemPrice { get; set; }
        public bool status { get; set; } = true;
    }
}

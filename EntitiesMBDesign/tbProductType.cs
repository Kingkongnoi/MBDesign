using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbProductType
    {
        [Key]
        public int typeId { get; set; }
        public string typeName { get; set; } = string.Empty;
        public decimal length { get; set; }
        public decimal depth { get; set; }
        public decimal height { get; set; }
        public decimal typePrice { get; set; }
        public string imageFileName { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class ProductTypeView : tbProductType
    {
        public string createByName { get; set; } = string.Empty;
        public string updateByName { get; set; } = string.Empty;
        public string fullTypePrice { get; set; } = string.Empty;
    }

    public class ProductTypeModel
    {
        public int typeId { get; set; }
        public string typeName { get; set; } = string.Empty;
        public decimal typePrice { get; set; }
        public bool status { get; set; } = true;
        public string loginCode { get; set; } = string.Empty;
    }
}

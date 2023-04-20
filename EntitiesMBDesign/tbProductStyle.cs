using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbProductStyle
    {
        [Key]
        public int styleId { get; set; }
        public string styleName { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class ProductStyleModel
    {
        public int styleId { get; set; }
        public string styleName { get; set; } = string.Empty;
        public bool status { get; set; } = true;
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbStockProduct
    {
        [Key]
        public int id { get; set; }
        public string productcode { get; set; } = string.Empty;
        public string productname { get; set; } = string.Empty;
        public int stockamount { get; set; }
        public decimal productprice { get; set; }
        public int groupid { get; set; }
        public int subgroupid { get; set; }
        public int brandid { get; set; }
        public int stockid { get; set; }
        public int unitmasterid { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class StockProductItemModel : tbStockProduct
    {
        public string groupname { get; set; } = string.Empty;
        public string subgroupname { get; set; } = string.Empty;
        public string brandname { get; set; } = string.Empty;
        public string stockname { get; set; } = string.Empty;
        public string unitname { get; set; } = string.Empty;
        public string loginCode { get; set; } = string.Empty;
    }
    public class StockProductAddModel
    {
        public int id { get; set; }
        public string productcode { get; set; } = string.Empty;
        public string productname { get; set; } = string.Empty;
        public int stockamount { get; set; }
        public decimal productprice { get; set; }
        public int groupid { get; set; }
        public int subgroupid { get; set; }
        public int brandid { get; set; }
        public int stockid { get; set; }
        public int unitmasterid { get; set; }
        public bool status { get; set; } = true;
        public string loginCode { get; set; } = string.Empty;
    }

}

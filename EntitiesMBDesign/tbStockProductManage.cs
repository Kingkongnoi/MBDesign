using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbStockProductManage
    {
        [Key]
        public int id { get; set; }
        public string documentcode { get; set; } = string.Empty;
        public int stockid { get; set; }
        public string stockproductcode { get; set; } = string.Empty;
        public string dealername { get; set; } = string.Empty;
        public int receiverid { get; set; }
        public string actiontype { get; set; } = string.Empty;
        public DateTime actiondate { get; set; }
        public int amount { get; set; }
        public string remark { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string updateBy { get; set; } = string.Empty;
        public bool isDeleted { get; set; } = false;

    }

    public class StockManageAddModel
    {
        public int id { get; set; }
        public string documentcode { get; set; } = string.Empty;
        public int stockid { get; set; }
        public string stockproductcode { get; set; } = string.Empty;
        public string dealername { get; set; } = string.Empty;
        public int receiverid { get; set; }
        public string actiondate { get; set; } = string.Empty;
        public string actiontype { get; set; } = string.Empty;
        public int amount { get; set; }
        public string remark { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public string loginCode { get; set; } = string.Empty;
    }

    public class StockManageItemModel : tbStockProductManage
    {
        public string productname { get; set; } = string.Empty;
        public string stockname { get; set; } = string.Empty;
        public string fullname { get; set; } = string.Empty;
        public string unitname { get; set; } = string.Empty;
        public decimal productprice { get; set; }
        public decimal totalprice { get; set; }
    }
}

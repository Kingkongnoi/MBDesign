using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbStockProductManageMaster
    {
        [Key]
        public int id { get; set; }
        public string documentcode { get; set; } = string.Empty;
        public string actiontype { get; set; } = string.Empty;
        public DateTime actiondate { get; set; }
        public int receiverid { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string updateBy { get; set; } = string.Empty;
        public bool isDeleted { get; set; } = false;
        //public string RecName { get; set; } = string.Empty;
        //public string positionName { get; set; } = string.Empty;
    }

    public class ModelMasterManage : tbStockProductManageMaster
    {
        public string RecName { get; set; } = string.Empty;
        public string positionName { get; set; } = string.Empty;
    }
}

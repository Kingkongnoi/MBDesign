using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbProductionCheckListDetail
    {
        [Key]
        public int id { get; set; }
        public int productchecklistid { get; set; }
        public string empid { get; set; } =string.Empty;
        public int checkliststatus { get; set; }
        public string transactionActive { get; set; } = string.Empty;
        public string transactionStatus { get; set; } = string.Empty;
        public bool isApprove { get; set; }
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string updateBy { get; set; } = string.Empty;
        public bool isDeleted { get; set; } = false;
    }

    public class PDListDetailItemModel : tbProductionCheckListDetail
    {
        public string createByName { get; set; } = string.Empty;
        public string updateByName { get; set; } = string.Empty;

        public string loginCode { get; set; } = string.Empty;
    }

    public class PDListDetailUpdateItemModel : tbProductionCheckListDetail
    {
      
        public string listStatus { get; set; } = string.Empty;
        public string createByName { get; set; } = string.Empty;
        public string updateByName { get; set; } = string.Empty;
        public string approveDate { get; set; } = string.Empty;
        public string loginCode { get; set; } = string.Empty;
    }
}

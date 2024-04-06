using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace EntitiesMBDesign
{
    public class tbSpecListDetail
    {
        [Key]
        public int id { get; set; }
        public int specid { get; set; }
        public string empid { get; set; }
        public DateTime? commitDate { get; set; }
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

    public class specListDetailItemModel : tbSpecListDetail
    {
        public string createByName { get; set; } = string.Empty;
        public string updateByName { get; set; } = string.Empty;

        public string loginCode { get; set; } = string.Empty;
    }
}

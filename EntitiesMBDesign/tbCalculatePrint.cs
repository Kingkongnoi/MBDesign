using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbCalculatePrint
    {
        [Key]
        public int id { get; set; }
        public int calculateMasterID { get; set; }
        public int custid { get; set; }
        public string transactionActive { get; set; } = string.Empty;
        public string transactionStatus { get; set; } = string.Empty;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string updateBy { get; set; } = string.Empty;
    }

    public class CalculatePrintAddModel
    {
        public int calculateMasterID { get; set;}
        public int custid { get; set;}
        public string loginCode { get; set; } = string.Empty;
    }
}

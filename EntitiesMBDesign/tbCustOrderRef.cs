using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbCustOrderRef
    {
        [Key]
        public int orderRefId { get; set; }
        public int orderId { get; set; }
        public string imgPlanFileName { get; set; } = string.Empty;
        public string imgRefFilename { get; set; } = string.Empty;
        public string imgSlipDepositeFileName { get; set; } = string.Empty;
        public string imgIdCardFileName { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }
}

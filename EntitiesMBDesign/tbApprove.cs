using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbApprove
    {
        [Key]
        public int approveId { get; set; }
        public int orderId { get; set; }
        public string approveStatus { get; set; } = string.Empty;
        public string approveComment { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class ApproveView : tbApprove
    {
        public string quotationNumber { get; set; } = string.Empty;
        public string cusName { get; set; } = string.Empty;
    }

    public class ApproveModel
    {
        public int orderId { get; set; }
        public string approveStatus { get; set; } = string.Empty;
        public string approveComment { get; set; } = string.Empty;
    }

}

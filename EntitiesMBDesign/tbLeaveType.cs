using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbLeaveType
    {
        [Key]
        public int leaveTypeId { get; set; }
        public string leaveTypeName { get; set; } = string.Empty;
        public int leaveTypeDays { get; set; }
        public string leaveTypeDetail { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class LeaveTypeView : tbLeaveType
    {
        public string createByName { get; set; } = string.Empty;
        public string updateByName { get; set; } = string.Empty;
    }

    public class LeaveTypeModel
    {
        public int leaveTypeId { get; set; }
        public int leaveTypeDays { get; set; }
        public bool status { get; set; }
        public string updateBy { get; set; } = string.Empty;
    }
}

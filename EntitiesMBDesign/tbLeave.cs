using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbLeave
    {
        [Key]
        public int leaveId { get; set; }
        public int empId { get; set; }
        public int leaveTypeId { get; set; }
        public DateTime leaveStartDate { get; set; }
        public DateTime leaveEndDate { get; set; }
        public int leaveHours { get; set; }
        public decimal leaveDays { get; set; }
        public string leaveRemark { get; set; } = string.Empty;
        public string leaveDocument { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class LeaveView : tbLeave
    {
        public string empCode { get; set; } = string.Empty;
        public string empFullName { get; set; } = string.Empty;
        public string leaveTypeName { get; set; } = string.Empty;
        public string createByName { get; set; } = string.Empty;
        public string updateByName { get; set; } = string.Empty;
    }

    public class LeaveModel
    {
        public int leaveId { get; set; }
        public int empId { get; set; }
        public string leaveTypeName { get; set; } = string.Empty;
        public DateTime leaveStartDate { get; set; }
        public DateTime leaveEndDate { get; set; }
        public int leaveHours { get; set; }
        public string leaveDays { get; set; } = string.Empty;
        public string leaveRemark { get; set; } = string.Empty;
        public string userCode { get; set; } = string.Empty;
    }
}

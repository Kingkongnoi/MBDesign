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
        public int leaveDays { get; set; }
        public string leaveRemark { get; set; } = string.Empty;
        public string leaveDocument { get; set; } = string.Empty;
    }

    public class LeaveInformationView : tbLeave
    {

    }

    public class LeaveInformationModel
    {

    }
}

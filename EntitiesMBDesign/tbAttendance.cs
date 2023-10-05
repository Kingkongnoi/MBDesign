using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbAttendance
    {
        [Key]
        public int attendanceId { get; set; }
        public int empId { get; set; }
        public DateTime attendanceDate { get; set; }
        public string attendanceTimeIn { get; set; } = string.Empty;
        public string attendanceTimeOut { get; set; } = string.Empty;
        public decimal attendanceHour { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class AttendanceView : tbAttendance
    {
        public string empCode { get; set; } = string.Empty;
        public string employeeName { get; set; } = string.Empty;
        public string createByName { get; set; } = string.Empty;
        public string updateByName { get; set; } = string.Empty;
        public int departmentId { get; set; }
        public string departmentName { get; set; } = string.Empty;
        public string salaryType { get; set; } = string.Empty;
        public string attendanceType { get; set; } = string.Empty;
        public string amountDeducted { get; set; } = string.Empty;
        public string remark { get; set; } = string.Empty;
        public string diligenceAllowance { get; set; } = string.Empty;
        public int otHours { get; set; }
        public string ot { get; set; } = string.Empty;
        public string attendanceTime { get; set; } = string.Empty;
        public string inOut { get; set; } = string.Empty;
        public string no { get; set; } = string.Empty;
        public string createdBy { get; set; } = string.Empty;
    }

    public class AttendanceModel
    {
        public string empCode { get; set; } = string.Empty;
        public DateTime attendanceDate { get; set; }
        public string attendanceTimeIn { get; set; } = string.Empty;
        public string attendanceTimeOut { get; set; } = string.Empty;
        public decimal attendanceHour { get; set; }
        public string createBy { get; set; } = string.Empty;
    }
}

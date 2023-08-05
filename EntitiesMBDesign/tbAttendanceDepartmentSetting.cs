using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbAttendanceDepartmentSetting
    {
        [Key]
        public int id { get; set; }
        public int departmentId { get; set; }
        public string attendanceTimeIn { get; set; } = string.Empty;
        public string attendanceTimeOut { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class AttendanceDepartmentSettingView : tbAttendanceDepartmentSetting
    {
        public int rowNo { get; set; }
        public string departmentName { get; set; } = string.Empty;
        public string createByName { get; set; } = string.Empty;
        public string updateByName { get; set; } = string.Empty;
    }

    public class AttendanceDepartmentSettingModel
    {
        public int id { get; set; }
        public int departmentId { get; set;}
        public string attendanceTimeIn { get; set; } = string.Empty;
        public string attendanceTimeOut { get; set; } = string.Empty;
        public string userCode { get; set; } = string.Empty;
        public bool status { get; set; } = true;
    }
}

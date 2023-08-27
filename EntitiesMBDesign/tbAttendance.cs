﻿using System;
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
        public int attendanceHour { get; set; }
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
    }
}
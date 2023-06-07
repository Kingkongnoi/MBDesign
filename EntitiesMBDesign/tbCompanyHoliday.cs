using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbCompanyHoliday
    {
        [Key]
        public int holidayId { get; set; }
        public string day { get; set; } = string.Empty;
        public string holiday { get; set; } = string.Empty;
        public DateTime holidayDate { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class CompanyHolidayView : tbCompanyHoliday
    {
        public string holidayYear { get; set; } = string.Empty;
        public string createByName { get; set; } = string.Empty;
        public string updateByName { get; set; } = string.Empty;
    }

    public class CompanyHolidayModel
    {
        public int holidayId { get; set; }
        public string day { get; set; } = string.Empty;
        public string holiday { get; set; } = string.Empty;
        public string holidayDate { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public string loginCode { get; set; } = string.Empty;

    }
}

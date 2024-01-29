using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbCalculateDetail
    {
        [Key]
        public int id { get; set; }
        public int calculateMasterID { get; set; }
        public string productcode { get; set; } = string.Empty;
        public string glassdoortype { get; set; } = string.Empty;
        public int masterheigh { get; set; }
        public int masterwidth { get; set; }
        public float? calheigh { get; set; }
        public float? calwidth { get; set; }
        public float? deburringheigh { get; set; }
        public float? deburringwidth { get; set; }
    }

    public class CalculateDetailItemModel : tbCalculateDetail
    {
        public string calculatecode { get; set; } = string.Empty;
        public string productname { get; set; } = string.Empty;
        public string createByName { get; set; } = string.Empty;
        public string updateByName { get; set; } = string.Empty;
    }

    public class CalculateDetailAddModel
    {
        public int id { get; set; }
        public int calculateMasterID { get; set; }
        public string productcode { get; set; } = string.Empty;
        public string glassdoortype { get; set; } = string.Empty;
        public int masterheigh { get; set; }
        public int masterwidth { get; set; }
        public float calheigh { get; set; }
        public float calwidth { get; set; }
        public float deburringheigh { get; set; }
        public float deburringwidth { get; set; }
        public string calculatecode { get; set; } = string.Empty;
        public string loginCode { get; set; } = string.Empty;
    }

    public class SaveCalculate
    {
        public string calculatecode { get; set; } = string.Empty;
        public string userlogin { get; set; } = string.Empty;
        public List<SaveCalculateDetail> listdetail { get; set; } = new List<SaveCalculateDetail>();
    }
    public class SaveCalculateDetail
    {
        public string product { get; set; } = string.Empty;
        public string glassdoortype { get; set; } = string.Empty;
        public string producttext { get; set; } = string.Empty;
        public string calhm { get; set; } = string.Empty;
        public string calwm { get; set; } = string.Empty;
        public string calh { get; set; } = string.Empty;
        public string calw { get; set; } = string.Empty;
        public string calhdel { get; set; } = string.Empty;
        public string calwdel { get; set; } = string.Empty;
        public string glassdoortypetext { get; set; } = string.Empty;
    }

    public class CustDetailModel
    {
        public DateTime installDate { get; set; }
        public string custInstallAddress { get; set; } = string.Empty;
    }
}

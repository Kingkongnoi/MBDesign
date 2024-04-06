using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbPlanks
    {
        public int id { get; set; }
        public int orderid { get; set; }
        public string colorCode { get; set; } = string.Empty;
        public int thickness18MM { get; set; }
        public int thickness9MM { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string updateBy { get; set; } = string.Empty;
        public bool isDeleted { get; set; } = false;
    }

    public class PlanksItemModel :tbPlanks
    {
        public string quotationNumber { get; set; } = string.Empty;
        public string createByName { get; set; } = string.Empty;
        public string updateByName { get; set; } = string.Empty;

        public string loginCode { get; set; } = string.Empty;
    }
}

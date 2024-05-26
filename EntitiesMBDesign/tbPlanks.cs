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
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string updateBy { get; set; } = string.Empty;
        public bool isDeleted { get; set; } = false;
    }

    public class PlanksListItem
    {
        public int id { get; set; }
        public int orderid { get; set; }
        public string quotationNumber { get; set; } = string.Empty;
        public int amount18mm { get; set; }
        public int amount9mm { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
    }

    public class PlankWithCode : tbPlanks
    {
        public string quotationNumber { get; set; } = string.Empty;
    }

    //public class PlanksItemModel : tbPlanks
    //{
    //    public string quotationNumber { get; set; } = string.Empty;
    //    public List<PlanksDetailsItemModel> planksDetailsModels { get; set; } = new List<PlanksDetailsItemModel>();
    //    public string createByName { get; set; } = string.Empty;
    //    public string updateByName { get; set; } = string.Empty;
    //    public string loginCode { get; set; } = string.Empty;
    //    public string DeleteID { get; set; } = string.Empty;
    //}

    public class PlanksAddModel : tbPlanks
    {
        public int plankid { get; set; }
        public int plankorderid { get; set; }
        public bool plankstatus { get; set; } = true;
        public string loginCode { get; set; } = string.Empty;
        public List<PlanksDetailsItemModel> planksDetailsModels { get; set; } = new List<PlanksDetailsItemModel>();
        public string DeleteID { get; set; } = string.Empty;
    }

    public class PlanksEditModel : tbPlanks
    {
        public int plankid { get; set; }
        public int plankorderid { get; set; }
        public bool plankstatus { get; set; } = true;
        public string loginCode { get; set; } = string.Empty;
        public List<PlanksDetailsItemModel> planksDetailsModels { get; set; } = new List<PlanksDetailsItemModel>();
        public string DeleteID { get; set; } = string.Empty;
    }
    //public class PlanksDetailsModels
    //{
    //    public int thicknesstype { get; set; }
    //    public int amount { get; set; }
    //    public string colorcode { get; set; } = string.Empty;
    //    public string remark { get; set; } = string.Empty;
    //}
}

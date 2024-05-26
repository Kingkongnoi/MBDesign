using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbPlanksDetails
    {
        public int id { get; set; }
        public int plankid { get; set; }
        public int thicknesstype { get; set; }
        public string colorcode { get; set; } = string.Empty;
        public int amount { get; set; }
        public string remark { get; set; } = string.Empty;
    }

    public class PlanksDetailsItemModel : tbPlanksDetails
    {
        public string thicknesstypename { get; set; } = string.Empty;

    }

}

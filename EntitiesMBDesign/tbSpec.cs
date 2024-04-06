using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbSpec
    {
        public int id { get; set; }
        public int orderid { get; set; }
        public bool status { get; set; }
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string updateBy { get; set; } = string.Empty;
        public DateTime? approveDate { get; set; }
        public string approveBy { get; set; } = string.Empty;
        public int isDeleted { get; set; }

    }

    public class specItemModel : tbSpec
    {
        public string createByName { get; set; } = string.Empty;
        public string updateByName { get; set; } = string.Empty;

        public string loginCode { get; set; } = string.Empty;
    }

    public class specListModel
    {
        public int id { get; set; }
        public int orderid { get; set; }
        public string quotationNumber { get; set; } = string.Empty;
        public DateTime installDate { get; set; }
        public string FullName { get; set; } = string.Empty;
        public DateTime commitDate { get; set; }
        public int statusid { get; set; }
        public string checklistStatus { get; set; } = string.Empty;
        public string lastUpdateBy { get; set; } = string.Empty;
        public DateTime lastUpdateDate { get; set; }

    }

    public class specNewListModel
    {
        public int id { get; set; }
        public int orderid { get; set; }
        public string quotationNumber { get; set; } = string.Empty;
        public DateTime installDate { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string checklistStatus { get; set; } = string.Empty;
        public string updateBy { get; set; } = string.Empty;
        public DateTime lastUpdateDate { get; set; }

    }

    public class SaveSpecModel
    {
        public int id { get; set; }
        public int orderid { get; set; }
        public DateTime commitdate { get; set; }
        public string empid { get; set; } = string.Empty;
        public string checkliststatus { get; set; } = string.Empty;
        public string ApproveDate { get; set; } = string.Empty;
        public string loginCode { get; set; } = string.Empty;
    }

    public class listQuotationNumber
    {
        public int orderId { get; set; } 
        public string quotationNumber { get;} = string.Empty;
    }
}

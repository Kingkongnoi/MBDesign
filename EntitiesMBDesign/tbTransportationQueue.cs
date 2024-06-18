using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbTransportationQueue
    {
        [Key]
        public int id { get; set; }
        public DateTime transportationdate { get; set; }
        public string drivername { get; set; } = string.Empty;
        public string subdrivername1 { get; set; } = string.Empty;
        public string subdrivername2 { get; set; } = string.Empty;
        public decimal outboundmileage { get; set; }
        public decimal inboundmileage { get; set; }
        public TimeSpan outboundtime { get; set; }
        public TimeSpan inboundtime { get; set; }
        public string remark { get; set; } = string.Empty;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string updateBy { get; set; } = string.Empty;
        public int isDeleted { get; set; }
    }

    public class TPQueueListModel
    {
        public int id { get; set; }
        public int orderid { get; set; }
        public int specid { get; set; }
        public int fittingid { get; set; }
        public string quotationNumber { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public int statusid { get; set; }
        public string checklistStatus { get; set; } = string.Empty;
        public string lastUpdateBy { get; set; } = string.Empty;
        public DateTime lastUpdateDate { get; set; }
    }

    public class SaveTransportationModel
    {
        public int id { get; set; }
        public DateTime transportationdate { get; set; }
        public string drivername { get; set; } = string.Empty;
        public string subdrivername1 { get; set; } = string.Empty;
        public string subdrivername2 { get; set; } = string.Empty;
        public decimal outboundmileage { get; set; }
        public decimal inboundmileage { get; set; }
        public string outboundtime { get; set; } = string.Empty;
        public string inboundtime { get; set; } = string.Empty;
        public string remark { get; set; } = string.Empty;
        public string empid { get; set; } = string.Empty;
        public string loginCode { get; set; } = string.Empty;
        public List<SaveTransportationDetailModel> saveDetail { get; set; } = new List<SaveTransportationDetailModel>();
    }

    public class SaveTransportationDetailModel
    {
        public int id { get; set; }
        public int transportationqueueid { get; set; }
        public int seqno { get; set; }
        public int orderid { get; set; }
        public string timeto { get; set; } = string.Empty;
        public string timeout { get; set; } = string.Empty;
    }

    public class SaveQItemModel : tbTransportationQueue
    {
        public string createByName { get; set; } = string.Empty;
        public string updateByName { get; set; } = string.Empty;

        public string loginCode { get; set; } = string.Empty;
    }
}

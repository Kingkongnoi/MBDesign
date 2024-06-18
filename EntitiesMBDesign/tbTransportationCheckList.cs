using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbTransportationCheckList
    {
        [Key]
        public int id { get; set; }
        public int orderid { get; set; }
        public int specid { get; set; }
        public int fittingid { get; set; }
        public bool status { get; set; }
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string updateBy { get; set; } = string.Empty;
        public DateTime? approveDate { get; set; }
        public string approveBy { get; set; } = string.Empty;
        public int isDeleted { get; set; }
    }

    

    public class TPListModel
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

    public class GetCustSelect
    {
        public int id { get; set; }
        public string value { get; set; } = string.Empty;
    }

    public class GetListOrderDetail
    {
        public int orderId { get; set; }
        public string Fullname { get; set; } = string.Empty;
        public string custAddress { get; set; } = string.Empty;
        public string itemName { get; set; } = string.Empty;
    }

    public class TPAddItemModel : tbTransportationCheckList
    {
        public string createByName { get; set; } = string.Empty;
        public string updateByName { get; set; } = string.Empty;

        public string loginCode { get; set; } = string.Empty;
    }

    public class SaveTPModel
    {
        public int id { get; set; }
        public int orderid { get; set; }
        public int specid { get; set; }
        public int fittingid { get; set; }
        public string empid { get; set; } = string.Empty;
        public string checkliststatus { get; set; } = string.Empty;

        public string loginCode { get; set; } = string.Empty;
    }
}

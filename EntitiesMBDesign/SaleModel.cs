using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class SaleModel
    {
        public int styleId { get; set; } = 0;
        public string custFirstName { get; set; } = string.Empty;
        public string custSurName { get; set; } = string.Empty;
        public string custNickName { get; set; } = string.Empty;
        public string custTel { get; set; } = string.Empty;
        public string custLineId { get; set; } = string.Empty;
        public string custAddress { get; set; } = string.Empty;
        public string custLocation { get; set; } = string.Empty;
        public string custInstallAddress { get; set; } = string.Empty;
        public string quotationType { get; set; } = string.Empty;
        public DateTime installDate { get; set; }
        public List<SaleItem> items { get; set; }
        public string orderNote { get; set; } = string.Empty;
        public decimal discount { get; set; } = 0;
        public decimal vat { get; set; } = 0;
        public decimal subTotal { get; set; } = 0;
        public decimal grandTotal { get; set; } = 0;
        public decimal disposite { get; set; } = 0;
        public string accountType { get; set; } = string.Empty;
        public decimal vatPercentage { get; set; } = 0;
    }

    public class SaleItem
    {
        public int styleId { get; set; }
        public string floor { get; set; } = string.Empty;
        public string zone { get; set; } = string.Empty;
        public int typeId { get; set; }
        public int itemId { get; set; }
        public List<SaleOptions> options { get; set; }
        public decimal orderLength { get; set; } = 0;
        public decimal orderDepth { get; set; } = 0;    
        public decimal orderHeight { get; set; } = 0;
    }
    public class SaleOptions
    {
        public int optionsId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class QuotationItemsList
    {
        public int itemNo { get; set; }
        public string typeName { get; set; } = string.Empty;
        public string styleName { get; set; } = string.Empty;
        public string itemName { get; set; } = string.Empty;
        public string options { get; set; } = string.Empty;
        public decimal optionsUnitPrice { get; set; }
        public string optionsSize { get; set; } = string.Empty;
        public int optionsQty { get; set; } = 1;
        public decimal optionsAmount { get; set; }
        public decimal subTotal { get; set; }
        public decimal vat { get; set; }
        public decimal grandTotal { get; set; }
        public string grandTotalThaiBath { get; set; } = string.Empty;
    }
}

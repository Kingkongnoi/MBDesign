using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class AccountingModel
    {
        public string custFirstName { get; set; } = string.Empty;
        public string custSurName { get; set; } = string.Empty;
        public string custAddress { get; set; } = string.Empty;
        public int custId { get; set; }
    }
}

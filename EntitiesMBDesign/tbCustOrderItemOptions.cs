using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbCustOrderItemOptions
    {
        [Key]
        public int custOrderItemOptionsId { get; set; }
        public int custOrderDetailId { get; set; }
        public int optionsId { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class CustOrderItemOptionsView
    {
        public string options { get; set; } = string.Empty;
        public decimal optionsPrice { get; set; }
    }
}

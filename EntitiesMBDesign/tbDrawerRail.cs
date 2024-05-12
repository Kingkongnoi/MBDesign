using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbDrawerRail
    {
        [Key]
        public int id { get; set; }
        public int fittingid { get; set; }
        public int drawerrailtype { get; set; }
        public int amount { get; set; }
        public int pressbounceamount { get; set; }
        public decimal othersize { get; set; }
        public bool status { get; set; }
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }
}

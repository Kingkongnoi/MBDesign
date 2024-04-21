using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbFitting
    {
        [Key]
        public int id { get; set; }
        public string fittingcode { get; set; } = string.Empty;
        public int orderid { get; set; }
        public int minifixset { get; set; }
        public int woodendowel { get; set; }
        public string otherdescription { get; set; } = string.Empty;
        public bool status { get; set; }
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }
}

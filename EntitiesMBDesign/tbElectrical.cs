using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbElectrical
    {
        [Key]
        public int id { get; set; }
        public int fittingid { get; set; }
        public int electricaltype { get; set; }
        public int amount { get; set; }
        public string color { get; set; } = string.Empty;
        public bool status { get; set; }
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }
}

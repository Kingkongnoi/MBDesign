using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbCalculateMaster
    {
        [Key]
        public int id { get; set; }
        public string calculatecode { get; set; } = string.Empty;
        public string calculatetype { get; set; } = string.Empty;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class CalculateMasterAddModel
    {
        public int id { get; set; }
        public string calculatecode { get; set; } = string.Empty;
        public string calculatetype { get; set; } = string.Empty;
        public string loginCode { get; set; } = string.Empty;
    }
}

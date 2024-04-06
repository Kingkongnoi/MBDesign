using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbStatus
    {
        [Key]
        public int statusId { get; set; }
        public string name { get; set; } = string.Empty;
        public int categoryId { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
        public int parentStatusId { get; set; }
    }

    public class StatusView : tbStatus
    {
        public string categoryName { get; set; } = string.Empty;
        public string parentStatusName { get; set; } = string.Empty;
        public string period { get; set; } = string.Empty;
        public string fullPeriod { get; set; } = string.Empty;
    }
}

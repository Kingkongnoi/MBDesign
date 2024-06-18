using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbMasterCheckListTransportation
    {
        [Key]
        public int id { get; set; }
        public int positionid { get; set; }
        public string checklistname { get; set; } = string.Empty;
        public decimal percecnt { get; set; }
        public bool status { get; set; }
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime updateDate { get; set; }
        public string updateBy { get; set; } = string.Empty;
        public bool isDeleted { get; set; } = false;
    }
}

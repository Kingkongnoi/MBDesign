using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbIdCardComCert
    {
        [Key]
        public int id { get; set; }
        public string idCardComCertId { get; set; } = string.Empty;
        public string imgIdCardFileName { get; set; } = string.Empty;
        public string imgComCertFileName { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
        public int imgIdCardFileId { get; set; }
        public int imgComCertFileId { get; set; }
    }
}

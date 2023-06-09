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

    }
}

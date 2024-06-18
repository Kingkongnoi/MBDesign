using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbTransportationQueueDetail
    {
        [Key]
        public int id { get; set; }
        public int transportationqueueid { get; set; }
        public int seqno { get; set; }
        public int orderid { get; set; }
        public TimeSpan timeto { get; set; }
        public TimeSpan timeout { get; set; }
       
    }

    public class PrintQueueReport : tbTransportationQueueDetail
    {
        public string fullname { get; set; } = string.Empty;
        public string address { get; set; } = string.Empty;
        public string itemdescription { get; set; } = string.Empty;
    }

}

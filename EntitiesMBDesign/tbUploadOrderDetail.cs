using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbUploadOrderDetail
    {
        [Key]
        public int uploadOrderDetailId { get; set; }
        public int orderId { get; set; }
        public int orderDetailId { get; set; }
        public int uploadCategoryId { get; set; }
        public int fileId { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class UploadOrderDetailView : tbUploadOrderDetail
    {
        public string categoryName { get; set; } = string.Empty;
        public string url { get; set; } = string.Empty;
        public string fileName { get; set; } = string.Empty;
        public int fileSize { get; set; }
    }
}

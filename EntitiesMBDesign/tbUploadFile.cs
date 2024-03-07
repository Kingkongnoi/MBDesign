using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbUploadFile
    {
        [Key]
        public int fileId { get; set; }
        public byte[] dataFile { get; set; }
        public string fileName { get; set; } = string.Empty;
        public string originalFileName { get; set; } = string.Empty;
        public long fileSize { get; set; }
        public string fileType { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;

    }
}

﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbUploadUrl
    {
        [Key]
        public int urlId { get; set; }
        public string url { get; set; } = string.Empty;
        public string fileName { get; set; } = string.Empty;
        public string originalFileName { get; set; } = string.Empty;
        public long fileSize { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;

    }
}

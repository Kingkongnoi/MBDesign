﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbStockDetails
    {
        [Key]
        public int id { get; set; }
        public int groupid { get; set; }
        public int subgroupid { get; set; }
        public int productid { get; set; }
        public int brandid { get; set; }
        public int stockid { get; set; }
        public int unitmasterid { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }
}

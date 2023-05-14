﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbContractAgreement
    {
        [Key]
        public int id { get; set; }
        public string contractNumber { get; set; } = string.Empty;
        public string quotationNumber { get; set; } = string.Empty;
        public string contractStatus { get; set; } = string.Empty;
        public int custId { get; set; }
        public string contractFileName { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
        public int contractNumberGen { get; set; }
        public string contractYearMonthGen { get; set; } = string.Empty;
    }
}

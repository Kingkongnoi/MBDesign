﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbOtherPayment
    {
        [Key]
        public int otherPaymentId { get; set; }
        public int empId { get; set; }
        public string type { get; set; } = string.Empty;
        public decimal amount { get; set; }
        public int installmentQty { get; set; }
        public decimal installmentAmount { get; set; }
        public DateTime installmentStartDate { get; set; }
        public string remark { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
        public int installment { get; set; }
        public decimal installmentPayment { get; set; }
    }

    public class OtherPaymentView : tbOtherPayment
    {
        public string createByName { get; set; } = string.Empty;
        public string updateByName { get; set; } = string.Empty;
        public string empCode { get; set; } = string.Empty;
        public string empFullName { get; set; } = string.Empty;
        public string installmentStartDateShow { get; set; } = string.Empty;
    }

    public class OtherPaymentModel
    {
        public int empId { get; set; }
        public string type { get; set; } = string.Empty;
        public decimal amount { get; set; }
        public int installmentQty { get; set; }
        public decimal installmentAmount { get; set; }
        public DateTime installmentStartDate { get; set; }
        public string remark { get; set; } = string.Empty;
        public string userCode { get; set; } = string.Empty;
    }
}
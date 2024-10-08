﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbCust
    {
        [Key]
        public int custId { get; set; }
        public string custFirstName { get; set; } = string.Empty;
        public string custSurName { get; set;} = string.Empty;
        public string custNickName { get; set;} = string.Empty;
        public string custTel { get; set;} = string.Empty;
        public string custLineId { get; set; } = string.Empty;   
        public string custAddress { get; set; } = string.Empty;
        public string custLocation { get; set; } = string.Empty;
        public string custInstallAddress { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class CustModel
    {
        public int custId { get; set; }
        public string custFirstName { get; set; } = string.Empty;
        public string custSurName { get; set; } = string.Empty;
        public string custNickName { get; set; } = string.Empty;
        public string custTel { get; set; } = string.Empty;
        public string custLineId { get; set; } = string.Empty;
        public string custAddress { get; set; } = string.Empty;
        public string custLocation { get; set; } = string.Empty;
        public string custInstallAddress { get; set; } = string.Empty;
        public string loginCode { get; set; } = string.Empty;
    }
}

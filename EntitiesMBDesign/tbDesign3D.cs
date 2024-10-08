﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbDesign3D
    {
        [Key]
        public int id { get; set; }
        public int orderId { get; set; }
        public int ownerEmpId { get; set; }
        public DateTime? dueDate { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
        public int checklistStatusId { get; set; }
    }

    public class Design3DView : tbDesign3D
    {
        public string orderNote { get; set; }= string.Empty;
        public string quotationNumber { get; set; } = string.Empty;
        public DateTime? installDate { get; set; }
        public bool isCheckFinal3d { get; set; }
        public string checklistStatus { get; set; } = string.Empty;
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class GlobalOrderStatus
    {
        public static string waitForApprove = "รออนุมัติ";
        public static string approved = "อนุมัติ";
    }

    public class GlobalContractStatus
    {
        public static string waitDocumentForApprove = "เอกสารใบเสนอราคาอยู่ระหว่างการอนุมัติ";
        public static string documentApproved = "เอกสารใบเสนอราคาอนุมัติ";
    }
}
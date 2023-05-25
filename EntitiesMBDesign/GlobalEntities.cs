using System;
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
        public static string notApprove = "ไม่อนุมัติ";
    }

    public class GlobalApproveStatus
    {
        public static string notApprove = "ไม่อนุมัติ";
        public static string approved = "อนุมัติ";
    }

    public class GlobalContractStatus
    {
        public static string waitDocumentForApprove = "เอกสารใบเสนอราคาอยู่ระหว่างการอนุมัติ";
        public static string documentApproved = "เอกสารใบเสนอราคาอนุมัติ";
        public static string documentNotApproved = "เอกสารใบเสนอราคาไม่ได้รับอนุมัติ";
    }
}

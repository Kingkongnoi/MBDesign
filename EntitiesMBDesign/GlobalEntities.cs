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
        public static string document3dApproved = "รูปภาพ 3D อนุมัติ";
        public static string documentSendToSaleAndForeman = "ส่งเอกสารสัญญาไปทีมเซลล์และโฟร์แมน";
    }

    public class Global3DStatus
    {
        public static string saveToDesign3D = "บันทึกรับเรื่อง";
        public static string whileDesign3dDraf1 = "ระหว่างดำเนินการออกแบบดราฟต์ 1";
        public static string design3dApproved = "แบบ 3D อนุมัติ";
        public static string design3dFinal = "แบบ 3D Final";
    }

    public class GlobalForemanStatus
    {
        public static string getToForeman = "รอรับเรื่อง";
        public static string processing = "ระหว่างดำเนินการ";
        public static string processed = "ดำเนินการเรียบร้อย";
    }

    public class GlobalUploadCategory
    {
        public static string approved3d = "3dApproved";
        public static string foremanUpload = "foremanUpload";
        public static string secondDisposite = "CustOrderSecondDisposite";
    }

    public class GlobalDispositePeriod
    {
        public static string firstDisposite = "จ่ายเงินมัดจำ";
        public static string secondDisposite = "จ่ายเงินงวด 2";
        public static string thridDisposite = "จ่ายเงินงวด 3";
        public static string fourthDisposite = "จ่ายเงินงวด 4";
    }

    public class GlobalInvoicePeriod
    {
        public static string firstDisposite = "จ่ายเงินมัดจำ";
        public static string secondDisposite = "งวดที่ 2";
        public static string thridDisposite = "งวดที่ 3";
        public static string fourthDisposite = "งวดที่ 4";
    }
    public class GlobalInvoieStatus
    {
        public static string waitPaid = "รอจ่าย";
        public static string paid = "จ่ายแล้ว";
    }
}

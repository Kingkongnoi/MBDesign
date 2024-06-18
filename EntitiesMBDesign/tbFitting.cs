using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbFitting
    {
        [Key]
        public int id { get; set; }
        public string fittingcode { get; set; } = string.Empty;
        public int orderid { get; set; }
        public int minifixset { get; set; }
        public int woodendowel { get; set; }
        public string otherdescription { get; set; } = string.Empty;
        public bool status { get; set; }
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class FittingListModel
    {
        public int id { get; set; }
        public int orderId { get; set; }
        public string fittingcode { get; set;} = string.Empty;
        public string quotationNumber { get; set;} = string.Empty;
        public string fullname { get; set;} = string.Empty; 
        public string custTel { get; set;} = string.Empty;   
        public string createby {  get; set; } = string.Empty;
    }

    public class AddFittingItemModel
    {
        public int id { get; set; }
        public string fittingcode { get; set; } = string.Empty;
        public int orderid { get; set; }
        public int minifixset { get; set; }
        public int woodendowel { get; set; }
        public string otherdescription { get; set; } = string.Empty;
        public string loginCode { get; set; } = string.Empty;
        public List<tbHinge> Hinge { get; set; } = new List<tbHinge>();
        public List<tbSlidingDoorEquipment> SlideDoor { get; set; } = new List<tbSlidingDoorEquipment>();
        public List<tbElectrical> Electrical { get; set; } = new List<tbElectrical>();
        public List<tbDrawerRail> DrawerRail { get; set; } = new List<tbDrawerRail>();
        public List<tbOtherFitting> OtherFitting { get; set; } = new List<tbOtherFitting>();
        public List<tbEdgeLaminate> EdgeLaminate { get; set; } = new List<tbEdgeLaminate>();
        public List<tbFrameTrim> FrameTrim { get; set; } = new List<tbFrameTrim>();

    }

    public class EditMainFittingModel
    {
        public int id { get; set; }
        public string fittingcode { get; set; } = string.Empty;
        public int orderid { get; set; }
        public int minifixset { get; set; }
        public int woodendowel { get; set; }
        public string otherdescription { get; set; } = string.Empty;
        public string quotationNumber { get; set; } = string.Empty;
        public string fullname { get; set; } = string.Empty;
    }
    public class EditFittingItemModel
    {
        public int id { get; set; }
        public string fittingcode { get; set; } = string.Empty;
        public int orderid { get; set; }
        public int minifixset { get; set; }
        public int woodendowel { get; set; }
        public string otherdescription { get; set; } = string.Empty;
        public string quotationNumber { get; set; } = string.Empty;
        public string fullname { get; set; } = string.Empty;
        public List<tbHinge> Hinge { get; set; } = new List<tbHinge>();
        public List<tbSlidingDoorEquipment> SlideDoor { get; set; } = new List<tbSlidingDoorEquipment>();
        public List<tbElectrical> Electrical { get; set; } = new List<tbElectrical>();
        public List<tbDrawerRail> DrawerRail { get; set; } = new List<tbDrawerRail>();
        public List<tbOtherFitting> OtherFitting { get; set; } = new List<tbOtherFitting>();
        public List<tbEdgeLaminate> EdgeLaminate { get; set; } = new List<tbEdgeLaminate>();
        public List<tbFrameTrim> FrameTrim { get; set; } = new List<tbFrameTrim>();

    }
}

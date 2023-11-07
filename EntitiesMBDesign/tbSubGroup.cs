using System.ComponentModel.DataAnnotations;

namespace EntitiesMBDesign
{
    public class tbSubGroup
    {
        [Key]
        public int id { get; set; }
        public int groupid { get; set; }
        public string subgroupcode { get; set; } = string.Empty;
        public string subgroupname { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class SubGroupItemModel : tbSubGroup
    {
        public string groupname { get; set; } = string.Empty;
        public string loginCode { get; set; } = string.Empty;
        public string createByName { get; set; } = string.Empty;
        public string updateByName { get; set; } = string.Empty;
    }

    public class SubGroupAddItemModel 
    {
        public string subgroupcode { get; set; } = string.Empty;
        public string subgroupname { get; set; } = string.Empty;
        public int groupid { get; set; }
        public bool status { get; set; } = true;
        public string loginCode { get; set; } = string.Empty;
    }
}

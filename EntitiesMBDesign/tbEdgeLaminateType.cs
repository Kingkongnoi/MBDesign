using System.ComponentModel.DataAnnotations;

namespace EntitiesMBDesign
{
    public class tbEdgeLaminateType
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; } = string.Empty;
        public bool status { get; set; }
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }
}

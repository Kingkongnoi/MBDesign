using System.ComponentModel.DataAnnotations;

namespace EntitiesMBDesign
{
    public class tbDrawerRailType
    {
        [Key]
        public int id { get; set; }
        public string drawerrailname { get; set; } = string.Empty;
        public bool status { get; set; }
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }
}

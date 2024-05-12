using System.ComponentModel.DataAnnotations;

namespace EntitiesMBDesign
{
    public class tbHingeType
    {
        [Key]
        public int id { get; set; }
        public string hingename { get; set; } = string.Empty;
        public bool status { get; set; }
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }
}

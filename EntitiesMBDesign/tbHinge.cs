using System.ComponentModel.DataAnnotations;

namespace EntitiesMBDesign
{
    public class tbHinge
    {
        [Key]
        public int id { get; set; }
        public int fittingid { get; set; }
        public int hingetype { get; set; }
        public string othertext { get; set; } = string.Empty;
        public int amount { get; set; }
        public bool status { get; set; }
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }
}

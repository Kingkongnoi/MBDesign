using System.ComponentModel.DataAnnotations;

namespace EntitiesMBDesign
{
    public class tbBrand
    {
        [Key]
        public int id { get; set; }
        public string brandcode { get; set; } = string.Empty;
        public string brandname { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class BrandItemModel
    {
        public int id { get; set; }
        public string brandcode { get; set; } = string.Empty;
        public string brandname { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public string loginCode { get; set; } = string.Empty;
    }
}

using System.ComponentModel.DataAnnotations;

namespace EntitiesMBDesign
{
    public class tbOtherFitting
    {
        [Key]
        public int id { get; set; }
        public int fittingid { get; set; }
        public int otherfittingtype { get; set; }
        public string color { get; set; } = string.Empty;
        public int amount { get; set; }
        public decimal size { get; set; }
        public bool status { get; set; }
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }
}

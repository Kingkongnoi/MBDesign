using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbMenu
    {
        [Key]
        public int menuId { get; set; }
        public string name { get; set; } = string.Empty;
        public int parentMenuId { get; set; }
        public bool enableAdd { get; set; }
        public bool enableEdit { get; set; }
        public bool enableApprove { get; set; }
        public bool enableView { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class MenuView : tbMenu
    {
        public bool canAdd { get; set; }
        public bool canEdit { get; set; }
        public bool canApprove { get; set; }
        public bool canView { get; set; }
        public int roleMenuId { get; set; }
        public bool headerLevel { get; set; }
    }
}

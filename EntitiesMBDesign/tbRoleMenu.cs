using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbRoleMenu
    {
        [Key]
        public int roleMenuId { get; set; }
        public int roleId { get; set; }
        public int menuId { get; set; }
        public bool canAdd { get; set; } = false;
        public bool canEdit { get; set; } = false;
        public bool canApprove { get; set; } = false;
        public bool canView { get; set; } = false;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;

    }
    public class RoleMenuModel
    {
        public int roleMenuId { get; set; }
        public int roleId { get; set; }
        public int menuId { get; set; }
        public string action { get; set; } = string.Empty;
        public bool chkResult { get; set; } = false;
    }
}

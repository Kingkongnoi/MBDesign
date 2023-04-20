using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbDepartment
    {
        [Key]
        public int departmentId { get; set; }
        public string departmentName { get; set; }  = string.Empty;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class DepartmentView : tbDepartment
    {
        public string fullName { get; set; } = string.Empty;
    }

    public class DepartmentModel
    {
        public int departmentId { get; set; }
        public string departmentName { get; set; } = string.Empty;
        public bool status { get; set; } = true;
    }
}

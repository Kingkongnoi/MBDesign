using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbEmpData
    {
        [Key]
        public int id { get; set; }
        public string empCode { get; set; } = string.Empty;
        public string empFirstName { get; set; } = string.Empty;
        public string empLastName { get; set; } = string.Empty;
        public int departmentId { get; set; }
        public int positionId { get; set; }
        public string salaryType { get; set; } = string.Empty;
        public decimal salary { get; set;}
        public DateTime hiringDate { get; set; }
        public string signatureFileName { get; set; } = string.Empty;
        public bool timeStampType { get; set; } = true;
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
        public string idCard { get; set; } = string.Empty;

    }

    public class EmpDataView : tbEmpData
    {
        public string fullName { get; set; } = string.Empty;
        public string departmentName { get; set; } = string.Empty;
        public string positionName { get; set; } = string.Empty;
        public int roleId { get; set; }
        public int empId { get; set; }
    }

    public class EmpDataModel
    {
        public int id { get; set; }
        public string empId { get; set; } = string.Empty;
        public string empFirstName { get; set; } = string.Empty;
        public string empLastName { get; set; } = string.Empty;
        public int departmentId { get; set; }
        public int positionId { get; set; }
        public string salaryType { get; set; } = string.Empty;
        public decimal salary { get; set; }
        public DateTime hiringDate { get; set; }
        public string signatureFileName { get; set; } = string.Empty;
        public bool timeStampType { get; set; } = true;
        public bool status { get; set; } = true;
        public int roleId { get; set; }
        public string idCard { get; set; } = string.Empty;
        public string loginCode { get; set; } = string.Empty;
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesMBDesign
{
    public class tbBankAccount
    {
        [Key]
        public int accountId { get; set; }
        public string accountName { get; set; } = string.Empty;
        public string accountNumber { get; set; } = string.Empty;
        public string accountType { get; set; } = string.Empty;
        public string bank { get; set; } = string.Empty;
        public int countUsage { get; set; }
        public bool status { get; set; } = true;
        public DateTime createDate { get; set; }
        public string createBy { get; set; } = string.Empty;
        public DateTime? updateDate { get; set; }
        public string? updateBy { get; set; }
        public bool isDeleted { get; set; } = false;
    }

    public class BankAccountModel
    {
        public int accountId { get; set; }
        public string accountName { get; set; } = string.Empty;
        public string accountNumber { get; set; } = string.Empty;
        public string accountType { get; set; } = string.Empty;
        public string bank { get; set; } = string.Empty;
        public bool status { get; set; } = true;
    }
}

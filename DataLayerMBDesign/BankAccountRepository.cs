using Dapper;
using EntitiesMBDesign;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayerMBDesign
{
    public class BankAccountRepository
    {
        public int? Add(tbBankAccount obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbBankAccount obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbBankAccount
                                set accountName = @accountName,
                                accountNumber = @accountNumber,
                                accountType = @accountType,
                                bank = @bank,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                status = @status
                                where isDeleted = 0 and accountId = @accountId
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.accountName, obj.accountNumber, obj.accountType, obj.bank, obj.updateDate, obj.updateBy, obj.status, obj.accountId }, transaction: trans);
        }

        public List<tbBankAccount> GetAll(string bank, string accountName, string accountNumber, string accountType, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(bank) && bank != "%%")
            {
                condition += string.Format(" and bank = N'{0}'", bank);
            }

            if (!string.IsNullOrEmpty(accountName) && accountName != "%%")
            {
                condition += string.Format(" and accountName like N'%{0}%'", accountName);
            }

            if (!string.IsNullOrEmpty(accountNumber) && accountNumber != "%%")
            {
                condition += string.Format(" and accountNumber like N'%{0}%'", accountNumber);
            }

            if (!string.IsNullOrEmpty(accountType) && accountType != "%%")
            {
                condition += string.Format(" and accountType = N'{0}'", accountType);
            }

            if (!string.IsNullOrEmpty(status) && status != "%%")
            {
                condition += string.Format(" and status = {0}", status);
            }

            string queryString = string.Format(@"SELECT accountId
                                ,accountName
                                ,accountNumber
                                ,accountType
                                ,bank
                                ,countUsage
                                ,status
                                ,createDate
                                ,createBy
                                ,updateDate
                                ,updateBy
                                ,isDeleted
                                FROM tbBankAccount
                                where isDeleted = 0
                                {0}
                                order by accountId
                                ", condition);

            return conn.Query<tbBankAccount>(queryString, new { }, transaction: trans).ToList();
        }

        public tbBankAccount GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                                if not exists(select top 1 1 from tbBankAccount)
                                begin
	                                SELECT IDENT_CURRENT('tbBankAccount') AS accountId;  
                                end
                                else
                                begin
	                                SELECT IDENT_CURRENT('tbBankAccount') + 1 AS accountId;  
                                end";

            return conn.QueryFirstOrDefault<tbBankAccount>(queryString, transaction: trans);
        }

        public tbBankAccount GetFirstById(int accountId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT top 1 accountId
                                ,accountName
                                ,accountNumber
                                ,accountType
                                ,bank
                                ,countUsage
                                ,status
                                ,createDate
                                ,createBy
                                ,updateDate
                                ,updateBy
                                ,isDeleted
                                FROM tbBankAccount
                                where isDeleted = 0 and accountId = @accountId
                                order by accountId";

            return conn.QueryFirstOrDefault<tbBankAccount>(queryString, new { accountId }, transaction: trans);
        }

        public tbBankAccount GetBackAccountUsageByType(string accountType, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@"SELECT top 1 accountId
                                ,accountName
                                ,accountNumber
                                ,accountType
                                ,bank
                                ,countUsage
                                ,status
                                ,createDate
                                ,createBy
                                ,updateDate
                                ,updateBy
                                ,isDeleted
                                FROM tbBankAccount
                                where isDeleted = 0 
                                and accountType = N'{0}'
                                and status = 1", accountType);

            return conn.QueryFirstOrDefault<tbBankAccount>(queryString, transaction: trans);
        }
    }
}

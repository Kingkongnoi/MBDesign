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

        public List<BankAccountView> GetAll(string bank, string accountName, string accountNumber, string accountType, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(bank) && bank != "null")
            {
                condition += string.Format(" and bank = N'{0}'", bank);
            }

            if (!string.IsNullOrEmpty(accountName) && accountName != "null")
            {
                condition += string.Format(" and accountName like N'%{0}%'", accountName);
            }

            if (!string.IsNullOrEmpty(accountNumber) && accountNumber != "null")
            {
                condition += string.Format(" and accountNumber like N'%{0}%'", accountNumber);
            }

            if (!string.IsNullOrEmpty(accountType) && accountType != "null")
            {
                condition += string.Format(" and accountType = N'{0}'", accountType);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and status = {0}", status);
            }

            string queryString = string.Format(@"SELECT a.accountId
                                ,a.accountName
                                ,a.accountNumber
                                ,a.accountType
                                ,a.bank
                                ,a.countUsage
                                ,a.status
                                ,a.createDate
                                ,a.createBy
                                ,a.updateDate
                                ,a.updateBy
                                ,a.isDeleted
                                , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.createBy and isDeleted = 0),'') createByName
                                , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.updateBy and isDeleted = 0),'') updateByName
                                FROM tbBankAccount a
                                where a.isDeleted = 0
                                {0}
                                order by a.accountId
                                ", condition);

            return conn.Query<BankAccountView>(queryString, new { }, transaction: trans).ToList();
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

        public List<tbBankAccount> GetActiveBackAccountUsage(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT accountId
                                ,accountName
                                ,accountNumber
                                ,case when [accountType] = N'บัญชีส่วนบุคคล' then 'personal' else 'company' end accountType
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
                                and status = 1";

            return conn.Query<tbBankAccount>(queryString, transaction: trans).ToList();
        }

        public int UpdateCountUsage(tbBankAccount obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"  update tbBankAccount
                                set countUsage = countUsage+1,
                                updateDate = @updateDate,
                                updateBy = @updateBy
                                where accountId = @accountId
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.updateDate, obj.updateBy, obj.accountId }, transaction: trans);
        }
    }
}

using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilitiesMBDesign;

namespace BusinessLogicMBDesign.Master
{
    public class BankAccountService
    {
        private readonly BankAccountRepository _bankAccountRepository;
        private readonly BankRepository _bankRepository;

        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public BankAccountService(IConfiguration configuration)
        {
            _bankAccountRepository = new BankAccountRepository();
            _bankRepository = new BankRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public tbBankAccount GetLastestBankAccountId()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _bankAccountRepository.GetLastestId(conn);
            }

        }

        public List<tbBankAccount> GetBankAccountList(string bank, string accountName, string accountNumber, string accountType, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _bankAccountRepository.GetAll(bank, accountName, accountNumber, accountType, status, conn);
            }
        }

        public tbBankAccount GetByBankAccountId(int accountId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _bankAccountRepository.GetFirstById(accountId, conn);
            }

        }

        public List<tbBank> GetAllBank()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _bankRepository.GetAll(conn);
            }
        }

        public List<tbBank> GetAllBankUsage()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _bankRepository.GetAll(conn);
            }
        }

        public int? AddBankAccount(BankAccountModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var accUsage = _bankAccountRepository.GetBackAccountUsageByType(model.accountType, conn, transaction);
                if (accUsage != null) { return -1; }

                try
                {
                    var addedObject = new tbBankAccount
                    {
                        accountName = model.accountName,
                        accountNumber = model.accountNumber,
                        accountType = model.accountType,
                        bank = model.bank,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = "MB9999"
                    };
                    added = _bankAccountRepository.Add(addedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateBankAccount(BankAccountModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var accUsage = _bankAccountRepository.GetBackAccountUsageByType(model.accountType, conn, transaction);
                if (accUsage != null) { if (accUsage.accountId != model.accountId) { return -1; } }

                try
                {
                    var updatedObject = new tbBankAccount
                    {
                        accountId= model.accountId,
                        accountName = model.accountName,
                        accountNumber = model.accountNumber,
                        accountType = model.accountType,
                        bank = model.bank,
                        status = model.status,
                        updateDate = DateTime.UtcNow,
                        updateBy = "MB9999"
                    };
                    updated = _bankAccountRepository.Update(updatedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return updated;
        }
    }
}

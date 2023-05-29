using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicMBDesign.Accounting
{
    public class AccountingService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        private readonly CustOrderRepository _custOrderRepository;
        private readonly ContractAgreementRepository _contractAgreementRepository;
        private readonly UploadRepository _uploadRepository;
        private readonly CustRepository _custRepository;

        public AccountingService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();

            _custOrderRepository = new CustOrderRepository();
            _contractAgreementRepository = new ContractAgreementRepository();
            _uploadRepository = new UploadRepository();
            _custRepository = new CustRepository();
        }

        public List<CustOrderView> GetAccountingList(string contractNumber, string quotationNumber, string customerName, string contractStatus, string contractDate)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custOrderRepository.GetAccountingListByParams(contractNumber, quotationNumber, customerName, contractStatus, contractDate, conn);
            }
        }

        public List<tbContractAgreement> GetContractStatusSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _contractAgreementRepository.GetContractStatus(conn);
            }
        }

        public CustOrderView GetAccountingCustOrderByOrderId(int orderId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custOrderRepository.GetAccountingByOrderId(orderId, conn);
            }
        }

        public List<UploadView> GetAccountImage(int orderId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                var category = new List<string> { "CustOrderIdCard", "CustOrderPlan", "3dApproved" };
                return _uploadRepository.GetByOrderIdWithCategoryList(orderId, category, conn);
            }
        }

        public ResultMessage DoUpdateAccountingCustomer(AccountingModel model)
        {
            var msg = new ResultMessage();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var updated = new tbCust
                    {
                        custFirstName= model.custFirstName,
                        custSurName= model.custSurName,
                        custAddress= model.custAddress,
                        updateDate = DateTime.UtcNow,
                        updateBy = "MB9999",
                        custId = model.custId
                    };

                    int updatedRow = _custRepository.UpdateAccounting(updated, conn, transaction);

                    msg.isResult = true;
                    transaction.Commit();
                }
                catch
                {
                    msg.isResult = false;
                    transaction.Rollback();
                }
            }

            return msg;
        }
        public ResultMessage DoSendToSaleAndForeman(int orderId)
        {
            var msg = new ResultMessage();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    int updatedRow = _contractAgreementRepository.UpdateContractStatus(orderId, GlobalContractStatus.documentSendToSaleAndForeman, conn, transaction);

                    msg.isResult = true;
                    transaction.Commit();
                }
                catch
                {
                    msg.isResult = false;
                    transaction.Rollback();
                }
            }

            return msg;
        }
    }
}

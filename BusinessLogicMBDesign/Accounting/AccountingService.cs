using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

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
        private readonly InvoiceRepository _invoiceRepository;

        public AccountingService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();

            _custOrderRepository = new CustOrderRepository();
            _contractAgreementRepository = new ContractAgreementRepository();
            _uploadRepository = new UploadRepository();
            _custRepository = new CustRepository();
            _invoiceRepository = new InvoiceRepository();
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

        public List<tbInvoice> GetInvoiceStatusSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _invoiceRepository.GetInvoiceStatus(conn);
            }
        }
        public List<tbCustOrder> GetQuotaionStatusSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custOrderRepository.GetQuotaionSelect2(conn);
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

        public List<CustOrderView> GetInvoiceList(string quotationNumber, string invoiceNumber, string customerName, string invoiceStatus, string invoiceDate)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custOrderRepository.GetInvoiceListByParams(quotationNumber, invoiceNumber, customerName, invoiceStatus, invoiceDate, conn);
            }
        }

        public string GenerateInvoiceNumber()
        {
            string newInvoiceNum = string.Empty;

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                string yearMonth = this.GenerateYearMonth();

                int lastestNumberGen = _invoiceRepository.GetLastestInvoiceNumberByYearMonthGen(yearMonth, conn);
                int generateNumber = (lastestNumberGen == 0) ? 1 : lastestNumberGen + 1;

                string getNumber = string.Format("{0:0000}", generateNumber);

                newInvoiceNum = string.Format("{0}{1}", yearMonth, getNumber);
            }

            return newInvoiceNum;
        }
        public string GenerateYearMonth()
        {
            ThaiBuddhistCalendar thaiCalendar = new ThaiBuddhistCalendar();

            string getYear = thaiCalendar.GetYear(DateTime.UtcNow).ToString();
            string getMonth = string.Format("{0:00}", thaiCalendar.GetMonth(DateTime.UtcNow));

            string yearMonth = string.Format("{0}{1}", getYear, getMonth);

            return yearMonth;
        }

        public tbCust GetCustomerInformationByCustId(int custId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custRepository.GetFirstById(custId, conn);
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

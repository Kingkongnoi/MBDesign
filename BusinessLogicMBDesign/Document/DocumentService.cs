using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicMBDesign.Document
{
    public class DocumentService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        private readonly InvoiceRepository _invoiceRepository;
        private readonly CustRepository _custRepository;
        private readonly CustOrderRepository _custOrderRepository;
        private readonly ReceiptRepository _receiptRepository;
        private readonly ContractAgreementRepository _contractAgreementRepository;
        private readonly SalaryRepository _salaryRepository;

        public DocumentService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();

            _invoiceRepository = new InvoiceRepository();
            _custRepository = new CustRepository();
            _custOrderRepository  = new CustOrderRepository();
            _receiptRepository = new ReceiptRepository();
            _contractAgreementRepository = new ContractAgreementRepository();
            _salaryRepository = new SalaryRepository();
        }

        public tbInvoice GetInvoiceByInvoiceId(int invoiceId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                return _invoiceRepository.GetByInvoiceId(invoiceId, conn);
            }
        }

        public tbReceipt GetReceiptByReceiptId(int receiptId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                return _receiptRepository.GetByReceiptId(receiptId, conn);
            }
        }

        public tbCust GetCustomerDataByCustId(int custId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                return _custRepository.GetFirstById(custId, conn);
            }
        }

        public CustOrderView GetCustOrderByOrderId(int orderId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                return _custOrderRepository.GetCustOrderByOrderId(orderId, conn);
            }
        }

        public tbContractAgreement GetContractByContractId(int contractId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                return _contractAgreementRepository.GetFirstByContractId(contractId, conn);
            }
        }

        public CustOrderView GetCustOrderByQuotationNumber(string quotationNumber)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                return _custOrderRepository.GetCustOrderByQuotationNumber(quotationNumber, conn);
            }
        }

        public SalaryView GetPaySlipBySalaryId(int salaryId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                return _salaryRepository.GetPaySlipDetailBySalaryId(salaryId, conn);
            }
        }
    }
}

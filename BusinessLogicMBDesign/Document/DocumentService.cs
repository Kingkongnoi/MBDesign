using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
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

        public DocumentService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();

            _invoiceRepository = new InvoiceRepository();
            _custRepository = new CustRepository();
            _custOrderRepository  = new CustOrderRepository();
        }

        public tbInvoice GetInvoiceByInvoiceId(int invoiceId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                return _invoiceRepository.GetByInvoiceId(invoiceId, conn);
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
    }
}

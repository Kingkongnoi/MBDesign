using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicMBDesign.Foreman
{
    public class ForemanService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        private readonly CustOrderRepository _custOrderRepository;
        private readonly ForemanRepository _foremanRepository;
        private readonly UploadRepository _uploadRepository;
        private readonly UploadOrderDetailRepository _uploadOrderDetailRepository;

        public ForemanService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();

            _custOrderRepository = new CustOrderRepository();
            _foremanRepository = new ForemanRepository();
            _uploadRepository = new UploadRepository();
            _uploadOrderDetailRepository = new UploadOrderDetailRepository();
        }

        public List<CustOrderView> GetForemanQueueList(string quotationNumber, string cusName, string foremanStatus, string installDate)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custOrderRepository.GetForemanList(quotationNumber, cusName, foremanStatus, installDate, conn);
            }
        }
        public List<tbForeman> GetForemanStatusSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _foremanRepository.GetForemanStatus(conn);
            }
        }
        public List<tbForeman> GetForemanProductItemList(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _foremanRepository.GetForemanStatus(conn);
            }
        }

        public ForemanView GetForemanCustOrderByKeyId(int foremanId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _foremanRepository.GetEditForemanByForemanId(foremanId, conn);
            }
        }

        public List<UploadView> GetByOrderIdAndCategory(int orderId, string category)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _uploadRepository.GetByOrderIdWithCategoryName(orderId, category, conn);
            }
        }

        public List<UploadOrderDetailView> GetForemanUpload(int orderId, int orderDetailId, string category)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _uploadOrderDetailRepository.GetByOrderIdAndOrderDetailIdWithCategory(orderId, orderDetailId, category, conn);
            }
        }

        public UploadView GetFirstByOrderIdAndCategory(int orderId, string category)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _uploadRepository.GetFirstByOrderIdWithCategoryName(orderId, category, conn);
            }
        }
    }
}

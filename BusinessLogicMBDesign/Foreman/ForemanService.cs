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

        public ForemanService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();

            _custOrderRepository = new CustOrderRepository();
            _foremanRepository = new ForemanRepository();
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
    }
}

using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicMBDesign.Design3D
{
    public class Design3DService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        private readonly CustOrderRepository _custOrderRepository;
        private readonly Design3DRepository _design3DRepository;
        private readonly EmpDataRepository _empDataRepository;
        

        public Design3DService(IConfiguration configuration) 
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();

            _custOrderRepository = new CustOrderRepository();
            _design3DRepository = new Design3DRepository();
            _empDataRepository = new EmpDataRepository();
        }

        public List<CustOrderView> Get3DQueueList(string quotationNumber, string empName, string checklistStatus, string installDate)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custOrderRepository.GetDesign3DList(quotationNumber, empName, checklistStatus, installDate, GlobalOrderStatus.approved, conn);
            }
        }
        public List<tbDesign3D> GetChecklistStatusSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _design3DRepository.GetChecklistStatus(conn);
            }
        }

        public List<EmpDataView> GetDesign3DNameSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _empDataRepository.GetDesign3DEmpDataSelect2(conn);
            }
        }

        public CustOrderView Get3DQueueCustOrderByOrderId(int orderId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custOrderRepository.GetCustOrderByOrderId(orderId, conn);
            }
        }
    }
}

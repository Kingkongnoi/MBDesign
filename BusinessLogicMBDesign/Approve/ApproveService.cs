using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicMBDesign.Approve
{
    public class ApproveService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        private readonly CustOrderRepository _custOrderRepository;
        private readonly ApproveRepository _approveRepository;

        public ApproveService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();

            _custOrderRepository = new CustOrderRepository();
            _approveRepository = new ApproveRepository();
        }
        public int GetCountCustOrderWaitForApprove()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                string orderStatus = GlobalOrderStatus.waitForApprove;
                return _custOrderRepository.GetCountCustOrderWaitForApprove(orderStatus, conn);
            }
        }

        public List<CustOrderView> GetWaitApproveList()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                string orderStatus = GlobalOrderStatus.waitForApprove;
                return _custOrderRepository.GetAllByorderStatus(orderStatus, conn);
            }
        }

        public List<ApproveView> GetApproveHistoryList()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _approveRepository.GetApproveHistory(conn);
            }
        }
    }
}

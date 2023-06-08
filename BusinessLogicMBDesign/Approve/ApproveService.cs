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
        private readonly ContractAgreementRepository _contractAgreementRepository;
        private readonly Design3DRepository _design3DRepository;

        public ApproveService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();

            _custOrderRepository = new CustOrderRepository();
            _approveRepository = new ApproveRepository();
            _contractAgreementRepository = new ContractAgreementRepository();
            _design3DRepository = new Design3DRepository();
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

        public ResultMessage DoApproveProcess(ApproveModel model)
        {
            var msg = new ResultMessage();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var addApprove = new tbApprove
                    {
                        orderId = model.orderId,
                        approveStatus = model.approveStatus,
                        approveComment = model.approveComment,
                        status = true,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode,
                        isDeleted = false,
                    };

                    int? approveId = _approveRepository.Add(addApprove, conn, transaction);

                    //Update order status
                    string orderStatus = (model.approveStatus == GlobalApproveStatus.approved) ? GlobalOrderStatus.approved : GlobalOrderStatus.notApprove;
                    int updatedOrderStatus = _custOrderRepository.UpdateOrderStatus(model.orderId, orderStatus, conn, transaction);

                    //Update contract status
                    string contractStatus = (model.approveStatus == GlobalApproveStatus.approved) ? GlobalContractStatus.documentApproved : GlobalContractStatus.documentNotApproved;
                    int updatedContractStatus = _contractAgreementRepository.UpdateContractStatus(model.orderId, contractStatus, conn, transaction);

                    //create 3d = บันทึกรับเรื่อง
                    if(model.approveStatus == GlobalApproveStatus.approved)
                    {
                        string design3DStatus = Global3DStatus.saveToDesign3D;
                        var exists = _design3DRepository.GetByOrderId(model.orderId, conn, transaction);

                        if (exists == null)
                        {
                            var addDesign3D = new tbDesign3D
                            {
                                orderId = model.orderId,
                                checklistStatus = design3DStatus,
                                status = true,
                                createDate = DateTime.UtcNow,
                                createBy = model.loginCode,
                                isDeleted = false,
                            };

                            int? id = _design3DRepository.Add(addDesign3D, conn, transaction);
                        }
                        else
                        {
                            var updateDesign3D = new tbDesign3D
                            {
                                orderId = model.orderId,
                                checklistStatus = design3DStatus
                            };

                            int update3d = _design3DRepository.UpdateChecklistStatus(model.orderId, design3DStatus, conn, transaction);
                        }

                    }

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

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
        private readonly StatusRepository _statusRepository;

        public ApproveService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();

            _custOrderRepository = new CustOrderRepository();
            _approveRepository = new ApproveRepository();
            _contractAgreementRepository = new ContractAgreementRepository();
            _design3DRepository = new Design3DRepository();
            _statusRepository = new StatusRepository();
        }
        public int GetCountCustOrderWaitForApprove()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                string orderStatus = GlobalOrderStatus.waitForApprove;
                string orderCategory = GlobalOrderStatus.orderCategory;
                return _custOrderRepository.GetCountCustOrderWaitForApprove(orderStatus, orderCategory, conn);
            }
        }

        public List<CustOrderView> GetWaitApproveList()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                string orderStatus = GlobalOrderStatus.waitForApprove;
                string orderCategory = GlobalOrderStatus.orderCategory;
                return _custOrderRepository.GetAllByorderStatus(orderStatus, orderCategory, conn);
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

                string orderCategory = GlobalOrderStatus.orderCategory;
                string approveCategory = GlobalApproveStatus.approveCategory;
                string contractCategory = GlobalContractStatus.contractCategory;
                try
                {
                    /* Created by Wannaporn.YA 2024-03-19 : Change from create approve status to approve status id */
                    var getApproveStatus = _statusRepository.GetFirstByCategoryNameAndStatusName(approveCategory, model.approveStatus, conn, transaction);
                    int approveStatusId = (getApproveStatus != null) ? getApproveStatus.statusId : 0;

                    var addApprove = new tbApprove
                    {
                        orderId = model.orderId,
                        approveStatusId = approveStatusId,
                        approveComment = model.approveComment,
                        status = true,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode,
                        isDeleted = false,
                    };

                    int? approveId = _approveRepository.Add(addApprove, conn, transaction);

                    //Update order status
                    string orderStatus = (model.approveStatus == GlobalApproveStatus.approved) ? GlobalOrderStatus.approved : GlobalOrderStatus.notApprove;
                    /* Created by Wannaporn.YA 2024-03-19 : Change from create order status to order status id */
                    var getOrderStatus = _statusRepository.GetFirstByCategoryNameAndStatusName(orderCategory, orderStatus, conn, transaction);
                    int orderStatusId = (getOrderStatus != null) ? getOrderStatus.statusId : 0;

                    int updatedOrderStatus = _custOrderRepository.UpdateOrderStatus(model.orderId, orderStatusId, conn, transaction);

                    //Update contract status
                    string contractStatus = (model.approveStatus == GlobalApproveStatus.approved) ? GlobalContractStatus.documentApproved : GlobalContractStatus.documentNotApproved;

                    /* Created by Wannaporn.YA 2024-03-19 : Change from create order status to order status id */
                    var getContractStatus = _statusRepository.GetFirstByCategoryNameAndStatusName(contractCategory, contractStatus, conn, transaction);
                    int contractStatusId = (getContractStatus != null) ? getContractStatus.statusId : 0;

                    int updatedContractStatus = _contractAgreementRepository.UpdateContractStatus(model.orderId, contractStatusId, DateTime.UtcNow, model.loginCode, conn, transaction);

                    //create 3d = บันทึกรับเรื่อง
                    if(model.approveStatus == GlobalApproveStatus.approved)
                    {
                        string design3DStatus = Global3DStatus.saveToDesign3D;
                        string design3DCategory = Global3DStatus.design3DCategory;

                        var getDesign3DStatus = _statusRepository.GetFirstByCategoryNameAndStatusName(design3DCategory, design3DStatus, conn, transaction);
                        int checklistStatusId = (getDesign3DStatus != null) ? getDesign3DStatus.statusId : 0;

                        var exists = _design3DRepository.GetByOrderId(model.orderId, conn, transaction);

                        if (exists == null)
                        {
                            var addDesign3D = new tbDesign3D
                            {
                                orderId = model.orderId,
                                checklistStatusId = checklistStatusId,
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
                                checklistStatusId = checklistStatusId
                            };

                            int update3d = _design3DRepository.UpdateChecklistStatus(model.orderId, checklistStatusId, conn, transaction);
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

using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicMBDesign.HR
{
    public class HRService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        private readonly LeaveTypeRepository _leaveTypeRepository;

        public HRService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();

            _leaveTypeRepository = new LeaveTypeRepository();
        }

        public List<LeaveTypeView> GetLeaveTypeList(string leaveType, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _leaveTypeRepository.GetAll(leaveType, status, conn);
            }
        }

        public List<tbLeaveType> GetSelect2LeaveTypeName()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _leaveTypeRepository.GetSelect2LeaveTypeName(conn);
            }
        }

        public tbLeaveType GetLeaveTypeById(int leaveTypeId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _leaveTypeRepository.GetFirstByKeyId(leaveTypeId, conn);
            }
        }

        public ResultMessage UpdateLeaveType(LeaveTypeModel obj)
        {
            var msg = new ResultMessage();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var updated = new tbLeaveType
                    {
                        leaveTypeDays = obj.leaveTypeDays,
                        status = obj.status,
                        updateDate = DateTime.UtcNow,
                        updateBy = obj.updateBy,
                        leaveTypeId = obj.leaveTypeId,
                    };

                    int updateResult = _leaveTypeRepository.UpdateLeaveType(updated, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    msg.isResult = false;
                    msg.strResult = ex.ToString();
                    transaction.Rollback();
                }
            }

            return msg;
        }
    }
}

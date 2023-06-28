﻿using DataLayerMBDesign;
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
        private readonly LeaveRepository _leaveRepository;
        private readonly EmpDataRepository _empDataRepository;

        public HRService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();

            _leaveTypeRepository = new LeaveTypeRepository();
            _leaveRepository = new LeaveRepository();
            _empDataRepository = new EmpDataRepository();   
        }

        #region Leave Type
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

        #endregion Leave Type

        #region Leave
        public List<LeaveView> GetLeaveList(string empCode, string empName, string leaveType, string leaveStartDate, string leaveEndDate)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _leaveRepository.GetAll(empCode, empName, leaveType, leaveStartDate, leaveEndDate, conn);
            }
        }

        public List<tbEmpData> GetSelect2EmpCode(int empId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _empDataRepository.GetSelect2EmpCode(empId, conn);
            }
        }

        public List<EmpDataView> GetSelect2EmpFullName(int empId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _empDataRepository.GetSelect2EmpFullName(empId, conn);
            }
        }

        public ResultMessage AddLeave(LeaveModel obj)
        {
            var msg = new ResultMessage();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var leaveType = _leaveTypeRepository.GetFirstByName(obj.leaveTypeName, conn, transaction);
                    int leaveTypeId = (leaveType != null) ? leaveType.leaveTypeId : 0;

                    #region validation remain days

                    #endregion validation remain days

                    var added = new tbLeave
                    {
                        empId = obj.empId,
                        leaveTypeId = leaveTypeId,
                        leaveStartDate = obj.leaveStartDate,
                        leaveEndDate = obj.leaveEndDate,
                        leaveHours = obj.leaveHours,
                        leaveDays = Convert.ToDecimal(obj.leaveDays),
                        leaveRemark = obj.leaveRemark,
                        leaveDocument = "",
                        status = true,
                        createDate = DateTime.UtcNow,
                        createBy = obj.userCode,
                    };

                    int? addResult = _leaveRepository.Add(added, conn, transaction);

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

        public ResultMessage UpdateLeave(LeaveModel obj)
        {
            var msg = new ResultMessage();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var leaveType = _leaveTypeRepository.GetFirstByName(obj.leaveTypeName, conn, transaction);
                    int leaveTypeId = (leaveType != null) ? leaveType.leaveTypeId : 0;

                    var updated = new tbLeave
                    {
                        empId = obj.empId,
                        leaveTypeId = leaveTypeId,
                        leaveStartDate = obj.leaveStartDate,
                        leaveEndDate = obj.leaveEndDate,
                        leaveHours = obj.leaveHours,
                        leaveDays = Convert.ToDecimal(obj.leaveDays),
                        leaveRemark = obj.leaveRemark,
                        leaveDocument = "",
                        updateDate = DateTime.UtcNow,
                        updateBy = obj.userCode,
                        leaveId = obj.leaveId,
                    };

                    int updateResult = _leaveRepository.UpdateLeave(updated, conn, transaction);

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
        #endregion Leave
    }
}
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
        private readonly OtherPaymentRepository _otherPaymentRepository;
        private readonly AttendanceDepartmentSettingRepository _attendanceDepartmentSettingRepository;
        private readonly AttendanceRepository _attendanceRepository;
        private readonly SalaryRepository _salaryRepository;

        public HRService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();

            _leaveTypeRepository = new LeaveTypeRepository();
            _leaveRepository = new LeaveRepository();
            _empDataRepository = new EmpDataRepository();   
            _otherPaymentRepository = new OtherPaymentRepository();
            _attendanceDepartmentSettingRepository = new AttendanceDepartmentSettingRepository();   
            _attendanceRepository = new AttendanceRepository();
            _salaryRepository = new SalaryRepository();
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

        public LeaveView GetLeaveById(int leaveId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _leaveRepository.GetFirstByKeyId(leaveId, conn);
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
                    int leaveTypeDays = (leaveType != null) ? leaveType.leaveTypeDays : 0;
                    var getLeaveDays = Convert.ToDecimal(obj.leaveDays.Split(' ')[0]);
                    //var leaveRemainDays = (leaveTypeDays - getLeaveDays);
                    #endregion validation remain days

                    var added = new tbLeave
                    {
                        empId = obj.empId,
                        leaveTypeId = leaveTypeId,
                        leaveStartDate = obj.leaveStartDate,
                        leaveEndDate = obj.leaveEndDate,
                        leaveHours = obj.leaveHours,
                        leaveDays = getLeaveDays,
                        //leaveRemainDays = leaveRemainDays,
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

                    #region validation remain days
                    int leaveTypeDays = (leaveType != null) ? leaveType.leaveTypeDays : 0;
                    var getLeaveDays = Convert.ToDecimal(obj.leaveDays.Split(' ')[0]);
                    //var leaveRemainDays = (leaveTypeDays - getLeaveDays);
                    #endregion validation remain days

                    var updated = new tbLeave
                    {
                        empId = obj.empId,
                        leaveTypeId = leaveTypeId,
                        leaveStartDate = obj.leaveStartDate,
                        leaveEndDate = obj.leaveEndDate,
                        leaveHours = obj.leaveHours,
                        leaveDays = getLeaveDays,
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

        #region Leave Summary
        public List<LeaveTypeView> GetLeaveSummaryByEmpData(string empCode, string empName)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _leaveTypeRepository.GetLeaveSummaryByEmpData(empCode, empName, conn);
            }
        }
        #endregion Leave Summary

        #region Other payment
        public List<OtherPaymentView> GetOtherPaymentList(string empCode, string empName, string type, string installmentStartDate)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _otherPaymentRepository.GetAll(empCode, empName, type, installmentStartDate, conn);
            }
        }
        public tbOtherPayment GetOtherPaymentById(int otherPaymentId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _otherPaymentRepository.GetFirstByKeyId(otherPaymentId, conn);
            }
        }
        public ResultMessage AddOtherPaymentModel(OtherPaymentModel obj)
        {
            var msg = new ResultMessage();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var added = new tbOtherPayment
                    {
                        empId = obj.empId,
                        type = obj.type,
                        amount = obj.amount,
                        installmentQty = obj.installmentQty,
                        installmentAmount = obj.installmentAmount,
                        installmentStartDate = obj.installmentStartDate,
                        remark = obj.remark,
                        status = true,
                        createDate = DateTime.UtcNow,
                        createBy = obj.userCode,
                    };

                    int? addResult = _otherPaymentRepository.Add(added, conn, transaction);

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
        #endregion  Other payment

        #region Attendance Setting
        public List<AttendanceDepartmentSettingView> GetAttendanceSettingList(string departmentId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _attendanceDepartmentSettingRepository.GetAll(departmentId, conn);
            }
        }
        public tbAttendanceDepartmentSetting GetAttendanceSettingById(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _attendanceDepartmentSettingRepository.GetFirstById(id, conn);
            }
        }
        public ResultMessage AddAttendanceSetting(AttendanceDepartmentSettingModel obj)
        {
            var msg = new ResultMessage();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var atd = _attendanceDepartmentSettingRepository.GetFirstByDepartmentId(obj.departmentId, conn, transaction);
                    if( atd != null)
                    {
                        msg.isResult = false;
                        msg.strResult = string.Format("กำหนดเวลางานของ {0} มีอยู่แล้ว", atd.departmentName);
                        return msg;
                    }

                    var added = new tbAttendanceDepartmentSetting
                    {
                        departmentId = obj.departmentId,
                        attendanceTimeIn = obj.attendanceTimeIn,
                        attendanceTimeOut = obj.attendanceTimeOut,
                        status = obj.status,
                        createDate = DateTime.UtcNow,
                        createBy = obj.userCode,
                    };

                    int? addResult = _attendanceDepartmentSettingRepository.Add(added, conn, transaction);

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

        public ResultMessage UpdateAttendanceSetting(AttendanceDepartmentSettingModel obj)
        {
            var msg = new ResultMessage();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var atd = _attendanceDepartmentSettingRepository.GetFirstByDepartmentId(obj.departmentId, conn, transaction);
                    if (atd != null && atd.id != obj.id)
                    {
                        msg.isResult = false;
                        msg.strResult = string.Format("กำหนดเวลางานของแผนก {0} มีอยู่แล้ว", atd.departmentName);
                        return msg;
                    }

                    var updated = new tbAttendanceDepartmentSetting
                    {
                        id = obj.id,
                        departmentId = obj.departmentId,
                        attendanceTimeIn = obj.attendanceTimeIn,
                        attendanceTimeOut = obj.attendanceTimeOut,
                        updateDate = DateTime.UtcNow,
                        updateBy = obj.userCode,
                        status = obj.status,
                    };

                    int updateResult = _attendanceDepartmentSettingRepository.Update(updated, conn, transaction);

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
        #endregion Attendance Setting

        #region Attendance
        public List<AttendanceView> GetAttendanceList(string empCode, string empName, string startDate, string endDate)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _attendanceRepository.GetAll(empCode, empName, startDate, endDate, conn);
            }
        }

        #endregion Attendance

        #region Salary 
        //public List<SalaryView> GetSalaryList(string empCode, string empName, string startDate, string endDate)
        public IEnumerable<SalaryView> GetSalaryList(string empCode, string empName, string startDate, string endDate)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                //return _salaryRepository.GetAll(empCode, empName, startDate, endDate, conn);
                return _salaryRepository.GetAllByParams(empCode, empName, startDate, endDate, conn);
            }
        }

        public IEnumerable<AttendanceView> GetAttendanceSalaryList(string empCode, string empName, string leaveType, string startDate, string endDate)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _attendanceRepository.GetAttendanceAndLeaveByCurrentDate(empCode, empName, leaveType, startDate, endDate, conn);
            }
        }

        public IEnumerable<AttendanceView> GetAttendanceSalaryType()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _attendanceRepository.GetAttendanceTypeSelect2(conn);
            }
        }

        public IEnumerable<AttendanceView> GetAttendanceOTList(string empCode, string empName, string startDate, string endDate)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _attendanceRepository.GetAttendanceOTByCurrentDate(empCode, empName, startDate, endDate, conn);
            }
        }
        #endregion Salary

        public ResultMessage AddOrUpdateAttendance(List<AttendanceModel> obj)
        {
            var msg = new ResultMessage();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var currDate = DateTime.UtcNow;
                    foreach (var attendance in obj)
                    {
                        var exists = _empDataRepository.GetFirstByEmpCode(attendance.empCode, conn, transaction);

                        if(exists != null)
                        {
                            var existsAttendance = _attendanceRepository.GetByEmpIdAndAttendanceDate(exists.id, attendance.attendanceDate, conn, transaction);
                            if(existsAttendance == null)
                            {
                                var added = new tbAttendance
                                {
                                    empId = exists.id,
                                    attendanceDate = attendance.attendanceDate,
                                    attendanceTimeIn = attendance.attendanceTimeIn,
                                    attendanceTimeOut = attendance.attendanceTimeOut,
                                    attendanceHour = attendance.attendanceHour,
                                    status = true,
                                    createDate = currDate,
                                    createBy = attendance.createBy,
                                    isDeleted = false
                                };

                                int? inserted = _attendanceRepository.Add(added, conn, transaction);
                            }
                        }
                    }

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

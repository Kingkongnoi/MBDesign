using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilitiesMBDesign;

namespace BusinessLogicMBDesign.Master
{
    public class EmployeeService
    {
        private readonly DepartmentRepository _departmentRepository;
        private readonly PositionRepository _positionRepository;
        private readonly CompanyHolidayRepository _companyHolidayRepository;

        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public EmployeeService(IConfiguration configuration) { 
            _departmentRepository = new DepartmentRepository();
            _positionRepository = new PositionRepository();
            _companyHolidayRepository = new CompanyHolidayRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        #region holiday
        public tbCompanyHoliday GetFirstLastestHolidayId()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _companyHolidayRepository.GetLastestId(conn);
            }

        }

        public List<tbCompanyHoliday> GetHolidayList(string year, string day, string holidayDate, string holiday, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _companyHolidayRepository.GetAll(year, day, holidayDate, holiday, status, conn);
            }
        }

        public tbCompanyHoliday GetHolidayByHolidayId(int holidayId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _companyHolidayRepository.GetFirstById(holidayId, conn);
            }

        }

        public List<CompanyHolidayView> GetHolidayYear()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _companyHolidayRepository.GetHolidayYear(conn);
            }
        }

        public int? AddHoliday(CompanyHolidayModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var addedObject = new tbCompanyHoliday
                    {
                        day = model.day,
                        holiday = model.holiday,
                        holidayDate = Convert.ToDateTime(model.holidayDate),
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = "MB9999"
                    };
                    added = _companyHolidayRepository.Add(addedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateHoliday(CompanyHolidayModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var updatedObject = new tbCompanyHoliday
                    {
                        holidayId = model.holidayId,
                        day = model.day,
                        holiday = model.holiday,
                        holidayDate = Convert.ToDateTime(model.holidayDate),
                        status = model.status,
                        updateDate = DateTime.UtcNow,
                        updateBy = "MB9999"
                    };
                    updated = _companyHolidayRepository.Update(updatedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return updated;
        }

        #endregion holiday

        #region department
        public tbDepartment GetFirstLastestDepartmentId()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _departmentRepository.GetLastestId(conn);
            }

        }

        public List<DepartmentView> GetDepartmentList(string departmentname, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _departmentRepository.GetAll(departmentname, status, conn);
            }
        }

        public tbDepartment GetDepartmentByDepartmentId(int departmentId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _departmentRepository.GetFirstById(departmentId, conn);
            }

        }

        public int? AddDepartment(DepartmentModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _departmentRepository.GetFirstByName(model.departmentName, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbDepartment
                    {
                        departmentName = model.departmentName,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = "MB9999"
                    };
                    added = _departmentRepository.Add(addedObject, conn, transaction);

                    transaction.Commit();
                }
                catch(Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateDepartment(DepartmentModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _departmentRepository.GetFirstByName(model.departmentName, conn, transaction);
                if (exists != null) { if (exists.departmentId != model.departmentId) { return -1; } }

                try
                {
                    var updatedObject = new tbDepartment
                    {
                        departmentId = model.departmentId,
                        departmentName = model.departmentName,
                        status = model.status,
                        updateDate = DateTime.UtcNow,
                        updateBy = "MB9999"
                    };
                    updated = _departmentRepository.Update(updatedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return updated;
        }

        #endregion department

        #region position
        public tbPosition GetFirstLastestPositionId()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _positionRepository.GetLastestId(conn);
            }

        }

        public List<tbPosition> GetPositionList(string positionName, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _positionRepository.GetAll(positionName, status, conn);
            }
        }

        public tbPosition GetPositionByPositionId(int positionId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _positionRepository.GetFirstById(positionId, conn);
            }

        }

        public int? AddPosition(PositionModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _positionRepository.GetFirstByName(model.positionName, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbPosition
                    {
                        positionName = model.positionName,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = "MB9999"
                    };
                    added = _positionRepository.Add(addedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdatePosition(PositionModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _positionRepository.GetFirstByName(model.positionName, conn, transaction);
                if (exists != null) { if (exists.positionId != model.positionId) { return -1; } }

                try
                {
                    var updatedObject = new tbPosition
                    {
                        positionId = model.positionId,
                        positionName = model.positionName,
                        status = model.status,
                        updateDate = DateTime.UtcNow,
                        updateBy = "MB9999"
                    };
                    updated = _positionRepository.Update(updatedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return updated;
        }

        #endregion department
    }
}

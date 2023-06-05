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
        private readonly EmpDataRepository _empDataRepository;
        private readonly RoleRepository _roleRepository;
        private readonly MenuRepository _menuRepository;
        private readonly RoleMenuRepository _roleMenuRepository;
        private readonly RoleEmpDataRepository _roleEmpDataRepository;

        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        private readonly string _empCodePrefix;

        public EmployeeService(IConfiguration configuration) { 
            _departmentRepository = new DepartmentRepository();
            _positionRepository = new PositionRepository();
            _companyHolidayRepository = new CompanyHolidayRepository();
            _empDataRepository = new EmpDataRepository();
            _roleRepository = new RoleRepository(); 
            _menuRepository = new MenuRepository();
            _roleMenuRepository = new RoleMenuRepository();
            _roleEmpDataRepository = new RoleEmpDataRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
            _empCodePrefix = _configuration.GetSection("EmpCodePrefix").Value;
        }

        #region employee
        public tbEmpData GetFirstLastestId()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _empDataRepository.GetLastestId(conn);
            }

        }

        public List<EmpDataView> GetEmpList(string empId, string empName, string departmentId, string positionId, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _empDataRepository.GetAll(empId, empName, departmentId, positionId, status, conn);
            }
        }

        public EmpDataView GetEmpByEmpId(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _empDataRepository.GetFirstById(id, conn);
            }

        }

        public string GenerateEmpId()
        {
            var lastestId = this.GetFirstLastestId();
            string numberGen = string.Format("{0:000}", lastestId.id);

            string newEmpId = string.Format("{0}{1}", _empCodePrefix, numberGen);

            return newEmpId;
        }

        public List<tbDepartment> GetAllActiveDepartmentSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _departmentRepository.GetAllActiveSelect2(conn);
            }
        }

        public List<tbPosition> GetAllActivePositionSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _positionRepository.GetAllActiveSelect2(conn);
            }
        }

        public List<tbRole> GetAllActiveRoleSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _roleRepository.GetAllActiveSelect2(conn);
            }
        }

        public int? AddEmployee(EmpDataModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var addedObject = new tbEmpData
                    {
                        empCode = model.empId,
                        empFirstName = model.empFirstName,
                        empLastName = model.empLastName,
                        departmentId = model.departmentId,
                        positionId = model.positionId,
                        salaryType = model.salaryType,
                        salary = model.salary,
                        status = model.status,
                        hiringDate = model.hiringDate,
                        signatureFileName = "",//model.signatureFileName,
                        timeStampType = model.timeStampType,
                        createDate = DateTime.UtcNow,
                        createBy = "MB9999",
                        idCard = model.idCard,
                    };

                    added = _empDataRepository.Add(addedObject, conn, transaction);

                    var addedRoleEmp = new tbRoleEmpData
                    {
                        roleId = model.roleId,
                        empId = added.Value,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = "MB9999"
                    };

                    int? addedMnuEmp = _roleEmpDataRepository.Add(addedRoleEmp, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateEmployee(EmpDataModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var updatedObject = new tbEmpData
                    {
                        id = model.id,
                        empCode = model.empId,
                        empFirstName = model.empFirstName,
                        empLastName = model.empLastName,
                        departmentId = model.departmentId,
                        positionId = model.positionId,
                        salaryType = model.salaryType,
                        salary = model.salary,
                        status = model.status,
                        hiringDate = model.hiringDate,
                        signatureFileName = "",//model.signatureFileName,
                        timeStampType = model.timeStampType,
                        updateDate = DateTime.UtcNow,
                        updateBy = "MB9999",
                        idCard = model.idCard,
                    };

                    updated = _empDataRepository.Update(updatedObject, conn, transaction);

                    var empExists = _empDataRepository.GetFirstByEmpCode(model.empId, conn, transaction);
                    int empId = (empExists != null) ? empExists.id : 0;

                    var empRole = _roleEmpDataRepository.GetFirstByEmpId(model.id, conn, transaction);
                    int roleEmpDataId = (empRole != null) ? empRole.roleEmpDataId : 0;

                    if(roleEmpDataId == 0)
                    {
                        var addedRoleEmp = new tbRoleEmpData
                        {
                            roleId = model.roleId,
                            empId = empId,
                            status = model.status,
                            createDate = DateTime.UtcNow,
                            createBy = "MB9999"
                        };

                        int? addedMnuEmp = _roleEmpDataRepository.Add(addedRoleEmp, conn, transaction);
                    }
                    else
                    {
                        var updateRoleEmp = new tbRoleEmpData
                        {
                            roleEmpDataId = roleEmpDataId,
                            roleId = model.roleId,
                            empId = empId,
                            status = model.status,
                            updateDate = DateTime.UtcNow,
                            updateBy = "MB9999"
                        };

                        int? updateMnuEmp = _roleEmpDataRepository.Update(updateRoleEmp, conn, transaction);
                    }

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return updated;
        }

        public int UpdateSignatureFileName(EmpDataModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var obj = new tbEmpData
                    {
                        signatureFileName = model.signatureFileName,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.loginCode,
                        empCode = model.empId
                    };

                    updated = _empDataRepository.UpdateSignatureFileName(obj, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return updated;
        }

        #endregion employee

        #region role
        public tbRole GetFirstLastestRoleId()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _roleRepository.GetLastestId(conn);
            }

        }

        public List<tbRole> GetRoleList(string roleName, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _roleRepository.GetAll(roleName, status, conn);
            }
        }

        public tbRole GetRoleByRoleId(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _roleRepository.GetFirstById(id, conn);
            }

        }

        public List<MenuView> GetMenuList(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _menuRepository.GetAll(id, conn);
            }
        }

        public int? AddRole(RoleModel model)
        {
            int? newRoleId = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _roleRepository.GetFirstByName(model.name, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedRole = new tbRole
                    {
                        name = model.name,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = "MB9999"
                    };

                    newRoleId = _roleRepository.Add(addedRole, conn, transaction);

                    var groupRole = model.roleMenu.GroupBy(gr => gr.menuId).ToList();
                    foreach(var item in groupRole)
                    {
                        var lst = item.ToList();

                        var canAdd = (lst.Where(v => v.action == "all").FirstOrDefault().chkResult) ? true : lst.Where(v => v.action == "add").FirstOrDefault().chkResult;
                        var canEdit = (lst.Where(v => v.action == "all").FirstOrDefault().chkResult) ? true : lst.Where(v => v.action == "edit").FirstOrDefault().chkResult;
                        var canApprove = (lst.Where(v => v.action == "all").FirstOrDefault().chkResult) ? true : lst.Where(v => v.action == "approve").FirstOrDefault().chkResult;
                        var canView = (lst.Where(v => v.action == "all").FirstOrDefault().chkResult) ? true : lst.Where(v => v.action == "view").FirstOrDefault().chkResult;
                        var roleMenuObj = new tbRoleMenu
                        {
                            menuId = lst.FirstOrDefault().menuId,
                            roleId = newRoleId.Value,
                            canAdd = canAdd,
                            canEdit = canEdit,
                            canApprove = canApprove,
                            canView = canView,
                            status = model.status,
                            createDate = DateTime.UtcNow,
                            createBy = "MB9999"
                        };

                        int? addRoleMenu = _roleMenuRepository.Add(roleMenuObj, conn, transaction);
                    }

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return newRoleId;
        }

        public int UpdateRole(RoleModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _roleRepository.GetFirstByName(model.name, conn, transaction);
                if (exists != null) { if (exists.roleId != model.roleId) { return -1; } }

                try
                {
                    var updatedRole = new tbRole
                    {
                        roleId = model.roleId,
                        name = model.name,
                        status = model.status,
                        updateDate = DateTime.UtcNow,
                        updateBy = "MB9999"
                    };
                    updated = _roleRepository.Update(updatedRole, conn, transaction);

                    var groupRole = model.roleMenu.GroupBy(gr => gr.menuId).ToList();
                    foreach (var item in groupRole)
                    {
                        var lst = item.ToList();

                        var canAdd = (lst.Where(v => v.action == "all").FirstOrDefault().chkResult) ? true : lst.Where(v => v.action == "add").FirstOrDefault().chkResult;
                        var canEdit = (lst.Where(v => v.action == "all").FirstOrDefault().chkResult) ? true : lst.Where(v => v.action == "edit").FirstOrDefault().chkResult;
                        var canApprove = (lst.Where(v => v.action == "all").FirstOrDefault().chkResult) ? true : lst.Where(v => v.action == "approve").FirstOrDefault().chkResult;
                        var canView = (lst.Where(v => v.action == "all").FirstOrDefault().chkResult) ? true : lst.Where(v => v.action == "view").FirstOrDefault().chkResult;
                        var roleMenuObj = new tbRoleMenu
                        {
                            //roleMenuId = lst.FirstOrDefault().roleMenuId,
                            menuId = lst.FirstOrDefault().menuId,
                            roleId = model.roleId,
                            canAdd = canAdd,
                            canEdit = canEdit,
                            canApprove = canApprove,
                            canView = canView,
                            status = model.status,
                            createDate = DateTime.UtcNow,
                            createBy = "MB9999"
                        };

                        int? addRoleMenu = 0;
                        if (lst.FirstOrDefault().roleMenuId == 0)
                        {
                            addRoleMenu = _roleMenuRepository.Add(roleMenuObj, conn, transaction);
                        }
                        else
                        {
                            roleMenuObj.roleMenuId = lst.FirstOrDefault().roleMenuId;
                            addRoleMenu = _roleMenuRepository.Update(roleMenuObj, conn, transaction);
                        }
                    }

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return updated;
        }

        #endregion role

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

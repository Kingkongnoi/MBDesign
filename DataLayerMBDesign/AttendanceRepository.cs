using Dapper;
using EntitiesMBDesign;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayerMBDesign
{
    public class AttendanceRepository
    {
        public List<AttendanceView> GetAll(string empCode, string empName, string startDate, string endDate, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(empCode) && empCode != "null")
            {
                condition += string.Format(" and b.empCode like '%{0}%'", empCode);
            }

            if (!string.IsNullOrEmpty(empName) && empName != "null")
            {
                condition += string.Format(" and(b.empFirstName + ' ' + b.empLastName) like '%{0}%'", empName);
            }

            if ((!string.IsNullOrEmpty(startDate) && startDate != "null") && (string.IsNullOrEmpty(endDate) && endDate == "null"))
            {
                condition += string.Format(" and  FORMAT(a.attendanceDate, 'yyyy-MM-dd') = N'{0}'", startDate);
            }

            if ((!string.IsNullOrEmpty(startDate) && startDate != "null") && (!string.IsNullOrEmpty(endDate) && endDate != "null"))
            {
                condition += string.Format(" and  FORMAT(a.attendanceDate, 'yyyy-MM-dd') between N'{0}' and N'{1}'", startDate, endDate);
            }

            string queryString = string.Format(@"SELECT a.attendanceId
            ,a.empId
            ,a.attendanceDate
            ,a.attendanceTimeIn
            ,a.attendanceTimeOut
            ,a.attendanceHour
            ,a.status
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted
            ,b.empCode
            ,b.empFirstName + ' ' + b.empLastName  employeeName
            , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.createBy and isDeleted = 0),'') createByName
            , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.updateBy and isDeleted = 0),'') updateByName
            FROM tbAttendance a inner join tbEmpData b on a.empId = b.id
            where a.isDeleted = 0 and b.isDeleted = 0
            {0}
            order by a.createDate DESC", condition);

            return conn.Query<AttendanceView>(queryString, new { }, transaction: trans).ToList();
        }

        public IEnumerable<AttendanceView> GetAttendanceAndLeaveByCurrentDate(string empCode, string empName, string leaveType, string startDate, string endDate, SqlConnection conn, SqlTransaction? trans = null)
        {
            if (empCode == "null") { empCode = string.Empty; }
            if (empName == "null") { empName = string.Empty; }
            if (leaveType == "null") { leaveType = string.Empty; }
            if (startDate == "null") { startDate = string.Empty; }
            if (endDate == "null") { endDate = string.Empty; }

            return conn.Query<AttendanceView>("spGenerateAttendanceLeave",
                    param: new { empCode, empName, leaveType, startDate, endDate },
                    commandType: System.Data.CommandType.StoredProcedure);
        }

        public IEnumerable<AttendanceView> GetAttendanceTypeSelect2(SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Query<AttendanceView>("spGenerateAttendanceSalaryType",
                    commandType: System.Data.CommandType.StoredProcedure);
        }

        public IEnumerable<AttendanceView> GetAttendanceOTByCurrentDate(string empCode, string empName, string startDate, string endDate, SqlConnection conn, SqlTransaction? trans = null)
        {
            if (empCode == "null") { empCode = string.Empty; }
            if (empName == "null") { empName = string.Empty; }
            if (startDate == "null") { startDate = string.Empty; }
            if (endDate == "null") { endDate = string.Empty; }

            return conn.Query<AttendanceView>("spGenerateAttendanceOT",
                    param: new { empCode, empName, startDate, endDate },
                    commandType: System.Data.CommandType.StoredProcedure);
        }

    }
}

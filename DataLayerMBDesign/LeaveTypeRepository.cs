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
    public class LeaveTypeRepository
    {
        public List<LeaveTypeView> GetAll(string leaveType, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(leaveType) && leaveType != "null")
            {
                condition += string.Format(" and a.leaveTypeName = N'{0}'", leaveType);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and a.status = {0}", status);
            }

            string queryString = string.Format(@"SELECT a.leaveTypeId
                                ,a.leaveTypeName
                                ,a.leaveTypeDays
                                ,a.leaveTypeDetail
                                ,a.status
                                ,a.createDate
                                ,a.createBy
                                ,a.updateDate
                                ,a.updateBy
                                ,a.isDeleted
                                , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.createBy and isDeleted = 0),'') createByName
                                , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.updateBy and isDeleted = 0),'') updateByName
                                FROM tbLeaveType a
                                where a.isDeleted = 0
                                {0}
                                order by a.leaveTypeId desc
                                ", condition);

            return conn.Query<LeaveTypeView>(queryString, new { }, transaction: trans).ToList();
        }

        public List<tbLeaveType> GetSelect2LeaveTypeName(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
            select leaveTypeName
            from tbLeaveType
            where isDeleted = 0
            group by leaveTypeName
            order by leaveTypeName";

            return conn.Query<tbLeaveType>(queryString, new { }, transaction: trans).ToList();
        }

        public tbLeaveType GetFirstByKeyId(int leaveTypeId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
            SELECT TOP 1 a.leaveTypeId
            ,a.leaveTypeName
            ,a.leaveTypeDays
            ,a.leaveTypeDetail
            ,a.status
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted
            FROM tbLeaveType a
            where a.isDeleted = 0 and a.leaveTypeId = @leaveTypeId";

            return conn.QuerySingleOrDefault<tbLeaveType>(queryString, new { leaveTypeId }, transaction: trans);
        }

        public int UpdateLeaveType(tbLeaveType obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbLeaveType
            set leaveTypeDays = @leaveTypeDays
            ,updateDate = @updateDate
            ,updateBy = @updateBy
            ,status = @status
            where leaveTypeId = @leaveTypeId and isDeleted = 0
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.leaveTypeDays, obj.updateDate, obj.updateBy, obj.status, obj.leaveTypeId }, transaction: trans);
        }

        public tbLeaveType GetFirstByName(string name, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
            SELECT TOP 1 a.leaveTypeId
            ,a.leaveTypeName
            ,a.leaveTypeDays
            ,a.leaveTypeDetail
            ,a.status
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted
            FROM tbLeaveType a
            where a.isDeleted = 0 and a.leaveTypeName = @name";

            return conn.QuerySingleOrDefault<tbLeaveType>(queryString, new { name }, transaction: trans);
        }

        public List<LeaveTypeView> GetLeaveSummaryByEmpData(string empCode, string empName, SqlConnection conn, SqlTransaction? trans = null)
        {
            if (string.IsNullOrEmpty(empCode) || empCode == "null")
            {
                empCode = "";
            }

            if (string.IsNullOrEmpty(empName) || empName == "null")
            {
                empName = "";
            }

            string queryString = string.Format(@"DECLARE @empId int;

            if(@empCode <> '')
            begin
	            set @empId = (select top 1 id from tbEmpData where isDeleted = 0 and empCode = @empCode);
            end
            else if(@empName <> '')
            begin
	            set @empId = (select top 1 id from tbEmpData where isDeleted = 0 and (empFirstName + ' ' + empLastName) = N'%' + @empName + '%');
            end

            if(@empCode = '' and @empName = '')
            begin
	            select leaveTypeId, leaveTypeName, leaveTypeDays, leaveTypeDetail, 0 useLeaveDays, 0 remainLeaveDays
	            FROM tbLeaveType a
	            where a.isDeleted = 1
            end
            else
            begin
	            select leaveTypeId, leaveTypeName, leaveTypeDays, leaveTypeDetail, useLeaveDays, sum(leaveTypeDays-useLeaveDays) remainLeaveDays
	            from (
	            SELECT a.leaveTypeId
	            ,a.leaveTypeName
	            ,a.leaveTypeDays
	            ,a.leaveTypeDetail
	            ,(select isnull(sum(leaveDays), 0) from tbLeave where isDeleted = 0 and leaveTypeId = a.leaveTypeId and empId = @empId) useLeaveDays
	            FROM tbLeaveType a
	            where a.isDeleted = 0
	            ) aa
	            group by leaveTypeId, leaveTypeName, leaveTypeDays, leaveTypeDetail, useLeaveDays
	            order by leaveTypeId
            end");

            return conn.Query<LeaveTypeView>(queryString, new { empCode, empName }, transaction: trans).ToList();
        }
    }
}

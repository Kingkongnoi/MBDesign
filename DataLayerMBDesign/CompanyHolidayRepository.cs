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
    public class CompanyHolidayRepository
    {
        public int? Add(tbCompanyHoliday obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbCompanyHoliday obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbCompanyHoliday
                                set day = @day,
                                holiday = @holiday,
                                holidayDate = @holidayDate,
                                status = @status,
                                updateDate = @updateDate,
                                updateBy = @updateBy
                                where isDeleted = 0 and holidayId = @holidayId
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.day, obj.holiday, obj.holidayDate, obj.updateDate, obj.updateBy, obj.status, obj.holidayId }, transaction: trans);
        }

        public List<CompanyHolidayView> GetAll(string year, string day, string holidayDate, string holiday, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(year) && year != "null")
            {
                condition += string.Format(" and year(holidayDate) = '{0}'", year);
            }

            if (!string.IsNullOrEmpty(day) && day != "null")
            {
                condition += string.Format(" and [day] = N'{0}'", day);
            }

            if (!string.IsNullOrEmpty(holidayDate) && holidayDate != "null")
            {
                condition += string.Format(" and  FORMAT([holidayDate], 'yyyy-MM-dd') = N'{0}'", holidayDate);
            }

            if (!string.IsNullOrEmpty(holiday) && holiday != "null")
            {
                condition += string.Format(" and  holiday like N'%{0}%'", holiday);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and status = {0}", status);
            }

            string queryString = string.Format(@"select  a.[holidayId]
                                ,a.[day]
                                ,a.[holiday]
                                ,a.[holidayDate]
                                ,a.[status]
                                ,a.[createDate]
                                ,a.[createBy]
                                ,a.[updateDate]
                                ,a.[updateBy]
                                ,a.[isDeleted]
                                , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.createBy and isDeleted = 0),'') createByName
                                , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.updateBy and isDeleted = 0),'') updateByName
                                from tbCompanyHoliday a
                                where a.isDeleted = 0
                                {0}
                                order by a.holidayId desc", condition);

            return conn.Query<CompanyHolidayView>(queryString, new { }, transaction: trans).ToList();
        }

        public tbCompanyHoliday GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"if not exists(select top 1 1 from tbCompanyHoliday)
                                begin
	                                SELECT IDENT_CURRENT('tbCompanyHoliday') AS holidayId;  
                                end
                                else
                                begin
	                                SELECT IDENT_CURRENT('tbCompanyHoliday') + 1 AS holidayId;  
                                end
                                ";

            return conn.QueryFirstOrDefault<tbCompanyHoliday>(queryString, transaction: trans);
        }

        public tbCompanyHoliday GetFirstById(int holidayId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 [holidayId]
                                ,[day]
                                ,[holiday]
                                ,[holidayDate]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                ,[isDeleted]
                                from tbCompanyHoliday
                                where isDeleted = 0 and holidayId = @holidayId
                                order by holidayId";

            return conn.QueryFirstOrDefault<tbCompanyHoliday>(queryString, new { holidayId }, transaction: trans);
        }

        public tbCompanyHoliday GetFirstByName(string holiday, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@"select top 1 [holidayId]
                                ,[day]
                                ,[holiday]
                                ,[holidayDate]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                ,[isDeleted]
                                from tbCompanyHoliday
                                where isDeleted = 0 and holiday = N'{0}'", holiday);

            return conn.QueryFirstOrDefault<tbCompanyHoliday>(queryString, new { holiday }, transaction: trans);
        }

        public List<CompanyHolidayView> GetHolidayYear(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select *
                                from (
                                SELECT YEAR([holidayDate]) holidayYear
                                FROM [tbCompanyHoliday]
                                group by YEAR([holidayDate])
                                ) a
                                order by holidayYear desc";

            return conn.Query<CompanyHolidayView>(queryString, transaction: trans).ToList();
        }
    }
}

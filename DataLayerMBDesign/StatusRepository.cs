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
    public class StatusRepository
    {
        public List<StatusView> GetAllByCategoryName(string categoryName, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT a.[statusId]
            ,a.[name]
            ,a.[categoryId]
            ,a.[status]
            ,a.[createDate]
            ,a.[createBy]
            ,a.[updateDate]
            ,a.[updateBy]
            ,a.[isDeleted]
            ,b.[name] categoryName
            FROM [tbStatus] a inner join [tbCategory] b on a.[categoryId] = b.[categoryId]
            WHERE a.[isDeleted] = 0 and b.[isDeleted] = 0 and a.[status] = 1 and b.[status] = 1
            and b.[name] = @categoryName";

            return conn.Query<StatusView>(queryString, new { categoryName }, transaction: trans).ToList();
        }

        public StatusView GetFirstByCategoryNameAndStatusName(string categoryName, string statusName, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT TOP 1 a.[statusId]
            ,a.[name]
            ,a.[categoryId]
            ,a.[status]
            ,a.[createDate]
            ,a.[createBy]
            ,a.[updateDate]
            ,a.[updateBy]
            ,a.[isDeleted]
            ,b.[name] categoryName
            FROM [tbStatus] a inner join [tbCategory] b on a.[categoryId] = b.[categoryId]
            WHERE a.[isDeleted] = 0 and b.[isDeleted] = 0 and a.[status] = 1 and b.[status] = 1
            and b.[name] = @categoryName and a.[name] = @statusName";

            return conn.QueryFirstOrDefault<StatusView>(queryString, new { categoryName, statusName }, transaction: trans);
        }

        public List<StatusView> GetAllInvoicePeriodByCategoryName(string categoryName, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT a.[name] fullPeriod
            ,(select top 1 name from tbStatus where isDeleted = 0 and status = 1 and statusId = a.parentStatusId) [period]
            FROM [tbStatus] a inner join [tbCategory] b on a.[categoryId] = b.[categoryId]
            WHERE a.[isDeleted] = 0 and b.[isDeleted] = 0 and a.[status] = 1 and b.[status] = 1
            and b.[name] = @categoryName and a.parentStatusId <> 0";

            return conn.Query<StatusView>(queryString, new { categoryName }, transaction: trans).ToList();
        }
    }
}

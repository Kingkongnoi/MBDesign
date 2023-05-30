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
    public class CustRepository
    {
        public int? Add(tbCust obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbCust obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbCust
                                set custFirstName = @custFirstName,
                                custSurName = @custSurName,
                                custNickName = @custNickName,
                                custTel = @custTel,
                                custLineId = @custLineId,
                                custAddress = @custAddress,
                                custLocation = @custLocation,
                                custInstallAddress = @custInstallAddress,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                status = @status
                                where isDeleted = 0 and custId = @custId
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.custFirstName, obj.custSurName, obj.custNickName, obj.custTel, obj.custAddress, obj.custLocation, obj.custInstallAddress, obj.custLineId, obj.updateDate, obj.updateBy, obj.status, obj.custId }, transaction: trans);
        }

        public tbCust GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                                if not exists(select top 1 1 from tbCust)
                                begin
	                                SELECT IDENT_CURRENT('tbCust') AS custId;  
                                end
                                else
                                begin
	                                SELECT IDENT_CURRENT('tbCust') + 1 AS custId;  
                                end";

            return conn.QueryFirstOrDefault<tbCust>(queryString, transaction: trans);
        }

        public tbCust GetFirstById(int custId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 [custId]
                                ,[custFirstName]
                                ,[custSurName]
                                ,[custNickName]
                                ,[custTel]
                                ,[custLineId]
                                ,[custAddress]
                                ,[custLocation]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                ,[isDeleted]
                                ,[custInstallAddress]
                                from tbCust
                                where isDeleted = 0 and custId = @custId
                                order by custId";

            return conn.QueryFirstOrDefault<tbCust>(queryString, new { custId }, transaction: trans);
        }

        public int UpdateAccounting(tbCust obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbCust
                                set custFirstName = @custFirstName,
                                custSurName = @custSurName,
                                custAddress = @custAddress,
                                updateDate = @updateDate,
                                updateBy = @updateBy
                                where isDeleted = 0 and custId = @custId
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.custFirstName, obj.custSurName, obj.custAddress, obj.updateDate, obj.updateBy, obj.custId }, transaction: trans);
        }
    }
}

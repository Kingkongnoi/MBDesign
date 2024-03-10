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
    public class IdCardComCertRepository
    {
        public int? Add(tbIdCardComCert obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int UpdateIdCard(tbIdCardComCert obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbIdCardComCert
                                set 
                                imgIdCardFileName = @imgIdCardFileName,
                                updateDate = @updateDate,
                                updateBy = @updateBy
                                where isDeleted = 0 and id = @id
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.imgIdCardFileName, obj.updateDate, obj.updateBy, obj.id }, transaction: trans);
        }

        public int UpdateComCert(tbIdCardComCert obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbIdCardComCert
                                set imgComCertFileName = @imgComCertFileName,
                                updateDate = @updateDate,
                                updateBy = @updateBy
                                where isDeleted = 0 and id = @id
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.imgComCertFileName, obj.updateDate, obj.updateBy, obj.id }, transaction: trans);
        }

        public tbIdCardComCert GetFirstIdCardComCert(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT TOP 1 [id]
                                ,[idCardComCertId]
                                ,[imgIdCardFileName]
                                ,[imgComCertFileName]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                ,[isDeleted]
                                FROM [tbIdCardComCert]
                                where [isDeleted] = 0 and [status] = 1
                                order by [id] desc";

            return conn.QueryFirstOrDefault<tbIdCardComCert>(queryString, transaction: trans);
        }
    }
}

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
    public class PositionRepository
    {
        public int? Add(tbPosition obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbPosition obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbPosition
                                set positionName = @positionName,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                status = @status
                                where isDeleted = 0 and positionId = @positionId

                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.positionName, obj.updateDate, obj.updateBy, obj.status, obj.positionId }, transaction: trans);
        }

        public List<tbPosition> GetAll(string positionName, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(positionName) && positionName != "null")
            {
                condition += string.Format(" and positionName like N'%{0}%'", positionName);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and status = {0}", status);
            }

            string queryString = string.Format(@"select  [positionId]
                                ,[positionName]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                ,[isDeleted]
                                from tbPosition
                                where isDeleted = 0
                                {0}
                                order by positionId", condition);

            return conn.Query<tbPosition>(queryString, new { }, transaction: trans).ToList();
        }

        public tbPosition GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                                if not exists(select top 1 1 from tbPosition)
                                begin
	                                SELECT IDENT_CURRENT('tbPosition') AS positionId;  
                                end
                                else
                                begin
	                                SELECT IDENT_CURRENT('tbPosition') + 1 AS positionId;  
                                end";

            return conn.QueryFirstOrDefault<tbPosition>(queryString, transaction: trans);
        }

        public tbPosition GetFirstById(int positionId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1  [positionId]
                                ,[positionName]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                ,[isDeleted]
                                from tbPosition
                                where isDeleted = 0 and positionId = @positionId
                                order by positionId";

            return conn.QueryFirstOrDefault<tbPosition>(queryString, new { positionId }, transaction: trans);
        }

        public tbPosition GetFirstByName(string positionName, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@"select top 1  [positionId]
                                ,[positionName]
                                ,[status]
                                ,[createDate]
                                ,[createBy]
                                ,[updateDate]
                                ,[updateBy]
                                ,[isDeleted]
                                from tbPosition
                                where isDeleted = 0 and positionName = N'{0}'", positionName);

            return conn.QueryFirstOrDefault<tbPosition>(queryString, new { positionName }, transaction: trans);
        }

        public List<tbPosition> GetAllActiveSelect2(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select positionId, positionName
                                from tbPosition
                                where isDeleted = 0 and status = 1
                                order by positionName";

            return conn.Query<tbPosition>(queryString, transaction: trans).ToList();
        }
    }
}

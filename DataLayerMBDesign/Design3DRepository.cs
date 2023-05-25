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
    public class Design3DRepository
    {
        public int? Add(tbDesign3D obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int UpdateChecklistStatus(int orderId, string checklistStatus, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"UPDATE tbDesign3D
            SET [checklistStatus] = @checklistStatus
            WHERE orderId = @orderId
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { orderId, checklistStatus }, transaction: trans);
        }
        public List<tbDesign3D> GetChecklistStatus(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select checklistStatus
            from tbDesign3D
            where isDeleted = 0 and [status] = 1
            group by checklistStatus
            order by checklistStatus";

            return conn.Query<tbDesign3D>(queryString, transaction:trans).ToList();
        }

        public Design3DView GetByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT top 1 id
            ,orderId
            ,ownerEmpId
            ,dueDate
            ,checklistStatus
            ,[status]
            ,createDate
            ,createBy
            ,updateDate
            ,updateBy
            ,isDeleted
            FROM tbDesign3D
            where orderId = @orderId and isDeleted = 0 and status = 1";

            return conn.QueryFirstOrDefault<Design3DView>(queryString, new { orderId }, transaction: trans);
        }

        public Design3DView GetEditDesign3DByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @" select top 1 a.*, b.quotationNumber, b.installDate
                            from tbDesign3D a inner join tbCustOrder b on a.orderId = b.orderId
                            where a.isDeleted = 0 and a.status = 1 and b.isDeleted = 0 and b.status = 1
                            and a.orderId = @orderId";

            return conn.QueryFirstOrDefault<Design3DView>(queryString, new { orderId }, transaction: trans);
        }
    }
}

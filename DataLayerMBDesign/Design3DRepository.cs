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

        public int UpdateByKeyId(tbDesign3D obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"UPDATE tbDesign3D
            SET [checklistStatusId] = @checklistStatusId,
            [ownerEmpId] = @ownerEmpId,
            [dueDate] = @dueDate,
            [updateDate] = @updateDate,
            [updateBy] = @updateBy
            WHERE id = @id
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.checklistStatusId, obj.ownerEmpId, obj.dueDate, obj.updateDate, obj.updateBy, obj.id }, transaction: trans);
        }
        public int UpdateChecklistStatus(int orderId, int checklistStatusId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"UPDATE tbDesign3D
            SET [checklistStatusId] = @checklistStatusId
            WHERE orderId = @orderId
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { orderId, checklistStatusId }, transaction: trans);
        }
        public List<Design3DView> GetChecklistStatus(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"	select b.name checklistStatus 
			from tbDesign3D a inner join tbstatus b on a.isDeleted = 0 and b.isDeleted = 0
            inner join tbCategory c on b.categoryId = c.categoryId and c.isDeleted = 0
            where c.name = N'3DDesign'
			group by b.name 
			order by b.name";

            return conn.Query<Design3DView>(queryString, transaction:trans).ToList();
        }

        public Design3DView GetByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT top 1 id
            ,orderId
            ,ownerEmpId
            ,dueDate
            ,isnull((select top 1 name from tbStatus where isDeleted = 0 and status = 1 and statusId = isnull(checklistStatusId,0)),'') checklistStatus
            ,[status]
            ,createDate
            ,createBy
            ,updateDate
            ,updateBy
            ,isDeleted
            ,checklistStatusId
            FROM tbDesign3D
            where orderId = @orderId and isDeleted = 0 and status = 1";

            return conn.QueryFirstOrDefault<Design3DView>(queryString, new { orderId }, transaction: trans);
        }

        public Design3DView GetEditDesign3DByOrderId(int orderId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @" select top 1 a.id
                                ,a.orderId
                                ,a.ownerEmpId
                                ,a.dueDate
                                ,isnull((select top 1 name from tbStatus where isDeleted = 0 and status = 1 and statusId = isnull(a.checklistStatusId,0)),'') checklistStatus
                                ,a.checklistStatusId
                                ,a.[status]
                                ,a.createDate
                                ,a.createBy
                                ,a.updateDate
                                ,a.updateBy
                                ,a.isDeleted, b.quotationNumber, b.installDate
                            , case when (select top 1 name from tbStatus where isDeleted = 0 and statusId = a.checklistStatusId) = N'แบบ 3D Final' then 1 else 0 end isCheckFinal3d
                            from tbDesign3D a inner join tbCustOrder b on a.orderId = b.orderId
                            where a.isDeleted = 0 and a.status = 1 and b.isDeleted = 0 and b.status = 1
                            and a.orderId = @orderId";

            return conn.QueryFirstOrDefault<Design3DView>(queryString, new { orderId }, transaction: trans);
        }

        public Design3DView GetEditDesign3DByKeyId(int keyId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @" SELECT TOP 1 id
                                ,orderId
                                ,ownerEmpId
                                ,dueDate
                                ,isnull((select top 1 name from tbStatus where isDeleted = 0 and status = 1 and statusId = isnull(checklistStatusId,0)),'') checklistStatus
                                ,checklistStatusId
                                ,[status]
                                ,createDate
                                ,createBy
                                ,updateDate
                                ,updateBy
                                ,isDeleted
                                FROM tbDesign3D
                                where id= @keyId and isDeleted = 0 and status = 1";

            return conn.QueryFirstOrDefault<Design3DView>(queryString, new { keyId }, transaction: trans);
        }
    }
}

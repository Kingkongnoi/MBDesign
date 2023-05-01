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
    public class RoleMenuRepository
    {
        public int? Add(tbRoleMenu obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbRoleMenu obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbRoleMenu
                                set canAdd = @canAdd,
                                canEdit = @canEdit,
                                canApprove = @canApprove,
                                canView = @canView,

                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                status = @status
                                where isDeleted = 0 and roleMenuId = @roleMenuId

                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.canAdd, obj.canEdit, obj.canApprove, obj.canView, obj.updateDate, obj.updateBy, obj.status, obj.roleMenuId }, transaction: trans);
        }
    }
}

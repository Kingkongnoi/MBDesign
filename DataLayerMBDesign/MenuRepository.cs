using Dapper;
using EntitiesMBDesign;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace DataLayerMBDesign
{
    public class MenuRepository
    {
        public List<MenuView> GetAll(int roleId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                if not exists(select top 1 1 from tbRoleMenu where roleId = @roleId and isDeleted = 0)
                begin
	                select a.menuId, a.name, a.parentMenuId, isnull(a.enableAdd,0) enableAdd, isnull(a.enableEdit,0) enableEdit, isnull(a.enableApprove,0) enableApprove, isnull(a.enableView,0) enableView, 
	                0 canAdd, 0 canEdit, 0 canApprove, 0 canView, 0 roleMenuId, 0 roleId, a.orderMenu,
	                case when a.menuId in (select parentMenuId from tbMenu where isDeleted = 0 and status = 1 and parentMenuId <> 0 group by parentMenuId) then 1 else 0 end headerLevel
	                from tbMenu a 
	                where a.isDeleted = 0
	                order by a.orderMenu
                end
                else
                begin
	                --select a.menuId, a.name, a.parentMenuId, isnull(a.enableAdd,0) enableAdd, isnull(a.enableEdit,0) enableEdit, isnull(a.enableApprove,0) enableApprove, isnull(a.enableView,0) enableView, 
                    --isnull(b.canAdd,0) canAdd, isnull(b.canEdit,0) canEdit, isnull(b.canApprove,0) canApprove, isnull(b.canView,0) canView, isnull(b.roleMenuId,0 ) roleMenuId, isnull(b.roleId,0) roleId
                    --,case when a.menuId in (select parentMenuId from tbMenu where isDeleted = 0 and status = 1 and parentMenuId <> 0 group by parentMenuId) then 1 else 0 end headerLevel
                    --from tbMenu a left join tbRoleMenu b on a.menuId = b.menuId and a.isDeleted = 0 and b.isDeleted= 0
                    --where b.roleId = @roleId
                    --order by a.orderMenu
                    select a.menuId, a.name, a.parentMenuId, isnull(a.enableAdd,0) enableAdd, isnull(a.enableEdit,0) enableEdit, isnull(a.enableApprove,0) enableApprove, isnull(a.enableView,0) enableView, 
                    isnull((select top 1 canAdd from tbRoleMenu where menuId = a.menuId and isDeleted = 0 and roleId = @roleId),0) canAdd,
                    isnull((select top 1 canEdit from tbRoleMenu where menuId = a.menuId and isDeleted = 0 and roleId = @roleId),0) canEdit,
                    isnull((select top 1 canApprove from tbRoleMenu where menuId = a.menuId and isDeleted = 0 and roleId = @roleId),0) canApprove,
                    isnull((select top 1 canView from tbRoleMenu where menuId = a.menuId and isDeleted = 0 and roleId = @roleId),0) canView,
                    isnull((select top 1 roleMenuId from tbRoleMenu where menuId = a.menuId and isDeleted = 0 and roleId = @roleId),0) roleMenuId,
                    @roleId roleId
                    ,case when a.menuId in (select parentMenuId from tbMenu where isDeleted = 0 and status = 1 and parentMenuId <> 0 group by parentMenuId) then 1 else 0 end headerLevel
                    from tbMenu a
                    where a.isDeleted = 0
                    order by a.orderMenu
                end";

            return conn.Query<MenuView>(queryString, new { roleId }, transaction: trans).ToList();
        }

        public List<MenuView> GetMenuPermissionPerEmpData(int empId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select a.menuId, a.name menuName, b.canAdd, b.canApprove, b.canEdit, b.canView, c.roleId, c.empId, a.parentMenuId, isnull(d.name,'') parentMenuName
            from tbMenu a inner join tbRoleMenu b on a.menuId = b.menuId and a.isDeleted = 0 and b.isDeleted = 0 and a.status = 1 and b.status = 1
            inner join tbRoleEmpData c on b.roleId = c.roleId and c.isDeleted = 0 and c.status = 1
            left join tbMenu d on a.parentMenuId = d.menuId and isnull(d.isDeleted,0) = 0 and isnull(d.status,1) = 1
            where c.empId = @empId
            order by a.orderMenu"
            ;

            return conn.Query<MenuView>(queryString, new { empId }, transaction: trans).ToList();
        }
    }
}

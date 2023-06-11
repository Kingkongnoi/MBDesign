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
    public class RoleEmpDataRepository
    {
        public int? Add(tbRoleEmpData obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbRoleEmpData obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbRoleEmpData
                                set roleId = @roleId,
                                empId = @empId,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                status = @status
                                where isDeleted = 0 and roleEmpDataId = @roleEmpDataId

                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.roleId, obj.empId, obj.updateDate, obj.updateBy, obj.status, obj.roleEmpDataId }, transaction: trans);
        }

        public List<tbRoleEmpData> GetByEmpId(int empId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT roleEmpDataId
                                ,roleId
                                ,empId
                                ,status
                                ,createDate
                                ,createBy
                                ,updateDate
                                ,updateBy
                                ,isDeleted
                                FROM tbRoleEmpData
                                where empId = @empId and isDeleted = 0 and status = 1
                                ";

            return conn.Query<tbRoleEmpData>(queryString, new { empId }, transaction: trans).ToList();
        }

        public tbRoleEmpData GetFirstByEmpId(int empId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT top 1 roleEmpDataId
                                ,roleId
                                ,empId
                                ,status
                                ,createDate
                                ,createBy
                                ,updateDate
                                ,updateBy
                                ,isDeleted
                                FROM tbRoleEmpData
                                where empId = @empId and isDeleted = 0 and status = 1
                                ";

            return conn.QueryFirstOrDefault<tbRoleEmpData>(queryString, new { empId }, transaction: trans);
        }

        public int HardDeleteRoleByEmpId(int empId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"delete tbRoleEmpData where empId = @empId
                                  select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { empId }, transaction: trans);
        }
    }
}

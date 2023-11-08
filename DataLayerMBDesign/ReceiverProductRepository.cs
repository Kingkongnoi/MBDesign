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
    public class ReceiverProductRepository
    {
        public int? Add(tbReceiverProduct obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbReceiverProduct obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" update tbReceiverProduct");
            queryString.Append(" set empid= @empid,");
            queryString.Append(" updateDate = @updateDate,");
            queryString.Append(" updateBy = @updateBy,");
            queryString.Append(" status = @status");
            queryString.Append(" where isDeleted = 0 and id = @id");
            queryString.Append(" select @@ROWCOUNT;");

            return conn.QueryFirstOrDefault<int>(queryString.ToString(), new { obj.empid, obj.updateDate, obj.updateBy, obj.status, obj.id }, transaction: trans);
        }

        public List<ReceiverProductItemModel> GetAll(string empcode, string empname, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(empcode) && empcode != "null")
            {
                condition += string.Format(" and emp.empCode ='{0}'", empcode);
            }

            if (!string.IsNullOrEmpty(empname) && empname != "null")
            {
                condition += string.Format(" and (emp.empFirstName + ' ' + emp.empLastName) like N'%{0}%'", empname);
            }
            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and rp.status = {0}", status);
            }

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT rp.*,emp.empCode");
            queryString.Append(" ,emp.empFirstName + ' ' + emp.empLastName as empName");
            queryString.Append(" , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = rp.createBy and isDeleted = 0),'') createByName");
            queryString.Append(" , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = rp.updateBy and isDeleted = 0),'') updateByName");
            queryString.Append(" FROM tbReceiverProduct rp");
            queryString.Append(" INNER JOIN tbEmpData emp");
            queryString.Append(" ON rp.empid = emp.id");
            queryString.Append(" where rp.isDeleted = 0 and emp.isDeleted = 0");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" order by rp.id desc");

            return conn.Query<ReceiverProductItemModel>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public tbReceiverProduct GetFirstByEmpCode(int empid, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbReceiverProduct rp");
            queryString.Append(" INNER JOIN tbEmpData emp");
            queryString.Append(" ON rp.empid = emp.id");
            queryString.AppendFormat(" where rp.isDeleted = 0 and emp.isDeleted = 0 and rp.empid = {0}", empid);


            return conn.QueryFirstOrDefault<tbReceiverProduct>(queryString.ToString(), new { empid }, transaction: trans);
        }

        public tbReceiverProduct GetFirstByReceiverID(int empid, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 rp.*");
            queryString.Append(" FROM tbReceiverProduct rp");
            queryString.Append(" INNER JOIN tbEmpData emp");
            queryString.Append(" ON rp.empid = emp.id");
            queryString.AppendFormat(" where rp.isDeleted = 0 and emp.isDeleted = 0 and rp.id = {0}", empid);


            return conn.QueryFirstOrDefault<tbReceiverProduct>(queryString.ToString(), new { empid }, transaction: trans);
        }

        public ReceiverProductItemModel GetFirstById(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 rp.*
                                ,emp.empFirstName + ' ' + emp.empLastName as empName
                                FROM tbReceiverProduct rp
                                INNER JOIN tbEmpData emp
                                ON rp.empid = emp.id
                                where rp.isDeleted = 0 and rp.id = @id
                                order by rp.id";

            return conn.QueryFirstOrDefault<ReceiverProductItemModel>(queryString, new { id }, transaction: trans);
        }

        public List<tbEmpData> getEmpData(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select *
                                from tbEmpData
                                where isDeleted = 0 and status = 1
                                order by id";

            return conn.Query<tbEmpData>(queryString, new { }, transaction: trans).ToList();
        }

        public tbEmpData getEmpFullName(int id,SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select *
                                from tbEmpData
                                where isDeleted = 0 and status = 1 and id = @id
                                order by id";

            return conn.QueryFirstOrDefault<tbEmpData>(queryString, new { id }, transaction: trans);
        }
    }
}

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
            queryString.Append(" empid= @empid,");
            queryString.Append(" updateDate = @updateDate,");
            queryString.Append(" updateBy = @updateBy,");
            queryString.Append(" status = @status");
            queryString.Append(" where isDeleted = 0 and id = @id");
            queryString.Append(" select @@ROWCOUNT;");

            return conn.QueryFirstOrDefault<int>(queryString.ToString(), new { obj.empid, obj.updateDate, obj.updateBy, obj.status, obj.id }, transaction: trans);
        }

        public List<tbReceiverProduct> GetAll(string empcode ,string empname, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(empcode) && empcode != "null")
            {
                condition += string.Format(" and emp.empCode like N'%{0}%'", empcode);
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
            queryString.Append(" SELECT *");
            queryString.Append(" FROM tbReceiverProduct rp");
            queryString.Append(" INNER JOIN tbEmpData emp");
            queryString.Append(" ON rp.empid = emp.id");
            queryString.Append(" where rp.isDeleted = 0 and emp.isDeleted = 0");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" order by id desc");

            return conn.Query<tbReceiverProduct>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public tbReceiverProduct GetFirstByEmpCode(int empcode, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1");
            queryString.Append(" FROM tbReceiverProduct rp");
            queryString.Append(" INNER JOIN tbEmpData emp");
            queryString.Append(" ON rp.empid = emp.id");
            queryString.AppendFormat(" where rp.isDeleted = 0 and emp.isDeleted = 0 and emp.empCode = N'{0}'", empcode);


            return conn.QueryFirstOrDefault<tbReceiverProduct>(queryString.ToString(), new { empcode }, transaction: trans);
        }

        public tbReceiverProduct GetFirstById(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 *
                                FROM [tbReceiverProduct]
                                where isDeleted = 0 and id = @id
                                order by id";

            return conn.QueryFirstOrDefault<tbReceiverProduct>(queryString, new { id }, transaction: trans);
        }
    }
}

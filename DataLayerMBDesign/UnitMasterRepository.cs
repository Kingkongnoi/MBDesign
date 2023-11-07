using Dapper;
using EntitiesMBDesign;
using System.Data.SqlClient;
using System.Text;

namespace DataLayerMBDesign
{
    public class UnitMasterRepository
    {
        public int? Add(tbUnitMaster obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbUnitMaster obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" update tbUnitMaster");
            queryString.Append(" unitname= @unitname,");
            queryString.Append(" updateDate = @updateDate,");
            queryString.Append(" updateBy = @updateBy,");
            queryString.Append(" status = @status");
            queryString.Append(" where isDeleted = 0 and id = @id");
            queryString.Append(" select @@ROWCOUNT;");

            return conn.QueryFirstOrDefault<int>(queryString.ToString(), new { obj.unitname, obj.updateDate, obj.updateBy, obj.status, obj.id }, transaction: trans);
        }

        public List<tbUnitMaster> GetAll(int id, string unitname, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (id != 0)
            {
                condition += string.Format(" and a.id = {0}", id);
            }

            if (!string.IsNullOrEmpty(unitname) && unitname != "null")
            {
                condition += string.Format(" and a.subgroupname like N'%{0}%'", unitname);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and a.status = {0}", status);
            }

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT *");
            queryString.Append(" FROM tbUnitMaster");
            queryString.Append(" where isDeleted = 0");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" order by id desc");

            return conn.Query<tbUnitMaster>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public tbUnitMaster GetFirstByName(string unitname, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1");
            queryString.Append(" FROM tbUnitMaster");
            queryString.AppendFormat(" where isDeleted = 0 and unitname = N'{0}'", unitname);


            return conn.QueryFirstOrDefault<tbUnitMaster>(queryString.ToString(), new { unitname }, transaction: trans);
        }
    }
}

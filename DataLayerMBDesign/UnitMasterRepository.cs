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
            queryString.Append(" set unitname= @unitname,");
            queryString.Append(" updateDate = @updateDate,");
            queryString.Append(" updateBy = @updateBy,");
            queryString.Append(" status = @status");
            queryString.Append(" where isDeleted = 0 and id = @id");
            queryString.Append(" select @@ROWCOUNT;");

            return conn.QueryFirstOrDefault<int>(queryString.ToString(), new { obj.unitname, obj.updateDate, obj.updateBy, obj.status, obj.id }, transaction: trans);
        }

        public List<UnitMasterItemModel> GetAll(int id, string unitname, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (id != 0)
            {
                condition += string.Format(" and a.id = {0}", id);
            }

            if (!string.IsNullOrEmpty(unitname) && unitname != "null")
            {
                condition += string.Format(" and a.unitname like N'%{0}%'", unitname);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and a.status = {0}", status);
            }

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT *");
            queryString.Append(" , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.createBy and isDeleted = 0),'') createByName");
            queryString.Append(" , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.updateBy and isDeleted = 0),'') updateByName");
            queryString.Append(" FROM tbUnitMaster a");
            queryString.Append(" where isDeleted = 0");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" order by case when a.updateDate is not null then a.updateDate else a.createDate end desc");

            return conn.Query<UnitMasterItemModel>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public tbUnitMaster GetFirstByName(string unitname, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbUnitMaster");
            queryString.AppendFormat(" where isDeleted = 0 and unitname = N'{0}'", unitname);


            return conn.QueryFirstOrDefault<tbUnitMaster>(queryString.ToString(), new { unitname }, transaction: trans);
        }

        public int GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                                if not exists(select top 1 1 from tbUnitMaster)
                                begin
	                                SELECT IDENT_CURRENT('tbUnitMaster') AS id;  
                                end
                                else
                                begin
	                                SELECT IDENT_CURRENT('tbUnitMaster') + 1 AS id;  
                                end";

            return conn.QueryFirstOrDefault<int>(queryString, transaction: trans);
        }

        public tbUnitMaster GetFirstById(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 *
                                FROM [tbUnitMaster]
                                where isDeleted = 0 and id = @id
                                order by id";

            return conn.QueryFirstOrDefault<tbUnitMaster>(queryString, new { id }, transaction: trans);
        }
    }
}

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
    public class BrandRepository
    {
        public int? Add(tbBrand obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbBrand obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" update tbBrand");
            queryString.Append(" set brandname= @brandname,");
            queryString.Append(" updateDate = @updateDate,");
            queryString.Append(" updateBy = @updateBy,");
            queryString.Append(" status = @status");
            queryString.Append(" where isDeleted = 0 and id = @id");
            queryString.Append(" select @@ROWCOUNT;");

            return conn.QueryFirstOrDefault<int>(queryString.ToString(), new { obj.brandname, obj.updateDate, obj.updateBy, obj.status, obj.id }, transaction: trans);
        }

        public List<BrandItemModel> GetAll(string brandcode, string brandname, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(brandcode) && brandcode != "null")
            {
                condition += string.Format(" and a.brandcode like N'%{0}%'", brandcode);
            }

            if (!string.IsNullOrEmpty(brandname) && brandname != "null")
            {
                condition += string.Format(" and a.brandname like N'%{0}%'", brandname);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and a.status = {0}", status);
            }

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT *");
            queryString.Append(" , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.createBy and isDeleted = 0),'') createByName");
            queryString.Append(" , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.updateBy and isDeleted = 0),'') updateByName");
            queryString.Append(" FROM tbBrand a");
            queryString.Append(" where a.isDeleted = 0");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" order by a.id desc");

            return conn.Query<BrandItemModel>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public tbBrand GetFirstByName(string brandname, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbBrand");
            queryString.AppendFormat(" where isDeleted = 0 and brandname = N'{0}'", brandname);


            return conn.QueryFirstOrDefault<tbBrand>(queryString.ToString(), new { brandname }, transaction: trans);
        }

        public int GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                                if not exists(select top 1 1 from tbBrand)
                                begin
	                                SELECT IDENT_CURRENT('tbBrand') AS id;  
                                end
                                else
                                begin
	                                SELECT IDENT_CURRENT('tbBrand') + 1 AS id;  
                                end";

            return conn.QueryFirstOrDefault<int>(queryString, transaction: trans);
        }

        public tbBrand GetFirstById(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 *
                                FROM [tbBrand]
                                where isDeleted = 0 and id = @id
                                order by id";

            return conn.QueryFirstOrDefault<tbBrand>(queryString, new { id }, transaction: trans);
        }
    }
}

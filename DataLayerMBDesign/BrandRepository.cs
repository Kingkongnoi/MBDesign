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
            queryString.Append(" brandname= @brandname,");
            queryString.Append(" updateDate = @updateDate,");
            queryString.Append(" updateBy = @updateBy,");
            queryString.Append(" status = @status");
            queryString.Append(" where isDeleted = 0 and id = @id");
            queryString.Append(" select @@ROWCOUNT;");

            return conn.QueryFirstOrDefault<int>(queryString.ToString(), new { obj.brandname, obj.updateDate, obj.updateBy, obj.status, obj.id }, transaction: trans);
        }

        public List<tbBrand> GetAll(string brandcode, string brandname, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(brandcode) && brandcode != "null")
            {
                condition += string.Format(" and a.subgroupcode like N'%{0}%'", brandcode);
            }

            if (!string.IsNullOrEmpty(brandname) && brandname != "null")
            {
                condition += string.Format(" and a.subgroupname like N'%{0}%'", brandname);
            }

            if (!string.IsNullOrEmpty(status) && status != "null")
            {
                condition += string.Format(" and a.status = {0}", status);
            }

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT *");
            queryString.Append(" FROM tbBrand");
            queryString.Append(" where isDeleted = 0");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" order by id desc");

            return conn.Query<tbBrand>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public tbBrand GetFirstByName(string brandname, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1");
            queryString.Append(" FROM tbBrand");
            queryString.AppendFormat(" where isDeleted = 0 and brandname = N'{0}'", brandname);


            return conn.QueryFirstOrDefault<tbBrand>(queryString.ToString(), new { brandname }, transaction: trans);
        }
    }
}

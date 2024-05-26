using Dapper;
using EntitiesMBDesign;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;

namespace DataLayerMBDesign
{
    public class CalculateDetailRepository
    {
        public int? Add(tbCalculateDetail obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbCalculateDetail obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbCalculateDetail
                                set productcode = @productcode,
                                glassdoortype = @glassdoortype,
                                calheigh = @calheigh,
                                calwidth = @calwidth,
                                deburringheigh = @deburringheigh,
                                deburringwidth = @deburringwidth,
                                where id = @id
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.productcode, obj.glassdoortype, obj.calheigh, obj.calwidth, obj.deburringheigh, obj.deburringwidth, obj.id }, transaction: trans);
        }

        public List<CalculateDetailItemModel> GetAll(string calculatecode,string glassdoortype,string calculatetype, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";
            //if (stockid != 0)
            //{
            //    condition += string.Format(" and a.id = {0}", stockid);
            //}

            if (!string.IsNullOrEmpty(calculatecode) && calculatecode != "null")
            {
                condition += string.Format(" and a.calculatecode like N'%{0}%'", calculatecode);
            }
            if (!string.IsNullOrEmpty(calculatetype) && calculatetype != "null")
            {
                condition += string.Format(" and a.calculatetype like N'%{0}%'", calculatetype);
            }
            if (!string.IsNullOrEmpty(glassdoortype) && glassdoortype != "null" && glassdoortype != "A")
            {
                condition += string.Format(" and b.glassdoortype like N'%{0}%'", glassdoortype);
            }

            //if (!string.IsNullOrEmpty(status) && status != "null")
            //{
            //    condition += string.Format(" and a.status = {0}", status);
            //}

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT b.id");
            queryString.Append(" ,b.calculateMasterID");
            queryString.Append(" ,b.productcode");
            queryString.Append(" ,b.glassdoortype");
            queryString.Append(" ,b.masterheigh");
            queryString.Append(" ,b.masterwidth");
            queryString.Append(" ,b.calheigh");
            queryString.Append(" ,b.calwidth");
            queryString.Append(" ,b.deburringheigh");
            queryString.Append(" ,b.deburringwidth");
            queryString.Append(" ,a.calculatecode");
            queryString.Append(" ,c.productname");
            queryString.Append(" ,a.createBy");
            queryString.Append(" ,a.updateBy");
            queryString.Append(" FROM tbCalculateMaster a");
            queryString.Append(" INNER JOIN tbCalculateDetail b on a.id = b.calculateMasterID");
            queryString.Append(" INNER JOIN tbStockProduct c on b.productcode = c.productcode");
            queryString.Append(" where a.isDeleted = 0");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" order by a.id asc");

            return conn.Query<CalculateDetailItemModel>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public List<tbCalculateMaster> GetAllMaster(string calculatecode,string calculatetype,string createdate, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";
            //if (stockid != 0)
            //{
            //    condition += string.Format(" and a.id = {0}", stockid);
            //}

            if (!string.IsNullOrEmpty(calculatecode) && calculatecode != "null")
            {
                condition += string.Format(" and a.calculatecode like N'%{0}%'", calculatecode);
            }
            if (!string.IsNullOrEmpty(calculatetype) && calculatetype != "null")
            {
                condition += string.Format(" and a.calculatetype like N'%{0}%'", calculatetype);
            }
            if (!string.IsNullOrEmpty(createdate) && createdate != "null")
            {
                condition += string.Format(" and a.createDate = '{0}'", createdate);
            }

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT a.id");
            queryString.Append(" ,a.calculatecode");
            queryString.Append(" ,a.createDate");
            queryString.Append(" ,a.createBy");
            queryString.Append(" FROM tbCalculateMaster a");
            //queryString.Append(" INNER JOIN tbCalculateDetail b on a.id = b.calculateMasterID");
            //queryString.Append(" INNER JOIN tbStockProduct c on b.productcode = c.productcode");
            queryString.Append(" where a.isDeleted = 0");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" order by a.id desc");

            return conn.Query<tbCalculateMaster>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        //public tbStock GetFirstByName(string stockname, SqlConnection conn, SqlTransaction? trans = null)
        //{
        //    StringBuilder queryString = new StringBuilder();
        //    queryString.Append(" SELECT TOP 1 *");
        //    queryString.Append(" FROM tbStock");
        //    queryString.AppendFormat(" where isDeleted = 0 and stockname = N'{0}'", stockname);

        //    return conn.QueryFirstOrDefault<tbStock>(queryString.ToString(), new { stockname }, transaction: trans);
        //}

        public tbCalculateDetail GetFirstById(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 *
                                FROM [tbCalculateDetail]
                                where  id = @id
                                order by id";

            return conn.QueryFirstOrDefault<tbCalculateDetail>(queryString, new { id }, transaction: trans);
        }

        public List<tbStockProduct> getStockProductData(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select *
                                from tbStockProduct
                                where isDeleted = 0 and status = 1
                                order by id";

            return conn.Query<tbStockProduct>(queryString, new { }, transaction: trans).ToList();
        }

        public List<tbCust> getCustListData(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select *
                                from tbCust
                                where isDeleted = 0 and status = 1
                                order by custId"
            ;

            return conn.Query<tbCust>(queryString, new { }, transaction: trans).ToList();
        }

        public List<CustDetailModel> getCustListByIDData(string id,SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder sql = new StringBuilder();
            sql.Append(" select co.installDate");
            sql.Append(" ,c.custInstallAddress");
            sql.Append(" from tbCust c");
            sql.Append(" inner join tbCustOrder co on c.custId = co.custId");
            sql.AppendFormat(" where c.isDeleted = 0 and c.status = 1 and c.custId={0}",id);
            sql.Append(" order by c.custId");

            return conn.Query<CustDetailModel>(sql.ToString(), new { }, transaction: trans).ToList();
        }

       

        //public tbStock GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        //{
        //    string queryString = @"
        //                        if not exists(select top 1 1 from tbStock)
        //                        begin
        //                         SELECT IDENT_CURRENT('tbStock') AS id;  
        //                        end
        //                        else
        //                        begin
        //                         SELECT IDENT_CURRENT('tbStock') + 1 AS id;  
        //                        end";

        //    return conn.QueryFirstOrDefault<tbStock>(queryString, transaction: trans);
        //}
    }
}

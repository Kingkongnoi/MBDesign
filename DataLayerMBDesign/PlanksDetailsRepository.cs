using Dapper;
using EntitiesMBDesign;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayerMBDesign
{
    public class PlanksDetailsRepository
    {
        public int? Add(tbPlanksDetails obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public List<PlanksDetailsItemModel> GetAll(int planksid, string status, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (planksid != 0)
            {
                condition += string.Format(" and sd.planksid = {0}", planksid);
            }

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT id");
            queryString.Append(" ,colorcode");
            queryString.Append(" ,case When thicknesstype = 1 then '18MM' when thicknesstype = 2 then '9MM' else '' end as  thicknesstypename");
            queryString.Append(" ,amount");
            queryString.Append(" ,remark");
            queryString.Append(" ,status");
            queryString.Append(" ,createBy");
            queryString.Append(" ,updateBy");
            queryString.Append(" FROM tbPlanksDetails");
            queryString.Append(" where isDeleted = 0");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" order by id desc");

            return conn.Query<PlanksDetailsItemModel>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public int DeletePlanksDetails(int id, int planksid, SqlConnection conn, SqlTransaction? trans = null)
        {
            int affectedRows = 0;
            string queryString = @"DELETE tbPlanksDetails
                                                 WHERE plankid = @planksid
                                                 AND id = @id";
            affectedRows = conn.Execute(queryString, new { planksid, id }, transaction: trans);

            return affectedRows;
        }

        public tbPlanksDetails GetFirstByID(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 a.*");
            queryString.Append(" FROM tbPlanksDetails a");

            queryString.AppendFormat(" where a.id = {0}", id);


            return conn.QueryFirstOrDefault<tbPlanksDetails>(queryString.ToString(), new { id }, transaction: trans);
        }
    }
}

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
    public class Design3DRepository
    {
        public List<tbDesign3D> GetChecklistStatus(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select checklistStatus
            from tbDesign3D
            where isDeleted = 0 and [status] = 1
            group by checklistStatus
            order by checklistStatus";

            return conn.Query<tbDesign3D>(queryString, transaction:trans).ToList();
        }
    }
}

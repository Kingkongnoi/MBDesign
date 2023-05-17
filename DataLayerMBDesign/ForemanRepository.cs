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
    public class ForemanRepository
    {
        public List<tbForeman> GetForemanStatus(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select foremanStatus
            from tbForeman
            where isDeleted = 0 and [status] = 1
            group by foremanStatus
            order by foremanStatus";

            return conn.Query<tbForeman>(queryString, transaction: trans).ToList();
        }
    }
}

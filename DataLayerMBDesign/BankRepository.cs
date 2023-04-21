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
    public class BankRepository
    {
        public List<tbBank> GetAll(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT bankId
                                ,bank
                                ,status
                                ,createDate
                                ,isDeleted
                                FROM tbBank
                                where isDeleted = 0 and status = 1
                                order by bank
                                ";

            return conn.Query<tbBank>(queryString, new { }, transaction: trans).ToList();
        }
    }
}

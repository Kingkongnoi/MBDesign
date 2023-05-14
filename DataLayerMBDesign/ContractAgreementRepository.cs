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
    public class ContractAgreementRepository
    {
        public int? Add(tbContractAgreement obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }
        public int GetLastestContractNumberByYearMonthGen(string yearMonthGen, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 isnull(contractNumberGen,0) contractNumberGen
            from tbContractAgreement
            where contractYearMonthGen = @yearMonthGen
            order by contractNumberGen desc";

            return conn.QueryFirstOrDefault<int>(queryString, new { yearMonthGen }, transaction: trans);
        }
    }
}

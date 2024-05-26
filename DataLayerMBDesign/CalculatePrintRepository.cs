using Dapper;
using EntitiesMBDesign;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;

namespace DataLayerMBDesign
{
    public class CalculatePrintRepository
    {
        public int? Add(tbCalculatePrint obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int UpdateCancle(int calculateMasterID,string logincode, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbCalculatePrint
                                set transactionActive = 'C',
                                updateDate = GETDATE(),
                                updateBy = @logincode
                                where calculateMasterID = @calculateMasterID
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { logincode, calculateMasterID }, transaction: trans);
        }

        public tbCalculatePrint getCalculatePrintByID(int calculateMasterID, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"select top 1 *
                                FROM tbCalculatePrint
                                where  calculateMasterID = @calculateMasterID and transactionActive ='A' and transactionStatus = 'A'
                                order by id";

            return conn.QueryFirstOrDefault<tbCalculatePrint>(queryString, new { calculateMasterID }, transaction: trans);
        }
    }
}

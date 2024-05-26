using Dapper;
using EntitiesMBDesign;
using System.Data.SqlClient;
using System.Text;

namespace DataLayerMBDesign
{
    public class StockManageMasterRepository
    {
        public int? Add(tbStockProductManageMaster obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbStockProductManageMaster obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbStockProductManageMaster
                                  SET status = @status
                                  ,updateDate = @updateDate
                                  ,updateBy = @updateBy       
                                   where isDeleted = 0 and id = @id
                                   select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.receiverid, obj.actiondate, obj.status, obj.updateDate, obj.updateBy, obj.id }, transaction: trans);
        }

        public int GetLastestGetInId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                               if not exists(select top 1 1 from tbStockProductManageMaster WHERE actiontype = 'I')
                               begin
                                  SELECT 1 as ID
                               end
                               else
                               begin
                                     SELECT MAX(Cast(SUBSTRING(documentcode, 3, LEN(documentcode)) as int))+1 as ID  FROM tbStockProductManageMaster WHERE actiontype='I'
                               end";

            return conn.QueryFirstOrDefault<int>(queryString, transaction: trans);
        }

        public int GetLastestWithDrawId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                               if not exists(select top 1 1 from tbStockProductManageMaster WHERE actiontype = 'O')
                               begin
                                  SELECT 1 as ID
                               end
                               else
                               begin
                                     SELECT MAX(Cast(SUBSTRING(documentcode, 2, LEN(documentcode)) as int))+1 as ID  FROM tbStockProductManageMaster WHERE actiontype='O'
                               end";

            return conn.QueryFirstOrDefault<int>(queryString, transaction: trans);
        }

        public tbStockProductManageMaster GetFirstByCodeGetin(string DocGetInCode, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbStockProductManageMaster");
            queryString.AppendFormat(" where isDeleted = 0 and documentcode = N'{0}'", DocGetInCode);

            return conn.QueryFirstOrDefault<tbStockProductManageMaster>(queryString.ToString(), new { DocGetInCode }, transaction: trans);
        }

        public ModelMasterManage GetFirstByIDGetin(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(@" SELECT TOP 1 *
                                 ,(select empFirstName + ' '+ empLastName from tbReceiverProduct rp inner join tbEmpData em on em.id = rp.empid  where rp.id= receiverid) as RecName
                                 ,(select positionName from tbReceiverProduct rp inner join tbEmpData em on em.id = rp.empid inner join tbPosition p on em.positionId = p.positionId where rp.id= receiverid) as positionName");
            queryString.Append(" FROM tbStockProductManageMaster");
            queryString.AppendFormat(" where isDeleted = 0 and id = {0}", id);

            return conn.QueryFirstOrDefault<ModelMasterManage>(queryString.ToString(), new { id }, transaction: trans);
        }
    }
}

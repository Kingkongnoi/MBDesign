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
        public List<ContractAgreementView> GetContractList(string contractNumber, string quotationNumber, string cusName, string contractStatus, string contractDate, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(contractNumber) && contractNumber != "%%")
            {
                condition += string.Format(" and a.contractNumber like N'%{0}%'", contractNumber);
            }

            if (!string.IsNullOrEmpty(quotationNumber) && quotationNumber != "%%")
            {
                condition += string.Format(" and a.quotationNumber like N'%{0}%'", quotationNumber);
            }

            if (!string.IsNullOrEmpty(cusName) && cusName != "%%")
            {
                condition += string.Format(" and (b.custFirstName + ' ' + b.custSurName) like N'%{0}%'", cusName);
            }

            if (!string.IsNullOrEmpty(contractStatus) && contractStatus != "%%")
            {
                condition += string.Format(" and a.contractStatus = N'{0}'", contractStatus);
            }

            if (!string.IsNullOrEmpty(contractDate) && contractDate != "%%")
            {
                condition += string.Format(" and  FORMAT(a.createDate, 'yyyy-MM-dd') = N'{0}'", contractDate);
            }

            string queryString = string.Format(@"SELECT a.id
            ,a.contractNumber
            ,a.quotationNumber
            ,a.contractStatus
            ,a.custId
            ,a.contractFileName
            ,a.contractNumberGen
            ,a.contractYearMonthGen
            ,a.[status]
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted
            ,b.custFirstName + ' ' + b.custSurName fullName
            FROM tbContractAgreement a inner join tbcust b on a.custId = b.custId 
            where a.isDeleted = 0 and a.status = 1 and b.isDeleted = 0 and b.status = 1
            {0}
            order by contractNumber", condition);

            return conn.Query<ContractAgreementView>(queryString,new { }, transaction: trans).ToList();
        }

        public List<tbContractAgreement> GetContractStatus(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"	select contractStatus 
			from tbContractAgreement 
			where isDeleted = 0 
			group by  contractStatus 
			order by contractStatus";

            return conn.Query<tbContractAgreement>(queryString, transaction: trans).ToList();
        }

        public int UpdateContractStatus(int orderId, string contractStatus, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"UPDATE tbContractAgreement
            SET [contractStatus] = @contractStatus
            WHERE quotationNumber = (select top 1 quotationNumber from tbCustOrder where orderId = @orderId and isDeleted = 0 and status = 1) and isDeleted = 0
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { orderId, contractStatus }, transaction: trans);
        }
        public tbContractAgreement GetFirstByOrderIdAndCustId(int custId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT TOP 1 [id]
            ,[contractNumber]
            ,[quotationNumber]
            ,[contractStatus]
            ,[custId]
            ,[contractFileName]
            ,[contractNumberGen]
            ,[contractYearMonthGen]
            ,[status]
            ,[createDate]
            ,[createBy]
            ,[updateDate]
            ,[updateBy]
            ,[isDeleted]
            FROM [tbContractAgreement]
            where [custId] = @custId and [isDeleted] = 0 and [status] = 1
            order by [id] desc";

            return conn.QueryFirstOrDefault<tbContractAgreement>(queryString, new { custId }, transaction: trans);
        }

    }
}

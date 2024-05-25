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

            if (!string.IsNullOrEmpty(contractNumber) && contractNumber != "null")
            {
                condition += string.Format(" and a.contractNumber like N'%{0}%'", contractNumber);
            }

            if (!string.IsNullOrEmpty(quotationNumber) && quotationNumber != "null")
            {
                condition += string.Format(" and a.quotationNumber like N'%{0}%'", quotationNumber);
            }

            if (!string.IsNullOrEmpty(cusName) && cusName != "null")
            {
                condition += string.Format(" and (b.custFirstName + ' ' + b.custSurName) like N'%{0}%'", cusName);
            }

            if (!string.IsNullOrEmpty(contractStatus) && contractStatus != "null")
            {
                //condition += string.Format(" and a.contractStatus = N'{0}'", contractStatus);
                condition += string.Format(" and a.contractStatusId = (select top 1 statusId from tbStatus where isDeleted = 0 and status = 1 and name = N'{0}' and categoryId = (select top 1 categoryId from tbcategory where name = N'{1}' and isdeleted = 0 and status = 1))", contractStatus, GlobalContractStatus.contractCategory);
            }

            if (!string.IsNullOrEmpty(contractDate) && contractDate != "null")
            {
                condition += string.Format(" and  FORMAT(a.createDate, 'yyyy-MM-dd') = N'{0}'", contractDate);
            }

            string queryString = string.Format(@"SELECT a.id
            ,a.contractNumber
            ,a.quotationNumber
            ,isnull((select top 1 name from tbStatus where isDeleted = 0 and status = 1 and statusId = isnull(a.contractStatusId,0)),'') contractStatus
            ,a.contractStatusId
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
            , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.createBy and isDeleted = 0),'') createByName
            , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.updateBy and isDeleted = 0),'') updateByName  
            FROM tbContractAgreement a inner join tbcust b on a.custId = b.custId 
            where a.isDeleted = 0 and a.status = 1 and b.isDeleted = 0 and b.status = 1
            {0}
            order by case when a.updateDate is not null then a.updateDate else a.createDate end desc", condition);

            return conn.Query<ContractAgreementView>(queryString,new { }, transaction: trans).ToList();
        }

        public List<ContractAgreementView> GetContractStatus(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"	select b.name contractStatus 
			from tbContractAgreement a inner join tbstatus b on a.isDeleted = 0 and b.isDeleted = 0
            inner join tbCategory c on b.categoryId = c.categoryId and c.isDeleted = 0
            where c.name = N'Contract'
			group by b.name 
			order by b.name";

            return conn.Query<ContractAgreementView>(queryString, transaction: trans).ToList();
        }

        public int UpdateContractStatus(int orderId, int contractStatusId, DateTime updateDate, string updateBy, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"UPDATE tbContractAgreement
            SET [contractStatusId] = @contractStatusId,
            updateDate = @updateDate,
            updateBy = @updateBy
            WHERE quotationNumber = (select top 1 quotationNumber from tbCustOrder where orderId = @orderId and isDeleted = 0 and status = 1) and isDeleted = 0
            select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { orderId, contractStatusId, updateDate, updateBy }, transaction: trans);
        }
        public ContractAgreementView GetFirstByOrderIdAndCustId(int custId, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT TOP 1 [id]
            ,[contractNumber]
            ,[quotationNumber]
            ,isnull((select top 1 name from tbStatus where isDeleted = 0 and status = 1 and statusId = isnull(contractStatusId,0)),'') contractStatus
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
            ,[contractStatusId]
            FROM [tbContractAgreement]
            where [custId] = @custId and [isDeleted] = 0 and [status] = 1
            order by [id] desc";

            return conn.QueryFirstOrDefault<ContractAgreementView>(queryString, new { custId }, transaction: trans);
        }

        public ContractAgreementView GetFirstByContractId(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT TOP 1 [id]
            ,[contractNumber]
            ,[quotationNumber]
            ,isnull((select top 1 name from tbStatus where isDeleted = 0 and status = 1 and statusId = isnull(contractStatusId,0)),'') contractStatus
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
            ,[contractStatusId]
            FROM [tbContractAgreement]
            where [id] = @id and [isDeleted] = 0 and [status] = 1
            order by [id] desc";

            return conn.QueryFirstOrDefault<ContractAgreementView>(queryString, new { id }, transaction: trans);
        }
    }
}

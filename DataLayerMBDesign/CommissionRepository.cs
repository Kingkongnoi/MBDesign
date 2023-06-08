﻿using Dapper;
using EntitiesMBDesign;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayerMBDesign
{
    public class CommissionRepository
    {
        public int? Add(tbCommission obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int UpdateCommission(tbCommission obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbCommission
                                set monthlySales = @monthlySales
                                ,commission = @commission
                                ,bonus = @bonus
                                ,updateDate = @updateDate
                                ,updateBy = @updateBy
                                where commissionId = @commissionId
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.monthlySales, obj.commission, obj.bonus, obj.updateDate, obj.updateBy, obj.commissionId }, transaction: trans);
        }
        public List<CommissionView> GetCommissionList(string commissionDate, string commissionStatus, string loginCode, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(commissionDate) && commissionDate != "null")
            {
                condition += string.Format(" and FORMAT(a.commissionDate, 'dd/yyyy') = N'{0}'", commissionDate);
            }

            if (!string.IsNullOrEmpty(commissionStatus) && commissionStatus != "null")
            {
                condition += string.Format(" and a.commissionStatus = N'{0}'", commissionStatus);
            }

            string queryString = string.Format(@"SELECT a.commissionId
                            ,a.commissionDate
                            ,a.monthlySales
                            ,a.commission
                            ,a.bonus
                            ,a.commissionStatus
                            ,a.saleEmpCode
                            ,a.status
                            ,a.createDate
                            ,a.createBy
                            ,a.updateDate
                            ,a.updateBy
                            ,a.isDeleted
                            , FORMAT(a.commissionDate, 'dd/yyyy') cvtCommissionDate
                            , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.saleEmpCode and isDeleted = 0),'') saleEmpName
                            FROM tbCommission a
                            where a.isDeleted = 0 and a.status = 1 and a.saleEmpCode = @loginCode
                            {0}
                            order by FORMAT(a.commissionDate, 'dd/yyyy')", condition);

            return conn.Query<CommissionView>(queryString,new { loginCode }, transaction: trans).ToList();
        }

        public CommissionView GetFirstCommissionByDate(string commissionDate, string loginCode, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT a.commissionId
                            ,a.commissionDate
                            ,a.monthlySales
                            ,a.commission
                            ,a.bonus
                            ,a.commissionStatus
                            ,a.saleEmpCode
                            ,a.status
                            ,a.createDate
                            ,a.createBy
                            ,a.updateDate
                            ,a.updateBy
                            ,a.isDeleted
                            , FORMAT(a.commissionDate, 'dd/yyyy') cvtCommissionDate
                            , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = a.saleEmpCode and isDeleted = 0),'') saleEmpName
                            FROM tbCommission a
                            where a.isDeleted = 0 and a.status = 1 and a.saleEmpCode = @loginCode
                            and FORMAT(a.commissionDate, 'dd/yyyy') = @commissionDate
                            order by FORMAT(a.commissionDate, 'dd/yyyy')";

            return conn.QueryFirstOrDefault<CommissionView>(queryString, new { commissionDate, loginCode }, transaction: trans);
        }
    }
}

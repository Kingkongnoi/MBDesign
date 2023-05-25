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
    public class ApproveRepository
    {
        public int? Add(tbApprove obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public List<ApproveView> GetApproveHistory(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"SELECT a.approveId
            ,a.orderId
            ,isnull(a.approveStatus,'') approveStatus
            ,isnull(a.approveComment,'') approveComment
            ,a.[status]
            ,a.createDate
            ,a.createBy
            ,a.updateDate
            ,a.updateBy
            ,a.isDeleted
            ,b.quotationNumber
            ,c.custFirstName + ' ' + c.custSurName cusName
            FROM tbApprove a inner join tbCustOrder b  on a.orderId = b.orderId
            inner join tbCust c on b.custId = c.custId
            where a.isDeleted = 0 and a.[status] = 1 and b.isDeleted = 0 and b.[status] = 1 and c.isDeleted = 0 and c.[status] = 1
            order by a.approveId";

            return conn.Query<ApproveView>(queryString, new { }, transaction:trans).ToList();
            
        }
    }
}
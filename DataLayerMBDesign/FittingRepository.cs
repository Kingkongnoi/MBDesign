using Dapper;
using EntitiesMBDesign;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace DataLayerMBDesign
{
    public class FittingRepository
    {
        public int? Add(tbFitting obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }
        public int? AddHinge(tbHinge obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }
        public int? AddElec(tbElectrical obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }
        public int? AddDrawerRail(tbDrawerRail obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }
        public int? AddSlideDoor(tbSlidingDoorEquipment obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }
        public int? AddEdgeLaminate(tbEdgeLaminate obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }
        public int? AddFrameTrim(tbFrameTrim obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }
        public int? AddOtherFitiing(tbOtherFitting obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            return conn.Insert(obj, transaction: trans);
        }

        public int Update(tbFitting obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbFitting
                                set minifixset = @minifixset,
                                woodendowel = @woodendowel,
                                otherdescription = @otherdescription,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                where isDeleted = 0 and fittingcode = @fittingcode
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.minifixset,obj.woodendowel,obj.otherdescription, obj.updateDate, obj.updateBy, obj.fittingcode }, transaction: trans);
        }
        public int UpdateHinge(tbHinge obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbHinge
                                set othertext = @othertext,
                                amount = @amount,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                where isDeleted = 0 and id=@id and fittingid = @fittingid and hingetype = @hingetype
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.othertext, obj.amount, obj.updateDate, obj.updateBy,obj.id, obj.fittingid,obj.hingetype }, transaction: trans);
        }
        public int UpdateElec(tbElectrical obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbElectrical
                                set color = @color,
                                amount = @amount,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                where isDeleted = 0 and id=@id and fittingid = @fittingid and electricaltype = @electricaltype
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.color, obj.amount, obj.updateDate, obj.updateBy, obj.id, obj.fittingid, obj.electricaltype }, transaction: trans);
        }
        public int UpdateDrawerRail(tbDrawerRail obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbDrawerRail
                                set pressbounceamount = @pressbounceamount,
                                amount = @amount,
                                othersize = @othersize,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                where isDeleted = 0 and id=@id and fittingid = @fittingid and drawerrailtype = @drawerrailtype
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.pressbounceamount, obj.amount,obj.othersize, obj.updateDate, obj.updateBy, obj.id, obj.fittingid, obj.drawerrailtype }, transaction: trans);
        }
        public int UpdateSlideDoor(tbSlidingDoorEquipment obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbSlidingDoorEquipment
                                set length = @length,
                                amount = @amount,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                where isDeleted = 0 and id=@id and fittingid = @fittingid and slidingdoortype = @slidingdoortype
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.length, obj.amount, obj.updateDate, obj.updateBy, obj.id, obj.fittingid, obj.slidingdoortype }, transaction: trans);
        }
        public int UpdateEdgeLaminate(tbEdgeLaminate obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbEdgeLaminate
                                set color = @color,
                                amount = @amount,
                                seqno = @seqno,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                where isDeleted = 0 and id=@id and fittingid = @fittingid and edgelaminatetype = @edgelaminatetype
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.color, obj.amount,obj.seqno, obj.updateDate, obj.updateBy, obj.id, obj.fittingid, obj.edgelaminatetype }, transaction: trans);
        }
        public int UpdateFrameTrim(tbFrameTrim obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbFrameTrim
                                set color = @color,
                                amount = @amount,
                                seqno = @seqno,
                                size = @size,
                                number = @number,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                where isDeleted = 0 and id=@id and fittingid = @fittingid and frametrimtype = @frametrimtype
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.color, obj.amount, obj.seqno,obj.size,obj.number, obj.updateDate, obj.updateBy, obj.id, obj.fittingid, obj.frametrimtype }, transaction: trans);
        }
        public int UpdateOtherFitiing(tbOtherFitting obj, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"update tbOtherFitting
                                set color = @color,
                                amount = @amount,
                                size = @size,
                                updateDate = @updateDate,
                                updateBy = @updateBy,
                                where isDeleted = 0 and id=@id and fittingid = @fittingid and otherfittingtype = @otherfittingtype
                                select @@ROWCOUNT;";

            return conn.QueryFirstOrDefault<int>(queryString, new { obj.color, obj.amount, obj.size, obj.updateDate, obj.updateBy, obj.id, obj.fittingid, obj.otherfittingtype }, transaction: trans);
        }

        public int GetLastestId(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = @"
                                if not exists(select top 1 1 from tbFitting)
                                begin
	                                SELECT IDENT_CURRENT('tbFitting') AS id;  
                                end
                                else
                                begin
	                                SELECT IDENT_CURRENT('tbFitting') + 1 AS id;  
                                end";

            return conn.QueryFirstOrDefault<int>(queryString, transaction: trans);
        }

        public tbFitting GetFirstByID(string fittingcode, SqlConnection conn, SqlTransaction? trans = null)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT TOP 1 *");
            queryString.Append(" FROM tbFitting");
            queryString.AppendFormat(" where isDeleted = 0 and fittingcode = '{0}'", fittingcode);

            return conn.QueryFirstOrDefault<tbFitting>(queryString.ToString(), new { fittingcode }, transaction: trans);
        }
        //public int Update(tbFitting obj, SqlConnection conn, SqlTransaction? trans = null)
        //{
        //    string queryString = @"update tbCalculateMaster
        //                        set updateDate = @updateDate,
        //                        updateBy = @updateBy
        //                        where isDeleted = 0 and id = @id
        //                        select @@ROWCOUNT;";

        //    return conn.QueryFirstOrDefault<int>(queryString, new { obj.calculatecode, obj.updateDate, obj.updateBy, obj.id }, transaction: trans);
        //}

        public List<tbCalculateMaster> GetAll(string FittingCode, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";
    

            if (!string.IsNullOrEmpty(FittingCode) && FittingCode != "null")
            {
                condition += string.Format(" and a.fittingcode like N'%{0}%'", FittingCode);
            }

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" SELECT a.*");
            queryString.Append(" FROM tbFitting a");
            queryString.Append(" where isDeleted = 0");
            queryString.AppendFormat(" {0}", condition);
            queryString.Append(" order by id desc");

            return conn.Query<tbCalculateMaster>(queryString.ToString(), new { }, transaction: trans).ToList();
        }

        public List<listQuotationNumber> GetListQuotationNumbersFitting(SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@"select co.orderId,co.quotationNumber from tbCustOrder co
                                    inner join tbDesign3D d on co.orderId = d.orderId
                                    inner join tbSpec s on s.orderid = co.orderId
									inner join tbSpecListDetail sd on s.id = sd.specid
                                   where co.status = 1 and d.checklistStatusId =14  and d.orderId not in (select isnull(orderid,'') from tbFitting  where ISNULL(isDeleted,0) = 0)
                                   and sd.checkliststatus = 5
								   AND sd.transactionActive='A' and sd.transactionStatus = 'A'
                                  ");

            return conn.Query<listQuotationNumber>(queryString, transaction: trans).ToList();
        }

        public int getSpecID(int orderID, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@"
                                select s.id from tbSpec s
                                inner join tbCustOrder co on s.orderid = co.orderid
                                where s.status =1 and co.orderid = {0}", orderID);

            return conn.QueryFirstOrDefault<int>(queryString, new { orderID }, transaction: trans);
        }

        public string getNameByOrderID(int orderID, SqlConnection conn, SqlTransaction? trans = null)
        {
            string queryString = string.Format(@"
                                select c.custFirstName + ' ' +c.custSurName as Fullname
                                from tbCustOrder co  
                                inner join tbCust c on co.custId = c.custId
                                where co.status =1 and co.isDeleted = 0
                                and co.orderId = {0}", orderID);

            return conn.QueryFirstOrDefault<string>(queryString, new { orderID }, transaction: trans);
        }

        public List<FittingListModel> GetAll(string FittingCode, string quotation, SqlConnection conn, SqlTransaction? trans = null)
        {
            string condition = @"";

            if (!string.IsNullOrEmpty(FittingCode) && FittingCode != "null")
            {
                condition += string.Format(" and f.fittingcode like N'%{0}%'", FittingCode);
            }

            if (!string.IsNullOrEmpty(quotation) && quotation != "null")
            {
                condition += string.Format(" and co.quotationNumber like N'%{0}%'", quotation);
            }

            string queryString = string.Format(@"select co.orderId
	                                            ,f.fittingcode
	                                            ,co.quotationNumber
	                                            ,c.custFirstName + ' ' + c.custSurName as fullname
	                                            ,c.custTel
	                                            , isnull((select top 1 empFirstName + ' ' + empLastName from tbEmpData where empCode = f.createBy and isDeleted = 0),'') createby
                                                from tbFitting f
                                                inner join tbCustOrder co on co.orderId = f.orderid
                                                inner join tbCust c on c.custId = co.custId
                                                where ISNULL(co.isDeleted,0) = 0
                                                {0}
                                              ",condition);
            return conn.Query<FittingListModel>(queryString.ToString(), new { }, transaction: trans).OrderBy(o => o.id).ToList();
        }

        public EditFittingItemModel getFittingByID(int id, SqlConnection conn, SqlTransaction? trans = null)
        {
            EditFittingItemModel _result = new EditFittingItemModel();
            string queryString = string.Format(@"select *
                                                FROM tbFitting 
                                                where id = {0} and ISNULL(isDeleted,0) =0 
                                              ", id);
            tbFitting fitting = conn.QueryFirstOrDefault<tbFitting>(queryString, transaction: trans);
            if (fitting != null) 
            {
                _result.id = fitting.id;
                _result.orderid = fitting.orderid;
                _result.fittingcode = fitting.fittingcode;
                _result.minifixset = fitting.minifixset;
                _result.woodendowel =  fitting.woodendowel;
                _result.otherdescription = fitting.otherdescription;

                queryString = string.Format(@"select *
                                                FROM tbHinge 
                                                where fittingid = {0} and ISNULL(isDeleted,0) =0 
                                              ", _result.id);
                List<tbHinge> hinge = conn.Query<tbHinge>(queryString, transaction: trans).ToList();

                queryString = string.Format(@"select *
                                                FROM tbSlidingDoorEquipment 
                                                where fittingid = {0} and ISNULL(isDeleted,0) =0 
                                              ", _result.id);
                List<tbSlidingDoorEquipment> slidingDoorEquipment = conn.Query<tbSlidingDoorEquipment>(queryString, transaction: trans).ToList();

                queryString = string.Format(@"select *
                                                FROM tbElectrical 
                                                where fittingid = {0} and ISNULL(isDeleted,0) =0 
                                              ", _result.id);
                List<tbElectrical> electricals = conn.Query<tbElectrical>(queryString, transaction: trans).ToList();

                queryString = string.Format(@"select *
                                                FROM tbDrawerRail 
                                                where fittingid = {0} and ISNULL(isDeleted,0) =0 
                                              ", _result.id);
                List<tbDrawerRail> drawerRails = conn.Query<tbDrawerRail>(queryString, transaction: trans).ToList();

                queryString = string.Format(@"select *
                                                FROM tbOtherFitting 
                                                where fittingid = {0} and ISNULL(isDeleted,0) =0 
                                              ", _result.id);
                List<tbOtherFitting> otherFittings = conn.Query<tbOtherFitting>(queryString, transaction: trans).ToList();

                queryString = string.Format(@"select *
                                                FROM tbEdgeLaminate 
                                                where fittingid = {0} and ISNULL(isDeleted,0) =0 
                                              ", _result.id);
                List<tbEdgeLaminate> edgeLaminates = conn.Query<tbEdgeLaminate>(queryString, transaction: trans).ToList();

                queryString = string.Format(@"select *
                                                FROM tbFrameTrim 
                                                where fittingid = {0} and ISNULL(isDeleted,0) =0 
                                              ", _result.id);
                List<tbFrameTrim> frameTrims = conn.Query<tbFrameTrim>(queryString, transaction: trans).ToList();

                _result.Hinge = hinge;
                _result.SlideDoor = slidingDoorEquipment;
                _result.Electrical = electricals;
                _result.DrawerRail = drawerRails;
                _result.OtherFitting = otherFittings;
                _result.EdgeLaminate = edgeLaminates;
                _result.FrameTrim = frameTrims;
            }
            return _result;
        }
    }
}

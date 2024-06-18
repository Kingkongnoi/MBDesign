using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace BusinessLogicMBDesign.Spec
{
    public class FittingService
    {
        private readonly FittingRepository _fittingRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public FittingService(IConfiguration configuration)
        {
            _fittingRepository = new FittingRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public int? AddFittingItem(AddFittingItemModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _fittingRepository.GetFirstByID(model.fittingcode, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbFitting
                    {
                        fittingcode = model.fittingcode,
                        orderid = model.orderid,
                        minifixset = model.minifixset,
                        woodendowel = model.woodendowel,
                        otherdescription = model.otherdescription,
                        status = true,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _fittingRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();

                    AddHinge(model, added);
                    AddElec(model, added);
                    AddDrawerRail(model, added);
                    AddSlidingDoor(model, added);
                    AddOtherFitting(model, added);
                    AddEdgeLaminate(model, added);
                    AddFrameTrim(model, added);
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int? UpdateFittingItem(AddFittingItemModel model)
        {
            int? update = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _fittingRepository.GetFirstByID(model.fittingcode, conn, transaction);
                if (exists == null) { return -1; }

                try
                {
                    var addedObject = new tbFitting
                    {
                        fittingcode = model.fittingcode,
                        minifixset = model.minifixset,
                        woodendowel = model.woodendowel,
                        otherdescription = model.otherdescription,
                        status = true,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    update = _fittingRepository.Update(addedObject, conn, transaction);
                    transaction.Commit();

                    UpdateHinge(model, update);
                    UpdateElec(model, update);
                    UpdateDrawerRail(model, update);
                    UpdateSlidingDoor(model, update);
                    UpdateOtherFitting(model, update);
                    UpdateEdgeLaminate(model, update);
                    UpdateFrameTrim(model, update);
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return update;
        }

        public int? AddHinge(AddFittingItemModel model, int? fittingid)
        {
            int? added = 0;
            if (fittingid.HasValue)
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    SqlTransaction transaction = conn.BeginTransaction();

                    //var exists = _fittingRepository.GetFirstByID(model.fittingcode, conn, transaction);
                    //if (exists != null) { return -1; }

                    try
                    {
                        foreach (var item in model.Hinge)
                        {
                            var addedObject = new tbHinge
                            {
                                hingetype = item.hingetype,
                                fittingid = fittingid.Value,
                                amount = item.amount,
                                othertext = item.othertext,
                                status = true,
                                createDate = DateTime.UtcNow,
                                createBy = model.loginCode
                            };
                            added = _fittingRepository.AddHinge(addedObject, conn, transaction);

                        }
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                    }
                }
            }
            return added;
        }
        public int? UpdateHinge(AddFittingItemModel model, int? fittingid)
        {
            int? updated = 0;
            if (fittingid.HasValue)
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    SqlTransaction transaction = conn.BeginTransaction();

                    //var exists = _fittingRepository.GetFirstByID(model.fittingcode, conn, transaction);
                    //if (exists != null) { return -1; }

                    try
                    {
                        foreach (var item in model.Hinge)
                        {
                            var addedObject = new tbHinge
                            {
                                fittingid = model.id,
                                hingetype = item.hingetype,
                                amount = item.amount,
                                othertext = item.othertext,
                                status = true,
                                updateDate = DateTime.UtcNow,
                                updateBy = model.loginCode
                            };
                            updated = _fittingRepository.UpdateHinge(addedObject, conn, transaction);

                        }
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                    }
                }
            }
            return updated;
        }
        public int? AddElec(AddFittingItemModel model, int? fittingid)
        {
            int? added = 0;
            if (fittingid.HasValue)
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    SqlTransaction transaction = conn.BeginTransaction();

                    //var exists = _fittingRepository.GetFirstByID(model.fittingcode, conn, transaction);
                    //if (exists != null) { return -1; }

                    try
                    {
                        foreach (var item in model.Electrical)
                        {
                            var addedObject = new tbElectrical
                            {
                                electricaltype = item.electricaltype,
                                fittingid = fittingid.Value,
                                amount = item.amount,
                                color = item.color,
                                status = true,
                                createDate = DateTime.UtcNow,
                                createBy = model.loginCode
                            };
                            added = _fittingRepository.AddElec(addedObject, conn, transaction);

                        }
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                    }
                }
            }
            return added;
        }
        public int? UpdateElec(AddFittingItemModel model, int? fittingid)
        {
            int? updated = 0;
            if (fittingid.HasValue)
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    SqlTransaction transaction = conn.BeginTransaction();

                    //var exists = _fittingRepository.GetFirstByID(model.fittingcode, conn, transaction);
                    //if (exists != null) { return -1; }

                    try
                    {
                        foreach (var item in model.Electrical)
                        {
                            var addedObject = new tbElectrical
                            {
                                fittingid = model.id,
                                electricaltype = item.electricaltype,
                                amount = item.amount,
                                color = item.color,
                                status = true,
                                updateDate = DateTime.UtcNow,
                                updateBy = model.loginCode
                            };
                            updated = _fittingRepository.UpdateElec(addedObject, conn, transaction);

                        }
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                    }
                }
            }
            return updated;
        }
        public int? AddDrawerRail(AddFittingItemModel model, int? fittingid)
        {
            int? added = 0;
            if (fittingid.HasValue)
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    SqlTransaction transaction = conn.BeginTransaction();

                    //var exists = _fittingRepository.GetFirstByID(model.fittingcode, conn, transaction);
                    //if (exists != null) { return -1; }

                    try
                    {
                        foreach (var item in model.DrawerRail)
                        {
                            var addedObject = new tbDrawerRail
                            {
                                drawerrailtype = item.drawerrailtype,
                                pressbounceamount = item.pressbounceamount,
                                fittingid = fittingid.Value,
                                amount = item.amount,
                                othersize = item.othersize,
                                status = true,
                                createDate = DateTime.UtcNow,
                                createBy = model.loginCode
                            };
                            added = _fittingRepository.AddDrawerRail(addedObject, conn, transaction);

                        }
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                    }
                }
            }
            return added;
        }
        public int? UpdateDrawerRail(AddFittingItemModel model, int? fittingid)
        {
            int? updated = 0;
            if (fittingid.HasValue)
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    SqlTransaction transaction = conn.BeginTransaction();

                    //var exists = _fittingRepository.GetFirstByID(model.fittingcode, conn, transaction);
                    //if (exists != null) { return -1; }

                    try
                    {
                        foreach (var item in model.DrawerRail)
                        {
                            var addedObject = new tbDrawerRail
                            {
                                fittingid = model.id,
                                pressbounceamount = item.pressbounceamount,
                                amount = item.amount,
                                drawerrailtype = item.drawerrailtype,
                                othersize = item.othersize,
                                status = true,
                                updateDate = DateTime.UtcNow,
                                updateBy = model.loginCode
                            };
                            updated = _fittingRepository.UpdateDrawerRail(addedObject, conn, transaction);

                        }
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                    }
                }
            }
            return updated;
        }
        public int? AddSlidingDoor(AddFittingItemModel model, int? fittingid)
        {
            int? added = 0;
            if (fittingid.HasValue)
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    SqlTransaction transaction = conn.BeginTransaction();

                    //var exists = _fittingRepository.GetFirstByID(model.fittingcode, conn, transaction);
                    //if (exists != null) { return -1; }

                    try
                    {
                        foreach (var item in model.SlideDoor)
                        {
                            var addedObject = new tbSlidingDoorEquipment
                            {
                                slidingdoortype = item.slidingdoortype,
                                fittingid = fittingid.Value,
                                amount = item.amount,
                                length = item.length,
                                status = true,
                                createDate = DateTime.UtcNow,
                                createBy = model.loginCode
                            };
                            added = _fittingRepository.AddSlideDoor(addedObject, conn, transaction);

                        }
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                    }
                }
            }
            return added;
        }
        public int? UpdateSlidingDoor(AddFittingItemModel model, int? fittingid)
        {
            int? updated = 0;
            if (fittingid.HasValue)
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    SqlTransaction transaction = conn.BeginTransaction();

                    //var exists = _fittingRepository.GetFirstByID(model.fittingcode, conn, transaction);
                    //if (exists != null) { return -1; }

                    try
                    {
                        foreach (var item in model.SlideDoor)
                        {
                            var addedObject = new tbSlidingDoorEquipment
                            {
                                fittingid = model.id,
                                slidingdoortype = item.slidingdoortype,
                                amount = item.amount,
                                length = item.length,
                                status = true,
                                updateDate = DateTime.UtcNow,
                                updateBy = model.loginCode
                            };
                            updated = _fittingRepository.UpdateSlideDoor(addedObject, conn, transaction);

                        }
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                    }
                }
            }
            return updated;
        }
        public int? AddOtherFitting(AddFittingItemModel model, int? fittingid)
        {
            int? added = 0;
            if (fittingid.HasValue)
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    SqlTransaction transaction = conn.BeginTransaction();

                    //var exists = _fittingRepository.GetFirstByID(model.fittingcode, conn, transaction);
                    //if (exists != null) { return -1; }

                    try
                    {
                        foreach (var item in model.OtherFitting)
                        {
                            var addedObject = new tbOtherFitting
                            {
                                otherfittingtype = item.otherfittingtype,
                                fittingid = fittingid.Value,
                                amount = item.amount,
                                color = item.color,
                                size = item.size,
                                status = true,
                                createDate = DateTime.UtcNow,
                                createBy = model.loginCode
                            };
                            added = _fittingRepository.AddOtherFitiing(addedObject, conn, transaction);

                        }
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                    }
                }
            }
            return added;
        }
        public int? UpdateOtherFitting(AddFittingItemModel model, int? fittingid)
        {
            int? updated = 0;
            if (fittingid.HasValue)
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    SqlTransaction transaction = conn.BeginTransaction();

                    //var exists = _fittingRepository.GetFirstByID(model.fittingcode, conn, transaction);
                    //if (exists != null) { return -1; }

                    try
                    {
                        foreach (var item in model.OtherFitting)
                        {
                            var addedObject = new tbOtherFitting
                            {
                                fittingid = model.id,
                                otherfittingtype = item.otherfittingtype,
                                amount = item.amount,
                                color = item.color,
                                size = item.size,
                                status = true,
                                updateDate = DateTime.UtcNow,
                                updateBy = model.loginCode
                            };
                            updated = _fittingRepository.UpdateOtherFitiing(addedObject, conn, transaction);

                        }
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                    }
                }
            }
            return updated;
        }
        public int? AddEdgeLaminate(AddFittingItemModel model, int? fittingid)
        {
            int? added = 0;
            if (fittingid.HasValue)
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    SqlTransaction transaction = conn.BeginTransaction();

                    //var exists = _fittingRepository.GetFirstByID(model.fittingcode, conn, transaction);
                    //if (exists != null) { return -1; }

                    try
                    {
                        foreach (var item in model.EdgeLaminate)
                        {
                            var addedObject = new tbEdgeLaminate
                            {
                                edgelaminatetype = item.edgelaminatetype,
                                seqno = item.seqno,
                                color = item.color,
                                fittingid = fittingid.Value,
                                amount = item.amount,
                                status = true,
                                createDate = DateTime.UtcNow,
                                createBy = model.loginCode
                            };
                            added = _fittingRepository.AddEdgeLaminate(addedObject, conn, transaction);

                        }
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                    }
                }
            }
            return added;
        }
        public int? UpdateEdgeLaminate(AddFittingItemModel model, int? fittingid)
        {
            int? updated = 0;
            if (fittingid.HasValue)
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    SqlTransaction transaction = conn.BeginTransaction();

                    //var exists = _fittingRepository.GetFirstByID(model.fittingcode, conn, transaction);
                    //if (exists != null) { return -1; }

                    try
                    {
                        foreach (var item in model.EdgeLaminate)
                        {
                            var addedObject = new tbEdgeLaminate
                            {
                               fittingid = model.id,
                               edgelaminatetype=item.edgelaminatetype,
                                seqno = item.seqno,
                                color = item.color,
                                amount = item.amount,
                                status = true,
                                updateDate = DateTime.UtcNow,
                                updateBy = model.loginCode
                            };
                            updated = _fittingRepository.UpdateEdgeLaminate(addedObject, conn, transaction);

                        }
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                    }
                }
            }
            return updated;
        }
        public int? AddFrameTrim(AddFittingItemModel model, int? fittingid)
        {
            int? added = 0;
            if (fittingid.HasValue)
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    SqlTransaction transaction = conn.BeginTransaction();

                    //var exists = _fittingRepository.GetFirstByID(model.fittingcode, conn, transaction);
                    //if (exists != null) { return -1; }

                    try
                    {
                        foreach (var item in model.FrameTrim)
                        {
                            var addedObject = new tbFrameTrim
                            {
                                frametrimtype = item.frametrimtype,
                                size = item.size,
                                number = item.number,
                                seqno = item.seqno,
                                color = item.color,
                                fittingid = fittingid.Value,
                                amount = item.amount,
                                status = true,
                                createDate = DateTime.UtcNow,
                                createBy = model.loginCode
                            };
                            added = _fittingRepository.AddFrameTrim(addedObject, conn, transaction);

                        }
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                    }
                }
            }
            return added;
        }
        public int? UpdateFrameTrim(AddFittingItemModel model, int? fittingid)
        {
            int? updated = 0;
            if (fittingid.HasValue)
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    SqlTransaction transaction = conn.BeginTransaction();

                    //var exists = _fittingRepository.GetFirstByID(model.fittingcode, conn, transaction);
                    //if (exists != null) { return -1; }

                    try
                    {
                        foreach (var item in model.FrameTrim)
                        {
                            var addedObject = new tbFrameTrim
                            {
                               fittingid = model.id,
                               frametrimtype = item.frametrimtype,
                                size = item.size,
                                number = item.number,
                                seqno = item.seqno,
                                color = item.color,
                                amount = item.amount,
                                status = true,
                                createDate = DateTime.UtcNow,
                                createBy = model.loginCode
                            };
                            updated = _fittingRepository.UpdateFrameTrim(addedObject, conn, transaction);

                        }
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                    }
                }
            }
            return updated;
        }
        public List<FittingListModel> GetFittingList(string fittingcode, string quatationcode)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _fittingRepository.GetAll(fittingcode, quatationcode, conn);
            }
        }

        public List<listQuotationNumber> GetListQuotationNumbersFitting()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _fittingRepository.GetListQuotationNumbersFitting(conn);
            }
        }

        public EditFittingItemModel getFittingByID(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _fittingRepository.getFittingByID(id, conn);
            }
        }

        public int GetSpecIDByOrderID(int orderID)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _fittingRepository.getSpecID(orderID, conn);
            }
        }

        public string getNameByOrderID(int orderID)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _fittingRepository.getNameByOrderID(orderID, conn);
            }
        }

        public string GetFirstLastestItemId()
        {
            string stockproductcode = string.Empty;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                int getID = _fittingRepository.GetLastestId(conn);
                if (getID > 0)
                {
                    stockproductcode = string.Format("FIT{0:D4}", getID);
                }
                else
                {
                    stockproductcode = string.Format("FIT{0:D4}", 1);
                }
                return stockproductcode;
            }
        }
    }
}
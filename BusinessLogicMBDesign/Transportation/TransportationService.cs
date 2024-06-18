using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicMBDesign.Transportation
{
    public class TransportationService
    {
        private readonly TransportationRepository _transportationRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public TransportationService(IConfiguration configuration)
        {
            _transportationRepository = new TransportationRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public int? AddTPItem(TPAddItemModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _transportationRepository.GetFirstByID(model.id, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbTransportationCheckList
                    {
                        orderid = model.orderid,
                        specid = model.specid,
                        fittingid = model.fittingid,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _transportationRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int? AddTPDetailItem(TPListDetailItemModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _transportationRepository.GetFirstDetailByID(model.id, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbTransportationCheckListDetail
                    {
                        transportationchecklistid = model.transportationchecklistid,
                        empid = model.empid,
                        checkliststatus = model.checkliststatus,
                        transactionActive = model.transactionActive,
                        transactionStatus = model.transactionStatus,
                        isApprove = model.isApprove,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _transportationRepository.AddDetail(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public List<TPListModel> GetTPList(string quotationcod)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _transportationRepository.GetAll(quotationcod, conn);
            }
        }
        public List<tbMasterCheckListTransportation> getMasterCheckListTP()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _transportationRepository.getCheckListTP(conn);
            }
        }

        public List<TPListModel> GetListTPListByID(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _transportationRepository.GetAllTPListByID(id, conn);
            }
        }

        public List<EmpDataView> GetNameSelectTP()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _transportationRepository.GetDataSelectTP(conn);
            }
        }

        public int? UpdateTPList(TPListDetailUpdateItemModel model)
        {
            int? updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();
                string[] liststatus = model.listStatus.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                foreach (string status in liststatus)
                {
                    var exists = _transportationRepository.GetTPBySpecIDStatus(model.id, Convert.ToInt32(status), conn, transaction);
                    if (exists == null)
                    {
                        try
                        {
                            var addedObject = new tbTransportationCheckListDetail
                            {
                                transportationchecklistid = model.id,
                                empid = model.empid,
                                checkliststatus = Convert.ToInt32(status),
                                transactionActive = "A",
                                transactionStatus = "A",
                                isApprove = true,
                                createDate = DateTime.UtcNow,
                                createBy = model.loginCode
                            };
                            updated = _transportationRepository.AddDetail(addedObject, conn, transaction);
                            transaction.Commit();
                        }
                        catch (Exception ex)
                        {
                            transaction.Rollback();
                        }
                    }

                }

            }
            return updated;
        }

        public int UpdateTPItem(TPAddItemModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _transportationRepository.GetFirstByID(model.id, conn, transaction);
                if (exists != null) { if (exists.id != model.id) { return -1; } }

                try
                {
                    var updatedObject = new tbTransportationCheckList();

                    updatedObject = new tbTransportationCheckList
                    {
                        id = model.id,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.updateBy
                    };


                    updated = _transportationRepository.Update(updatedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
            return updated;
        }

        public int getTPIDByOrderID(int orderid)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _transportationRepository.GetIDByOrderID(orderid, conn);
            }
            
        }
    }
}

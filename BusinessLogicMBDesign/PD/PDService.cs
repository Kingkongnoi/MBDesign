using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilitiesMBDesign;
using static NPOI.SS.Format.CellNumberFormatter;

namespace BusinessLogicMBDesign.PD
{
    public class PDService
    {
        private readonly PDRepository _pdRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public PDService(IConfiguration configuration)
        {
            _pdRepository = new PDRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public int? AddPDItem(PDAddItemModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _pdRepository.GetFirstByID(model.id, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbProductionChecklist
                    {
                        orderid = model.orderid,
                        specid = model.specid,
                        fittingid = model.fittingid,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _pdRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int? AddPDDetailItem(PDListDetailItemModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _pdRepository.GetFirstDetailByID(model.id, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbProductionCheckListDetail
                    {
                        productchecklistid = model.productchecklistid,
                        empid = model.empid,
                        checkliststatus = model.checkliststatus,
                        transactionActive = model.transactionActive,
                        transactionStatus = model.transactionStatus,
                        isApprove = model.isApprove,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _pdRepository.AddDetail(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public List<PDListModel> GetPDList(string quotationcod)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _pdRepository.GetAll(quotationcod, conn);
            }
        }
        public List<tbMasterCheckListProduction> getMasterCheckListPD()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _pdRepository.getCheckListPD(conn);
            }
        }

        public List<PDListModel> GetListPDListByID(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _pdRepository.GetAllPDListByID(id, conn);
            }
        }

        public int? UpdatePDList(PDListDetailUpdateItemModel model)
        {
            int? updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();
                string[] liststatus = model.listStatus.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                foreach (string status in liststatus)
                {
                    var exists = _pdRepository.GetPDBySpecIDStatus(model.id, Convert.ToInt32(status), conn, transaction);
                    if (exists == null)
                    {
                        try
                        {
                            var addedObject = new tbProductionCheckListDetail
                            {
                                productchecklistid = model.id,
                                empid = model.empid,
                                checkliststatus = Convert.ToInt32(status),
                                transactionActive = "A",
                                transactionStatus = "A",
                                isApprove = true,
                                createDate = DateTime.UtcNow,
                                createBy = model.loginCode
                            };
                            updated = _pdRepository.AddDetail(addedObject, conn, transaction);
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

        public int UpdatePDItem(PDAddItemModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _pdRepository.GetFirstByID(model.id, conn, transaction);
                if (exists != null) { if (exists.id != model.id) { return -1; } }

                try
                {
                    var updatedObject = new tbProductionChecklist();

                    updatedObject = new tbProductionChecklist
                    {
                        id = model.id,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.updateBy
                    };


                    updated = _pdRepository.Update(updatedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
            return updated;
        }

        public List<EmpDataView> GetNameSelectPD()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _pdRepository.GetDataSelectPD(conn);
            }
        }
    }
}

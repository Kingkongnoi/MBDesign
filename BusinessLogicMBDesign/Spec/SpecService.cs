using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicMBDesign.Spec
{
    public class SpecService
    {
        private readonly SpecRepository _specRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public SpecService(IConfiguration configuration)
        {
            _specRepository = new SpecRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public int? AddSpecItem(specItemModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _specRepository.GetFirstByID(model.id, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbSpec
                    {
                        orderid = model.orderid,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _specRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateSpecItem(specItemModel model,int stautsid)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _specRepository.GetFirstByID(model.id, conn, transaction);
                if (exists != null) { if (exists.id != model.id) { return -1; } }

                try
                {
                    var updatedObject = new tbSpec();
                    if (stautsid == 4)
                    {
                        updatedObject = new tbSpec
                        {
                            id = model.id,
                            updateDate = DateTime.UtcNow,
                            updateBy = model.updateBy,
                            approveBy = model.approveBy,
                            approveDate = model.approveDate
                        };
                    }
                    else
                    {
                        updatedObject = new tbSpec
                        {
                            id = model.id,
                            updateDate = DateTime.UtcNow,
                            updateBy = model.updateBy
                        };
                    }
                  
                    updated = _specRepository.Update(updatedObject,stautsid, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
            return updated;
        }

        public List<specListModel> GetSpecList(string quotationcod,string empName, int checkListStatus,string installDate)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _specRepository.GetAll(quotationcod,empName,checkListStatus,installDate, conn);
            }
        }

        public specListModel GetSpecListByID(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _specRepository.GetSpecListByID(id, conn);
            }
        }

        public List<specListModel> GetListSpecListByID(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _specRepository.GetAllSpecListByID(id, conn);
            }
        }
        

        public specNewListModel getNewSpecByQuotationID(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _specRepository.getNewSpecByQuotationID(id, conn);
            }
        }

        public List<listQuotationNumber> GetListQuotationNumbers()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _specRepository.GetListQuotationNumbers(conn);
            }
        }

        public List<listQuotationNumber> GetListQuotationNumbersPlanks()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _specRepository.GetListQuotationNumbersPlanks(conn);
            }
        }

        public List<tbMasterCheckListSpec> getMasterCheckList()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _specRepository.getCheckList(conn);
            }
        }

        public Design3DView Get3DQueueCustOrderByOrderId(int orderId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _specRepository.GetEditDesign3DByOrderId(orderId, conn);
            }
        }

        public List<UploadView> GetUploadRefByOrderId(int orderId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _specRepository.GetUploadByOrderId(orderId, conn);
            }
        }
    }
}

using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicMBDesign.Master
{
    public class StockManageMasterService
    {
        private readonly StockManageMasterRepository _stockmanageMasterRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public StockManageMasterService(IConfiguration configuration)
        {
            _stockmanageMasterRepository = new StockManageMasterRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }
        public string GetFirstLastestGetinItemId()
        {
            string stockproductcode = string.Empty;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {

                conn.Open();

                int getID = _stockmanageMasterRepository.GetLastestGetInId(conn);
                if (getID > 0)
                {
                    stockproductcode = string.Format("IN{0:D6}", getID);
                }
                return stockproductcode;
            }

        }

        public string GetLastestWithDrawItemId()
        {
            string stockproductcode = string.Empty;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {

                conn.Open();

                int getID = _stockmanageMasterRepository.GetLastestWithDrawId(conn);
                if (getID > 0)
                {
                    stockproductcode = string.Format("OUT{0:D6}", getID);
                }
                return stockproductcode;
            }
        }

        public int? AddItem(StockManageAddModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _stockmanageMasterRepository.GetFirstByCodeGetin(model.documentcode, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbStockProductManageMaster
                    {
                        documentcode = model.documentcode,

                        receiverid = model.receiverid,
                        actiontype = model.actiontype,
                        actiondate = Convert.ToDateTime(model.actiondate),

                        status = model.status,

                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _stockmanageMasterRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }
        public int UpdateStockProductManageMasterItem(StockManageAddModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _stockmanageMasterRepository.GetFirstByCodeGetin(model.documentcode, conn, transaction);
                if (exists != null) { if (exists.id != model.id) { return -1; } }

                try
                {
                    var updatedObject = new tbStockProductManageMaster
                    {
                        id = model.id,
                        receiverid = model.receiverid,
                        actiondate = Convert.ToDateTime(model.actiondate),
                        status = true,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.loginCode
                    };
                    updated = _stockmanageMasterRepository.Update(updatedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
            return updated;
        }

        public ModelMasterManage GetFirstByIDGetin(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _stockmanageMasterRepository.GetFirstByIDGetin(id, conn);
            }
        }

    }
}

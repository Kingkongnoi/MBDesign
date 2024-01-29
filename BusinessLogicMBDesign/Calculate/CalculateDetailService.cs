using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using NPOI.XSSF.UserModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicMBDesign.Calculate
{
    public class CalculateDetailService
    {
        private readonly CalculateDetailRepository _calculateDetailRepository;
        private readonly CalculateMasterRepository _calculateMasterRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public CalculateDetailService(IConfiguration configuration)
        {
            _calculateDetailRepository = new CalculateDetailRepository();
            _calculateMasterRepository = new CalculateMasterRepository();
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public List<CalculateDetailItemModel> GetCalculateList(string calculatecode,string glassdoortype,string calculatetype)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _calculateDetailRepository.GetAll(calculatecode, glassdoortype, calculatetype, conn);
            }
        }

        public List<CalculateDetailItemModel> GetCalculateList(string calculatecode, string calculatetype)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _calculateDetailRepository.GetAll(calculatecode, "", calculatetype, conn);
            }
        }

        public int? AddCalculateDetailItem(CalculateDetailAddModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                //var exists = _stockproductRepository.GetFirstByName(model.productname, conn, transaction);
                //if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbCalculateDetail
                    {
                        calculateMasterID = model.calculateMasterID,
                        productcode = model.productcode,
                        glassdoortype = model.glassdoortype,
                        masterheigh = model.masterheigh,
                        masterwidth = model.masterwidth,
                        calheigh = model.calheigh,
                        calwidth = model.calwidth,
                        deburringheigh = model.deburringheigh,
                        deburringwidth = model.deburringwidth
                    };
                    added = _calculateDetailRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateCalculateDetailItem(CalculateDetailAddModel model)
        {
            int updated = 0;
            int updatedMaster = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _calculateDetailRepository.GetFirstById(model.id, conn, transaction);
                if (exists != null) { if (exists.id != model.id) { return -1; } }

                try
                {
                    var updatedObject = new tbCalculateDetail
                    {
                        id = model.id,
                        calculateMasterID = model.calculateMasterID,
                        productcode = model.productcode,
                        glassdoortype = model.glassdoortype,
                        calheigh = model.calheigh,
                        calwidth = model.calwidth,
                        deburringheigh = model.deburringheigh,
                        deburringwidth = model.deburringwidth
                    };
                    updated = _calculateDetailRepository.Update(updatedObject, conn, transaction);
                    if (updated !=0)
                    {
                        var updateMaster = new tbCalculateMaster
                        {
                            id = model.calculateMasterID,
                            calculatecode = model.calculatecode,
                            updateBy = model.loginCode,
                            updateDate = DateTime.UtcNow
                        };
                        updatedMaster = _calculateMasterRepository.Update(updateMaster, conn, transaction);
                    }
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
            return updated;
        }

        public List<tbStockProduct> getStockProductDataSelect()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _calculateDetailRepository.getStockProductData(conn);
            }
        }

        public List<tbCust> geCustListDataSelect()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _calculateDetailRepository.getCustListData(conn);
            }
        }

        public List<CustDetailModel> geCustListDataByIDSelect(string id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _calculateDetailRepository.getCustListByIDData(id, conn);
            }
        }
    }
}

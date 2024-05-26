using Dapper;
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
    public class StockManageService
    {
        private readonly StockManageRepository _stockmanageRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public StockManageService(IConfiguration configuration)
        {
            _stockmanageRepository = new StockManageRepository();
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public List<StockManageItemModel> GetStockInList(string docode, string saler, string getin, int stockinby, int stock, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _stockmanageRepository.GetAll(docode, saler, getin, stockinby, stock, status, conn);
            }
        }

        public List<StockManageItemModel> GetStockOutList(string docode, string saler, string getin, int stockinby, int stock, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _stockmanageRepository.GetAllStockOut(docode, saler, getin, stockinby, stock, status, conn);
            }
        }

        public List<stockEditModel> GetStockProductManageItemById(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _stockmanageRepository.GetFirstById(id, conn);
            }

        }
        public int? AddStockManageItem(StockManageAddModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlTransaction transaction = conn.BeginTransaction();
                StockManageMasterService _add = new StockManageMasterService(_configuration);
                var addMaster = _add.AddItem(model);
                if (addMaster == 0) { return -1; }
                try
                {
                    foreach (var item in model.ManageDetail)
                    {
                        var addedObject = new tbStockProductManage
                        {
                            stockmanagemasterid = addMaster.HasValue ? addMaster.Value : 0,
                            stockid = item.stockid,
                            stockproductcode = item.stockproductcode,
                            dealername = item.dealername,
                            amount = item.amount,
                            status = model.status,
                            remark = item.remark,
                            createDate = DateTime.UtcNow,
                            createBy = model.loginCode
                        };
                        added = _stockmanageRepository.Add(addedObject, conn, transaction);

                    }
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int? UpdateStockProductItem(StockManageAddModel model)
        {
            int? updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                StockManageMasterService _update = new StockManageMasterService(_configuration);
                var updateMaster = _update.UpdateStockProductManageMasterItem(model);
                if (updateMaster == 0) { return -1; }

                try
                {
                    if (!string.IsNullOrWhiteSpace(model.listdelid))
                    {
                        string[] _iddel = model.listdelid.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);
                        for (int i = 0; i < _iddel.Length; i++)
                        {
                            _stockmanageRepository.DeleteProductManage(model.id, _iddel[i].ToString(), conn, transaction);
                        }
                    }
                    foreach (var item in model.ManageDetail)
                    {
                        string[] _iddel = model.listdelid.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);
                        bool checkisdel = Array.Exists(_iddel, ele => ele == item.stockproductcode);
                        if (!checkisdel)
                        {
                            int _count = _stockmanageRepository.GetProductManage(item.stockproductcode,model.id, conn, transaction).Count();

                           
                            if (_count > 0)
                            {
                                var updatedObject = new tbStockProductManage
                                {
                                    id = item.id,
                                    stockid = item.stockid,
                                    stockproductcode = item.stockproductcode,
                                    stockmanagemasterid = model.id,
                                    dealername = item.dealername,
                                    amount = item.amount,
                                    remark = item.remark,
                                    status = model.status,
                                    updateDate = DateTime.UtcNow,
                                    updateBy = model.loginCode
                                };
                                updated = _stockmanageRepository.Update(updatedObject, conn, transaction);
                            }
                            else
                            {
                                var updatedObject = new tbStockProductManage
                                {
                                    stockmanagemasterid = model.id,
                                    stockid = item.stockid,
                                    stockproductcode = item.stockproductcode,
                                    dealername = item.dealername,
                                    amount = item.amount,
                                    remark = item.remark,
                                    status = model.status,
                                    createDate = DateTime.UtcNow,
                                    createBy = model.loginCode
                                };
                                updated = _stockmanageRepository.Add(updatedObject, conn, transaction);
                            }
                        }
                       
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



    }
}

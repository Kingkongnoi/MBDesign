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

        public tbStockProductManage GetStockProductManageItemById(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _stockmanageRepository.GetFirstById(id, conn);
            }

        }
        public int? AddGetInItem(StockManageAddModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _stockmanageRepository.GetFirstByCodeGetin(model.documentcode, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbStockProductManage
                    {
                        documentcode = model.documentcode,
                        stockid = model.stockid,
                        stockproductcode = model.stockproductcode,
                        receiverid = model.receiverid,
                        actiontype = model.actiontype,
                        actiondate = Convert.ToDateTime(model.actiondate),
                        dealername = model.dealername,
                        amount = model.amount,
                        status = model.status,
                        remark = model.remark,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _stockmanageRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateStockProductItem(StockManageAddModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _stockmanageRepository.GetFirstByCodeGetin(model.documentcode, conn, transaction);
                if (exists != null) { if (exists.id != model.id) { return -1; } }

                try
                {
                    var updatedObject = new tbStockProductManage
                    {
                        id = model.id,
                       
                        stockid = model.stockid,
                        stockproductcode = model.stockproductcode,
                        receiverid = model.receiverid,
                        actiontype = model.actiontype,
                        actiondate = Convert.ToDateTime(Convert.ToDateTime(model.actiondate).ToString("yyyy-MM-dd")),
                        dealername = model.dealername,
                        amount = model.amount,
                        remark = model.remark,
                        status = model.status,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.loginCode
                    };
                    updated = _stockmanageRepository.Update(updatedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
            return updated;
        }
       

        public string GetFirstLastestGetinItemId()
        {
            string stockproductcode = string.Empty;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {

                conn.Open();

                int getID = _stockmanageRepository.GetLastestGetInId(conn);
                if (getID > 0)
                {
                    stockproductcode = string.Format("G{0:D6}", getID);
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

                int getID = _stockmanageRepository.GetLastestWithDrawId(conn);
                if (getID > 0)
                {
                    stockproductcode = string.Format("W{0:D6}", getID);
                }
                return stockproductcode;
            }
        }
    }
}

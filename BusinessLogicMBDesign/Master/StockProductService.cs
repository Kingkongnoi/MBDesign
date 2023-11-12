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
    public class StockProductService
    {
        private readonly StockProductRepository _stockproductRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public StockProductService(IConfiguration configuration)
        {
            _stockproductRepository = new StockProductRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public List<StockProductItemModel> GetStockProductList(int groupid, int subgroupid, int brandid, int stockid, string productcode, string productname, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _stockproductRepository.GetAll(groupid,subgroupid,brandid,stockid,productcode, productname, status, conn);
            }
        }

        public tbStockProduct GetStockProductItemById(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _stockproductRepository.GetFirstById(id, conn);
            }

        }

        public int? AddStockProductItem(StockProductAddModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _stockproductRepository.GetFirstByName(model.productname, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbStockProduct
                    {
                        productcode = model.productcode,
                        productname = model.productname,
                        stockamount = model.stockamount,
                        productprice = model.productprice,
                        groupid = model.groupid,
                        subgroupid = model.subgroupid,
                        brandid = model.brandid,
                        stockid = model.stockid,
                        unitmasterid = model.unitmasterid,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _stockproductRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateStockProductItem(StockProductAddModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _stockproductRepository.GetFirstByName(model.productname, conn, transaction);
                if (exists != null) { if (exists.id != model.id) { return -1; } }

                try
                {
                    var updatedObject = new tbStockProduct
                    {
                        id = model.id,
                        productname = model.productname,
                        stockamount = model.stockamount,
                        productprice = model.productprice,
                        groupid = model.groupid,
                        subgroupid = model.subgroupid,
                        brandid = model.brandid,
                        stockid = model.stockid,
                        unitmasterid = model.unitmasterid,
                        status = model.status,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.loginCode
                    };
                    updated = _stockproductRepository.Update(updatedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
            return updated;
        }

        public string GetFirstLastestItemId()
        {
            string stockproductcode = string.Empty;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {

                conn.Open();

                int getID = _stockproductRepository.GetLastestId(conn);
                if (getID > 0)
                {
                    stockproductcode = string.Format("P{0:D4}", getID);
                }
                return stockproductcode;
            }

        }

        public List<tbGroup> GetGroupDataSelect()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _stockproductRepository.getGroupData(conn);
            }
        }
        public List<tbSubGroup> GetSubGroupDataSelect()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _stockproductRepository.getSubGroupData(conn);
            }
        }
        public List<tbBrand> GetBrandDataSelect()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _stockproductRepository.getBrandData(conn);
            }
        }
        public List<tbStock> GetStockDataSelect()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _stockproductRepository.getStockData(conn);
            }
        }
        public List<tbUnitMaster> GetUnitDataSelect()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _stockproductRepository.getUnitData(conn);
            }
        }
    }
}

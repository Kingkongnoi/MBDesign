using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace BusinessLogicMBDesign.Master
{
    public class StockService
    {
        private readonly StockRepository _stockRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public StockService(IConfiguration configuration)
        {
            _stockRepository = new StockRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public List<StockItemModel> GetStockList(int stockid, string stockname, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _stockRepository.GetAll(stockid, stockname, status, conn);
            }
        }

        public tbStock GetStockItemById(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _stockRepository.GetFirstById(id, conn);
            }

        }

        public int? AddStockItem(StockItemModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _stockRepository.GetFirstByName(model.stockname, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbStock
                    {
                        stockname = model.stockname,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _stockRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateStockItem(StockItemModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _stockRepository.GetFirstByName(model.stockname, conn, transaction);
                if (exists != null) { if (exists.id != model.id) { return -1; } }

                try
                {
                    var updatedObject = new tbStock
                    {
                        id = model.id,
                        stockname = model.stockname,
                        status = model.status,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.loginCode
                    };
                    updated = _stockRepository.Update(updatedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
            return updated;
        }

        public tbStock GetFirstLastestItemId()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _stockRepository.GetLastestId(conn);
            }

        }
    }
}

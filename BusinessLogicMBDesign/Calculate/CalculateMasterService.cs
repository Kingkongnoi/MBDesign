using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace BusinessLogicMBDesign.Calculate
{
    public class CalculateMasterService
    {
        private readonly CalculateMasterRepository _calculateMasterRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public CalculateMasterService(IConfiguration configuration)
        {
            _calculateMasterRepository = new CalculateMasterRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public string GetFirstLastestItemId()
        {
            string stockproductcode = string.Empty;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {

                conn.Open();

                int getID = _calculateMasterRepository.GetLastestId(conn);
                if (getID > 0)
                {
                    stockproductcode = string.Format("CAL{0:D4}", getID);
                }
                return stockproductcode;
            }
        }

        public int? AddCalculateMasterItem(CalculateMasterAddModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _calculateMasterRepository.GetFirstCalculatecode(model.calculatecode, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbCalculateMaster
                    {
                        orderid = model.orderid,
                        calculatecode = model.calculatecode,
                        calculatetype = model.calculatetype,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _calculateMasterRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public List<tbCalculateMaster> GetCalculateMasterList(int id,string calculatecode)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _calculateMasterRepository.GetAll(id, calculatecode, conn);
            }
        }

        public List<listQuotationNumber> GetListQuotationNumbersCal(string type)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _calculateMasterRepository.GetListQuotationNumbersCal(type,conn);
            }
        }

        public int GetSpecIDByOrderID(int orderID)
        {

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _calculateMasterRepository.getSpecID(orderID, conn);
            }
        }
    }
}

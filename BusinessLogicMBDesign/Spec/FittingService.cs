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
    public class FittingService
    {
        private readonly FittingRepository _fittingRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public FittingService(IConfiguration configuration)
        {
            _fittingRepository = new FittingRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public List<listQuotationNumber> GetListQuotationNumbersFitting()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _fittingRepository.GetListQuotationNumbersFitting(conn);
            }
        }

        public int GetSpecIDByOrderID(int orderID)
        {

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _fittingRepository.getSpecID(orderID, conn);
            }
        }

        public string GetFirstLastestItemId()
        {
            string stockproductcode = string.Empty;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {

                conn.Open();

                int getID = _fittingRepository.GetLastestId(conn);
                if (getID > 0)
                {
                    stockproductcode = string.Format("FIT{0:D4}", getID);
                }
                return stockproductcode;
            }
        }
    }
}

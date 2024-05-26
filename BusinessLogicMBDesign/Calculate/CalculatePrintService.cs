using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using UtilitiesMBDesign;

namespace BusinessLogicMBDesign.Calculate
{
    public class CalculatePrintService
    {
        private readonly CalculatePrintRepository _calculatePrintRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        public CalculatePrintService(IConfiguration configuration)
        {
            _calculatePrintRepository = new CalculatePrintRepository();
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }
        public int? AddCalculatePrintItem(CalculatePrintAddModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                tbCalculatePrint _print = _calculatePrintRepository.getCalculatePrintByID(model.calculateMasterID, conn, transaction);
                if (_print != null) 
                {
                    _calculatePrintRepository.UpdateCancle(model.calculateMasterID, model.loginCode, conn, transaction);
                }
                //var exists = _stockproductRepository.GetFirstByName(model.productname, conn, transaction);
                //if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbCalculatePrint
                    {
                        calculateMasterID = model.calculateMasterID,
                        custid = model.custid,
                        transactionActive = "A",
                        transactionStatus = "A",
                        createBy = model.loginCode,
                        createDate = DateTime.UtcNow,
                    };
                    added = _calculatePrintRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public tbCalculatePrint getCalPrintByID(int calculateMasterID)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _calculatePrintRepository.getCalculatePrintByID(calculateMasterID, conn);
            }
        }
    }
}

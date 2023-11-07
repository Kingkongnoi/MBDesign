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
    public class ReceiverProductService
    {
        private readonly ReceiverProductRepository _receiverProductRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        public ReceiverProductService(IConfiguration configuration) 
        {
            _receiverProductRepository = new ReceiverProductRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public List<tbReceiverProduct> GetReceiverProductList(string empcode, string empname, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _receiverProductRepository.GetAll(empcode,empname, status, conn);
            }
        }

        public int? AddReceiverProductItem(ReceiverProductItemModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _receiverProductRepository.GetFirstByEmpCode(model.empid, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbReceiverProduct
                    {
                        empid = model.empid,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _receiverProductRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateReceiverProductItem(ReceiverProductItemModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _receiverProductRepository.GetFirstByEmpCode(model.empid, conn, transaction);
                if (exists != null) { if (exists.id != model.id) { return -1; } }

                try
                {
                    var updatedObject = new tbReceiverProduct
                    {
                        id = model.id,
                        empid = model.empid,
                        status = model.status,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.loginCode
                    };
                    updated = _receiverProductRepository.Update(updatedObject, conn, transaction);

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

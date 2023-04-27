using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicMBDesign.Sale
{
    public class SaleService
    {
        private readonly CustRepository _custRepository;
        private readonly ProductStyleRepository _productStyleRepository;
        private readonly ProductTypeRepository _productTypeRepository;
        private readonly ProductItemRepository _productItemRepository;
        private readonly ProductItemOptionsRepository _productItemOptionsRepository;

        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public SaleService(IConfiguration configuration)
        {
            _custRepository = new CustRepository();
            _productStyleRepository = new ProductStyleRepository();
            _productTypeRepository = new ProductTypeRepository();
            _productItemRepository = new ProductItemRepository();
            _productItemOptionsRepository  = new ProductItemOptionsRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        #region Customer Data
        public tbCust GetFirstLastestCustId()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custRepository.GetLastestId(conn);
            }

        }

        public tbCust GetFirstByCustId(int custId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custRepository.GetFirstById(custId, conn);
            }

        }

        public int? AddCust(CustModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var addedObject = new tbCust
                    {
                        custFirstName = model.custFirstName,
                        custSurName = model.custSurName,
                        custNickName = model.custNickName,
                        custTel = model.custTel,
                        custLineId = model.custLineId,
                        custAddress = model.custAddress,
                        custLocation = model.custLocation,
                        status = true,
                        createDate = DateTime.UtcNow,
                        createBy = "MB9999"
                    };
                    added = _custRepository.Add(addedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateCust(CustModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var updatedObject = new tbCust
                    {
                        custId = model.custId,
                        custFirstName = model.custFirstName,
                        custSurName = model.custSurName,
                        custNickName = model.custNickName,
                        custTel = model.custTel,
                        custLineId = model.custLineId,
                        custAddress = model.custAddress,
                        custLocation = model.custLocation,
                        status = true,
                        updateDate = DateTime.UtcNow,
                        updateBy = "MB9999"
                    };
                    updated = _custRepository.Update(updatedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return updated;
        }
        #endregion Customer Data

        #region Style
        public List<tbProductStyle> GetProductStyleSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productStyleRepository.GetAllActiveForSelect2(conn);
            }
        }
        #endregion Style

        #region Product Type
        public List<tbProductType> GetProductTypeSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productTypeRepository.GetProductTypeSelect2(conn);
            }
        }
        #endregion Product Type

        #region Product Item
        public List<ProductItemView> GetProductItemSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productItemRepository.GetProductItemSelect2(conn);
            }
        }
        #endregion Product Item

        #region Product Item Options
        public List<tbProductItemOptions> GetProductItemSelect2(int itemId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productItemOptionsRepository.GetProductItemOptionsSelect2(itemId, conn);
            }
        }
        #endregion Product Item Options
    }
}

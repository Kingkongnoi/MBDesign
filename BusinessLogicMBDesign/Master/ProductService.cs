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
    public class ProductService
    {
        private readonly ProductTypeRepository _productTypeRepository;
        private readonly ProductStyleRepository _productStyleRepository;
        private readonly ProductItemRepository _productItemRepository;
        private readonly ProductItemOptionsRepository _productItemOptionsRepository;
        private readonly ProductItemQuickQTRepository _productItemQuickQTRepository;

        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        public ProductService(IConfiguration configuration) 
        {
            _productTypeRepository = new ProductTypeRepository();
            _productStyleRepository = new ProductStyleRepository();
            _productItemRepository = new ProductItemRepository();
            _productItemOptionsRepository = new ProductItemOptionsRepository();
            _productItemQuickQTRepository = new ProductItemQuickQTRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        #region product item
        public tbProductItem GetFirstLastestItemId()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productItemRepository.GetLastestId(conn);
            }

        }

        public List<ProductItemView> GetProductItemList(string itemName, int typeId, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productItemRepository.GetAll(itemName, typeId, status, conn);
            }
        }

        public tbProductItem GetProductItemByItemId(int itemId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productItemRepository.GetFirstById(itemId, conn);
            }

        }

        public int? AddProductItem(ProductItemModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _productItemRepository.GetFirstByName(model.itemName, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbProductItem
                    {
                        itemName = model.itemName,
                        typeId= model.typeId,
                        itemPrice = model.itemPrice,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _productItemRepository.Add(addedObject, conn, transaction);

                    #region add options
                    var optionsExists = _productItemOptionsRepository.GetByItemId(added.Value, conn, transaction);
                    if(optionsExists.Count > 0) 
                    {
                        int deletedOptions = _productItemOptionsRepository.HardDeleteByItemId(added.Value, conn, transaction);
                    }

                    foreach(var op in model.options)
                    {
                        var options = new tbProductItemOptions
                        {
                            itemId = added.Value,
                            options = op.options.Trim(),
                            optionsPrice = op.optionsPrice,
                            status = model.status,
                            createDate = DateTime.UtcNow,
                            createBy = model.loginCode
                        };
                        int? addedOptions = _productItemOptionsRepository.Add(options, conn, transaction);
                    }
                    #endregion add options

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateProductItem(ProductItemModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _productItemRepository.GetFirstByName(model.itemName, conn, transaction);
                if (exists != null) { if (exists.itemId != model.itemId) { return -1; } }

                try
                {
                    var updatedObject = new tbProductItem
                    {
                        itemId = model.itemId,
                        itemName = model.itemName,
                        itemPrice = model.itemPrice,
                        typeId = model.typeId,
                        status = model.status,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.loginCode
                    };
                    updated = _productItemRepository.Update(updatedObject, conn, transaction);

                    #region add options
                    var optionsExists = _productItemOptionsRepository.GetByItemId(model.itemId, conn, transaction);
                    if (optionsExists.Count > 0)
                    {
                        int deletedOptions = _productItemOptionsRepository.HardDeleteByItemId(model.itemId, conn, transaction);
                    }

                    foreach (var op in model.options)
                    {
                        if(!string.IsNullOrEmpty(op.options))
                        {
                            var options = new tbProductItemOptions
                            {
                                itemId = model.itemId,
                                options = op.options.Trim(),
                                optionsPrice = op.optionsPrice,
                                status = model.status,
                                createDate = DateTime.UtcNow,
                                createBy = model.loginCode
                            };
                            int? addedOptions = _productItemOptionsRepository.Add(options, conn, transaction);
                        }
                    }
                    #endregion add options

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return updated;
        }

        public List<tbProductItemOptions> GetOptionsByItemId(int itemId) 
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productItemOptionsRepository.GetByItemId(itemId, conn);
            }
        }

        #endregion product item

        #region product type
        public tbProductType GetFirstLastestTypeId()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productTypeRepository.GetLastestId(conn);
            }

        }

        public List<ProductTypeView> GetProductTypeList(/*string typeId,*/ string typeName, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productTypeRepository.GetAll(typeName, status, conn);
            }
        }

        public tbProductType GetProductTypeByTypeId(int typeId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productTypeRepository.GetFirstById(typeId, conn);
            }

        }

        public int? AddProductType(ProductTypeModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _productTypeRepository.GetFirstByName(model.typeName, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbProductType
                    {
                        typeName = model.typeName,
                        typePrice = model.typePrice,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _productTypeRepository.Add(addedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateProductType(ProductTypeModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _productTypeRepository.GetFirstByName(model.typeName, conn, transaction);
                if (exists != null) { if (exists.typeId != model.typeId) { return -1; } }

                try
                {
                    var updatedObject = new tbProductType
                    {
                        typeId = model.typeId,
                        typeName = model.typeName,
                        typePrice = model.typePrice,
                        status = model.status,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.loginCode
                    };
                    updated = _productTypeRepository.Update(updatedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return updated;
        }

        public List<tbProductType> GetProductTypeSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productTypeRepository.GetProductTypeSelect2(conn);
            }

        }

        #endregion product type

        #region product style
        public tbProductStyle GetFirstLastestStyleId()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productStyleRepository.GetLastestId(conn);
            }

        }

        public List<ProductStyleView> GetProductStyleList(/*string styleId, */string styleName, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productStyleRepository.GetAll(styleName, status, conn);
            }
        }

        public tbProductStyle GetProductStyleByStyleId(int styleId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productStyleRepository.GetFirstById(styleId, conn);
            }

        }

        public int? AddProductStyle(ProductStyleModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _productStyleRepository.GetFirstByName(model.styleName, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbProductStyle
                    {
                        styleName = model.styleName,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _productStyleRepository.Add(addedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateProductStyle(ProductStyleModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _productStyleRepository.GetFirstByName(model.styleName, conn, transaction);
                if (exists != null) { if (exists.styleId != model.styleId) { return -1; } }

                try
                {
                    var updatedObject = new tbProductStyle
                    {
                        styleId = model.styleId,
                        styleName = model.styleName,
                        status = model.status,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.loginCode
                    };
                    updated = _productStyleRepository.Update(updatedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return updated;
        }

        #endregion product style

        #region
        public List<ProductItemQuickQTView> GetProductItemQuickQTList(string itemCode, int typeId, string itemText, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productItemQuickQTRepository.GetAll(itemCode, typeId, itemText, status, conn);
            }
        }
        public int? AddProductItemQuickQT(ProductItemQuickQTModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _productItemQuickQTRepository.GetFirstByCode(model.itemCode, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbProductItemQuickQT
                    {
                        itemCode = model.itemCode,
                        itemText = model.itemText,
                        typeId = model.typeId,
                        itemPrice = model.itemPrice,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _productItemQuickQTRepository.Add(addedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateProductItemQuickQT(ProductItemQuickQTModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _productItemQuickQTRepository.GetFirstByCode(model.itemCode, conn, transaction);
                if (exists != null) { if (exists.itemId != model.itemId) { return -1; } }

                try
                {
                    var updatedObject = new tbProductItemQuickQT
                    {
                        itemId = model.itemId,
                        itemText = model.itemText,
                        itemPrice = model.itemPrice,
                        typeId = model.typeId,
                        status = model.status,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.loginCode
                    };
                    updated = _productItemQuickQTRepository.Update(updatedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return updated;
        }

        public tbProductItemQuickQT GetProductItemQuickQTByItemId(int itemId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productItemQuickQTRepository.GetFirstById(itemId, conn);
            }

        }
        #endregion

    }
}

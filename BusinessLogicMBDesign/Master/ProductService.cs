﻿using DataLayerMBDesign;
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

        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        public ProductService(IConfiguration configuration) 
        {
            _productTypeRepository = new ProductTypeRepository();
            _productStyleRepository = new ProductStyleRepository();
            _productItemRepository = new ProductItemRepository();
            _productItemOptionsRepository = new ProductItemOptionsRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        #region product type
        public tbProductType GetFirstLastestTypeId()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productTypeRepository.GetLastestId(conn);
            }

        }

        public List<tbProductType> GetProductTypeList(/*string typeId,*/ string typeName, string status)
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
                        createBy = "MB9999"
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
                        updateBy = "MB9999"
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

        public List<tbProductStyle> GetProductStyleList(/*string styleId, */string styleName, string status)
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
                        createBy = "MB9999"
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
                        updateBy = "MB9999"
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

    }
}

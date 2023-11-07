using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace BusinessLogicMBDesign.Master
{
    public class BrandService
    {
        private readonly BrandRepository _brandRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public BrandService(IConfiguration configuration)
        {
            _brandRepository = new BrandRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public List<tbBrand> GetBrandList(string brandcode, string brandname, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _brandRepository.GetAll(brandcode, brandname, status, conn);
            }
        }

        public int? AddBrandItem(BrandItemModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _brandRepository.GetFirstByName(model.brandname, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbBrand
                    {
                        brandcode = model.brandcode,
                        brandname = model.brandname,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _brandRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateBrandItem(BrandItemModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _brandRepository.GetFirstByName(model.brandname, conn, transaction);
                if (exists != null) { if (exists.id != model.id) { return -1; } }

                try
                {
                    var updatedObject = new tbBrand
                    {
                        id = model.id,
                        brandname = model.brandname,
                        status = model.status,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.loginCode
                    };
                    updated = _brandRepository.Update(updatedObject, conn, transaction);

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

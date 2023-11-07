using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace BusinessLogicMBDesign.Master
{
    public class UnitMasterService
    {
        private readonly UnitMasterRepository _unitMasterRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public UnitMasterService(IConfiguration configuration)
        {
            _unitMasterRepository = new UnitMasterRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public List<tbUnitMaster> GetUitMasterList(int id,string unitname, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _unitMasterRepository.GetAll(id, unitname, status, conn);
            }
        }

        public int? AddUnitMasrerItem(UnitMasterItemModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _unitMasterRepository.GetFirstByName(model.unitname, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbUnitMaster
                    {
                        unitname = model.unitname,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _unitMasterRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateUnitMasterItem(UnitMasterItemModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _unitMasterRepository.GetFirstByName(model.unitname, conn, transaction);
                if (exists != null) { if (exists.id != model.id) { return -1; } }

                try
                {
                    var updatedObject = new tbUnitMaster
                    {
                        id = model.id,
                        unitname = model.unitname,
                        status = model.status,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.loginCode
                    };
                    updated = _unitMasterRepository.Update(updatedObject, conn, transaction);

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

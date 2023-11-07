using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace BusinessLogicMBDesign.Master
{
    public class SubGroupService
    {
        private readonly SubGroupRepository _subgroupRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public SubGroupService(IConfiguration configuration)
        {
            _subgroupRepository = new SubGroupRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public List<SubGroupItemModel> GetSubGroupList(string subgroupcode, string subgroupname, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _subgroupRepository.GetAll(subgroupcode, subgroupname, status, conn);
            }
        }

        public int? AddSubGroupItem(SubGroupAddItemModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _subgroupRepository.GetFirstByName(model.subgroupname, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbSubGroup
                    {
                        groupid = model.groupid,
                        subgroupname = model.subgroupname,
                        subgroupcode = model.subgroupcode,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _subgroupRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateSubGroupItem(SubGroupItemModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _subgroupRepository.GetFirstByName(model.subgroupname, conn, transaction);
                if (exists != null) { if (exists.id != model.id) { return -1; } }

                try
                {
                    var updatedObject = new tbSubGroup
                    {
                        id = model.id,
                        groupid = model.groupid,
                        subgroupname = model.subgroupname,
                        status = model.status,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.loginCode
                    };
                    updated = _subgroupRepository.Update(updatedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
            return updated;
        }

        public string GetFirstLastestSubGroupCode(int groupid)
        {
            string subGroupCode = string.Empty;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                int getID = _subgroupRepository.GetLastestId(groupid, conn);
                if (getID > 0)
                {
                    subGroupCode = string.Format("CY{0:D4}-{1:D2}", getID, groupid);
                }
                return subGroupCode;
            }

        }

        public tbSubGroup GetSubGroupItemById(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _subgroupRepository.GetFirstById(id, conn);
            }

        }

        public List<tbGroup> GetGroupNameSelect()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _subgroupRepository.GetGroupName(conn);
            }

        }
    }
}

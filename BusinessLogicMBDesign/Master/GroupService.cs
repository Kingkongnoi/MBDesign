using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace BusinessLogicMBDesign.Master
{
    public class GroupService
    {
        private readonly GroupRepository _groupRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public GroupService(IConfiguration configuration)
        {
            _groupRepository = new GroupRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public List<GroupItemModel> GetGroupList(int groupcode, string groupname, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _groupRepository.GetAll(groupcode, groupname, status, conn);
            }
        }

        public tbGroup GetGroupItemById(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _groupRepository.GetFirstById(id, conn);
            }

        }

        public int? AddGroupItem(GroupItemModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _groupRepository.GetFirstByName(model.groupname, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbGroup
                    {
                        groupname = model.groupname,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _groupRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateGroupItem(GroupItemModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _groupRepository.GetFirstByName(model.groupname, conn, transaction);
                if (exists != null) { if (exists.id != model.id) { return -1; } }

                try
                {
                    var updatedObject = new tbGroup
                    {
                        id = model.id,
                        groupname = model.groupname,
                        status = model.status,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.loginCode
                    };
                    updated = _groupRepository.Update(updatedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
            return updated;
        }

        public tbGroup GetFirstLastestItemId()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _groupRepository.GetLastestId(conn);
            }

        }
    }
}

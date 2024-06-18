using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace BusinessLogicMBDesign.Spec
{
    public class PlanksService
    {
        private readonly PlanksRepository _planksRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public PlanksService(IConfiguration configuration)
        {
            _planksRepository = new PlanksRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public List<PlanksListItem> GetPlanksList(string quotationcod, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _planksRepository.GetAll(quotationcod, status, conn);
            }
        }

        public PlankWithCode GetPlanksItemById(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _planksRepository.GetFirstByID(id, conn);
            }
        }

        public PlankWithCode GetPlanksItemByOrderId(int orderid)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _planksRepository.GetFirstByOrderID(orderid, conn);
            }
        }

        public List<tbPlanksDetails> GetPlanksDetailItemByID(int id) 
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _planksRepository.GetDetailsByID(id, conn);
            }
            
        }

        public List<tbCustOrder> GetQuatationNoList()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _planksRepository.GetCustOrderList(conn);
            }
        }

        public int GetSpecIDByOrderID(int orderID)
        {

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _planksRepository.getSpecID(orderID,conn);
            }
        }

        public int? AddPlanksItem(PlanksAddModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _planksRepository.GetFirstByID(model.id, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbPlanks
                    {
                        orderid = model.orderid,
                        //colorCode = model.colorCode,
                        //thickness18MM = model.thickness18MM,
                        //thickness9MM = model.thickness9MM,
                        status = model.status,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _planksRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdatePlanksItem(PlanksAddModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _planksRepository.GetFirstByID(model.id, conn, transaction);
                if (exists != null) { if (exists.id != model.id) { return -1; } }

                try
                {
                    var updatedObject = new tbPlanks
                    {
                        id = model.id,
                        //colorCode = model.colorCode,
                        //thickness18MM = model.thickness18MM,
                        //thickness9MM = model.thickness9MM,
                        status = model.status,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.loginCode
                    };
                    updated = _planksRepository.Update(updatedObject, conn, transaction);

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
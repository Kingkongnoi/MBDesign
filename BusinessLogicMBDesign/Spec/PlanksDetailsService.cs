using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicMBDesign.Spec
{
    public class PlanksDetailsService
    {
        private readonly PlanksDetailsRepository _planksDetailsRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public PlanksDetailsService(IConfiguration configuration)
        {
            _planksDetailsRepository = new PlanksDetailsRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public int? AddPlanksDetailsItem(PlanksDetailsItemModel model, int? planksid)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _planksDetailsRepository.GetFirstByID(model.id, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbPlanksDetails
                    {
                        plankid = planksid.HasValue ? planksid.Value : 0,
                        colorcode = model.colorcode,
                        amount = model.amount,
                        thicknesstype = model.thicknesstype,
                        remark = model.remark
                    };
                    added = _planksDetailsRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int? DelItem(int id,int plankid) 
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _planksDetailsRepository.DeletePlanksDetails(id,plankid, conn);
            }
            
        }
    }
}

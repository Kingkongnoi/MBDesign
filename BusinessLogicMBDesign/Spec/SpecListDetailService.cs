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
    public class SpecListDetailService
    {
        private readonly SpecListDetailRepository _SpecListDetailRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public SpecListDetailService(IConfiguration configuration)
        {
            _SpecListDetailRepository = new SpecListDetailRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public int? AddSpecListDetailItem(specListDetailItemModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _SpecListDetailRepository.GetFirstByID(model.id, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbSpecListDetail
                    {
                        specid = model.specid,
                        empid = model.empid,
                        commitDate = DateTime.Now,
                        checkliststatus = model.checkliststatus,
                        transactionActive = model.transactionActive,
                        transactionStatus = model.transactionStatus,
                        isApprove = model.isApprove,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _SpecListDetailRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int? UpdateSpecList(specListDetailUpdateItemModel model)
        {
            int? updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();
                string[] liststatus = model.listStatus.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                foreach (string status in liststatus)
                {
                    var exists = _SpecListDetailRepository.GetSpecBySpecIDStatus(model.id, Convert.ToInt32(status), conn, transaction);
                    if (exists == null)
                    {
                        try
                        {
                            var addedObject = new tbSpecListDetail
                            {
                                specid = model.id,
                                empid = model.empid,
                                commitDate = model.commitDate,
                                checkliststatus = Convert.ToInt32(status),
                                transactionActive = "A",
                                transactionStatus = "A",
                                isApprove = true,
                                createDate = DateTime.UtcNow,
                                createBy = model.loginCode
                            };
                            updated = _SpecListDetailRepository.Add(addedObject, conn, transaction);
                            if (Convert.ToInt32(status) == 2)
                            {
                                int specdetailid = updated.HasValue ? updated.Value : 0;
                                if (specdetailid !=0)
                                {
                                    var addUrl = new tbSpecVideoURL
                                    {
                                        specdetailid = specdetailid,
                                        videourl = model.vieoUrl
                                    };
                                    updated = _SpecListDetailRepository.AddVideo(addUrl, conn, transaction);
                                }
                                else
                                {
                                    updated = 0;
                                }
                            }


                            transaction.Commit();
                        }
                        catch (Exception ex)
                        {
                            transaction.Rollback();
                        }
                    }

                }

            }
            return updated;
        }
    }
}

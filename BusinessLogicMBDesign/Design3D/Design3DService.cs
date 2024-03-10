using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicMBDesign.Design3D
{
    public class Design3DService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        private readonly CustOrderRepository _custOrderRepository;
        private readonly Design3DRepository _design3DRepository;
        private readonly EmpDataRepository _empDataRepository;
        private readonly UploadRepository _uploadRepository;
        private readonly UploadUrlRepository _uploadUrlRepository;
        private readonly UploadCategoryRepository _uploadCategoryRepository;
        private readonly ContractAgreementRepository _contractAgreementRepository;
        private readonly ForemanRepository _foremanRepository;
        private readonly UploadFileRepository _uploadFileRepository;
        public Design3DService(IConfiguration configuration) 
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();

            _custOrderRepository = new CustOrderRepository();
            _design3DRepository = new Design3DRepository();
            _empDataRepository = new EmpDataRepository();
            _uploadRepository = new UploadRepository();
            _uploadUrlRepository = new UploadUrlRepository();
            _uploadCategoryRepository = new UploadCategoryRepository();
            _contractAgreementRepository = new ContractAgreementRepository();
            _foremanRepository = new ForemanRepository();
            _uploadFileRepository = new UploadFileRepository();
        }

        public List<CustOrderView> Get3DQueueList(string quotationNumber, string empName, string checklistStatus, string installDate)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custOrderRepository.GetDesign3DList(quotationNumber, empName, checklistStatus, installDate, GlobalOrderStatus.approved, conn);
            }
        }
        public List<tbDesign3D> GetChecklistStatusSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _design3DRepository.GetChecklistStatus(conn);
            }
        }

        public List<EmpDataView> GetDesign3DNameSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _empDataRepository.GetDesign3DEmpDataSelect2(conn);
            }
        }

        public Design3DView Get3DQueueCustOrderByOrderId(int orderId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _design3DRepository.GetEditDesign3DByOrderId(orderId, conn);
            }
        }

        public ResultMessage DoUpdateDesign3D(List<UploadFiles> file, string categoryName, int orderId, int empId, string checklistStatus, string dueDate, int design3dId, string loginCode)
        {
            var msg = new ResultMessage();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    if(file.Count > 0)
                    {
                        DoAddUploadApprove3d(file, categoryName, orderId, loginCode);
                    }
   
                    var exists = _design3DRepository.GetEditDesign3DByKeyId(design3dId, conn, transaction);
                    if(exists != null)
                    {
                        var updatedObject = new tbDesign3D
                        { 
                            id = design3dId,
                            ownerEmpId = empId,
                            dueDate = (dueDate == "null") ? null : Convert.ToDateTime(dueDate),
                            checklistStatus = checklistStatus,
                            updateDate = DateTime.UtcNow,
                            updateBy = loginCode
                        };
                        int updated = _design3DRepository.UpdateByKeyId(updatedObject, conn, transaction);
                    }

                    //Update to contract agreement
                    if(checklistStatus == Global3DStatus.design3dApproved)
                    {
                        string contractStatus = GlobalContractStatus.document3dApproved;

                        int updateContract = _contractAgreementRepository.UpdateContractStatus(orderId, contractStatus, DateTime.UtcNow, loginCode, conn, transaction);

                        //Create foreman
                        var foremanExists = _foremanRepository.GetByOrderId(orderId, conn, transaction);
                        if(foremanExists == null)
                        {
                            var addedForeman = new tbForeman
                            {
                                orderId = orderId,
                                foremanStatus = GlobalForemanStatus.getToForeman,
                                status = true,
                                createDate = DateTime.UtcNow,
                                createBy = loginCode,
                                isDeleted = false,
                            };

                            int? foremanId = _foremanRepository.Add(addedForeman, conn, transaction);
                        }
                        else
                        {
                            int updateForeman = _foremanRepository.UpdateForemanStatus(orderId, GlobalForemanStatus.getToForeman, conn, transaction);
                        }
                    }

                    msg.isResult = true;
                    transaction.Commit();
                }
                catch
                {
                    msg.isResult = false;
                    transaction.Rollback();
                }
            }

            return msg;
        }

        public bool DoAddUploadApprove3d(List<UploadFiles> file, string categoryName, int orderId, string loginCode)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var cat = _uploadCategoryRepository.GetFirstByName(categoryName, conn, transaction);
                    int? categoryId = 0;
                    if (cat != null)
                    {
                        categoryId = cat.id;
                    }
                    else
                    {
                        var addedCategory = new tbUploadCategory
                        {
                            name = categoryName,
                            status = true,
                            createDate = DateTime.UtcNow,
                            createBy = loginCode,
                            isDeleted = false
                        };

                        categoryId = _uploadCategoryRepository.Add(addedCategory, conn, transaction);
                    }

                    foreach (var f in file)
                    {
                        /*
                        var uploadFile = new tbUploadFile
                        {
                            fileName = f.fileName,
                            originalFileName = f.originalFileName,
                            fileSize = f.fileSize,
                            fileType = f.fileType,
                            dataFile = f.dataFile,
                            status = true,
                            createDate = DateTime.UtcNow,
                            createBy = loginCode,
                            isDeleted = false
                        };

                        int? fileId = _uploadFileRepository.Add(uploadFile, conn, transaction);
                        */

                        var uploadUrl = new tbUploadUrl
                        {
                            url = f.imageUrl,
                            fileName = f.fileName,
                            fileSize = f.fileSize,
                            status = true,
                            createDate = DateTime.UtcNow,
                            createBy = loginCode,
                            isDeleted = false
                        };

                        int? urlId = _uploadUrlRepository.Add(uploadUrl, conn, transaction);

                        var upload = new tbUpload
                        {
                            urlId = urlId.Value,
                            orderId = orderId,
                            uploadCategoryId = categoryId.Value,
                            status = true,
                            createDate = DateTime.UtcNow,
                            createBy = loginCode,
                            isDeleted = false
                        };

                        int? uploadId = _uploadRepository.Add(upload, conn, transaction);
                    }

                    transaction.Commit();
                }
                catch
                {
                    transaction.Rollback();
                }
            }
            return true;
        }
    }
}

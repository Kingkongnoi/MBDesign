using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilitiesMBDesign;

namespace BusinessLogicMBDesign
{
    public class UploadToDatabaseService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        private readonly UploadCategoryRepository _uploadCategoryRepository;
        private readonly UploadFileRepository _uploadFileRepository;

        public UploadToDatabaseService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();

            _uploadCategoryRepository = new UploadCategoryRepository();
            _uploadFileRepository = new UploadFileRepository(); 
        }

        public List<UploadFiles> GenerateUploadFilesObject(List<IFormFile> files)
        {
            var addedUpload = new List<UploadFiles>();
            if (files != null)
            {
                if (files.Count > 0)
                {
                    foreach (IFormFile source in files)
                    {
                        var fileName = Path.GetFileName(source.FileName);
                        var fileExtension = Path.GetExtension(fileName);

                        string fileWithoutExtension = Path.GetFileNameWithoutExtension(fileName);
                        string newFileName = string.Format("{0}_{1}{2}", fileWithoutExtension, DateTime.UtcNow.ToString("yyyyMMddHHmmss"), fileExtension);

                        var obj = new UploadFiles
                        {
                            fileName = newFileName,
                            originalFileName = fileName,
                            fileSize = source.Length,
                            fileType = fileExtension
                        };
                        using (var target = new MemoryStream())
                        {
                            source.CopyTo(target);
                            obj.dataFile = target.ToArray();
                        }

                        addedUpload.Add(obj);
                    }
                }
            }

            return addedUpload;
        }

        public int? DoAddUploadFile(UploadFiles file, string categoryName, string loginCode)
        {
            int? fileId = 0;

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

                    var uploadFile = new tbUploadFile
                    {
                        fileName = file.fileName,
                        originalFileName = file.originalFileName,
                        fileSize = file.fileSize,
                        fileType = file.fileType,
                        dataFile = file.dataFile,
                        status = true,
                        createDate = DateTime.UtcNow,
                        createBy = loginCode,
                        isDeleted = false
                    };

                    fileId = _uploadFileRepository.Add(uploadFile, conn, transaction);

                    transaction.Commit();
                }
                catch
                {
                    transaction.Rollback();
                }
            }
            return fileId.Value;
        }
    }
}

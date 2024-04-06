using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicMBDesign.Foreman
{
    public class ForemanService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        private readonly CustOrderRepository _custOrderRepository;
        private readonly ForemanRepository _foremanRepository;
        private readonly UploadRepository _uploadRepository;
        private readonly UploadOrderDetailRepository _uploadOrderDetailRepository;
        private readonly UploadCategoryRepository _uploadCategoryRepository;
        private readonly UploadUrlRepository _uploadUrlRepository;
        private readonly CustOrderDetailRepository _custOrderDetailRepository;
        private readonly BankAccountRepository _bankAccountRepository;
        private readonly InvoiceRepository _invoiceRepository;
        private readonly UploadFileRepository _uploadFileRepository;
        private readonly StatusRepository _statusRepository;

        public ForemanService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();

            _custOrderRepository = new CustOrderRepository();
            _foremanRepository = new ForemanRepository();
            _uploadRepository = new UploadRepository();
            _uploadOrderDetailRepository = new UploadOrderDetailRepository();
            _uploadCategoryRepository = new UploadCategoryRepository();
            _uploadUrlRepository = new UploadUrlRepository();
            _custOrderDetailRepository = new CustOrderDetailRepository();
            _bankAccountRepository = new BankAccountRepository();
            _invoiceRepository = new InvoiceRepository();
            _uploadFileRepository = new UploadFileRepository();
            _statusRepository = new StatusRepository();
        }

        public List<CustOrderView> GetForemanQueueList(string quotationNumber, string cusName, string foremanStatus, string installDate)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custOrderRepository.GetForemanList(quotationNumber, cusName, foremanStatus, installDate, conn);
            }
        }
        public List<ForemanView> GetForemanStatusSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _foremanRepository.GetForemanStatus(conn);
            }
        }

        public ForemanView GetForemanCustOrderByKeyId(int foremanId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _foremanRepository.GetEditForemanByForemanId(foremanId, conn);
            }
        }
        public List<CustOrderDetailView> GetForemanCustOrderDetailByKeyId(int orderId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custOrderDetailRepository.GetByOrderId(orderId, conn);
            }
        }

        public List<UploadView> GetByOrderIdAndCategory(int orderId, string category)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _uploadRepository.GetByOrderIdWithCategoryName(orderId, category, conn);
            }
        }

        public List<UploadOrderDetailView> GetForemanUpload(int orderId, string category)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _uploadOrderDetailRepository.GetByOrderIdWithCategory(orderId, category, conn);
            }
        }

        public UploadView GetFirstByOrderIdAndCategory(int orderId, string category)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _uploadRepository.GetFirstByOrderIdWithCategoryName(orderId, category, conn);
            }
        }

        public bool DoUpdateForemanPerItem(List<UploadFiles> file, string categoryName, int orderId, int orderDetailId, decimal length, decimal depth, decimal height, string loginCode)
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

                        var upload = new tbUploadOrderDetail
                        {
                            urlId = urlId.Value,
                            orderId = orderId,
                            orderDetailId = orderDetailId,
                            uploadCategoryId = categoryId.Value,
                            status = true,
                            createDate = DateTime.UtcNow,
                            createBy = loginCode,
                            isDeleted = false
                        };

                        int? uploadId = _uploadOrderDetailRepository.Add(upload, conn, transaction);
                    }

                    //Update item detail
                    var items = new tbCustOrderDetail
                    {
                        orderId = orderId,
                        custOrderDetailId = orderDetailId,
                        orderLength = length,
                        orderDepth = depth,
                        orderHeight = height,
                        updateDate = DateTime.UtcNow,
                        updateBy = loginCode
                    };

                    int updateCustOrderDetail = _custOrderDetailRepository.UpdateForemanValue(items, conn, transaction);

                    string foremanCategory = GlobalForemanStatus.foremanCategory;
                    var getForemanStatus = _statusRepository.GetFirstByCategoryNameAndStatusName(foremanCategory, GlobalForemanStatus.processing, conn, transaction);
                    int foremanStatusId = (getForemanStatus != null) ? getForemanStatus.statusId : 0;

                    int updateForeman = _foremanRepository.UpdateForemanStatus(orderId, foremanStatusId, DateTime.UtcNow, loginCode, conn, transaction);

                    transaction.Commit();
                }
                catch
                {
                    transaction.Rollback();
                }
            }
            return true;
        }
        public ResultMessage DoUpdateForeman(List<UploadFiles> file, string categoryName, int orderId, string orderNote, decimal orderNotePrice, decimal subTotal, decimal discount, decimal vat, decimal grandTotal, decimal disposite, string loginCode)
        {
            var msg = new ResultMessage();
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
                        int deleteUrl = _uploadUrlRepository.HardDeleteByParam(orderId, categoryId.Value, conn, transaction);
                        int delete = _uploadUrlRepository.HardDeleteByParam(orderId, categoryId.Value, conn, transaction);

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

                    //Update item detail
                    var items = new tbCustOrder
                    {
                        orderId = orderId,
                        orderNote = orderNote,
                        orderNotePrice = orderNotePrice,
                        subTotal = subTotal,
                        discount = discount,
                        vat = vat,
                        grandTotal = grandTotal,
                        disposite = disposite,
                        updateDate = DateTime.UtcNow,
                        updateBy = loginCode
                    };

                    int updateCustOrder = _custOrderRepository.UpdateForeman(items, conn, transaction);

                    if (categoryName == GlobalUploadCategory.secondDisposite)
                    {
                        var custOrder = _custOrderRepository.GetCustOrderByOrderId(orderId, conn, transaction);
                        if (custOrder != null)
                        {
                            var bank = new tbBankAccount
                            {
                                accountId = custOrder.accountId,
                                updateDate = DateTime.UtcNow,
                                updateBy = loginCode
                            };
                            var updateCountUsage = _bankAccountRepository.UpdateCountUsage(bank, conn, transaction);

                            //Create invoice = จ่ายเงินมัดจำ
                            var exists = _invoiceRepository.GetFirstByOrderIdAndCustId(custOrder.orderId, custOrder.custId, conn, transaction);
                            if (exists != null)
                            {
                                string invoiceCategory = GlobalInvoiceStatus.invoiceCategory;
                                var getInvoiceStatus = _statusRepository.GetFirstByCategoryNameAndStatusName(invoiceCategory, GlobalInvoiceStatus.paid, conn, transaction);
                                int invoiceStatusId = (getInvoiceStatus != null) ? getInvoiceStatus.statusId : 0;

                                string periodCategory = GlobalInvoicePeriod.invoicePeriodCategory;
                                var getPeriodStatus = _statusRepository.GetFirstByCategoryNameAndStatusName(periodCategory, GlobalInvoicePeriod.secondDisposite, conn, transaction);
                                int periodStatusId = (getPeriodStatus != null) ? getPeriodStatus.statusId : 0;

                                var invoice = new tbInvoice
                                {
                                    orderId = orderId,
                                    custId = custOrder.custId,
                                    periodStatusId = periodStatusId,
                                    invoiceStatusId = invoiceStatusId,
                                    unitPrice = disposite,
                                    updateDate = DateTime.UtcNow,
                                    updateBy = loginCode,
                                    id = exists.id
                                };

                                int updateInvoice = _invoiceRepository.UpdateInvoiceStatus(invoice, conn, transaction);
                            }
                        }
                    }

                    string foremanCategory = GlobalForemanStatus.foremanCategory;
                    var getForemanStatus = _statusRepository.GetFirstByCategoryNameAndStatusName(foremanCategory, GlobalForemanStatus.processed, conn, transaction);
                    int foremanStatusId = (getForemanStatus != null) ? getForemanStatus.statusId : 0;

                    int updateForeman = _foremanRepository.UpdateForemanStatus(orderId, foremanStatusId, DateTime.UtcNow, loginCode, conn, transaction);

                    transaction.Commit();
                }
                catch
                {
                    transaction.Rollback();
                }
            }
            return msg;
        }
    }
}

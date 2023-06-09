using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace BusinessLogicMBDesign.Accounting
{
    public class AccountingService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        private readonly CustOrderRepository _custOrderRepository;
        private readonly ContractAgreementRepository _contractAgreementRepository;
        private readonly UploadRepository _uploadRepository;
        private readonly CustRepository _custRepository;
        private readonly InvoiceRepository _invoiceRepository;
        private readonly ReceiptRepository _receiptRepository;
        private readonly CommissionRepository _commissionRepository;
        private readonly IdCardComCertRepository _idCardComCertRepository;

        public AccountingService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();

            _custOrderRepository = new CustOrderRepository();
            _contractAgreementRepository = new ContractAgreementRepository();
            _uploadRepository = new UploadRepository();
            _custRepository = new CustRepository();
            _invoiceRepository = new InvoiceRepository();
            _receiptRepository = new ReceiptRepository();
            _commissionRepository = new CommissionRepository();
            _idCardComCertRepository = new IdCardComCertRepository();
        }

        public List<CustOrderView> GetAccountingList(string contractNumber, string quotationNumber, string customerName, string contractStatus, string contractDate)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custOrderRepository.GetAccountingListByParams(contractNumber, quotationNumber, customerName, contractStatus, contractDate, conn);
            }
        }

        public List<tbContractAgreement> GetContractStatusSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _contractAgreementRepository.GetContractStatus(conn);
            }
        }

        public List<tbInvoice> GetInvoiceStatusSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _invoiceRepository.GetInvoiceStatus(conn);
            }
        }
        public List<tbCustOrder> GetQuotaionStatusSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custOrderRepository.GetQuotaionSelect2(conn);
            }
        }

        public CustOrderView GetCustOrderByOrderId(int orderId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custOrderRepository.GetAccountingByOrderId(orderId, conn);
            }
        }
        public tbInvoice GetInvoiceByKeyId(int invoiceId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _invoiceRepository.GetByInvoiceId(invoiceId, conn);
            }
        }
        public tbCust GetCustByCustId(int custId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custRepository.GetFirstById(custId, conn);
            }
        }
        public List<UploadView> GetAccountImage(int orderId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                var category = new List<string> { "CustOrderIdCard", "CustOrderPlan", "3dApproved" };
                return _uploadRepository.GetByOrderIdWithCategoryList(orderId, category, conn);
            }
        }

        public List<CustOrderView> GetInvoiceList(string quotationNumber, string invoiceNumber, string customerName, string invoiceStatus, string invoiceDate)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custOrderRepository.GetInvoiceListByParams(quotationNumber, invoiceNumber, customerName, invoiceStatus, invoiceDate, conn);
            }
        }

        public List<CustOrderView> GetReceiptList(string invoiceNumber, string receiptNumber, string customerName, string receiptDate)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custOrderRepository.GetReceiptListByParams(invoiceNumber, receiptNumber, customerName, receiptDate, conn);
            }
        }

        public tbInvoice GenerateInvoiceNumber()
        {
            var result = new tbInvoice();
            string newInvoiceNum = string.Empty;

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                string yearMonth = this.GenerateYearMonth();

                int lastestNumberGen = _invoiceRepository.GetLastestInvoiceNumberByYearMonthGen(yearMonth, conn);
                int generateNumber = (lastestNumberGen == 0) ? 1 : lastestNumberGen + 1;

                string getNumber = string.Format("{0:0000}", generateNumber);

                newInvoiceNum = string.Format("{0}{1}", yearMonth, getNumber);

                result.invoiceNumber = newInvoiceNum;
                result.invoiceNumberGen = generateNumber;
                result.invoiceYearMonthGen = yearMonth;
            }

            return result;
        }
        public string GenerateYearMonth()
        {
            ThaiBuddhistCalendar thaiCalendar = new ThaiBuddhistCalendar();

            string getYear = thaiCalendar.GetYear(DateTime.UtcNow).ToString();
            string getMonth = string.Format("{0:00}", thaiCalendar.GetMonth(DateTime.UtcNow));

            string yearMonth = string.Format("{0}{1}", getYear, getMonth);

            return yearMonth;
        }

        public tbCust GetCustomerInformationByCustId(int custId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custRepository.GetFirstById(custId, conn);
            }
        }
        public ResultMessage DoUpdateAccountingCustomer(AccountingModel model)
        {
            var msg = new ResultMessage();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var updated = new tbCust
                    {
                        custFirstName= model.custFirstName,
                        custSurName= model.custSurName,
                        custAddress= model.custAddress,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.loginCode,
                        custId = model.custId
                    };

                    int updatedRow = _custRepository.UpdateAccounting(updated, conn, transaction);

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
        public ResultMessage DoSendToSaleAndForeman(int orderId)
        {
            var msg = new ResultMessage();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    int updatedRow = _contractAgreementRepository.UpdateContractStatus(orderId, GlobalContractStatus.documentSendToSaleAndForeman, conn, transaction);

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
        public ResultMessage DoAddInvoice(InvoiceModel model)
        {
            var msg = new ResultMessage();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var updated = new tbCust
                    {
                        custFirstName = model.custFirstName,
                        custSurName = model.custSurName,
                        custInstallAddress = model.custInstallAddress,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.loginCode,
                        custId = model.custId
                    };

                    int updatedRow = _custRepository.UpdateInvoiceCust(updated, conn, transaction);

                    var custOrder = _custOrderRepository.GetCustOrderByOrderId(model.orderId, conn, transaction);
                    if(custOrder != null)
                    {
                        var addedInvoice = new tbInvoice
                        {
                            invoiceNumber = model.invoiceNumber,
                            invoiceNumberGen = model.invoiceNumberGen,
                            invoiceYearMonthGen = model.invoiceYearMonthGen,
                            quotationNumber = custOrder.quotationNumber,
                            period = model.period,
                            orderId = model.orderId,
                            custId = model.custId,
                            unitPrice = model.unitPrice,
                            invoiceStatus = model.invoiceStatus,
                            status = true,
                            isDeleted = false,
                            createDate = DateTime.UtcNow,
                            createBy = model.loginCode
                        };

                        int? invoiceId = _invoiceRepository.Add(addedInvoice, conn, transaction);
                        
                        if (model.invoiceStatus == "จ่ายแล้ว")
                        {
                            int? receiptId = this.AddReceipt(model.orderId, model.custId, this.GenerateYearMonth(), invoiceId, model.loginCode);

                            if(model.period == GlobalInvoicePeriod.secondDisposite || model.period == GlobalInvoicePeriod.fourthDisposite)
                            {
                                int? commissionId = this.AddOrUpdateCommission(model.orderId, model.loginCode, custOrder.grandTotal);
                            }
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
        public ResultMessage DoUpdateInvoice(InvoiceModel model)
        {
            var msg = new ResultMessage();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var updated = new tbCust
                    {
                        custFirstName = model.custFirstName,
                        custSurName = model.custSurName,
                        custInstallAddress = model.custInstallAddress,
                        custTel = model.custTel,
                        updateDate = DateTime.UtcNow,
                        updateBy = model.loginCode,
                        custId = model.custId
                    };

                    int updatedRow = _custRepository.UpdateInvoiceCust(updated, conn, transaction);

                    var custOrder = _custOrderRepository.GetCustOrderByOrderId(model.orderId, conn, transaction);
                    if (custOrder != null)
                    {
                        var addedInvoice = new tbInvoice
                        {
                            quotationNumber = custOrder.quotationNumber,
                            period = model.period,
                            orderId = model.orderId,
                            custId = model.custId,
                            unitPrice = model.unitPrice,
                            invoiceStatus = model.invoiceStatus,
                            updateDate = DateTime.UtcNow,
                            updateBy = model.loginCode,
                            id= model.invoiceId
                        };

                        int? invoiceId = _invoiceRepository.UpdateInvoiceStatus(addedInvoice, conn, transaction);

                        if (model.invoiceStatus == "จ่ายแล้ว")
                        {
                            int? receiptId = this.AddReceipt(model.orderId, model.custId, this.GenerateYearMonth(), invoiceId, model.loginCode);

                            if (model.period == GlobalInvoicePeriod.secondDisposite || model.period == GlobalInvoicePeriod.fourthDisposite)
                            {
                                int? commissionId = this.AddOrUpdateCommission(model.orderId, model.loginCode, custOrder.grandTotal);
                            }
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

        public int? AddReceipt(int orderId, int custId, string yearMonth, int? invoiceId, string loginCode)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    int lastestNumberGen = _receiptRepository.GetLastestReceiptNumberByYearMonthGen(yearMonth, conn, transaction);
                    int generateNumber = (lastestNumberGen == 0) ? 1 : lastestNumberGen + 1;

                    string receiptNumber = this.GenerateNumber(generateNumber, yearMonth);

                    var addedObject = new tbReceipt
                    {
                        receiptNumber = receiptNumber,
                        receiptNumberGen = generateNumber,
                        receiptYearMonthGen = yearMonth,
                        orderId = orderId,
                        custId = custId,
                        invoiceId = invoiceId,
                        status = true,
                        createDate = DateTime.UtcNow,
                        createBy = loginCode,
                        isDeleted = false
                    };

                    added = _receiptRepository.Add(addedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }
        public string GenerateNumber(int generateNumber, string yearMonth)
        {
            string getNumber = string.Format("{0:0000}", generateNumber);

            string newContractNum = string.Format("{0}{1}", yearMonth, getNumber);

            return newContractNum;
        }

        public List<InvoiceView> GetPeriodByOrderId(int orderId)
        {
            var result = new List<InvoiceView>();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                var exists = _invoiceRepository.GetFirstByOrderId(orderId, conn);
                if(exists == null)
                {
                    result.Add(new InvoiceView {  period = GlobalInvoicePeriod.firstDisposite, fullPeriod = GlobalInvoicePeriod.firstFullDisposite });
                    result.Add(new InvoiceView {  period = GlobalInvoicePeriod.secondDisposite, fullPeriod = GlobalInvoicePeriod.secondFullDisposite });
                    result.Add(new InvoiceView {  period = GlobalInvoicePeriod.thridDisposite, fullPeriod = GlobalInvoicePeriod.thridFullDisposite });
                    result.Add(new InvoiceView {  period = GlobalInvoicePeriod.fourthDisposite, fullPeriod = GlobalInvoicePeriod.fourthFullDisposite });
                }
                else
                {
                    if(exists.period == GlobalInvoicePeriod.firstDisposite)
                    {
                        result.Add(new InvoiceView { period = GlobalInvoicePeriod.secondDisposite, fullPeriod = GlobalInvoicePeriod.secondFullDisposite });
                        result.Add(new InvoiceView { period = GlobalInvoicePeriod.thridDisposite, fullPeriod = GlobalInvoicePeriod.thridFullDisposite });
                        result.Add(new InvoiceView { period = GlobalInvoicePeriod.fourthDisposite, fullPeriod = GlobalInvoicePeriod.fourthFullDisposite });
                    }
                    else if (exists.period == GlobalInvoicePeriod.secondDisposite)
                    {
                        result.Add(new InvoiceView { period = GlobalInvoicePeriod.thridDisposite, fullPeriod = GlobalInvoicePeriod.thridFullDisposite });
                        result.Add(new InvoiceView { period = GlobalInvoicePeriod.fourthDisposite, fullPeriod = GlobalInvoicePeriod.fourthFullDisposite });
                    }
                    else if (exists.period == GlobalInvoicePeriod.thridDisposite)
                    {
                        result.Add(new InvoiceView { period = GlobalInvoicePeriod.fourthDisposite, fullPeriod = GlobalInvoicePeriod.fourthFullDisposite });
                    }
                }
            }

            return result;
        }

        public int? AddOrUpdateCommission(int orderId, string saleEmpCode, decimal grandTotal)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    //string currDate = DateTime.UtcNow.ToString("dd/yyyy");
                    var exists = _commissionRepository.GetFirstCommissionByDate(DateTime.UtcNow, saleEmpCode, conn, transaction);
                    if(exists == null)
                    {
                        var calMonthlySales = grandTotal * Convert.ToDecimal(0.5);
                        var cal = this.CalculateComissionAndBonus(calMonthlySales);
                        var commission = cal.commission;
                        var bonus = cal.bonus;

                        var addedObject = new tbCommission
                        {
                            commissionDate = DateTime.UtcNow.Date,
                            monthlySales = calMonthlySales,
                            commission = commission,
                            bonus = bonus,
                            saleEmpCode = saleEmpCode,
                            commissionStatus = "รอจ่าย",
                            status = true,
                            createDate = DateTime.UtcNow,
                            createBy = saleEmpCode,
                            isDeleted = false
                        };

                        added = _commissionRepository.Add(addedObject, conn, transaction);
                    }
                    else
                    {
                        var calMonthlySales = exists.monthlySales + (grandTotal * Convert.ToDecimal(0.5));
                        var cal = this.CalculateComissionAndBonus(calMonthlySales);
                        var commission = cal.commission;
                        var bonus = cal.bonus;

                        var updated = new tbCommission
                        {
                            monthlySales = calMonthlySales,
                            commission = commission,
                            bonus = bonus,
                            updateDate = DateTime.UtcNow,
                            updateBy = saleEmpCode,
                            commissionId = exists.commissionId
                        };

                        added = _commissionRepository.UpdateCommission(updated, conn, transaction);
                    }

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public (decimal commission, decimal bonus) CalculateComissionAndBonus(decimal calMonthlySales)
        {
            /*
             * ยอดสะสมทั้งเดือน วันที่ 1-31 ของเดือนนั้นๆ
	        ต่ำกว่า 500000 ได้ค่าคอม 0.5% 
	        ยอด 500,001 - 1,000,000 = 1%
	        ยอด 1,000,001-2,000,000 = 1% + bonus 5000   	
	        ยอด 2,000,001-3,000,000 = 1.5% bonus10,000 	
	        ยอด 3,000,001 ขึ้นไป 2% bonus 20,000
             */
            decimal commission = 0;
            decimal bonus = 0;
            if (calMonthlySales <= 500000)
            {
                commission = calMonthlySales * Convert.ToDecimal(0.005);
                bonus = 0;
            }
            else if (calMonthlySales > 500000 && calMonthlySales <= 1000000)
            {
                commission = calMonthlySales * Convert.ToDecimal(0.01);
                bonus = 0;
            }
            else if (calMonthlySales > 1000000 && calMonthlySales <= 2000000)
            {
                commission = calMonthlySales * Convert.ToDecimal(0.01);
                bonus = 5000;
            }
            else if (calMonthlySales > 2000000 && calMonthlySales <= 3000000)
            {
                commission = calMonthlySales * Convert.ToDecimal(0.015);
                bonus = 10000;
            }
            else if (calMonthlySales > 3000000)
            {
                commission = calMonthlySales * Convert.ToDecimal(0.02);
                bonus = 20000;
            }


            return (commission, bonus);
        }

        public tbIdCardComCert GetIdCardComCert()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _idCardComCertRepository.GetFirstIdCardComCert(conn);
            }
        }

        public ResultMessage DoUpdateIdCard(UploadFiles files, string loginCode)
        {
            var msg = new ResultMessage();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var exists = _idCardComCertRepository.GetFirstIdCardComCert(conn, transaction);
                    if(exists == null)
                    {
                        var added = new tbIdCardComCert
                        {
                            imgIdCardFileName = files.imageUrl,
                            status = true,
                            createDate = DateTime.UtcNow,
                            createBy = loginCode
                        };

                        int? newId = _idCardComCertRepository.Add(added, conn, transaction);
                    }
                    else
                    {
                        var updated = new tbIdCardComCert
                        {
                            imgIdCardFileName = files.imageUrl,
                            updateDate = DateTime.UtcNow,
                            updateBy = loginCode,
                            id = exists.id
                        };

                        int updateId = _idCardComCertRepository.UpdateIdCard(updated, conn, transaction);
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

        public ResultMessage DoUpdateComCert(UploadFiles files, string loginCode)
        {
            var msg = new ResultMessage();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var exists = _idCardComCertRepository.GetFirstIdCardComCert(conn, transaction);
                    if (exists == null)
                    {
                        var added = new tbIdCardComCert
                        {
                            imgComCertFileName = files.imageUrl,
                            status = true,
                            createDate = DateTime.UtcNow,
                            createBy = loginCode
                        };

                        int? newId = _idCardComCertRepository.Add(added, conn, transaction);
                    }
                    else
                    {
                        var updated = new tbIdCardComCert
                        {
                            imgComCertFileName = files.imageUrl,
                            updateDate = DateTime.UtcNow,
                            updateBy = loginCode,
                            id= exists.id
                        };

                        int updateId = _idCardComCertRepository.UpdateComCert(updated, conn, transaction);
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
    }
}

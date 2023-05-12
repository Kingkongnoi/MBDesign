using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicMBDesign.Sale
{
    public class SaleService
    {
        private readonly CustRepository _custRepository;
        private readonly ProductStyleRepository _productStyleRepository;
        private readonly ProductTypeRepository _productTypeRepository;
        private readonly ProductItemRepository _productItemRepository;
        private readonly ProductItemOptionsRepository _productItemOptionsRepository;
        private readonly BankAccountRepository _bankAccountRepository;
        private readonly CustOrderRepository _custOrderRepository;
        private readonly CustOrderDetailRepository _custOrderDetailRepository;
        private readonly CustOrderItemOptionsRepository _custOrderItemOptionsRepository;


        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public SaleService(IConfiguration configuration)
        {
            _custRepository = new CustRepository();
            _productStyleRepository = new ProductStyleRepository();
            _productTypeRepository = new ProductTypeRepository();
            _productItemRepository = new ProductItemRepository();
            _productItemOptionsRepository  = new ProductItemOptionsRepository();
            _bankAccountRepository  = new BankAccountRepository();
            _custOrderRepository = new CustOrderRepository();
            _custOrderDetailRepository = new CustOrderDetailRepository();
            _custOrderItemOptionsRepository = new CustOrderItemOptionsRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        #region Customer Data
        public tbCust GetFirstLastestCustId()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custRepository.GetLastestId(conn);
            }

        }

        public tbCust GetFirstByCustId(int custId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custRepository.GetFirstById(custId, conn);
            }

        }

        public int? AddCust(CustModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var addedObject = new tbCust
                    {
                        custFirstName = model.custFirstName,
                        custSurName = model.custSurName,
                        custNickName = model.custNickName,
                        custTel = model.custTel,
                        custLineId = model.custLineId,
                        custAddress = model.custAddress,
                        custLocation = model.custLocation,
                        custInstallAddress = model.custInstallAddress,
                        status = true,
                        createDate = DateTime.UtcNow,
                        createBy = "MB9999"
                    };
                    added = _custRepository.Add(addedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateCust(CustModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    var updatedObject = new tbCust
                    {
                        custId = model.custId,
                        custFirstName = model.custFirstName,
                        custSurName = model.custSurName,
                        custNickName = model.custNickName,
                        custTel = model.custTel,
                        custLineId = model.custLineId,
                        custAddress = model.custAddress,
                        custLocation = model.custLocation,
                        status = true,
                        updateDate = DateTime.UtcNow,
                        updateBy = "MB9999"
                    };
                    updated = _custRepository.Update(updatedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return updated;
        }
        #endregion Customer Data

        #region Style
        public List<tbProductStyle> GetProductStyleSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productStyleRepository.GetAllActiveForSelect2(conn);
            }
        }
        #endregion Style

        #region Product Type
        public List<tbProductType> GetProductTypeSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productTypeRepository.GetProductTypeSelect2(conn);
            }
        }
        #endregion Product Type

        #region Product Item
        public List<ProductItemView> GetProductItemSelect2()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productItemRepository.GetProductItemSelect2(conn);
            }
        }
        #endregion Product Item

        #region Product Item Options
        public List<tbProductItemOptions> GetProductItemSelect2(int itemId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _productItemOptionsRepository.GetProductItemOptionsSelect2(itemId, conn);
            }
        }
        #endregion Product Item Options

        #region bank account
        public List<tbBankAccount> GetAllActiveBankAccount()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _bankAccountRepository.GetActiveBackAccountUsage(conn);
            }
        }
        #endregion bank account

        public string SaveAndCreateQuotation(SaleModel model)
        {
            // Add cust data
            var custObj = new CustModel
            {
                custFirstName = model.custFirstName,
                custSurName = model.custSurName,
                custNickName = model.custNickName,
                custTel = model.custTel,
                custLineId = model.custLineId,
                custAddress = model.custAddress,
                custLocation = model.custLocation,
                custInstallAddress = model.custInstallAddress
            };

            int? custId = this.AddCust(custObj);

            int? orderId = this.AddCustOrder(model, custId.Value);

            int? orderDetailId = this.AddCustOrderDetail(model, orderId.Value);

            string quotationNumber = this.GetQuotationNumberByOrderId(orderId.Value);

            return quotationNumber;
        }
        public int? AddCustOrder(SaleModel model, int custId)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    string type = (model.vatPercentage == 0) ? "N" : "";
                    int lastestNumberGen = _custOrderRepository.GetLastestQuotationNumberByType(type, conn, transaction);
                    int generateNumber = (lastestNumberGen == 0) ? 1 : lastestNumberGen + 1;

                    var getBankAccount = _bankAccountRepository.GetBackAccountUsageByType(model.accountType, conn, transaction);
                    int accountId = (getBankAccount != null) ? getBankAccount.accountId : 0;

                    string orderStatus = (model.discount > 999) ? "รออนุมัติ" : "อนุมัติ";
                    string quotation = this.GenerateQuotaion(generateNumber, type);

                    var addedObject = new tbCustOrder
                    {
                        quotationType = model.quotationType,
                        custId = custId,
                        installDate = model.installDate,
                        orderNote = model.orderNote,
                        discount = model.discount,
                        vat = model.vat,
                        subTotal = model.subTotal,
                        grandTotal = model.grandTotal,
                        disposite = model.disposite,
                        accountId = accountId,
                        quotationNumber = quotation,
                        quotationNumberGen = generateNumber,
                        quotationNumberType = type,
                        status = true,
                        createDate = DateTime.UtcNow,
                        createBy = "MB9999",
                        orderStatus = orderStatus,
                    };

                    added = _custOrderRepository.Add(addedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }
        public int? AddCustOrderDetail(SaleModel model, int orderId)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    foreach (var item in model.items)
                    {
                        var addedObject = new tbCustOrderDetail
                        {
                            orderId = orderId,
                            styleId = item.styleId,
                            floor = item.floor,
                            zone = item.zone,
                            typeId = item.typeId,
                            itemId = item.itemId,
                            orderLength = item.orderLength,
                            orderDepth = item.orderDepth,
                            orderHeight = item.orderHeight,
                            status = true,
                            createDate = DateTime.UtcNow,
                            createBy = "MB9999"
                        };

                        int? orderDetailId = _custOrderDetailRepository.Add(addedObject, conn, transaction);

                        AddCustOrderItemOptions(item.options, orderDetailId.Value, conn, transaction);
                    }

                    transaction.Commit();
                }
                catch 
                {
                    transaction.Rollback();
                }
            }

            return added;
        }
        public void AddCustOrderItemOptions(List<SaleOptions> model, int custOrderDetailId, SqlConnection conn, SqlTransaction trans = null)
        {
            try
            {
                foreach (var item in model)
                {
                    var added = new tbCustOrderItemOptions
                    {
                        custOrderDetailId = custOrderDetailId,
                        optionsId = item.optionsId,
                        status = true,
                        createDate = DateTime.UtcNow,
                        createBy = "MB9999"
                    };

                    int? id = _custOrderItemOptionsRepository.Add(added, conn, trans);
                }
            }
            catch { }

        }
        public string GenerateQuotaion(int generateNumber, string type)
        {
            ThaiBuddhistCalendar thaiCalendar = new ThaiBuddhistCalendar();
            
            string getYear = thaiCalendar.GetYear(DateTime.UtcNow).ToString();
            string getMonth = string.Format("{0:00}", thaiCalendar.GetMonth(DateTime.UtcNow));
            
            string getNumber = string.Format("{0:0000}", generateNumber);

            string newQuotation = string.Format("{0}{1}{2}{3}", getYear, getMonth, getNumber, type);

            return newQuotation;
        }
        public string GetQuotationNumberByOrderId(int orderId)
        {
            string result = string.Empty;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                try
                {
                    var exists = _custOrderRepository.GetFirstByOrderIdSortDesc(orderId, conn);
                    if(exists != null)
                    {
                        result = exists.quotationNumber;
                    }
                }
                catch
                {
                }
            }

            return result;
        }

        public List<CustOrderView> GetQuotationList(string quotationNumber, string quotationCusName, string status)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _custOrderRepository.GetQuotationList(quotationNumber, quotationCusName, status, conn);
            }
        }

        public bool SaveUploadOrderRef(object obj)
        {
            //bool result = UploadToAwsController.SaveUploadOrderRef(obj);
            return true;
        }
    }
}

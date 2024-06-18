using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicMBDesign.Transportation
{
    public class TransportationQueueService
    {
        private readonly TransportationQueueRepository _transportationQueueRepository;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public TransportationQueueService(IConfiguration configuration)
        {
            _transportationQueueRepository = new TransportationQueueRepository();

            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
        }

        public List<tbTransportationQueue> GetTPQList(string drivername, int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _transportationQueueRepository.GetAll(drivername, id, conn);
            }
        }

        public List<PrintQueueReport> GetTPQDetailList(int transportationqueueid)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _transportationQueueRepository.GetAllDetail(transportationqueueid, conn);
            }
        }

        public int? AddTPQItem(SaveQItemModel model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _transportationQueueRepository.GetFirstByID(model.id, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    var addedObject = new tbTransportationQueue
                    {
                        transportationdate = model.transportationdate,
                        drivername = model.drivername,
                        subdrivername1 = model.subdrivername1,
                        subdrivername2 = model.subdrivername2,
                        outboundmileage = model.outboundmileage,
                        inboundmileage = model.inboundmileage,
                        outboundtime = model.outboundtime,
                        inboundtime = model.inboundtime,
                        remark = model.remark,
                        createDate = DateTime.UtcNow,
                        createBy = model.loginCode
                    };
                    added = _transportationQueueRepository.Add(addedObject, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int? AddTPDetailItem(tbTransportationQueueDetail model)
        {
            int? added = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _transportationQueueRepository.GetFirstDetailByID(model.id, conn, transaction);
                if (exists != null) { return -1; }

                try
                {
                    added = _transportationQueueRepository.AddDetail(model, conn, transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }

            return added;
        }

        public int UpdateTransItem(SaveQItemModel model)
        {
            int updated = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                var exists = _transportationQueueRepository.GetFirstByID(model.id, conn, transaction);
                if (exists != null) { if (exists.id != model.id) { return -1; } }

                try
                {
                    var updatedObject = new tbTransportationQueue();

                    updatedObject = new tbTransportationQueue
                    {
                        id = model.id,
                        drivername = model.drivername,
                        transportationdate = model.transportationdate,
                        subdrivername1 = model.subdrivername1,
                        subdrivername2 = model.subdrivername2,
                        outboundmileage = model.outboundmileage,
                        inboundmileage = model.inboundmileage,
                        outboundtime = model.outboundtime,
                        inboundtime = model.inboundtime,
                        remark = model.remark,

                        updateDate = DateTime.UtcNow,
                        updateBy = model.updateBy,

                    };


                    updated = _transportationQueueRepository.Update(updatedObject, conn, transaction);

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
            return updated;
        }
        public List<GetCustSelect> getNameSelect(string orderid)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _transportationQueueRepository.getCustomerNameSelect(orderid, conn);
            }
        }

        public List<GetCustSelect> getQuotationNumberSelect(string orderid)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _transportationQueueRepository.getCustomerQuotationNumberSelect(orderid, conn);
            }
        }

        public int haveDetail(int detailid)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _transportationQueueRepository.checkHaveDetail(detailid, conn);
            }
        }

        public List<GetListOrderDetail> GetListOrderDetailByOrderID(int orderid)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _transportationQueueRepository.getListOrder(orderid, conn);
            }
        }

        public int getEmpIDData(int orderid)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _transportationQueueRepository.geEmpid(orderid, conn);
            }
        }
    }
}

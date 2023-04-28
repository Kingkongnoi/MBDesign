﻿using BusinessLogicMBDesign.Master;
using BusinessLogicMBDesign.Sale;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Drawing;
using System.Security.Policy;

namespace MBDesignApi.Controllers.Sale
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SaleController : Controller
    {
        private readonly SaleService _saleService;
        private readonly IConfiguration _configuration; 
        public SaleController(IConfiguration configuration)
        {
            _configuration = configuration;
            _saleService = new SaleService(_configuration);
        }

        [HttpGet]
        public JsonResult GetSelect2ProductStyle()
        {
            var data = _saleService.GetProductStyleSelect2();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetSelect2ProductType()
        {
            var data = _saleService.GetProductTypeSelect2();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetSelect2ProductItem()
        {
            var data = _saleService.GetProductItemSelect2();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetSelect2ProductItemOptionsByItemId(int itemId)
        {
            var data = _saleService.GetProductItemSelect2(itemId);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetAllActiveBankAccount()
        {
            var data = _saleService.GetAllActiveBankAccount();

            return new JsonResult(data);
        }

        [AllowAnonymous]
        [HttpPost]
        public JsonResult SaveAndCreateQuotation([FromBody]object obj)
        {
            dynamic cvtJson = JsonConvert.DeserializeObject(obj.ToString());
            var lstItems = new List<SaleItem>();
            foreach (var item in cvtJson["items"])
            {
                var lstOptions = new List<SaleOptions>();
                foreach (var option in item["options"])
                {
                    lstOptions.Add(new SaleOptions { optionsId = Convert.ToInt32(option["optionsId"]) });
                }

                lstItems.Add(new SaleItem {
                    styleId = Convert.ToInt32(item["styleId"]),
                    floor = item["floor"],
                    zone = item["zone"],
                    typeId = Convert.ToInt32(item["typeId"]),
                    itemId = Convert.ToInt32(item["itemId"]),
                    orderLength = item["orderLength"] == "" ? 0 : Convert.ToDecimal(item["orderLength"]),
                    orderDepth = item["orderDepth"] == "" ? 0 : Convert.ToDecimal(item["orderDepth"]),
                    orderHeight = item["orderHeight"] == "" ? 0 : Convert.ToDecimal(item["orderHeight"]),
                    options = lstOptions
                });
            }

            var dataObj = new SaleModel
            {
                custFirstName = cvtJson["custFirstName"],
                custSurName = cvtJson["custSurName"],
                custNickName = cvtJson["custNickName"],
                custTel = cvtJson["custTel"],
                custLineId = cvtJson["custLineId"],
                custAddress = cvtJson["custAddress"],
                custLocation = cvtJson["custLocation"],
                custInstallAddress = cvtJson["custInstallAddress"],
                quotationType = cvtJson["quotationType"],
                installDate = cvtJson["installDate"] == "" ? "" : Convert.ToDateTime(cvtJson["installDate"]),
                items = lstItems,
                orderNote = cvtJson["orderNote"],
                discount = cvtJson["discount"] == "" ? 0 : Convert.ToDecimal(cvtJson["discount"]),
                vat = cvtJson["vat"] == "" ? 0 : Convert.ToDecimal(cvtJson["vat"]),
                subTotal = cvtJson["subTotal"] == "" ? 0 : Convert.ToDecimal(cvtJson["subTotal"]),
                grandTotal = cvtJson["grandTotal"] == "" ? 0 : Convert.ToDecimal(cvtJson["grandTotal"]),
                disposite = cvtJson["disposite"] == "" ? 0 : Convert.ToDecimal(cvtJson["disposite"]),
                accountType = cvtJson["accountType"],
                vatPercentage = Convert.ToDecimal(cvtJson["vatPercentage"])
            };

            var data = _saleService.SaveAndCreateQuotation(dataObj);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetQuotationList(string quotationNumber, string quotationCusName, string status)
        {
            var data = _saleService.GetQuotationList(quotationNumber, quotationCusName, status);

            return new JsonResult(data);
        }
    }
}

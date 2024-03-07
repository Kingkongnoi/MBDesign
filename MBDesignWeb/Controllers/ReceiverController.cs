﻿using BusinessLogicMBDesign.Master;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ReceiverController : Controller
    {
        private readonly ReceiverProductService _receiverproductService;
        private readonly IConfiguration _configuration;

        public ReceiverController(IConfiguration configuration)
        {
            _configuration = configuration;
            _receiverproductService = new ReceiverProductService(_configuration);
        }

        #region GET
        [HttpGet]
        public JsonResult GetReceiverList(string empcode, string empname, string status)
        {
            var data = _receiverproductService.GetReceiverProductList(empcode, empname, status);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetEmpDataSelect()
        {
            var data = _receiverproductService.GetEmpDataSelect();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetItemByItemId(int id)
        {
            var item = _receiverproductService.GetReceiverItemById(id);


            return new JsonResult(new { item = item });
        }

        [HttpGet]
        public JsonResult GetempFullName(int empid)
        {
            var data = _receiverproductService.GetFullName(empid);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetReciverList()
        {
            var data = _receiverproductService.GetReceiverProductList(string.Empty, string.Empty, "1");
            return new JsonResult(data);
        }

        #endregion

        #region Post
        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddItem([FromBody] ReceiverProductItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _receiverproductService.AddReceiverProductItem(obj);

            if (data == -1)
            {
                result = false;
                resultStatus = "duplicate";
            }
            else if (data == 0)
            {
                result = false;
                resultStatus = "error";
            }

            var returnData = new
            {
                result,
                resultStatus
            };

            return new JsonResult(returnData);
        }

        [AllowAnonymous]
        [HttpPost]
        public JsonResult UpdateItem([FromBody] ReceiverProductItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _receiverproductService.UpdateReceiverProductItem(obj);

            if (data == -1)
            {
                result = false;
                resultStatus = "duplicate";
            }
            else if (data == 0)
            {
                result = false;
                resultStatus = "error";
            }

            var returnData = new
            {
                result,
                resultStatus
            };

            return new JsonResult(returnData);
        }
        #endregion
    }
}
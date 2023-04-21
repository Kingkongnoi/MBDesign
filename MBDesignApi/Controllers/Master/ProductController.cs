using BusinessLogicMBDesign.Master;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignApi.Controllers.Master
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly ProductService _productService;
        private readonly IConfiguration _configuration;
        public ProductController(IConfiguration configuration)
        {
            _configuration = configuration;
            _productService = new ProductService(_configuration);
        }

        #region productItem

        #region GET
        [HttpGet]
        public JsonResult GetLastestItemId()
        {
            var data = _productService.GetFirstLastestItemId();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetItemList(string itemName, int typeId, string status)
        {
            var data = _productService.GetProductItemList(itemName, typeId, status);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetItemByItemId(int itemId)
        {
            var data = _productService.GetProductItemByItemId(itemId);

            return new JsonResult(data);
        }
        #endregion GET

        #region POST
        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddItem([FromBody] ProductItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _productService.AddProductItem(obj);

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
        public JsonResult UpdateItem([FromBody] ProductItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _productService.UpdateProductItem(obj);

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
        #endregion POST

        #endregion productItem

        #region productType

        #region GET
        [HttpGet]
        public JsonResult GetLastestTypeId()
        {
            var data = _productService.GetFirstLastestTypeId();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetTypeList(/*string typeId, */string typeName, string status)
        {
            var data = _productService.GetProductTypeList(typeName, status);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetTypeByTypeId(int typeId)
        {
            var data = _productService.GetProductTypeByTypeId(typeId);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetTypeSelect2()
        {
            var data = _productService.GetProductTypeSelect2();

            return new JsonResult(data);
        }
        #endregion GET

        #region POST
        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddProductType([FromBody] ProductTypeModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _productService.AddProductType(obj);

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
        public JsonResult UpdateProductType([FromBody] ProductTypeModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _productService.UpdateProductType(obj);

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
        #endregion POST

        #endregion productType

        #region productStyle

        #region GET
        [HttpGet]
        public JsonResult GetLastestStyleId()
        {
            var data = _productService.GetFirstLastestStyleId();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetStyleList(/*string styleId,*/ string styleName, string status)
        {
            var data = _productService.GetProductStyleList(styleName, status);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetStyleByStyleId(int styleId)
        {
            var data = _productService.GetProductStyleByStyleId(styleId);

            return new JsonResult(data);
        }
        #endregion GET

        #region POST
        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddStyle([FromBody] ProductStyleModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _productService.AddProductStyle(obj);

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
        public JsonResult UpdateStyle([FromBody] ProductStyleModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _productService.UpdateProductStyle(obj);

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
        #endregion POST

        #endregion productStyle
    }
}

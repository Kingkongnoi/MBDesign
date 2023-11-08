using BusinessLogicMBDesign.Master;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BrandController : Controller
    {
        private readonly BrandService _brandService;
        private readonly IConfiguration _configuration;

        public BrandController(IConfiguration configuration)
        {
            _configuration = configuration;
            _brandService = new BrandService(_configuration);
        }

        #region GET
        [HttpGet]
        public JsonResult GetBrandList(string brandcode, string brandname, string status)
        {
            var data = _brandService.GetBrandList(brandcode, brandname, status);

            return new JsonResult(data);
        }
       
        [HttpGet]
        public JsonResult GetLastestBrandCode()
        {
            var data = _brandService.GetFirstLastestBrandCode();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetItemByItemId(int id)
        {
            var item = _brandService.GetBrandItemById(id);


            return new JsonResult(new { item = item });
        }
        #endregion

        #region Post
        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddItem([FromBody] BrandItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _brandService.AddBrandItem(obj);

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
        public JsonResult UpdateItem([FromBody] BrandItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _brandService.UpdateBrandItem(obj);

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

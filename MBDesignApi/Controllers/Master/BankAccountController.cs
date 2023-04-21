using BusinessLogicMBDesign.Master;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignApi.Controllers.Master
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BankAccountController : Controller
    {
        private readonly BankAccountService _bankAccountService;
        private readonly IConfiguration _configuration;
        public BankAccountController(IConfiguration configuration)
        {
            _configuration = configuration;
            _bankAccountService = new BankAccountService(_configuration);
        }

        #region GET
        [HttpGet]
        public JsonResult GetLastestBankAccountId()
        {
            var data = _bankAccountService.GetLastestBankAccountId();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetBankAccountList(string bank, string accountName, string accountNumber, string accountType, string status)
        {
            var data = _bankAccountService.GetBankAccountList(bank, accountName, accountNumber, accountType, status);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetByBankAccountId(int accountId)
        {
            var data = _bankAccountService.GetByBankAccountId(accountId);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetAllBank()
        {
            var data = _bankAccountService.GetAllBank();

            return new JsonResult(data);
        }

        #endregion GET

        #region POST
        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddBankAccount([FromBody] BankAccountModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _bankAccountService.AddBankAccount(obj);

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
        public JsonResult UpdateBankAccount([FromBody] BankAccountModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _bankAccountService.UpdateBankAccount(obj);
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

    }
}

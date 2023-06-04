using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicMBDesign.Login
{
    public class LoginService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        private readonly EmpDataRepository _empDataRepository;

        public LoginService(IConfiguration configuration) {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();

            _empDataRepository = new EmpDataRepository();
        }

        public tbEmpData GetEmpByUserAndPass(string user, string pass)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                return _empDataRepository.GetFirstByEmpCodeAndIdCard(user, pass, conn);
            }
        }
    }
}

using Microsoft.Extensions.Configuration;

namespace UtilitiesMBDesign
{
    public static class DataAccess
    {
        //public static void GetConnection(IConfiguration configuration)
        //{
        //    //conections config
        //    connectionString = new ConnectionString();
        //    connectionString.dbConnectionString = configuration["dbConnectionString"] ?? "";
        //    connectionString.blobStorageConnectionString = configuration["blobStorageConnectionString"] ?? "";

        //    var appsettings = configuration.GetChildren();
        //    foreach (var item in appsettings)
        //    {
        //        try
        //        {
        //            System.Configuration.ConfigurationManager.AppSettings[item.Key.ToString()] = item.Value;
        //        }
        //        catch (Exception)
        //        {

        //        }

        //    }
        //}
    }

    public static class ConnectionString
    {
        public static string dbConnectionString { get; set; } = "Server=database-1.clvra44nqnbp.ap-southeast-2.rds.amazonaws.com,1433;Database=mbDesign-dev;User Id=admin;Password=admin123456;";
        public static string blobStorageConnectionString { get; set; } = string.Empty;
    }
}
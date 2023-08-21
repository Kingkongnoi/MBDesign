using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicMBDesign
{
    public class ftpProcessService
    {
        private readonly IConfiguration _configuration;
        private readonly string _ftpReportPathUrl = string.Empty;
        private readonly string _ftpUsername = string.Empty;
        private readonly string _ftpPassword = string.Empty;
        private readonly string _downloadReportPath = string.Empty;

        public ftpProcessService(IConfiguration configuration)
        {
            _configuration = configuration;

            _ftpReportPathUrl = _configuration.GetSection("ftpReportPathUrl").Value;
            _ftpUsername = _configuration.GetSection("ftpUsername").Value;
            _ftpPassword = _configuration.GetSection("ftpPassword").Value;
            _downloadReportPath = _configuration.GetSection("downloadReportPath").Value;
        }

        // Upload File to Specified FTP Url with username and password and Upload Directory 
        //if need to upload in sub folders /// 
        //Base FtpUrl of FTP Server
        //Local Filename to Upload
        //Username of FTP Server
        //Password of FTP Server
        //[Optional]Specify sub Folder if any
        //Status String from Server
        public string UploadFile(string fileName, string UploadDirectory = "")
        {
            string PureFileName = new FileInfo(fileName).Name;
            string uploadUrl = String.Format("{0}{1}/{2}", _ftpReportPathUrl, UploadDirectory, PureFileName);
            FtpWebRequest req = (FtpWebRequest)FtpWebRequest.Create(uploadUrl);
            req.Proxy = null;
            req.Method = WebRequestMethods.Ftp.UploadFile;
            req.Credentials = new NetworkCredential(_ftpUsername, _ftpPassword);
            req.UseBinary = true;
            req.UsePassive = true;
            byte[] data = File.ReadAllBytes(fileName);
            req.ContentLength = data.Length;
            Stream stream = req.GetRequestStream();
            stream.Write(data, 0, data.Length);
            stream.Close();
            FtpWebResponse res = (FtpWebResponse)req.GetResponse();
            return res.StatusDescription;
        }

        public string DownloadFile(string FileNameToDownload)
        {
            string ResponseDescription = "";
            string PureFileName = new FileInfo(FileNameToDownload).Name;
            string DownloadedFilePath = _downloadReportPath + "/" + PureFileName;
            string downloadUrl = String.Format("{0}/{1}", _ftpReportPathUrl, FileNameToDownload);

            if (!Directory.Exists(_downloadReportPath))
            {
                Directory.CreateDirectory(_downloadReportPath);
            }

            if (File.Exists(DownloadedFilePath))
            {
                File.Delete(DownloadedFilePath);
            }

            FtpWebRequest req = (FtpWebRequest)FtpWebRequest.Create(downloadUrl);
            req.Method = WebRequestMethods.Ftp.DownloadFile;
            req.Credentials = new NetworkCredential(_ftpUsername, _ftpPassword);
            req.UseBinary = true;
            req.Proxy = null;
            try
            {
                FtpWebResponse response = (FtpWebResponse)req.GetResponse();
                Stream stream = response.GetResponseStream();
                byte[] buffer = new byte[2048];
                FileStream fs = new FileStream(DownloadedFilePath, FileMode.Create);
                int ReadCount = stream.Read(buffer, 0, buffer.Length);
                while (ReadCount > 0)
                {
                    fs.Write(buffer, 0, ReadCount);
                    ReadCount = stream.Read(buffer, 0, buffer.Length);
                }
                ResponseDescription = response.StatusDescription;
                fs.Close();
                stream.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return ResponseDescription;
        }
    }
}

using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using EntitiesMBDesign;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilitiesMBDesign;

namespace BusinessLogicMBDesign
{
    public class UploadToAwsService
    {
        private readonly IConfiguration _configuration;
        private readonly string _accesskey;
        private readonly string _secretkey;
        private readonly string _bucketName;
        public UploadToAwsService(IConfiguration configuration)
        {
            _configuration = configuration;

            _accesskey = _configuration.GetSection("AWSAccessKey").Value;
            _secretkey = _configuration.GetSection("AWSSecretAccessKey").Value;
            _bucketName = _configuration.GetSection("AWSS3BucketName").Value;
        }

        public ResultMessage DoUploadToAws(UploadFiles files)
        {
            var msg = new ResultMessage();
            RegionEndpoint bucketRegion = RegionEndpoint.APSoutheast2;

            //which we got these details , after user created in IAM Dashboard
            var s3Client = new AmazonS3Client(_accesskey, _secretkey, bucketRegion);

            var fileTransferUtility = new TransferUtility(s3Client);//create an object for TransferUtility

            try
            {
                ////creating object for    TransferUtilityUploadRequest
                //var fileTransferUtilityRequest = new TransferUtilityUploadRequest
                //{
                //    BucketName = _bucketName,
                //    FilePath = files.filePath,
                //    StorageClass = S3StorageClass.StandardInfrequentAccess,
                //    PartSize = files.fileSize, // 6 MB.  
                //    Key = files.fileName,//filename which u want to save in bucket
                //    CannedACL = S3CannedACL.PublicRead,
                //    //InputStream = fs,
                //};

                //fileTransferUtility.UploadAsync(fileTransferUtilityRequest).GetAwaiter().GetResult();

                ////To upload without asynchronous
                //fileTransferUtility.Upload(files.filePath, _bucketName, files.fileName);
                //fileTransferUtility.Dispose();

                //GetPreSignedUrlRequest request = new GetPreSignedUrlRequest();
                //request.BucketName = _bucketName;
                //request.Key = files.fileName;
                //request.Expires = DateTime.Now.AddMinutes(1);
                ////request.Protocol = Protocol.HTTPS;
                //string preSignedUrl = s3Client.GetPreSignedURL(request);

                //string url = preSignedUrl.Split("?")[0];

                msg.message = "File Uploaded Successfully!!";
                //msg.strResult = url;
                return msg;
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null &&
                    (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId")
                    ||
                    amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    msg.message = "Check the AWS Credentials.";
                    msg.isResult = false;
                    return msg;
                }
                else
                {
                    msg.message = amazonS3Exception.Message;
                    msg.isResult = false;
                    return msg;
                }
            }
            catch (Exception ex)
            {
                msg.message = "Error occurred: " + ex.Message;
                msg.isResult = false;
                return msg;
            }
        }
    }
}

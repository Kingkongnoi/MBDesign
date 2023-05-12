using System;
using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Amazon.S3.Model;
using EntitiesMBDesign;

namespace MBDesignApi.Controllers
{
    public static class UploadToAwsController
    {
        public static bool DoUploadToAws(SaleUploadFiles files)
        {
            var accesskey = System.Configuration.ConfigurationManager.AppSettings["AWSAccessKey"];//provide your details
            var secretkey = System.Configuration.ConfigurationManager.AppSettings["AWSSecretAccessKey"];
            RegionEndpoint bucketRegion = RegionEndpoint.APSouth1;
            var bucketName = System.Configuration.ConfigurationManager.AppSettings["AWSS3BucketName"];

            //which we got these details , after user created in IAM Dashboard
            var s3Client = new AmazonS3Client(accesskey, secretkey, bucketRegion);

            var fileTransferUtility = new TransferUtility(s3Client);//create an object for TransferUtility

            //string filePath = "F:\\audio.wav";//File location path

            //FileStream fs = File.Open(filePath, FileMode.Open);

            try
            {
                //creating object for    TransferUtilityUploadRequest
                var fileTransferUtilityRequest = new TransferUtilityUploadRequest
                {
                    BucketName = bucketName,
                    FilePath = files.filePath,
                    StorageClass = S3StorageClass.StandardInfrequentAccess,
                    PartSize = files.fileSize, // 6 MB.  
                    Key = files.fileName,//filename which u want to save in bucket
                    CannedACL = S3CannedACL.PublicRead,
                    //InputStream = fs,
                };
                fileTransferUtility.UploadAsync(fileTransferUtilityRequest).GetAwaiter().GetResult();

                //To upload without asynchronous
                //fileTransferUtility.Upload(filePath, bucketName, "SampleAudio.wav");
                //fileTransferUtility.Dispose();

                Console.WriteLine("File Uploaded Successfully!!");
                return true;
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null &&
                    (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId")
                    ||
                    amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    Console.WriteLine("Check the AWS Credentials.");
                    return false;
                }
                else
                {
                    Console.WriteLine("Error occurred: " + amazonS3Exception.Message);
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error occurred: " + ex.Message);
                return false;
            }
        }
    }
}

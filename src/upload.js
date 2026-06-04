const path = require('path');
const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Load root .env

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

async function uploadVideoToS3(filePath, jobId) {
  try {
    const fileStream = fs.createReadStream(filePath);
    const s3Key = `videos/${jobId}.mp4`;
    
    const params = {
      Bucket: process.env.S3_BUCKET_NAME || 'magic-mirror-prototype',
      Key: s3Key,
      Body: fileStream,
      ContentType: 'video/mp4'
    };

    console.log(`Uploading file ${filePath} to S3 bucket ${params.Bucket}...`);
    const uploadResult = await s3.upload(params).promise();
    
    // Construct CloudFront URL
    const cloudfrontDomain = process.env.CLOUDFRONT_DOMAIN || 'https://d34auvch2x824m.cloudfront.net';
    const cdnUrl = `${cloudfrontDomain}/${s3Key}`;
    
    console.log(`Successfully uploaded video! Public URL: ${cdnUrl}`);
    return cdnUrl;
  } catch (error) {
    console.error('Error uploading video file to S3:', error);
    throw error;
  }
}

module.exports = { uploadVideoToS3 };

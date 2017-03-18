/*
 * Retourne une URL Signée utilisable pour uploader un fichier sans authentifcation
 * Adapt to your need
 *
 * pour tester l'url :
 *  curl -v --upload-file myfile.ext $(node directupload.js)
 *  Ex:
 *   curl -v --upload-file doge.jpg $(node directupload.js)
 *
 * note: keyName represente l'objet s3 dans le bucket . pas le nom du fichier uploadé ;)
 * Le Plus, Pas besoin de modifier Le CORS du bucket :)
**/

// Load the SDK
var AWS = require('aws-sdk');

var options = {
  accessKeyId : 'CHANGE-ME',
  secretAccessKey : 'CHANGE_ME',
  signatureVersion : 'v4',
  sslEnabled : true,
  region : 'us-east-1'
};

// Create an S3 client
var s3 = new AWS.S3(options);

// Create a bucket and upload something into it
var bucketName = 'CHANGE-ME'
var keyName = 'test/direct_upload.jpg';

var params = {Bucket: bucketName, Key: keyName};
s3.getSignedUrl('putObject', params, function (err, url) {
    console.log(url);
});

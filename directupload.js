/*
 * Retourne une URL Signée utilisable pour uploader un fichier sans authentifcation
 * ce script utilise les credentials présent dans le fichier ~./aws/credentials
 * Example :
 * [default]
 * aws_access_key_id = hfgsjkfhslkdfjsdlkfj
 * aws_secret_access_key = kjsdhfjkdshfkj/3kdfksrjksdjhfkjsdhkfjjh*
 *
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

// Create an S3 client
var s3 = new AWS.S3();

// Create a bucket and upload something into it
var bucketName = 'node-sdk-sample-fe015502-c40b-4582-870d-5c7a0d8fd873';
var keyName = 'direct_upload.jpg';

var params = {Bucket: bucketName, Key: keyName};
s3.getSignedUrl('putObject', params, function (err, url) {
    console.log(url);
});

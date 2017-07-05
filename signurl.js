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

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " Key");
    process.exit(-1);
}

var param = process.argv[2];

// Create a bucket and upload something into it
var bucketName = 'gt-adminsys';
var keyName = 'backup/rethinkdb/produs/' + param;

var params = {Bucket: bucketName, Key: keyName, Expires: +86400};
//var params = {Bucket: bucketName, Key: keyName};
s3.getSignedUrl('getObject', params, function (err, url) {
    console.log(url);
});

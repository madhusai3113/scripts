/*
 +++++++++++++++++++++++
 +     NPM MODULES     +
 +++++++++++++++++++++++
 */
var fs = require('fs');
var parse = require('csv-parse');
const geoip = require('geoip-lite');
const maxmind = require('maxmind');


/*
 +++++++++++++++++
 +     MODEL     +
 +++++++++++++++++
*/

/*
 +++++++++++++++++++
 +     CONSTANT    +
 +++++++++++++++++++
 */

/*
 +++++++++++++++++++
 +     HELPERS     +
 +++++++++++++++++++
 */

/*
 ++++++++++++++++++
 +     ERRORS     +
 ++++++++++++++++++
 */

/*
 ++++++++++++++++++++++++++
 +     INITIALIZATION     +
 ++++++++++++++++++++++++++
 */


// var sleep = require('sleep');
var inputFile = '/home/madhusai/Downloads/zipValues.csv';



const csvData = [];
const queryArr = [];
fs.createReadStream(inputFile)
  .pipe(parse({delimiter: ','}))
  .on('data', function (csvrow) {
    csvData.push(csvrow);
  })
  .on('end', async function () {
    var mxd = await maxmind.open('/home/madhusai/Downloads/GeoLite2-City_20191029/GeoLite2-City.mmdb')
      for(i=1;i<csvData.length;i++){
        var email = csvData[i][2]
        var ip = csvData[i][5]
        var zip=''
        console.log(email,ip)
        if(ip.trim()){ 
            const obj =  mxd.get(ip)
            zip = obj && obj.postal && obj.postal.code || ''  
        }
        fs.appendFileSync("/home/madhusai/Downloads/zipEmailMapping.csv",email+","+zip+"\n");
        console.log(email,zip);
      }
  });


/*
 * "common.js" file to maintain all reusable functions 
 */
// "mkdirp" node module for make a new directory
var mkdirp = require('mkdirp');
// moment node module for date object
var m = require('moment');
// fs node module for file system operations
var fs = require("fs");
var fileName = './metadata.json';
var metadata = {};
// Capturing test suite statrt time
var testSuiteStartTime = m().format("MM/DD/YYYY HH:mm:ss");
metadata.testSuiteStartTime = testSuiteStartTime;

//Capturing Commandline arguments
var cmdLineFileData = 'protractor ';
process.argv.forEach(function(ele, index) {
    if (index > 1) {
        cmdLineFileData = cmdLineFileData + process.argv[index] + ' ';
    }
})

metadata.executionCommand = "protractor " + cmdLineFileData;
fs.writeFile(fileName, JSON.stringify(metadata), function(err) {
    // if (err) return err;
});

var Utility = function() {

    /*
     * Builds API url based on given arguments
     * @param {resource} API
     * @param {resourceKey}
     * @params {params}
     */
    this.getapiurl = function(resource, resourceKey, resourceKey1, params) {
        switch (resource.toUpperCase()) {
            case 'ABOUT':
                return (browser.params.apiurl + '/providers/about');
            case 'FACILITIES':
                return (browser.params.apiurl + '/providers/facilities/' + resourceKey + buildurl(params).slice(0, -1));
            case 'FACILITYLIST':
                return (browser.params.apiurl + '/providers/facilities/' + buildurl(resourceKey).slice(0, -1) + buildurl(params).slice(0, -1));
            case 'LOCATIONS':
                return (browser.params.apiurl + '/providers/locations/' + resourceKey + buildurl(params).slice(0, -1));
            case 'SUGGESTIONS':
                return (browser.params.apiurl + '/providers/suggestions' + buildurl(params).slice(0, -1));
            case 'PROVIDERKEY':
                return (browser.params.apiurl + '/providers/' + resourceKey + buildurl(params).slice(0, -1));
            case 'PROVIDERS':
                return (browser.params.apiurl + '/providers/' + buildurl(params).slice(0, -1));
            case 'INDEXER':
                return (browser.params.apiurl + '/providers/index/about');
            case 'YELP':
            case 'YELPDOWNLOAD':
            case 'YELPUPLOAD':
                return (browser.params.apiurl + '/providers/providers/yelp');
            case 'CLAIMID':
                return (browser.params.apiurl + '/claims' + '/' + resourceKey);
            case 'CLAIMS':
                return (browser.params.apiurl + '/enrollees' + '/' + resourceKey + '/claims');
            case 'FAMILYCONTRACT':
                return (browser.params.apiurl + '/persons' + '/' + resourceKey + '/contracts');
            case 'FAMILYENROLLEE':
                return (browser.params.apiurl + '/contracts' + '/' + resourceKey + '/enrollees' + buildurl(params).slice(0, -1));
            case 'USAGECONTRACT':
                return (browser.params.apiurl + '/contracts' + '/' + resourceKey + '/usages?custom-sort=true');
            case 'OMNIBUSCONTRACT':
                return (browser.params.apiurl + '/contracts' + '/' + resourceKey + '/rules/' + buildurl(params).slice(0, -1));
            case 'RULESVALIDATION':
                return (browser.params.apiurl + '/enrollees' + '/' + resourceKey + '/validation' + buildurl(params).slice(0, -1));
            case 'COSTCOMEMBER':
                return (browser.params.apiurl + '/costco/members' + '/' + resourceKey);
            case 'ADDRESSVALIDATE':
                return (browser.params.apiurl + '/addresses/validate');
            case 'BROKERVALIDATION':
                return (browser.params.apiurl + '/brokers' + '/' + resourceKey + buildurl(params).slice(0, -1));
            case 'CMSV2VALIDATIONGETCONTENTS':
                return (browser.params.apiurl + '/v2/contents' + '/' + buildurl(resourceKey).slice(0, -1));
            case 'CMSV2VALIDATIONDOWNLOADCONTENTS':
                return (browser.params.apiurl + '/v2/contents/download' + '/' + buildurl(resourceKey).slice(0, -1));
            case 'CMSV2VALIDATIONUPLOADCONTENTS':
                return (browser.params.apiurl + '/v2/contents/upload' + '/' + buildurl(resourceKey).slice(0, -1));
            case 'CMSV2VALIDATIONDELETECONTENTS':
                return (browser.params.apiurl + '/v2/contents' + '/' + buildurl(resourceKey).slice(0, -1));
            case 'PAYMENTVALIDATECREDITCARD':
                return (browser.params.apiurl + '/enrollees/' + resourceKey + '/payments/creditcard/validation');
            case 'D2CGETPAYMENTSTATUS':
                return (browser.params.apiurl + '/enrollees' + '/' + resourceKey + '/payments/' + resourceKey1 + '/status');
            case 'D2CPROCESSPAYMENTSERVICE':
                return (browser.params.apiurl + '/enrollees' + '/' + resourceKey + '/payments');
            case 'D2CPAYMENTSERVICE':
                return (browser.params.apiurl + '/enrollees/' + resourceKey + '/payments');
            case 'D2CPAYMENTSERVICEWITHCCTOKEN':
                return (browser.params.apiurl + '/enrollees/' + resourceKey + '/payments?auto-pay=' + resourceKey1);
            case 'POSTFINDPROVIDERS':
                return (browser.params.apiurl + '/providers');
            case 'POSTPROVIDERKEY':
                return (browser.params.apiurl + '/providers/' + resourceKey + buildurl(params).slice(0, -1));
            case 'POSTFACILITYID':
                return (browser.params.apiurl + '/providers/facilities/' + resourceKey + buildurl(params).slice(0, -1));
            case 'GETFAILEDPAYMENTS':
                return (browser.params.apiurl + '/enrollees/payments/failed');
            case 'GETACCOUNTDETAILS':
                return (browser.params.apiurl + '/enrollees/' + resourceKey + '/accounts' + buildurl(params).slice(0, -1));
            case 'GETBILLINGDETAILS':
                return (browser.params.apiurl + '/enrollees/' + resourceKey + '/billings' + buildurl(params).slice(0, -1));
            case 'ACCOUNTAUTOPAYCC':
                return (browser.params.apiurl + '/enrollees/' + resourceKey + '/accounts/autopay' + buildurl(params).slice(0, -1));
            case 'ACCOUNTAUTOPAYACH':
                return (browser.params.apiurl + '/enrollees/' + resourceKey + '/accounts/autopay' + buildurl(params).slice(0, -1));
            case 'DELETEPAYMENTMETHOD':
                return (browser.params.apiurl + '/enrollees/' + resourceKey + '/accounts/payment-methods/' + resourceKey1 + buildurl(params).slice(0, -1));
            case 'CANCELAUTOPAY':
                return (browser.params.apiurl + '/enrollees/' + resourceKey + '/accounts/payment-methods/' + resourceKey1 + buildurl(params).slice(0, -1));
            case 'ENROLLEECONTRACTS':
                return (browser.params.apiurl + '/enrollee-contracts');
            case 'ENROLLEECONTRACTBYCONTRACTID':
                return (browser.params.apiurl + '/enrollee-contracts/' + resourceKey);
            case 'PERSONID':
                return (browser.params.apiurl + '/persons/person/' + resourceKey);
            case 'PERSONS':
                return (browser.params.apiurl + '/persons');
            case "CONTRACTID":
                return (browser.params.apiurl + '/enrollee-contracts/' + resourceKey);
            case 'INVOICENUMBER':
                return (browser.params.apiurl + '/invoices/' + resourceKey);
            case 'GROUPNUMBER':
                return (browser.params.apiurl + '/groups/' + resourceKey);
            case "EMAIL":
                return (browser.params.apiurl + '/notification/email');
        }





        // function buildurl(o) {
        //     return Object.keys(o).reduce(function(previous, key) {
        //         return previous + key + '=' + o[key] + '&';
        //     }, '?');
        // }
        // return (browser.params.apiurl + buildurl(dataObj).slice(0, -1));

        // Builds url with params and consumed in getapiurl()  function
        function buildurl(o) {

            return Object.keys(o).reduce(function(previous, key) {
                // console.log("type" + typeof o[key]);
                if ((typeof o[key]) === 'object') {
                    var aa = specialty(key, o[key]);
                    // console.log("aa==" + aa);
                    var spl = previous + aa + '&';
                    return spl.slice(0, -1);
                } else {
                    // console.log("key + '=' + o[key] + '&'"+key + '=' + o[key] + '&')
                    return previous + key + '=' + o[key] + '&';
                }

            }, '?');
        }

        // This function is consumed in buildurl() function
        function specialty(k, vals) {
            return vals.reduce(function(p, c) {
                return p + k + '=' + c + '&';

            }, '')
        }


    }

    // Returns Date in specified format
    this.getDateFormatString = function(inputDate) {
        return (new Date(inputDate).getMonth() + 1) + '-' + new Date(inputDate).getDate() + '-' + new Date(inputDate).getFullYear();
    }

    // Used to capture time between two time stamps
    this.getDistanceBetweenTwoPoints = function(lat1, lon1, lat2, lon2, unit) {
        var theta = lon1 - lon2;
        var dist = Math.sin(lat1 * Math.PI / 180.0) * Math.sin(lat2 * Math.PI / 180.0) + Math.cos(lat1 * Math.PI / 180.0) * Math.cos(lat2 * Math.PI / 180.0) * Math.cos(theta * Math.PI / 180.0);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344;
        } else if (unit == "N") {
            dist = dist * 0.8684;
        }
        return (dist);
    }

    /*
     * To capture the duplicate items from an array 
     */
    this.getDuplicateElementsFromArray = function(arr) {
        let i;
        const len = arr.length;
        const result = [];
        const obj = {};
        for (i = 0; i < len; i++) {
            obj[arr[i]] = 0;
        }
        for (i in obj) {
            result.push(i);
        }
        return result;
    }

    /**
     * To generate a random number of given length
     * @param  {String} type (Number or String)
     * @param  {Number} length of the string required
     * @return {Number or String} returns number/string of length provided with random alphabets
     */
    this.randomNo = function(type, length) {
        try {
            var oresult = undefined;
            switch (type.toUpperCase()) {
                case 'STRING':
                    oresult = '';
                    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    for (var i = 0; i < length; i++) {
                        oresult = str.charAt(Math.floor(Math.random() * str.length)) + oresult;
                    }
                    logger.info('random string of length ' + length + ' for is :' + oresult);
                    break;
                case 'NUMBER':
                    var oresult = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
                    logger.info('random number of length ' + length + ' for is :' + oresult);
                    break;
                default:
                    oresult = undefined;
                    break;
            }
        } catch (err) {
            logger.info('ERROR', "Failed to retrieving text from alert due to " + err.message);
            return false;
        }

        return oresult;
    };

    /*
     * Renaming dashboardNGTA.html file to dashboardNGTA_timestamp.html and moving all results to previousResults directory
     * This function is used in reporter
     */
    this.renameReports = function(obj) {
        args = process.argv;
        args.forEach(function(e) {

            if (e.includes("subDir")) {
                console.log(e.split("=")[1]);
                sub = e.split("=")[1];
            } else {
                sub = 'subDirNameNotGiven'
            }
            if (e.includes("reportsBaseDir")) {

                root1 = e.split("=")[1];
            }
        })
        var resdir = root1 + '/' + sub;
        try {


            console.log("*********************renameReports*******************resdir******" + resdir)
            // if (fs.existsSync('./results/') == false) {
            //     mkdirp('./previousResults/', function(err) {});
            //     //  mkdirp('./results/', function(err) {});
            // }
            if (fs.existsSync(resdir) == false) {
                mkdirp(resdir, function(err) {
                    if (err) resdir = './previousResults'
                });
                //  mkdirp('./results/', function(err) {});
            }

            fs.writeFile(fileName, JSON.stringify(metadata), function(err) {
                // if (err) return console.log(err);
            });

            fs.readFile('./dashboardNGTA.html', 'utf8', function(err, data) {
                if (!err) {
                    data.replace(/LAST UPDATED AT:-(.*?)<\/h2><\/td>/g, function(
                        match,
                        datestring
                    ) {
                        dt = new Date(datestring)
                        sd = m(dt).format('YYYY-MM-Do-h-mm-ss');
                        console.log(sd);
                        fs.copyFile('./dashboardNGTA.html', resdir + '/dashboardNGTA_' + sd + '.html', function(err) {
                            if (err) throw err;
                        });

                    });
                }
                // fs.rename('./results', './previousResults/results_' + m().format('YYYY-MM-Do-h-mm-ss'), function(err) {
                //     //    if (err) throw err;
                // });
            });
        } catch (err) {
            if (err) throw err;
        }
    }
}

module.exports = Utility;
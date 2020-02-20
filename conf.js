/*****************************************************************
 *  conf.js  This is the default protractor execution 
 *  configuration file.  
 */


var mkdirp     = require('mkdirp');
var rmdir      = require('rimraf');
var path       = require("path");
var suitesFile = require('./suites.js');
var fs         = require("fs");
var m          = require('moment');
var cmd        = require('node-cmd');
var q          = require('q');
var util       = new(require("./integration/utils/common.js"));
// util.renameReports();
rmdir('./results', function(err) {}); // Removing results
exports.config = {
    framework: 'jasmine2',
    suites   : suitesFile.suitesCollection,
    //sauce configuration
  //  sauceUser: process.env.SAUCE_USERNAME,
   // sauceKey: process.env.SAUCE_ACCESS_KEY,
   // sauceSeleniumAddress: 'ondemand.saucelabs.com/wd/hub',
      // seleniumServerJar: './node_modules/webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar',
      // seleniumPort: 4444,
      // seleniumAddress: 'http://localhost:4444/wd/hub',
    // 5/23/18 Mark needs this here 
    // Should run without, but sometimes is necessary 
    // when some expecptions are keeping it from running
    // Comment out when not needed.
    ignoreUncaughtExceptions: true,



    // chrome capabilities
    capabilities: {
        browserName  : 'chrome',
        chromeOptions: {
            'args': ["disable-infobars", "--headless", "--disable-gpu", "--window-size=800x600"]  // Enabling script execution in headless mode

        }

    },

    // Params to accept commandline argumentss

    params: {
        // exeLogging : 'OFF',
        testDataEnv: '',
        apiurl     : '',
       // testReportName: 'testReport_' + m().format('MM_DD_YYYY_h_mm_ss') + '.html'
        testReportName: 'testReport_' + '.html'
    },

    onPrepare: function () {
        minWait      = 75;
        maxWait      = 500;
        longWait     = 10000;
        PAGELOADTIME = 600000;

        /******************************************************************
         *  Control over where the test data is pulled from 
         *  In near future the separation of DIT and MOT test data
         *  will not exist
         */
        testDataEnv = browser.params.testDataEnv;

        /******************************************************************
         *  Renames the test report as per the service name passed from package.json file
         */
        // this.testReportName = browser.params.testReportName + '-' + m().format('MM_DD_YYYY-h_mm_ss') + '.html';
        this.testReportName = browser.params.testReportName +  '.html';
        /******************************************************************
         *  Needs an explanation
         *  why do we keep both maximize and setSize 1050 1250 in the same
         *  file
         */
        if (browser.params.apiurl.includes('https')) process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        /*Naresh -
         * Instead of setting browser size by pixels, we can call maximize() method.It setthe browser based on current machine screen resolution
         * Mark added "browser.manage().window().setSize(1050, 1250); statement":  Right !  Mark knows this.  Mark didn't want to have his screen
         * realestate consumed completely so he implemented the 1050, 1250 valurs.  What he didn't understand was why you kept both uncommented 
         * I found the file committed to the repo with both values in action.  Seems like only one should be active.  
         * Maybe somethign for another one of those external config files ...... : )
         */
        // browser.manage().window().maximize();
        browser.manage().window().setSize(1050, 1250);
        browser.ignoreSynchronization = true;

        /******************************************************************
         * Override the jasmine matchers to capture expected and actual values
         * Implemented some custom matchers to ignoring the case
         */
        custommatcher = require('./integration/utils/custom_matcher.js');

        /******************************************************************
         * Framework level reusable functions implemented in common.js file
         */
        Utility = new(require("./integration/utils/common.js"));

        /******************************************************************
         * "assert" node module used in Frisby framework for assertions. 
         */
        assert = require('assert');

        /******************************************************************
         * "frisby" node module is used to test REST api calls
         */
        frisby = require('frisby');

        /******************************************************************
         * "Joi" is one of the module in frisby framework.
         * Using this we can validate fields data types in REST api call response
         */
        Joi = frisby.Joi;

        /******************************************************************
         * "moment" is the date library. 
         * Using this we can get date and time in required format
         */
        moment = require('moment');

        /******************************************************************
         *  Adding timeout in frisby global
         */
        frisby.globalSetup({
            request: {
                headers: {
                    'content-type': 'application/json'
                },

                timeout: (600000)

            }
        });

        /******************************************************************
         *  "jasmine-data-provider" is used to iterate the set of 
         * statements based on given dataset.
         * This is Key to all UT testing across multiple locations 
         * and  Multiple Client location, Multiple User scenarios
         * Even bigger, this is how we control scalability content testing.
         */
        dataProvider = require('jasmine-data-provider');

        //=============Log4Js Configuration Start =========Disabling Log4js for debugging 
        // log4js = require('log4js');
        // log4js.configure({
        //     appenders: [
        //         { type: 'console' },
        //         { type: 'file', filename: 'results/logs/executionLog.log', category: 'DeltaDental' }
        //     ]
        // });
        // logger = log4js.getLogger('DeltaDental');
        // logger.setLevel(browser.params.exeLogging);
        //=============Log4Js Configuration End =========//
        //=============Jasmine Logger Started =========//
        // var JasmineLogReporter = require('./integration/utils/jasmine-log-reporter');
        // jasmine.getEnv().addReporter(new JasmineLogReporter());
        //=============Jasmine Logger End=========//

        /******************************************************************
         *  Needs an explanation
         */
        // Naresh - Generating spec level reports with clear 
        //=============Jasmine Report Start =========//
        var Jasmine2HtmlReporter = require('./integration/utils/delta-protractor-jasmine2-html-reporter');
        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath          : './results/',
            takeScreenshots   : false,
            ignoreSkippedSpecs: false,
            consolidate       : true,
            consolidateAll    : false,
            preserveDirectory : false,
            filePrefix        : '_' + moment().format('YYYY-MM-Do-h-mm-ss-a'),
            fileName          : 'TestReport',

        }));

        //=============Jasmine Report End =========//  
        
      //  Added the following reporter so that we see Pass and Fail details simultaneously while executing the tests

        //=============Jasmine Report End =========//

        // Shounak: Added the following reporter so that we see Pass and Fail details simultaneously while executing the tests

        var SpecReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(new SpecReporter({
            displayFailuresSummary: true,
            displayFailuredSpec   : true,
            displaySuiteNumber    : true,
            displaySpecDuration   : true

        }));
 

    },


    /******************************************************************
    /* Below block will execute one time, after completion of each spec file execution
     * dashBoard.js file generated the consolidated report. 
     */
    afterLaunch: function (exitCode) {
         console.log("=====================Dash Board Report Generated====================");
        return q.fcall(function() {
            cmd.get('node dashBoard.js', function() {
          //      util.renameReports();
                fs.rename('./sauce.html', testReportName, function(err) {
                    if ( err ) {
                        console.log('ERROR while renaming sauce.html: ' + err);
                    } else {
                        console.log('Test Report generated with name : ' + testReportName);
                    }
                });
            });
        }).delay(6000);
    },



    /******************************************************************
     * Generates the default jasmine report in .json format. 
     * This is to be kept in place regardless of the reporting modules
     * we develop or implement.
     */
    resultJsonOutputFile: 'results.json',

    // Jasmine framework options
    jasmineNodeOpts: {
        showColors            : true,   // Use colors in the command line report.
        defaultTimeoutInterval: 600000

    }

}
/* ****************************************************************************************
 * Uncomment testRunRptInternals()
 * in order to capture Start time, Test Server, Test Host Command Line arguments, etc
 * Note: This is the proper location right after the last closing brace for this to
 * run correctly. This is the basis of Marks Reporting
 ******************************************************************************************/
// testRunRptInternals();

//How to Run Script

// npm run brokerValidationDIT -- --suite=brokerValidationAPI --params.subDir=brokerValidationAPI

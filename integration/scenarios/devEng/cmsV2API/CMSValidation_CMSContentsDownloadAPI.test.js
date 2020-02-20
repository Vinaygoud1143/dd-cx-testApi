'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/cmsV2API/CMSValidation_CMSContentsDownloadAPI.json');
var TestDescriptions = require('../../../descriptions/devEng/cmsV2API/CMSValidation_CMSContentsDownloadAPI_desc.json');

// CMS Download Service API giving "Valid Header and Valid Criteria" and response body with "CMS service details JSON data set".
describe('CMS Validation Download API - Download CMS Details API by giving Valid ApplicationNameContentTypeTenantNameAndCriteria and requesting to download the cms information :  ', function() {


    dataProvider(TestData.Scenariospositive, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;

        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenariospositive[scenario]['TC-1'] + "  ApplicationName: " + data.headers.APPLICATION_NAME + "  Content Type: " + data.headers.CONTENT_TYPE + "TenantName: " + data.headers.TENANT_NAME + "", function(doneFn) {
            let apiurl = Utility.getapiurl('CMSV2VALIDATIONDOWNLOADCONTENTS', data.request);
            frisby.setup({
                    request: {
                        headers: {
                            'applicationName': data.headers.APPLICATION_NAME,
                            'contentType': data.headers.CONTENT_TYPE,
                            'tenantName': data.headers.TENANT_NAME,
                            'Content-Type': 'application/json'
                        }
                    }

                }).post(apiurl)
                .then(function(res) {
                  respjson = res.json;
                  if (res.status == 200) {
                      expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                      resstatus = res.status;
                  } 
                        
                }).done(doneFn);
        });
    });
});

// CMS Download Service API giving "Missing Header and Valid Criteria" and response body with "error JSON Data Set".
describe('CMS Negative Validation API - Download CMS Details API by giving Valid EmptyApplicationName,ContentTypeTenantNameAndCriteria and requesting to download the cms information :  ', function() {


    dataProvider(TestData.Scenariosnegative, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;

        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenariosnegative[scenario]['TC-1'] + "  ApplicationName: " + data.headers.APPLICATION_NAME + "  Content Type: " + data.headers.CONTENT_TYPE + "TenantName: " + data.headers.TENANT_NAME + "", function(doneFn) {
            let apiurl = Utility.getapiurl('CMSV2VALIDATIONDOWNLOADCONTENTS', data.request);
            frisby.setup({
                    request: {
                        headers: {
                            'applicationName': data.headers.APPLICATION_NAME,
                            'contentType': data.headers.CONTENT_TYPE,
                            'tenantName': data.headers.TENANT_NAME,
                            'Content-Type': 'application/json'
                        }
                    }

                }).post(apiurl)
             .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode);
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + + TestDescriptions.Scenariosnegative[scenario]['TC-1']  + "", function() {
            if (resstatus == 500) {
                expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode);                
                expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription);
            } else if (resstatus == 401 || resstatus == 400 || resstatus == 403 ) {
                expect(respjson.message).toEqual(data.verify['TC-2'].message);
                expect(respjson.error).toEqual(data.verify['TC-2'].error);
            }
        });        
    });
});

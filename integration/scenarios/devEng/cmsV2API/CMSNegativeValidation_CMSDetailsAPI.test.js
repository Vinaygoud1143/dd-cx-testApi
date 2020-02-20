'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/cmsV2API/CMSNegativeValidation_CMSDetailsAPI.json');
var TestDescriptions = require('../../../descriptions/devEng/cmsV2API/CMSNegativeValidation_CMSDetailsAPI_desc.json');

// CMS Detail Service API giving "Missing Header and Valid Criteria" and response body with "error JSON Data Set".
describe('CMS Negative Validation API - CMS Details API by giving Wrong ApplicationNameContentTypeTenantNameAndCriteria and requesting to view the cms information :  ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + "  ApplicationName: " + data.headers.APPLICATION_NAME + "  Content Type: " + data.headers.CONTENT_TYPE + "TenantName: " + data.headers.TENANT_NAME + "", function(doneFn) {
            let apiurl = Utility.getapiurl('CMSV2VALIDATIONGETCONTENTS', data.request);
            frisby.setup({
                    request: {
                        headers: {
                            'APPLICATION_NAME': data.headers.APPLICATION_NAME,
                            'CONTENT_TYPE': data.headers.CONTENT_TYPE,
                            'TENANT_NAME': data.headers.TENANT_NAME,
                            'Content-Type': 'application/json'
                        }
                    }
                }).get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.Scenarios[scenario]['TC-2'] + "", function() {
            
            if (resstatus == 500) {

                expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode);
                expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription);
                expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription);

            }
        });
    });
});
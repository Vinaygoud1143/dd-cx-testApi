'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/UsageAPI/UsageServiceAPIDefect.json');
var TestDescriptions = require('../../../descriptions/devEng/UsageAPI/UsageServiceAPIDefect_desc.json');

// Usage API giving "Valid Contract-Id And Headers" and response body with "Usage service details JSON data set".
describe('Usage API -Validation of Defects & Bugs  : ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + " contract-id: " + data.request['contract-id'] + "  PersonID: " + data.headers.personId + "  Client Key: " + data.headers.ClientKey + "", function(doneFn) {
            let apiurl = Utility.getapiurl('USAGECONTRACT', data.request['contract-id']);
            frisby
                .setup({
                    request: {
                        headers: {
                            'PersonId': data.headers.personId,
                            'ClientKey': data.headers.ClientKey,
                            'Content-Type': 'application/json'
                        }
                    }
                })
                .get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode,"Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });


        it(scenario + ",Test Case-2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {

                respjson.forEach(function(resp, index) {
                    data.verify['TC-2'].forEach(function(vdata, index) {

                        if (resp.memberInfo.personId == vdata.personId && resp.usageInfo == null) {

                            expect(resp.memberInfo.personId).toEqual(vdata.memberInfo.personId, "Verify memberInfo.personId from API Response is equal to expected memberInfo.personId.");
                            expect(resp.memberInfo.memberName).toEqual(vdata.memberInfo.memberName, "Verify memberInfo.memberName from API Response is equal to expected memberInfo.memberName.");

                        }

                    })


                })


            }
            if (resstatus == 500) {
                       
                expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode);
                expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription);
                expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription);
        }
        });
        
    });
});
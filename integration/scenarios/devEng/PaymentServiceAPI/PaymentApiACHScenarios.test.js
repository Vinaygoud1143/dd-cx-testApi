'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/PaymentServiceAPI/PaymentApiACHScenarios.json');
var TestDescriptions = require('../../../descriptions/devEng/PaymentServiceAPI/PaymentApiACHScenarios_desc.json');

// Payment Service Processing ACH Payment request to make payment using RMB Service
describe('Process payment API for ACH Payment Request  :  ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + "", function(doneFn) {
            let apiurl = Utility.getapiurl('D2CPAYMENTSERVICE', data.params.enrolleeId);
            frisby.setup({
                    request: {
                        headers: {
                            'PersonId': data.headers.PersonId,
                            'ClientKey': data.headers.ClientKey,
                            'Content-Type': 'application/json'
                        }
                    }
                }).post(apiurl, data.request)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.Scenarios[scenario]['TC-2'] + "", function() {
             if (resstatus == 200) {
                expect(respjson.enrolleeId).toEqual(data.verify['TC-2'].enrolleeId);
            }
            if (resstatus == 400) {
                expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode);
                expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription);
                expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription);

            }
        });


    });
}); 
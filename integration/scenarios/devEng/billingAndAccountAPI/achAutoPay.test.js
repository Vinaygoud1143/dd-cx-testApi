'use strict';
const Joi = frisby.Joi;
var TestData = require('../../../testData/devEng/' + testDataEnv + '/billingAndAccountAPI/achAutoPay.json');
var TestDescriptions = require('../../../descriptions/devEng/billingAndAccountAPI/achAutoPay_desc.json');


// ACCOUNT AUTO PAY With ACH Type And Checking The Valid Response STATUS".
describe('Accounts & Billing API to enable ACH autopay :', function() {
    dataProvider(TestData.Scenarios, function(data, scenario) {
        var respjson, resstatus;
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + "  PersonID: " + data.headers.PersonId + "  Client Key: " + data.headers.ClientKey + "", function(doneFn) {    
            let apiurl = Utility.getapiurl('ACCOUNTAUTOPAYACH', data['path-params'].enrolleeId, "", "");
              frisby
                .setup({
                    request: {
                        headers: {
                            'PersonId': data.headers.PersonId,
                            'ClientKey': data.headers.ClientKey,
                            'Content-Type': 'application/json'
                        }
                    }
                })
                .post(apiurl, data.request)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode);
                    resstatus = res.status;
                }).done(doneFn);
          });

        it(scenario + ",Test Case 2:-" + TestDescriptions.Scenarios[scenario]['TC-2'] + "", function() {
           
             if (resstatus == 400 || resstatus == 500 || resstatus == 401) {

                if (data.verify['TC-2'].errorCode !== undefined && data.verify['TC-2'].shortDescription !== undefined && data.verify['TC-2'].detailedDescription !== undefined) {
                    expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode);
                    expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription);
                    expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription);

                }


                if (data.verify['TC-2'].error !== undefined && data.verify['TC-2'].message !== undefined) {
                    expect(respjson.error).toEqual(data.verify['TC-2'].error);
                    expect(respjson.message).toEqual(data.verify['TC-2'].message);
                }
                }
        });
    });
});


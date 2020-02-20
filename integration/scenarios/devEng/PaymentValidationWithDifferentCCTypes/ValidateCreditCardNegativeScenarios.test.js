'use strict'; 
const Joi = frisby.Joi; 
var TestData = require('../../../testData/devEng/' + testDataEnv + '/PaymentValidationWithDifferentCCTypes/ValidateCreditCardNegativeScenarios.json');
var TestDescriptions = require('../../../descriptions/devEng/PaymentValidationWithDifferentCCTypes/ValidateCreditCardNegativeScenarios_desc.json');

// D2C  Payment Service to check Difeferent Types Of Credit Card Validations Negative".
describe('Credit Card Validate API With Difeferent Types Of Validate CreditCard Details Negative Scenarios:', function() {
    dataProvider(TestData.Scenarios, function(data, scenario) {
        var respjson, resstatus;
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it(scenario + ",Test Case 1:-" + TestDescriptions.ValidateCreditCardAPIScenarios[scenario]['TC-1'] + "", function(doneFn) {
            let apiurl = Utility.getapiurl('PAYMENTVALIDATECREDITCARD', data.params.enrolleeId);
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
                .post(apiurl, data.request)
                .then(function(res) {
                    respjson = res.json;
                    // console.log("**************JSON.stringify(respjson)------"+JSON.stringify(respjson));
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode);
                    resstatus = res.status;
                }).done(doneFn);
        });

     it(scenario + ",Test Case 2:-" + TestDescriptions.ValidateCreditCardAPIScenarios[scenario]['TC-2'] + "", function() {
            
            if (resstatus == 400 || resstatus == 500) {
                expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode);
                expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription);
                expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription);              

            }
        });

    });
});
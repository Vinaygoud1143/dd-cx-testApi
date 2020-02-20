'use strict'; 
const Joi = frisby.Joi; 
var TestData = require('../../../testData/devEng/' + testDataEnv + '/PaymentServiceAPI/ValidateCreditCardScenarios.json');
var TestDescriptions = require('../../../descriptions/devEng/PaymentServiceAPI/ValidateCreditCardScenarios_desc.json');

// D2C  Payment Service to check Credit Card Validations".
describe('Credit Card Validate API - Validate CreditCard Details :', function() {
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
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode);
                    resstatus = res.status;
                }).done(doneFn);
        });

     it(scenario + ",Test Case 2:-" + TestDescriptions.ValidateCreditCardAPIScenarios[scenario]['TC-2'] + "", function() {
            
            if (resstatus == 200) {
                if(data.verify['TC-2'].encryptedToken!==undefined) expect(respjson.encryptedToken).toEqual(data.verify['TC-2'].encryptedToken);
                expect(respjson.cardType).toEqual(data.verify['TC-2'].cardType);
                expect(respjson.nameOnCard).toEqual(data.verify['TC-2'].nameOnCard);
                expect(respjson.expiryDate).toEqual(data.verify['TC-2'].expiryDate);             
                expect(respjson.last4Digits).toEqual(data.verify['TC-2'].last4Digits);
                                 
            } else if (resstatus == 400 || resstatus == 500 || resstatus == 401) {
                expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode);
                expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription);
                expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription);              

            }
        });

    });
});
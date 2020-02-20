'use strict';
const Joi = frisby.Joi;
const fs = require('fs');
const path = require('path')
var TestData = require('../../../testData/devEng/' + testDataEnv + '/PaymentServiceAPI/PaymentApiCreditCardNegativeScenarios.json');
var TestDescriptions = require('../../../descriptions/devEng/PaymentServiceAPI/PaymentApiCreditCardNegativeScenarios_desc.json');

// Payment Service POSTing CreditCard Information For Negative Scenarios
describe('Process Payment API for Invalid CreditCard Payment Request - Making Payment with CreditCard details in Negative Scenarios :  ', function() {


    dataProvider(TestData.PaymentNegativeScenariosWithCreditCard, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;

        it(scenario + ",Test Case 1:-" + TestDescriptions.PaymentNegativeScenariosWithCreditCard[scenario]['TC-1'], function(doneFn) {
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


        it(scenario + ",Test Case 2:-" + TestDescriptions.PaymentNegativeScenariosWithCreditCard[scenario]['TC-2'] + "", function() {

            if (resstatus == 400 || resstatus == 500 || resstatus == 401 || resstatus == 404) {

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
'use strict';
const Joi = frisby.Joi;
const fs = require('fs');
const path = require('path')
var TestData = require('../../../testData/devEng/' + testDataEnv + '/PaymentServiceAPI/PaymentApiCreditCardTokenNegativeScenarios.json');
var TestDescriptions = require('../../../descriptions/devEng/PaymentServiceAPI/PaymentApiCreditCardTokenNegativeScenarios_desc.json');

// Payment Service Negative Scenarios With CreditCardToken PaymentType
describe('Process Payment API for CreditCardToken Payment Type Negative Scenarios:  ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;

        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('D2CPAYMENTSERVICEWITHCCTOKEN', data.params.enrolleeId, data.params.autoPay);
            frisby.setup({
                    request: {
                        headers: {
                            'PersonId'    : data.headers.PersonId,
                            'ClientKey'   : data.headers.ClientKey,
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
                if(respjson.correlationId!==undefined ){
                    expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode);
                    expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription);
                    expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription);
                }

                else{
                    expect(respjson.error).toEqual(data.verify['TC-2'].error);
                    expect(respjson.message).toEqual(data.verify['TC-2'].message);
                }
        });
    });
});
    
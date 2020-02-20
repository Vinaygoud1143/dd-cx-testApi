'use strict';
const Joi = frisby.Joi;
const fs = require('fs');
const path = require('path')
var TestData = require('../../../testData/devEng/' + testDataEnv + '/PaymentServiceAPI/PaymentProcessUsingCreditCardWithToken.json');
var TestDescriptions = require('../../../descriptions/devEng/PaymentServiceAPI/PaymentProcessUsingCreditCardWithToken_desc.json');

//Payment Process Using CreditCard With Token To Make Payment
describe('Process Payment Using CreditCard With Token :  ', function() {

    var respjson, resstatus;
    dataProvider(TestData.Scenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        

        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('D2CPAYMENTSERVICE', data.params.enrolleeId);
           
            if(respjson!==undefined && respjson!="" && respjson.requestReferenceId!==undefined){
                apiurl = Utility.getapiurl('D2CGETPAYMENTSTATUS', data.params.enrolleeId, respjson.requestReferenceId);

                frisby.setup({
                    request: {
                        headers: {
                            'PersonId'    : data.headers.PersonId,
                            'ClientKey'   : data.headers.ClientKey,
                            'Content-Type': 'application/json'
                        }
                    }
                }).get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
            } else{
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
            }
        });
        
        if(TestDescriptions.Scenarios[scenario]['TC-2']!==undefined){
            it(scenario + ",Test Case 2:-" + TestDescriptions.Scenarios[scenario]['TC-2'] + "", function() {
                if (resstatus == 200) {
                    expect(respjson.status).toEqual(data.verify['TC-2'].status);
                    expect(respjson.nameOnCard).toEqual(data.verify['TC-2'].nameOnCard);
                    expect(respjson.amountCharged).toEqual(data.verify['TC-2'].amountCharged);
                    expect(respjson.last4Digits).toEqual(data.verify['TC-2'].last4Digits);
                    // expect(respjson.numberOfRetries).toEqual(data.verify['TC-2'].numberOfRetries);
                    expect(respjson.message).toEqual(data.verify['TC-2'].message);
                }
            });
        }
     
    });
});

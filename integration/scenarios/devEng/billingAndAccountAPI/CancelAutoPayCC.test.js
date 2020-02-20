'use strict';
const Joi = frisby.Joi;
var TestData = require('../../../testData/devEng/' + testDataEnv + '/billingAndAccountAPI/CancelAutoPayCC.json');
var TestDescriptions = require('../../../descriptions/devEng/billingAndAccountAPI/CancelAutopayCCScenarios_desc.json');

// Accounts & Billing Service - CANCEL/DELETE API to CANCEL payment method of given paymentMethodI".
describe('Accounts & Billing API to cancel AutpPay CC :', function() {
    dataProvider(TestData.Scenarios, function(data, scenario) {
        var respjson, resstatus;
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + "  PersonID: " + data.headers.PersonId + "  Client Key: " + data.headers.ClientKey + "", function(doneFn) {
            let apiurl = Utility.getapiurl('CANCELAUTOPAY', data['path-params'].enrolleeId,data['path-params'].paymentMethodId, data['query-params']);
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
                .del(apiurl)
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

describe('Accounts & Billing API to check CC AutoPay status  :', function() {
    dataProvider(TestData.ACCOUNTS_API_SCENARIOS_CC, function(data, scenario) {
        var respjson, resstatus;
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        
        it(scenario + ",Test Case 1:-" + TestDescriptions.ACCOUNTS_API_SCENARIOS_CC[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('GETACCOUNTDETAILS', data['path-params'].enrolleeId, '', data['query-params']);
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
                .get(apiurl, data.request)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode);
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.ACCOUNTS_API_SCENARIOS_CC[scenario]['TC-2'] + "", function() {
                
                     
       if (resstatus == 200 ) {
        var account = respjson.account.paymentMethod.creditCard[0];
        expect(account.savedPaymentId).toEqual(data.verify['TC-2'].savedPaymentId);
        
                    expect(account.last4Digits).toEqual(data.verify['TC-2'].last4Digits);
                    expect(account.expiryDate).toEqual(data.verify['TC-2'].expiryDate); 
                    expect(account.nameOnCard).toEqual(data.verify['TC-2'].nameOnCard);
                    expect(account.cardType).toEqual(data.verify['TC-2'].cardType);
                    expect(account.encryptedToken).toEqual(data.verify['TC-2'].encryptedToken);
                    
                 if (account.active==false){
          expect(account.active).toEqual(data.verify['TC-2'].active);
           } else if (resstatus == 500){}
      }
             
            });
    });
});
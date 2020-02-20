'use strict';
const Joi = frisby.Joi;
var TestData = require('../../../testData/devEng/' + testDataEnv + '/billingAndAccountAPI/DeletePaymentMethodAPI.json');
var TestDescriptions = require('../../../descriptions/devEng/billingAndAccountAPI/DeletePaymentMethodAPI_desc.json');

// Accounts & Billing Service - DeletePaymentMethod API to delete payment method of given paymentMethodI".
describe('Accounts & Billing API to delete payment method of given paymentMethodId :', function() {
    dataProvider(TestData.Scenarios, function(data, scenario) {
        var respjson, resstatus;
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + "  PersonID: " + data.headers.PersonId + "  Client Key: " + data.headers.ClientKey + "", function(doneFn) {
            let apiurl = Utility.getapiurl('DELETEPAYMENTMETHOD', data['path-params'].enrolleeId,data['path-params'].paymentMethodId, data['query-params']);
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
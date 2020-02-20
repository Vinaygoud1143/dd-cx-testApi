'use strict';
const Joi = frisby.Joi;
var TestData = require('../../../testData/devEng/' + testDataEnv + '/PaymentServiceAPI/AdminFailedPaymentsAPI.json');
var TestDescriptions = require('../../../descriptions/devEng/PaymentServiceAPI/AdminFailedPaymentsAPI_desc.json');

// D2C  Payment Service to check get payment status".
describe('D2C Admin API to display FailedPayments :', function() {
    dataProvider(TestData.Scenarios, function(data, scenario) {
        var respjson, resstatus;
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + "  PersonID: " + data.headers.PersonId + "  Client Key: " + data.headers.ClientKey + "", function(doneFn) {
            let apiurl = Utility.getapiurl('GETFAILEDPAYMENTS', '', '', '');
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

        it(scenario + ",Test Case 2:-" + TestDescriptions.Scenarios[scenario]['TC-2'] + "", function() {
            if (resstatus == 200) {

                respjson.forEach(function(failedPayment, index) {
                    expect(failedPayment.status).toEqual(data.verify['TC-2'].status);
                    expect(failedPayment.numberOfRetries).toBeGreaterThan(10);
                })

            }
        });

    });
});
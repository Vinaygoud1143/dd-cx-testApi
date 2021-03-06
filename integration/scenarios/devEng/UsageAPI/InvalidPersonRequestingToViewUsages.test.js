'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/UsageAPI/InvalidPersonRequestingToViewUsage.json');
var TestDescriptions = require('../../../descriptions/devEng/UsageAPI/InvalidPersonRequestingToViewUsages_desc.json');

// Usage API giving "Invalid Person-Id" and response body with "error JSON Data Set".
describe('Usage API -Invalid Person  Requesting To View Usage Of All Members : ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
    beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;
        
        
        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + " contract-id: " + data.request['contract-id'] + "  PersonID: " + data.headers.personId + "  Client Key: " + data.headers.ClientKey + "", function(doneFn) {
            let apiurl = Utility.getapiurl('USAGECONTRACT', data.request['contract-id']);
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
                .get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode);
                    resstatus = res.status;
                }).done(doneFn);
        });


        it(scenario + ",Test Case-2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {
            if (resstatus == 500) {
                expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode);
                expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription);
                expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription);

            }
        });
    });
});
'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/UsageAPI/Primary_Adult_Child_MemberRequestingToViewTheUsageOfAllMembersHeIsNotInContract.json');
var TestDescriptions = require('../../../descriptions/devEng/UsageAPI/Primary_Adult_Child_MemberRequestingToViewTheUsageOfAllMembersHeIsNotInContract_desc.json');

// Usage API giving "Valid Contract-Id And Headers" and response body with "Usage service details JSON data set".
describe('Usage API -Primary & Adult & Child Member Requesting To View Usage Of All Members He is Not Part of The Contract :  ', function() {


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
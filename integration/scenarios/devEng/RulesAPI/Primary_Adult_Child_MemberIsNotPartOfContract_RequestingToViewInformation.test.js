'use strict';
const Joi = frisby.Joi;

var TestData         = require('../../../testData/devEng/' + testDataEnv + '/RulesAPI/Primary_Adult_Child_MemberIsNotPartOfContract_RequestingToViewInformation.json');
var TestDescriptions = require('../../../descriptions/devEng/RulesAPI/Primary_Adult_Child_MemberIsNotPartOfContract_RequestingToViewInformation_desc.json');

// Business Rules API giving "Valid Contract-Id And Headers" and response body with "error JSON Data Set".
describe('Business Rules API - Primary & Adult & Child Member are not part of contract and Requesting to view information Details of All Members:  ', function() {
    dataProvider(TestData.Scenarios, function(data, scenario) {

        var respjson, resstatus;
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + " contract-id: " + data.request['contract-id'] +"rule-types"+data.params['rule-types'] +"  PersonID: " + data.headers.personId + "  Client Key: " + data.headers.ClientKey + "", function(doneFn) {
            let apiurl = Utility.getapiurl('OMNIBUSCONTRACT', data.request['contract-id'], '', data.params);
            frisby
                .setup({
                    request: {
                        headers: {
                            'PersonId'    : data.headers.personId,
                            'ClientKey'   : data.headers.ClientKey,
                            'Content-Type': 'application/json'
                        }
                    }
                })
                .get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode,"Verify the API response with status code");
                    resstatus = res.status;
                }).done(doneFn);
        });


        
        it(scenario + ",Test Case-2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {
            if (resstatus == 401 || resstatus == 404) {
                expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode,"verify the API response with the error code");
                expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription,"verify the API response with the shortDescription");
                expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription,"verify the API response with the detailedDescription");
            }
        });
    });
});
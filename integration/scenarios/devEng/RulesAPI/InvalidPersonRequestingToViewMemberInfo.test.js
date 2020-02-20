'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/RulesAPI/InvalidPersonRequestingToViewMemberInfo.json');
var TestDescriptions = require('../../../descriptions/devEng/RulesAPI/InvalidPersonRequestingToViewMemberInfo_desc.json');

// Business Rules API giving "Invalid Contract-Id" and response body with "error JSON Data Set".
describe('Business Rules API - Invalid Person requesting to view the members information :  ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
    beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;
        
        
        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + " contract-id: " + data.request['contract-id'] + "rule-types"+data.params['rule-types'] +"  PersonID: " + data.headers.personId + "  Client Key: " + data.headers.ClientKey + "", function(doneFn) {
            let apiurl = Utility.getapiurl('OMNIBUSCONTRACT', data.request['contract-id'],'',data.params);
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
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode,"Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });


        it(scenario + ",Test Case-2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {
            if (resstatus == 401 ||resstatus == 404) {
                expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode, "Verify the API response with error code");
                expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription, "Verify the API response with shortDescription");
                expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription, "Verify the API response with detailedDescription");

            }
        });
    });
});
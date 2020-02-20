'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/RulesAPI/Business_Rules_Validation_With_PersonId.json');
var TestDescriptions = require('../../../descriptions/devEng/RulesAPI/Business_Rules_Validation_with_PersonId_desc.json');

// Business Rules API giving "Invalid Contract-Id" and response body with "error JSON Data Set".
describe('Business Rules API - Validating  With PersonId :  ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
    beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;
        
            it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1']  + "  PersonID: " + data.headers.PersonId + "  Client Key: " + data.headers.ClientKey + "", function(doneFn) {
            let apiurl = Utility.getapiurl('RULESVALIDATION', data['path-params'].enrolleeId, "", "");
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
                    if (res.status == 200) {
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode,"Verify the API response with statuscode");
                    resstatus = res.status;
                }else if (res.status == 401) {
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode,"Verify the API response with statuscode");
                    resstatus = res.status;
                } 


                }).done(doneFn);
        });

    });
});
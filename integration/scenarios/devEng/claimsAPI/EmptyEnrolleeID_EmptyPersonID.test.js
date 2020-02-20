'use strict';
const Joi = frisby.Joi;

var TestData         = require('../../../testData/devEng/' + testDataEnv + '/claimsAPI/EmptyEnrolleeID_EmptyPersonID.json');
var TestDescriptions = require('../../../descriptions/devEng/claimsAPI/EmptyEnrolleeID_EmptyPersonID_desc.json');

// Claims Enrollee Service API giving "Empty PersonID or EnrolleeID" and response body with "error JSON Data Set".
describe('Claims Enrollee Service API - Negative Scenarios: Empty PersonID or EnrolleeID', function() {
    dataProvider(TestData.Scenarios, function(data, scenario) {
        var respjson, resstatus;
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + " enrollee-id: " + data.request['enrollee-id'] + "  PersonID: " + data.headers.personId + "  Client Key: " + data.headers.ClientKey + "", function(doneFn) {
            let apiurl = Utility.getapiurl('CLAIMS', data.request['enrollee-id']);
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
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode);
                    resstatus = res.status;

                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.Scenarios[scenario]['TC-2'] + "", function() {
            
            if (resstatus == 404 || resstatus == 400) {
                expect(respjson.error).toEqual(data.verify['TC-2'].errorMessage);
              

            }
        });
    });
});
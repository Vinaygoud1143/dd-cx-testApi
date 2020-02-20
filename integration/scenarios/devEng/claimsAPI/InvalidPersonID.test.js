'use strict';
const Joi = frisby.Joi;

var TestData         = require('../../../testData/devEng/' + testDataEnv + '/claimsAPI/InvalidPersonID.json');
var TestDescriptions = require('../../../descriptions/devEng/claimsAPI/InvalidPersonID_desc.json');

// Claims Enrollee Service API giving "Invalid PersonID" and response body with "error JSON Data Set".
describe('Claims Enrollee Service API - Invalid PersonID Viewing other Claims:', function() {
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
            
            if (resstatus == 500) {

                expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode);
                expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription);
                expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription);

            }
        });
    });
});
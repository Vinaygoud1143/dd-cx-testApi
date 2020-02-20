'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/familyRosterAPI/FamilyRosterServiceAPIDefects.json');
var TestDescriptions = require('../../../descriptions/devEng/familyRosterAPI/FamilyRosterServiceAPIDefects_desc.json');

// Family Roster Service API giving "Contract-Id, Group-Id, Division-Id and Headers" and response body with "Enrollee service details JSON data set".
describe('Family Roster Service API - Validation of Defects & Bugs :  ', function() {
    dataProvider(TestData.Scenarios, function(data, scenario) {

        var respjson, resstatus;
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + "  PersonID: " + data.headers.personId + "  Client Key: " + data.headers.ClientKey + "", function(doneFn) {
            let apiurl = Utility.getapiurl('FAMILYCONTRACT', data.request['personId']);
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
            if (resstatus == 200) {
                respjson.forEach(function(response, index) {
                    if (data.verify['TC-2'].benefitId) 
                        expect(data.verify['TC-2'].benefitId).toContain(response.benefitId, ". Verify if benefitId: " + response.benefitId + " from the API response is an expected benefitId");
                    if (data.verify['TC-2'].bl7Flag) 
                        expect(data.verify['TC-2'].bl7Flag).toContain(response.bl7Flag, ". Verify if bl7Flag: " + response.bl7Flag + " from the API response is an expected bl7Flag");
                })
            }
        });


    });
});
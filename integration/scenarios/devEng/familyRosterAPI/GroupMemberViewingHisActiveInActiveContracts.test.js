'use strict';
const Joi = frisby.Joi;

var TestData         = require('../../../testData/devEng/' + testDataEnv + '/familyRosterAPI/GroupMemberViewingHisActiveInActiveContracts.json');
var TestDescriptions = require('../../../descriptions/devEng/familyRosterAPI/GroupMemberViewingHisActiveInActiveContracts_desc.json');

// Family Roster Service API giving "Valid Person-Id and Headers" and response body with "Enrollee service details JSON data set".
describe('Family Roster Service API - Group Member viewing his Active/InActive Contracts:  ', function() {
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


        it(scenario + ",Test Case-2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {                
                respjson.forEach(function(response, index) {
                    expect(data.verify['TC-2'].groupTypeId).toContain(response.groupTypeId , ". Verify if groupTypeId: " + response.groupTypeId + " from the API response is an expected groupTypeId");
                })
            }
        });
    });
});
'use strict';
const Joi = frisby.Joi;

var TestData         = require('../../../testData/devEng/' + testDataEnv + '/familyRosterAPI/GroupMemberViewingHisInActiveContracts.json');
var TestDescriptions = require('../../../descriptions/devEng/familyRosterAPI/GroupMemberViewingHisInActiveContracts_desc.json');


// Family Roster Service API giving "Invalid Person-Id Or Headers" and response body with "Enrollee service details JSON data set".
describe('Family Roster Service API - Group Member viewing his InActive Contracts:  ', function() {
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
                    if(data.verify['TC-2'].groupTypeId == response.groupTypeId)
                    expect(data.verify['TC-2'].groupTypeId).toContain(response.groupTypeId , ". Verify if groupTypeId: " + response.groupTypeId + " from the API response is an expected groupTypeId");
                })
            }
        });

        it(scenario + ",Test Case-3:-" + TestDescriptions.Scenarios[scenario]['TC-3'], function() {
            if (resstatus == 200) {                
                respjson.forEach(function(response, index) {
                    if(data.verify['TC-2'].groupTypeId == response.groupTypeId)
                    expect(data.verify['TC-3'].active).toContain(response.active , ". Verify if active: " + response.active + " from the API response is an expected active");
                })
            }
        });
    });
});
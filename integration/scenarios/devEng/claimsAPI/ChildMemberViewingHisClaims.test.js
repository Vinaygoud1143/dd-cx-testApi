'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/claimsAPI/ChildMemberViewingHisClaims.json');
var TestDescriptions = require('../../../descriptions/devEng/claimsAPI/ChildMemberViewingHisClaims_desc.json');

describe('Enroll API - Claim Details:', function() {
    dataProvider(TestData.Scenarios, function(data, scenario) {
        var respjson, resstatus;
        var claimsID = [];
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + " enrollee-id: " + data.request['enrollee-id'] + "  PersonID: " + data.headers.personId + "  Client Key: " + data.headers.ClientKey + "", function(doneFn) {
            let apiurl = Utility.getapiurl('CLAIMS', data.request['enrollee-id']);
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


        claimsID = [];
        it(scenario + ",Test Case-2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {
            if (respjson == 200) {
                respjson.enrolleeClaimSummaryList.forEach(function(response, index) {

                    claimsID.push(response.claimId);

                    expect(data.verify['TC-2'].claimId).toContain(response.claimId+ ". Verify if claim ID: " + response.claimId + " from the API response is an expected claim ID")
                })
            }
        });
    });
});
'use strict';
const Joi = frisby.Joi;

var TestData         = require('../../../testData/devEng/' + testDataEnv + '/claimsAPI/PrimaryMemberViewingOtherAdultClaimsGrantedPermission.json');
var TestDescriptions = require('../../../descriptions/devEng/claimsAPI/PrimaryMemberViewingOtherAdultClaimsGrantedPermission_desc.json');

// Claims Enrollee Service API giving "Enrollee-ID" and response body with "claims enrollee service details JSON data set".
describe('Claims Enrollee Service API - Primary Member viewing Other Adult Claim Details with Granted Permission:  ', function() {
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


        claimsID = [];
        it(scenario + ",Test Case-2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {
                respjson.enrolleeClaimSummaryList.forEach(function(response, index) {
                    claimsID.push(response.claimId);
                    expect(data.verify['TC-2'].claimId).toContain(response.claimId , claimsID.length + ". Verify if claim ID: " + response.claimId + " from the API response is an expected claim ID")
                })
            }
             if (resstatus == 500) {
                       
                expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode);
                expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription);
                expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription);
        }
        });
    });
});
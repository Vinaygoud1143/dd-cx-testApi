'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/familyRosterAPI/EnrolleeViewingHisFamilyInformation.json');
var TestDescriptions = require('../../../descriptions/devEng/familyRosterAPI/EnrolleeViewingHisFamilyInformation_desc.json');

// Family Roster Service API giving "Contract-Id, Group-Id, Division-Id and Headers" and response body with "Enrollee service details JSON data set".
describe('Family Roster Service API - EnrolleeViewingHisFamilyInformation:  ', function() {
    dataProvider(TestData.Scenarios, function(data, scenario) {

        var respjson, resstatus;
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + "  PersonID: " + data.headers.personId + "  Client Key: " + data.headers.ClientKey + "", function(doneFn) {
            let apiurl = Utility.getapiurl('FAMILYENROLLEE', data.request['contractId'],' ',data.request['params']);
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

                    var enrollee = data.verify['TC-2'][index];

                    expect(enrollee.enrolleeId).toContain(response.enrolleeId, ". Verify if enrolleeId: " + response.enrolleeId + " from the API response is an expected enrolleeId");
                    expect(enrollee.memberId).toContain(response.memberId, ". Verify if memberId: " + response.memberId + " from the API response is an expected memberId");
                    expect(enrollee.email).toEqual(response.email, ". Verify if email: " + response.email + " from the API response is an expected email");
                    expect(enrollee.firstName).toContain(response.firstName, ". Verify if firstName: " + response.firstName + " from the API response is an expected firstName");
                    expect(enrollee.middleName).toEqual(response.middleName, ". Verify if middleName: " + response.middleName + " from the API response is an expected middleName");
                    expect(enrollee.lastName).toContain(response.lastName, ". Verify if lastName: " + response.lastName + " from the API response is an expected lastName");
                    expect(enrollee.language).toContain(response.language, ". Verify if language: " + response.language + " from the API response is an expected language");
                    expect(enrollee.personId).toContain(response.personId, ". Verify if personId: " + response.personId + " from the API response is an expected personId");
                    expect(enrollee.officePhone).toEqual(response.officePhone, ". Verify if officePhone: " + response.officePhone + " from the API response is an expected officePhone");
                    expect(enrollee.homePhone).toEqual(response.homePhone, ". Verify if homePhone: " + response.homePhone + " from the API response is an expected homePhone");
                    expect(enrollee.mobilePhone).toEqual(response.mobilePhone, ". Verify if mobilePhone: " + response.mobilePhone + " from the API response is an expected mobilePhone");
                    expect(enrollee.otherPhone).toEqual(response.otherPhone, ". Verify if otherPhone: " + response.otherPhone + " from the API response is an expected otherPhone");
                    expect(enrollee.gender).toContain(response.gender, ". Verify if gender: " + response.gender + " from the API response is an expected gender");
                    expect(enrollee.inGracePeriod).toEqual(response.inGracePeriod, ". Verify if inGracePeriod: " + response.inGracePeriod + " from the API response is an expected inGracePeriod");
                    expect(enrollee.primaryIndicator).toContain(response.primaryIndicator, ". Verify if primaryIndicator: " + response.primaryIndicator + " from the API response is an expected primaryIndicator");
                    expect(enrollee.phiFlag).toEqual(response.phiFlag, ". Verify if phiFlag: " + response.phiFlag + " from the API response is an expected phiFlag");
                    expect(enrollee.relationShip).toContain(response.relationShip, ". Verify if relationShip: " + response.relationShip + " from the API response is an expected relationShip");
                    expect(enrollee.relationShipCode).toContain(response.relationShipCode, ". Verify if relationShipCode: " + response.relationShipCode + " from the API response is an expected relationShipCode");
                    expect(enrollee.primary).toEqual(response.primary, ". Verify if primary: " + response.primary + " from the API response is an expected primary");
                    expect(enrollee.divisionId).toContain(response.divisionId, ". Verify if divisionId: " + response.divisionId + " from the API response is an expected divisionId");
                    expect(enrollee.groupId).toContain(response.groupId, ". Verify if groupId: " + response.groupId + " from the API response is an expected groupId");
                })
            }
        });
    });
});
'use strict';
const Joi = frisby.Joi;

var TestData         = require('../../../testData/devEng/' + testDataEnv + '/claimsAPI/Primary_Adult_ChildMemberViewingHisOwnClaims.json');
var TestDescriptions = require('../../../descriptions/devEng/claimsAPI/Primary_Adult_ChildMemberViewingHisOwnClaims_desc.json');

// Claims Enrollee Service API giving "Enrollee-ID" and response body with "claims enrollee service details JSON data set".
describe('Claims Enrollee Service API - Primary & Adult & Child Member viewing his Own Claim Details:  ', function() {
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

        it(scenario + ",Test Case-2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {
                            expect(respjson.enrolleeId).toEqual(data.verify['TC-2'].enrolleeId, "Verify that the 'enrolleeId' Should be: " + respjson.enrolleeId);
                            expect(respjson.enrolleeName).toEqual(data.verify['TC-2'].enrolleeName, "Verify that the 'enrolleeName' Should be: " + respjson.enrolleeName);
                            expect(respjson.enrolleeType).toEqual(data.verify['TC-2'].enrolleeType, "Verify that the 'enrolleeType' Should be: " + respjson.enrolleeType);
                            respjson.enrolleeClaimSummaryList.forEach(function(respECSL, index) {
                                var dataECSL = data.verify['TC-2'].enrolleeClaimSummaryList[index];
                                expect(respECSL.claimId).toEqual(dataECSL.claimId, "Verify that the 'claimId' Should be: " + dataECSL.claimId);
                                
                               
                                if (respECSL.claimId === dataECSL.claimId) 
                                {
                                    expect(respECSL.personId).toEqual(dataECSL.personId, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'personId' Should be: " + dataECSL.personId);
                                    expect(respECSL.claimStatus).toEqual(dataECSL.claimStatus, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'claimStatus' Should be: " + dataECSL.claimStatus);
                                    expect(respECSL.dateOfService).toEqual(dataECSL.dateOfService, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'dateOfService' Should be: " + dataECSL.dateOfService);
                                    expect(respECSL.providerDetails.providerKey).toEqual(dataECSL.providerDetails.providerKey, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'providerKey' Should be: " + dataECSL.providerDetails.providerKey);
                                    expect(respECSL.providerDetails.providerName).toEqual(dataECSL.providerDetails.providerName, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'providerName' Should be: " + dataECSL.providerDetails.providerName);
                                    expect(respECSL.providerDetails.active).toEqual(dataECSL.providerDetails.active, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'active' Should be: " + dataECSL.providerDetails.active);
                                    expect(respECSL.providerDetails.gender).toEqual(dataECSL.providerDetails.gender, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'gender' Should be: " + dataECSL.providerDetails.gender);
                                    expect(respECSL.providerDetails.contactNumber).toEqual(dataECSL.providerDetails.contactNumber, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'contactNumber' Should be: " + dataECSL.providerDetails.contactNumber);
                                    respECSL.procedureDetails.forEach(function(respProcDetails, index) {
                                        var dataProcDetails = dataECSL.procedureDetails[index];
                                        expect(respProcDetails.procedureCode).toEqual(dataProcDetails.procedureCode, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'procedureCode' Should be: " + dataProcDetails.procedureCode);

                                        if (respProcDetails.procedureCode === dataProcDetails.procedureCode) 
                                        {
                                            expect(respProcDetails.procedureDescription).toEqual(dataProcDetails.procedureDescription, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'procedureDescription' Should be: " + dataProcDetails.procedureDescription);
                                            expect(respProcDetails.procedureCount).toEqual(dataProcDetails.procedureCount, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'procedureCount' Should be:" + dataProcDetails.procedureCount);
                                        }
                                    })
                                    expect(respECSL.enrolleeResponsibilityAmount).toEqual(dataECSL.enrolleeResponsibilityAmount, "Verify that the 'enrolleeResponsibilityAmount' Should be: " + dataECSL.enrolleeResponsibilityAmount);
                                }
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
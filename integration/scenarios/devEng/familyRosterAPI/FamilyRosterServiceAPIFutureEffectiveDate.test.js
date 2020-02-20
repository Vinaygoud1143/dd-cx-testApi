'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/familyRosterAPI/FamilyRosterServiceAPIFutureEffectiveDate.json');
var TestDescriptions = require('../../../descriptions/devEng/familyRosterAPI/FamilyRosterServiceAPIFutureEffectiveDate_desc.json');

// Family Roster Service API giving "Contract-Id, Group-Id, Division-Id and Headers" and response body with "Enrollee service details JSON data set".
describe('Family Roster Service API - Validation of CXCORETECH-1490 & CXCORETECH-1518 :Future Effective Dates Changes  ', function() {
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
                }).catch(function(err){
                    expect(true).toBe(false, err);
                }).done(doneFn);
        });


        it(scenario + ",Test Case-2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {
                respjson.forEach(function(response, index) {
                 var dataResp=data.verify['TC-2'][index];
                    if(dataResp.contractId ==response.contractId){
                     expect(dataResp.contractId).toEqual(response.contractId , "Verify if contractId: " + response.contractId + " from the API response is an expected contractId");
                     expect(dataResp.personId).toEqual(response.personId , "Verify if personId: " + response.personId + " from the API response is an expected personId");
                     expect(dataResp.benefitId).toEqual(response.benefitId , "Verify if benefitId: " + response.benefitId + " from the API response is an expected benefitId");
                     expect(dataResp.bl7Flag).toEqual(response.bl7Flag , "Verify if bl7Flag: " + response.bl7Flag + " from the API response is an expected bl7Flag");
                     expect(dataResp.networkIdMapping).toEqual(response.networkIdMapping , "Verify if networkIdMapping: " + response.networkIdMapping + " from the API response is an expected networkIdMapping");
                     expect(dataResp.groupId).toEqual(response.groupId , "Verify if groupId: " + response.groupId + " from the API response is an expected groupId");
                     expect(dataResp.groupTypeId).toEqual(response.groupTypeId , "Verify if groupTypeId: " + response.groupTypeId + " from the API response is an expected groupTypeId");
                     expect(dataResp.divisionId).toEqual(response.divisionId , "Verify if divisionId: " + response.divisionId + " from the API response is an expected divisionId");
                     expect(dataResp.groupSurrogateId).toEqual(response.groupSurrogateId , "Verify if groupSurrogateId: " + response.groupSurrogateId + " from the API response is an expected groupSurrogateId");
                     expect(dataResp.healthCareContractHolderId).toEqual(response.healthCareContractHolderId , "Verify if healthCareContractHolderId: " + response.healthCareContractHolderId + " from the API response is an expected healthCareContractHolderId");
                     expect(dataResp.divisionSurrogateId).toEqual(response.divisionSurrogateId , "Verify if divisionSurrogateId: " + response.divisionSurrogateId + " from the API response is an expected divisionSurrogateId");
                     expect(dataResp.active).toEqual(response.active , "Verify if active: " + response.active + " from the API response is an expected active");
                     expect(dataResp.activeInFuture).toEqual(response.activeInFuture , "Verify if activeInFuture: " + response.activeInFuture + " from the API response is an expected activeInFuture");
                     expect(dataResp.startDate).toEqual(response.startDate , "Verify if startDate: " + response.startDate + " from the API response is an expected startDate");
                     expect(dataResp.endDate).toEqual(response.endDate , "Verify if endDate: " + response.endDate + " from the API response is an expected endDate");
                     expect(dataResp.groupDescription).toEqual(response.groupDescription , "Verify if groupDescription: " + response.groupDescription + " from the API response is an expected groupDescription");
                     expect(dataResp.divisionDescription).toEqual(response.divisionDescription , "Verify if divisionDescription: " + response.divisionDescription + " from the API response is an expected divisionDescription");
                     expect(dataResp.planName).toEqual(response.planName , "Verify if planName: " + response.planName + " from the API response is an expected planName");
                     expect(dataResp.planType).toEqual(response.planType , "Verify if planType: " + response.planType + " from the API response is an expected planType");
                     expect(dataResp.state).toEqual(response.state , "Verify if state: " + response.state + " from the API response is an expected state");

                    }
                  })
                
            }
        });


    });
});
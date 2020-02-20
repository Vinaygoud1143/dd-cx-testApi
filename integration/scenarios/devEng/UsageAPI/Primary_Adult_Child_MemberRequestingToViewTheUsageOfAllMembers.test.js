'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/UsageAPI/Primary_Adult_Child_MemberRequestingToViewUsageOfAllMembers.json');
var TestDescriptions = require('../../../descriptions/devEng/UsageAPI/Primary_Adult_Child_MemberRequestingToViewTheUsageOfAllMembers_desc.json');

// Usage API giving "Valid Contract-Id And Headers" and response body with "error JSON Data Set".
describe('Usage API -Primary & Adult & Child Member Requesting To View Usage Of All Members :  ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
    beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;
        
        
        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + " contract-id: " + data.request['contract-id'] + "  PersonID: " + data.headers.personId + "  Client Key: " + data.headers.ClientKey + "", function(doneFn) {
            let apiurl = Utility.getapiurl('USAGECONTRACT', data.request['contract-id']);
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
                respjson.forEach(function(resp, index){
                    
                    if(resp.usageInfo!=null){
                        resp.usageInfo.procedureDetail.forEach(function(response, index) {
                            data.verify['TC-2'].procedureDetail.forEach(function(dataResp,index){
                                if(dataResp.personId == resp.memberInfo.personId){
                                
                                expect(dataResp.procedureName).toEqual(response.procedureName, "Verify if Procedure Name: " + response.procedureName + " from the API response is an expected procedureName")
                                expect(dataResp.totalAllowed).toEqual(response.totalAllowed, "Verify if totalAllowed: " + response.totalAllowed + " from the API response is an expected totalAllowed")
                                expect(dataResp.totalUsed).toEqual(response.totalUsed, "Verify if totalUsed: " + response.totalUsed + " from the API response is an expected totalUsed")
                                expect(dataResp.totalRemaining).toEqual(response.totalRemaining, "Verify if totalRemaining: " + response.totalRemaining + " from the API response is an expected totalRemaining")
                                }
                            })
                 
                    })
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
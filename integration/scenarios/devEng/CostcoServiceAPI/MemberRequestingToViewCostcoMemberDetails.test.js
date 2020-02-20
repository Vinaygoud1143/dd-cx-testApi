'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/CostcoServiceAPI/MemberRequestingToViewCostcoMemberDetails.json');
var TestDescriptions = require('../../../descriptions/devEng/CostcoServiceAPI/MemberRequestingToViewCostcoMemberDetails_desc.json');

// Costco service API giving "Member-Id" and response body with "Costco member service details JSON data set".
describe('Costco service API -Member Requesting To View Costco MemberDetails :  ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
    beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;
        
        
        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + " member-id: " + data.request['member-id'] , function(doneFn) {
            let apiurl = Utility.getapiurl('COSTCOMEMBER', data.request['member-id']);
            frisby
                .setup({
                    request: {
                        headers: {
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
               expect(respjson.memberNumber).toEqual(data.verify['TC-2'].memberNumber, "Verify if memberNumber: " + respjson.memberNumber + " from the API response is an expected memberNumber");
               expect(respjson.person.firstName).toEqual(data.verify['TC-2'].firstName, "Verify if firstName: " + respjson.person.firstName + " from the API response is an expected firstName");              
               expect(respjson.person.lastName).toEqual(data.verify['TC-2'].lastName, "Verify if lastName: " + respjson.person.lastName + " from the API response is an expected lastName");              
               expect(respjson.statusCode).toEqual(data.verify['TC-2'].statusCode, "Verify if statusCode: " + respjson.statusCode + " from the API response is an expected statusCode");              
               expect(respjson.memberType).toEqual(data.verify['TC-2'].memberType, "Verify if memberType: " + respjson.memberType + " from the API response is an expected memberType"); 
               expect(respjson.membershipCode).toEqual(data.verify['TC-2'].membershipCode, "Verify if membershipCode: " + respjson.membershipCode + " from the API response is an expected membershipCode");              
               expect(respjson.enrollmentDate).toEqual(data.verify['TC-2'].enrollmentDate, "Verify if enrollmentDate: " + respjson.enrollmentDate + " from the API response is an expected enrollmentDate");              
               expect(respjson.effectiveStartDate).toEqual(data.verify['TC-2'].effectiveStartDate, "Verify if effectiveStartDate: " + respjson.effectiveStartDate + " from the API response is an expected effectiveStartDate");              
               expect(respjson.effectiveEndDate).toEqual(data.verify['TC-2'].effectiveEndDate, "Verify if effectiveEndDate: " + respjson.effectiveEndDate + " from the API response is an expected effectiveEndDate");                           

            }
        });
    });
});
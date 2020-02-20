'use strict';

var TestData = require('../../../../testData/devEng/' + testDataEnv + '/eligibility/group/group-number.json');
describe('Group By Group Number service - /groups/{group-number}: ', function() {


    dataProvider(TestData.positive_scenarios, function(data, scenario) {


        beforeAll(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it("Positive_scenarios :" + scenario + ": Verify the GET: /groups/{group-number} end point while Search with group number:'" + data.request['group-number'] + "'", function(doneFn) {
            let apiurl = Utility.getapiurl('GROUPNUMBER', data.request['group-number']);
            frisby
                .get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(data.response.status).toEqual(res.status, "Verify the API response with status code");
                    resstatus = res.status;
                }).done(doneFn);
        });
        it("Verify the response", () => {
            expect(data.response.groupNumber).toEqual(respjson.groupNumber, "Verify the groupNumber");
            expect(data.response.groupName).toEqual(respjson.groupName, "Verify the groupName");
            expect(data.response.groupSurrogateId).toEqual(respjson.groupSurrogateId, "Verify the groupSurrogateId");
            expect(data.response.groupTypeIdentifier).toEqual(respjson.groupTypeIdentifier, "Verify the groupTypeIdentifier");
            expect(data.response.healthCareContractHolderIdentifier).toEqual(respjson.healthCareContractHolderIdentifier, "Verify the healthCareContractHolderIdentifier");
            expect(data.response.state).toEqual(respjson.state, "Verify the state");
            expect(data.response.networkId).toEqual(respjson.networkId, "Verify the networkId");
        })
    });


    dataProvider(TestData.negative_scenarios, function(data, scenario) {
        beforeAll(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it("Negative_scenarios :" + scenario + ": Verify the GET: /groups/{group-number} end point while Search with group number:" + data.request['group-number'], function(doneFn) {
            let apiurl = Utility.getapiurl('GROUPNUMBER', data.request['group-number']);
            frisby
                .get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(data.response.status).toEqual(res.status, "Verify the API response with status code");
                    resstatus = res.status;
                }).done(doneFn);

        });
        it("Verify the response", () => {
            if (data.response.error) {
                expect(data.response.error).toEqual(respjson.error, "Verify the error")
                expect(data.response.message).toEqual(respjson.message, "Verify the message");
            }
            if (data.response.errorCode) {
                expect(data.response.errorCode).toEqual(respjson.errorCode, "Verify the error Code");
                expect(data.response.shortDescription).toEqual(respjson.shortDescription, "Verify the shortDescription");
                expect(data.response.detailedDescription).toEqual(respjson.detailedDescription, "Verify the detailedDescription");
            }

            // expect(JSON.stringify(respjson)).toEqual("data.response.personId", "Verify the person id");
        })
    });
});
'use strict';

var TestData = require('../../../../testData/devEng/' + testDataEnv + '/eligibility/person/contract-id.json');

describe('Eligibility service - /enrollee-contracts/{contract-Id}: ', function() {


    dataProvider(TestData.positive_scenarios, function(data, scenario) {


        beforeAll(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it("Positive_scenarios :" + scenario + ": Verify the GET: /enrollee-contracts/{contract-Id} end point while Search with contract id :'" + data.request['contract-Id'] + "'", function(doneFn) {
            let apiurl = Utility.getapiurl('CONTRACTID', data.request['contract-Id']);
            frisby
                .get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(data.response.status).toEqual(res.status, "Verify the API response with status code");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it("Verify the response", () => {
            expect(data.response.contractId).toEqual(respjson.contractId, "Verify the contract id");
        });

    });


    dataProvider(TestData.negative_scenarios, function(data, scenario) {
        beforeAll(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it("Negative_scenarios :" + scenario + ": Verify the GET: /enrollee-contracts/{contract-Id} end point while Search with contract id :" + data.request['contract-Id'], function(doneFn) {
            let apiurl = Utility.getapiurl('CONTRACTID', data.request['contract-Id']);
         
            frisby
                .get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(data.response.status).toEqual(res.status, "Verify the API response with status code");
                    resstatus = res.status;
                    // expect(apiurl).toEqual("")
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

            // expect(JSON.stringify(respjson)).toEqual("");
        })
    });
});
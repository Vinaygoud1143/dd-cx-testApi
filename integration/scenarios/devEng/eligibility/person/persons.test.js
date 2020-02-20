'use strict';

var TestData = require('../../../../testData/devEng/' + testDataEnv + '/eligibility/person/persons.json');

describe('Eligibility service - /persons: ', function() {


    dataProvider(TestData.positive_scenarios, function(data, scenario) {
        beforeAll(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it("Positive_scenarios :" + scenario + ": Verify the POST: /persons end point while Search with: '" + JSON.stringify(data.request) + " '", function(doneFn) {
            let apiurl = Utility.getapiurl('PERSONS');
            frisby
                .post(apiurl, data.request)
                .then(function(res) {
                    respjson = res.json;
                    expect(data.response.status).toEqual(res.status, "Verify the API response with status code");
                    resstatus = res.status;
                }).done(doneFn);
        });
        it("Verify the response", () => {
            expect(data.response.personId).toEqual(respjson.personId, "Verify the person id");
            expect(data.response.ssn).toEqual(respjson.ssn, "Verify the SSN");
            expect(data.response.name.firstName).toEqual(respjson.name.firstName, "Verify The First name");
            expect(data.response.name.middleName).toEqual(respjson.name.middleName, "Verify the middle name");
            expect(data.response.name.lastName).toEqual(respjson.name.lastName, "Verify the last name");
        })
    });


    dataProvider(TestData.negative_scenarios, function(data, scenario) {
        beforeAll(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it("Negative_scenarios :" + scenario + ": Verify the POST: /persons end point while Search with: '" + JSON.stringify(data.request) + " '", function(doneFn) {
            let apiurl = Utility.getapiurl('PERSONS');
            frisby
                .post(apiurl, data.request)
                .then(function(res) {
                    respjson = res.json;
                    expect(data.response.status).toEqual(res.status, "Verify the API response with status code");
                    resstatus = res.status;
                }).done(doneFn);

        });
        it("Verify the response", () => {
            // expect(JSON.stringify(respjson)).toEqual(" ")

            if (data.response.error) {
                expect(data.response.error).toEqual(respjson.error, "Verify the error")
                expect(data.response.message).toEqual(respjson.message, "Verify the message");
            }
            if (data.response.errorCode) {
                expect(data.response.errorCode).toEqual(respjson.errorCode, "Verify the errorCode");
                expect(data.response.shortDescription.replace(/[^a-zA-Z0-9]/g, '')).toEqual(respjson.shortDescription.toString().replace(/[^a-zA-Z0-9]/g, ''), "Verify the shortDescription")
                expect(respjson.detailedDescription.toString().replace(/[^a-zA-Z0-9]/g, '')).toContain(data.response.detailedDescription.replace(/[^a-zA-Z0-9]/g, ''), "Verify the detailedDescription");

            }
        })
    });
});
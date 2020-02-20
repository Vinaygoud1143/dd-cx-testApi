'use strict';

var TestData = require('../../../../testData/devEng/' + testDataEnv + '/eligibility/person/person-id.json');

describe('Eligibility service - /persons/{Person-id}: ', function() {


    dataProvider(TestData.positive_scenarios, function(data, scenario) {


        beforeAll(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it("Positive_scenarios :" + scenario + ": Verify the GET: /persons/{person-Id} end point while Search with person id :'" + data.request['person-Id'] + "'", function(doneFn) {
            let apiurl = Utility.getapiurl('PERSONID', data.request['person-Id']);
            frisby
                .get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(data.response.status).toEqual(res.status, "Verify the API response with status code");
                    resstatus = res.status;
                }).done(doneFn);
        });
        it("Verify the response", () => {
            expect(data.response.personId).toEqual(respjson.personId, "Verify the person id");
            expect(data.response.ssn).toEqual(respjson.ssn, "Verify the SSN");
            expect(data.response.name.firstName).toEqual(respjson.name.firstName, "Verify The First bane");
            expect(data.response.name.middleName).toEqual(respjson.name.middleName, "Verify the middle name");
            expect(data.response.name.lastName).toEqual(respjson.name.lastName, "Verify the last name");
        })
    });


    dataProvider(TestData.negative_scenarios, function(data, scenario) {
        beforeAll(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it("Negative_scenarios :" + scenario + ": Verify the GET: /persons/{person-Id} end point while Search with person id :" + data.request['person-Id'], function(doneFn) {
            let apiurl = Utility.getapiurl('PERSONID', data.request['person-Id']);
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
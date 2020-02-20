'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devAuto/' + testDataEnv + '/enrollClaimApi/enroll_EnrolleeDetails.json');

describe('Enroll API - Enrollee Details: ', function () {
    var jsonResponse;
    var jsonStatus;

    dataProvider(TestData.Set1, function (data, description) {

        beforeAll(function () {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it(description + ", Test 1: Hit the REST API and convert the response in JSON format: Inputs, " + " Person ID: " + data.PersonId + ", Enrollee Id: " + data.enrolleeId + " ", function (doneFn) {
            jsonResponse = null;
            jsonStatus = null;
            let apiurl = Utility.getapiurl('ENROLLEES', data.enrolleeId);
            console.log("apiurl=" + apiurl)
            frisby
                .setup({
                    request: {
                        headers: {
                            'PersonId'    : data.PersonId,
                            'ClientKey'   : data.ClientKey,
                            'Content-Type': 'application/json'
                        }
                    }
                })
                .get(apiurl)
                .then(function (res) {
                    jsonResponse = res.json;
                    jsonStatus   = res.status;
                    console.log(jsonStatus)
                    expect(res.status).toBe(data.verify.status, "Verify if API response status is: " + data.verify.status);
                })
                .done(doneFn);
        })

        it(description + ", Test 2: Verify field types ", function () {
            if (jsonStatus == 200) {
                expect(typeof jsonResponse.enrolleeId).toEqual('string', "Verify that 'enrolleeId' data type should be 'string'");
                expect(typeof jsonResponse.enrolleeName).toEqual('string', "Verify that 'enrolleeName' data type should be 'string'");
                expect(typeof jsonResponse.enrolleeType).toEqual('string', "Verify that 'enrolleeType' data type should be 'string'");
            }
        })

        it(description + ", Test 3: " + data.testCaseDes, function () {
            if (jsonStatus == 200) {
                expect(jsonResponse.enrolleeId).toEqual(data.verify.enrolleeId, "Verify that the 'enrolleeId' Should be: " + data.verify.enrolleeId);
                expect(jsonResponse.enrolleeName).toEqual(data.verify.enrolleeName, "Verify that the 'enrolleeName' Should be: " + data.verify.enrolleeName);
                expect(jsonResponse.enrolleeType).toEqual(data.verify.enrolleeType, "Verify that the 'enrolleeType' Should be: " + data.verify.enrolleeType);
            }
        });
    });
});
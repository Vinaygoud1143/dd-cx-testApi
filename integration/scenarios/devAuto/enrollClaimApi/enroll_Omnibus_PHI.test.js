'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devAuto/' + testDataEnv + '/enrollClaimApi/enroll_Omnibus_PHI.json');

describe('Enroll API - Omnibus & PHI Restrictions: ', function () {
    var jsonResponse;
    var jsonStatus;

    dataProvider(TestData.Set1, function (data, description) {

        beforeAll(function () {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it(description + ", Test 1: Hit the REST API and convert the response in JSON format: Inputs, " + " Person ID: " + data.PersonId + ", Enrollee Id: " + data.enrolleeId + " ", function (doneFn) {
                jsonResponse = null;
                jsonStatus   = null;
            let apiurl       = Utility.getapiurl('ENROLLEES', data.enrolleeId);
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

        it(description + ", Test 2: " + data.testCaseDes, function () {
            switch (jsonStatus) {
                case 400: 
                    expect(jsonResponse.errorCode).toEqual(data.verify.errorCode, "Verify that the 'ErrorCode' Should be: " + data.verify.errorCode);
                    expect(jsonResponse.shortDescription).toEqual(data.verify.shortDescription, "Verify that the 'shortDescription' Should be: " + data.verify.shortDescription);
                    expect(jsonResponse.detailedDescription).toEqual(data.verify.detailedDescription, "Verify that the 'detailedDescription' Should be: " + data.verify.detailedDescription);
                    break;
                case 401: 
                    expect(jsonResponse.errorCode).toEqual(data.verify.errorCode, "Verify that the 'ErrorCode' Should be:" + data.verify.errorCode);
                    expect(jsonResponse.shortDescription).toEqual(data.verify.shortDescription, "Verify that the 'shortDescription' Should be: " + data.verify.shortDescription);
                    expect(jsonResponse.detailedDescription).toEqual(data.verify.detailedDescription, "Verify that the 'detailedDescription' Should be: " + data.verify.detailedDescription);
                    break;
                case 404: 
                    expect(jsonResponse.errorCode).toEqual(data.verify.errorCode, "Verify that the 'ErrorCode' Should be" + data.verify.errorCode);
                    expect(jsonResponse.shortDescription).toEqual(data.verify.shortDescription, "Verify that the 'shortDescription' Should be " + data.verify.shortDescription);
                    expect(jsonResponse.detailedDescription).toEqual(data.verify.detailedDescription, "Verify that the 'detailedDescription' Should be " + data.verify.detailedDescription);
                    break;
            }
        });
    });
});
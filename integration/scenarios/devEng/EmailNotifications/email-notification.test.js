'use strict';

var TestData = require('../../../testData/devEng/' + testDataEnv + '/EmailNotifications/email-notification.json');

describe('Email Notification service - /notification/email: ', function() {


    dataProvider(TestData.positive_scenarios, function(data, scenario) {
        beforeAll(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it("Positive_scenarios :" + scenario + ": Verify the POST: /notification/email end point with: '" + JSON.stringify(data.request) + " '", function(doneFn) {
            let apiurl = Utility.getapiurl('EMAIL');
            frisby
            frisby
                .setup({
                    request: {
                        headers: {
                            'ClientKey': data.request.ClientKey,
                            'Content-Type': 'application/json'
                        }
                    }
                })
                .post(apiurl, data.request.postbody)
                .then(function(res) {
                    respjson = res.json;
                    expect(data.response.status).toEqual(res.status, "Verify the API response with status code");
                    resstatus = res.status;
                }).done(doneFn);
        });
        it("Verify the response", () => {
            expect(typeof respjson.requestReferenceId).toBe("string", "Verify the presence of requestReferenceId");
            expect(respjson.emailStatus).toEqual(data.response.emailStatus, "Verify the emailStatus");
            expect(respjson.templateType).toEqual(data.response.templateType, "Verify templateType");
            expect(respjson.notificationType).toEqual(data.response.notificationType, "Verify notificationType");
            expect(respjson.instance).toEqual(data.response.instance, "Verify instance");
            expect(respjson.clientApp).toEqual(data.response.clientApp, "Verify clientApp");

        })
    });


    dataProvider(TestData.negative_scenarios, function(data, scenario) {
        beforeAll(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it("Negative_scenarios :" + scenario + ": Verify the POST: /notification/email end point while Search with: '" + JSON.stringify(data.request) + " '", function(doneFn) {
            let apiurl = Utility.getapiurl('EMAIL');
            
            frisby
                .setup({
                    request: {
                        headers: {
                            'ClientKey': data.request.ClientKey,
                            'Content-Type': 'application/json'
                        }
                    }
                })
                .post(apiurl, data.request.postbody)
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
                expect(respjson.message).toContain(data.response.message, "Verify the message");
            }
            if (data.response.errorCode) {
                expect(data.response.errorCode).toEqual(respjson.errorCode, "Verify the errorCode");
                expect(data.response.shortDescription.replace(/[^a-zA-Z0-9]/g, '')).toEqual(respjson.shortDescription.toString().replace(/[^a-zA-Z0-9]/g, ''), "Verify the shortDescription")
                expect(respjson.detailedDescription.toString().replace(/[^a-zA-Z0-9]/g, '')).toContain(data.response.detailedDescription.replace(/[^a-zA-Z0-9]/g, ''), "Verify the detailedDescription");
            }
            if(data.response.status==200){
                  expect(data.response.emailStatus).toEqual(respjson.emailStatus);
                  
                //  "status": 200,
                // "emailStatus": "CREATED",
                // "templateType": null,
                // "notificationType": "EMAIL",
                // "instance": "localhost",
                // "clientApp": null
            }
        })
    });
});
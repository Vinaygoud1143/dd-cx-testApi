'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/brokerValidationAPI/BrokerValidation_BrokerDetailsAPI.json');
var TestDescriptions = require('../../../descriptions/devEng/brokerValidationAPI/BrokerValidation_BrokerDetailsAPI_desc.json');

// Broker Validate API giving "Valid BrokerId" and response body with "broker details JSON data set".
describe('Broker Validation API - Broker Details API by giving Valid BrokerId and requesting to view the broker information :  ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + " brokerId: " + data.request['brokerId'], function(doneFn) {
            let apiurl = Utility.getapiurl('BROKERVALIDATION', data.request['brokerId'], '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {


            if (resstatus == 200) {
                expect(respjson.brokerNumber).toEqual(data.verify['TC-2'].brokerNumber, "Verify the API response with brokerNumber");
                expect(respjson.taxIdNumber).toEqual(data.verify['TC-2'].taxIdNumber, "Verify the API response with taxIdNumber");
                expect(respjson.oracleVendorId).toEqual(data.verify['TC-2'].oracleVendorId, "Verify the API response with oracleVendorId");
                expect(respjson.brokerName).toEqual(data.verify['TC-2'].brokerName, "Verify the API response with brokerName");
                expect(respjson.vendorType).toEqual(data.verify['TC-2'].vendorType, "Verify the API response with vendorType");
                respjson.sites.forEach(function(site, index) {

                    expect(site.vendorSiteCode).toEqual(data.verify['TC-2']['sites'][index].vendorSiteCode, "Verify the API response with vendorSiteCode");
                    expect(site.orgId).toEqual(data.verify['TC-2']['sites'][index].orgId, "Verify the API response with orgId");
                    expect(site.vendorSiteId).toEqual(data.verify['TC-2']['sites'][index].vendorSiteId, "Verify the API response with vendorSiteId");
                    expect(site.vendorSiteCode).toEqual(data.verify['TC-2']['sites'][index].vendorSiteCode, "Verify the API response with vendorSiteCode");
                    expect(site.legalEntity).toEqual(data.verify['TC-2']['sites'][index].legalEntity, "Verify the API response with legalEntity");
                    expect(site.purchasingSiteFlag).toEqual(data.verify['TC-2']['sites'][index].purchasingSiteFlag, "Verify the API response with purchasingSiteFlag");
                    expect(site.paySiteFlag).toEqual(data.verify['TC-2']['sites'][index].paySiteFlag, "Verify the API response with paySiteFlag");

                    expect(site.address.addressLine3).toEqual(data.verify['TC-2']['sites'][index].address.addressLine3, "Verify the API response with addressLine3");
                    expect(site.address.addressLine2).toEqual(data.verify['TC-2']['sites'][index].address.addressLine2, "Verify the API response with addressLine2");
                    expect(site.address.addressLine1).toEqual(data.verify['TC-2']['sites'][index].address.addressLine1, "Verify the API response with addressLine1");
                    expect(site.address.city).toEqual(data.verify['TC-2']['sites'][index].address.city, "Verify the API response with city");
                    expect(site.address.state).toEqual(data.verify['TC-2']['sites'][index].address.state, "Verify the API response with state");
                    expect(site.address.zip).toEqual(data.verify['TC-2']['sites'][index].address.zip, "Verify the API response with zip");
                })
            }

            else if (resstatus == 404) {
                expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode);
                expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription);
                expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription);
            }
        });
    });
});


// Broker Validate API giving "InValid BrokerId" and response body with "error JSON Data Set".
describe('Broker Validation API - Broker Details API by giving InValid BrokerId and requesting to view the broker information then exception is throw :  ', function() {


    dataProvider(TestData.negativetestdata, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;
        it(scenario + ",Test Case 1:-" + TestDescriptions.NegativeScenarios[scenario]['TC-1'] + " brokerId: " + data.request['brokerId'], function(doneFn) {
            let apiurl = Utility.getapiurl('BROKERVALIDATION', data.request['brokerId'], '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });
        it(scenario + ",Test Case-2:-" + TestDescriptions.NegativeScenarios[scenario]['TC-2'], function() {
            if (resstatus == 400) {
                expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode, "Verify the API response with errorCode");
                expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription, "Verify the API response with shortDescription");
                expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription, "Verify the API response with detailedDescription");
                expect(respjson.stackTrace).toEqual(data.verify['TC-2'].stackTrace, "Verify the API response with stackTrace");
            }
            else if (resstatus == 404) {
                expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode);
                expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription);
                expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription);
            }
        });

    });
});
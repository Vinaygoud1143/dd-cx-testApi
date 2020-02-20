'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/providerDirectorySearchAPI/ProviderDirectorySearch_FacilityDetailsAPI.json');
var TestDescriptions = require('../../../descriptions/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_FacilityDetailsAPI_desc.json');

// PD Search ProviderKey API giving "Valid Facility_Id" and response body with "PD service details JSON data set".
describe('PD Search FacilityDetails API - Facility Details API by giving Valid FacilityId and requesting to view the facility information :  ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + " facilityId: " + data.request['facilityId'], function(doneFn) {
            let apiurl = Utility.getapiurl('FACILITIES', data.request['facilityId'], '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {


            expect(typeof respjson.distance).toEqual('number', "Verify that 'distance' data type should be 'number'");
            expect(respjson.distance != null).toBe(true, "Verify that distance should not be NULL");

            if (data.verify['TC-2'].distance && null != data.params.lat && null != data.params.long) {
                expect(respjson.distance).toEqual(data.verify['TC-2'].distance, "Verify if distance: " + respjson.distance + " from the API response is an expected distance");
            } else {
                expect(respjson.distance).toEqual(0);
            }
        });

        it(scenario + ",Test Case 3:-" + TestDescriptions.Scenarios[scenario]['TC-3'], function() {

            if (data.verify['TC-3'].isOpen && null != respjson.practiceHours) {

                let weekDays = [];
                weekDays.push(respjson.practiceHours.mondayHours);
                weekDays.push(respjson.practiceHours.tuesdayHours);
                weekDays.push(respjson.practiceHours.wednesdayHours);
                weekDays.push(respjson.practiceHours.thursdayHours);
                weekDays.push(respjson.practiceHours.fridayHours);
                weekDays.push(respjson.practiceHours.saturdayHours);
                weekDays.push(respjson.practiceHours.sundayHours);
                weekDays.forEach(function(dayTimings) {
                    if ('' !== dayTimings.openTime && '' != dayTimings.closeTime) {
                        expect(dayTimings.isOpen).toBe(data.verify['TC-3'].isOpen, "Verify if isOpen: " + dayTimings.isOpen + " from the API response is an expected value based on " + dayTimings.openTime + " and " + dayTimings.closeTime);
                    } else {
                        expect(dayTimings.isOpen).toBe(!data.verify['TC-3'].isOpen, "Verify if isOpen: " + dayTimings.isOpen + " from the API response is an expected value based on " + ('' == dayTimings.openTime ? null : dayTimings.openTime) + " and " + ('' == dayTimings.closeTime ? null : dayTimings.closeTime));
                    }
                })
            }
        });


        it(scenario + ",Test Case-4:-" + TestDescriptions.Scenarios[scenario]['TC-4'], function() {
            if (data.verify['TC-4'].facilityId && resstatus == 200) {
                expect(respjson.facilityId).toEqual(data.verify['TC-4'].facilityId, "Verify the API response with facilityId");
                expect(respjson.name).toEqual(data.verify['TC-4'].name, "Verify the API response with facility name");
                expect(respjson.address.addressLine).toEqual(data.verify['TC-4'].address.addressLine, "Verify the API response against address for addressLine");
                expect(respjson.address.city).toEqual(data.verify['TC-4'].address.city, "Verify the API response against address for city");
                expect(respjson.address.state).toEqual(data.verify['TC-4'].address.state, "Verify the API response against address for state");
                expect(respjson.address.zipcode).toEqual(data.verify['TC-4'].address.zipcode, "Verify the API response against address for zipcode");
                expect(respjson.address.latitude).toEqual(data.verify['TC-4'].address.latitude, "Verify the API response against address for latitude");
                expect(respjson.address.longitude).toEqual(data.verify['TC-4'].address.longitude, "Verify the API response against address for longitude");
                expect(respjson.phone).toEqual(data.verify['TC-4'].phone, "Verify the API response with phone");
                expect(respjson.emailAddress).toEqual(data.verify['TC-4'].emailAddress, "Verify the API response with emailAddress");
                expect(respjson.faxNumber).toEqual(data.verify['TC-4'].faxNumber, "Verify the API response with faxNumber");
                expect(respjson.website).toEqual(data.verify['TC-4'].website, "Verify the API response with website");
                expect(respjson.practiceLocation).toEqual(data.verify['TC-4'].practiceLocation, "Verify the API response with practiceLocation");
            }
        });
    });

});

describe('PD Search - Validating AMGEN Scenarios by providing valid facilityId to Facility API Operation :  ', function() {

    dataProvider(TestData.AMGENSCENARIOS, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;

        it(scenario + ",Test Case 1:-" + TestDescriptions.AMGENSCENARIOS[scenario]['TC-1'] + " facilityId: " + data.request['facilityId'], function(doneFn) {
            let apiurl = Utility.getapiurl('FACILITIES', data.request['facilityId'], '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case-2:-" + TestDescriptions.AMGENSCENARIOS[scenario]['TC-2'], function() {
            if (resstatus == 200) {
                let networks = [];
                let networkIdNames = [];

                respjson.providers.forEach(function(element) {
                    let providerNetworks = element.providerNetworks;
                    providerNetworks.forEach(function(element) {
                        networks.push(element);
                    })
                    networks.forEach(function(element) {
                        networkIdNames.push(element.networkId);
                    })
                })


                if ((data.verify['TC-2'].networkIdToBePresentInProviderNetworks) && '' !== data.params.sourceNetwork && null != data.params.sourceNetwork && '' !== data.params.targetNetwork && null != data.params.targetNetwork && data.params.sourceNetwork == data.params.targetNetwork) {
                    expect(networkIdNames[networkIdNames.indexOf(data.params.targetNetwork)]).toEqual(data.verify['TC-2'].networkIdToBePresentInProviderNetworks, "Verify the providerNetworks of API response contains " + data.verify['TC-2'].networkIdToBePresentInProviderNetworks);
                } else if ((data.verify['TC-2'].networkIdToBePresentInProviderNetworks) && ('' !== data.params.targetNetwork && null != data.params.targetNetwork) && data.params.targetNetwork == "2PPO" || data.params.targetNetwork == "2ppo") {
                    expect(networkIdNames[networkIdNames.indexOf(data.params.targetNetwork)]).toEqual(data.verify['TC-2'].networkIdToBePresentInProviderNetworks, "Verify the providerNetworks of API response contains " + data.verify['TC-2'].networkIdToBePresentInProviderNetworks);
                } else if ((data.verify['TC-2'].networkIdToBePresentInProviderNetworks) && ('' !== data.params.targetNetwork && null != data.params.targetNetwork) && data.params.targetNetwork == "2PREMIER" || data.params.targetNetwork == "2premier") {
                    expect(networkIdNames[networkIdNames.indexOf(data.params.targetNetwork)]).toEqual(data.verify['TC-2'].networkIdToBePresentInProviderNetworks, "Verify the providerNetworks of API response contains " + data.verify['TC-2'].networkIdToBePresentInProviderNetworks);
                } else if ((data.verify['TC-2'].networkIdToBePresentInProviderNetworks) && ('' !== data.params.targetNetwork && null != data.params.targetNetwork) && data.params.targetNetwork == "2DELTACARE" || data.params.targetNetwork == "2deltacare") {
                    expect(networkIdNames[networkIdNames.indexOf(data.params.targetNetwork)]).toEqual(data.verify['TC-2'].networkIdToBePresentInProviderNetworks, "Verify the providerNetworks of API response contains " + data.verify['TC-2'].networkIdToBePresentInProviderNetworks);
                }
            }
        });
    });
});

describe('PD Search - Validating Negative Scenarios by providing Invalid facilityId to Facility API Operation :  ', function() {

    dataProvider(TestData.negativetestdata, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;
         it(scenario + ",Test Case 1:-" + TestDescriptions.NegativeScenarios[scenario]['TC-1'] + " facilityId: " + data.request['facilityId'], function(doneFn) {
             let apiurl = Utility.getapiurl('FACILITIES', data.request['facilityId'], '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");

                    resstatus = res.status;
                   
                }).done(doneFn);
        });      

    });
});


'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/providerDirectorySearchAPI/ProviderDirectorySearch_FacilitiesDetailsAPI.json');
var TestDescriptions = require('../../../descriptions/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_FacilitiesDetailsAPI_desc.json');

// PD Search ProviderKey API giving "Valid Facility_Ids" and response body with "PD service details JSON data set".
describe('PD Search FacilitiesDetails API- Multiple Facilities Details API by giving Valid FacilityIds and requesting to view the facilities details :  ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + " facilityIds: " + JSON.stringify(data.request), function(doneFn) {
            let apiurl = Utility.getapiurl('FACILITYLIST', data.request, '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

//      it(scenario + ",Test Case 2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {
//            respjson.facilitiesList.forEach(function(facility) {
//                if (data.verify['TC-2'].distance && facility.address.latitude != data.params.lat && facility.address.latitude != data.params.long) {
//                    expect(data.verify['TC-2'].distance).toEqual(Math.trunc(Utility.getDistanceBetweenTwoPoints(facility.address.latitude, facility.address.longitude, facility.address.latitude, facility.address.longitude, "M")), "Verify if distace of facility from facility lat/long to facility lat/long: " + 0);
//                }
//            })
//        });


        it(scenario + ",Test Case 2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {

            respjson.facilitiesList.forEach(function(facility) {

                if (data.verify['TC-2'].isOpen && null != facility.practiceHours) {

                    let weekDays = [];
                    weekDays.push(facility.practiceHours.mondayHours);
                    weekDays.push(facility.practiceHours.tuesdayHours);
                    weekDays.push(facility.practiceHours.wednesdayHours);
                    weekDays.push(facility.practiceHours.thursdayHours);
                    weekDays.push(facility.practiceHours.fridayHours);
                    weekDays.push(facility.practiceHours.saturdayHours);
                    weekDays.push(facility.practiceHours.sundayHours);
                    weekDays.forEach(function(dayTimings) {
                        if ('' !== dayTimings.openTime && '' != dayTimings.closeTime) {
                            expect(dayTimings.isOpen).toBe(data.verify['TC-2'].isOpen, "Verify if isOpen: " + dayTimings.isOpen + " from the API response is an expected value based on " + dayTimings.openTime + " and " + dayTimings.closeTime);
                        } else {
                            expect(dayTimings.isOpen).toBe(!data.verify['TC-2'].isOpen, "Verify if isOpen: " + dayTimings.isOpen + " from the API response is an expected value based on " + ('' == dayTimings.openTime ? null : dayTimings.openTime) + " and " + ('' == dayTimings.closeTime ? null : dayTimings.closeTime));
                        }
                    })
                }
            })
        });



        it(scenario + ",Test Case-3:-" + TestDescriptions.Scenarios[scenario]['TC-3'], function() {
            let counter = 0;
            data.verify['TC-3'].forEach(function(detail) {


                if (detail.facilityId && resstatus == 200) {
                    expect(respjson.facilitiesList[counter].facilityId).toEqual(detail.facilityId, "Verify the API response with facilityId");
                    expect(respjson.facilitiesList[counter].name).toEqual(detail.name, "Verify the API response with facility name");
                    expect(respjson.facilitiesList[counter].address.addressLine).toEqual(detail.address.addressLine, "Verify the API response against address for addressLine");
                    expect(respjson.facilitiesList[counter].address.city).toEqual(detail.address.city, "Verify the API response against address for city");
                    expect(respjson.facilitiesList[counter].address.state).toEqual(detail.address.state, "Verify the API response against address for state");
                    expect(respjson.facilitiesList[counter].address.zipcode).toEqual(detail.address.zipcode, "Verify the API response against address for zipcode");
                    expect(respjson.facilitiesList[counter].address.latitude).toEqual(detail.address.latitude, "Verify the API response against address for latitude");
                    expect(respjson.facilitiesList[counter].address.longitude).toEqual(detail.address.longitude, "Verify the API response against address for longitude");
                    expect(respjson.facilitiesList[counter].phone).toEqual(detail.phone, "Verify the API response with phone");
                    expect(respjson.facilitiesList[counter].emailAddress).toEqual(detail.emailAddress, "Verify the API response with emailAddress");
                    expect(respjson.facilitiesList[counter].faxNumber).toEqual(detail.faxNumber, "Verify the API response with faxNumber");
                    expect(respjson.facilitiesList[counter].website).toEqual(detail.website, "Verify the API response with website");
                    expect(respjson.facilitiesList[counter].practiceLocation.practiceLocationNumber).toEqual(detail.practiceLocation.practiceLocationNumber, "Verify the API response with practiceLocation practiceLocationNumber");
                    expect(respjson.facilitiesList[counter].practiceLocation.officeName).toEqual(detail.practiceLocation.officeName, "Verify the API response with practiceLocation officeName");
                    expect(respjson.facilitiesList[counter].practiceLocation).toEqual(detail.practiceLocation, "Verify the API response with practiceLocation");   
                    
                }

                counter = counter + 1;
            })
        });
    });
});




describe('PD Search - Validating AMGEN Scenarios by providing valid facilityIds to Facility API Operation :  ', function() {

    dataProvider(TestData.AMGENSCENARIOS, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;

        it(scenario + ",Test Case 1:-" + TestDescriptions.AMGENSCENARIOS[scenario]['TC-1'] + " facilityIds: " + JSON.stringify(data.request), function(doneFn) {
            let apiurl = Utility.getapiurl('FACILITYLIST', data.request, '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case-2:-" + TestDescriptions.AMGENSCENARIOS[scenario]['TC-2'], function() {

            respjson.facilitiesList.forEach(function(facility) {


                if (resstatus == 200) {
                    let networks = [];
                    let networkIdNames = [];

                    facility.providers.forEach(function(element) {
                        let providerNetworks = element.providerNetworks;
                        providerNetworks.forEach(function(element) {
                            networks.push(element);
                        })
                        networks.forEach(function(element) {
                            networkIdNames.push(element.networkId);
                        })
                    })


                    if ((data.verify['TC-2'].networkIdToBePresentInProviderNetworks) && ('' !== data.verify['TC-2'].targetNetwork && null != data.verify['TC-2'].targetNetwork) && data.verify['TC-2'].targetNetwork == "2PPO" || data.verify['TC-2'].targetNetwork == "2ppo") {
                        expect(networkIdNames[networkIdNames.indexOf(data.verify['TC-2'].targetNetwork)]).toEqual(data.verify['TC-2'].networkIdToBePresentInProviderNetworks, "Verify the providerNetworks of API response contains " + data.verify['TC-2'].networkIdToBePresentInProviderNetworks);
                    } else if ((data.verify['TC-2'].networkIdToBePresentInProviderNetworks) && ('' !== data.verify['TC-2'].targetNetwork && null != data.verify['TC-2'].targetNetwork) && data.verify['TC-2'].targetNetwork == "2PREMIER" || data.verify['TC-2'].targetNetwork == "2premier") {
                        expect(networkIdNames[networkIdNames.indexOf(data.verify['TC-2'].targetNetwork)]).toEqual(data.verify['TC-2'].networkIdToBePresentInProviderNetworks, "Verify the providerNetworks of API response contains " + data.verify['TC-2'].networkIdToBePresentInProviderNetworks);
                    } else if ((data.verify['TC-2'].networkIdToBePresentInProviderNetworks) && ('' !== data.verify['TC-2'].targetNetwork && null != data.verify['TC-2'].targetNetwork) && data.verify['TC-2'].targetNetwork == "2DELTACARE" || data.verify['TC-2'].targetNetwork == "2deltacare") {
                        expect(networkIdNames[networkIdNames.indexOf(data.verify['TC-2'].targetNetwork)]).toEqual(data.verify['TC-2'].networkIdToBePresentInProviderNetworks, "Verify the providerNetworks of API response contains " + data.verify['TC-2'].networkIdToBePresentInProviderNetworks);
                    }
                }
            })
        });
    });
});
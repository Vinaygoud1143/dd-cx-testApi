'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/providerDirectorySearchAPI/ProviderDirectorySearch_ProviderSuggestion.json');
var TestDescriptions = require('../../../descriptions/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_ProviderSuggestion_desc.json');

// PD Search ProviderKey API giving "Text And Valid Data" and response body with "PD service details JSON data set".
describe('PD Search Suggestion API - Provider text  and requesting to view the provider suggestion  information :  ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + " text " + data.request['text'], function(doneFn) {
            let apiurl = Utility.getapiurl('SUGGESTIONS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });


        it(scenario + ",Test Case-2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {
                if (respjson.providers.length > 0) {

                    respjson.providers.forEach(function(providerresp, index) {
                        data.verify['TC-2'].providers.forEach(function(dataresp, index) {
                            if (providerresp.providerKey === dataresp.providerKey) {
                                expect(providerresp.term).toEqual(dataresp.term, "Verify the API response with term");
                                expect(providerresp.providerKey).toEqual(dataresp.providerKey, "Verify the API response with providerKey");
                                expect(providerresp.specialty).toEqual(dataresp.specialty, "Verify the API response with specialty");
                                expect(providerresp.firstName).toEqual(dataresp.firstName, "Verify the API response with firstName");
                                expect(providerresp.lastName).toEqual(dataresp.lastName, "Verify the API response with lastName");
                                expect(providerresp.address.addressLine).toEqual(dataresp.address.addressLine, "Verify the API response with addressLine");
                                expect(providerresp.address.city).toEqual(dataresp.address.city, "Verify the API response with city");
                                expect(providerresp.address.state).toEqual(dataresp.address.state, "Verify the API response with state");
                                expect(providerresp.address.zipcode).toEqual(dataresp.address.zipcode, "Verify the API response with zipcode");


                            }

                        })
                    })
                }
                if (respjson.specialties.length > 0) {

                    respjson.specialties.forEach(function(providerresp, index) {
                        data.verify['TC-2'].specialties.forEach(function(dataresp, index) {

                            expect(providerresp.term).toEqual(dataresp.term, "Verify the API response with term");
                            expect(providerresp.specialty).toEqual(dataresp.specialty, "Verify the API response with specialty");



                        })
                    })
                }
                if (respjson.practiceLocations.length > 0) {

                    respjson.practiceLocations.forEach(function(providerresp, index) {
                        data.verify['TC-2'].practiceLocations.forEach(function(dataresp, index) {
                            if (providerresp.practiceLocationNumber === dataresp.practiceLocationNumber) {
                                expect(providerresp.term).toEqual(dataresp.term, "Verify the API response with term");
                                expect(providerresp.practiceLocationNumber).toEqual(dataresp.practiceLocationNumber, "Verify the API response with practiceLocationNumber");
                                expect(providerresp.address.addressLine).toEqual(dataresp.address.addressLine, "Verify the API response with addressLine");
                                expect(providerresp.address.city).toEqual(dataresp.address.city, "Verify the API response with city");
                                expect(providerresp.address.state).toEqual(dataresp.address.state, "Verify the API response with state");
                                expect(providerresp.address.zipcode).toEqual(dataresp.address.zipcode, "Verify the API response with zipcode");


                            }

                        })
                    })
                }
                if (respjson.facilities.length > 0) {

                    respjson.facilities.forEach(function(providerresp, index) {
                        data.verify['TC-2'].facilities.forEach(function(dataresp, index) {
                            if (providerresp.facilityId === dataresp.facilityId) {
                                expect(providerresp.term).toEqual(dataresp.term, "Verify the API response with term");
                                expect(providerresp.facilityId).toEqual(dataresp.facilityId, "Verify the API response with facilityId");
                                expect(providerresp.facilityName).toEqual(dataresp.facilityName, "Verify the API response with facilityName");
                                expect(providerresp.address.addressLine).toEqual(dataresp.address.addressLine, "Verify the API response with addressLine");
                                expect(providerresp.address.city).toEqual(dataresp.address.city, "Verify the API response with city");
                                expect(providerresp.address.state).toEqual(dataresp.address.state, "Verify the API response with state");
                                expect(providerresp.address.zipcode).toEqual(dataresp.address.zipcode, "Verify the API response with zipcode");


                            }

                        })
                    })
                }

            }
        });

    });
});
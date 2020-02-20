'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/providerDirectorySearchAPI/ProviderDirectorySearch_FindProviderAPI.json');
var TestDescriptions = require('../../../descriptions/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_FindProviderAPI_desc.json');

// PD Search ProviderKey API giving "Valid Data" and response body with "PD service details JSON data set".
describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the providers information :  ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {

                respjson.providers.forEach(function(resp, index) {
                    data.verify['TC-2'].providers.forEach(function(dataresp, index) {

                        if (resp.providerKey == dataresp.providerKey) {

                            expect(resp.providerKey).toEqual(dataresp.providerKey, "Verify the API response with providerKey");
                            expect(resp.fullName).toEqual(dataresp.fullName, "Verify the API response with fullName");
                            expect(resp.specialty).toEqual(dataresp.specialty, "Verify the API response with specialty");
                            expect(resp.officeName).toEqual(dataresp.officeName, "Verify the API response with officeName");
                            expect(resp.practiceLocationNumber).toEqual(dataresp.practiceLocationNumber, "Verify the API response with practiceLocationNumber");
                            expect(resp.officePhone).toEqual(dataresp.officePhone, "Verify the API response with npi");
                            expect(resp.facilityId).toEqual(dataresp.facilityId, "Verify the API response with facilityId");
                            expect(resp.facilityName).toEqual(dataresp.facilityName, "Verify the API response with facilityName");
                            expect(resp.emailAddress).toEqual(dataresp.emailAddress, "Verify the API response with emailAddress");
                            expect(resp.faxNumber).toEqual(dataresp.faxNumber, "Verify the API response with faxNumber");
                            expect(resp.website).toEqual(dataresp.website, "Verify the API response with website");
                            expect(resp.minimumPatientAge).toEqual(dataresp.minimumPatientAge, "Verify the API response with minimumPatientAge");
                            expect(resp.maximumPatientAge).toEqual(dataresp.maximumPatientAge, "Verify the API response with maximumPatientAge");
                            expect(resp.address.addressLine).toEqual(dataresp.address.addressLine, "Verify the API response with addressLine");
                            expect(resp.address.city).toEqual(dataresp.address.city, "Verify the API response with city");
                            expect(resp.address.state).toEqual(dataresp.address.state, "Verify the API response with state");
                            expect(resp.address.zipcode).toEqual(dataresp.address.zipcode, "Verify the API response with zipcode");

                            resp.providerNetworks.forEach(function(networkresp, index) {
                                dataresp.providerNetworks.forEach(function(datanetworks, index) {
                                    if (networkresp.networkId === datanetworks.networkId) {

                                        expect(networkresp.networkId).toEqual(datanetworks.networkId, "Verify the API response with networkId");
                                        expect(networkresp.networkName).toEqual(datanetworks.networkName, "Verify the API response with networkName");
                                        expect(networkresp.acceptsNewPatients).toEqual(datanetworks.acceptsNewPatients, "Verify the API response with acceptsNewPatients");
                                        expect(networkresp.suppressed).toEqual(datanetworks.suppressed, "Verify the API response with suppressed");
                                        expect(networkresp.dentalHomeType).toEqual(datanetworks.dentalHomeType, "Verify the API response with dentalHomeType");


                                    }
                                })
                            })

                        }

                    })
                })


            }


        });

        it(scenario + ",Test Case 3:-" + TestDescriptions.Scenarios[scenario]['TC-3'], function() {

            if (resstatus == 200) {

                respjson.providers.forEach(function(resp, index) {
                    data.verify['TC-3'].providerQuality.forEach(function(dataresp, index) {

                        if (resp.providerKey == dataresp.providerKey) {

                            expect(resp.providerQuality.yelp.yelpId).toEqual(dataresp.yelp.yelpId, "Verify the API response with yelpId");
                            expect(resp.providerQuality.yelp.yelpUrl).toEqual(dataresp.yelp.yelpUrl, "Verify the API response with yelpUrl");
                            expect(resp.providerQuality.yelp.yelpReviewCount).toEqual(dataresp.yelp.yelpReviewCount, "Verify the API response with yelpReviewCount");
                            expect(resp.providerQuality.yelp.yelpRating).toEqual(dataresp.yelp.yelpRating, "Verify the API response with yelpRating");
                            expect(resp.providerQuality.yelp.yelpDeltaDentalId).toEqual(dataresp.yelp.yelpDeltaDentalId, "Verify the API response with yelpDeltaDentalId");

                            expect(resp.providerQuality.pandRDental.profilingRating).toEqual(dataresp.pandRDental.profilingRating, "Verify the API response with profilingRating");
                            expect(resp.providerQuality.pandRDental.clinicalCompetencyRating).toEqual(dataresp.pandRDental.clinicalCompetencyRating, "Verify the API response with clinicalCompetencyRating");
                            expect(resp.providerQuality.pandRDental.adherenceToTreatmentProtocolsRating).toEqual(dataresp.pandRDental.adherenceToTreatmentProtocolsRating, "Verify the API response with adherenceToTreatmentProtocolsRating");
                            expect(resp.providerQuality.pandRDental.customerSatisfactionRating).toEqual(dataresp.pandRDental.customerSatisfactionRating, "Verify the API response with customerSatisfactionRating");
                            expect(resp.providerQuality.pandRDental.costAndUtilizationRating).toEqual(dataresp.pandRDental.costAndUtilizationRating, "Verify the API response with costAndUtilizationRating");
                            expect(resp.providerQuality.pandRDental.overallRating).toEqual(dataresp.pandRDental.overallRating, "Verify the API response with overallRating");
                            expect(resp.providerQuality.pandRDental.overallGrade).toEqual(dataresp.pandRDental.overallGrade, "Verify the API response with overallGrade");
                            expect(resp.providerQuality.pandRDental.overallAbuseGrade).toEqual(dataresp.pandRDental.overallAbuseGrade, "Verify the API response with overallAbuseGrade");
                            expect(resp.providerQuality.pandRDental.reliabilityScore).toEqual(dataresp.pandRDental.reliabilityScore, "Verify the API response with reliabilityScore");
                            expect(resp.providerQuality.pandRDental.pandrProviderQualityUrl).toEqual(dataresp.pandRDental.pandrProviderQualityUrl, "Verify the API response with pandrProviderQualityUrl");


                        }

                    })

                })


            }
        });

        it(scenario + ",Test Case 4:-" + TestDescriptions.Scenarios[scenario]['TC-4'], function() {

            respjson.providers.forEach(function(resp, index) {

                if (data.verify['TC-4'].isOpen && null != resp.practiceHours) {
                    let weekDays = [];
                    weekDays.push(resp.practiceHours.mondayHours);
                    weekDays.push(resp.practiceHours.tuesdayHours);
                    weekDays.push(resp.practiceHours.wednesdayHours);
                    weekDays.push(resp.practiceHours.thursdayHours);
                    weekDays.push(resp.practiceHours.fridayHours);
                    weekDays.push(resp.practiceHours.saturdayHours);
                    weekDays.push(resp.practiceHours.sundayHours);
                    weekDays.forEach(function(dayTimings) {
                        if ('' !== dayTimings.openTime && '' != dayTimings.closeTime) {
                            expect(dayTimings.isOpen).toBe(data.verify['TC-4'].isOpen, "Verify if isOpen: " + dayTimings.isOpen + " from the API response is an expected value based on " + dayTimings.openTime + " and " + dayTimings.closeTime);
                        } else {
                            expect(dayTimings.isOpen).toBe(!data.verify['TC-4'].isOpen, "Verify if isOpen: " + dayTimings.isOpen + " from the API response is an expected value based on " + ('' == dayTimings.openTime ? null : dayTimings.openTime) + " and " + ('' == dayTimings.closeTime ? null : dayTimings.closeTime));
                        }
                    })
                }

            })

        });

        it(scenario + ",Test Case 5:-" + TestDescriptions.Scenarios[scenario]['TC-5'], function() {

            if (resstatus == 200) {
                expect(respjson.query.zipcode).toEqual(data.verify['TC-5'].query.zipcode, "Verify the API response with Query zipcode");
                expect(respjson.query.latitude).toEqual(data.verify['TC-5'].query.latitude, "Verify the API response with Query latitude");
                expect(respjson.query.longitude).toEqual(data.verify['TC-5'].query.longitude, "Verify the API response with Query longitude");
                expect(respjson.metaData.numberOfProviders).toEqual(data.verify['TC-5'].metaData.numberOfProviders, "Verify the API response with metaData numberOfProviders");
                expect(respjson.metaData.numberOfFacilities).toEqual(data.verify['TC-5'].metaData.numberOfFacilities, "Verify the API response with metaData numberOfFacilities");
                expect(respjson.metaData.numberOfOffices).toEqual(data.verify['TC-5'].metaData.numberOfOffices, "Verify the API response with metaData numberOfOffices");
                if (respjson.generatedFilters.specialty.length > 0) {
                    expect(respjson.generatedFilters.specialty).toEqual(data.verify['TC-5'].generatedFilters.specialty, "Verify the API response with generatedFilters specialty");
                }
            }

        });

    });
});

describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the providersNetworks information :  ', function() {


    dataProvider(TestData.ProviderNetworkScenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.ProviderNetworkScenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.ProviderNetworkScenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {

                respjson.providers.forEach(function(resp, index) {
                    data.verify['TC-2'].providers.forEach(function(dataresp, index) {

                        if (resp.providerKey == dataresp.providerKey) {

                            resp.providerNetworks.forEach(function(networkresp, index) {
                                dataresp.providerNetworks.forEach(function(datanetworks, index) {
                                    if (networkresp.networkId === datanetworks.networkId) {

                                        expect(networkresp.networkId).toEqual(datanetworks.networkId, "Verify the API response with networkId");
                                        expect(networkresp.networkName).toEqual(datanetworks.networkName, "Verify the API response with networkName");
                                        expect(networkresp.acceptsNewPatients).toEqual(datanetworks.acceptsNewPatients, "Verify the API response with acceptsNewPatients");
                                        expect(networkresp.suppressed).toEqual(datanetworks.suppressed, "Verify the API response with suppressed");

                                    }
                                })
                            })

                        }

                    })

                })

            }


        });


        it(scenario + ",Test Case 3:-" + TestDescriptions.ProviderNetworkScenarios[scenario]['TC-3'], function() {

            if (resstatus == 200) {
                expect(respjson.query.zipcode).toEqual(data.verify['TC-3'].query.zipcode, "Verify the API response with Query zipcode");
                expect(respjson.query.latitude).toEqual(data.verify['TC-3'].query.latitude, "Verify the API response with Query latitude");
                expect(respjson.query.longitude).toEqual(data.verify['TC-3'].query.longitude, "Verify the API response with Query longitude");
                expect(respjson.metaData.numberOfProviders).toEqual(data.verify['TC-3'].metaData.numberOfProviders, "Verify the API response with metaData numberOfProviders");
                expect(respjson.metaData.numberOfFacilities).toEqual(data.verify['TC-3'].metaData.numberOfFacilities, "Verify the API response with metaData numberOfFacilities");
                expect(respjson.metaData.numberOfOffices).toEqual(data.verify['TC-3'].metaData.numberOfOffices, "Verify the API response with metaData numberOfOffices");
                if (respjson.generatedFilters.specialty.length > 0) {
                    expect(respjson.generatedFilters.specialty).toEqual(data.verify['TC-3'].generatedFilters.specialty, "Verify the API response with generatedFilters specialty");
                }
            }

        });

    });
});

describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the boardCertified information :  ', function() {


    dataProvider(TestData.boardCertifiedScenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.boardCertifiedScenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.boardCertifiedScenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {

                respjson.providers.forEach(function(resp, index) {
                    data.verify['TC-2'].providers.forEach(function(dataresp, index) {

                        if (resp.providerKey == dataresp.providerKey) {

                            expect(resp.boardCertified).toEqual(dataresp.boardCertified, "Verify the API response with boardCertified");
                        }
                    })
                })
            }
        });

        it(scenario + ",Test Case 3:-" + TestDescriptions.boardCertifiedScenarios[scenario]['TC-3'], function() {

            if (resstatus == 200) {
                expect(respjson.query.zipcode).toEqual(data.verify['TC-3'].query.zipcode, "Verify the API response with Query zipcode");
                expect(respjson.query.latitude).toEqual(data.verify['TC-3'].query.latitude, "Verify the API response with Query latitude");
                expect(respjson.query.longitude).toEqual(data.verify['TC-3'].query.longitude, "Verify the API response with Query longitude");
                expect(respjson.metaData.numberOfProviders).toEqual(data.verify['TC-3'].metaData.numberOfProviders, "Verify the API response with metaData numberOfProviders");
                expect(respjson.metaData.numberOfFacilities).toEqual(data.verify['TC-3'].metaData.numberOfFacilities, "Verify the API response with metaData numberOfFacilities");
                expect(respjson.metaData.numberOfOffices).toEqual(data.verify['TC-3'].metaData.numberOfOffices, "Verify the API response with metaData numberOfOffices");
                if (respjson.generatedFilters.specialty.length > 0) {
                    expect(respjson.generatedFilters.specialty).toEqual(data.verify['TC-3'].generatedFilters.specialty, "Verify the API response with generatedFilters specialty");
                }
            }

        });

    });
});

describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the specialty information :  ', function() {


    dataProvider(TestData.specialtyScenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.specialtyScenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.specialtyScenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {

                respjson.providers.forEach(function(resp, index) {
                    data.verify['TC-2'].providers.forEach(function(dataresp, index) {

                        if (resp.providerKey == dataresp.providerKey) {

                            expect(resp.specialty).toEqual(dataresp.specialty, "Verify the API response with specialty");
                        }
                    })
                })
            }
        });

        it(scenario + ",Test Case 3:-" + TestDescriptions.specialtyScenarios[scenario]['TC-3'], function() {

            if (resstatus == 200) {
                expect(respjson.query.zipcode).toEqual(data.verify['TC-3'].query.zipcode, "Verify the API response with Query zipcode");
                expect(respjson.query.latitude).toEqual(data.verify['TC-3'].query.latitude, "Verify the API response with Query latitude");
                expect(respjson.query.longitude).toEqual(data.verify['TC-3'].query.longitude, "Verify the API response with Query longitude");
                expect(respjson.metaData.numberOfProviders).toEqual(data.verify['TC-3'].metaData.numberOfProviders, "Verify the API response with metaData numberOfProviders");
                expect(respjson.metaData.numberOfFacilities).toEqual(data.verify['TC-3'].metaData.numberOfFacilities, "Verify the API response with metaData numberOfFacilities");
                expect(respjson.metaData.numberOfOffices).toEqual(data.verify['TC-3'].metaData.numberOfOffices, "Verify the API response with metaData numberOfOffices");
                if (respjson.generatedFilters.specialty.length > 0) {
                    expect(respjson.generatedFilters.specialty).toEqual(data.verify['TC-3'].generatedFilters.specialty, "Verify the API response with generatedFilters specialty");
                }
            }

        });

    });
});

describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the networks information :  ', function() {


    dataProvider(TestData.networkScenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.networkScenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.networkScenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {

                respjson.providers.forEach(function(resp, index) {
                    resp.providerNetworks.forEach(function(provNetworks, index) {


                        data.verify['TC-2'].networks.forEach(function(dataresp, index) {
                            if (provNetworks.networkId == dataresp) {

                                expect(provNetworks.networkId).toEqual(dataresp, "Verify the API response with networkId");
                            }
                        })
                    })
                })
            }
        });

        it(scenario + ",Test Case 3:-" + TestDescriptions.networkScenarios[scenario]['TC-3'], function() {

            if (resstatus == 200) {
                expect(respjson.query.zipcode).toEqual(data.verify['TC-3'].query.zipcode, "Verify the API response with Query zipcode");
                expect(respjson.query.latitude).toEqual(data.verify['TC-3'].query.latitude, "Verify the API response with Query latitude");
                expect(respjson.query.longitude).toEqual(data.verify['TC-3'].query.longitude, "Verify the API response with Query longitude");
                expect(respjson.metaData.numberOfProviders).toEqual(data.verify['TC-3'].metaData.numberOfProviders, "Verify the API response with metaData numberOfProviders");
                expect(respjson.metaData.numberOfFacilities).toEqual(data.verify['TC-3'].metaData.numberOfFacilities, "Verify the API response with metaData numberOfFacilities");
                expect(respjson.metaData.numberOfOffices).toEqual(data.verify['TC-3'].metaData.numberOfOffices, "Verify the API response with metaData numberOfOffices");
                if (respjson.generatedFilters.specialty.length > 0) {
                    expect(respjson.generatedFilters.specialty).toEqual(data.verify['TC-3'].generatedFilters.specialty, "Verify the API response with generatedFilters specialty");
                }
            }

        });

    });
});
describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the languages information :  ', function() {


    dataProvider(TestData.languageScenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.languageScenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.languageScenarios[scenario]['TC-2'], function(doneFn) {
            if (resstatus == 200) {

                respjson.providers.forEach(function(resp, index) {

                    let apiurl1 = Utility.getapiurl('PROVIDERKEY', resp.providerKey, '', '');

                    frisby.get(apiurl1)
                        .then(function(providerres) {
                            let response = providerres.json;
                            let language = [];

                            if (response.practiceLocationLanguages.length != 0) {
                                data.verify['TC-2'].languages.forEach(function(languageresp, index) {
                                    response.practiceLocationLanguages.forEach(function(lan) {
                                        if (lan == languageresp) {
                                            language.push(lan);
                                            expect(language).toContain(languageresp, "Verify that language value equal to API response");
                                        }

                                    })
                                })
                            } else {
                                expect(language).toEqual(0, "Verify that language value equal to 0");
                            }


                        }).done(doneFn);
                })
            }
        });

        it(scenario + ",Test Case 3:-" + TestDescriptions.languageScenarios[scenario]['TC-3'], function() {

            if (resstatus == 200) {
                expect(respjson.query.zipcode).toEqual(data.verify['TC-3'].query.zipcode, "Verify the API response with Query zipcode");
                expect(respjson.query.latitude).toEqual(data.verify['TC-3'].query.latitude, "Verify the API response with Query latitude");
                expect(respjson.query.longitude).toEqual(data.verify['TC-3'].query.longitude, "Verify the API response with Query longitude");
                expect(respjson.metaData.numberOfProviders).toEqual(data.verify['TC-3'].metaData.numberOfProviders, "Verify the API response with metaData numberOfProviders");
                expect(respjson.metaData.numberOfFacilities).toEqual(data.verify['TC-3'].metaData.numberOfFacilities, "Verify the API response with metaData numberOfFacilities");
                expect(respjson.metaData.numberOfOffices).toEqual(data.verify['TC-3'].metaData.numberOfOffices, "Verify the API response with metaData numberOfOffices");
                if (respjson.generatedFilters.specialty.length > 0) {
                    expect(respjson.generatedFilters.specialty).toEqual(data.verify['TC-3'].generatedFilters.specialty, "Verify the API response with generatedFilters specialty");
                }
            }

        });

    });
});

describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the officeHours information :  ', function() {


    dataProvider(TestData.officehoursScenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.officehoursScenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.officehoursScenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {

                respjson.providers.forEach(function(resp, index) {
                    data.verify['TC-2'].providers.forEach(function(dataresp, index) {
                        if (resp.practiceHours.openOnSaturday == dataresp.openOnSaturday && resp.providerKey == dataresp.providerKey) {
                            expect(resp.practiceHours.openOnSaturday).toEqual(dataresp.openOnSaturday, "Verify the API response with openOnSaturday");
                        } else if (resp.practiceHours.openOnSunday == dataresp.openOnSunday && resp.providerKey == dataresp.providerKey) {
                            expect(resp.practiceHours.openOnSunday).toEqual(dataresp.openOnSunday, "Verify the API response with openOnSunday");

                        } else if (resp.practiceHours.openEarlyMorning == dataresp.openEarlyMorning && resp.providerKey == dataresp.providerKey) {
                            expect(resp.practiceHours.openEarlyMorning).toEqual(dataresp.openEarlyMorning, "Verify the API response with openEarlyMorning");

                        } else if (resp.practiceHours.openLateEvening == dataresp.openLateEvening && resp.providerKey == dataresp.providerKey) {
                            expect(resp.practiceHours.openLateEvening).toEqual(dataresp.openLateEvening, "Verify the API response with openLateEvening");

                        }
                    })

                })
            }
        });

        it(scenario + ",Test Case 3:-" + TestDescriptions.officehoursScenarios[scenario]['TC-3'], function() {

            if (resstatus == 200) {
                expect(respjson.query.zipcode).toEqual(data.verify['TC-3'].query.zipcode, "Verify the API response with Query zipcode");
                expect(respjson.query.latitude).toEqual(data.verify['TC-3'].query.latitude, "Verify the API response with Query latitude");
                expect(respjson.query.longitude).toEqual(data.verify['TC-3'].query.longitude, "Verify the API response with Query longitude");
                expect(respjson.metaData.numberOfProviders).toEqual(data.verify['TC-3'].metaData.numberOfProviders, "Verify the API response with metaData numberOfProviders");
                expect(respjson.metaData.numberOfFacilities).toEqual(data.verify['TC-3'].metaData.numberOfFacilities, "Verify the API response with metaData numberOfFacilities");
                expect(respjson.metaData.numberOfOffices).toEqual(data.verify['TC-3'].metaData.numberOfOffices, "Verify the API response with metaData numberOfOffices");
                if (respjson.generatedFilters.specialty.length > 0) {
                    expect(respjson.generatedFilters.specialty).toEqual(data.verify['TC-3'].generatedFilters.specialty, "Verify the API response with generatedFilters specialty");
                }
            }

        });

    });
});
describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the metadata information :  ', function() {


    dataProvider(TestData.metadataScenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.metadataScenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });


        it(scenario + ",Test Case 2:-" + TestDescriptions.metadataScenarios[scenario]['TC-2'], function() {

            if (resstatus == 200) {
                expect(respjson.query.zipcode).toEqual(data.verify['TC-2'].query.zipcode, "Verify the API response with Query zipcode");
                expect(respjson.query.latitude).toEqual(data.verify['TC-2'].query.latitude, "Verify the API response with Query latitude");
                expect(respjson.query.longitude).toEqual(data.verify['TC-2'].query.longitude, "Verify the API response with Query longitude");
                expect(respjson.metaData.numberOfProviders).toEqual(data.verify['TC-2'].metaData.numberOfProviders, "Verify the API response with metaData numberOfProviders");
                expect(respjson.metaData.numberOfFacilities).toEqual(data.verify['TC-2'].metaData.numberOfFacilities, "Verify the API response with metaData numberOfFacilities");
                expect(respjson.metaData.numberOfOffices).toEqual(data.verify['TC-2'].metaData.numberOfOffices, "Verify the API response with metaData numberOfOffices");
                if (respjson.generatedFilters.specialty.length > 0) {
                    expect(respjson.generatedFilters.specialty).toEqual(data.verify['TC-2'].generatedFilters.specialty, "Verify the API response with generatedFilters specialty");
                }
            }

        });

    });
});

describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the Sorting by distance field information :  ', function() {


    dataProvider(TestData.sortByFieldAndOrderScenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.sortByFieldAndOrderScenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.sortByFieldAndOrderScenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {
                let distance = [];

                respjson.providers.forEach(function(resp, index) {

                    distance.push(resp.distance);

                })
                if ("asc" == data.verify['TC-2'].sortorder) {
                    expect(distance).toEqual(distance.sort(), "Verify that distance are in ascending order");
                } else if ("desc" == data.verify['TC-2'].sortorder) {
                    expect(distance).not.toEqual(distance.sort, "Verify that distance are in descending order");
                }
            }
        });

        it(scenario + ",Test Case 3:-" + TestDescriptions.sortByFieldAndOrderScenarios[scenario]['TC-3'], function() {

            if (resstatus == 200) {
                expect(respjson.query.zipcode).toEqual(data.verify['TC-3'].query.zipcode, "Verify the API response with Query zipcode");
                expect(respjson.query.latitude).toEqual(data.verify['TC-3'].query.latitude, "Verify the API response with Query latitude");
                expect(respjson.query.longitude).toEqual(data.verify['TC-3'].query.longitude, "Verify the API response with Query longitude");
                expect(respjson.metaData.numberOfProviders).toEqual(data.verify['TC-3'].metaData.numberOfProviders, "Verify the API response with metaData numberOfProviders");
                expect(respjson.metaData.numberOfFacilities).toEqual(data.verify['TC-3'].metaData.numberOfFacilities, "Verify the API response with metaData numberOfFacilities");
                expect(respjson.metaData.numberOfOffices).toEqual(data.verify['TC-3'].metaData.numberOfOffices, "Verify the API response with metaData numberOfOffices");
                if (respjson.generatedFilters.specialty.length > 0) {
                    expect(respjson.generatedFilters.specialty).toEqual(data.verify['TC-3'].generatedFilters.specialty, "Verify the API response with generatedFilters specialty");
                }
            }

        });

    });
});
describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the FristName in Freetext information :  ', function() {


    dataProvider(TestData.firstNameInFreeTextScenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.firstNameInFreeTextScenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.firstNameInFreeTextScenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {


                respjson.providers.forEach(function(provider) {

                    expect(provider.fullName).toContain(data.verify['TC-2'].free_text, "Verify that firstName is in fullName contain " + data.verify['TC-2'].free_text);

                })

            }
        });

    });
});
describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the LastName in Freetext information :  ', function() {


    dataProvider(TestData.lastNameInFreeTextScenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.lastNameInFreeTextScenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.lastNameInFreeTextScenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {


                respjson.providers.forEach(function(provider) {

                    expect(provider.fullName).toContain(data.verify['TC-2'].free_text, "Verify that firstName is in LastName contain " + data.verify['TC-2'].free_text);

                })

            }
        });

    });
});
describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the AlphaNumeric in Freetext information :  ', function() {


    dataProvider(TestData.alphanumericInFreeTextScenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.alphanumericInFreeTextScenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.alphanumericInFreeTextScenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {


                respjson.providers.forEach(function(provider) {

                    expect(provider.officeName).toContain(data.verify['TC-2'].free_text, "Verify that firstName is in officeName contain " + data.verify['TC-2'].free_text);

                })

            }
        });

    });
});
describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the NPI in Freetext information :  ', function() {


    dataProvider(TestData.npiInFreeTextScenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.npiInFreeTextScenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.npiInFreeTextScenarios[scenario]['TC-2'], function(doneFn) {
            if (resstatus == 200) {


                respjson.providers.forEach(function(provider) {
                    let apiurl1 = Utility.getapiurl('PROVIDERKEY', provider.providerKey, '', '');
                    return frisby.get(apiurl1)
                        .then(function(providerres) {
                            let response = providerres.json;
                            expect(response.npi).toEqual(data.verify['TC-2'].free_text, "Verify that free_text value equal to " + data.verify['TC-2'].free_text);
                        }).done(doneFn);


                })

            }
        });

    });
});

describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the officeName in Freetext information :  ', function() {


    dataProvider(TestData.officeNameInFreeTextScenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.officeNameInFreeTextScenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.officeNameInFreeTextScenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {

                respjson.providers.forEach(function(resp, index) {

                    expect(resp.officeName).toContain(data.verify['TC-2'].free_text, "Verify that freeText is in officeName contain " + data.verify['TC-2'].free_text);
                })
            }
        });

    });
});

describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the language in Freetext information :  ', function() {


    dataProvider(TestData.languageInFreeTextScenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.languageInFreeTextScenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.languageInFreeTextScenarios[scenario]['TC-2'], function(doneFn) {
            if (resstatus == 200) {
                respjson.providers.forEach(function(resp, index) {

                    let apiurl1 = Utility.getapiurl('PROVIDERKEY', resp.providerKey, '', '');
                    frisby.get(apiurl1)
                        .then(function(providerres) {
                            let response = providerres.json;
                            let language = [];

                            if (response.practiceLocationLanguages.length != 0) {
                                response.practiceLocationLanguages.forEach(function(lan) {
                                    if (lan == data.verify['TC-2'].free_text) {
                                        language.push(lan);
                                        expect(language).toContain(data.verify['TC-2'].free_text, "Verify that free_text value equal to " + data.verify['TC-2'].free_text);
                                    }

                                })
                            } else {
                                expect(language).toEqual(0, "Verify that free_text value equal to 0");
                            }


                        }).done(doneFn);
                })
            }
        });

    });
});

describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the licenseNumber in Freetext information :  ', function() {


    dataProvider(TestData.licenseNumberInFreeTextScenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.licenseNumberInFreeTextScenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });
        if(TestDescriptions.licenseNumberInFreeTextScenarios[scenario]['TC-2']!==undefined){
        it(scenario + ",Test Case 2:-" + TestDescriptions.licenseNumberInFreeTextScenarios[scenario]['TC-2'], function(doneFn) {
            
            if (resstatus == 200) {
                respjson.providers.forEach(function(resp, index) {

                    let apiurl1 = Utility.getapiurl('PROVIDERKEY', resp.providerKey, '', '');
                    frisby.get(apiurl1)
                        .then(function(providerres) {
                            let response = providerres.json;
                            expect(response.license.licenseNumber).toEqual(data.verify['TC-2'].free_text, "Verify that free_text value equal to " + data.verify['TC-2'].free_text);
                        }).done(doneFn);
                })
            }
        
        });
        }
    });
});

describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the providerNetwork in Freetext information :  ', function() {


    dataProvider(TestData.providerNetworkInFreeTextScenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.providerNetworkInFreeTextScenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.providerNetworkInFreeTextScenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {
                respjson.providers.forEach(function(resp, index) {

                    var networks = [];
                    if (resp.providerNetworks.length > 0) {
                        resp.providerNetworks.forEach(function(network) {
                            if (network.networkId == data.verify['TC-2'].free_text) {
                                networks.push(network.networkId);
                                expect(networks).toContain(data.verify['TC-2'].free_text, "Verify that newtworks contain " + data.verify['TC-2'].free_text);
                            }

                        })
                    }


                })
            }
        });

    });
});

describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the facilityName in Freetext information :  ', function() {


    dataProvider(TestData.facilityNameInFreeTextScenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.facilityNameInFreeTextScenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.facilityNameInFreeTextScenarios[scenario]['TC-2'], function(doneFn) {
            if (resstatus == 200) {
                respjson.providers.forEach(function(resp, index) {

                    if (resp.facilityId != null) {
                        let apiurl1 = Utility.getapiurl('FACILITIES', resp.facilityId, '', '');
                        frisby.get(apiurl1)
                            .then(function(facilityres) {
                                let response = facilityres.json;
                                if (response.name.includes(data.verify['TC-2'].free_text)) {
                                    expect(response.name).toContain(data.verify['TC-2'].free_text, "Verify that free_text value equal to " + data.verify['TC-2'].free_text);
                                }
                            }).done(doneFn);


                    }


                })
            }
        });

    });
});

describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the officeName with special characters in Freetext information :  ', function() {


    dataProvider(TestData.officeNameWithSpecialCharactersInFreeTextScenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.officeNameWithSpecialCharactersInFreeTextScenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.officeNameWithSpecialCharactersInFreeTextScenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {

                respjson.providers.forEach(function(resp, index) {

                    expect(resp.officeName).toContain(data.verify['TC-2'].free_text, "Verify that freeText is in officeName contain " + data.verify['TC-2'].free_text);
                })
            }
        });

    });
});
describe('PD Search FindProvider API - Providers Details API by giving valid data and requesting to view the officeAccess information :  ', function() {


    dataProvider(TestData.officeAccessScenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.officeAccessScenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.officeAccessScenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {

                respjson.providers.forEach(function(resp, index) {
                    data.verify['TC-2'].providers.forEach(function(dataresp, index) {
                        if (resp.accessibility.freeParking == dataresp.freeParking && resp.providerKey == dataresp.providerKey) {
                            expect(resp.accessibility.freeParking).toEqual(dataresp.freeParking, "Verify the API response with freeParking");
                        } else if (resp.accessibility.wheelChairAccess == dataresp.wheelChairAccess && resp.providerKey == dataresp.providerKey) {
                            expect(resp.accessibility.wheelChairAccess).toEqual(dataresp.wheelChairAccess, "Verify the API response with wheelChairAccess");

                        } else if (resp.accessibility.publicTransitAccess == dataresp.publicTransitAccess && resp.providerKey == dataresp.providerKey) {
                            expect(resp.accessibility.publicTransitAccess).toEqual(dataresp.publicTransitAccess, "Verify the API response with publicTransitAccess");

                        } else if (resp.accessibility.internetAccess == dataresp.internetAccess && resp.providerKey == dataresp.providerKey) {
                            expect(resp.accessibility.internetAccess).toEqual(dataresp.internetAccess, "Verify the API response with internetAccess");

                        }
                    })

                })
            }
        });

    });
});
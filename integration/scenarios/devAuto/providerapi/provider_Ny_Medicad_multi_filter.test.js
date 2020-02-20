'use strict';
var TestData = require('../../../testData/devAuto/' + testDataEnv + '/providerapi/provider_Ny_Medicad_multi_filter.json');

describe('Data-Driven Test to verify "AND" logic across filters: ', function () {
    beforeEach(function () {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    dataProvider(TestData.OfficeHours_OfficeAccess, function (data, description) {
        it(description + ": Validate (" + data.params.office_hours + " AND " + data.params.office_access + ") within " + data.params.distance + " miles of Zip Code: " + data.params.zipcode, function (doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function (res) {
                    let json = res.json;
                    expect(res.status).toEqual(200, 'Verifies if the API gives a valid response code');

                    // Putting "count" in so we could easily identify / group expect statements belonging to the same Provider in Test Report
                    let count = 0;

                    if (res.status == 200) {
                        json.providers.forEach(function (prod, index) {
                            let provider = prod;
                            count++;

                            // Verify correct Office_Hour flag based on Input Test Data from JSON file
                            expect(checkOfficeHours(provider, data.params.office_hours)).toEqual(true, count + ' --- Verifies that Provider Office is open on ' + data.params.office_hours + '. Provider -> ' + provider.providerKey);

                            // Verify correct Office_Access flag based on Input Test Data from JSON file
                            expect(checkOfficeAccess(provider, data.params.office_access)).toEqual(true, count + ' --- Verifies that Office has ' + data.params.office_access + ' available. Provider ->' + provider.providerKey);
                        })
                    }
                })
                .done(doneFn);
        });
    });
    dataProvider(TestData.OfficeHours_OfficeAccess_AcceptingNewPatients, function (data, description) {
        it(description + ": Validate (" + data.params.office_hours + " AND " + data.params.office_access + " AND accept_new_patients) within " + data.params.distance + " miles of Zip Code: " + data.params.zipcode, function (doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function (res) {
                    let json = res.json;
                    expect(res.status).toEqual(200, 'Verifies if the API gives a valid response code');

                    // Putting "count" in so we could easily identify / group expect statements belonging to the same Provider in Test Report
                    let count = 0;

                    if (res.status == 200) {
                        json.providers.forEach(function (prod, index) {
                            let provider = prod;
                            count++;

                            // Verify correct Office_Hour flag based on Input Test Data from JSON file
                            expect(checkOfficeHours(provider, data.params.office_hours)).toEqual(true, count + ' --- Verifies that Provider Office is open on ' + data.params.office_hours + '. Provider -> ' + provider.providerKey);

                            // Verify correct Office_Access flag based on Input Test Data from JSON file
                            expect(checkOfficeAccess(provider, data.params.office_access)).toEqual(true, count + ' --- Verifies that Office has ' + data.params.office_access + ' available. Provider ->' + provider.providerKey);

                            // Verify if the Provider is accepting new patients
                            expect(checkAcceptingNewPatient(provider)).toEqual(true, count + ' --- Verifies that accepts new Patients flag should be "Y" for at least one of the Provider\'s Networks ->' + provider.providerKey);
                        })
                    }
                })
                .done(doneFn);
        });
    });
});

describe('Data-Driven Test to verify "AND" logic across filters with "OR" logic within filters: ', function () {
    beforeEach(function () {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    dataProvider(TestData.OfficeHours_2_OfficeAccess, function (data, description) {
        it(description + ": Validate ((" + data.params.office_hours[0] + " OR " + data.params.office_hours[1] + ") AND " + data.params.office_access + ") within " + data.params.distance + " miles of Zip Code: " + data.params.zipcode, function (doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function (res) {
                    let json = res.json;
                    expect(res.status).toEqual(200, 'Verifies if the API gives a valid response code');
                    let count = 0;
                    if (res.status == 200) {
                        json.providers.forEach(function (prod, index) {
                            let provider = prod;
                            count++;

                            // officeHoursFlag will be true even if a single office_hours flag from API response meets the input JSON data requirements for Office Hours
                            let officeHoursFlag = false;

                            data.params.office_hours.forEach(function (officeHours) {
                                if (!officeHoursFlag) {
                                    officeHoursFlag = checkOfficeHours(provider, officeHours);
                                }
                            })

                            // Verify correct Office_Hour flag based on Input Test Data from JSON file
                            expect(officeHoursFlag).toEqual(true, count + ' --- Verifies that Provider Office is open either on ' + data.params.office_hours[0] + ' or ' + data.params.office_hours[1] + '. Provider -> ' + provider.providerKey);

                            // Verify correct Office_Access flag based on Input Test Data from JSON file
                            expect(checkOfficeAccess(provider, data.params.office_access)).toEqual(true, count + ' --- Verifies that Office has ' + data.params.office_access + ' available. Provider ->' + provider.providerKey);
                        })
                    }
                })
                .done(doneFn);
        });
    });

    dataProvider(TestData.OfficeHours_2_OfficeAccess_2, function (data, description) {
        it(description + ": Validate ((" + data.params.office_hours[0] + " OR " + data.params.office_hours[1] + ") AND (" + data.params.office_access[0] + " OR " + data.params.office_access[1] + ")) within " + data.params.distance + " miles of Zip Code: " + data.params.zipcode, function (doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function (res) {
                    let json = res.json;
                    expect(res.status).toEqual(200, 'Verifies if the API gives a valid response code');
                    let count = 0;
                    if (res.status == 200) {
                        json.providers.forEach(function (prod, index) {
                            let provider = prod;
                            count++;

                            // officeHoursFlag will be true even if a single office_hours flag from API response meets the input JSON data requirements for Office Hours
                            let officeHoursFlag = false;
                            // officeAccessFlag will be true even if a single office_access flag from API response meets the input JSON data requirements for Office Access
                            let officeAccessFlag = false;

                            data.params.office_hours.forEach(function (officeHours) {
                                if (!officeHoursFlag) {
                                    officeHoursFlag = checkOfficeHours(provider, officeHours);
                                }
                            });
                            // Verify correct Office_Hour flag based on Input Test Data from JSON file
                            expect(officeHoursFlag).toEqual(true, count + ' --- Verifies that Provider Office is open either on ' + data.params.office_hours[0] + ' or ' + data.params.office_hours[1] + '. Provider -> ' + provider.providerKey);

                            data.params.office_access.forEach(function (officeAccess) {
                                if (!officeAccessFlag) {
                                    officeAccessFlag = checkOfficeAccess(provider, officeAccess);
                                }
                            });
                            // Verify correct Office_Access flag based on Input Test Data from JSON file
                            expect(officeAccessFlag).toEqual(true, count + ' --- Verifies that Office has either ' + data.params.office_access[0] + ' or ' + data.params.office_access[1] + ' available. Provider ->' + provider.providerKey);
                        })
                    }
                })
                .done(doneFn);
        });
    });
});

function checkOfficeHours(provider, data) {
    switch (data) {
        case 'saturday': 
            if (provider.practiceHours.openOnSaturday == true) {
                return true;
            }
            return false;
        case 'sunday': 
            if (provider.practiceHours.openOnSunday == true) {
                return true;
            }
            return false;
        case 'evening': 
            if (provider.practiceHours.openLateEvening == true) {
                return true;
            }
            return false;
        case 'morning': 
            if (provider.practiceHours.openEarlyMorning == true) {
                return true;
            }
            return false;
        default: 
            return false;
    }
};

function checkOfficeAccess(provider, data) {
    switch (data) {
        case 'free_parking': 
            if (provider.accessibility.freeParking == 'Yes') {
                return true;
            }
            return false;
        case 'wheel_chair_access': 
            if (provider.accessibility.wheelChairAccess == 'Yes') {
                return true;
            }
            return false;
        case 'public_transit_access': 
            if (provider.accessibility.publicTransitAccess == 'Yes') {
                return true;
            }
            return false;
        case 'internet_access': 
            if (provider.accessibility.internetAccess == 'Yes') {
                return true;
            }
            return false;
        default: 
            return false;
    }
}

function checkAcceptingNewPatient(provider) {
    let flag = false;
    provider.providerNetworks.forEach(function (pNetworks, index) {
        if (pNetworks.acceptsNewPatients == 'Y') {
            flag = true;
        }
    })
    return flag;
}
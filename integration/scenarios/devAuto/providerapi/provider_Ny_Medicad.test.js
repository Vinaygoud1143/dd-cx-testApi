'use strict';
var TestData = require('../../../testData/devAuto/' + testDataEnv + '/providerapi/provider_Ny_Medicad.json');

describe('Providers of NY-MED Office Hours on Saturday: ', function () {
    beforeEach(function () {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    dataProvider(TestData.saturday, function (data, description) {
        it(description + ":Validates Single Selection on Office Hours Filter -> Saturday", function (doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function (res) {
                    let json = res.json;
                    expect(res.status).toEqual(200);
                    if (res.status == 200) {
                        json.providers.forEach(function (prod, index) {
                            let provider = prod;
                            expect(provider.practiceHours.openOnSaturday).toEqual(true, 'Verifies that Practice Hours on Saturday isOpen should be "TRUE" for the Provider ->' + provider.providerKey);
                        })
                    }
                })
                .done(doneFn);
        });
    });
});
describe('Providers of NY-MED Office Hours on Sunday: ', function () {
    beforeEach(function () {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    dataProvider(TestData.sunday, function (data, description) {
        it(description + ":Validates Single Selection on Office Hours Filter -> Sunday", function (doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function (res) {
                    let json = res.json;
                    expect(res.status).toEqual(200);
                    if (res.status == 200) {
                        json.providers.forEach(function (prod, index) {
                            let provider = prod;
                            expect(provider.practiceHours.openOnSunday).toEqual(true, 'Verifies that Practice Hours on Sunday isOpen should be "TRUE" for the Provider ->' + provider.providerKey);
                        })
                    }
                })
                .done(doneFn);
        });
    });
});
describe('Providers of NY-MED Office Hours on Evening: ', function () {
    beforeEach(function () {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    dataProvider(TestData.evening, function (data, description) {
        it(description + ":Validates Single Selection on Office Hours Filter -> Evening", function (doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function (res) {
                    let json = res.json;
                    expect(res.status).toEqual(200);
                    if (res.status == 200) {
                        json.providers.forEach(function (prod, index) {
                            let provider = prod;
                            expect(provider.practiceHours.openLateEvening).toEqual(true, 'Verifies that Practice Hours is Open at Late Evenings should be "TRUE" for the Provider ->' + provider.providerKey);
                        })
                    }
                })
                .done(doneFn);
        });
    });
});
describe('Providers of NY-MED Office Hours on Morning:  ', function () {
    beforeEach(function () {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    dataProvider(TestData.morning, function (data, description) {
        it(description + ":Validates Single Selection on Office Hours Filter -> Morning", function (doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function (res) {
                    let json = res.json;
                    expect(res.status).toEqual(200);
                    if (res.status == 200) {
                        json.providers.forEach(function (prod, index) {
                            let provider = prod;
                            expect(provider.practiceHours.openEarlyMorning).toEqual(true, 'Verifies that Practice Hours is Open at Early Morning should be "TRUE" for the Provider ->' + provider.providerKey);
                        })
                    }
                })
                .done(doneFn);
        });
    });
});
describe('Providers of NY-MED Office Hours on all options ', function () {
    beforeEach(function () {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    dataProvider(TestData.allOfficeHours, function (data, description) {
        it(description + ":Validates All Selection on Office Hours", function (doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function (res) {
                    let json = res.json;
                    expect(res.status).toEqual(200);
                    if (res.status == 200) {
                        json.providers.forEach(function (prod, index) {
                            let provider = prod;
                            if (provider.practiceHours.openOnSaturda == true) {
                                expect(provider.practiceHours.openOnSaturday).toEqual(true, 'Verifies that Practice Hours on Saturday isOpen should be "TRUE" for the Provider ->' + provider.providerKey);
                            } else if (provider.practiceHours.openOnSunday == true) {
                                expect(provider.practiceHours.openOnSunday).toEqual(true, 'Verifies that Practice Hours on Sunday isOpen should be "TRUE" for the Provider ->' + provider.providerKey);
                            } else if (provider.practiceHours.openLateEvening == true) {
                                expect(provider.practiceHours.openLateEvening).toEqual(true, 'Verifies that Practice Hours is Open at Late Evenings should be "TRUE" for the Provider ->' + provider.providerKey);
                            } else if (provider.practiceHours.openEarlyMorning == true) {
                                expect(provider.practiceHours.openEarlyMorning).toEqual(true, 'Verifies that Practice Hours is Open at Early Morning should be "TRUE" for the Provider ->' + provider.providerKey);
                            }
                        })
                    }

                })
                .done(doneFn);
        });
    });
});
describe('Providers of NY-MED Office access in free Parking: ', function () {
    beforeEach(function () {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    dataProvider(TestData.freeParking, function (data, description) {
        it(description + ":Validates Single Selection on Office access Filter -> Free Parking", function (doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function (res) {
                    let json = res.json;
                    expect(res.status).toEqual(200);
                    if (res.status == 200) {
                        json.providers.forEach(function (prod, index) {
                            let provider = prod;
                            expect(provider.accessibility.freeParking).toEqual('Yes', 'Verifies that Office access of free parking should be "Yes" for the Provider ->' + provider.providerKey);
                        })
                    }
                })
                .done(doneFn);
        });
    });
});
describe('Providers of NY-MED Office access in wheel Chair Access: ', function () {
    beforeEach(function () {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    dataProvider(TestData.wheelChairAccess, function (data, description) {
        it(description + ":Validates Single Selection on Office access Filter -> Wheel Chair Access", function (doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function (res) {
                    let json = res.json;
                    expect(res.status).toEqual(200);
                    if (res.status == 200) {
                        json.providers.forEach(function (prod, index) {
                            let provider = prod;
                            expect(provider.accessibility.wheelChairAccess).toEqual('Yes', 'Verifies that Office access of wheel Chair Access should be "Yes" for the Provider ->' + provider.providerKey);
                        })
                    }
                })
                .done(doneFn);
        });
    });
});
describe('Providers of NY-MED Office access in Public Transit Access: ', function () {
    beforeEach(function () {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    dataProvider(TestData.publicTransitAccess, function (data, description) {
        it(description + ":Validates Single Selection on Office access Filter -> Public Transit Access", function (doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function (res) {
                    let json = res.json;
                    expect(res.status).toEqual(200);
                    if (res.status == 200) {
                        json.providers.forEach(function (prod, index) {
                            let provider = prod;
                            expect(provider.accessibility.publicTransitAccess).toEqual('Yes', 'Verifies that Office access of Public Transit Access should be "Yes" for the Provider ->' + provider.providerKey);
                        })
                    }
                })
                .done(doneFn);
        });
    });
});
describe('Providers of NY-MED Office access in Internet Access: ', function () {
    beforeEach(function () {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    dataProvider(TestData.internetAccess, function (data, description) {
        it(description + ":Validates Single Selection on Office access Filter -> Internet Access", function (doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function (res) {
                    let json = res.json;
                    expect(res.status).toEqual(200);
                    if (res.status == 200) {
                        json.providers.forEach(function (prod, index) {
                            let provider = prod;
                            expect(provider.accessibility.internetAccess).toEqual('Yes', 'Verifies that Office access of Internet Access should be "Yes" for the Provider ->' + provider.providerKey);
                        })
                    }
                })
                .done(doneFn);
        });
    });
});
describe('Providers of NY-MED Office access on all options: ', function () {
    beforeEach(function () {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    dataProvider(TestData.allOfficeAccess, function (data, description) {
        it(description + ":Validates All options in Office access", function (doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function (res) {
                    let json = res.json;
                    expect(res.status).toEqual(200);
                    if (res.status == 200) {
                        json.providers.forEach(function (prod, index) {
                            let provider = prod;
                            if (provider.accessibility.freeParking == 'Yes') {
                                expect(provider.accessibility.freeParking).toEqual('Yes', 'Verifies that Office access of free parking should be "Yes" for the Provider ->' + provider.providerKey);
                            } else if (provider.accessibility.wheelChairAccess == 'Yes') {
                                expect(provider.accessibility.wheelChairAccess).toEqual('Yes', 'Verifies that Office access of wheel Chair Access should be "Yes" for the Provider ->' + provider.providerKey);
                            } else if (provider.accessibility.publicTransitAccess == 'Yes') {
                                expect(provider.accessibility.publicTransitAccess).toEqual('Yes', 'Verifies that Office access of Public Transit Access should be "Yes" for the Provider ->' + provider.providerKey);
                            } else if (provider.accessibility.internetAccess == 'Yes') {
                                expect(provider.accessibility.internetAccess).toEqual('Yes', 'Verifies that Office access of Internet Access should be "Yes" for the Provider ->' + provider.providerKey);
                            }
                        })
                    }
                })
                .done(doneFn);
        });
    });
});
describe('Providers of NY-MED Accepting New Patients: ', function () {
    beforeEach(function () {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    dataProvider(TestData.acceptNewPatients, function (data, description) {
        it(description + ":Validates accepts new Patients flag", function (doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function (res) {
                    let json = res.json;
                    expect(res.status).toEqual(200);
                    if (res.status == 200) {
                        json.providers.forEach(function (prod, index) {
                            let pvdrs = prod;
                            let flag = false;
                            pvdrs.providerNetworks.forEach(function (pNetworks, index) {
                                if (pNetworks.acceptsNewPatients == 'Y') {
                                    flag = true;
                                }
                            })
                            expect(flag).toEqual(true, 'Verifies that accepts new Patients flag should be "Y" for at least one of the Provider\'s Networks ->' + pvdrs.providerKey);
                        })
                    }
                })
                .done(doneFn);
        });
    });
});
describe('Providers of NY-MED Not Accepting New Patients: ', function () {
    beforeEach(function () {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    dataProvider(TestData.notAcceptNewPatients, function (data, description) {
        it(description + ":Validates not accepts new Patients flag", function (doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function (res) {
                    let json = res.json;
                    expect(res.status).toEqual(200);
                    if (res.status == 200) {
                        json.providers.forEach(function (prod, index) {
                            let pvdrs = prod;
                            pvdrs.providerNetworks.forEach(function (pNetworks, index) {
                                let proNetworks = pNetworks;
                                if (proNetworks.acceptsNewPatients == 'Y') {
                                    expect(proNetworks.acceptsNewPatients).toEqual('Y', 'Verifies that accepts new Patients should be "Y" for the Provider ->' + pvdrs.providerKey);
                                } else if (proNetworks.acceptsNewPatients == 'N') {
                                    expect(proNetworks.acceptsNewPatients).toEqual('N', 'Verifies that not accepts new Patients should be "N" for the Provider ->' + pvdrs.providerKey);
                                }
                            })
                        })
                    }
                })
                .done(doneFn);
        });
    });
});

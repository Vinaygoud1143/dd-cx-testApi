'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/familyRosterAPI/FamilyRosterServiceNegativeScenarios.json');
var TestDescriptions = require('../../../descriptions/devEng/familyRosterAPI/FamilyRosterServiceNegativeScenarios_desc.json');

// Family Roster Service API giving "Invalid Contract-Id, Group-Id, Division-Id Or Headers" and response body with "Enrollee service details JSON data set".
describe('Family Roster Service API - FamilyRoster Service Negative Scenarios:  ', function() {
    dataProvider(TestData.Scenarios, function(data, scenario) {

        var respjson, resstatus;
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + "  PersonID: " + data.headers.personId + "  Client Key: " + data.headers.ClientKey + "", function(doneFn) {
            let apiurl = Utility.getapiurl('FAMILYCONTRACT', data.request['personId']);
            frisby
                .setup({
                    request: {
                        headers: {
                            'PersonId': data.headers.personId,
                            'ClientKey': data.headers.ClientKey,
                            'Content-Type': 'application/json'
                        }
                    }
                })
                .get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode);
                    resstatus = res.status;
                }).done(doneFn);
        });


        it(scenario + ",Test Case 2:-" + TestDescriptions.Scenarios[scenario]['TC-2'] + "", function() {

            if (resstatus == 403) {
                expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode);                
                expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription);
            } else if (resstatus == 401) {
                expect(respjson.message).toEqual(data.verify['TC-2'].message);
                expect(respjson.error).toEqual(data.verify['TC-2'].error);
            } else if (resstatus == 400) {
                expect(respjson.message).toEqual(data.verify['TC-2'].message);
                expect(respjson.error).toEqual(data.verify['TC-2'].error);
            }
        });
    });
});

 TestData = require('../../../testData/devEng/' + testDataEnv + '/familyRosterAPI/FamilyRosterEnrolleeServiceNegativeScenarios.json');
 TestDescriptions = require('../../../descriptions/devEng/familyRosterAPI/FamilyRosterEnrolleeServiceNegativeScenarios_desc.json');

describe('Family Roster Service API - FamilyRoster Enrollee Service Negative Scenarios:  ', function() {
    dataProvider(TestData.Scenarios, function(data, scenario) {

        var respjson, resstatus;
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + "  PersonID: " + data.headers.personId + "  Client Key: " + data.headers.ClientKey + "", function(doneFn) {
            let apiurl = Utility.getapiurl('FAMILYENROLLEE', data.request['contractId'], '',data.request['params']);
            frisby
                .setup({
                    request: {
                        headers: {
                            'PersonId': data.headers.personId,
                            'ClientKey': data.headers.ClientKey,
                            'Content-Type': 'application/json'
                        }
                    }
                })
                .get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode);
                    resstatus = res .status;
                }).done(doneFn);
        });


        it(scenario + ",Test Case-2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {

            if (resstatus == 404) {
                expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode);                
                expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription);
                expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription);
            }
            else if (resstatus == 4009 || resstatus == 401) {
                expect(respjson.error).toEqual(data.verify['TC-2'].error);
                expect(respjson.message).toEqual(data.verify['TC-2'].message);
            } 

        });
    });
});
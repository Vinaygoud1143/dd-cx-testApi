'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/providerDirectorySearchAPI/ProviderDirectorySearch_Empty_Providerkey.json');
var TestDescriptions = require('../../../descriptions/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_Empty_Providerkey_desc.json');

// PD Search ProviderKey API giving "Empty ProviderKey" and response body with "error JSON Data Set".
describe('PD Search ProviderKey API- Empty ProviderKey and requesting to view the provider information :  ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + " providerKey: " + data.request['providerKey'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERKEY', data.request['providerKey'], '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });


        it(scenario + ",Test Case-2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {
            if (resstatus == 500) {
                expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode, "Verify the API response with error code");
                expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription, "Verify the API response with shortDescription");
                expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription, "Verify the API response with detailedDescription");

            }
        });
        
    });
});
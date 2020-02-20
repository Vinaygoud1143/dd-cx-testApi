'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/providerDirectorySearchAPI/ProviderDirectorySearch_ProviderWrongAddressKey.json');
var TestDescriptions = require('../../../descriptions/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_ProviderWrongAddressKey_desc.json');

// PD Search ProviderKey API giving "Text And Valid Data" and response body with "PD service details JSON data set".
describe('PD Search Provider API - To View The Provider Information Via Wrong Address :  ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });


        it(scenario + ",Test Case-2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {
            if (resstatus == 400) {
                        expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode, "Verify the API response with errorCode");
                        expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription, "Verify the API response with shortDescription");
                        expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription, "Verify the API response with detailedDescription");
                        
            }
        });

    });
});
'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/providerDirectorySearchAPI/ProviderDirectorySearch_PracticeLocationDetailsAPI.json');
var TestDescriptions = require('../../../descriptions/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_PracticeLocationDetailsAPI_desc.json');

// PD Search ProviderKey API giving "Valid Office-Id" and response body with "PD service details JSON data set".
describe('PD Search PracticeLocationDetails API - Valid OfficeId and requesting to view the Practice location details :  ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + " officeId: " + data.request['officeId'], function(doneFn) {
            let apiurl = Utility.getapiurl('LOCATIONS', data.request['officeId'], '', data.params);
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });


        it(scenario + ",Test Case-2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {
                expect(respjson.practiceLocationNumber).toEqual(data.verify['TC-2'].practiceLocationNumber, "Verify the API response with PracticeLocation Number");
                expect(respjson.officeName).toEqual(data.verify['TC-2'].officeName, "Verify the API response with officeName");
                if(respjson.address!=null) {
                expect(respjson.address.addressLine).toEqual(data.verify['TC-2'].address.addressLine, "Verify the API response with addressLine");
                expect(respjson.address.city).toEqual(data.verify['TC-2'].address.city, "Verify the API response with city"); 
                expect(respjson.address.state).toEqual(data.verify['TC-2'].address.state, "Verify the API response with state");
                expect(respjson.address.zipcode).toEqual(data.verify['TC-2'].address.zipcode, "Verify the API response with zipcode");
                expect(respjson.address.latitude).toEqual(data.verify['TC-2'].address.latitude, "Verify the API response with latitude");
                expect(respjson.address.longitude).toEqual(data.verify['TC-2'].address.longitude, "Verify the API response with longitude");
            }
            }
        });
        
    });
});
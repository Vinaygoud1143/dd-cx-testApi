'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/AddressValidateAPI/AddressValidateAPI.json');
var TestDescriptions = require('../../../descriptions/devEng/AddressValidateAPI/AddressValidateAPI_desc.json');

// Address Validate API giving "Valid address" and response body with "address details JSON data set".
describe('Address Validate Service API - Validation of the Given Address:  ', function() {
    dataProvider(TestData.Scenarios, function(data, scenario) {

        var respjson, resstatus;
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] , function(doneFn) {
            let apiurl = Utility.getapiurl('ADDRESSVALIDATE');
           
            frisby
                .setup({
                    request: {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                })
                .post(apiurl,data.request)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode);
                    resstatus = res.status;
                }).done(doneFn);
        });


        it(scenario + ",Test Case-2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {
            if (resstatus == 200) {
                    expect(data.verify['TC-2'].addressLine).toEqual(respjson.addressLine, ". Verify if addressLine: " + respjson.addressLine + " from the API response is an expected addressLine");
                    expect(data.verify['TC-2'].city).toEqual(respjson.city, ". Verify if city: " + respjson.city + " from the API response is an expected city");
                    expect(data.verify['TC-2'].state).toEqual(respjson.state, ". Verify if state: " + respjson.state + " from the API response is an expected state");
                    expect(data.verify['TC-2'].zipcode).toEqual(respjson.zipcode, ". Verify if zipcode: " + respjson.zipcode + " from the API response is an expected zipcode");
                    expect(data.verify['TC-2'].countCode).toEqual(respjson.countCode, ". Verify if countCode: " + respjson.countCode + " from the API response is an expected countCode");
                    expect(data.verify['TC-2'].countyName).toEqual(respjson.countyName, ". Verify if countyName: " + respjson.countyName + " from the API response is an expected countyName");
                    expect(data.verify['TC-2'].contryName).toEqual(respjson.contryName, ". Verify if contryName: " + respjson.contryName + " from the API response is an expected contryName");
            }
            else if (resstatus == 500) {
                expect(data.verify['TC-2'].errorCode).toEqual(respjson.errorCode);
                expect(data.verify['TC-2'].shortDescription).toEqual(respjson.shortDescription);
                expect(data.verify['TC-2'].detailedDescription).toEqual(respjson.detailedDescription);
            }
        
        });

     });   
});

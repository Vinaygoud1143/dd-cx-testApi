'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/AddressValidateAPI/AddressValidateAPINegativeScenarios.json');
var TestDescriptions = require('../../../descriptions/devEng/AddressValidateAPI/AddressValidateAPINegativeScenarios_desc.json');

//Address Validate API giving "InValid address(wrong Zipcode, Empty state, Empty address Line, wrong state and Empty state....)" and response body with "error JSON Data Set".
describe('Address Validate Service API - Validation of Negative Scenarios:  ', function() {
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
            if (resstatus == 400 || resstatus == 500) {

                 if (resstatus == 400) {
                expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode);
                expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription);
                expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription);              

            }

            else if (resstatus == 500) {
                expect(data.verify['TC-2'].errorCode).toEqual(respjson.errorCode);
                expect(data.verify['TC-2'].shortDescription).toEqual(respjson.shortDescription);
                expect(data.verify['TC-2'].detailedDescription).toEqual(respjson.detailedDescription);
            }

            }
        });

     });  
});

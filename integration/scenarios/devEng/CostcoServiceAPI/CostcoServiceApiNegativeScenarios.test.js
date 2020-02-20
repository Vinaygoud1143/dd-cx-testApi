'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/CostcoServiceAPI/CostcoServiceApiNegativeScenarios.json');
var TestDescriptions = require('../../../descriptions/devEng/CostcoServiceAPI/CostcoServiceApiNegativeScenarios_desc.json');

// Costco service API giving "Member-Id" and response body with "error JSON Data Set".
describe('Costco service API -Validation of Negative Scenarios :  ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
    beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;
        
        
        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + " member-id: " + data.request['member-id'] , function(doneFn) {
            let apiurl = Utility.getapiurl('COSTCOMEMBER', data.request['member-id']);
            frisby
                .setup({
                    request: {
                        headers: {
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


        it(scenario + ",Test Case-2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {
            if (resstatus == 404) {
              expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode);                
              expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription);
              expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription);
            }
            else if (resstatus == 400) {
              expect(respjson.errorCode).toEqual(data.verify['TC-2'].errorCode);                
              expect(respjson.shortDescription).toEqual(data.verify['TC-2'].shortDescription);
              expect(respjson.detailedDescription).toEqual(data.verify['TC-2'].detailedDescription);
            }
        });
    });
});
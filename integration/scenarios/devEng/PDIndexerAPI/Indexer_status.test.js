'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/PDIndexerAPI/Indexer_status.json');
var TestDescriptions = require('../../../descriptions/devEng/PDIndexerAPI/Indexer_status_desc.json');

// Business Rules API giving "Invalid Contract-Id" and response body with "error JSON Data Set".
describe('PDIndexerAPI - Validating Of Indexer Status  :  ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
    beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;
        
            it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1']   + "", function(doneFn) {
            let apiurl = Utility.getapiurl('INDEXER', data);
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
                    if (res.status == 200) {
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode,"Verify the API response with statuscode");
                    resstatus = res.status;
                }else if (res.status == 401) {
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode,"Verify the API response with statuscode");
                    resstatus = res.status;
                } 


                }).done(doneFn);
        });

    });
});
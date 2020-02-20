'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/providerDirectorySearchAPI/ProviderDirectorySearch_ProviderKey_Validating_With_SubNetworks.json');
var TestDescriptions = require('../../../descriptions/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_ProviderKey_Validating_With_SubNetworks_desc.json');

// PD Search ProviderKey API giving "Valid Provider-Key" and response body with "PD service details JSON data set".
describe('PD Search Providerkey API- Valid ProviderKey and requesting to view the provider information :  ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1']  + data.request['providerKey'], function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERKEY', data.request['providerKey'], '', data.params); 
            
            
            frisby.get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                    
                }).done(doneFn);
        });


        it(scenario + ",Test Case-2:-" + TestDescriptions.Scenarios[scenario]['TC-2'], function() {
            if (resstatus == 200 && respjson != undefined) {
                expect(respjson.providerKey).toEqual(data.verify['TC-2'].providerKey, "Verify the API response with providerKey");
                expect(respjson.facilityId).toEqual(data.verify['TC-2'].facilityId, "Verify the API response with facilityId");
                
            }
        });
        
       it(scenario + ",Test Case-3:-" + TestDescriptions.Scenarios[scenario]['TC-3'], function() {
                respjson.providerNetworks.forEach(function(networkresp, index) {

                    data.verify['TC-3'].providerNetworks.forEach(function(datanetworks, index) {
                        if (networkresp.networkId == datanetworks.networkId) {

                            expect(networkresp.networkId).toEqual(datanetworks.networkId, "Verify the API response with networkId");
                            expect(networkresp.networkName).toEqual(datanetworks.networkName, "Verify the API response with networkName");
                            expect(networkresp.acceptsNewPatients).toEqual(datanetworks.acceptsNewPatients, "Verify the API response with acceptsNewPatients");
                            expect(networkresp.suppressed).toEqual(datanetworks.suppressed, "Verify the API response with suppressed");
                            expect(networkresp.dentalHomeType).toEqual(datanetworks.dentalHomeType, "Verify the API response with dentalHomeType");
                        }
                    })
                })
         
        }); 
    });
});
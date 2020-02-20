'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/' + testDataEnv + '/providerDirectorySearchAPI/ProviderDirectorySearch_Providerkey.json');
var TestDescriptions = require('../../../descriptions/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_Providerkey_desc.json');

// PD Search ProviderKey API giving "Valid Provider-Key" and response body with "PD service details JSON data set".
describe('PD Search Providerkey API- Valid ProviderKey and requesting to view the provider information :  ', function() {


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
            if (resstatus == 200 && respjson != undefined) {
                expect(respjson.providerKey).toEqual(data.verify['TC-2'].providerKey, "Verify the API response with providerKey");
                expect(respjson.fullName).toEqual(data.verify['TC-2'].fullName, "Verify the API response with fullName");
                expect(respjson.specialty).toEqual(data.verify['TC-2'].specialty, "Verify the API response with specialty");
                expect(respjson.officeName).toEqual(data.verify['TC-2'].officeName, "Verify the API response with officeName");
                expect(respjson.practiceLocationNumber).toEqual(data.verify['TC-2'].practiceLocationNumber, "Verify the API response with practiceLocationNumber");
                expect(respjson.npi).toEqual(data.verify['TC-2'].npi, "Verify the API response with npi");
                expect(respjson.license.licenseNumber).toEqual(data.verify['TC-2'].license.licenseNumber, "Verify the API response with licenseNumber");
                expect(respjson.license.licenseState).toEqual(data.verify['TC-2'].license.licenseState, "Verify the API response with licenseState");

            }
        });
        it(scenario + ",Test Case-3:-" + TestDescriptions.Scenarios[scenario]['TC-3'], function() {
            if (resstatus == 200 && respjson != undefined) {
                expect(respjson.providerQuality.yelp.yelpId).toEqual(data.verify['TC-3'].yelp.yelpId, "Verify the API response with yelpId");
                expect(respjson.providerQuality.yelp.yelpUrl).toEqual(data.verify['TC-3'].yelp.yelpUrl, "Verify the API response with yelpUrl");
                expect(respjson.providerQuality.yelp.yelpReviewCount).toEqual(data.verify['TC-3'].yelp.yelpReviewCount, "Verify the API response with yelpReviewCount");
                expect(respjson.providerQuality.yelp.yelpRating).toEqual(data.verify['TC-3'].yelp.yelpRating, "Verify the API response with yelpRating");
                expect(respjson.providerQuality.yelp.yelpDeltaDentalId).toEqual(data.verify['TC-3'].yelp.yelpDeltaDentalId, "Verify the API response with yelpDeltaDentalId");

                expect(respjson.providerQuality.pandRDental.profilingRating).toEqual(data.verify['TC-3'].pandRDental.profilingRating, "Verify the API response with profilingRating");
                expect(respjson.providerQuality.pandRDental.clinicalCompetencyRating).toEqual(data.verify['TC-3'].pandRDental.clinicalCompetencyRating, "Verify the API response with clinicalCompetencyRating");
                expect(respjson.providerQuality.pandRDental.adherenceToTreatmentProtocolsRating).toEqual(data.verify['TC-3'].pandRDental.adherenceToTreatmentProtocolsRating, "Verify the API response with adherenceToTreatmentProtocolsRating");
                expect(respjson.providerQuality.pandRDental.customerSatisfactionRating).toEqual(data.verify['TC-3'].pandRDental.customerSatisfactionRating, "Verify the API response with customerSatisfactionRating");
                expect(respjson.providerQuality.pandRDental.costAndUtilizationRating).toEqual(data.verify['TC-3'].pandRDental.costAndUtilizationRating, "Verify the API response with costAndUtilizationRating");
                expect(respjson.providerQuality.pandRDental.overallRating).toEqual(data.verify['TC-3'].pandRDental.overallRating, "Verify the API response with overallRating");
                expect(respjson.providerQuality.pandRDental.overallGrade).toEqual(data.verify['TC-3'].pandRDental.overallGrade, "Verify the API response with overallGrade");
                expect(respjson.providerQuality.pandRDental.overallAbuseGrade).toEqual(data.verify['TC-3'].pandRDental.overallAbuseGrade, "Verify the API response with overallAbuseGrade");
                expect(respjson.providerQuality.pandRDental.reliabilityScore).toEqual(data.verify['TC-3'].pandRDental.reliabilityScore, "Verify the API response with reliabilityScore");
                expect(respjson.providerQuality.pandRDental.pandrProviderQualityUrl).toEqual(data.verify['TC-3'].pandRDental.pandrProviderQualityUrl, "Verify the API response with pandrProviderQualityUrl");

            }
        });
        it(scenario + ",Test Case-4:-" + TestDescriptions.Scenarios[scenario]['TC-4'], function() {
            if (resstatus == 200 && respjson != undefined) {
                respjson.providerNetworks.forEach(function(networkresp, index) {
                    data.verify['TC-4'].providerNetworks.forEach(function(datanetworks, index) {
                        if (networkresp.networkId === datanetworks.networkId) {

                            expect(networkresp.networkId).toEqual(datanetworks.networkId, "Verify the API response with networkId");
                            expect(networkresp.networkName).toEqual(datanetworks.networkName, "Verify the API response with networkName");
                            expect(networkresp.acceptsNewPatients).toEqual(datanetworks.acceptsNewPatients, "Verify the API response with acceptsNewPatients");
                            expect(networkresp.suppressed).toEqual(datanetworks.suppressed, "Verify the API response with suppressed");

                        }
                    })
                })


            }
        });
    });
});
'use strict';
const Joi = frisby.Joi;
const fs = require('fs');
const path = require('path')
var TestData = require('../../../testData/devEng/' + testDataEnv + '/cmsV2API/CMSValidation_CMSUploadAPI.json');
var TestDescriptions = require('../../../descriptions/devEng/cmsV2API/CMSValidation_CMSUploadAPI_desc.json');

// CMS Upload Service API giving "Valid Header And Valid Formate Data File" and response body with "CMS service details JSON data set"..
describe('CMS Validation Upload API - CMS Upload Data by giving Valid applicationName,contentType,tenantName And Excel Data File and upload data :  ', function() {


    dataProvider(TestData.Scenarios, function(data, scenario) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it(scenario + ",Test Case 1:-" + TestDescriptions.Scenarios[scenario]['TC-1'] + "  ApplicationName: " + data.headers.APPLICATION_NAME + "  Content Type: " + data.headers.CONTENT_TYPE + "TenantName: " + data.headers.TENANT_NAME + "", function(doneFn) {
            let apiurl = Utility.getapiurl('CMSV2VALIDATIONUPLOADCONTENTS', data.request);
            var tenant = '';
            const file = path.resolve(__dirname, '../../../testData/devEng/' + testDataEnv + '/cmsV2API/testFiles/dentegra_dental_procedure.xlsx')
            // console.log("***********fileeeee--------"+file);
            // console.log("=apiurl====="+apiurl)
            const form = frisby.formData();
            form.append('file', fs.createReadStream(file));
            // console.log("============----"+form.getHeaders()['content-type'])
            frisby.setup({
                    request: {
                        headers: {
                            'applicationName': data.headers.APPLICATION_NAME,
                            'contentType': data.headers.CONTENT_TYPE,
                            'tenantName': data.headers.TENANT_NAME,
                            'Accept': 'application/json',
                            'content-type': form.getHeaders()['content-type']
                        }
                    }
                }).post(apiurl, {body : form})
                .then(function(res) {
                    respjson = res.json;
                    // console.log("***********respjson--------"+JSON.stringify(respjson));
                    // console.log("***********res.status--------"+res.status);
                    // console.log("***********data.headers.TENANT_NAME--------"+data.headers.TENANT_NAME);
                    expect(res.status).toEqual(data.verify['TC-1'].statuscode, "Verify the API response with statuscode");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it(scenario + ",Test Case 2:-" + TestDescriptions.Scenarios[scenario]['TC-2'] + "  ApplicationName: " + data.headers.APPLICATION_NAME + "  Content Type: " + data.headers.CONTENT_TYPE + "TenantName: " + data.headers.TENANT_NAME + "", function() {
            
            if (resstatus == 200) {
                expect(respjson).toEqual(data.verify['TC-2'].response);
            }
        });
    });
});
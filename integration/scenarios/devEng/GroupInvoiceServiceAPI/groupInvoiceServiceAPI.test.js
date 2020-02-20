'use strict';

var TestData = require('../../../testData/devEng/' + testDataEnv + '/GroupInvoiceServiceAPI/groupInvoiceServiceAPI.json');

describe('Group Invoice Service - /invoices/{invoiceNumber}: ', function() {


    dataProvider(TestData.positive_scenarios, function(data, scenario) {


        beforeAll(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it("Positive_scenarios :" + scenario + ": Verify the GET: /invoices/{invoiceNumber} end point while Search with invoice number :'" + data.request['invoiceNumber'] + "'", function(doneFn) {
            let apiurl = Utility.getapiurl('INVOICENUMBER', data.request['invoiceNumber']);
            frisby
                .get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(data.response.status).toEqual(res.status, "Verify the API response with status code");
                    resstatus = res.status;
                }).done(doneFn);
        });

        it("Verify the response", () => {

            expect(data.response.invoiceNumber).toEqual( respjson.invoiceNumber, "Verify the invoiceNumber");
            expect(data.response.customerType).toEqual(respjson.customerType, "Verify the customerType");
            expect(data.response.invoiceGenerationDate).toEqual(respjson.invoiceGenerationDate, "Verify the invoiceGenerationDate");
            expect(data.response.perMemberPerMonthBilling).toEqual(respjson.perMemberPerMonthBilling,"Verify perMemberPerMonthBilling");
            expect(data.response.publisherName).toEqual(respjson.publisherName,"Verify publisherName");
            expect(data.response.statementTypeIdentifier).toEqual(respjson.statementTypeIdentifier,"Verify statementTypeIdentifier");
            expect(data.response.underWritingState).toEqual(respjson.underWritingState,"Verify underWritingState");
            expect(data.response.billingAnalystCode).toEqual(respjson.billingAnalystCode,"Verify billingAnalystCode");
            expect(data.response.billToDivisionNumber).toEqual(respjson.billToDivisionNumber,"Verify billToDivisionNumber");
            expect(data.response.billToGroupNumber).toEqual(respjson.billToGroupNumber,"Verify billToGroupNumber");
            expect(data.response.coverageEndDate).toEqual(respjson.coverageEndDate,"Verify coverageEndDate");
            expect(data.response.coverageStartDate).toEqual(respjson.coverageStartDate,"Verify coverageStartDate");
            expect(data.response.financialCompanyName).toEqual(respjson.financialCompanyName,"Verify financialCompanyName");

            expect(data.response.billingAddress.addressLine1).toEqual(respjson.billingAddress.addressLine1, "Verify The billingAddress addressLine1");
            expect(data.response.billingAddress.addressLine3).toEqual(respjson.billingAddress.addressLine3, "Verify the billingAddress addressLine3");

        })
    });


    dataProvider(TestData.negative_scenarios, function(data, scenario) {
        beforeAll(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        var respjson, resstatus;


        it("Negative_scenarios :" + scenario + ": Verify the GET: /invoices/{invoiceNumber} end point while Search with invoice number :" + data.request['invoiceNumber'], function(doneFn) {
            let apiurl = Utility.getapiurl('INVOICENUMBER', data.request['invoiceNumber']);
            frisby
                .get(apiurl)
                .then(function(res) {
                    respjson = res.json;
                    expect(data.response.status).toEqual( res.status, "Verify the API response with status code");
                    resstatus = res.status;
                }).done(doneFn);

        });

        it("Verify the response", () => {
            if (data.response.error) {
                expect(data.response.error).toEqual(respjson.error, "Verify the error")
                expect(data.response.message).toEqual( respjson.message, "Verify the message");
            }
            if (data.response.errorCode) {
                expect(data.response.errorCode).toEqual( respjson.errorCode, "Verify the error Code");
                expect(data.response.shortDescription).toEqual( respjson.shortDescription, "Verify the shortDescription");
                expect(data.response.detailedDescription).toEqual(respjson.detailedDescription, "Verify the detailedDescription");
            }


            // expect(JSON.stringify(respjson)).toEqual("data", "Verify the person id");
        })
    });



});
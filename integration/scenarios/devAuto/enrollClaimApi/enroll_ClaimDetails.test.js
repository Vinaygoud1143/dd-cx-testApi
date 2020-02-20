'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devAuto/' + testDataEnv + '/enrollClaimApi/enroll_ClaimDetails.json');
var TestDescriptions = require('../../../descriptions/devAuto/' + testDataEnv + '/enrollClaimApi/enroll_ClaimDetails_desc.json');



describe('Enroll API - Claim Details: ', function() {
    var jsonResponse;
    var jsonStatus;
    var claimsDate = [];
    var claimsID = [];

    dataProvider(TestData.Scenarios, function(data, TestCase) {

        beforeAll(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it(TestCase + ",Test Case-1:- Person ID: " + data.header.PersonId + ", Enrollee Id: " + data.input.enrolleeId + "," +TestDescriptions.Scenarios[TestCase]['TC-1']+" ", function(doneFn) {
            jsonResponse = null;
            jsonStatus = null;
            let apiurl = Utility.getapiurl('ENROLLEES', data.input.enrolleeId);
            console.log("apiurl=" + apiurl)
            frisby
                .setup({
                    request: {
                        headers: {
                            'PersonId': data.header.PersonId,
                            'ClientKey': data.header.ClientKey,
                            'Content-Type': 'application/json'
                        }
                    }
                })
                .get(apiurl)
                .then(function(res) {
                    jsonResponse = res.json;
                    jsonStatus = res.status;
                    console.log(jsonStatus)
                    expect(res.status).toBe(data.verify.status, "Verify if API response status is: " + data.verify.status);
                })
                .done(doneFn);
        })

        // Emtying the array before evry test run
        claimsDate = [];
        claimsID = [];
        it(TestCase + ",Test Case-2:-" + TestDescriptions.Scenarios[TestCase]['TC-2'], function() {
            if (jsonStatus == 200) {
                jsonResponse.enrolleeClaimSummaryList.forEach(function(response, index) {
                    // Gather claims date for next test (Test 3)
                    claimsDate.push(response.dateOfService);
                    claimsID.push(response.claimId);

                    expect(data.verify.claimId).toContain(response.claimId, claimsID.length + ". Verify if claim ID: " + response.claimId + " from the API response is an expected claim ID")
                })
            }
        });

        it(TestCase + ",Test Case-3:-"+ TestDescriptions.Scenarios[TestCase]['TC-3'], function() {
            if (jsonStatus == 200) {
                let date1 = null,
                    date2 = null,
                    earlierDate = [],
                    laterDate = [],
                    earlierClaim = null,
                    laterClaim = null,
                    count = 0;

                // Length is greater than or equal to 2. It cannot be 1 because all the inside logic will break if the person has only 1 claim
                // In case of mulitple claims, the date check for last 2 claims will be covered in a "if" statement after the "while" loop
                while (claimsID.length >= 2 && claimsDate.length >= 2) {
                    count++; // Used in Test Report because there are several claims, knowing the number of claims besides expect statements improves readability
                    // This count will always be less than the (claimsID.length) from the previous test by 1. Reason - We are comparing dates in pairs to check sort logic

                    if (date1 == null && date2 == null) {
                        date1 = claimsDate.pop(); // Used in expect statement for reporting
                        date2 = claimsDate.pop(); // Used in expect statement for reporting

                        earlierDate = date1.split("/"); // Used for date comparison to test sort logic
                        laterDate = date2.split("/"); // Used for date comparison to test sort logic

                        earlierClaim = claimsID.pop(); // Used in expect statement for reporting
                        laterClaim = claimsID.pop(); // Used in expect statement for reporting
                    } else {
                        date2 = claimsDate.pop(); // Used in expect statement for reporting

                        laterDate = date2.split("/"); // Used for date comparison to test sort logic
                        laterClaim = claimsID.pop(); // Used in expect statement for reporting
                    }

                    expect(areThese2ClaimsSorted(earlierDate, laterDate)).toBe(true, count + ". Verify that service date of claim: " + earlierClaim + " - " + date1 + " is before that of claim: " + laterClaim + " - " + date2);

                    // To check the next set of claims
                    date1 = date2;
                    earlierClaim = laterClaim;
                    earlierDate = laterDate;
                }

                // This "if" is required to cover a single claim left in claimsID and claimsDate stacks after the execution of "while" loop is complete.
                if (claimsID.length == 1 && claimsDate.length == 1 && earlierClaim != null && earlierDate != []) {
                    date2 = claimsDate.pop(); // Used in expect statement for reporting

                    laterDate = date2.split("/"); // Used for date comparison to test sort logic
                    laterClaim = claimsID.pop(); // Used in expect statement for reporting

                    count++; // Used in Test Report because there are several claims, knowing the number of claims besides expect statements improves readability
                    // This count will always be less than the (claimsID.length) from the previous test by 1. Reason - We are comparing dates in pairs to check sort logic

                    expect(areThese2ClaimsSorted(earlierDate, laterDate)).toBe(true, count + ". Verify that service date of claim: " + earlierClaim + " - " + earlierDate + " is before that of claim: " + laterClaim + " - " + laterDate);
                }
            }
        });
    });
});

function areThese2ClaimsSorted(earlierDate, laterDate) {
    if (earlierDate == laterDate) {
        return true;
    }

    let flag = false; // This flag will be returned as true if the earlierDate is actually smaller than laterDate

    // earlierDate[0], laterDate[0] ---> Month
    // earlierDate[1], laterDate[1] ---> Day
    // earlierDate[2], laterDate[2] ---> Year

    if (earlierDate[2] < laterDate[2]) {
        flag = true; // If the year is smaller last claim in API response, set the flag to true
    } else if (earlierDate[2] == laterDate[2]) {
        if (earlierDate[0] < laterDate[0]) {
            flag = true; // If the year is same and month is smaller, set the flag to true
        } else if (earlierDate[0] == laterDate[0]) {
            if (earlierDate[1] <= laterDate[1]) {
                flag = true; // If the year and month are but date is smaller or same, set the flag to true
            }
        }
    }
    return flag;
}
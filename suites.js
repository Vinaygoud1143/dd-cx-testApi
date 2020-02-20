module.exports = {

    suitesCollection: { // comment to force git push 1,2


        jenkins: [
            // devEng
            'integration/scenarios/devEng/providerapi/api_frisby.spec.js ',
            'integration/scenarios/devEng/providerapi/providers.test.js',
            'integration/scenarios/devEng/providerapi/providersAbout.test.js',
            'integration/scenarios/devEng/providerapi/providersFacilities.test.js',
            'integration/scenarios/devEng/providerapi/providersKey.test.js',
            'integration/scenarios/devEng/providerapi/providersOffice.test.js',
            'integration/scenarios/devEng/providerapi/providersSuggestions.test.js',
            'integration/scenarios/devEng/enrollClaimApi/claims.test.js',
            'integration/scenarios/devEng/enrollClaimApi/enrollee_withPHI.js',
            'integration/scenarios/devEng/enrollClaimApi/enroll.test.js',
            'integration/scenarios/devEng/enrollClaimApi/familyRosterContract.js',
            'integration/scenarios/devEng/enrollClaimApi/familyRosterEnrollee.js',
            'integration/scenarios/devEng/enrollClaimApi/omnibusRule_withContractId.js',
            'integration/scenarios/devEng/enrollClaimApi/omnibusRule_withEnrolleeId.js',
            'integration/scenarios/devEng/enrollClaimApi/UUContract.js',
            'integration/scenarios/devEng/enrollClaimApi/uuEnrollee.js',
            // devAuto
            'integration/scenarios/devAuto/providerapi/provider_Ny_Medicad_multi_filter.test.js',
            'integration/scenarios/devAuto/providerapi/provider_Ny_Medicad.test.js',
            'integration/scenarios/devAuto/enrollClaimApi/claims.test.js',
            'integration/scenarios/devAuto/enrollClaimApi/enroll.test.js',
            'integration/scenarios/devAuto/enrollClaimApi/familyRosterContract.js',
            'integration/scenarios/devAuto/enrollClaimApi/familyRosterEnrollee.js',
            'integration/scenarios/devAuto/enrollClaimApi/omnibusRule_withContractId.js',
            'integration/scenarios/devAuto/enrollClaimApi/omnibusRule_withEnrolleeId.js',
            'integration/scenarios/devAuto/enrollClaimApi/UUContract.js',
            'integration/scenarios/devAuto/enrollClaimApi/enroll_EnrolleeDetails.test.js',
            'integration/scenarios/devAuto/enrollClaimApi/enroll_ClaimDetails.test.js',
            'integration/scenarios/devAuto/enrollClaimApi/claims.test.js',
            'integration/scenarios/devAuto/enrollClaimApi/enroll.test.js',
            'integration/scenarios/devAuto/enrollClaimApi/enroll_ClaimDetails.test.js',
            'integration/scenarios/devAuto/enrollClaimApi/enroll_EnrolleeDetails.test.js',
            'integration/scenarios/devAuto/enrollClaimApi/enroll_Omnibus_PHI.test.js',
            'integration/scenarios/devAuto/enrollClaimApi/familyRosterContract.js',
            'integration/scenarios/devAuto/enrollClaimApi/familyRosterEnrollee.js',
            'integration/scenarios/devAuto/enrollClaimApi/omnibusRule_withContractId.js',
            'integration/scenarios/devAuto/enrollClaimApi/omnibusRule_withEnrolleeId.js',
            'integration/scenarios/devAuto/enrollClaimApi/UUContract.js',
            'integration/scenarios/devAuto/enrollClaimApi/uuEnrollee.js',
            //Claim API
            'integration/scenarios/devEng/claimsAPI/PrimaryAdultMemberViewingHisChildClaims.test.js',
            'integration/scenarios/devEng/claimsAPI/Non-PrimaryAdultViewingChildClaims.test.js',
            'integration/scenarios/devEng/claimsAPI/Primary_Adult_ChildMemberViewingHisOwnClaims.test.js',
            'integration/scenarios/devEng/claimsAPI/Primary_Adult_ChildMemberViewingOthersClaims.test.js',
            'integration/scenarios/devEng/claimsAPI/Primary_AdultMemberViewingOtherClaimsNotInContract.test.js',
            'integration/scenarios/devEng/claimsAPI/PrimaryMemberViewingOtherAdultClaimsGrantedPermission.test.js',
            'integration/scenarios/devEng/claimsAPI/InvalidPersonID.test.js',
            'integration/scenarios/devEng/claimsAPI/EmptyEnrolleeID_EmptyPersonID.test.js',
            'integration/scenarios/devEng/claimsAPI/ClaimsEnrolleeServiceAPIDefects.test.js',
            'integration/scenarios/devEng/UsageAPI/InvalidPersonRequestingToViewUsages.test.js',
            //UsageAPI
            'integration/scenarios/devEng/UsageAPI/Primary_Adult_Child_RequestingToViewTheUsageOfAllMembersHeIsNotInContract.test.js',
            'integration/scenarios/devEng/UsageAPI/Primary_Adult_Child_MemberRequestingToViewTheUsageOfAllMembers.test.js',
            'integration/scenarios/devEng/UsageAPI/Primary_Adult_Child_RequestingToViewDeductibleOfAllMembersInTheContract.test.js',
            'integration/scenarios/devEng/UsageAPI/Primary_Spouse_Child_RequestingToViewMaximumsOfAllMembersInTheContract.test.js',
            'integration/scenarios/devEng/UsageAPI/Primary_Without_Dependent_RequestingToViewOnlyHisMaximums.test.js',
            'integration/scenarios/devEng/UsageAPI/UsageServiceAPIDefect.test.js',
            'integration/scenarios/devEng/RulesAPI/InvalidPersonRequestingToViewMemberInfo.test.js',
            'integration/scenarios/devEng/RulesAPI/Primary_Adult_Child_MemberIsNotPartOfContract_RequestingToViewInformation.test.js',
            'integration/scenarios/devEng/RulesAPI/Primary_Adult_ChildrequestingToViewMembersInfoInContact.test.js',
            'integration/scenarios/devEng/familyRosterAPI/GroupMemberViewingHisActiveInActiveContracts.test.js',
            // familyRosterAPI
            'integration/scenarios/devEng/familyRosterAPI/GroupMemberViewingHisInActiveContracts.test.js',
            'integration/scenarios/devEng/familyRosterAPI/IndividualMemberViewingHisActiveInActiveContracts.test.js',
            'integration/scenarios/devEng/familyRosterAPI/EnrolleeViewingHisFamilyInformation.test.js',
            'integration/scenarios/devEng/familyRosterAPI/FamilyRosterServiceNegativeScenarios.test.js',
            'integration/scenarios/devEng/familyRosterAPI/FamilyRosterServiceAPIDefects.test.js',
            // CostcoServiceAPI
            'integration/scenarios/devEng/CostcoServiceAPI/MemberRequestingToViewCostcoMemberDetails.test.js',
            'integration/scenarios/devEng/CostcoServiceAPI/CostcoServiceApiNegativeScenarios.test.js',
            // providerDirectorySearchAPI
            'integration/scenarios/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_Providerkey.test.js',
            'integration/scenarios/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_FacilityDetailsAPI.test.js',
            'integration/scenarios/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_FacilitiesDetailsAPI.test.js',
            'integration/scenarios/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_Empty_Providerkey.test.js',
            'integration/scenarios/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_PracticeLocationDetailsAPI.test.js',
            'integration/scenarios/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_ProviderSuggestion.test.js',
            'integration/scenarios/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_FindProviderAPI.test.js',
            'integration/scenarios/devEng/AddressValidateAPI/AddressValidateAPI.test.js',
            'integration/scenarios/devEng/AddressValidateAPI/AddressValidateApiNegativeScenario.test.js'
        ],
        providerApi: [
            // 'integration/scenarios/devEng/providerapi/api_frisby.spec.js',
            'integration/scenarios/devEng/providerapi/providers.test.js',
            // 'integration/scenarios/devEng/providerapi/providersAbout.test.js',
            // 'integration/scenarios/devEng/providerapi/providersFacilities.test.js',
            // 'integration/scenarios/devEng/providerapi/providersKey.test.js',
            // 'integration/scenarios/devEng/providerapi/providersOffice.test.js',
            // 'integration/scenarios/devEng/providerapi/providersSuggestions.test.js'

        ],
        providerApiNew: [
            'integration/scenarios/devAuto/providerapi/provider_Ny_Medicad_multi_filter.test.js',
            'integration/scenarios/devAuto/providerapi/provider_Ny_Medicad.test.js'
        ],
        devEng: [
            'integration/scenarios/devEng/enrollClaimApi/claims.test.js',
            'integration/scenarios/devEng/enrollClaimApi/enrollee_withPHI.js',
            'integration/scenarios/devEng/enrollClaimApi/enroll.test.js',
            'integration/scenarios/devEng/enrollClaimApi/familyRosterContract.js',
            'integration/scenarios/devEng/enrollClaimApi/familyRosterEnrollee.js',
            'integration/scenarios/devEng/enrollClaimApi/omnibusRule_withContractId.js',
            'integration/scenarios/devEng/enrollClaimApi/omnibusRule_withEnrolleeId.js',
            'integration/scenarios/devEng/enrollClaimApi/UUContract.js',
            'integration/scenarios/devEng/enrollClaimApi/uuEnrollee.js',
        ],
        devAuto: [
            'integration/scenarios/devAuto/enrollClaimApi/claims.test.js',
            'integration/scenarios/devAuto/enrollClaimApi/enroll.test.js',
            'integration/scenarios/devAuto/enrollClaimApi/familyRosterContract.js',
            'integration/scenarios/devAuto/enrollClaimApi/familyRosterEnrollee.js',
            'integration/scenarios/devAuto/enrollClaimApi/omnibusRule_withContractId.js',
            'integration/scenarios/devAuto/enrollClaimApi/omnibusRule_withEnrolleeId.js',
            'integration/scenarios/devAuto/enrollClaimApi/UUContract.js',

        ],
        devAuto2: [
            // These are FOCUSSED tests which do not perform entire API response validation
            'integration/scenarios/devAuto/enrollClaimApi/enroll_EnrolleeDetails.test.js',
            'integration/scenarios/devAuto/enrollClaimApi/enroll_ClaimDetails.test.js'
        ],

        devAuto3: [
            // 'integration/scenarios/devAuto/enrollClaimApi/claims.test.js',
            'integration/scenarios/devAuto/enrollClaimApi/enroll.test.js',
            // 'integration/scenarios/devAuto/enrollClaimApi/enroll_ClaimDetails.test.js',
            // 'integration/scenarios/devAuto/enrollClaimApi/enroll_EnrolleeDetails.test.js',
            // 'integration/scenarios/devAuto/enrollClaimApi/enroll_Omnibus_PHI.test.js',
            // 'integration/scenarios/devAuto/enrollClaimApi/familyRosterContract.js',
            // 'integration/scenarios/devAuto/enrollClaimApi/familyRosterEnrollee.js',
            'integration/scenarios/devAuto/enrollClaimApi/omnibusRule_withContractId.js',
            'integration/scenarios/devAuto/enrollClaimApi/omnibusRule_withEnrolleeId.js',
            // 'integration/scenarios/devAuto/enrollClaimApi/UUContract.js',
            'integration/scenarios/devAuto/enrollClaimApi/uuEnrollee.js'
        ],

        "pf-claims-service": [

            'integration/scenarios/devEng/claimsAPI/PrimaryAdultMemberViewingHisChildClaims.test.js',
            'integration/scenarios/devEng/claimsAPI/Non-PrimaryAdultViewingChildClaims.test.js',
            'integration/scenarios/devEng/claimsAPI/Primary_Adult_ChildMemberViewingHisOwnClaims.test.js',
            'integration/scenarios/devEng/claimsAPI/Primary_Adult_ChildMemberViewingOthersClaims.test.js',
            'integration/scenarios/devEng/claimsAPI/Primary_AdultMemberViewingOtherClaimsNotInContract.test.js',
            'integration/scenarios/devEng/claimsAPI/PrimaryMemberViewingOtherAdultClaimsGrantedPermission.test.js',
            'integration/scenarios/devEng/claimsAPI/InvalidPersonID.test.js',
            'integration/scenarios/devEng/claimsAPI/EmptyEnrolleeID_EmptyPersonID.test.js',
            'integration/scenarios/devEng/claimsAPI/ClaimsEnrolleeServiceAPIDefects.test.js'

        ],

        "pf-usage-utilization-service": [

            'integration/scenarios/devEng/UsageAPI/InvalidPersonRequestingToViewUsages.test.js',
            'integration/scenarios/devEng/UsageAPI/Primary_Adult_Child_RequestingToViewTheUsageOfAllMembersHeIsNotInContract.test.js',
            'integration/scenarios/devEng/UsageAPI/Primary_Adult_Child_MemberRequestingToViewTheUsageOfAllMembers.test.js',
            'integration/scenarios/devEng/UsageAPI/UsageServiceAPIDefect.test.js',
            'integration/scenarios/devEng/UsageAPI/UsageServiceDefect-CXCORETECH-1500.test.js'

        ],

        "pf-business-rules-service": [

            'integration/scenarios/devEng/RulesAPI/InvalidPersonRequestingToViewMemberInfo.test.js',
            'integration/scenarios/devEng/RulesAPI/Primary_Adult_Child_MemberIsNotPartOfContract_RequestingToViewInformation.test.js'

        ],

        rulesAPIDIT: [

            'integration/scenarios/devEng/RulesAPI/Business_Rules_Validation_With_PersonId.test.js'

        ],

        "pf-enrollee-family-roster-service": [

            'integration/scenarios/devEng/familyRosterAPI/GroupMemberViewingHisActiveInActiveContracts.test.js',
            'integration/scenarios/devEng/familyRosterAPI/GroupMemberViewingHisInActiveContracts.test.js',
            'integration/scenarios/devEng/familyRosterAPI/IndividualMemberViewingHisActiveInActiveContracts.test.js',
            'integration/scenarios/devEng/familyRosterAPI/EnrolleeViewingHisFamilyInformation.test.js',
            'integration/scenarios/devEng/familyRosterAPI/FamilyRosterServiceNegativeScenarios.test.js',
            'integration/scenarios/devEng/familyRosterAPI/FamilyRosterServiceAPIDefects.test.js',
            'integration/scenarios/devEng/familyRosterAPI/FamilyRosterServiceAPIFutureEffectiveDate.test.js'

        ],

        "pf-costco-member-service": [

            'integration/scenarios/devEng/CostcoServiceAPI/MemberRequestingToViewCostcoMemberDetails.test.js',
            'integration/scenarios/devEng/CostcoServiceAPI/CostcoServiceApiNegativeScenarios.test.js'

        ],

        "pf-provider-directory-search-service": [

            'integration/scenarios/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_Providerkey.test.js',
            'integration/scenarios/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_FacilityDetailsAPI.test.js',
            'integration/scenarios/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_FacilitiesDetailsAPI.test.js',
            'integration/scenarios/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_Empty_Providerkey.test.js',
            'integration/scenarios/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_PracticeLocationDetailsAPI.test.js',
            'integration/scenarios/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_ProviderSuggestion.test.js',
            'integration/scenarios/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_FindProviderAPI.test.js',
            'integration/scenarios/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_ProviderKey_Validating_With_SubNetworks.test.js'

        ],

        pdPostAPI: [
            // These are FOCUSSED tests which do not perform entire API response validation
            'integration/scenarios/devEng/providerDirectorySearchAPI/ProviderDirectorySearch_FindProviderPostAPI.test.js'
        ],

        "pf-address-cleansing-suggestion-service": [

            'integration/scenarios/devEng/AddressValidateAPI/AddressValidateAPI.test.js',
            'integration/scenarios/devEng/AddressValidateAPI/AddressValidateApiNegativeScenario.test.js'
        ],

        "pf-broker-service": [

            'integration/scenarios/devEng/brokerValidationAPI/BrokerValidationAPI_BrokerID.test.js'
        ],

        "pf-d2c-payment-service": [

            'integration/scenarios/devEng/PaymentServiceAPI/ValidateCreditCardScenarios.test.js',
            'integration/scenarios/devEng/PaymentServiceAPI/PaymentApiACHScenarios.test.js',
            'integration/scenarios/devEng/PaymentServiceAPI/PaymentApiCreditCardNegativeScenarios.test.js',
            'integration/scenarios/devEng/PaymentServiceAPI/PaymentApiCreditCardScenarios.test.js',
            'integration/scenarios/devEng/PaymentServiceAPI/PaymentProcessUsingCreditCardWithToken.test.js',
            'integration/scenarios/devEng/PaymentServiceAPI/PaymentApiCreditCardTokenNegativeScenarios.test.js',
            'integration/scenarios/devEng/PaymentValidationWithDifferentCCTypes/ValidateCreditCardScenarios.test.js',
            'integration/scenarios/devEng/PaymentValidationWithDifferentCCTypes/ValidateCreditCardNegativeScenarios.test.js',
            'integration/scenarios/devEng/PaymentValidationWithDifferentCCTypes/PaymentProcessCreditCardNegativeScenarios.test.js'
        ],

        "pf-content-service": [

            'integration/scenarios/devEng/cmsV2API/CMSNegativeValidation_CMSDetailsAPI.test.js',
            'integration/scenarios/devEng/cmsV2API/CMSNegativeValidation_CMSUploadAPI.test.js',
            'integration/scenarios/devEng/cmsV2API/CMSValidation_CMSContentsDownloadAPI.test.js',
            'integration/scenarios/devEng/cmsV2API/CMSValidation_CMSDeleteAPI.test.js',
            'integration/scenarios/devEng/cmsV2API/CMSValidation_CMSDetailsAPI.test.js',
            'integration/scenarios/devEng/cmsV2API/CMSValidation_CMSUploadAPI.test.js'

        ],

        "pf-d2c-billing-service": [

            'integration/scenarios/devEng/billingAndAccountAPI/creditCardAutoPay.test.js',
            'integration/scenarios/devEng/billingAndAccountAPI/achAutoPay.test.js',
            'integration/scenarios/devEng/billingAndAccountAPI/AccountsAPI.test.js',
            'integration/scenarios/devEng/billingAndAccountAPI/BillingsAPI.test.js',
            'integration/scenarios/devEng/billingAndAccountAPI/DeletePaymentMethodAPI.test.js',
            'integration/scenarios/devEng/billingAndAccountAPI/CancelAutoPayACH.test.js',
            'integration/scenarios/devEng/billingAndAccountAPI/CancelAutoPayCC.test.js',

        ],

        "pf-provider-directory-search-indexer-service": [

            'integration/scenarios/devEng/PDIndexerAPI/Indexer_status.test.js'
        ],
        "pf-eligibility-person": [
            'integration/scenarios/devEng/eligibility/person/person-id.test.js',
            'integration/scenarios/devEng/eligibility/person/persons.test.js'
        ],
        "contract": [
            'integration/scenarios/devEng/eligibility/person/contract-id.test.js'
        ],
        "group-invoice": [
            'integration/scenarios/devEng/GroupInvoiceServiceAPI/groupInvoiceServiceAPI.test.js',
        ],
        "group": [
            'integration/scenarios/devEng/eligibility/group/group-number.test.js',
        ],
        "email": [
            'integration/scenarios/devEng/EmailNotifications/email-notification.test.js'
        ]

    }
}
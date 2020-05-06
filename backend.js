var clearLabelCourseLoad = false;
var _courseMap = [];
var courseExclusionList = [];
var masterProgramExclusionList =[];
var courseCategoryExclusionList = {};
var masterProgramCategoryExclusionList={} ;
var allCourseCategoriesSelected=false;
var selectedCourseNameAndIdArr={};
var AFFIRM_APPLICABLE_COUNTRY_ID = affirmApplicableCountryId;
var AFFIRM_SKIP_TRAINING_TYPES = affirmSkipTrainingId.toString();
var AFFIRM_EXCLUDE_OSL = false;
var validPaymentSubType = [1,11];
var AFFIRM_APPLICABLE_OSL_CATEGORY = (typeof affirmApplicableOslCategory !=="undefined" && affirmApplicableOslCategory) ? affirmApplicableOslCategory.toString().split(',').map(Number):[];
var allCourseData;
var configData;
var contractIsRefunded = false;
var TableAppHeading = {
    'app_industry_data':{'labelTitle':'Industry Name','valueTitle':'Market Ratio (%)'},
    'app_we_designation_data':{'labelTitle':'Designation','valueTitle':'Learner Breakup (%)'},
    'app_we_exp_data':{'labelTitle':'# Years','valueTitle':'Market Ratio (%)'},
    'app_ed_industry_data':{'labelTitle':'Industry Name','valueTitle':'Market Ratio (%)'},
    'app_ed_logo_data':{'labelTitle':'Logo Text','valueTitle':'Logo'},
};

(function ($) {
    $.apiCall = function (action, params, callback, sync){
        if (typeof(sync) == 'undefined')
            sync = false;
        if (params == null) {
            params = {};
        }
        var data = null;
        $.extend(params, {
            method:action
        })
        if (!sync) {
            $.getJSON(apiUrl,params,function (d) {
                if (typeof(callback) == 'function')
                    callback(d);
                else
                    return d;
            });
        } else {
            $.ajax({
                url: apiUrl,
                dataType: 'json',
                async: false,
                data: params,
                success: function(d) {
                    if (typeof(callback) == 'function')
                        callback(d);
                    else
                        return d;
                }
            });
        }
    }
})(jQuery)

$(document).ready(function() {
    intBundlePage();
    examSlotInitialize();
    addNoteToBundlePricing();
    displayBundleListOffer();
    displayBundleSelectedList();
    getBundleListOffer();
    getBundleListAddOffer();
    offerCouponChange();
    getAccessDays();
    getSeedPricing();
    checkCourseCouponDisplay();
    checkSubscriptionCouponDisplay();
    hideShowCouponCourseFrontendDisplay();
    hideShowMoneyBackGuaranteeText();
    hideShowCouponSubFrontendDisplay();
    getCityList();
    getCityByCountry();
    getVenuesForCityCountry();
    getTrainerForCityCountry();
    showPricingPreview();
    checkPricingsExists()
    deletePricingPreview();
    getCoursesForLabels();
    selectCoursesForLabels();
    getCoursesByPricing();
    loadFTDataOnload();
    getBundlesByPricings();
    getCountriesForCluster();
    handleHomePageBanners();
    AddMorePricing();
    handleAlsoConsider();
    handleSubscriptionCountryChange();
    handleUtility();
    handleSeoElementChange();
    displayB2bCorporateName();
    handleDummyCourse();
    iosCourseChange();
    lecureUrlUpdate();
    addNoteToPricingForm();
    // addNoteToBundle();
    addNoteToBundleJobAssist();
    countryClusterNotDisabledOnError();
    addNoteToBundleSalaryInd();
    addNoteToBundleSalaryRow();
    showHideLecturePageSections();
    addNoteFaqCountry();
    frsRelatedSortable();
    setCourseEditMessage();
    partPaymentUniversityMaster();
    coursesOrderinfForBundles();
    categoryOrderForCompany();
    courseOrderForCompany();
    removeEmptyDomains();
    coursesOrderAlternateOptions();
    getBundleElective();
    displaySeoProductType();
    fetchSeoProductList();
    fetchSeoCityList();
    fetchSeoCityDescription();
    rationalNumber();
    loadRemoveAllList();
    loadClusterCountriesMapping();
    addNoteToProjectsSection();
    moveTrainingTypes();
    addNoteToProjectsDetails();
    addNoteToSkillsCovered();
    addNoteToEnterpriseTab();
    addApplicationProcessLabelSection();
    var learnerRange=[];
    checkZestMoney();
    checkAffirm();
    checkLiquiloan();
    //new course page
    newCoursePageChanges();
    //change tag handlers
    initChangeByTag();
    //test type change
    testTypeChangeHandler();
   // productTypeChange();
    selectedProductType();
    //productTypeChange();
    orderChange();
    appendSequence();
    applicationScripts();
    footerLinks();

    if($('input#dates').is(':visible')){
        var defaultDates = $('.multidatepicker').val();
        var noOfDays = 0;
        if($("#access_day_id" ).val() > 0) {
            var noOfDays = $("#access_day_id option:selected" ).text();
        }
        var todaysDate = new Date();
        var formatDate = (todaysDate.getMonth() + 1) + '/' + todaysDate.getDate() + '/' +
                         todaysDate.getFullYear();
        var pieces=formatDate.split('/');
       $('.multidatepicker').attr('readonly','true').parent().append('<span id="span-for-datepicker" />');
       $('#span-for-datepicker').multiDatesPicker({
            maxPicks: noOfDays,
            altField: "#dates",
            minDate: new Date(pieces[2], pieces[0]-1, pieces[1])
        });
        if (defaultDates)
        $('.multidatepicker').val(defaultDates);
    }

    if($('input#dates_edit').is(':visible')){
        var defaultDates = $('.multidatepicker').val();
        var noOfDays = 0;
        if($("#access_day_id" ).val() > 0) {
            var noOfDays = $("#access_day_id option:selected" ).text();
        }
       $('.multidatepicker').attr('readonly','true').parent().append('<span id="span-for-datepicker" />');
       $('#span-for-datepicker').multiDatesPicker({
            maxPicks: noOfDays,
            altField: "#dates_edit"
        });
        if (defaultDates)
        $('.multidatepicker').val(defaultDates);
    }

    $('#access_day_id').change(function(){
        var defaultDates = $('.multidatepicker').val();
        var noOfDays = $("#access_day_id option:selected" ).text();
        $('.multidatepicker').attr('readonly','true').parent().append('<span id="span-for-datepicker" />');
        $('#span-for-datepicker').multiDatesPicker({
            maxPicks: noOfDays,
            altField: "#dates_edit"
        });
        if (defaultDates)
        $('.multidatepicker').val(defaultDates);
    });
     $("#payment_sub_type").change(function () {
        var countryId = parseInt($('option:selected', '#country').val()); 
        var paymentSubType = parseInt($('option:selected', '#payment_sub_type').val());
        if (paymentSubType != 0) {
            Payment.loadProductsByPaymentSubType(paymentSubType);
        }
        $('input#productSelect').val('');
        $('input#productSelect').attr('data-courseName', '');
        if ($('option:selected', '#payment-mode').val() == 'custom-payment' && (validPaymentSubType.indexOf(paymentSubType) != -1) && countryId == countryIdIndia ) {
            $("#emiOptions").parent().show();
        } else {
            $("#emiOptions").val('');
            $("#emiOptions").parent().hide();
        }
        if ($('option:selected', '#payment-mode').val() == 'custom-payment' && paymentSubType == 1 && countryId == 34 ) {
             $("#isAffirm").parent().show();
        } else {
            $("#isAffirm").prop("checked", false);
            $("#isAffirm").parent().hide();
        }
        if ($('option:selected', '#payment-mode').val() == 'custom-payment' && ((validPaymentSubType.indexOf(paymentSubType) != -1) || paymentSubType == partialFirstPaymentType)) {
            $("#productTypeSelect option[value=5]").show();
        } else {
            $("#productTypeSelect option[value=5]").hide();
        }
        $('.inclusion_text').empty();
        $('.exams_list').empty();
    });
    $("#country").change(function () {
        var countryId = parseInt($('option:selected', '#country').val());
        var paymentSubType = parseInt($('option:selected', '#payment_sub_type').val());
        if ($('option:selected', '#payment-mode').val() == 'custom-payment' && (validPaymentSubType.indexOf(paymentSubType) != -1) && countryId == countryIdIndia) {
            $("#emiOptions").parent().show();
        } else {
            $("#emiOptions").val('');
            $("#emiOptions").parent().hide();
        }
        if ($('option:selected', '#payment-mode').val() == 'custom-payment' && paymentSubType == 1 && countryId == 34) {
            $("#isAffirm").parent().show();
        } else {
            $("#isAffirm").prop("checked", false);
            $("#isAffirm").parent().hide();
        }
        Payment.resetExamDetails();
    });
    $('input[name="emiOptions"]').click(function (){
        var $radio = $(this);

        // if this was previously checked
        if ($radio.data('waschecked') == true)
        {
            $radio.prop('checked', false);
            $radio.data('waschecked', false);
        }
        else
            $radio.data('waschecked', true);

        // remove was checked from other radios
        $radio.siblings('input[name="emiOptions"]').data('waschecked', false);

        var countryId = parseInt($('option:selected', '#country').val());
        var paymentSubType = parseInt($('option:selected', '#payment_sub_type').val());
        var isBajajFinserv = $("#isBajajFinserv").is(':checked') ? 1 : 0;
    });
    if($('input#createDate').is(':visible')){
        $(".datepicker").datepicker({ maxDate: new Date, minDate: new Date(2016, 02, 01) });
    }

    $('#CouponCourse #type-subscription').click(function() {
            location.href = 'add-subscription';
    });

    $('#CouponSubscription #type-course').click(function() {
        location.href = 'add-course';
    });

    $('#cluster_inward').click(function(){
        inward('cluster_id');
    });

    $('#cluster_inward_bundle').click(function(){
        inward('cluster_id_bundle');
    });

    $('#cluster_inward_homepage').click(function(){
        inward('cluster_id_homepage');
    });

    $('#country_inward').click(function(){
        inward('country_id');
    });

    $('#country_inward_bundle').click(function(){
        inward('country_id_bundle');
    });

    $('#country_inward_homepage').click(function(){
        inward('country_id_homepage');
    });

    $('#course_inward').click(function(){
        inward('course_id');
    });

    $('#course_inward_ft').click(function(){
        inward('course_id_ft');
    });

    $('#bundle_inward_ft').click(function(){
        inward('bundle_id_ft');
    });

    $('#label_inward').click(function(){
        inward('label_id');
    });

    $('#bundle_inward').click(function(){
        inward('bundle_id');
    });

    $( ".datepicker" ).datepicker({
        defaultDate: "+1",
        changeMonth: true,
        minDate: 0,
        numberOfMonths: 1,
        dateFormat: "yy-mm-dd",
        onClose: function( selectedDate ) {
            $( "#validto" ).datepicker( "option", "minDate", selectedDate );
        }
    });

    $('#imp_inclusions').change(function() {
        if($(this).val().length > 1) {
            $('#imp_inclusions option').each(function() {
                if(!this.selected) {
                    $(this).hide();
                }
            });
            return false;
        }
        else {
            $('#imp_inclusions option').each(function() {
                if(!this.selected) {
                    $(this).show();
                }
            });
        }
    });
    $('#Banners #homeBanner').click(function() {
        if($(this).is(':checked')) {
            $('#Banners #labels').attr('disabled', true);
        }
        else{
            $('#Banners #labels').attr('disabled', false);
        }
    });

    $(".timepicker").timePicker({
        separator: ':',
        step: 15
     });
     $('.lectureChapter .save_btn').click(function() {
         saveLectureContent($(this));
     });

     // $('#Seo .seo_linkable_type_id').hide();
     // $('#Seo #linkable_type_id-label').hide();
     // $('#Seo .seo_linkable_id').hide();
     // $('#Seo #linkable_id-label').hide();
     addNoteToToolCoverage();
     addNoteToIntroVideo();
     addNoteToCoursePreview();
     companyPageTabber();
     appendRemoveAllCoursePricing();
     displayPricingLevelOnLoad();
     addTrainingTypeNote();
     certificateSection();
     $(document).on("change",".company-pricing-level",function(event){
         var pricingLevel=$(this).val();
         var id =$(this).attr('id');
         var identifier=id.substr(0, id.indexOf('location_mode'));
        // console.log(pricingLevel,identifier);
        switch (parseInt(pricingLevel)){
            case 1:
                var newIdentifierClusterLabel="#"+identifier+"cluster_id-label";
                var newIdentifierClusterSelect="#"+identifier+"cluster_id";
                var newIdentifierCountryLabel="#"+identifier+"country_id-label";
                var newIdentifierCountrySelect="#"+identifier+"country_id";
                $(newIdentifierClusterSelect).prop("selectedIndex", 0);
                $(newIdentifierCountrySelect).prop("selectedIndex", 0);
                $(".course_cluster").prop("selectedIndex", 0);
                $(".course_country").prop("selectedIndex", 0);
                $(newIdentifierClusterLabel).show();
                $(newIdentifierClusterLabel).find('label').css('display','block');
                $(newIdentifierClusterSelect).show();

                $(newIdentifierCountryLabel).hide();
                $(newIdentifierCountrySelect).hide();

            break;
            case 2:
                var newIdentifierClusterLabel="#"+identifier+"cluster_id-label";
                var newIdentifierClusterSelect="#"+identifier+"cluster_id";
                var newIdentifierCountryLabel="#"+identifier+"country_id-label";
                var newIdentifierCountrySelect="#"+identifier+"country_id";
                $(newIdentifierClusterSelect).prop("selectedIndex", 0);
                $(newIdentifierCountrySelect).prop("selectedIndex", 0);
                $(".course_cluster").prop("selectedIndex", 0);
                $(".course_country").prop("selectedIndex", 0);
                $(newIdentifierClusterLabel).hide();
                $(newIdentifierClusterSelect).hide();

                $(newIdentifierCountryLabel).show();
                $(newIdentifierCountryLabel).find('label').css('display','block');
                $(newIdentifierCountrySelect).show();

            break;

        }
     });
     /**
      * Company Product Type Change
      */
     $(document).on("change",".company_product_type",function(){
          var selectedValue=$(this).val();
          var id =$(this).attr('id');
          var identifier=id.substr(0, id.indexOf('product_type'));
          var productCategoryId=$("#"+identifier+"product_category option:first");
          productCategoryId.attr('selected','selected');
          var mySelect=$("#"+identifier+"product_list");
          mySelect.children().remove();

          var trainingType=$("#"+identifier+"training_id");
          if(selectedValue=='osl' || selectedValue =='mp'){
              trainingType.val(2);
          }else{
              trainingType.val(9);
          }



     });
      /**
       * Category Type Change
       */
     $(document).on("change",".company_category_type",function(event){
        // console.log("All Categories Selected:"+allCourseCategoriesSelected);
        var categoryId  = $(this).val();
        var id =$(this).attr('id');
        var excludedCourseIdList=$("#excluded_course_ids_list").val();
        var excludedCourseIdArr=[];
        if(excludedCourseIdList){
            excludedCourseIdArr=excludedCourseIdList.split(",");
        }
        var identifier=id.substr(0, id.indexOf('product_category'));
        var productTypeIdentifier="#"+identifier+"product_type";
        var productType=$(productTypeIdentifier).val();
        if(!productType || productType == 0){
            alert("Please Select Product Type");
            $(this).prop('selectedIndex',0);
            return false;
        }
        var mySelect=$("#"+identifier+"product_list");
        mySelect.children('option[selected="selected"]').removeAttr('selected');
        //mySelect.children('option:not(:first)').remove();
        mySelect.children().remove();
        if(categoryId =="allcategories"){
              allCourseCategoriesSelected=true;
              var optionText="";
              if($(".company_product_type").eq(1).val()=="mp"){
                  optionText="--All Categories Master--";
              }else{
                  optionText="--All Categories Courses--";
              }
          //    console.log("All Categories Selected:"+allCourseCategoriesSelected);
              mySelect.append(
                                           $('<option></option>').val(0).html(optionText)
                                           );
            return false;
        }
        var allowedTrainingTypeCourse=['osl','lvc'];
        if(categoryId != ''){
           var clusterOrCountryId = 0;
           var trainingType = $("#companyPricingCourse-new-product_type option:selected").val();
           var isClusterOrCountry =  $("#companyPricingCourse-new-location_mode option:selected").val();
            if(isClusterOrCountry == 1) {
                clusterOrCountryId = $("#companyPricingCourse-new-cluster_id option:selected").val();    
            }
            else if(isClusterOrCountry == 2) {
                clusterOrCountryId = $("#companyPricingCourse-new-country_id option:selected").val();
            }
            var url = $(location).attr('href');
            url = url.split('/',13);
            companyId = url[(url.length)-1];
            
                $.ajax({
                   url: baseUrl + "/api/v3",
                   dataType: 'json',
                   type: "POST",
                   data: {method :'getCategoryCoursesForB2CPricing', categories:categoryId, isClusterOrCountry:isClusterOrCountry, clusterOrCountryId:clusterOrCountryId, trainingType:trainingType, company:companyId }, 
                   success: function(data) {
                    
                       if(data.status == 200){
                            if ($.inArray(productType, allowedTrainingTypeCourse) !== - 1){
                                     mySelect.append(
                                           $('<option></option>').val(0).html('--All Courses--')
                                           );
                                    $.each(data.data, function(val, text) {
                                        if($.inArray(val, excludedCourseIdArr) == - 1){
                                                mySelect.append(
                                           $('<option></option>').val(val).html(text)
                                           );
                                        }
                                    });
                            }else if(productType=='mp'){
                                mySelect.append(
                                           $('<option></option>').val(0).html('--All Master Programs--')
                                           );
                                    $.each(data.data, function(key,val) {
                                        var bundleId=val.bundle_id;
                                        var bundleName=val.display_name;
                                        if($.inArray(bundleId, excludedCourseIdArr) == - 1){
                                            mySelect.append(
                                            $('<option></option>').val(bundleId).html(bundleName)
                                        );
                                        }

                                    });
                            }
                       }
                   }
                });
            }
     });
     $(document).on('click','.enable_master_programs',function(event){
         if(this.checked){
             $("#exclusion_master_program").css('pointer-events', 'auto');
             $("#exclusion_master_program").removeClass("blur_dropdown");
         }else{
             if (confirm("Are you sure you uncheck master program ? If you uncheck any pricing set for master program will be deleted")){
                 $("#exclusion_master_program").css('pointer-events', 'none');
                 $("#exclusion_master_program").addClass("blur_dropdown");
                 /**
                  * Delete all master pricing if exist
                  */
                 var companyId=$("#company_id").val();
                 if(companyId){
                    var linkableType='bundle';
                    var trainingId=2;
                    $.ajax({
                        url: baseUrl + "/api/v3",
                        dataType: 'json',
                        type: "POST",
                        data: {method :'deleteDataByTrainingAndType', linkableType:linkableType, companyId:companyId, trainingId:trainingId},
                        success: function(data) {
                                alert(data.message);
                        }
                    });
                 }
             }else{
                 $(this).prop("checked",true);
                 $("#exclusion_master_program").css({'pointer-events':'auto'});
                 $("#exclusion_master_program").removeClass("blur_dropdown");
             }
         }
     });
     $(document).on('click','.sl-training-types',function(event){
         if(!this.checked){
             var trainingTypeId=$(this).attr('data-training-type');
             var alertText='';
             if(trainingTypeId==2){
                 alertText="Are you sure you uncheck Osl ? If you uncheck any pricing set for osl will be deleted";
             }else{
                 alertText="Are you sure you uncheck Lvc ? If you uncheck any pricing set for lvc will be deleted";
             }
             if (confirm(alertText)){
                 /**
                  * Delete all pricing if exist
                  */
                 var companyId=$("#company_id").val();
                 if(companyId){
                    var linkableType='course';
                    var trainingId=trainingTypeId;
                    $.ajax({
                        url: baseUrl + "/api/v3",
                        dataType: 'json',
                        type: "POST",
                        data: {method :'deleteDataByTrainingAndType', linkableType:linkableType, companyId:companyId, trainingId:trainingId},
                        success: function(data) {
                                alert(data.message);
                        }
                    });
                 }

             }else{
                 $(this).prop("checked",true);
                 $("#exclusion_master_program").css({'pointer-events':'auto'});
                 $("#exclusion_master_program").removeClass("blur_dropdown");
             }
         }
     });

     if($(".enable_master_programs").length){
         if($(".enable_master_programs").prop('checked')==true){
             $("#exclusion_master_program").css('pointer-events', 'auto');
             $("#exclusion_master_program").removeClass("blur_dropdown");
         }
     }

     $(document).on('change','.catPricing',function(){
         var category=$(this).val();
         $(".catPricing").val(category);
     });

     $('.hideB2bB2c').closest('li').hide();

    $("#enterprise_list-label").parent().hide();
    $('#enterprise_list').hide();
    if($("#course_available_for").find(":selected").val() == 'private_b2b') {
        loadEnterpriseListMappingData($("#enterprise_list-label"), 'course');
    }
    
    $(document).on('change', '#course_available_for', function() {
        $("#enterprise_list-label").parent().hide();
        $('#enterprise_list').hide();
        if($(this).val() == 'private_b2b') {
            loadEnterpriseListMappingData($("#enterprise_list-label"), 'course');
        }
    });
    
    $("#enterprise_list_bundle-label").parent().hide();
    $('#enterprise_list_bundle').hide();
    if($("#bundle_available_for").find(":selected").val() == 'private_b2b') {
        loadEnterpriseListMappingData($("#enterprise_list_bundle-label"), 'bundle');
    }
    
    $(document).on('change', '#bundle_available_for', function() {
        $("#enterprise_list_bundle-label").parent().hide();
        $('#enterprise_list_bundle').hide();
        if($(this).val() == 'private_b2b') {
            loadEnterpriseListMappingData($("#enterprise_list_bundle-label"), 'bundle');
        }
    });
});
$.fn.extend({
    tagMapping: function (tagData, prePopulateData) {
        // console.log(tagData);
        $(this).tokenInput(tagData, {
            theme: "facebook",
            prePopulate: prePopulateData,
            preventDuplicates: true,
            onResult: function (item) {
                if ($.isEmptyObject(item)) {
                    return null;
                } else {
                    return item;
                }
            }
        });
    }
});
function loadEnterpriseListMappingData(label, type) {
    label.parent().show();
    if(type == 'course') {
        if(!$(".token-input-list-facebook")[0]) $('#enterprise_list').tagMapping(enterprise_list_data, pre_populate_enterprise_list_data);
    } else if(type == 'bundle') {
        if(!$(".token-input-list-facebook")[0]) $('#enterprise_list_bundle').tagMapping(enterprise_list_bundle_data, enterprise_list_pre_populate_bundle_data);
    }
}
function checkZestMoney(event) {
    var countryId = parseInt($('option:selected', '#country').val());
    var paymentSubType = parseInt($('option:selected', '#payment_sub_type').val());
    if ($('option:selected', '#payment-mode').val() == 'custom-payment' && countryId == countryIdIndia && (validPaymentSubType.indexOf(paymentSubType) != -1)) {
        $("#emiOptions").parent().show();
    } else {
        $("#emiOptions").parent().hide();
    }
}
function checkAffirm(event) {
    var countryId = parseInt($('option:selected', '#country').val());
    var paymentSubType = parseInt($('option:selected', '#payment_sub_type').val());
    if ($('option:selected', '#payment-mode').val() == 'custom-payment' && countryId == 34 && paymentSubType == 1) {
        $("#isAffirm").parent().show();
    } else {
        $("#isAffirm").parent().hide();
    }
}
function checkLiquiloan(event) {
    var countryId = parseInt($('option:selected', '#country').val());
    var paymentSubType = parseInt($('option:selected', '#payment_sub_type').val());
    if ($('option:selected', '#payment-mode').val() == 'custom-payment' && countryId == countryIdIndia && (validPaymentSubType.indexOf(paymentSubType) != -1)) {
        $("#emiOptions").parent().show();
    } else {
        $("#emiOptions").parent().hide();
    }
}
function deletePricing(event){
    var ppids=event.target.getAttribute('data-product-pricing-id');
    var companyId=event.target.getAttribute('data-product-company-id');
    var pricingType=event.target.getAttribute('data-product-pricing-type');
    if (confirm("Are you sure you want to delete ? ")) {
                $.ajax({
                url: baseUrl + "/api/v3",
                dataType: 'json',
                type: "POST",
                data: {method :'deletePricingByIds',ppids:ppids,companyId:companyId,ptype:pricingType},
                success: function(data) {
                     alert(data.message);
                     location.reload();
                }
                });
            }
}

function arrangeTableLinks(footer_links){
    var table = '<table><thead><tr><th>Link Text</th><th>Link Product</th><th>Order</th><th>Action</th></tr></thead>';
        table += '<tbody>';
        
        for (let i = 0; i < footer_links.length; i++) {
            const footer_link = footer_links[i];
            if(parseInt(footer_link.status) == 0) continue;
            table += '<tr>'; 
            table += '<td>'+footer_link.link_text+'</td>';
            table += '<td>'+footer_link.linkable_id+'</td>';
            table += '<td><input type="text" onChange="changeOrderLinks(this,'+i+')" value="'+footer_link.sequence+'"/></td>';
            table += '<td><a onclick="deleteLink('+i+')">X</a></td>';
            table += '</tr>';
        }
        
        table += '<tbody>';
        table += '<table>';
        var divContainer = '<div id="footerTable"><span>Note: To move a link below to nth position try (n+1), and to move a link above to nth position try (n-1).</span>'+table+'</div>';
        return divContainer;
}

function deleteLink(index){
    var footer_links_unparsed = $('#footer_link #contentForm-new-footer_links').val();
    var footer_links = JSON.parse(footer_links_unparsed);
    footer_links[index].status = "0";
    footer_links[index].sequence = "0";

    //reorder
    footer_links = linkSort(footer_links);
    $('#footer_link #contentForm-new-footer_links').val(JSON.stringify(footer_links));
    var linksHtml = arrangeTableLinks(footer_links);
    $('#footerTable').remove();
    $('#footer_link #contentForm-new-footer_links').parent().append(linksHtml);
}

function changeOrderLinks(element,index){
    var footer_links_unparsed = $('#footer_link #contentForm-new-footer_links').val();
    var footer_links = JSON.parse(footer_links_unparsed);
    footer_links[index].sequence = String($(element).val());

    //reorder
    footer_links = linkSort(footer_links);
    $('#footer_link #contentForm-new-footer_links').val(JSON.stringify(footer_links));
    var linksHtml = arrangeTableLinks(footer_links);
    $('#footerTable').remove();
    $('#footer_link #contentForm-new-footer_links').parent().append(linksHtml);
}

function linkSort(footer_links){
    var sequence = 0;
    footer_links.sort(function(a,b){ return parseInt(a.sequence)-parseInt(b.sequence);});
    for (let i = 0; i < footer_links.length; i++) {
        const footer_link = footer_links[i];
        if(parseInt(footer_link.status) == 0){
            footer_link.sequence = "0";
        }else{
            sequence++;
            footer_link.sequence = String(sequence);
        }
    }
    return footer_links;
}

function resourceCatFilter(kahanSe, trigger = true) {
    var resourceCategory = $('#contentForm-new-resourceCategory').val();
    resourceCategory = resourceCategory == null ? 0 : resourceCategory;
    var resourcesProductType = $('#contentForm-new-resourceProductType').val();
    resourcesProductType = resourcesProductType == null ? 0 : resourcesProductType;
    var resourcesProduct = $('#contentForm-new-resourceProduct').val();
    resourcesProduct = resourcesProduct == null ? 0 : resourcesProduct;
    var resourcesType = $('#contentForm-new-resourceType').val();
    resourcesType = resourcesType == null ? 0 : resourcesType;


    if(resourcesProduct != 0 && resourcesProduct != null){
        resourcesProduct = resourcesProduct.split('_')[2];
    }

    $('#contentForm-new-footerResources option').show();
    $('#contentForm-new-footerResources option').each(function (i, val) {
        var filterInfo = JSON.parse($(this).val());

        var segmentCond = (resourceCategory == 0) ? true : (typeof filterInfo['segments'] == "undefined" ? false : (filterInfo['segments']).indexOf(parseInt(resourceCategory)) > -1);
        var productTyCond = (resourcesProductType == 0) ? true : (typeof filterInfo['primary_product_type'] == "undefined" ? false : resourcesProductType == filterInfo['primary_product_type']);
        var prodIdCond = (resourcesProduct == 0) ? true : (typeof filterInfo['primary_product_id'] == "undefined" ? false : resourcesProduct == filterInfo['primary_product_id']);
        var resTypeCond = (resourcesType == 0) ? true : (typeof filterInfo['type'] == "undefined" ? false : resourcesType == filterInfo['type']);

        if (
            (segmentCond && productTyCond && prodIdCond && resTypeCond)
        ) {
            // console.log('780 filterInfo show',filterInfo,resourcesProductType,resourcesProduct,resourcesType);
            $(this).show();
        } else {
            // console.log('filterInfo hide',filterInfo,resourcesProductType,resourcesProduct,resourcesType);
            $(this).hide();
        }
    });

    if(trigger && $('#footer_link .footerResourcesfilter').val() != ''){
        // console.log('triggrer..........');
        // $('#footer_link .footerResourcesfilter').trigger('keyup');
        goSearch();
    }

    return resourceCategory || resourcesProductType || resourcesProduct || resourcesType;
}

function goSearch(){
    var visible = ':visible';
    var Selfilter = resourceCatFilter('keyup',false);
    var textSearch = ($.trim($('#footer_link .footerResourcesfilter').val())).toLowerCase();
    if(textSearch == '') { visible = ''; }
    if(Selfilter > 0){ visible = ':visible'; }
    $('#contentForm-new-footerResources option'+visible).each(function(){
        var optext = ($(this).html()).toLowerCase();
        if(optext.indexOf(textSearch) == -1){
            $(this).hide();
        }else{
            $(this).show();
        }
    });
}

function footerLinks(){

    var coursesDropdown = 'contentForm-new-footerCourses';
    var bundlesDropdown = 'contentForm-new-footerBundles';    
    var resourcesDropdown = 'contentForm-new-footerResources';
    var productCategory = 'contentForm-new-courseCategory';
    var resourceCategory = 'contentForm-new-resourceCategory';

    var resourcesProdtType = 'contentForm-new-resourceProductType';
    var resourcesProduct = 'contentForm-new-resourceProduct';
    var resourcesType = 'contentForm-new-resourceType';

    $('#contentForm-new-footerResources').css('overflow-x', 'auto');
    $(document).on("keydown", "#footer_link", function(event) { 
        if(event.key == "Enter" && event.srcElement.className == 'footerResourcesfilter'){
            goSearch();
        }
        return event.key != "Enter";
    });

    var productCategories = [];
    $('#footer_link #contentForm-new-courseCategory option').each(function(){
        if($(this).val() > 0){
            productCategories.push({'id': $(this).val(), 'label': $(this).attr('label')});
        }
    });

    var productMix = [];
    $('#footer_link #contentForm-new-resourceProduct option').each(function(){
        if($(this).val() != 0){
            var info = ($(this).val()).split('_');
            var id = info[2] || '';
            var type = info[1] || '';
            var catid = info[0] || '';
            productMix.push({'id': id, 'type': type, 'category':catid, 'label': $(this).attr('label')});
        }
    });

    if($('#contentForm-new-segment_map_info').length > 0 ){
        var segCatMapInfo = JSON.parse($('#contentForm-new-segment_map_info').val());
    }
    $('#footer_link #contentForm-new-footerResources.filterSearch').parent().prepend('<input type="text" placeholder="Filter by Title" class="footerResourcesfilter" style="margin:0 0 1px" /><input type="button" onClick="goSearch()" value="Search" /><span id="filterSearchLoading" style="padding-left:50px;display:none;">Loading...</span>');
    
    $('#contentForm-new-resourceCategory').on('change',function(){
        var segcatId = $(this).val();
        var segcatName = $('#contentForm-new-resourceCategory option:selected').html();
        var productType = $('#contentForm-new-resourceProductType').val();
        var catId = '';
        $('.footerResourcesfilter,#contentForm-new-link_text').val('');
        $('#contentForm-new-footerResources').val(0);
        
        if(parseInt(segcatId) > 0){
            var catIndex = productCategories.findIndex(function(item){ 
                return item.label == segcatName;
            });
            
            if(typeof productCategories[catIndex] != "undefined"){
                catId = productCategories[catIndex].id;
            }else{
                var catIndex = segCatMapInfo.findIndex(function(item){
                    return item.segment_name == segcatName;
                });

                if(typeof segCatMapInfo[catIndex] != "undefined"){
                    scatId = segCatMapInfo[catIndex].category_id;
                    var catIndex = productCategories.findIndex(function(item){ 
                        return item.id == scatId;
                    });
                    catId = productCategories[catIndex].id;
                }
            }
            var filtered = productMix.filter(function(item){ return item.category == catId});
            // console.log('cat Filter',filtered);
            $('#contentForm-new-resourceProduct option').remove();
            $('#contentForm-new-resourceProduct').append('<option value="0" label="--Select--">--Select--</option>');
            (filtered || []).forEach(function(itm){
                var label = itm.label;
                var value = itm.category+'_'+itm.type+'_'+itm.id;
                if(productType != 0){
                    productType = productType == 'course' ? 'c' : 'b';
                    if(productType == itm.type){
                        // console.log('cat Filter w productType',productType);
                        $('#contentForm-new-resourceProduct').append('<option value="'+value+'" label="'+label+'">'+label+'</option>');
                    }
                }else{
                    // console.log('cat Filter w/o productType',productType);
                    $('#contentForm-new-resourceProduct').append('<option value="'+value+'" label="'+label+'">'+label+'</option>');
                }
            });
            // $('#contentForm-new-resourceProduct option').each(function(){
            //     var opVal = ($(this).val()).split('_');
            //     if(productType != 0){
            //         productType = productType == 'course' ? 'c' : 'b';
            //     }

            //     if(opVal[0] == catId && productType == opVal[1]){
            //         $(this).show();
            //     }else if(opVal[0] == catId){
            //         $(this).show();
            //     }else{
            //         $(this).hide();
            //     }
            // });
            $('#contentForm-new-resourceProduct option[value="0"]').show();
            $('#contentForm-new-resourceProduct').val(0);
            setTimeout(function(){
                resourceCatFilter('contentForm-new-resourceCategory',true);
            },1000);
        }else{
            $('#contentForm-new-resourceProductType').val(0).trigger('change');
        }
    });

    $('#contentForm-new-resourceProductType').on('change',function(){
        var productType = $(this).val();
        var segcatId = $('#contentForm-new-resourceCategory').val();
        var segcatName = $('#contentForm-new-resourceCategory option:selected').html();
        var catId = '';
        $('.footerResourcesfilter,#contentForm-new-link_text').val('');
        $('#contentForm-new-footerResources').val(0);
        
        if(parseInt(segcatId) > 0){
            var catIndex = productCategories.findIndex(function(item){ 
                return item.label == segcatName;
            });
            
            if(typeof productCategories[catIndex] != "undefined"){
                catId = productCategories[catIndex].id;
            }else{
                var catIndex = segCatMapInfo.findIndex(function(item){
                    return item.segment_name == segcatName;
                });
                
                if(typeof segCatMapInfo[catIndex] != "undefined"){
                    scatId = segCatMapInfo[catIndex].category_id;
                    var catIndex = productCategories.findIndex(function(item){ 
                        return item.id == scatId;
                    });
                    catId = productCategories[catIndex].id;
                }
            }
        }

        productType = productType == 'course' ? 'c' : ( productType == 'bundle' ? 'b' : 0);
        if(productType == 0){
            // $('#contentForm-new-resourceProduct option').show();
            var filtered = segcatId == 0 ? productMix : productMix.filter(function(item){ return item.category == catId});
            // console.log('filter productType == 0 & segcatId == ',segcatId,filtered);
            $('#contentForm-new-resourceProduct option').remove();
            $('#contentForm-new-resourceProduct').append('<option value="0" label="--Select--">--Select--</option>');
            (filtered || []).forEach(function(itm){
                var label = itm.label;
                var value = itm.category+'_'+itm.type+'_'+itm.id;
                $('#contentForm-new-resourceProduct').append('<option value="'+value+'" label="'+label+'">'+label+'</option>');                
            });
            $('#contentForm-new-resourceType').val(0).trigger('change');
            return; 
        }else{
            if(segcatId == 0){
                var filtered = productMix.filter(function(item){ return item.type == productType});
                // console.log('filter productType != 0 & segcatId == 0',filtered);
            }else{
                var filtered = productMix.filter(function(item){ return (item.category == catId) && (item.type == productType);});
                // console.log('filter productType != 0 & segcatId != 0',filtered);
            }
            
            $('#contentForm-new-resourceProduct option').remove();
            $('#contentForm-new-resourceProduct').append('<option value="0" label="--Select--">--Select--</option>');
            (filtered || []).forEach(function(itm){
                var label = itm.label;
                var value = itm.category+'_'+itm.type+'_'+itm.id;
                $('#contentForm-new-resourceProduct').append('<option value="'+value+'" label="'+label+'">'+label+'</option>');                
            });
        }

        $('#contentForm-new-resourceProduct').val(0);

        // $('#contentForm-new-resourceProduct option').show();
        // $('#contentForm-new-resourceProduct option').each(function(){
        //     var opVal = ($(this).val()).split('_');
        //     if(opVal[0] == catId && productType == opVal[1]){ --done
        //         $('#contentForm-new-resourceProduct option[value="'+$(this).val()+'"]').show();
        //     }else if(productType == opVal[1] && catId == 0){
        //         $('#contentForm-new-resourceProduct option[value="'+$(this).val()+'"]').show();
        //     }else if($(this).val() == 0){
        //         $('#contentForm-new-resourceProduct option[value="'+$(this).val()+'"]').show();
        //     }else{
        //         $('#contentForm-new-resourceProduct option[value="'+$(this).val()+'"]').hide();
        //     }
        // });
        resourceCatFilter('contentForm-new-resourceProductType');
    });

    $('#footer_link #contentForm-new-resourceProduct').on('change',function(){
        $('#contentForm-new-link_text').val('');
        $('#contentForm-new-footerResources').val(0);
        resourceCatFilter('contentForm-new-resourceProduct');
    });

    $('#footer_link #contentForm-new-resourceType').on('change',function(){
        if($(this).val() == 0){
            $('.footerResourcesfilter').val('');
        }
        $('#contentForm-new-link_text').val('');
        $('#contentForm-new-footerResources').val(0);
        resourceCatFilter('contentForm-new-resourceType');
    });

    $('#footer_link #contentForm-new-link_url-label,#footer_link #contentForm-new-link_text-label').parent().prop('style','display:inline-block');
    $('#footer_link #contentForm-new-add').parent().parent().prop('style','display:inline-block');
    $('#footer_link #contentForm-new-link_url,#footer_link #contentForm-new-link_text').on('keyup',function(){
        $(this).removeClass('error-border');
    });

    $('#footer_link.edit').find(".clusterListAll").attr("disabled",true);
    $('#footer_link.edit').find(".countryListAll").attr("disabled",true);
    $('#footer_link.edit').find(".invert-all").attr("disabled",true);
    
    $('#contentForm-new-footer_link_id,#contentForm-new-footer_courses_info,#contentForm-new-footer_bundles_info,#contentForm-new-footer_resources_info,#contentForm-new-hidden_footerCategory,#contentForm-new-hidden_all_country,#contentForm-new-hidden_cluster_id,#contentForm-new-hidden_country_id,#contentForm-new-segment_map_info').parent().parent().hide();
    var hideli = ['#'+coursesDropdown+', [for='+coursesDropdown+']',
        '#'+bundlesDropdown+', [for='+bundlesDropdown+']',
        '#'+productCategory+', [for='+productCategory+']',
        '#'+resourcesDropdown+', [for='+resourcesDropdown+']',
        '#'+resourceCategory+', [for='+resourceCategory+']',
        '#'+resourcesProdtType+', [for='+resourcesProdtType+']',
        '#'+resourcesProduct+', [for='+resourcesProduct+']',
        '#'+resourcesType+', [for='+resourcesType+']',
    ];

    $(hideli.join(',')).hide();
    $(hideli.join(',')).parent().parent().hide();

    var cat = $('#contentForm-new-footerCategory').val();
    if(parseInt(cat) > 0){
        var linkText = 'contentForm-new-link_text';
        var addButton = 'contentForm-new-add';
        switch(cat) {
            case '1':
                $('#'+coursesDropdown+', [for='+coursesDropdown+'], #'+linkText+', [for='+linkText+'], #'+addButton).show();
                $('#'+coursesDropdown+', [for='+coursesDropdown+']').parent().parent().show().css('margin','10px 0px');
                $('#'+productCategory+', [for='+productCategory+']').show();
                $('#'+productCategory+', [for='+productCategory+']').parent().parent().show().css('margin','10px 0px');;
                
                $('#'+bundlesDropdown+', [for='+bundlesDropdown+']').hide();
                $('#'+bundlesDropdown+', [for='+bundlesDropdown+']').parent().parent().hide();

                $('#'+resourcesDropdown+', [for='+resourcesDropdown+']').hide();
                $('#'+resourcesDropdown+', [for='+resourcesDropdown+']').parent().parent().hide();
                $('#'+resourceCategory+', [for='+resourceCategory+']').hide();
                $('#'+resourceCategory+', [for='+resourceCategory+']').parent().parent().hide();
                $('#'+resourcesProdtType+', [for='+resourcesProdtType+']').hide();
                $('#'+resourcesProdtType+', [for='+resourcesProdtType+']').parent().parent().hide();
                $('#'+resourcesProduct+', [for='+resourcesProduct+']').hide();
                $('#'+resourcesProduct+', [for='+resourcesProduct+']').parent().parent().hide();
                $('#'+resourcesType+', [for='+resourcesType+']').hide();
                $('#'+resourcesType+', [for='+resourcesType+']').parent().parent().hide();

                break;
            case '2':
                $('#'+bundlesDropdown+', [for='+bundlesDropdown+'], #'+linkText+', [for='+linkText+'], #'+addButton).show();
                $('#'+bundlesDropdown+', [for='+bundlesDropdown+']').parent().parent().show().css('margin','10px 0px');
                $('#'+productCategory+', [for='+productCategory+']').show();
                $('#'+productCategory+', [for='+productCategory+']').parent().parent().show().css('margin','10px 0px');;

                $('#'+coursesDropdown+', [for='+coursesDropdown+']').hide();
                $('#'+coursesDropdown+', [for='+coursesDropdown+']').parent().parent().hide();

                $('#'+resourcesDropdown+', [for='+resourcesDropdown+']').hide();
                $('#'+resourcesDropdown+', [for='+resourcesDropdown+']').parent().parent().hide();
                $('#'+resourceCategory+', [for='+resourceCategory+']').hide();
                $('#'+resourceCategory+', [for='+resourceCategory+']').parent().parent().hide();
                $('#'+resourcesProdtType+', [for='+resourcesProdtType+']').hide();
                $('#'+resourcesProdtType+', [for='+resourcesProdtType+']').parent().parent().hide();
                $('#'+resourcesProduct+', [for='+resourcesProduct+']').hide();
                $('#'+resourcesProduct+', [for='+resourcesProduct+']').parent().parent().hide();
                $('#'+resourcesType+', [for='+resourcesType+']').hide();
                $('#'+resourcesType+', [for='+resourcesType+']').parent().parent().hide();

                break;
            case '3':
                $('#'+resourcesDropdown+', [for='+resourcesDropdown+'], #'+linkText+', [for='+linkText+'], #'+addButton).show();
                $('#'+resourcesDropdown+', [for='+resourcesDropdown+']').parent().parent().show().css('margin','10px 0px');
                $('#'+resourceCategory+', [for='+resourceCategory+']').show();
                $('#'+resourceCategory+', [for='+resourceCategory+']').parent().parent().show().css('margin','10px 0px');
                $('#'+resourcesProdtType+', [for='+resourcesProdtType+']').show();
                $('#'+resourcesProdtType+', [for='+resourcesProdtType+']').parent().parent().show().css('margin','10px 0px');
                $('#'+resourcesProduct+', [for='+resourcesProduct+']').show();
                $('#'+resourcesProduct+', [for='+resourcesProduct+']').parent().parent().show().css('margin','10px 0px');
                $('#'+resourcesType+', [for='+resourcesType+']').show();
                $('#'+resourcesType+', [for='+resourcesType+']').parent().parent().show().css('margin','10px 0px');

                $('#'+coursesDropdown+', [for='+coursesDropdown+']').hide();
                $('#'+coursesDropdown+', [for='+coursesDropdown+']').parent().parent().hide();
                $('#'+bundlesDropdown+', [for='+bundlesDropdown+']').hide();
                $('#'+bundlesDropdown+', [for='+bundlesDropdown+']').parent().parent().hide();
                $('#'+productCategory+', [for='+productCategory+']').hide();
                $('#'+productCategory+', [for='+productCategory+']').parent().parent().hide();
                break;
            default: 
                $('#'+coursesDropdown+', [for='+coursesDropdown+'], #'+linkText+', [for='+linkText+'], #'+addButton).hide();
                $('#'+coursesDropdown+', [for='+coursesDropdown+']').parent().parent().hide();
                $('#'+bundlesDropdown+', [for='+bundlesDropdown+']').hide();
                $('#'+bundlesDropdown+', [for='+bundlesDropdown+']').parent().parent().hide();
                $('#'+productCategory+', [for='+productCategory+']').hide();
                $('#'+productCategory+', [for='+productCategory+']').parent().parent().hide();

                $('#'+resourcesDropdown+', [for='+resourcesDropdown+']').hide();
                $('#'+resourcesDropdown+', [for='+resourcesDropdown+']').parent().parent().hide();                
                $('#'+resourceCategory+', [for='+resourceCategory+']').hide();
                $('#'+resourceCategory+', [for='+resourceCategory+']').parent().parent().hide();
                $('#'+resourcesProdtType+', [for='+resourcesProdtType+']').hide();
                $('#'+resourcesProdtType+', [for='+resourcesProdtType+']').parent().parent().hide();
                $('#'+resourcesProduct+', [for='+resourcesProduct+']').hide();
                $('#'+resourcesProduct+', [for='+resourcesProduct+']').parent().parent().hide();
                $('#'+resourcesType+', [for='+resourcesType+']').hide();
                $('#'+resourcesType+', [for='+resourcesType+']').parent().parent().hide();

                break;
        }
    }
    var FooterLinksRealtion = {};
    $('#footer_link #footer-category option').each(function(){
        if(parseInt($(this).val()) != 0)
            FooterLinksRealtion[$(this).val()] = $(this).attr('label');
    });
    if($('#footer_link #contentForm-new-footer_links').length){
        var footer_links_unparsed = $('#footer_link #contentForm-new-footer_links').val();
        var footer_links = JSON.parse(footer_links_unparsed);
        if(footer_links.length >= 0){
            //reorder
            footer_links = linkSort(footer_links);
            var linksHtml = arrangeTableLinks(footer_links);
            $('#footer_link #contentForm-new-footer_links').parent().append(linksHtml);
        }
    }

    //Categoy filter for course & bundle
    $('#footer_link #contentForm-new-courseCategory').on('change',function(){
        var catType = $('#footer_link #contentForm-new-footerCategory').val();
        var catId = $(this).val();
        
        if(catType == 1 || catType == 2){
            if(catId == 0){ //reset
                $('#contentForm-new-footerBundles option, #contentForm-new-footerCourses option').show();
            }else{
                $('#contentForm-new-footerBundles option, #contentForm-new-footerCourses option').each(function(){
                    var cinfo = $(this).val();
                    var catcinfo = cinfo.split('_')[0];
                    if(catcinfo != catId){
                        $(this).hide();
                    }else{
                        $(this).show();
                    }
                });
            }
            $('#contentForm-new-footerBundles,#contentForm-new-footerCourses').val(0);
            $('#contentForm-new-link_text').val('');
        }
    });

    $('#footer_link #contentForm-new-footerCourses,#footer_link #contentForm-new-footerBundles,#footer_link #contentForm-new-footerResources').on('change',function(){
        if($(this).val()){
            var newText = $(this).find('option:selected').html();
            if(newText == '--Select--')
                newText = '';
            $('#contentForm-new-link_text').val(newText);
            $(this).removeClass("error-border");
            $('#contentForm-new-link_text').removeClass("error-border");
        }
    });

    $('#footer_link #contentForm-new-add').on('click',function(){
        if(parseInt($('#footer_link #contentForm-new-footerCategory').val()) == 0){
            alert('Please select Footer Category.');
            return;
        }
        var linkCategory = parseInt($('#footer_link #contentForm-new-footerCategory').val());
        var linkText = $('#footer_link #contentForm-new-link_text').val();
        var linkableId = '';
        var validSubForm = true;
        var linkIdDom = '';
        if(linkCategory == 1){
            linkIdDom = 'contentForm-new-footerCourses';
        }else if(linkCategory == 2){
            linkIdDom = 'contentForm-new-footerBundles';
        }else if(linkCategory == 3){
            linkIdDom = 'contentForm-new-footerResources';
        }
        
        linkableId = $('#footer_link #'+linkIdDom).val();
        if(linkableId == '' || parseInt(linkableId) == 0){ 
            $('#footer_link #'+linkIdDom).addClass('error-border');
            validSubForm = false;
        }else if(linkCategory == 1 || linkCategory == 2){
            linkableIdArr = linkableId.split('_');
            if(linkableIdArr.length != 2){
                $('#footer_link #'+linkIdDom).addClass('error-border');
                validSubForm = false;
            }
            linkableId = linkableIdArr[1];
        }else if(linkCategory == 3){
            if(linkableId != null){
                linkableIdArr = JSON.parse(linkableId);
                // console.log(linkableId,linkableIdArr,typeof linkableIdArr);
                linkableId = (typeof linkableIdArr['id'] != "undefined" && linkableIdArr['id']) || '';
            }else{
                linkableId = '';
            }
        }

        if( linkableId == ''){
            $('#footer_link #'+linkIdDom).addClass('error-border');
            validSubForm = false;
        }
        if( linkText == ''){
            $('#footer_link #contentForm-new-link_text').addClass('error-border');
            validSubForm = false;
        }

        if(!validSubForm){return;}

        var footer_links_unparsed = $('#footer_link #contentForm-new-footer_links').val();
        var footer_links = JSON.parse(footer_links_unparsed);
        
        var newLink = {
            "link_id": 0, 
            "link_text": linkText, 
            "linkable_id": linkableId,
            "sequence": "999",
            "status": "1" 
        };
        var exists = footer_links.filter(function(item){ return item.linkable_id == linkableId && item.status == 1;});
        if(exists.length){
            alert('Link Already Added.');
            return;
        }

        footer_links.push(newLink);
        $('#footer_link #'+linkIdDom).val('');
        $('#footer_link #contentForm-new-link_text').val('');
        //reorder
        footer_links = linkSort(footer_links);
        $('#footer_link #contentForm-new-footer_links').val(JSON.stringify(footer_links));
        var linksHtml = arrangeTableLinks(footer_links);
        $('#footerTable').remove();
        $('#footer_link #contentForm-new-footer_links').parent().append(linksHtml);
    });
}
function showHideLecturePageSections() {
    $('.lecture_title_h2').click(function() {
        $('.lectureChapter').removeClass('sec-active');
        $('.lecture-inner').hide();

        $('.lecture_section_ul').hide();
        if($(this).hasClass('sec-active')) {
            $('.lecture_title_h2').removeClass('sec-active');
        } else {
            $(this).parent().find('ul.lecture_section_ul').show();
            $('.lecture_title_h2').removeClass('sec-active');
            $(this).addClass('sec-active');
        }
    })

    $('.lectureChapter').click(function(e) {
        if($(e.target).is('.save_btn')){
            e.preventDefault();
            return;
        }
        $('.save_btn').hide();
        $('.lecture-inner').hide();
        if($(this).hasClass('sec-active')) {
            $('.lectureChapter').removeClass('sec-active');
            $(this).find('.save_btn').hide();
        } else {
            $(this).parent().find('.lecture-inner').show();
            $('.lectureChapter').removeClass('sec-active');
            $(this).addClass('sec-active');
            $(this).find('.save_btn').show();
        }
    });
    /*
    $('#lecturePage textarea').focus(function() {
        for(name in CKEDITOR.instances)
        {
            CKEDITOR.instances[name].destroy()
        }
        CKEDITOR.replace($(this).attr('id'))
    });
    */
    $('#lectureCourse').change(function() {
        $('#AllLectureSections').remove();
        $('#lectureCourseSave').attr('disabled', true);
    });
}

function displayB2bCorporateName(){
    $('#workshop #CorporateName').closest('li').hide();
    $('#workshop #webx_session_id').closest('li').hide();
    $('#workshop #webx_user_id').closest('li').hide();
    $('#workshop #webx_version_id-label').parent().hide()
    var b2b = $('input[name="isCorporate"]:checked').val();
    if(b2b == 1){
        $('#workshop #CorporateName').closest('li').show();
    }
    else if($('#workshop #training_id option:selected').val() == 3){
        $('#workshop #webx_session_id').closest('li').show();
        $('#workshop #webx_user_id').closest('li').show();
        $('#workshop #webx_version_id-label').parent().show()
    }
    $('#workshop .is_b2b_workshop').change(function(){
        var b2b = $('input[name="isCorporate"]:checked').val();
        if(b2b == 1){
            $('#workshop #CorporateName').closest('li').show();
            $('#workshop #webx_session_id').closest('li').hide();
            $('#workshop #webx_user_id').closest('li').hide();
            $('#workshop #webx_version_id-label').parent().hide()
        }else{
            $('#workshop #CorporateName').closest('li').hide();
            if($('#workshop #training_id option:selected').val() == 3) {
                $('#workshop #webx_session_id').closest('li').show();
                $('#workshop #webx_user_id').closest('li').show();
                $('#workshop #webx_version_id-label').parent().show()
            }
        }
    });
}
function displayBundleListOffer(){
    displayBundleAddOffer();
    $('#HomePageOffers #offer_bundle_id').click(function() {
        displayBundleAddOffer();
    });
}


function displayBundleAddOffer(){
    var isBundle = $('input[name="offer_bundle_id"]:checked').val();
    if(isBundle == 1 && typeof isBundle !== 'undefined'){
        var couponId = $('#HomePageOffers #coupon_id').val();
        $.apiCall('getBundleListForCouponId', {
            coupon_id:couponId
        }, function(data){
            var html = "<option value='0'>--Select--</option>";
            $.each(data.data, function(element, value) {
                html += '<option value="'+element+'">'+value+'</option>'
            });
            $('select#offer_bundle_list').closest('li').show();
            $('select#offer_bundle_list').html(html);
        });
    }else{
        $('select#offer_bundle_list').closest('li').hide();
    }
}

function displayBundleSelectedList(){
    $('#HomePageOffers #offer_bundle_id_selected').click(function() {
        displayEditBundle();
    });
}

function displayEditBundle(){
    var isBundle = $('input[name="offer_bundle_id_selected"]:checked').val();
    if(isBundle == 1 && typeof isBundle !== 'undefined'){
        $('select#offer_bundle_list_selected').closest('li').show();
            var couponId = $('#HomePageOffers #coupon_id').val();
        $.apiCall('getBundleListForCouponId', {
            coupon_id:couponId
        }, function(data){
            var html = "<option value='0'>--Select--</option>";
            $.each(data.data, function(element, value) {
                html += '<option value="'+element+'">'+value+'</option>'
            });
            $('select#offer_bundle_list_selected').closest('li').show();
            $('select#offer_bundle_list_selected').html(html);
            $('.bundle_offer_sortable').hide();
        });
    }else{
        $('select#offer_bundle_list_selected').closest('li').hide();
        $('.bundle_offer_sortable').hide();
    }
}


function getBundleListAddOffer(){
    var formObj = $("form#HomePageOffers");
    var inputEle;
    var courseIdStr = $(formObj).find("input[name='bundle_hidden_sort_add']").val();
    if (typeof courseIdStr != 'undefined' && courseIdStr != null) {
            createSortableBundleAddOfferLi(formObj, $(formObj).find("#offer_bundle_list"), $(formObj).find("#bundle_hidden_sort_add"));
    }
    var selector = $("#offer_bundle_list").find("option");

        $("#offer_bundle_list").on( 'click', selector, function($event) {
            $event.preventDefault();
            var courseId = $(this).attr("value");
            var hiddenEle = $(formObj).find("#bundle_hidden_sort_add");
            var courseIdStr = $(hiddenEle).val();
            var courseIdsArr = courseIdStr.split(",");
            if (courseIdsArr.indexOf(courseId) == -1 && courseIdsArr.length <= 2) {
                var ulList = $(formObj).find("ul.bundle_offer_sortable_add");
                var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative;' data-cid='" + courseId + "'>" + $event.target.innerHTML + "<span class='rm_bndl_electives' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='" + courseId + "'>X</span></li>");
                $(ulList).append(liObj);
                $('.bundle_offer_sortable').show();
                recalculateCourseIdsStr(ulList, hiddenEle);
            }else if(courseIdsArr.indexOf(courseId) != 0){
                alert("Maximum 3 bundles can be added");
            }
        });


    //offer_bundle_list_selected
}

function createSortableBundleAddOfferLi(formObj, ele, hiddenEle) {

    var courseIdStr = $(formObj).find("input[name='bundle_hidden_sort_add']").val();
    var courseIds = courseIdStr.split(",");
    var courseIdsLen = courseIds.length;
    var coursesSelect = $(formObj).find("select#offer_bundle_list");
    var coursesOptions = [];
    for (var i = 0; i < courseIdsLen; i++) {
        var coursesOptionTmp = $(coursesSelect).find("option[value='" + courseIds[i] + "']");
        var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative' data-cid='" + courseIds[i] + "'>" + $(coursesOptionTmp).text() + "<span class='rm_bndl_electives' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='" + courseIds[i] + "'>X</span></li>");
        coursesOptions[i] = $(liObj);
    }
    var ulList = $("<ul class='bundle_offer_sortable_add' style='float: right;width: 275px;padding: 10px;'></ul>");
    if (coursesOptions != null && courseIdStr != '') {
        $(ulList).append(coursesOptions);
    }
    $(ulList).insertAfter(ele);
    $(ulList).sortable({
        items: "li",
        stop: function() {
            recalculateCourseIdsStr(ulList, hiddenEle);
        }
    });

    $(formObj).find("#offer_bundle_list").parent().on("click", "ul li span", function() {
        $(this).parent().remove();
        var ulList = $(formObj).find("ul.bundle_offer_sortable_add");
        var hiddenEle = $(formObj).find("#bundle_hidden_sort_add");
        recalculateCourseIdsStr(ulList, hiddenEle);
    });
}

function offerCouponChange(){
    $('#HomePageOffers #coupon_id').change(function(){
        $('.bundle_offer_sortable').html('');
    });
}


function getBundleListOffer(){
    var formObj = $("form#HomePageOffers");
    var inputEle;
    var courseIdStr = $(formObj).find("input[name='bundle_hidden_sort']").val();
    if (typeof courseIdStr != 'undefined' && courseIdStr != null) {
            createSortableBundleOfferLi(formObj, $(formObj).find("#offer_bundle_list_selected"), $(formObj).find("#bundle_hidden_sort"));
    }
    var selector = $("#offer_bundle_list_selected").find("option");
    $("#offer_bundle_list_selected").on( 'click', selector, function($event) {
        $event.preventDefault();
        var courseId = $(this).attr("value");
        var hiddenEle = $(formObj).find("#bundle_hidden_sort");
        var courseIdStr = $(hiddenEle).val();
        var courseIdsArr = courseIdStr.split(",");
        if (courseIdsArr.indexOf(courseId) == -1 && $('.bundle_offer_sortable li').length < 3) {
            var ulList = $(formObj).find("ul.bundle_offer_sortable");
            var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative;' data-cid='" + courseId + "'>" + $event.target.innerHTML + "<span class='rm_bndl_electives' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='" + courseId + "'>X</span></li>");
            $(ulList).append(liObj);
            recalculateCourseIdsStr(ulList, hiddenEle);
        }else if(courseIdsArr.indexOf(courseId) != 0){
            alert("Cannot select more than 3 Bundles");
        }
        $('.bundle_offer_sortable').show();
    });
    //offer_bundle_list_selected
}

function createSortableBundleOfferLi(formObj, ele, hiddenEle) {
    var courseIdStr = $(formObj).find("input[name='bundle_hidden_sort']").val();
    var courseIds = courseIdStr.split(",");
    var courseIdsLen = courseIds.length;
    var coursesSelect = $(formObj).find("select#offer_bundle_list_selected");
    var coursesOptions = [];
    for (var i = 0; i < courseIdsLen; i++) {
        var coursesOptionTmp = $(coursesSelect).find("option[value='" + courseIds[i] + "']");
        var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative' data-cid='" + courseIds[i] + "'>" + $(coursesOptionTmp).text() + "<span class='rm_bndl_electives' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='" + courseIds[i] + "'>X</span></li>");
        coursesOptions[i] = $(liObj);
    }
    var ulList = $("<ul class='bundle_offer_sortable' style='float: right;width: 275px;padding: 10px;'></ul>");
    if (coursesOptions != null && courseIdStr != '') {
        $(ulList).append(coursesOptions);
    }
    $(ulList).insertAfter(ele);
    $(ulList).sortable({
        items: "li",
        stop: function() {
            recalculateCourseIdsStr(ulList, hiddenEle);
        }
    });

    $(formObj).find("#offer_bundle_list_selected").parent().on("click", "ul li span", function() {
        $(this).parent().remove();
        var ulList = $(formObj).find("ul.bundle_offer_sortable");
        var hiddenEle = $(formObj).find("#bundle_hidden_sort");
        recalculateCourseIdsStr(ulList, hiddenEle);
    });
}

function handleDummyCourse(){
    $('#courses #is_dummy').click(function() {
        if($(this).is(":checked")) {
            $('#courses #url').closest('li').hide();
        }
        else {
            $('#courses #url').closest('li').show();
        }
    });

    $('#courses #is_free').click(function() {
        if($(this).is(":checked")) {
            $('#courses #url').closest('li').hide();
        }
        else {
            $('#courses #url').closest('li').show();
        }
    });
}

function toggledisplayPrice(trainingType) {
    if(trainingType == 'osl' || trainingType == 'osl_2') {
        $('#daysPricing2').show();
        $('#daysPricing1').hide();
        $('#daysPricing3').hide();
        $('#daysPricing9').hide();
    }
    else if(trainingType == 'ilt'){
        $('#daysPricing1').show();
        $('#daysPricing2').hide();
        $('#daysPricing3').show();
        $('#daysPricing9').show();
    }
    else if(trainingType == 'ilt_1'){
        $('#daysPricing1').show();
        $('#daysPricing2').hide();
        $('#daysPricing3').hide();
        $('#daysPricing9').hide();
    }
    else if(trainingType == 'ilt_9'){
        $('#daysPricing1').hide();
        $('#daysPricing2').hide();
        $('#daysPricing3').hide();
        $('#daysPricing9').show();
    }
    else {
        $('#daysPricing1').hide();
        $('#daysPricing2').hide();
        $('#daysPricing3').hide();
        $('#daysPricing9').hide();
    }
    if($('select#locationMode').val() == 3) {
        $('#daysPricing3').hide();
        $('#daysPricing9').hide();
    }
}

function getAccessDays(){
    $('#daysPricing1').hide();
    $('#daysPricing2').hide();
    $('#daysPricing3').hide();
    $('#daysPricing9').hide();

    if($('#workshop #training_id').val() != 3) {
        $('#workshop #countries').closest('li').hide();
        $('#workshop #timeZone').closest('li').hide();
    }

    $('#addPricing #training_id').change(function(){
        toggledisplayPrice($(this).val());

        $('#addPricing #locationMode').val('');
        $('#addPricing #cluster_id').closest('li').hide();
        $('#addPricing #cityId').closest('li').hide();
        $('#addPricing #country_id').closest('li').hide();
        $('#addPricing #countryCityMode').closest('li').hide();
        if(['ilt_1','itl_9'].indexOf($(this).val()) == -1) {
            $("#addPricing #locationMode option[value='3']").attr('disabled', true);
        }
        else {
            $("#addPricing #locationMode option[value='3']").attr('disabled', false);
        }
    });
    $('#workshop #training_id').change(function(){
        $('ul.errorMain').remove();
        $('#workshop #country_id').val('');
        $('#workshop #city_id').closest('li').hide();
        $('#workshop #venue_id').closest('li').hide();
        $('#workshop #timeZone').closest('li').hide();
        $('#workshop #countries').closest('li').hide();
        if($(this).val() == 1) {
            $('#workshop #city_id').closest('li').show();
            $('#workshop #venue_id').closest('li').show();
            $('#workshop #country_id').closest('li').show();
        }
        else {
            $('#workshop #country_id').closest('li').hide();
            $('#workshop #timeZone').closest('li').show();
            $('#workshop #countries').closest('li').show();
        }
        if($(this).val() == 3 && $('input[name="isCorporate"]:checked').val() == 0) {
            $('#workshop #webx_session_id').closest('li').show();
            $('#workshop #webx_user_id').closest('li').show();
            $('#workshop #webx_version_id-label').parent().show()
        }
        else {
            $('#workshop #webx_session_id').closest('li').hide();
            $('#workshop #webx_user_id').closest('li').hide();
            $('#workshop #webx_version_id-label').parent().hide()
        }
    });

    $('#workshop #access_day_id').change(function(){
        $('ul.errorMain').remove();
        $('#workshop #country_id').val('');
        $('#workshop #city_id').closest('li').hide();
        $('#workshop #venue_id').closest('li').hide();

        if($('input#dates').is(':visible')){
            var defaultDates = $('.multidatepicker').val();
            var noOfDays = $("#access_day_id option:selected" ).text();
            var todaysDate = new Date();
            var formatDate = (todaysDate.getMonth() + 1) + '/' + todaysDate.getDate() + '/' +
                             todaysDate.getFullYear();
            var pieces=formatDate.split('/');
           $('.multidatepicker').attr('readonly','true').parent().append('<span id="span-for-datepicker" />');
           $('#span-for-datepicker').multiDatesPicker({
                maxPicks: noOfDays,
                altField: "#dates",
                minDate: new Date(pieces[2], pieces[0]-1, pieces[1])
            });
            if (defaultDates)
            $('.multidatepicker').val(defaultDates);
        }
    });
    $('#workshop #course_id').change(function(){
        $('ul.errorMain').remove();
        $('#workshop #country_id').val('');
        $('#workshop #city_id').closest('li').hide();
        $('#workshop #venue_id').closest('li').hide();
    });
} // end of function getAccessDays

function getSeedPricing(){
    $('#addPricing #cluster_id').closest('li').hide();
    $('#addPricing #city_id').closest('li').hide();
    $('#addPricing #cityId').closest('li').hide();
    $('#addPricing #country_id').closest('li').hide();
    $('#addPricing #countryCityMode').closest('li').hide();
    $('#addPricing #course_inclusion_id').closest('li').hide();

    if($('#workshop #training_id').val() == 0) {
        $('#workshop #city_id').closest('li').hide();
        $('#workshop #country_id').closest('li').hide();
    }

    $('select#Currency').change(function(){
        $('select#locationMode').val('');
        $('select#cluster_id').closest('li').hide();
        $('select#city_id').closest('li').hide();
        $('select#cityId').closest('li').hide();
        $('select#country_id').closest('li').hide();
        $('select#countryCityMode').closest('li').hide();
    });

    $('select#locationMode').change(function(){
        $('select#cluster_id').closest('li').hide();
        $('select#city_id').closest('li').hide();
        $('select#cityId').closest('li').hide();
        $('select#country_id').closest('li').hide();
        $('select#countryCityMode').closest('li').hide();
        $('select#course_inclusion_id').closest('li').hide();

        var location = $('select#locationMode').val();
        $.apiCall('getSeedPricing', {
            locationMode:location,currencyId: $('select#Currency').val()
        }, function(data){
            var html = "<option value='0'>--Select--</option>";
            $.each(data, function(element, value) {
                html += '<option value="'+value.id+'">'+value.name+'</option>'
            });
            if(location == 1){
                $('select#cluster_id').closest('li').show();
                $('select#cluster_id').html(html);
                $('select#country_id').closest('li').hide();
                $('select#city_id').closest('li').hide();
                $('select#cityId').closest('li').hide();
                $('select#countryCityMode').closest('li').hide();
                $('select#course_inclusion_id').closest('li').show();
                toggledisplayPrice($('select#training_id').val());
            }
            if(location == 2){
                $('select#cluster_id').closest('li').hide();
                $('select#city_id').closest('li').hide();
                $('select#cityId').closest('li').hide();
                $('select#countryCityMode').closest('li').hide();
                $('select#country_id').closest('li').show();
                $('select#country_id').html(html);
                $('select#course_inclusion_id').closest('li').show();
                toggledisplayPrice($('select#training_id').val());
            }
            if(location == 3){
                $('select#country_id').closest('li').hide();
                $('select#cluster_id').closest('li').hide();
                $('select#city_id').closest('li').hide();
                $('select#cityId').closest('li').hide();
                $('select#countryCityMode').closest('li').show();
                $('select#countryCityMode').html(html);
                $('select#course_inclusion_id').closest('li').hide();
                toggledisplayPrice($('select#training_id').val());
            }
        });
    });
} // end of function getAccessDays


function getCityList(){
    $('select#countryCityMode').change(function(){
        $.apiCall('getCityList', {
            countryId:$('select#countryCityMode').val()
        }, function(data){
            var html = "<option value='0'>--Select--</option>";
            $.each(data, function(element, value) {
                html += '<option value="'+element+'">'+value+'</option>';
            });
            $('select#city_id').closest('li').show();
            $('select#city_id').html(html);
            $('select#cityId').closest('li').show();
            $('select#cityId').html(html);
        });
    });
} // end of function getCityList


function getCityByCountry(){

    $('select#country_id').change(function(){
        if($('#locationMode').length !== 0 && $('#locationMode').val() !== 3) {
            return false;
        }
        if($('select#city_id').length > 0 || $('select#cityId').length > 0) {
            loadCityByCountry($(this).val());
        }
    });

    /*if($('select#country_id').val()) {
        if($('select#city_id').length > 0 || $('select#cityId').length > 0) {
            loadCityByCountry($('select#country_id').val());
        }
    }*/
} // end of function getCityByCountry
function loadCityByCountry(countryId) {
    $.apiCall('getCityList', {
        countryId:countryId
    }, function(data){
        var html = "<option value='0'>--Select--</option>";
        $.each(data, function(element, value) {
            html += '<option value="'+element+'">'+value+'</option>';
        });
        $('select#city_id').closest('li').show();
        $('select#city_id').html(html);
        $('select#cityId').closest('li').show();
        $('select#cityId').html(html);
    });
}

function getVenuesForCityCountry(){
    $('#workshop #venue_id').closest('li').hide();

    $('select#city_id').change(function(){
        $.apiCall('getVenuesForCityCountry', {
            countryId:$('select#country_id').val(),
            cityId:$('select#city_id').val()
        }, function(data){
            var html = "<option value='0'>--Select--</option>";
            for (var key in data) {
                html += '<option value="'+key+'">'+data[key]+'</option>'
            }
            $('select#venue_id').closest('li').show();
            $('select#venue_id').html(html);
        });
    });
} // end of function getVenuesForCityCountry

function getTrainerForCityCountry(){
    /*
    $('select#city_id').change(function(){
        $.apiCall('getTrainerForCityCountry', {
            countryId:$('select#country_id').val(),
            cityId:$('select#city_id').val(),
        }, function(data){
            var html = "<option value='0'>--Select--</option>";
            for (var key in data) {
                html += '<option value="'+key+'">'+data[key]+'</option>'
            }
            $('select#trainer_id').show();
            $('select#trainer_id').html(html);
        });
    });
    */
} // end of function getVenuesForCityCountry


function showPricingPreview(){
   $('#SavePricing').click(function(){
       var pId = $('#pricing_id').val();
       var newPrice = $('#newPrice').val();
       var newMaxDsicount = $('#newDiscount').val();
       var courseInclusionId = $('#course_inclusion_id').val();
       $.apiCall('showPricingPreview', {
           pricingId:pId,
           basePrice:newPrice,
           maxDiscount:newMaxDsicount,
           courseInclusionId:courseInclusionId,
       },function(data){
           if(data.error){
               alert('failed to update data');
           }
           else{
               alert('Successfully Updated');
               location.reload();
           }
       });
       return false;
   });
}

function checkPricingsExists(){
    //add note to Classroom
    if($('.courseForm .training-types-subform-courses input:checkbox[name="trainingTypes[ilt1]"]').length == 1){
        $('.courseForm .training-types-subform-courses input:checkbox[name="trainingTypes[ilt1]"]').parent().append('<span style="color:red;font-size: 12px;padding-left: 20px;">(Note : If Checked, the course page will be in classroom Layout)</span>');
    }
    $("#trainingTypes-ilt1,#trainingTypes-osl2,#trainingTypes-ilt3").change(function(event){
        var checkBox = this;
        var trainindTypes = {'trainingTypes-ilt1':1,'trainingTypes-osl2':2,'trainingTypes-ilt3':3};
        var trainindTypesClass = {1:"classRoomAccessDays",2:'oslAccessDays',3:'iloAccessDays'};
        var idCheckbox = $(this).attr('id');
        var isChecked = $(this).is(':checked');
        var courseId = ($('#EditCourse').length && $('#EditCourse').data('id')) || 0;
        var trainindId = trainindTypes[idCheckbox];
        if(courseId && !isChecked){
            $.apiCall('checkPricingsExists', {
                courseId:courseId,
                trainindId:trainindId
            },function(data){
                if(data.error){
                    $(checkBox).prop('checked', true)
                    alert(data.message);
                }else{
                    $('.'+trainindTypesClass[trainindId]).prop("checked",false);
                }
            });
        }
    });

    //for pricing Page disable based on Training Enabled
    if(document.querySelector('form#addPricing') != null){
        var courseId = $('form#addPricing #course_id').val() || 0;
        loadTrainingsOnPricing(courseId);
    }
}

function deletePricingPreview(){
    $('#DeletePricing').click(function(){
        var pId = $('#pricing_id').val();
        $.apiCall('deletePricingPreview', {
            pricingId:pId,
        },function(data){
            if(data.error){
                alert(data.errorMessage);
            }
            else{
                alert('Successfully deleted price');
                var course = window.location.pathname.match(/\/courseId\/(\d+)\/pricing_id/);
                location.href = baseUrl+'/admin/pricing/add/courseId/'+course[1];
            }
        });
        return false;
    });
}

function getUrlParams(){
    var url      = window.location.pathname;
    var splitUrl = url.split('/');
    var id = splitUrl[splitUrl.length-1];
    return id;
}

function inward(labelId){
    var prevTop = $('#'+labelId).scrollTop();
    var tt = $('#'+labelId).find(':selected');
    $('#'+labelId).find('option').not('option[value=0]').attr('selected','selected');
    tt.removeAttr('selected');
    $('#'+labelId).scrollTop(prevTop);

    if(labelId == 'label_id') {
        clearLabelCourseLoad = setTimeout(function() {
            loadCoursesByLable();
            loadBundlesByLable();
        },100);
    }

    if(labelId == 'cluster_id') {
        clearLabelCourseLoad = setTimeout(function() {
            selectCountriesByCluster(labelId,'country_id');
        },100);
    }

    if(labelId == 'cluster_id_bundle') {
        clearLabelCourseLoad = setTimeout(function() {
            selectCountriesByCluster(labelId,'country_id_bundle');
        },100);
    }

    if(labelId == 'cluster_id_homepage') {
        clearLabelCourseLoad = setTimeout(function() {
            selectCountriesByCluster(labelId,'country_id_homepage');
        },100);
    }
}
/*function countryByClusterSelect(element,selector){
    var selectedCluster = [];
    var elementId = $(element).attr('id');
    var optionId = "#"+elementId+" option:selected";
    $(optionId).each(function () {
            if ($(this).val().length) {
                selectedCluster.push($(this).val());
            }
    });
    console.log(selectedCluster);
    getCountriesByCluster(selectedCluster,selector);
}*/
function invertSelection(element){
    var elementId = $(element).attr('id');
    var idSplit = elementId.split('-');//aboutCourse-new-cluster_id
    var clusterSelectorId = idSplit[0]+'-'+idSplit[1]+'-cluster_id';
    var checkboxId = idSplit[0]+'-'+idSplit[1]+'-all_country';
    if($("#"+checkboxId).prop('checked')){
        return false;
    }
    var parentObj = $("#"+elementId).parent().parent();
    var selector = parentObj.prev("li").find(".countryListAll").attr("id");
    inward(selector);
    console.log(checkboxId);
    $("#"+clusterSelectorId).each(function(){
        var clusterId = $(this).val();
        if(clusterId){
            for (i = 0; i < clusterId.length; i++){
            var clId = clusterId[i];
            $("#" + clusterSelectorId + " option[value='" + clId + "']").prop("selected", false);
        }
        }
    })
}   
function showLinksDropDown(element){
    var elementVal = $(element).val();
    var coursesDropdown = 'contentForm-new-footerCourses';
    var bundlesDropdown = 'contentForm-new-footerBundles';    
    var resourcesDropdown = 'contentForm-new-footerResources';
    var prodCatDropdown = 'contentForm-new-courseCategory';
    var resourcesCatDropdown = 'contentForm-new-resourceCategory';

    var resourcesProdtType = 'contentForm-new-resourceProductType';
    var resourcesProduct = 'contentForm-new-resourceProduct';
    var resourcesType = 'contentForm-new-resourceType';


    var linkText = 'contentForm-new-link_text';
    var addButton = 'contentForm-new-add';
    $('#contentForm-new-courseCategory').val(0);
    $('#contentForm-new-link_text').val('');
    switch(elementVal) {
        case '1':
            $('#'+coursesDropdown+', [for='+coursesDropdown+'], #'+linkText+', [for='+linkText+'], #'+addButton).show();
            $('#'+coursesDropdown+', [for='+coursesDropdown+']').parent().parent().show().css('margin','10px 0px');
            $('#'+prodCatDropdown+', [for='+prodCatDropdown+']').show();
            $('#'+prodCatDropdown+', [for='+prodCatDropdown+']').parent().parent().show().css('margin','10px 0px');;

            $('#'+bundlesDropdown+', [for='+bundlesDropdown+']').hide();
            $('#'+bundlesDropdown+', [for='+bundlesDropdown+']').parent().parent().hide();

            $('#'+resourcesDropdown+', [for='+resourcesDropdown+']').hide();
            $('#'+resourcesDropdown+', [for='+resourcesDropdown+']').parent().parent().hide();
            $('#'+resourcesCatDropdown+', [for='+resourcesCatDropdown+']').hide();
            $('#'+resourcesCatDropdown+', [for='+resourcesCatDropdown+']').parent().parent().hide();
            $('#'+resourcesProdtType+', [for='+resourcesProdtType+']').hide();
            $('#'+resourcesProdtType+', [for='+resourcesProdtType+']').parent().parent().hide();
            $('#'+resourcesProduct+', [for='+resourcesProduct+']').hide();
            $('#'+resourcesProduct+', [for='+resourcesProduct+']').parent().parent().hide();
            $('#'+resourcesType+', [for='+resourcesType+']').hide();
            $('#'+resourcesType+', [for='+resourcesType+']').parent().parent().hide();

            break;
        case '2':
            $('#'+bundlesDropdown+', [for='+bundlesDropdown+'], #'+linkText+', [for='+linkText+'], #'+addButton).show();
            $('#'+bundlesDropdown+', [for='+bundlesDropdown+']').parent().parent().show().css('margin-bottom','10px');
            $('#'+prodCatDropdown+', [for='+prodCatDropdown+']').show();
            $('#'+prodCatDropdown+', [for='+prodCatDropdown+']').parent().parent().show().css('margin','10px 0px');

            $('#'+coursesDropdown+', [for='+coursesDropdown+']').hide();
            $('#'+coursesDropdown+', [for='+coursesDropdown+']').parent().parent().hide();

            $('#'+resourcesDropdown+', [for='+resourcesDropdown+']').hide();
            $('#'+resourcesDropdown+', [for='+resourcesDropdown+']').parent().parent().hide();
            $('#'+resourcesCatDropdown+', [for='+resourcesCatDropdown+']').hide();
            $('#'+resourcesCatDropdown+', [for='+resourcesCatDropdown+']').parent().parent().hide();
            $('#'+resourcesProdtType+', [for='+resourcesProdtType+']').hide();
            $('#'+resourcesProdtType+', [for='+resourcesProdtType+']').parent().parent().hide();
            $('#'+resourcesProduct+', [for='+resourcesProduct+']').hide();
            $('#'+resourcesProduct+', [for='+resourcesProduct+']').parent().parent().hide();
            $('#'+resourcesType+', [for='+resourcesType+']').hide();
            $('#'+resourcesType+', [for='+resourcesType+']').parent().parent().hide();
            
            break;
        case '3':
            $('#'+resourcesDropdown+', [for='+resourcesDropdown+'], #'+linkText+', [for='+linkText+'], #'+addButton).show();
            $('#'+resourcesDropdown+', [for='+resourcesDropdown+']').parent().parent().show();
            $('#'+resourcesCatDropdown+', [for='+resourcesCatDropdown+']').show();
            $('#'+resourcesCatDropdown+', [for='+resourcesCatDropdown+']').parent().parent().show().css('margin','10px 0px');

            $('#'+resourcesProdtType+', [for='+resourcesProdtType+']').show();
            $('#'+resourcesProdtType+', [for='+resourcesProdtType+']').parent().parent().show().css('margin','10px 0px');;
            $('#'+resourcesProduct+', [for='+resourcesProduct+']').show();
            $('#'+resourcesProduct+', [for='+resourcesProduct+']').parent().parent().show().css('margin','10px 0px');;
            $('#'+resourcesType+', [for='+resourcesType+']').show();
            $('#'+resourcesType+', [for='+resourcesType+']').parent().parent().show().css('margin','10px 0px');;
            
            $('#'+coursesDropdown+', [for='+coursesDropdown+']').hide();
            $('#'+coursesDropdown+', [for='+coursesDropdown+']').parent().parent().hide();
            $('#'+bundlesDropdown+', [for='+bundlesDropdown+']').hide();
            $('#'+bundlesDropdown+', [for='+bundlesDropdown+']').parent().parent().hide();
            $('#'+prodCatDropdown+', [for='+prodCatDropdown+']').hide();
            $('#'+prodCatDropdown+', [for='+prodCatDropdown+']').parent().parent().hide();
            break;
        default: 
            $('#'+coursesDropdown+', [for='+coursesDropdown+'], #'+linkText+', [for='+linkText+'], #'+addButton).hide();
            $('#'+coursesDropdown+', [for='+coursesDropdown+']').parent().parent().hide();            
            $('#'+bundlesDropdown+', [for='+bundlesDropdown+']').hide();
            $('#'+bundlesDropdown+', [for='+bundlesDropdown+']').parent().parent().hide();
            $('#'+prodCatDropdown+', [for='+prodCatDropdown+']').hide();
            $('#'+prodCatDropdown+', [for='+prodCatDropdown+']').parent().parent().hide();

            $('#'+resourcesDropdown+', [for='+resourcesDropdown+']').hide();
            $('#'+resourcesDropdown+', [for='+resourcesDropdown+']').parent().parent().hide();
            $('#'+resourcesCatDropdown+', [for='+resourcesCatDropdown+']').hide();
            $('#'+resourcesCatDropdown+', [for='+resourcesCatDropdown+']').parent().parent().hide();
            $('#'+resourcesProdtType+', [for='+resourcesProdtType+']').hide();
            $('#'+resourcesProdtType+', [for='+resourcesProdtType+']').parent().parent().hide();
            $('#'+resourcesProduct+', [for='+resourcesProduct+']').hide();
            $('#'+resourcesProduct+', [for='+resourcesProduct+']').parent().parent().hide();
            $('#'+resourcesType+', [for='+resourcesType+']').hide();
            $('#'+resourcesType+', [for='+resourcesType+']').parent().parent().hide();

            break;
    }
    $('#footerTable').remove();
    $('#footer_link #contentForm-new-footer_links').val(JSON.stringify([]));
}
function addLink(){ 
    var linktextId = 'contentForm-new-link_text';
    var linktextVal = $('#'+linktextId).val();
    var linkurlVal = '';
    var selectedCat = $('#contentForm-new-footerCategory').val();
    var linkurlObj = '';
    
    switch(selectedCat){
        case '1':
            linkurlVal = $('#contentForm-new-footerCourses').val();
            linkurlObj = $('#contentForm-new-footerCourses');
            break;
        case '2':
            linkurlVal = $('#contentForm-new-footerBundles').val();
            linkurlObj = $('#contentForm-new-footerBundles');
            break;
        case '3':
            linkurlVal = $('#contentForm-new-footerResources').val();
            linkurlObj = $('#contentForm-new-footerResources');
            break;            
        default:
            break;
    }
    
    if(linkurlVal == 0 || linktextVal == ''){
        alert('Please  enter and select value.');return false;
    } else {
          $("#contentForm-new-link_text").removeClass("error-border");
          linkurlObj.removeClass("error-border");
    }
    
    return;
}

$(document).on("click", "a.current-flink-class" , function() {        
    $(this).closest('li').remove();
    return;
});


function  checkAllCountry(element){
    var elementId = $(element).attr('id');
    var parentObj = $("#"+elementId).parent().parent();
    var selecterArr =  elementId.split('-');
    var selecter = selecterArr[0] +"-"+ selecterArr[1];
    var countryIds = $("#"+selecter+ "-country_id").val();
    var clusterIds = $("#"+selecter+ "-cluster_id").val();
    var isEdit = $("#"+selecter+ "-cluster_id").attr('data-isedit');
    isEdit = (isEdit) ? isEdit : 0;
    countryIds = (countryIds) ? countryIds : '';
    clusterIds = (clusterIds) ? clusterIds : '';
    if ($(element).is(':checked')) {
        if(!(isEdit && (countryIds.length || clusterIds.length)) ){
            parentObj.next("li").find(".clusterListAll").attr("disabled",true);
            parentObj.next("li").next("li").find(".countryListAll").attr("disabled",true);
            parentObj.next("li").next("li").next("li").find(".invert-all").attr("disabled",true);
            parentObj.next("li").next("li").find(".countryListAll").val("");
            parentObj.next("li").find(".clusterListAll").val("");
            previous = new Array();
        }
    }else{
        parentObj.next("li").find(".clusterListAll").attr("disabled",false);
        parentObj.next("li").next("li").find(".countryListAll").attr("disabled",false);
        parentObj.next("li").next("li").next("li").find(".invert-all").attr("disabled",false);
        if(!(isEdit && (countryIds.length || clusterIds.length)) ){
            parentObj.next("li").next("li").find(".countryListAll").val("");
            parentObj.next("li").find(".clusterListAll").val("");
        }
    }
}
function getCountriesByClusterFooterLink(clusterIds,selector,parentElement,lastSelectedClusterId){
        var clusterLength = clusterIds.length;
        var countrySelect = selector;
        var newSelected = clusterIds;
        var lastSelected =  (lastSelectedClusterId) ? lastSelectedClusterId.split(","):'';
        var idToRemove = [];
        if(lastSelected){
            for(i = 0 ;i<lastSelected.length;i++){
            var val = lastSelected[i];
            if(newSelected.indexOf(val) ==-1){
                    idToRemove.push(val);

            }
         }
        }
        if(idToRemove && idToRemove.length){
            $.each(idToRemove, function(element, value) {
                var data = clusterCountryMapping[value];
                $.each(data, function(element, value) {
                    //$('select#' + countrySelect + ' [value="' + value + '"]').attr('selected', false);
                    $('select#' + countrySelect + ' [value="' + value + '"]').attr('disabled', false);
                })
            });
        }
        //$("#"+selector+ " > option").attr("selected",false);
        if (clusterLength){
            for (var i = 0; i < clusterLength; i++){
                var clusterId = clusterIds[i];
                if(typeof clusterCountryMapping[clusterId] !=="undefined"){
                    var data = clusterCountryMapping[clusterId];
                    $.each(data, function(element, value) {
                    $('select#' + countrySelect + ' [value="' + value + '"]').attr('disabled', "disabled");
                    });
                }
            }
        }
        var updatedClusterStr ='';
        if(typeof newSelected !=="undefined" && newSelected.length){
            updatedClusterStr=newSelected.join(',');
        }
        $(parentElement).attr('data-last-selected',updatedClusterStr);
     //   console.log(newSelected,parentElement,updatedClusterStr);
}

function countryByClusterSelectFooterLinks(element){
    var selectedCluster = '';
    var elementId = $(element).attr('id');
    var isEdit = $(element).attr('data-isedit');
    if(isEdit) return;
    var selectedValues = $(element).val();

    var lastSelectedClusterId = $(element).attr('data-last-selected');
    if(selectedValues){
       selectedCluster = selectedValues.toString().split(',');
    }
    var parentObj = $("#"+elementId).parent().parent();
    var selector = parentObj.next("li").find(".countryListAll").attr("id");
    getCountriesByClusterFooterLink(selectedCluster,selector,element,lastSelectedClusterId);
}

function countryByClusterSelect(element,selector){
    var selectedCluster = '';
    var elementId = $(element).attr('id');
    var isEdit = $(element).attr('data-isedit');
    if(isEdit) return;
    var selectedValues = $(element).val();
    var lastSelectedClusterId = $(element).attr('data-last-selected');
    if(selectedValues){
       selectedCluster = selectedValues.toString().split(',');
    }
    var parentObj = $("#"+elementId).parent().parent();
    var selector = parentObj.next("li").find(".countryListAll").attr("id");
    getCountriesByCluster(selectedCluster,selector,element,lastSelectedClusterId);
    $("#"+selector).change(function(event){
     var beforeChange = $("#"+selector).val();
     var clusterSelectorId = $(element).attr('id');
     setTimeout(function(){
            var countrIds = beforeChange.toString().split(',');
            $("#"+selector).val(countrIds);
            // Check if all countries are selected under cluster
            $("#"+clusterSelectorId).each(function(){
                    var clusterId = $(this).val();
                    if(clusterId){
                        for (i = 0; i < clusterId.length; i++){
                        var clId = clusterId[i];
                        var clusterCountries = typeof window.clusterCountryMapping[clId] !== "undefined" && typeof window.clusterCountryMapping[clId] == "object" ? window.clusterCountryMapping[clId] :[];
                        if (countrIds){
                            clusterCountries.forEach(function(country) {
                            if (countrIds.indexOf(country) === - 1){
                                    console.log("Deselect Cluster As All Countries are not selected",clusterSelectorId,clId);
                                    $("#" + clusterSelectorId + " option[value='" + clId + "']").prop("selected", false);
                                }
                            });
                    }
                    }
                    }
                    
            })
        },200);
    })
}
function selectCountriesByCluster(clusterSelect,countrySelect) {
    
    $('select#'+countrySelect+' option').each(function() {
        $(this).attr('disabled', false);
    });
    if(!$('#'+clusterSelect).val()) {
        return false;
    }
    $.apiCall('getCountriesByCluster', {
        clusterId:$('#'+clusterSelect).val()
    }, function(data){
        $.each(data, function(element, value) {
           $('select#'+countrySelect+' [value="'+element+'"]').attr('disabled', true);
        });
    });
}

function getCountriesForCluster(){
    $('#cluster_id').change(function(){
        var clusterId = $(this).val();
        if(clearLabelCourseLoad) {
            clearTimeout(clearLabelCourseLoad);
            clearLabelCourseLoad = false;
        }
        clearLabelCourseLoad = setTimeout(function(){
            selectCountriesByCluster(clusterId);
        },1000);
    });
}


function getCountriesByCluster(clusterIds,selector,parentElement,lastSelectedClusterId){
        var clusterLength = clusterIds.length;
        var clusterCountrieIds = [];
        var countrySelect = selector;
        var newSelected = clusterIds;
        var lastSelected =  (lastSelectedClusterId) ? lastSelectedClusterId.split(","):'';
        var idToRemove = [];
        if(lastSelected){
            for(i = 0 ;i<lastSelected.length;i++){
            var val = lastSelected[i];
            if(newSelected.indexOf(val) ==-1){
                    idToRemove.push(val);

            }
         }
        }
        if(idToRemove && idToRemove.length){
            $.each(idToRemove, function(element, value) {
                var data = clusterCountryMapping[value];
                $.each(data, function(element, value) {
                    $('select#' + countrySelect + ' [value="' + value + '"]').attr('selected', false);
                })
            });
        }
        //$("#"+selector+ " > option").attr("selected",false);
        if (clusterLength){
            for (var i = 0; i < clusterLength; i++){
                var clusterId = clusterIds[i];
                if(typeof clusterCountryMapping[clusterId] !=="undefined"){
                    var data = clusterCountryMapping[clusterId];
                    $.each(data, function(element, value) {
                    $('select#' + countrySelect + ' [value="' + value + '"]').attr('selected', "selected");
                    });
                }
            }
        }
        var updatedClusterStr ='';
        if(typeof newSelected !=="undefined" && newSelected.length){
            updatedClusterStr=newSelected.join(',');
        }
        $(parentElement).attr('data-last-selected',updatedClusterStr);
     //   console.log(newSelected,parentElement,updatedClusterStr);
        
}

function getCoursesForLabels(){
    $('select#label_id').change(function(){
        if(clearLabelCourseLoad) {
            clearTimeout(clearLabelCourseLoad);
            clearLabelCourseLoad = false;
        }
        clearLabelCourseLoad = setTimeout(function(){
            loadCoursesByLable();
            loadBundlesByLable();
        },1000);
    });
}

function selectedProductType(){
    $('select.product_id_for_product_update').change(function(){
        if(clearLabelCourseLoad) {
            clearTimeout(clearLabelCourseLoad);
            clearLabelCourseLoad = false;
        }
        var ths = this;
        $(ths).parent().parent().find(".product_id_for_product").addClass('loading-class');
        clearLabelCourseLoad = setTimeout(function(){
            loadProductsByType(ths);
        },1000);
    });
}
function loadProductsByType(ths) {
    var lId = $(ths).val();
    if (!lId) {
        return false;
    }
    $.apiCall('getProductDetailsByType', {
        type: lId,
    }, function (data) {
        clearTimeout(clearLabelCourseLoad);
        $(ths).parent().parent().find(".product_id_for_product").empty();
        var res = JSON.parse(data);
        for (var key in res) {
            var option = $('<option></option>').attr("value", res[key]["key"]).text(res[key]["val"]);
            $(ths).parent().parent().find(".product_id_for_product").append(option);
        }
        $(ths).parent().parent().find(".product_id_for_product").removeClass('loading-class');
    });
}

function selectCoursesForLabels(){
    $('select.label_id_for_course_update').change(function(){
        if(clearLabelCourseLoad) {
            clearTimeout(clearLabelCourseLoad);
            clearLabelCourseLoad = false;
        }
        var ths = this;
        $(ths).parent().parent().find(".course_id_for_label").addClass('loading-class');
        clearLabelCourseLoad = setTimeout(function(){
            loadCoursesBySelectedLable(ths);
        },1000);
    });
}

function getCoursesByPricing(){
    $('select#label_id_ft,select#cluster_id_ft,select#country_id_ft').change(function(){
        if(clearLabelCourseLoad) {
            clearTimeout(clearLabelCourseLoad);
            clearLabelCourseLoad = false;
        }
        clearLabelCourseLoad = setTimeout(function(){
            loadCoursesByPricing();
        },1000);
    });
}
function loadFTDataOnload(){
    var lId = $('select#label_id_ft').val();
    var clId = $('select#cluster_id_ft').val();
    var cId = $('select#country_id_ft').val();
    if(lId > 0 || clId > 0 || cId > 0) {
        loadCoursesByPricing();
    }
    var clIdMP = $('select#cluster_id_mp_ft').val();
    var cIdMP = $('select#country_id_mp_ft').val();
    if(clIdMP || cIdMP) {
        loadBundlesByPricings();
    }

  }
function loadCoursesByPricing(){
    var lId = $('select#label_id_ft').val();
    var clId = $('select#cluster_id_ft').val();
    var cId = $('select#country_id_ft').val();
    if(lId  == 0 && clId == 0 && cId == 0) {
        return false;
    }
    var elem = 'course_id_ft';
    var sel = $('#'+elem).clone().attr('id', 'temp').appendTo('#'+elem+'-element');
    $('select#'+elem).remove();

    $.apiCall('getCoursesByPricing', {
     label_id:lId,
     cluster_id:clId,
     country_id:cId,
     free_trial:1
    },function(data){
        clearTimeout(clearLabelCourseLoad);
        var html = "<option value=''>--Select--</option>";
        for (var key in data) {
            var courseName = data[key];
            var index = courseName.search("#1");
            var selected = '';
            if(index > 0){
                courseName = courseName.substring(0,index);
                selected = 'selected';
            }

            html += '<option value="'+key+'" '+selected+'>'+courseName+'</option>'
        }
        sel.html(html);
        sel.attr('id',elem);
    });

  }

function getBundlesByPricings(){
    $('select#cluster_id_mp_ft,select#country_id_mp_ft').change(function(){
        if(clearLabelCourseLoad) {
            clearTimeout(clearLabelCourseLoad);
            clearLabelCourseLoad = false;
        }
        clearLabelCourseLoad = setTimeout(function(){
            loadBundlesByPricings();
        },1000);
    });
}

function loadBundlesByPricings() {
    var clIdMP = $('select#cluster_id_mp_ft').val();
    var cIdMP = $('select#country_id_mp_ft').val();
    if(clIdMP == 0 && cIdMP == 0) {
        return false;
    }
    var elem = 'bundle_id_ft';
    var sel = $('#'+elem).clone().attr('id', 'temp').appendTo('#'+elem+'-element');
    $('select#'+elem).remove();
    $.apiCall('getBundlesByPricings', {
     cluster_id:clIdMP,
     country_id:cIdMP,
     free_trial:1
    },function(data){
        clearTimeout(clearLabelCourseLoad);
        var html = "<option value=''>--Select--</option>";
        for (var key in data) {
            var name = data[key];
            var index = name.search("#1");
            var selected = '';
            if(index > 0){
                name = name.substring(0,index);
                selected = 'selected';
            }

            html += '<option value="'+key+'" '+selected+'>'+name+'</option>'
        }
        sel.html(html);
        sel.attr('id',elem);
    });
}

function loadCoursesBySelectedLable(ths) {
    var lId = $(ths).val();
    if(!lId) {
        return false;
    }
    $.apiCall('fetchCoursesForLabels', {
     labelId:[lId],
    },function(data){
        clearTimeout(clearLabelCourseLoad);
        $(ths).parent().parent().find(".course_id_for_label").empty();
        var res = JSON.parse(data);
        for (var key in res) {
            var option = $('<option></option>').attr("value", res[key]["key"]).text(res[key]["val"]);
            $(ths).parent().parent().find(".course_id_for_label").append(option);
        }
        $(ths).parent().parent().find(".course_id_for_label").removeClass('loading-class');
    });
}

function loadCoursesByLable() {
    if($('#Bundles #label_id').length > 0) {
        return false;
    }
    $('select#course_id option').each(function() {
        $(this).attr('disabled', false);
    });
    var lId = $('select#label_id').val();
    if(!lId) {
        return false;
    }
    $.apiCall('getCoursesForLabels', {
     labelId:lId,
    },function(data){
        clearTimeout(clearLabelCourseLoad);
        for (var key in data) {
            $('select#course_id [value="'+key+'"]').attr('disabled', true);
        }
    });
}

function loadBundlesByLable() {
    if($('#Bundles #label_id').length > 0) {
        return false;
    }
    $('select#bundle_id option').each(function() {
        $(this).attr('disabled', false);
    });
    var lId = $('select#label_id').val();
    if(!lId) {
        return false;
    }
    $.apiCall('getBundlesForLabels', {
     labelId:lId,
    },function(data){
        clearTimeout(clearLabelCourseLoad);
        for (var key in data) {
            $('select#bundle_id [value="'+key+'"]').attr('disabled', true);
        }
    });
}

function loadCoursesByTag(val) { 
   if(val === "ALL_COURSE") {
        $('select#course_id option').each(function() {
            $(this).removeAttr("selected").attr('disabled', true).css('display', 'block');
        });
    }
    else if (val == 'NONE'){
        $('select#course_id option').each(function() {
            $(this).attr('disabled', false).css('display', 'block');
        });
    }
    else if(["COURSE_WITH_EXAM", "COURSE_WITHOUT_EXAM"].includes(val)){
    $.apiCall('getCoursesForTag', {
        courseGrp:val,
    },function(data){
        var hideArr = Object.keys(data);        
        $('select#course_id option').each(function() {
            if(hideArr.includes($(this).attr('value'))){
            $(this).removeAttr("selected").attr('disabled', true).css('display', 'none');
            }
            else{
                $(this).attr('disabled', false).css('display', 'block');
            }
        });
    });
}
}

function loadBundlesByTag(val) { 
    if(val === "ALL_BUNDLE") {
        $('select#bundle_id option').each(function() {
            $(this).removeAttr("selected").attr('disabled', true).css('display', 'block');
        });
    }
    else if (val == 'NONE'){
        $('select#bundle_id option').each(function() {
            $(this).attr('disabled', false).css('display', 'block');
        });
    }
    else if(["BUNDLE_WITH_EXAM", "BUNDLE_WITHOUT_EXAM"].includes(val)){
    $.apiCall('getBundlesForTag', {
        bundleGrp:val,
    },function(data){
        var hideArr = Object.keys(data);
        $('select#bundle_id option').each(function() {
            if(hideArr.includes($(this).attr('value'))){
            $(this).removeAttr("selected").attr('disabled', true).css('display', 'none');
            }
            else{
                $(this).attr('disabled', false).css('display', 'block');
            }
        });
    });
}
}

function changeAllCountries(val){
   $('#multi_country-NONE').prop('checked', true);
    loadCountriesByTag("NONE");
    if(val){
        $('select#cluster_id option').each(function() {
            $(this).removeAttr("selected").attr('disabled', true);
        });
        $('select#country_id option').each(function() {
            $(this).removeAttr("selected").attr('disabled', true);
        });
        $("input[name='multi_country']").attr('disabled', true);        
    }
    else{
        $('select#cluster_id option').each(function() {
            $(this).attr('disabled', false);
        });
        $('select#country_id option').each(function() {
            $(this).attr('disabled', false);
        });
        $("input[name='multi_country']").attr('disabled', false);
    }
}

function loadCountriesByTag(val) {
   if (val == 'NONE') {
        $('select#country_id option').each(function () {
            $(this).attr('disabled', false).css('display', 'block');
        });
    }
    else if (["EURO", "ROW"].includes(val)) {
        $.apiCall('getCountriesByTag', {
            countryGrp: val
        }, function (data) {
            var hideArr = Object.keys(data);               
                $('select#country_id option').each(function () {
                    if (hideArr.includes($(this).attr('value'))) {
                        $(this).removeAttr("selected").attr('disabled', true).css('display', 'none');
                    }
                    else {
                        $(this).attr('disabled', false).css('display', 'block');
                    }
                });
        });
    }
}

function testTypeChangeHandler(){
    if ($('input[name="test_type"]:checked').val() !== undefined) {
        $('input[name="test_type"]').on('change', function (e) {
            let testType = e.target.value;
            testTypeChange(testType);          
        }); 
        testTypeChange($('input[name="test_type"]:checked').val());               
    }
}

function testTypeChange(testType){
    if(testType === "free_practice_test"){
        $('#noOfQuestions').val('');
        $('#testTime').val('');
        $('.scholar-type').closest('li').css('display','none');
        $('.fpt-type').closest('li').css('display','inline-block');
  }
    else if(testType === "scholarship_test"){
        $('#metaDescription').val('');
        $('#fptSearchtag').val(''); 
        $('.fpt-type').closest('li').css('display','none');
        $('.scholar-type').closest('li').css('display','inline-block');        
    }
}
function initChangeByTag() {
    if ($('input[name="multi_bundle"]:checked').val() !== undefined) {
        loadBundlesByTag($('input[name="multi_bundle"]:checked').val());
        $('#multi_bundle-element').on('change', function (e) {
            loadBundlesByTag(e.target.value);
        });
    }
    if ($('input[name="multi_course"]:checked').val() !== undefined) {
        loadCoursesByTag($('input[name="multi_course"]:checked').val());
        $('#multi_course-element').on('change', function (e) {
            loadCoursesByTag(e.target.value);
        });
    }
    if ($('input[name="multi_country"]:checked').val() !== undefined) {
        loadCountriesByTag($('input[name="multi_country"]:checked').val());
        $('#multi_country-element').on('change', function (e) {
            loadCountriesByTag(e.target.value);
        });
    }
    if ($('#all_countries').attr('checked')) {
        changeAllCountries($('#all_countries').attr('checked'));
    }
    $('#all_countries').on('change', function (e) {
        changeAllCountries($(this).attr('checked'));
    });
}


function AddMorePricing(){
    $('#AddMorePricing').click(function(){
        $('ul.errors').remove();
        $('ul.errorMain').remove();
        var trainingId = $('#addPricing #training_id').val();
        trainingId = trainingId.split('_')[0] || trainingId;
        var dataSave = {
            course_id: $('#addPricing #course_id').val(),
            training_id: trainingId,
            access_day_id: $('#addPricing #access_day_id').val(),
            locationMode: $('#addPricing #locationMode').val(),
            course_inclusion_id: $('#addPricing #course_inclusion_id').val(),
            price: $('#addPricing #price').val(),
            discount: $('#addPricing #discount').val(),
            method: 'AddMorePricing'
        };
        $('#addPricing .daysPricing:visible input').each(function() {
            dataSave[$(this).attr('name')] = $(this).val();
        });

        if($('#addPricing #cluster_id').is(':visible')) {
            dataSave['cluster_id'] = $('#addPricing #cluster_id').val();
        }
        if($('#addPricing #country_id').is(':visible')) {
            dataSave['country_id'] = $('#addPricing #country_id').val();
        }
        if($('#addPricing #countryCityMode').is(':visible')) {
            dataSave['countryCityMode'] = $('#addPricing #countryCityMode').val();
        }
        if($('#addPricing #cityId').is(':visible')) {
            dataSave['cityId'] = $('#addPricing #cityId').val();
        }

        $.ajax({
           url: baseUrl + "/api/v3",
           dataType: 'json',
           type: "POST",
           data: dataSave,
           success: function(data) {
               if(typeof data.error != 'undefined' && data.error) {
                   $.each(data.errorMessages, function(element, value) {
                       $('<ul/>', {
                            class: 'errors',
                            html: '<li>'+value.message+'</li>'
                        }).insertAfter('#'+value.fieldName);
                   });
               }
               else if(typeof data.errorExistsing != 'undefined' && data.errorExistsing){
                   $('<ul/>', {
                        class: 'errorMain',
                        html: '<li>'+data.errorMessage+'</li>'
                    }).insertBefore('#addPricing');
               }
               else {
                   location.reload();
               }
           }
        });
        /*
        var formData = $("#addPricing").serialize();
        $.apiCall('AddMorePricing', {
            formData:formData,
        },function(data){
            if(data !== true){
                $(data).dialog(
                    {"width":"auto", modal: true, overlay: {opacity: 0.5,background: "black"},
                    buttons: {
                        "Confirm": function() {
                            $(".ui-dialog-content").dialog("destroy");
                            addPricing(formData);
                        },
                        "Cancel": function() {
                            $(this).dialog("close");
                        }
                    }
                })
            }else{
                location.reload();
            }
        });
        */

        return false;
    });
}

function addPricing(formData){
        $.apiCall('AddMorePricing', {
            formData:formData,
            updateFlag:true,
        },function(data){
            location.reload();
        });
}

function handleHomePageBanners() {
    $('.imageNameSelect').removeAttr('multiple');

    $('#defaultbannerform #add_more').click(function() {
        var newElm = $('#0imgBanner-element').clone();
        $(newElm).find('div.error-msg').remove();
        $(newElm).find('input,select').each(function() {
            $(this).val('');
        });
        $(newElm).find('p.description a').attr('href','#');
        $("#add_more-row").before(newElm);
    });

    $("#remove_previous").click(function(e) {
        var elem = $("[id$='imgBanner-element']:last");
        var imageName = $(elem).find('input').val();
        var imageLink = $(elem).find('select').val();
        if(!imageName && !imageLink){
             $("[id$='imgBanner-element']:last").remove();
             return true;
        }

        var indx = $("[id$='imgBanner-element']:last").find('select.imageNameSelect').data('indxorder');
        var paramOrder ='';
        if(typeof indx != 'undefined'){
            paramOrder = indx;
        }
        var dataDelete = {
            banner_id: $(elem).find('input[id=banner_id]').val(),
            paramOrder: paramOrder
        };
        $.ajax( {
           dataType: 'json',
           type: "POST",
           url: baseUrl + "/admin/home-page-banner/delete-default",
           data: dataDelete,
           success: function(deleted) {
               if(deleted){
                   alert('Banner Deleted Successfully')
                   $("[id$='imgBanner-element']:last").remove();
               }else{
                   alert('Some Error Occured');
               }
           }
        });
    });

    $('a.uploadnewImage').click(function() {
        var form_name = $(this).data('form_name');
        var data = {
            method: 'getUploadForm',
            form_name: form_name,
            sourceForm: window.location.href
        };
        $.ajax( {
           url: baseUrl + "/api/v3",
           dataType: 'json',
           type: "POST",
           data: data,
           success: function(formContent) {

               $(formContent).dialog({
                    width: 350,
                    close: function() {
                    }
              });
              $('.ui-dialog input[name="form_name"]').val(form_name) ;

           }
        });
    });
}

function handleAlsoConsider(elementID) {
    if(typeof elementID == 'undefined'){
        $('#recommendations .trainingType').closest('li').hide();
        elementID = '#recommendations .applicableEntity';
    }

    $(elementID).change(function() {
        var currentElementID = $(this).attr('id');
        trainingElementID = currentElementID.replace('applicableEntity', 'trainingType');
        if($(this).val() == 'course') {
            $('#'+trainingElementID).closest('li').show();
        }
        else {
            $('#'+trainingElementID).closest('li').hide();
        }
        $.apiCall('getDataByElement', {
            element:$(this).val()
        }, function(data){
            var html = "<option value='0'>--Element Name--</option>";
            $.each(data, function(elementId, elementName) {
                html += '<option value="'+elementId+'">'+elementName+'</option>'
            });
            currentElementID = currentElementID.replace('applicableEntity', 'applicableEntityId');
            $('#'+currentElementID).html(html);
        });
    });
}

function handleSubscriptionCountryChange(elementID) {
    if(typeof elementID == 'undefined'){
        elementID = '#countryPrice .country';
        elementSubscriptionID = '#countrySubscriptionPrice .country';
    }
    subscriptionCountryChange(elementID);
    subscriptionCountryChange(elementSubscriptionID);
}

function subscriptionCountryChange(elementID) {
    $(elementID).change(function() {
        var currentElementID = $(this).attr('id');
        currencyElementID = currentElementID.replace('country_id', 'currency_id');
        $.apiCall('getCurrencyByCountry', {
            countryId:$(this).val()
        }, function(currency){
            if(currency) {
                $('#'+currencyElementID).val(currency);
            }
        });
    });
}

function handleUtility() {
    $('select#db_name').change(function(){
        $.apiCall('getDBTables', {
            dbName:$(this).val()
        }, function(data){
            var html = "<option value=''>--Select--</option>";
            data =  $.parseJSON(data);
            $.each(data, function(element, value) {
                html += '<option value="'+value+'">'+element+'</option>'
            });
            $('select#table_name').html(html);
        });
    });
}

function deleteConfirmShow(urlToRedirect) {
    var deleteConfirm = confirm("Are you sure, you want to delete?.");
    if(deleteConfirm) {
        location.href = urlToRedirect;
    }
}

function handleSeoElementChange() {
    $('select#linkable_type').change(function(){
        $.apiCall('getSeoElementsByType', {
            elementType:$(this).val()
        }, function(data){
            var html = "<option value='0'>--Select--</option>";
            if(typeof data.status == 'undefined' || data.status != 'error') {
                $.each(data, function(elementId, elementName) {
                    html += '<option value="'+elementId+'">'+elementName+'</option>'
                });
            }
            $('#linkable_id').html(html);
        });
    });
}

function iosCourseChange() {
    $('select#ios_course_id').change(function(){
        $.apiCall('getAccessDaysForCourse', {
            courseId:$(this).val()
        }, function(data){
            var html = "<option value='0'>--Select--</option>";
            if(typeof data != 'undefined' && data.length > 0) {
                for(var i=0;i<data.length;i++) {
                    html += "<option value='"+data[i]['noOfDays']+"'>"+data[i]['noOfDays']+"</option>";
                }
            }
            $('#ios_access_days').html(html);
        });
    });
}

function lecureUrlUpdate() {
    $('a.lectureURLShow').click(function() {
        if($(this).data('lecture-id')) {
            $.ajax( {
                url: baseUrl + "/api/v3/",
                dataType: 'json',
                type: "POST",
                data: {lectureId: $(this).data('lecture-id'), method: 'getLectureSeoForm', isFirstChapter: $(this).data('chapter-first')},
                success: function(formContent) {
                    $(formContent).dialog({
                         width: 700,
                         buttons: {
                            Update: function() {
                                saveLectureSeoData(this);
                            }
                        },
                         close: function() {
                            $('#lectureSeoPopup').remove();
                         }
                   });
                },
                error: function() {
                    alert('some error occured');
                }
             });
        }
    });
}

function saveLectureSeoData(dialogElement) {
    var data = {
        url: $('#lectureSeoUrl').val(),
        title: $('#lectureSeoTitle').val(),
        description: $('#lectureSeoDescription').val(),
        h1Tag: $('#lectureSeoh1').val(),
        lecture_id: $('#lecture_id').val(),
        seo_id: $('#seo_id').val(),
        method: 'saveLectureSeo'
    }
    if($('#lecturePublish').length) {
        data['is_published'] = 0;
        if($('#lecturePublish').is(':checked')) {
            data['is_published'] = 1;
        }
    }

    $.ajax( {
        url: baseUrl + "/api/v3/",
        dataType: 'json',
        type: "POST",
        data: data,
        success: function(responce) {
            if(responce.status == 'success') {
                 $('#lectureSeoPopup').remove();
            }
            else {
                $('#lectureSeoPopup .errors').html(responce.message);
            }
        },
        error: function() {
            alert('some error occured');
        }
     });
}

function frsRelatedSortable() {
    $( "#relatedArticlesSectionMain" ).sortable({
        items: "li.subform"
    });

    $( "#relatedEbookSectionMain" ).sortable({
        items: "li.subform"
    });

    $( "#relatedWebinarSectionMain" ).sortable({
        items: "li.subform"
    });
}


function addNoteFaqCountry() {
    var obj = $(".clusterListAll").parent();
    $('<div/>', {
        class: 'addCountryClusterNote',
        text: "[Use Ctrl to select multiple option]"
        /* We support classroom training only for CSM and CEH courses. Please DO NOT set Classroom as training type for any other course. */
    }).prependTo(obj);
    
     var obj = $(".countryListAll").parent();
    $('<div/>', {
        class: 'addCountryClusterNote',
        text: "[Use Ctrl to select multiple option]"
        /* We support classroom training only for CSM and CEH courses. Please DO NOT set Classroom as training type for any other course. */
    }).prependTo(obj);

    var obj = $(".examPass").parent();
    $('<div/>', {
        class: 'addCountryClusterNote examPassText',
        text: "Character Limit: 700 (including spaces)"
        /* We support classroom training only for CSM and CEH courses. Please DO NOT set Classroom as training type for any other course. */
    }).appendTo(obj);
  }
function addNoteToPricingForm() {
    $('<div/>', {
        class: 'addPricingNote',
        text: "Note: Please set price for online classroom pass for all courses except  CSM and CEH."
        /* We support classroom training only for CSM and CEH courses. Please DO NOT set Classroom as training type for any other course. */
    }).prependTo('form#addPricing');
}
function certificateSection() {
    var certificateSubForm = document.getElementById("certificateFeature");
    if (typeof document.getElementById("fieldset-certificate_group") != 'undefined' && typeof certificateSubForm!='undefined' && certificateSubForm) {
        document.getElementById("fieldset-certificate_group").appendChild(certificateSubForm);
        $('#certificateFeature').before('<p id = "certificatePoints" class="addToolsNote">Certificate Points(Max 3)</p>');
    }
}
// function addNoteToBundle() {
//     $('#partialView-label').append('<p class="addNonMasterNote">If Non Master Program checked : - key Features / Salary Features and Certificate Data are not Mandatory,Else all are Mandatory .</p>');
//     $('#promotional_short_description-label').append('<p class="addNonMasterNote">Short Description should contain coupon_code string for coupon to be added.</p>');
// }
function addNoteToBundleJobAssist() {
    var masterType = $('input[name="master_type"]:checked').val();
    $('#job_assist_for_ind-label').parent('li').attr('id','job_assist_section');
    if (masterType == MASTER_TYPE_CLASSIC) {
        $('#job_assist_for_ind-label').before('<p class="addNonMasterNote">If Job Assist is checked, the key feature will be enabled on the next step. Please order the key feature in country India list accordingly.</p>');
    }
}

function countryClusterNotDisabledOnError(){
    if(!$(".allCountry").is(':checked')){
        $(".clusterListAll").attr("disabled", false);
        $(".countryListAll").attr("disabled", false);

    }
}

function addNoteToBundleSalaryInd() {
    $('#salary-ind-label').append('<p class="addNonMasterNote"> Use "Rs" as currency .</p>');
}

function addNoteToBundleSalaryRow() {
    $('#salary-row-label').append('<p class="addNonMasterNote"> Use "$" as currency.</p>');
}

function saveLectureContent(saveButton) {
    var chapter = '';
    var chapterSave = '';
    var subChapter = '';
    if($('#course_preview_type').val() == 'elearning') {
        chapter = saveButton.data('chapter-id');
        chapterSave = chapter;
        subChapter = saveButton.data('sub-chapter-id');
    }
    else if($('#course_preview_type').val() == 'manual') {
        chapter = saveButton.data('chapter-name');
        chapterSave = saveButton.data('chapter-name-save');
        subChapter = chapter;
    }
    else{
        return false;
    }
    $('#fadeContainer_'+chapter).removeClass('fadeHide');
    var transcript = { };
    $('[name^="topics['+subChapter+']"]').each(function(key, element){
        var topicId = $(element).attr('id').replace('topic_', '');
        transcript[topicId] = $(element).val();
    });

    var dataSave = {
        lectureCourse: $('#lectureCourse option:selected').val(),
        preview_type: $('#course_preview_type').val(),
        introText: $('#intro_'+chapter).val(),
        transcript: transcript,
        chapter: chapterSave,
        chapterUrl: saveButton.data('chapter-url'),
        subChapter: subChapter
    };
    if(typeof saveButton.data('section-name') != 'undefined') {
        dataSave['sectionName'] = saveButton.data('section-name');
    }
    $.ajax( {
        url: baseUrl + "/admin/lecture/save-lecture",
        dataType: 'json',
        type: "POST",
        data: dataSave,
        success: function(responce) {
            $('#fadeContainer_'+chapter).addClass('fadeHide');
            if(responce.status == 'success') {

            }
            else {
                $('#lectureError'+chapter).html(responce.message);
            }
        },
        error: function() {
            $('#fadeContainer_'+chapter).addClass('fadeHide');
            $('#lectureError'+chapter).html('some error occured');
        }
     });
}

function setCourseEditMessage(){
	if(getUrlParams() == 46 && $('form#Bundles').length > 0){
		$('#all-course-msg').show();
		$('.submit-element').hide();
	}
}

function partPaymentUniversityMaster(){
    var masterType = $('input[name="master_type"]').val();
    var IsPartPayment = $('input[name="is_part_payment"]').val();

    var formObj = $("form#Bundles");
    if(typeof formObj != 'undefined' && formObj != null){
        //hide subscription Id hidden field
        $("form#Bundles .s-Id").parent().parent().hide();     

        //on Page load
        if(masterType != null && masterType==MASTER_TYPE_UNIVERSITY && IsPartPayment){
            //University Master
            $('.pp-enabled').each(function(key){
                var pricingLevel = $(this).parent().parent().parent().find('.location').val();
                var countryPrice = $(this).parent().parent().parent().find('.country').val();
                var clusterPrice = $(this).parent().parent().parent().find('.cluster').val();
                if((pricingLevel == 1) || (pricingLevel == 0) || (pricingLevel == 2 && [INDIA_COUNTRY_ID,US_COUNTRY_ID].indexOf(parseInt(countryPrice)) == -1) ){
                    //checkbox show
                    $(this).parent().parent().show();

                    //to add style
                    $(this).parent().parent().addClass('pp-li-check');
                    $(this).parent().parent().parent().find('.part-installments').parent().parent().addClass('pp-li');

                    //if checked show part payment Fields
                    if($(this).is(':checked')){
                        $(this).parent().parent().parent().find('.part-installments').parent().parent().show();
                    }else{
                        $(this).parent().parent().parent().find('.part-installments').parent().parent().hide();
                    }
                }else{
                    $(this).parent().parent().hide();
                    $(this).prop('checked',false);
                    $(this).parent().parent().parent().find('.part-installments').parent().parent().hide();
                }
            });
        }else{
            $('.pp-enabled').each(function(key){
                $(this).parent().parent().hide();
                $(this).prop('checked',false);
                $(this).parent().parent().parent().find('.part-installments').parent().parent().hide();
            });
        }

        //on change Event
        $(document).on('change', "input[name='master_type'],input[name='is_part_payment'],.pp-enabled" ,function(){
            var masterType = $("input[name='master_type']").val();
            var IsPartPayment = $('input[name="is_part_payment"]').val();
            if(masterType==MASTER_TYPE_UNIVERSITY && IsPartPayment){
                $('.pp-enabled').each(function(key){
                    var pricingLevel = $(this).parent().parent().parent().find('.location').val();
                    var countryPrice = $(this).parent().parent().parent().find('.country').val();
                    var clusterPrice = $(this).parent().parent().parent().find('.cluster').val();
                    if( (pricingLevel == 0) || (pricingLevel == 1) || (pricingLevel == 2 && [INDIA_COUNTRY_ID,US_COUNTRY_ID].indexOf(parseInt(countryPrice)) == -1) ){
                        //checkbox show
                        $(this).parent().parent().show();

                        //to add style
                        $(this).parent().parent().addClass('pp-li-check');
                        $(this).parent().parent().parent().find('.part-installments').parent().parent().addClass('pp-li');

                        //if checked show part payment Fields
                        if($(this).is(':checked')){
                            $(this).parent().parent().parent().find('.part-installments').parent().parent().show();
                        }else{
                            $(this).parent().parent().parent().find('.part-installments').parent().parent().hide();
                        }
                    }else{
                        $(this).parent().parent().hide();
                        $(this).prop('checked',false);
                        $(this).parent().parent().parent().find('.part-installments').parent().parent().hide();
                    }
                });
            }else{
                $('.pp-enabled').each(function(key){
                    //checkbox hide
                    $(this).parent().parent().hide();
                    $(this).prop('checked',false);
                    $(this).parent().parent().parent().find('.part-installments').parent().parent().hide();
                });
            }
        });

        $(document).on('change','.country',function(){
            var that = $(this);
            var countryId = parseInt(that.val());
            var masterType = $("input[name='master_type']").val();
            var IsPartPayment = $('input[name="is_part_payment"]').val();
            if(masterType==MASTER_TYPE_UNIVERSITY && IsPartPayment){
                if([INDIA_COUNTRY_ID,US_COUNTRY_ID].indexOf(countryId) > -1){
                    that.parent().parent().parent().find('.pp-enabled,.part-installments').parent().parent().hide();
                }else{
                    that.parent().parent().parent().find('.pp-enabled').parent().parent().show();
                }
            }
        });

        $(document).on('change','.currency',function(){
            var that = $(this);
            var currencyId = parseInt(that.val());
            var masterType = $("input[name='master_type']").val();
            var IsPartPayment = $('input[name="is_part_payment"]').val();
            if(masterType==MASTER_TYPE_UNIVERSITY && IsPartPayment){
                if([1,2].indexOf(currencyId) > -1){
                    that.parent().parent().parent().find('.pp-enabled,.part-installments').parent().parent().hide();
                }else{
                    that.parent().parent().parent().find('.pp-enabled').parent().parent().show();
                }
            }
        });
    }

}

function coursesOrderinfForBundles(){
    
    $('#certificate_header_text-label').parent('li').attr('id','certificate_header_section');
    var formObj = $("form#Bundles");

    if(typeof formObj != 'undefined' && formObj != null){
        $(formObj).width()
        var courseIdStr = $(formObj).find("input[name='course_id']").val();
        if(typeof courseIdStr != 'undefined' && courseIdStr != null){
            createSortableLi(formObj,$(formObj).find("#course_id_tmp"),$(formObj).find("#course_id"),'bundle_courses_sortable');
        }
        var masterType = $("input[name='master_type']:checked").val();
        if(masterType !== null && masterType == MASTER_TYPE_UNIVERSITY){
            $('#banner_image-label label').html("Banner Image"+'<br>'+"(1600 x 357)(jpg)*");
            $('#university_name,#university_name-label').show();
            $('#university,#university-label').show();
            $('#home_page_tumbnail_image,#home_page_tumbnail_image-label').show();
            $('#home_page_tumbnail_image_value-label').show();
            $('#home_page_tumbnail_image_value-label').siblings().show();
            $('#secondary_accreditor_label,#secondary_accreditor_label-label').hide();
            $('#secondary_accreditor_logo,#secondary_accreditor_logo-label').hide();
            // $('#job_assist_for_ind').attr('checked', false);
            $('#program_overview,#program_overview-label').show();
            $('#program_details_intro,#program_details_intro-label').show();
            $('#fieldset-certificate_group').hide();
        }
        else if(masterType !== null && masterType == MASTER_TYPE_COHORT){
            $('#banner_image-label label').html("Banner Image"+'<br>'+"(1600 x 562)(jpg)*");
            $('#university_name,#university_name-label').hide();
            $('#university,#university-label').hide();
            $('#home_page_tumbnail_image,#home_page_tumbnail_image-label').hide();
            $('#home_page_tumbnail_image_value-label').hide();
            $('#home_page_tumbnail_image_value-label').siblings().hide();
            $('#secondary_accreditor_label,#secondary_accreditor_label-label').hide();
            $('#secondary_accreditor_logo,#secondary_accreditor_logo-label').hide();
            $('#fieldset-certificate_group').hide();
            $('#program_overview,#program_overview-label').show();
            $('#program_details_intro,#program_details_intro-label').show();
        }
        else{
            $('#banner_image-label label').html("Banner Image"+'<br>'+"(1600 x 513)(jpg)*");
            $('#certificate_header_section').show();
            $('#certificateFeature').show();
            $('#program_overview,#program_overview-label').hide();
            $('#program_details_intro,#program_details_intro-label').hide();
            $('#university_name,#university_name-label').hide();
            $('#university,#university-label').hide();
            $('#home_page_tumbnail_image,#home_page_tumbnail_image-label').hide();
            $('#home_page_tumbnail_image_value-label').hide();
            $('#home_page_tumbnail_image_value-label').siblings().hide();
            $('#secondary_accreditor_label,#secondary_accreditor_label-label').show();
            $('#secondary_accreditor_logo,#secondary_accreditor_logo-label').show();
            $('#fieldset-certificate_group').show();
        }
        
        $("input[name='master_type']").on('change',function(){
            var masterType = $("input[name='master_type']:checked").val();
            sessionStorage.setItem("bundleType", masterType);

            if(masterType == MASTER_TYPE_UNIVERSITY){
               
                $('#banner_image-label label').html("Banner Image" +'<br>'+ "(1600 x 357)(jpg)*");
                $('#program_overview,#program_overview-label').show();
                $('#program_details_intro,#program_details_intro-label').show();
                $('#add-content').show();
                $('#pricing').show();
                $('#app-section').show();
                // $('#job_assist_section').hide();
                $('#job_assist_section .addNonMasterNote').hide();
                $('#university_name').val('Purdue University');
                $('#university_name,#university_name-label').show();
                $('#university,#university-label').show();
                $('#home_page_tumbnail_image,#home_page_tumbnail_image-label').show();
                $('#home_page_tumbnail_image_value-label').show();
                $('#home_page_tumbnail_image_value-label').siblings().show();
                $('#secondary_accreditor_label,#secondary_accreditor_label-label').hide();
                $('#secondary_accreditor_logo,#secondary_accreditor_logo-label').hide();
               
               
                // $('#job_assist_for_ind').attr('checked', false);
                $('#fieldset-certificate_group').hide();
            }else if(masterType == MASTER_TYPE_COHORT){
                $('#banner_image-label label').html("Banner Image"+'<br>'+"(1600 x 562)(jpg)*");
                $('#add-content').show();
                $('#pricing').show();
                $('#app-section').hide();
                // $('#job_assist_section').hide();
                $('#job_assist_section .addNonMasterNote').hide();
                $('#university_name').val('');
                $('#university_name,#university_name-label').hide();
                $('#university,#university-label').hide();
                $('#home_page_tumbnail_image,#home_page_tumbnail_image-label').hide();
                $('#home_page_tumbnail_image_value-label').hide();
                $('#home_page_tumbnail_image_value-label').siblings().hide();
                $('#secondary_accreditor_label,#secondary_accreditor_label-label').hide();
                $('#secondary_accreditor_logo,#secondary_accreditor_logo-label').hide();
                $('#program_overview,#program_overview-label').show();
                $('#program_details_intro,#program_details_intro-label').show();
                $('#certificate_header_section').hide();
                $('#certificateFeature').hide();
               
                var ulListSecCourse = $(formObj).find("ul.bundle_courses_sortable_or");
                var hiddenEleSecCourse = $(formObj).find("#course_or_id");
                $(ulListSecCourse).html('');
                recalculateCourseIdsStr(ulListSecCourse,hiddenEleSecCourse);
                $('#fieldset-certificate_group').hide();
            } else {
                $('#banner_image-label label').html("Banner Image"+'<br>'+"(1600 x 513)(jpg)*");
                $('#fieldset-certificate_group').show();
                $('#add-content').hide();
                $('#pricing').show();
                $('#app-section').hide();
                $('#job_assist_section').show();
                $('#university_name').val('');
                $('#university_name,#university_name-label').hide();
                $('#university,#university-label').hide();
                $('#home_page_tumbnail_image,#home_page_tumbnail_image-label').hide();
                $('#home_page_tumbnail_image_value-label').hide();
                $('#home_page_tumbnail_image_value-label').siblings().hide();
                $('#secondary_accreditor_label,#secondary_accreditor_label-label').show();
                $('#secondary_accreditor_logo,#secondary_accreditor_logo-label').show();
                $('#program_overview,#program_overview-label').hide();
                $('#program_details_intro,#program_details_intro-label').hide();
                $('#certificate_header_section').show();
                $('#certificateFeature').show();
                
                //var ulListPrimaryCourse = $(formObj).find("ul.bundle_courses_sortable");
                var hiddenEleCourse = $(formObj).find("#course_id");
                var ulListSecCourse = $(formObj).find("ul.bundle_courses_sortable_or");
                var hiddenEleSecCourse = $(formObj).find("#course_or_id");
                //$(ulListPrimaryCourse).html('');
                $(ulListSecCourse).html('');
                //recalculateCourseIdsStr(ulListPrimaryCourse,hiddenEleCourse);
                recalculateCourseIdsStr(ulListSecCourse,hiddenEleSecCourse);
            }
        });
//        $( "#course_id_tmp" ).resizable();
//        $( "#course_or_tmp" ).resizable();
        $(document).on("click", "#course_id_tmp option", function ($event) {
            $event.preventDefault();
            var courseId = $(this).attr("value");
            var hiddenEle = $(formObj).find("#course_id");
            var courseIdStr = $(hiddenEle).val();
            var courseIdsArr = courseIdStr.split(",");
            var hiddenEleAlt = $(formObj).find("#course_or_id");
            var courseIdStrAlt = $(hiddenEleAlt).val();
            var courseIdsArrAlt = courseIdStrAlt.split(",");
            if(courseIdsArr[0] == "")
            	courseIdsArr = [];
            if(courseIdsArrAlt[0] == "")
            	courseIdsArrAlt = [];
            var pathCoursesLenDiff = parseInt(courseIdsArr.length) - parseInt(courseIdsArrAlt.length);
            var masterType = $("input[name='master_type']:checked").val();
            if( (masterType != null && (masterType==MASTER_TYPE_UNIVERSITY || masterType==MASTER_TYPE_COHORT)) || courseIdsArr.length < 7){
            	if(courseIdsArrAlt != undefined)
            		courseIdsArrAlt = filterArr(courseIdsArrAlt, 0);
            	var pathCoursesLen = parseInt(courseIdsArr.length) + parseInt(courseIdsArrAlt.length);
            	if( (masterType != null && (masterType==MASTER_TYPE_UNIVERSITY || masterType==MASTER_TYPE_COHORT)) || pathCoursesLen < 7){
    	            if(courseIdsArr.indexOf(courseId) == -1 && courseIdsArrAlt.indexOf(courseId) == -1){
    	                var ulList = $(formObj).find("ul.bundle_courses_sortable");
    	                var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative;' data-cid='"+courseId+"'>"+$(this).text()+"<span class='rm_bndl_crs' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='"+courseId+"'>X</span></li>");
    	                $(ulList).append(liObj);
    	                recalculateCourseIdsStr(ulList,hiddenEle);
    	                if(pathCoursesLenDiff == 1){
    	                	$("#course_or_tmp").find('option[value="0"]').trigger('click');
    	                }
    	            } else {
    	            	alert('Course already selected');
    	            }
                } else {
                	alert('7 courses already selected.');
                }
            } else {
            	alert('Maximum of 7 steps allowed.');
            }

        });

    }

}

function filterArr(array, what){
	for(var i = 0; i < array.length; i++){
        if(array[i]==what) {
            array.splice(i,1);
            i--; // Prevent skipping an item
        }
    }
	return array;
}

function coursesOrderAlternateOptions(){
    var formObj = $("form#Bundles");

    if(typeof formObj != 'undefined' && formObj != null){
        $(formObj).width()
        var courseIdStr = $(formObj).find("input[name='course_or_id']").val();
        if(typeof courseIdStr != 'undefined' && courseIdStr != null){
        	createSortableLi(formObj,$(formObj).find("#course_or_tmp"),$(formObj).find("#course_or_id"),'bundle_courses_sortable_or');
        	$(formObj).find("#course_or_tmp").closest("li").addClass('alt-courses');
                $(formObj).find("#course_id_tmp").closest("li").addClass('alt-id-courses');
        	$(formObj).find("#course_or_id-label").closest("li").addClass('alt-hidden-courses');
                $(formObj).find("#course_id-label").closest("li").addClass('alt-hidden-courses');
        }


        $("#course_or_tmp").find("option").click(function($event){
        	$event.preventDefault();
            var courseId = $(this).attr("value");
            var hiddenEle = $(formObj).find("#course_id");
            var courseIdStr = $(hiddenEle).val();
            var courseIdsArr = courseIdStr.split(",");
            var hiddenEleAlt = $(formObj).find("#course_or_id");
            var courseIdStrAlt = $(hiddenEleAlt).val();
            var courseIdsArrAlt = courseIdStrAlt.split(",");
            if(courseIdsArr[0] == "")
            	courseIdsArr = [];
            if(courseIdsArrAlt[0] == "")
            	courseIdsArrAlt = [];
            var masterType = $("input[name='master_type']:checked").val();
            if((masterType != null && (masterType==MASTER_TYPE_UNIVERSITY || masterType==MASTER_TYPE_COHORT)) || courseIdsArrAlt.length < 7){
            	if(courseIdsArrAlt != undefined)
            		courseIdsArrAlt = filterArr(courseIdsArrAlt, 0);
	            if( (masterType != null && (masterType==MASTER_TYPE_UNIVERSITY || masterType==MASTER_TYPE_COHORT)) || courseId == 0 || (courseIdsArr.length + courseIdsArrAlt.length < 7)){
	            	if(courseId == 0 || (courseIdsArr.indexOf(courseId) == -1 && courseIdsArrAlt.indexOf(courseId) == -1)){
	                    var ulList = $(formObj).find("ul.bundle_courses_sortable_or hide");
	                    var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative;' data-cid='"+courseId+"'>"+$(this).text()+"<span class='rm_bndl_crs' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='"+courseId+"'>X</span></li>");
	                    $(ulList).append(liObj);
	                    recalculateCourseIdsStr(ulList,hiddenEleAlt);
	                } else {
	                	alert('Course already selected');
	                }
	            } else {
	            	alert('7 courses already selected.');
	            }
            } else {
            	alert('Maximum of 7 steps allowed.');
            }

        });

    }

}

window.addEventListener("load", function() {
    var valdiationLimit = function (items, limit, fieldName) {
        if (Array.isArray(items) && items.length > (limit - 1)) {
            setTimeout(function () {
                alert("Cannot select more than " + limit + " " + fieldName);
            })
            return false;
        }
        return true;
    }
    if ($("form#Bundles").length > 0) {
        var formName = $("form#Bundles").length > 0 ? "Bundles" : null;
        initSortFieldField(formName, "course_advisor_temp", "course_advisor", "Course Advisors", function (items) {
            return valdiationLimit(items, 4, "Course Advisors");
        })
        initSortFieldField(formName, "courseToolsFeature", "courseToolsFeatureSortedList", "Tools")
    }

    if ($("form#University").length > 0) {
        var formName = $("form#University").length > 0 ? "University" : null;       
        parts = window.location.href.split("/"),
        last_part = parts[parts.length-2];       
        if(last_part == "university"){
            console.log(last_part)
            $('#university_logo_colored').hide()
            $('#logo_colored').attr('required', 'true')
            $('#university_logo_bw').hide()
            $('#logo_bw').attr('required', 'true')
        }                 
    }

    if ($("form#MobileApp").length > 0) {
        var formName = $("form#MobileApp").length > 0 ? "MobileApp" : null;
        /**
         * List Widget Content part <sreerag@simplilearn.net>
         */          
        $('#AddNewWidget-label').hide();
        $("#AddNewWidget" ).click(function() {            
            $(".add_new_widget,#dd_widget" ).show();
            $("#AddNewWidget" ).prop('disabled',true);
        });
        $( "#dd_widget" ).change(function() {
            var widgetSelected = $('#dd_widget').val();            
            window.location.href = baseUrl+"/admin/mobile-app/edit?widget_type="+widgetSelected;
        }); 

        initSortItems(formName, "widget_items_temp","widgets_ids", function (items) {          
        });
        initSortBannerItems(formName,'banner_items_temp','widgets_ids',function (items){

        });

        $('#category_id,#product_type').on('change',function(){
            getProductBylabel($('#product_type').val(),$('#category_id').val());                        
        });
        $('#product_type').on('change',function(){
            $('#product_ids').val('');
            $('.product_id_temp_sortable_list').empty();                       
        });
        if($('#product_type').val() != null){     
            getProductBylabel($('#product_type').val(),$('#category_id').val(), function() {
                setTimeout(function() {
                    initSortFieldField(formName, "product_id_temp", "product_ids", "Product Name", function (items) {
                        if ($('#widget_type').val() === 'Banner') {
                            return valdiationLimit(items, 20, "Products");
                        } else {
                            return valdiationLimit(items, 6, "Products");
                        } 
                    });
                }, 50);
            });           
        }
        //end        
       
        if ($("#product_type option:selected").length) {
            if($('#product_type').val()=="deeplink"){
                $('.deeplink-form-contents').show();
                $('.rest-form-contents').hide();
                $('#choose_learning').hide();
                $('#title').prop('required',true);
                $('#deep_link').prop('required',true);
                $('#image_url').prop('required',true);
                $('.rest-form-contents').prop("disabled", true );
                $(".deeplink-form-contents").prop("disabled", false );
                $('#AddMobileApp').show();                    
            }
          }
        //test
            $('#product_type').on('change',function(){
                $('#AddMobileApp').show();
                if($('#product_type').val()=="deeplink"){
                    $('.deeplink-form-contents').show();
                    $('.rest-form-contents').hide();
                    $('#choose_learning').hide();
                    $('#title').prop('required',true);
                    $('#title').attr('maxlength','30');
                    $('#deep_link').prop('required',true);
                    $('#image_url').prop('required',true);
                    $('.rest-form-contents').prop("disabled", true );
                    $(".deeplink-form-contents").prop("disabled", false );                    
                }else if(($('#product_type').val() ==='webinar') || ($('#product_type').val() === 'ebook') || ($('#product_type').val() === 'article')){
                    $('#choose_learning').show();
                    $(".deeplink-form-contents").prop("disabled", true );
                    $(".deeplink-form-contents").hide();
                    $('.rest-form-contents').show(); 
                    $('.rest-form-contents').prop("disabled", false ); 
                    $('#title').prop('required',false);
                    $('#deep_link').prop('required',false);
                    $('#image_url').prop('required',false);               
                    getProductBylabel($('#product_type').val(),$('#category_id').val(),$('#choose_learning').val());
                }else{
                    $(".deeplink-form-contents").prop("disabled", true );
                    $(".deeplink-form-contents").hide();
                    $('.rest-form-contents').show();
                    $('#choose_learning').hide();  
                    $('#title').prop('required',false);
                    $('#deep_link').prop('required',false);
                    $('#image_url').prop('required',false);
                    $('.rest-form-contents').prop("disabled", false );                    
                    getProductBylabel($('#product_type').val(),$('#category_id').val());                    
                }
            });
            $('#choose_learning').on("change",function(){
                getProductBylabel($('#product_type').val(),$('#category_id').val());
            });
            $("form#MobileApp").submit(function(){
                if(($("form#MobileApp #widget_type").val() == 'Banner') 
                 &&($.inArray($("form#MobileApp #product_type").val(), ['course','article','masters','webinar','ebook']) != -1) 
                 && ($("form#MobileApp #product_ids").val() == '')){
                    alert("Choose Product and continue with save");                    
                    return false;
                }   
            });
        //test
        // initSortFieldField(formName, "product_id_temp", "product_ids", "Product Name", function (items) {            
        //     return valdiationLimit(items, 6, "Products");
        // });

        //  $('#product_id_temp').on("click",function(){
        //      var obj= $(this).parent;
        //     alert(Object.values(obj));
        //     //Object.values(obj)
        //  })   

        // $('#btn_add_deeplink_item').on('click',function(){
        //    var dTitle =  $('#title').val();
        //    var deep_link = $('#deep_link').val();
        //    var img_url  = $('#image_url').val();

        // })
        
        initSortFieldField(formName, "category_id_temp", "category_ids", "Category Section", function (items) {
            return valdiationLimit(items, 20, "Category Section");
        });        
    }
    if ($("#EditCourse").length > 0 || $("form#courses").length) {
        var formName = $("#EditCourse").length > 0 ? "EditCourse" : "courses";
        var toolsValidation = function(element) {
            if (element.length > 5) {
                setTimeout(function() {
                    alert("Cannot select more than 6 tools");
                })
                return false;
            }
            return true;
        }
        var oldAccreditorValidation = function(courseIdsArr) {
            if (courseIdsArr.length > 1) {
                setTimeout(function() {
                    alert("Cannot select more than 2 accreditor");
                })
                return false;
            }
            return true;
        }
        var initCourseTemplate = function () {
            var isNewCourse = $("#" + formName + ' [name="is_new_course_page"]:checked').val() == 1 ? true : false;
            var parentDom = $("#" + formName + " #accreditor_id_new").parent().parent();
            var parentOverviewDom = $("#" + formName + " #overview").parent().parent();
            var parentOverviewDomNote = $(".overview-description-note");
            if (!isNewCourse) {
                parentDom.hide();
                parentOverviewDom.hide();
                parentOverviewDomNote.hide();
            } else {
                parentDom.show();
                parentOverviewDom.show();
                parentOverviewDomNote.show();
            }
        }
        try {
            initCourseTemplate();
            $('[name="is_new_course_page"]').change(initCourseTemplate);
            initSortFieldField(formName, "accreditor_id", "accreditor_id_sorted_list", "Accreditor", oldAccreditorValidation)
            initSortFieldField(formName, "accreditor_id_new", "accreditor_id_sorted_list_new", "Accreditor")
            initSortFieldField(formName, "courseToolsFeature", "courseToolsFeatureSortedList", "Tools")
            initSortFieldField(formName, "course_advisor_temp", "course_advisor", "Course Advisors", function (items) {
                return valdiationLimit(items, 4, "Course Advisors");
            })
        } catch(e) {
            console.error("SL:Error initSortFieldField accreditors", e);
        }
    }
    if($("#courseLinkBlock").length > 0 || $("form#courseLinkBlock").length) {
        var formName = $("#courseLinkBlock").length > 0 ? "courseLinkBlock" : "courses";
        var courseValidation = function(courseIdsArr) {
            if (courseIdsArr.length > 4) {
                setTimeout(function() {
                    alert("Cannot select more than 5 courses");
                })
                return false;
            }
            return true;
        }
        var bundleValidation = function(courseIdsArr) {
            if (courseIdsArr.length > 1) {
                setTimeout(function() {
                    alert("Cannot select more than 2 bundles");
                })
                return false;
            }
            return true;
        }
        try {
            initSortFieldField(formName, "contentCourse-new-course_id", "contentCourse-new-course_id_sorted_list", "Related Course", courseValidation)
            initSortFieldField(formName, "contentCourse-new-bundle_id", "contentCourse-new-bundle_id_sorted_list", "Related master program", bundleValidation)
        } catch(e) {
            console.error("SL:Error initSortFieldField accreditors", e);
        }
    }
})

/**
 * Initialize Sortable Field
 * @param {string} formName
 * @param {string} fieldName selection box ( select dom )
 * @param {string} hiddenFieldName hidden field for getting sorted content in csv format ( input type hidden )
 * @param {function} validation function return type boolean ( optional filed )
 * @returns {undefined}
 */
function initSortFieldField(formName, fieldName, hiddenFieldName, displayTitle, validationFunction) {
    try {
        var className = fieldName + "_sortable_list";
        var formId = "#"+formName;
        var hiddenFieldId = "#" + hiddenFieldName;
        var fieldId = "#" + fieldName;
        var formObj = $("form"+formId);
        var hiddenDom = $(formObj).find(hiddenFieldId);
        var fieldDom = $(formObj).find(fieldId);
        

        if (!formObj) {
            console.error("SL:Error invalid form");
            return;
        }
        $(formObj).width()
        createSortableLi(formObj, fieldDom, hiddenDom, className);       
        fieldDom.on('click',"option",function ($event) {
            $event.preventDefault();
            var courseId = $(this).attr("value");        
            var courseIdsArr = hiddenDom.val().split(",");
            if (courseIdsArr[0] == "")
                courseIdsArr = [];               
            if (courseId == 0 || (courseIdsArr.indexOf(courseId) == -1)) {
                if (typeof validationFunction === "function" && !validationFunction(courseIdsArr, $(this), $event)) {
                    return;
                }
                var ulList = $(formObj).find("ul." + className);
                var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative;' data-cid='" + courseId + "'>" + $(this).text() + "<span class='rm_options' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='" + courseId + "'>X</span></li>");
                $(ulList).append(liObj);                
                recalculateCourseIdsStr(ulList, hiddenDom);                
            } else {
                alert(displayTitle + ' already selected');
            }
        });
        
    } catch(e) {
        console.error("SL:Error initSortFieldField failed", e);
    }
}


function initSortItems(formName, fieldName, hiddenFieldName) {
    try {
        var className = fieldName + "_sortable_list";
        var formId = "#"+formName;
        var hiddenFieldId = "#" + hiddenFieldName;
        var fieldId = "#" + fieldName;
        var formObj = $("form"+formId);
        var hiddenDom = $(formObj).find(hiddenFieldId);
        var fieldDom = $(formObj).find(fieldId);
        

        if (!formObj) {
            console.error("SL:Error invalid form");
            return;
        }
        $(formObj).width()
        createSortableItemsLi(formObj, fieldDom, hiddenDom, className);
        console.log("fieldDom",fieldDom);
        fieldDom.on('click',"option",function ($event) {        
            $event.preventDefault();
            var courseId = $(this).attr("value");
            var courseIdsArr = hiddenDom.val().split(",");
            if (courseIdsArr[0] == "")
                courseIdsArr = [];
            if (courseId == 0 || (courseIdsArr.indexOf(courseId) == -1)) {                
                var ulList = $(formObj).find("ul." + className);
                var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative;' data-cid='" + courseId + "'>" + $(this).text() + "<span class='rm_options' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='" + courseId + "'>Y</span><span class='rm_options' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='" + courseId + "'>X</span></li>");
                $(ulList).append(liObj);
                //recalculateCourseIdsStr(ulList, hiddenDom);
            }
        });
    } catch(e) {
        console.error("SL:Error initSortItems failed", e);
    }
}


function initSortBannerItems(formName, fieldName, hiddenFieldName) {
    try {
        var className = fieldName + "_sortable_list";
        var formId = "#"+formName;
        var hiddenFieldId = "#" + hiddenFieldName;
        var fieldId = "#" + fieldName;
        var formObj = $("form"+formId);
        var hiddenDom = $(formObj).find(hiddenFieldId);
        var fieldDom = $(formObj).find(fieldId);
        

        if (!formObj) {
            console.error("SL:Error invalid form");
            return;
        }
        $(formObj).width()
        createSortableBannerItemsLi(formObj, fieldDom, hiddenDom, className);
        console.log("fieldDom",fieldDom);
        fieldDom.on('click',"option",function ($event) {        
            $event.preventDefault();
            var courseId = $(this).attr("value");
            var courseIdsArr = hiddenDom.val().split(",");
            if (courseIdsArr[0] == "")
                courseIdsArr = [];
            if (courseId == 0 || (courseIdsArr.indexOf(courseId) == -1)) {                
                var ulList = $(formObj).find("ul." + className);
                var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative;' data-cid='" + courseId + "'>" + $(this).text() + "<span class='rm_options' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='" + courseId + "'>Y</span><span class='rm_options' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='" + courseId + "'>X</span></li>");
                $(ulList).append(liObj);
                recalculateCourseIdsStr(ulList, hiddenDom);
            }
        });
    } catch(e) {
        console.error("SL:Error initSortItems failed", e);
    }
}

function removeEmptyDomains() {
    var formObj = $("form#Company");
    $.each(formObj.find('.domain'), function (val,domain) {
        var id = $(domain).attr('id');
        var domainIndex = id.search('domain');
        var domainIndexEnd = domainIndex + 6;
        if(id.search('__template__') == -1){
            var numDomain = id.substring(domainIndexEnd);
            if(numDomain > 5 && $(domain).val() == ''){
                $(domain).closest("li").remove();
            }
        }
    })
}
function categoryOrderForCompany(){
    var formObj = $("form#Company");
    if(typeof formObj != 'undefined' && formObj != null){
        $(formObj).width()
        //show selected categories
        var categoryIdStr = $(formObj).find("input[name='category_id']").val();
        if(typeof categoryIdStr != 'undefined' && categoryIdStr != null){
            createSortableLiCat(formObj,$(formObj).find("#category_id_tmp"),$(formObj).find("#category_id"),'company_categories_sortable');
        }

        $("#category_id_tmp").find("option").click(function($event){
            $event.preventDefault();
            var categoryId = $(this).attr("value");
            var hiddenEle = $(formObj).find("#category_id");
            var categoryIdStr = $(hiddenEle).val();
            var categoryIdsArr = categoryIdStr.split(",");

            if(categoryIdsArr[0] == "")
                categoryIdsArr = [];

            if(categoryIdsArr.indexOf(categoryId) == -1){
                if(categoryId > 0){
                    var ulList = $(formObj).find("ul.company_categories_sortable");
                    if(ulList.children('li').length == 0){
                        var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative' data-cid='"+0+"'>Remove All<span class='rm_all_crs' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='0'>X</span></li>");
                        $(ulList).append(liObj);
                    }
                    var categoryName=$(this).text();
                    var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative;' data-cid='"+categoryId+"'>"+$(this).text()+"<span class='rm_bndl_crs' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='"+categoryId+"'>X</span></li>");
                    $(ulList).append(liObj);
                    recalculateCourseIdsStr(ulList,hiddenEle);
                    //getCategoryCourses(formObj,hiddenEle);
                    updateCategoryFilter(categoryId,categoryName);
                }
            } else {
                alert('Category already selected');
            }
        });
    }

    /**
     * On Category Filter Course Selection
     */
    $(document).on('change', '#category_filter', function(e) {
            courseExclusionList=[];
            masterProgramExclusionList=[];
            var categoryId=this.options[e.target.selectedIndex].value;
            var categoryName=this.options[e.target.selectedIndex].text;
            var formObj = $("form#Company");
            var hiddenEle = $(formObj).find("#category_id");
            var mySelect = $('#exclusion_courses');
            var mySelectMP= $('#exclusion_master_program');
            mySelect.children('option:not(:first)').remove();
            mySelectMP.children('option:not(:first)').remove();
            var ulListC = $(formObj).find("ul.company_courses_sortable");
            var hiddenEleC = $(formObj).find("#excluded_course_ids");
            var agency = $("#companyAgencies-new-agencyName").val();
            if(categoryId != ''){
                $.ajax({
                   url: baseUrl + "/api/v3",
                   dataType: 'json',
                   type: "POST",
                   data: {method :'getCoursesBasedOnAgency', categories:categoryId , agencyName : agency},
                   success: function(data) {
                       if(data.status == 200){
                            $.each(data.data, function(key,val) {
                                mySelect.append(
                                    $('<option></option>').val(val.linkable_id).html(val.name)
                                );
                            });
                            $.each(data.bundledata, function(key,val) {
                                mySelectMP.append(
                                    $('<option></option>').val(val.linkable_id).html(val.display_name)
                                );
                            });
                         // recalculateValidCourses('exclusion_courses',ulListC,hiddenEleC);

                       }
                   }
                });
            } else {
                ulListC.children('li:not(:first)').remove();
                hiddenEleC.val('');
            }
    });
    var productFinalList  =[];
    var finalList = {};
    var productList=[];
    $(document).on('change', '.company_product_list', function(e) {
       var productId=$(this).val();
       var id=$(this).attr('id');
       var identifier=id.substr(0, id.indexOf('product_list'));
       var finalProductListIdentifier=$("#"+identifier+"final_product_list");
       var finalCourseIds=$("#"+identifier+"final_course_ids");

       /**
        * Check If All Catgeories Courses Is Already Selected
        */
       if(finalCourseIds.val()=="all-courses" || finalCourseIds.val()=="all-masters"){
           alertText="";
           if(finalCourseIds.val()=="all-courses"){
               alertText="You can\'t select any course as you have already selected 'All Catgories Courses'.Please remove it from final list and then add !";
           }else{
               alertText="You can\'t select any master program as you have already selected 'All Catgories Master'.Please remove it from final list and then add !";
           }
           alert(alertText);
           return false;
       }
       /**
        * Check Pricing Level
        */
       if(parseInt(productId) > 0){
            var selectedCourseIdsArr=[];
            $("option:selected", this).each(function(i, selected) {
                 var selectedVal     = $(selected).val();
                 var selectedText    = $(selected).text();
                 var selectedCourseIdsStr=finalCourseIds.val();
                 selectedCourseIdsArr=selectedCourseIdsStr.split(",")
                 if(selectedCourseIdsArr[0] == "")
                     selectedCourseIdsArr = [];
                  if ($.inArray(selectedVal, selectedCourseIdsArr) !== - 1){
                      alert("Selected Course Already Exist In The List !!!");
                      return false;
                  }else{

                      finalCourseIdsVal=finalCourseIds.val();
                      finalCourseIdsVal+=selectedVal+',';
                      finalCourseIds.val(finalCourseIdsVal);
                      finalProductListIdentifier.append(
                            $('<option></option>').val(selectedVal).html(selectedText)
                       );
                      // console.log(selectedCourseNameAndIdArr);
                       selectedCourseNameAndIdArr[selectedVal]=selectedText;
                      // console.log(JSON.stringify(selectedCourseNameAndIdArr));
                       $("#final-selected-courses").val(JSON.stringify(selectedCourseNameAndIdArr));
                  }
             });
       }else{
        var productCategory=$("#"+identifier+"product_category").val();
        if(productCategory=="allcategories"){
            var selectedProductType=$(".company_product_type").eq(1).val();
            var alertText=""
            if(selectedProductType =="osl" || selectedProductType == "lvc"){
                alertText="Are you sure you want to add 'All Categories Courses' ? Adding 'All Categories Courses' will deselect all selected courses if any from product list.";
            }else{
                alertText="Are you sure you want to add 'All Categories Master' ? Adding 'All Categories Master' will deselect all selected master program if any from product list.";
            }
            if (confirm(alertText)){
            finalProductListIdentifier.children().remove();
            var optionValue=optionText="";
            if($(".company_product_type").eq(1).val()=="mp"){
                  optionText="--All Categories Master--";
                  optionValue="all-masters";
              }else{
                  optionText="--All Categories Courses--";
                  optionValue="all-courses";
              }
            finalProductListIdentifier.append(
                        $('<option></option>').val(optionValue).html(optionText)
                );
            finalCourseIds.val(optionValue);
            selectedCourseNameAndIdArr[optionValue]=optionText;
           // console.log(JSON.stringify(selectedCourseNameAndIdArr));
            $("#final-selected-courses").val(JSON.stringify(selectedCourseNameAndIdArr));
            }else{
                $(".company_product_list")[1].selectedIndex = -1;
            }

        }else{
            var selectorAllProductList=$("#"+id+" > option");
            selectorAllProductList.each(function(){
                if(parseInt(this.value) > 0 ){
                    var selectedVal = this.value;
                    var selectedText = this.text;
                    finalCourseIdsVal = finalCourseIds.val();
                    var alreadySelectedCourseArr = finalCourseIdsVal.split(',');
                    var filteredSelectedCourseArr = alreadySelectedCourseArr.filter(Boolean);
                    if ($.inArray(selectedVal, filteredSelectedCourseArr) == - 1){
                            finalCourseIdsVal += selectedVal + ',';
                            finalCourseIds.val(finalCourseIdsVal);
                           selectedCourseNameAndIdArr[selectedVal]=selectedText;
                       //console.log(JSON.stringify(selectedCourseNameAndIdArr));
                       $("#final-selected-courses").val(JSON.stringify(selectedCourseNameAndIdArr));
                            finalProductListIdentifier.append(
                                $('<option></option>').val(selectedVal).html(selectedText)
                                );
                    }
                }

        });
        }

        }
    });
    $(document).on('change','.accessDaysCount',function(){
        var selectedVal=$(this).val();
        $(".accessDaysCount").val(selectedVal);
    });

    $(document).on('click', '.company_final_product_list', function(e) {
      var id=$(this).attr('id');
      var identifier=id.substr(0, id.indexOf('final_product_list'));
      var finalCourseIdsStr=$("#"+identifier+"final_course_ids").val();
      var finalCourseIdsArr=finalCourseIdsStr.split(',');
      var selectedVal     = $("option:selected", this).val();
      var index = finalCourseIdsArr.indexOf(selectedVal);
      if(index > -1){
            if(selectedVal=="all-courses" || selectedVal=="all-masters"){
                 allCourseCategoriesSelected=false;
                 $(".company_product_list")[1].selectedIndex = -1;
                // console.log("All Catagories Selected : "+ allCourseCategoriesSelected);
             }
           finalCourseIdsArr.splice(index, 1);
           var updatedfinalCourseIdsStr=finalCourseIdsArr.join();
          // console.log(updatedfinalCourseIdsStr);
           $("#"+identifier+"final_course_ids").val(updatedfinalCourseIdsStr);
           $("option:selected", this).remove();
           $(".company_product_list")[1].selectedIndex = -1;
           /**
            * Find the index in the selectedCourseNameAndIdArr and remove and update.
            */
           if(selectedCourseNameAndIdArr[selectedVal]){
               delete selectedCourseNameAndIdArr[selectedVal];
               $("#final-selected-courses").val(JSON.stringify(selectedCourseNameAndIdArr));
           }

      }
    });
    $(document).on('change','#company_price_plans',function(e){
        var selectedPlanId=$(this).val();
        var companyId=$("#company_id").val();
        var existingPricingPlans=$("#company_existing_price_plan").val();
        if(parseInt(selectedPlanId) > 0 && parseInt(existingPricingPlans)!=parseInt(selectedPlanId) && parseInt(companyId) > 0){
            if (confirm("Are you sure to change the pricing plan ? All previous pricing will be deleted if exist.")) {
                $.ajax({
                url: baseUrl + "/api/v3",
                dataType: 'json',
                type: "POST",
                data: {method :'companyPricePlanChange',planId:selectedPlanId,companyId:companyId},
                success: function(data) {
                     alert(data.message);
                }
                });
            }  else{
                $(this).val(existingPricingPlans);
            }
        }
    });
    /**
     * Course Pricing
     */
    $(document).on('click','.cancel_pricing',function(e){
      var companyId=$(this).attr('data-company-id');
      location.href = baseUrl+'/admin/company/course-pricing/id/'+companyId;
    });
    /**
     * Category Pricing
     */
    $(document).on('click','.cancel_category_pricing',function(e){
      var companyId=$(this).attr('data-company-id');
      location.href = baseUrl+'/admin/company/category-pricing/id/'+companyId;
    });
    /**
     * Detail Page
     */
    $(document).on('click','.next_tab',function(e){
      var companyId=$("#company_id").val();
      if(typeof companyId !=="undefined" && companyId.length > 0){
          location.href = baseUrl+'/admin/company/course-pricing/id/'+companyId;
      }else{
          location.href = baseUrl+'/admin/company/course-pricing';
      }

    });

}
/**
 * Update Category Filter
 */
function updateCategoryFilter(key, value){
$('#category_filter')
        .append($("<option></option>")
                .attr("value", key)
                .text(value));
}
function getCategoryCourses(formObj,elem,check){
    var mySelect = $('#exclusion_courses');
    var mySelectMP= $('#exclusion_master_program');
    mySelect.children('option:not(:first)').remove();
    mySelectMP.children('option:not(:first)').remove();
    var categories = elem.val();
    var ulListC = $(formObj).find("ul.company_courses_sortable");
    var hiddenEleC = $(formObj).find("#excluded_course_ids");
    if(categories != ''){
        $.ajax({
           url: baseUrl + "/api/v3",
           dataType: 'json',
           type: "POST",
           data: {method :'getCategoryCourses', categories:categories},
           success: function(data) {
               if(data.status == 200){
                    $.each(data.data, function(val, text) {
                        mySelect.append(
                            $('<option></option>').val(val).html(text)
                        );
                    });
                    $.each(data.bundledata, function(key,val) {
                        mySelectMP.append(
                            $('<option></option>').val(val.bundle_id).html(val.display_name)
                        );
                    });
                    if(check == 1){
                        recalculateValidCourses('exclusion_courses',ulListC,hiddenEleC);
                    }
               }
           }
        });
    } else {
        ulListC.children('li:not(:first)').remove();
        hiddenEleC.val('');
    }
}

function courseOrderForCompany(){
    var formObj = $("form#Company");
    if(typeof formObj != 'undefined' && formObj != null){
        $(formObj).width()

        //show selected courses
        var courseIdStr = $(formObj).find("input[name='excluded_course_ids']").val();
        if(typeof courseIdStr != 'undefined' && courseIdStr != null){
            createSortableLi(formObj,$(formObj).find("#exclusion_courses"),$(formObj).find("#excluded_course_ids"),'company_courses_sortable');
            createSortableLi(formObj,$(formObj).find("#exclusion_master_program"),$(formObj).find("#excluded_masterprogram_ids"),'company_master_program_sortable');
        }
         //Course Exclusion
        $("#exclusion_courses").find("option").live('click',function($event){
            $event.preventDefault();
            var courseId = $(this).attr("value");
            var parentCategoryId=$("#category_filter").val();
            var hiddenEle = $(formObj).find("#excluded_course_ids");
            var courseIdStr = $(hiddenEle).val();
            var courseIdsArr = courseIdStr.split(",");
            if(courseIdsArr[0] == "")
                courseIdsArr = [];

            if(courseIdsArr.indexOf(courseId) == -1){
                var ulList = $(formObj).find("ul.company_courses_sortable");
                if(ulList.children('li').length == 0){
                        var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative' data-cid='"+0+"'>Remove All<span class='rm_all_crs' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='0'>X</span></li>");
                        $(ulList).append(liObj);
                }
                var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative;' data-cid='"+courseId+"'>"+$(this).text()+"<span class='rm_bndl_crs' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='"+courseId+"'>X</span></li>");

                if(courseId > 0){
                    $(ulList).append(liObj);
                    recalculateCourseIdsStr(ulList,hiddenEle);
                    courseExclusionList.push(courseId);
                   // console.log(courseExclusionList,parentCategoryId);
                    courseCategoryExclusionList[parentCategoryId]=courseExclusionList;
                }
                else{
                    //$(ulList).html(liObj);
                    selectAllCoursesStr('exclusion_courses',hiddenEle,ulList);
                    var allCourseIdsStr=$(hiddenEle).val();
                    var allCourseIdsArr = allCourseIdsStr.split(",");
                    courseExclusionList=[];
                    $.each(allCourseIdsArr, function( key, value ) {
                        courseExclusionList.push(value);
                    });
                    courseCategoryExclusionList[parentCategoryId]=courseExclusionList;
                }
            } else {
                alert('Course already selected');
            }
            //console.log("Course :",courseCategoryExclusionList);
        });

        //Master Program Exclusion
        $("#exclusion_master_program").find("option").live('click',function($event){
            $event.preventDefault();
            var courseId = $(this).attr("value");
            var parentCategoryId=$("#category_filter").val();
            var hiddenEle = $(formObj).find("#excluded_masterprogram_ids");
            var courseIdStr = $(hiddenEle).val();
            var courseIdsArr = courseIdStr.split(",");

            if(courseIdsArr[0] == "")
                courseIdsArr = [];

            if(courseIdsArr.indexOf(courseId) == -1){
                var ulList = $(formObj).find("ul.company_master_program_sortable");
                if(ulList.children('li').length == 0){
                        var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative' data-cid='"+0+"'>Remove All<span class='rm_all_crs' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='0'>X</span></li>");
                        $(ulList).append(liObj);
                }
                var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative;' data-cid='"+courseId+"'>"+$(this).text()+"<span class='rm_bndl_crs' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='"+courseId+"'>X</span></li>");

                if(courseId > 0){
                    $(ulList).append(liObj);
                    recalculateCourseIdsStr(ulList,hiddenEle);
                    masterProgramExclusionList.push(courseId);
                    masterProgramCategoryExclusionList[parentCategoryId]=masterProgramExclusionList;
                }
                else{
                    //$(ulList).html(liObj);
                    selectAllCoursesStr('exclusion_master_program',hiddenEle,ulList);
                    var allCourseIdsStr=$(hiddenEle).val();
                    var allCourseIdsArr = allCourseIdsStr.split(",");
                    masterProgramExclusionList=[];
                    $.each(allCourseIdsArr, function( key, value ) {
                        masterProgramExclusionList.push(value);
                    });
                    masterProgramCategoryExclusionList[parentCategoryId]=masterProgramExclusionList;
                }
            } else {
                alert('Master Program already selected');
            }
           // console.log("Master Program :",masterProgramCategoryExclusionList);

        });

    }

}

function createSortableLi(formObj,ele,hiddenEle,listClass){
    var courseIdStr = hiddenEle.val() || [];
    var courseIds = Array.isArray(courseIdStr)?courseIdStr:courseIdStr.split(",");
    var courseIdsLen = courseIds.length;
    var coursesSelect = ele;
    console.log(coursesSelect);    
    var coursesOptions = [];
    if(courseIdsLen > 0){
        var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative' data-cid='"+0+"'>Remove All<span class='rm_all_crs' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='0'>X</span></li>");
        coursesOptions[0] = $(liObj);
    }
    var n = 0;
    for(var i=0;i<courseIdsLen;i++){
        if(courseIds[i] != 0){
            var coursesOptionTmp = $(coursesSelect).find("option[value='"+courseIds[i]+"']");
            var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative' data-cid='"+courseIds[i]+"'>"+$(coursesOptionTmp).text()+"<span class='rm_bndl_crs' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='"+courseIds[i]+"'>X</span></li>");
            n = i + 1;
            coursesOptions[n] = $(liObj);
        }
    }

    var ulList = $("<ul class='"+listClass+"' style='float: right;width: 210px;padding: 10px;'></ul>");
    if(coursesOptions != null && courseIdStr != ''){
        $(ulList).append(coursesOptions);
    }
    $(ulList).insertAfter(ele);
    $( ulList ).sortable({
        items: "li",
        stop: function() {
            recalculateCourseIdsStr(ulList,hiddenEle);
        }
    });

    ele.parent().on( "click", "ul li span", function() {
        var cid = $(this).parent().data("cid");
        $(this).parent().remove();
        if(cid > 0){
            var ulList = $(formObj).find("ul."+listClass);
            recalculateCourseIdsStr(ulList,hiddenEle);
        } else {
            var ulList = $(formObj).find("ul."+listClass);
            $(ulList).html('');
            recalculateCourseIdsStr(ulList,hiddenEle);
        }
    });
}

function createSortableItemsLi(formObj,ele,hiddenEle,listClass){
    var courseIdStr = hiddenEle.val();
    var courseIds = Array.isArray(courseIdStr)?courseIdStr:courseIdStr.split(",");
    var courseIdsLen = courseIds.length;
    var coursesSelect = ele;
    var coursesOptions = [];
    var liObj = '';
    coursesOptions[0] = $(liObj);
    
    var n = 0;
    for(var i=0;i<courseIdsLen;i++){
        if(courseIds[i] != 0){
            var coursesOptionTmp = $(coursesSelect).find("option[value='"+courseIds[i]+"']");
            var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative' data-cid='"+courseIds[i]+"'>"+$(coursesOptionTmp).text()+"<span style='position:absolute;top:5px;right:2px;cursor:pointer;' data-cid='"+courseIds[i]+"'><a class='del_widget' data-cid='"+courseIds[i]+"'>Del</a></span><span style='position:absolute;top:5px;right:50px; data-cid='"+courseIds[i]+"'><a href='"+baseUrl+"/admin/mobile-app/edit?widget_id="+courseIds[i]+"'>Edit</a></span></li>");
            n = i + 1;
            coursesOptions[n] = $(liObj);
        }
    }

    var ulList = $("<ul class='"+listClass+"' style='float: left;width: 610px;padding: 10px;'></ul>");
    if(coursesOptions != null && courseIdStr != ''){
        $(ulList).append(coursesOptions);
    }
    $(ulList).insertAfter(ele);
    $( ulList ).sortable({
        items: "li",
        stop: function() {
            recalculateCourseIdsStr(ulList,hiddenEle);
        }
    });

    ele.parent().on( "click", "li .del_widget", function() {        
        var sId = $(this).parent().data("cid");
        var retVal = confirm("are you sure, you want to delete this widget?");
            if( retVal == true ) {
                deleteWidget(sId);
                $(this).closest( "li" ).remove();        
                if($('.del_widget').length == 0){
                    $('#AddMobileApp').hide();
                    $('#fieldset-widget_group').hide();
                }
            }            
            
    });
}

function createSortableLiCat(formObj,ele,hiddenEle,listClass){
    var courseIdStr = hiddenEle.val();
    var courseIds = courseIdStr.split(",");
    var courseIdsLen = courseIds.length;
    var coursesSelect = ele;
    var coursesOptions = [];
    if(courseIdsLen > 0){
        var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative' data-cid='"+0+"'>Remove All<span class='rm_all_crs' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='0'>X</span></li>");
        coursesOptions[0] = $(liObj);
    }
    var n = 0;
    for(var i=0;i<courseIdsLen;i++){
        var coursesOptionTmp = $(coursesSelect).find("option[value='"+courseIds[i]+"']");
        var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative' data-cid='"+courseIds[i]+"'>"+$(coursesOptionTmp).text()+"<span class='rm_bndl_crs' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='"+courseIds[i]+"'>X</span></li>");
        n = i + 1;
        coursesOptions[n] = $(liObj);
    }

    var ulList = $("<ul class='"+listClass+"' style='float: right;width: 210px;padding: 10px;'></ul>");
    //console.log(courseIdStr);
    if(coursesOptions != null && courseIdStr != ''){
        $(ulList).append(coursesOptions);
    }
    $(ulList).insertAfter(ele);
    $( ulList ).sortable({
        items: "li",
        stop: function() {
            recalculateCourseIdsStr(ulList,hiddenEle);
        }
    });

    ele.parent().on( "click", "ul li span", function() {
        var cid = $(this).parent().data("cid");
        $(this).parent().remove();
        var mySelect = $('#exclusion_courses');
        var mySelectMP= $('#exclusion_master_program');
        mySelect.children('option:not(:first)').remove();
        mySelectMP.children('option:not(:first)').remove();
        if(cid > 0){
            $("#category_filter").find('option[value='+cid+']').remove();
            var ulList = $(formObj).find("ul."+listClass);
            recalculateCourseIdsStr(ulList,hiddenEle);
        try{
            /**
            * Excluded Courses
            */
                var ulListCourse = $(formObj).find("ul."+'company_courses_sortable');
                var hiddenEleCourse=$(formObj).find("#excluded_course_ids");
                var courseIdsByCid=courseCategoryExclusionList[cid];
                if(typeof courseIdsByCid !=="undefined"){
                    $.each(courseIdsByCid,function(key,val){
                    console.log(ulListCourse.find("[data-cid='"+val+"']"));
                    ulListCourse.find("[data-cid='"+val+"']").remove();
                });
                //$(ulListCourse).html('');
                recalculateCourseIdsStr(ulListCourse,hiddenEleCourse);
            }
            /**
            * Exclude Master Program
            */
                var ulListMasterProgram = $(formObj).find("ul."+'company_master_program_sortable');
                var hiddenEleMasterProgram=$(formObj).find("#excluded_masterprogram_ids");
                var masterProgramIdsByCid = masterProgramCategoryExclusionList[cid];
                if(typeof masterProgramIdsByCid !=="undefined"){
                    $.each(masterProgramIdsByCid,function(key,val){
                    console.log(ulListMasterProgram.find("[data-cid='"+val+"']"));
                    ulListMasterProgram.find("[data-cid='"+val+"']").remove();
                });
                //$(ulListMasterProgram).html('');
                recalculateCourseIdsStr(ulListMasterProgram,hiddenEleMasterProgram);
                }


        }
        catch(e){
            console.log(e);
        }

        } else {
            $("#category_filter").children('option:not(:first)').remove();
            var ulList = $(formObj).find("ul."+listClass);
            $(ulList).html('');
            recalculateCourseIdsStr(ulList,hiddenEle);
            /**
             * Excluded Courses
             */
            var ulListCourse = $(formObj).find("ul."+'company_courses_sortable');
            var hiddenEleCourse=$(formObj).find("#excluded_course_ids");
            $(ulListCourse).html('');
            recalculateCourseIdsStr(ulListCourse,hiddenEleCourse);
             /**
             * Exclude Master Program
             */
            var ulListMasterProgram = $(formObj).find("ul."+'company_master_program_sortable');
            var hiddenEleMasterProgram=$(formObj).find("#excluded_masterprogram_ids");
            $(ulListMasterProgram).html('');
            recalculateCourseIdsStr(ulListMasterProgram,hiddenEleMasterProgram);
        }
        //getCategoryCourses(formObj,hiddenEle,1);
    });
}

function createSortableBannerItemsLi(formObj,ele,hiddenEle,listClass){
    var courseIdStr = hiddenEle.val();
    var courseIds = Array.isArray(courseIdStr)?courseIdStr:courseIdStr.split(",");
    var courseIdsLen = courseIds.length;
    var coursesSelect = ele;
    var coursesOptions = [];
    var liObj = '';
    coursesOptions[0] = $(liObj);
    
    var n = 0;
    for(var i=0;i<courseIdsLen;i++){
        if(courseIds[i] != 0){
            var coursesOptionTmp = $(coursesSelect).find("option[value='"+courseIds[i]+"']");
            var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative'  data-cid='"+courseIds[i]+"'>"+$(coursesOptionTmp).text()+"<span style='position:absolute;top:5px;right:2px;cursor:pointer;' data-cid='"+courseIds[i]+"'><a class='del_banner_content' data-cid='"+courseIds[i]+"'>Delete</a></span><a data-lid = '"+[i]+"' data-cid='"+courseIds[i]+"'  data-toggle='tooltip' data-placement='bottom' data-original-title='upload image'><input class='file_upload'  id='image_upload_"+[i]+"' type='file'><label for='upload-file'><i class='fa fa-picture-o'></i></label></a></li>");
            n = i + 1;
            coursesOptions[n] = $(liObj);
        }
    }

    var ulList = $("<ul class='"+listClass+"' style='float: left;width: 810px;padding: 10px;'></ul>");
    if(coursesOptions != null && courseIdStr != ''){
        $(ulList).append(coursesOptions);
    }
    $(ulList).insertAfter(ele);
    $( ulList ).sortable({
        items: "li",
        stop: function() {
            recalculateCourseIdsStr(ulList,hiddenEle);
        }
    });
    
    ele.parent().on("change",".file_upload",function(){        
        var sId = $(this).parent().data("cid"); 
        var lid = $(this).parent().data("lid");        
        var file_data = $('#image_upload_'+lid).prop('files')[0];
        var form_data = new FormData();
        form_data.append('file', file_data);
        form_data.append('content_id',sId);
        var regex = /^[A-Za-z0-9 .]+$/         
        var isValid = regex.test(file_data['name']);                
        var fileType = file_data["type"];
        var validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
        if ($.inArray(fileType, validImageTypes) < 0) {
            alert("Invalid image type");
        }else if(file_data.size > 100000){
            alert("Invalid image size");
        }else if(!isValid){
            alert("special characters are not allowed in image name");
        }else{
            $(this).parent().html('<img src="http://cfs22.simplicdn.net/ice9/ajax-loader.gif" height="15px"/>');
            $.ajax({                       
                url: baseUrl + "/admin/mobile-app/upload-image-contents", 
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,                         
                type: 'post',
                success: function(){
                    location.reload();                    
                }
             });
        }        
    });
    ele.parent().on( "click", "li .del_banner_content", function() {        
        var sId = $(this).parent().data("cid");              
        var retVal = confirm("are you sure, you want to delete this content?");
            if( retVal == true ) {
                $(this).closest( "li" ).remove();  
                deleteBanner(sId);        
            }            
            
    });
}



function recalculateCourseIdsStr(ulList,hiddenEle){
    var liItems = $(ulList).find("li");
    var cIdsArr = [];
    var cNameArr = [];  
    var n = 0;
    for(var i=0;i<liItems.length;i++){
        var cid = $(liItems[i]).data("cid");
        if(cid > 0){
            cIdsArr[n] = cid;
            cNameArr[n] = _courseMap[cid];
            n++;
        }
    }
    if(cIdsArr.length == 0){
    	$(ulList).parent().find('select').val('');
    }
    $('#product_name').val(cNameArr);
    $(hiddenEle).val(cIdsArr);
    $(hiddenEle).attr("value", cIdsArr);
    console.log($(hiddenEle).val());
    console.log($('#product_name').val());
}

function recalculateValidCourses(elem,ulList,hiddenEle){
    var liItems = $(ulList).find("li");
    var cIdsArr = [];
    var n = 0;
    ulList.find('li').each(function(){
        var curLi = $(this);
        var cid = curLi.data("cid");
        if($("#"+elem+" option[value='"+cid+"']").length > 0 && cid > 0){
            cIdsArr[n] = cid;
            n++;
        } else {
            if(cid > 0)
            curLi.remove();
        }
    });
    if(cIdsArr.length == 0){
        $(ulList).parent().find('select').val('');
    }
    $(hiddenEle).val(cIdsArr);
}

function selectAllCoursesStr(ulList,hiddenEle,ulListC){
    var cIdsArr = [];
    var n = 0;
    var existingCourseIdsStr=$(hiddenEle).val();
    var existingCourseIdsArr=[];
    if(existingCourseIdsStr){
        existingCourseIdsArr=existingCourseIdsStr.split(",");
    }
   // ulListC.children('li:not(:first)').remove(); //note
    $("#"+ulList+" option").each(function()
    {
        var value = $(this).val();
        if(value > 0){
            cIdsArr[n] = value;
            if(existingCourseIdsArr.indexOf(value) == -1){
                var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative;' data-cid='"+value+"'>"+$(this).text()+"<span class='rm_bndl_crs' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='"+value+"'>X</span></li>");
                $(ulListC).append(liObj);
            }
            n++;
        }
        // Add $(this).val() to your list
    });
    if(cIdsArr.length == 0){
        $(ulList).parent().find('select').val('');
    }
    $(hiddenEle).val(cIdsArr);
}
function getBundleElective() {
    var formObj = $("form#Bundles");
    if (typeof formObj != 'undefined' && formObj != '') {

        var courseIdStr = $(formObj).find("input[name='bundle_electives']").val();
        if (typeof courseIdStr != 'undefined' && courseIdStr != null) {
            createSortableBundleElectivesLi(formObj, $(formObj).find("#bundle_electives_temp"), $(formObj).find("#bundle_electives"));
        }

        $(document).on("click", "#bundle_electives_temp option", function ($event) {
            $event.preventDefault();
            var courseId = $(this).attr("value");
            var hiddenEle = $(formObj).find("#bundle_electives");
            var courseIdStr = $(hiddenEle).val();
            var courseIdsArr = courseIdStr.split(",");
            if (courseIdsArr.indexOf(courseId) == -1 && courseIdsArr.length<15) {
                var ulList = $(formObj).find("ul.bundle_electives_sortable");
                var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative;' data-cid='" + courseId + "'>" + $(this).text() + "<span class='rm_bndl_electives' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='" + courseId + "'>X</span></li>");
                $(ulList).append(liObj);
                recalculateCourseIdsStr(ulList, hiddenEle);
            }else if(courseIdsArr.length>=15){
                alert("Cannot select more than 15 electives");
            }

        });
    }
}

function createSortableBundleElectivesLi(formObj, ele, hiddenEle) {
    var courseIdStr = $(formObj).find("input[name='bundle_electives']").val();
    var courseIds = courseIdStr.split(",");
    var courseIdsLen = courseIds.length;
    var coursesSelect = $(formObj).find("select#bundle_electives_temp");
    var coursesOptions = [];
    for (var i = 0; i < courseIdsLen; i++) {
        var coursesOptionTmp = $(coursesSelect).find("option[value='" + courseIds[i] + "']");
        var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative' data-cid='" + courseIds[i] + "'>" + $(coursesOptionTmp).text() + "<span class='rm_bndl_electives' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='" + courseIds[i] + "'>X</span></li>");
        coursesOptions[i] = $(liObj);
    }
    var ulList = $("<ul class='bundle_electives_sortable' style='float: right;width: 275px;padding: 10px;'></ul>");
    if (coursesOptions != null && courseIdStr != '') {
        $(ulList).append(coursesOptions);
    }
    $(ulList).insertAfter(ele);
    $(ulList).sortable({
        items: "li",
        stop: function() {
            recalculateCourseIdsStr(ulList, hiddenEle);
        }
    });

    $(formObj).find("#bundle_electives_temp").parent().on("click", "ul li span", function() {
        $(this).parent().remove();
        var ulList = $(formObj).find("ul.bundle_electives_sortable");
        var hiddenEle = $(formObj).find("#bundle_electives");
        recalculateCourseIdsStr(ulList, hiddenEle);
    });
}

function checkCourseCouponDisplay() {
    $('#CouponCourse #displayFrontend').click(function(){
        if($('#displayFrontend').is(':checked')){
            var dataSave = {
                country_id:$('select#country_id').val(),
                course_id:$('select#course_id').val(),
                label_id:$('select#label_id').val(),
                cluster_id:$('select#cluster_id').val(),
                coupon_code:$('#code').val(),
                method: 'checkCouponDisplay'
            };

            $.ajax({
               url: baseUrl + "/api/v3",
               dataType: 'json',
               type: "POST",
               data: dataSave,
               success: function(data) {
                   var html = "Only 2 Marketing coupons can be shown on the  frontend for a category and country combination. Coupon";
                    if(typeof data != 'undefined' && data.length > 0) {
                        $('#displayFrontend').attr('checked', false)
                        for(var i=0;i<data.length;i++) {
                            html += data[i]+",";
                        }
                        html += ' have one of the selected categories and country combinations as in this coupon and are also selected to be  displayed on frontend';
                        if($('#f_c_error')){
                            $('#f_c_error').remove();
                        }
                        $('#displayFrontend-element').append('<div style="color:red" id ="f_c_error" >' + html + '</div>');
                    }
               }
            });
        }
    });
}

function checkSubscriptionCouponDisplay() {
    $('#CouponSubscription #displayFrontend').click(function(){
        if($('#displayFrontend').is(':checked')){
            var dataSave = {
                country_id:$('select#country_id').val(),
                course_id:$('select#course_id').val(),
                label_id:$('select#label_id').val(),
                cluster_id:$('select#cluster_id').val(),
                coupon_code:$('#code').val(),
                method: 'checkCouponDisplay'
            };

            $.ajax({
               url: baseUrl + "/api/v3",
               dataType: 'json',
               type: "POST",
               data: dataSave,
               success: function(data) {
                   var html = "Only 2 Marketing coupons can be shown on the  frontend for a category and country combination. Coupon";
                    if(typeof data != 'undefined' && data.length > 0) {
                        $('#displayFrontend').attr('checked', false)
                        for(var i=0;i<data.length;i++) {
                            html += data[i]+",";
                        }
                        html += ' have one of the selected categories and country combinations as in this coupon and are also selected to be  displayed on frontend';
                        if($('#f_c_error_sub')){
                            $('#f_c_error_sub').remove();
                        }
                        $('#displayFrontend-element').append('<div style="color:red"  id ="f_c_error_sub">' + html + '</div>');
                    }
               }
            });
        }
    });
}

$('#CouponCourse #displayFrontend-label').hide();
$(document).ready(function() {
    var isMarketing = $('input[name=purpose]:checked', '#CouponCourse').val();
    if(!isMarketing) {
        isMarketing = $('input[name=purpose]').val();
    }
    if (isMarketing == 'marketing') {
        $('#CouponCourse #displayFrontend-element').show();
        $('#CouponCourse #displayFrontend-label').show();
    } else {
        $('#CouponCourse #displayFrontend-element').hide();
        $('#CouponCourse #displayFrontend-label').hide();
    }
    $('a.purge').click(function (e) {
        e.preventDefault();
        var currentDom = e.currentTarget;
        if($(currentDom).hasClass("disabled")) {
            return;
        }
        let buttonText = currentDom.innerText;
        // currentDom.innerText="Url got purged";
        currentDom.classList.add("disabled");
        $var = $.get($(currentDom).attr("data-action"), function (data) {
            
        }).done(function() {
            currentDom.innerText="Url got purged";
          }).fail(function() {
            currentDom.innerText="Purge action failed,try again";
          })

        setTimeout(function () {
            currentDom.innerText = buttonText;
            currentDom.classList.remove("disabled");
        }, 10000);
    });
})

function hideShowCouponCourseFrontendDisplay() {
    $('#CouponCourse #displayFrontend').closest('li').show();
    $('#CouponCourse #purpose-element').change(function(){
        var isMarketing = $('input[name=purpose]:checked', '#CouponCourse').val();
        if(isMarketing == 'marketing'){
            $('#CouponCourse #displayFrontend-element').show();
            $('#CouponCourse #displayFrontend-label').show();
        }
        else{
            $('#CouponCourse #displayFrontend-element').hide();
            $('#CouponCourse #displayFrontend-label').hide();
        }

    });
}
function hideShowMoneyBackGuaranteeText(){
    var moneyback = $("input[name='money_back_guarantee']:checked").val();
    if(moneyback != null && moneyback){
        $('#money_back_guarantee_text,#money_back_guarantee_text-label').show();
    }else{
        $('#money_back_guarantee_text,#money_back_guarantee_text-label').hide();
        // $('#money_back_guarantee_text').val('');
    }

    $("input[name='money_back_guarantee']").on('change',function(){
        var moneyback = $("input[name='money_back_guarantee']:checked").val();
        if(moneyback != null && moneyback){
            $('#money_back_guarantee_text,#money_back_guarantee_text-label').show();
        }else{
            $('#money_back_guarantee_text,#money_back_guarantee_text-label').hide();
            // $('#money_back_guarantee_text').val('');
        }
    })
}

function hideShowCouponSubFrontendDisplay() {
    $('#CouponSubscription #displayFrontend').closest('li').show();
    $('#CouponSubscription #purpose-element').change(function(){
        var isMarketing = $('input[name=purpose]:checked', '#CouponSubscription').val();
        if(isMarketing == 'marketing'){
            $('#CouponSubscription #displayFrontend-element').show();
            $('#CouponSubscription #displayFrontend-label').show();
        }
        else{
            $('#CouponSubscription #displayFrontend-element').hide();
            $('#CouponSubscription #displayFrontend-label').hide();
        }

    });
}

function displaySeoProductType() {
    var url = document.URL;
    checkString = "edit";
    var urlType = $('#Seo #url_type').val();
    if(!url.includes(checkString)){
        if(urlType == 'City Page'){
            $('#Seo .seo_linkable_type_id').removeAttr('disabled');
            $('#Seo .seo_linkable_id').removeAttr('disabled');
            $('#Seo .seo_country_id').removeAttr('disabled');
            $('#Seo .seo_city_id').removeAttr('disabled');
            $('#Seo #about_city').removeAttr('disabled');
            $('#Seo #city_address').removeAttr('disabled');
            $('.fck-enableDesc').each(function(){
                //if ($(this).is(':visible')){
                    CKEDITOR.replace($(this).attr('id'));            
                //}
        
            });
        }
    }else{
        $('#Seo #url_type').click(function(){
            var urlType = $('#Seo #url_type').val();
            showH2tags(urlType);
        });
        if(urlType == 'City Page'){
            $('#Seo #about_city').show();
            $('#Seo #about_city-label').show();
            $('#Seo #about_city-label').parent().show();

            $('#Seo #city_address').show();
            $('#Seo #city_address-label').show();

            $('#Seo #about_city').removeAttr('disabled');
            $('#Seo #city_address').removeAttr('disabled');

            $('#Seo .seo_linkable_type_id').removeAttr('disabled');
            $('#Seo .seo_linkable_id').removeAttr('disabled');
            $('#Seo .seo_country_id').removeAttr('disabled');
            $('#Seo .seo_city_id').removeAttr('disabled');
            $('#Seo #about_city').removeAttr('disabled');
            $('#Seo #city_address').removeAttr('disabled');
            $('.fck-enableDesc').each(function(){
                //if ($(this).is(':visible')){
                    CKEDITOR.replace($(this).attr('id'));            
                //}
        
            });
        }else{
            $('#Seo .seo_linkable_type_id').hide();
            $('#Seo .seo_linkable_type_id').parent().parent().hide();
            $('#Seo #linkable_type_id-label').hide();

            $('#Seo .seo_linkable_id').hide();
            $('#Seo .seo_linkable_id').parent().parent().hide();
            $('#Seo #linkable_id-label').hide();

            $('#Seo .seo_country_id').hide();
            $('#Seo .seo_country_id').parent().parent().hide();
            $('#Seo #seo_country_id-label').hide();

            $('#Seo .seo_city_id').hide();
            $('#Seo .seo_city_id').parent().parent().hide();
            $('#Seo #seo_city_id-label').hide();

            $('#Seo #about_city').hide();
            $('#Seo #about_city-label').hide();
            $('#Seo #about_city-label').parent().hide();

            $('#Seo #city_address').hide();
            $('#Seo #city_address-label').hide();
        }
    }

    $('#Seo #url_type').change(function(){
        showH2tags($(this).val());
        var urlType = $('#Seo #url_type').val();
        if(urlType == 'City Page'){
            $('#Seo .seo_linkable_type_id').removeAttr('disabled');
            $('#Seo .seo_linkable_id').removeAttr('disabled');
            $('#Seo .seo_country_id').removeAttr('disabled');
            $('#Seo .seo_city_id').removeAttr('disabled');
            $('#Seo #about_city').removeAttr('disabled');
            $('#Seo #city_address').removeAttr('disabled');

            $('#Seo .seo_linkable_type_id').show();
            $('#Seo .seo_linkable_type_id').parent().parent().show();
            $('#Seo #linkable_type_id-label').show();

            $('#Seo .seo_linkable_id').show();
            $('#Seo .seo_linkable_id').parent().parent().show();
            $('#Seo #linkable_id-label').show();

            $('#Seo .seo_country_id').show();
            $('#Seo .seo_country_id').parent().parent().show();
            $('#Seo #seo_country_id-label').show();

            $('#Seo .seo_city_id').show();
            $('#Seo .seo_city_id').parent().parent().show();
            $('#Seo #seo_city_id-label').show();

            $('#Seo #about_city').show();
            $('#Seo #about_city-label').show();
            $('#Seo #about_city-label').parent().show();

            $('#Seo #city_address').show();
            $('#Seo #city_address-label').show();
            $('.fck-enableDesc').each(function(){
                //if ($(this).is(':visible')){
                    CKEDITOR.replace($(this).attr('id'));            
                //}
        
            });
        }else{
            if(typeof CKEDITOR.instances['about_city'] != "undefined" && CKEDITOR.instances['about_city']){
                CKEDITOR.instances['about_city'].destroy();
            }

            $('#linkable_type_id').val('');
            $('#linkable_id').val('');
            $('#seo_country_id').val('');
            $('#seo_city_id').val('');
            $('#about_city').val('');
            $('#city_address').val('');

            $('#Seo .seo_linkable_type_id').attr('disabled','disabled');
            $('#Seo .seo_linkable_id').attr('disabled','disabled');
            $('#Seo .seo_country_id').attr('disabled','disabled');
            $('#Seo #about_city').attr('disabled','disabled');
            $('#Seo #city_address').attr('disabled','disabled');

            $('#Seo .seo_linkable_type_id').hide();
            $('#Seo .seo_linkable_type_id').parent().parent().hide();
            $('#Seo #linkable_type_id-label').hide();

            $('#Seo .seo_linkable_id').hide();
            $('#Seo .seo_linkable_id').parent().parent().hide();
            $('#Seo #linkable_id-label').hide();

            $('#Seo .seo_country_id').hide();
            $('#Seo .seo_country_id').parent().parent().hide();
            $('#Seo #seo_country_id-label').hide();

            $('#Seo .seo_city_id').hide();
            $('#Seo .seo_city_id').parent().parent().hide();
            $('#Seo #seo_city_id-label').hide();

            $('#Seo #about_city').hide();
            $('#Seo #about_city-label').hide();
            $('#Seo #about_city-label').parent().hide();

            $('#Seo #city_address').hide();
            $('#Seo #city_address-label').hide();
        }
    });
}


function fetchSeoProductList() {
    $('#Seo #linkable_type_id').change(function(){
        var productTypeId = $('#linkable_type_id').val();
        showH2tags($('#url_type').val());
        $.apiCall('fetchProductDetails', {
            product_id : productTypeId
        }, function(data){
            var html = "<option value='0'>--Select--</option>";
            $.each(data.data, function(element, value) {
                if(value)
                    html += '<option value="'+element+'">'+value+'</option>'
            });
             $('#Seo .seo_linkable_id').show();
             $('#Seo .seo_linkable_id').parent().parent().show();
             $('#Seo #linkable_id-label').show();
             $('.seo_linkable_id').html(html);
        });
    });
}


function fetchSeoCityList() {
    $('#Seo #seo_country_id').change(function(){
        $.apiCall('getCityList', {
            countryId : $('select#seo_country_id').val()
        }, function(data){
            var html = "<option value='0'>--Select--</option>";
            $.each(data, function(element, value) {
                if(value)
                    html += '<option value="'+element+'">'+value+'</option>'
            });
             $('#Seo .seo_city_id').show();
             $('#Seo .seo_city_id').parent().parent().show();
             $('#Seo #seo_city_id-label').show();
             $('.seo_city_id').html(html);
        });
    });
}


function fetchSeoCityDescription() {
    $('#Seo #seo_city_id').click(function(){
        $.apiCall('getCityDetailsById', {
            city_id : $('select#seo_city_id').val()
        }, function(data){
            console.log(data.data.about_city);
            $('#Seo #about_city').show();
            $('#Seo #about_city-label').show();
            $('#Seo #about_city-label').parent().show();
            $('#about_city').val(data.data.about_city);

        });
    });
}
function moveTrainingTypes(){
   $('#fieldset-others_group legend').after($(".training-types-subform-courses"));
} 
function addNoteToProjectsSection() {
    $('#projectsDescription-label').before('<p class="addToolsNote"><strong>Projects(Optional)</strong></p>');
    $('#bundleProjectsDescription-label').before('<p class="addToolsNote"><strong>Projects</strong></p>');
}
function addNoteToProjectsDetails() {
    $('#projects').before('<p class="addToolsNote"><strong>Projects Details</strong></p>');
}
function addNoteToSkillsCovered() {
    $('#skills').before('<p class="addToolsNote"><strong>Skills Covered</strong></p>');
}
function addNoteToBundlePricing() {
    $('#accessDays').before('<p class="addToolsNote"><strong>Access Days</strong></p>');
    $('#countryPrice').before('<p class="addToolsNote"><strong>Pricing</strong></p>');
}
function addNoteToEnterpriseTab() {
    $('#CoursesEnterprise').before('<p class="addToolsNote enterprice"><strong>Enterprise Content</strong></p>');
}
function addNoteToToolCoverage() {
    //$('#courseToolsFeature').before('<p class="addToolsNote"><strong>TOOLS COVERAGE (Max 6 Allowed) [ Use Ctrl Key For Multiple Tool Selection ] </strong></p>');
}

function addNoteToIntroVideo() {
    $('#videoLink-label').before('<p class="addIntroVideoNote"><strong>Videos</strong></p>');
}

function addNoteToCoursePreview() {
    $('#previewFromElearning-label').hide();
    $("#previewFromElearning").hide();
}

function addTrainingTypeNote(){
    $('#isOsl-label').before('<p class="trainingTypesOptions"><strong>Training Types</strong></p>');
}

function addApplicationProcessLabelSection() {
    $('#fieldset-app_process_group').prepend('<legend class="addToolsNote">Admission</legend>');
}

$(function () {
    Payment.init();
    PaymentList.init();
});


var Payment = {
//    fileToUpload : '',
    selectedProductId:null,
    courseArr : [],
    init: function () {
        Payment.hasError = false;
        Payment.deleteProduct();
        Payment.addProduct();
        Payment.backendPayment();
        Payment.additionalLearners();
        Payment.listCity();
        Payment.selectCity();
        Payment.listProduct();
//        Payment.selectProduct();
        Payment.selectTrainingType();
        Payment.fetchPrice();
        Payment.calculateDiscount();
        Payment.showBackendPaymentField();
        Payment.selectedProductObj = {};
        Payment.courseAccessTypeChange();
        Payment.fetchClassroomPrice();
        Payment.hideLearners();
        Payment.resellerRegularSelect();
        Payment.getEmailFinsaleIdsAndData();
        Payment.calculateAdvanceAmount();
        Payment.approvalCount=0;
        Payment.popupApproval=1;
        Payment.type_extension=0;
        Payment.tax_sync_load = 1;
        Payment.is_disable_momextention = 0;
        Payment.popUpAccessDaysAlert=1;
        Payment.eligiblePartPaymentAmount = 0;
        Payment.validateContactNo();
//        Payment.uploadFile();
    },
    deleteProduct: function () {
        $('#selected-products').on('click', 'a.delete-product-row', function () {
            if (confirm("Are you sure to remove the product?")) {
                if ($(this).parent('.product-row').children('#approvalRequest').val() == 1) {
                    Payment.approvalCount -= 1;
                }
                $(this).parent('.product-row').remove();

                var key = selectedProducts.indexOf($(this).data('product-type-id') + "-" + $(this).data('product-id'));
                selectedProducts.splice(key, 1);
                var sp = parseFloat($('#sellingPriceSelect').val());
                if (isNaN(sp)) {
                    Payment.resetForm();
                }
            }
            Payment.calculateTotalSP();
            console.log("deleting : ", $(this).data('product-type-id') + "-" + $(this).data('product-id'));
            delete(Payment.selectedProductObj[$(this).data('product-type-id') + "-" + $(this).data('product-id')]);
            console.log(Payment.selectedProductObj);
            return false;
        });
    },
    addProduct: function () {
        $('#product-row-main').on('click', 'a.add-product-row', function () {
            $('input#sellingPriceSelect').prop("readonly", true);
            $('input#discountSelect').prop("readonly", true);
            if(($('#mrpSelect').val()==0)||($('#mrpSelect').val()=='')){
                alert("Please select all fields");
                return false;
            }
            Payment.validateDiscount();
            if (Payment.popupApproval == 0){
                Payment.popupApproval=1;
            }

            return false;
        });
    },
    showLoader: function(){
        $('.loading-overlay').show();
    },
    hideLoader: function(){
        $('.loading-overlay').hide();
    },
    hideLearners: function () {
        $('#payment_sub_type').on('change',function () {
            Payment.resetAll(false);
            Payment.resetRegularSelect();
            Payment.type_extension=0;
            $('#reseller_account_name').children().remove().end();
            $('.add-product-row').removeClass('hidden');
            $('.delete-product-row').removeClass('hidden');
            var paymentSubType = parseInt($('option:selected', '#payment_sub_type').val());
             if(allowAtpPaymentType.length >=1 && allowAtpPaymentType.indexOf(paymentSubType) != '-1')
             { 
                    $('#hasLearners').hide();
                    if(paymentSubType == resellerRegularPaymentType){
                        $('#country').prop('disabled',true);
                        $.ajax({
                               url: baseUrl + "/api/v3?method=fetchAllReseller",
                               dataType: 'json',
                               type: "get",
                               data: {},
                               success: function(data) {
                                   if(data){ 
                                            $('#reseller_account_name').append($('<option></option>').val(0).html("---SELECT---"));
                                            $.each(data, function(val, text) {
                                                   $('#reseller_account_name').append(
                                                   $('<option></option>').val(val).html(text));
                                            }); 
                                    }
                               }
                           });
                           $('.reseller-regular').removeClass('hidden');
                           $('.course-upgrade').addClass('hidden');
                     }
                     else{
                         $('#country').prop('disabled',false);
                         $('.reseller-regular').addClass('hidden');
                         $('.course-upgrade').addClass('hidden');
                     }
             }else if (paymentSubType == upgradationPaymentType || paymentSubType == extensionPaymentType || paymentSubType == partialSubsequentPaymentType) {
                if (paymentSubType == partialSubsequentPaymentType) {
                    $('#reconsile_id_label').html('Order Id');
                } else {
                    $('#reconsile_id_label').html('Reconcile Id');
                }
                $('#country').prop('disabled', true);
                $('#hasLearners').hide();
                $('#email').val('').prop('readonly', false);
                $('.reseller-regular').addClass('hidden');
                $('.course-upgrade').removeClass('hidden');
                if (paymentSubType == extensionPaymentType || paymentSubType == partialSubsequentPaymentType) {
                    $('.add-product-row').addClass('hidden');
                    $('.delete-product-row').addClass('hidden');
                }
            } else {
                if (paymentSubType == partialFirstPaymentType) {
                    $('#hasLearnerLabel').addClass('disable_has_learner_label');
                    $('#hasLearner').prop('disabled', true);
                    $('.disable_add_learner').removeClass('hidden');
                } else {
                    $('#hasLearnerLabel').removeClass('disable_has_learner_label');
                    $('#hasLearner').prop('disabled', false);
                    $('.disable_add_learner').addClass('hidden');
                }
                $('#country').prop('disabled',false);
                $('.reseller-regular').addClass('hidden');
                $('.course-upgrade').addClass('hidden');
                $('#hasLearners').show();
            }
        });
    },
   
    validateDiscount: function () {
        var params = {};
        params.payType = $('#isPaidSelect').val();
        params.productType = $('#productTypeSelect').val();
        params.productId = Payment.selectedProductId;
        params.trainingTypeId = $('#trainingTypeSelect').val();
        params.discountRate = $('#discountSelect').val();
        params.sellingMode = $('#isPaidSelect').val();
        $.ajax({
            url: baseUrl + "/sso/payment/validate-discount",
            dataType: 'json',
            type: "GET",
            async:false,
            data: {"param": params},
            success: function (data) {
                if (data.status == false) {
                    if (('approval' in data) && data.approval == true) {
                        var approval = confirm(data.msg);
                        if (approval) {
                            Payment.approvalCount += 1;
                            Payment.addDefaultRow(approval, data);
                            $('#discountSelect').removeClass('input-error');
                            return;
                        } else {
                            Payment.popupApproval = 0;
                            $('input#discountSelect').prop("readonly", false);
                            $('input#sellingPriceSelect').prop("readonly", false);
                            $('#discountSelect').addClass('input-error');
                            return false;
                        }
                    } else {
                        alert(data.msg);
                        Payment.popupApproval = 0;
                        $('input#discountSelect').val(0);
                        Payment.applyRuleDiscount($('input#discountSelect').val(), true);
                        Payment.calculateTotalSP();
                        $('input#discountSelect').prop("readonly", false);
                        $('input#sellingPriceSelect').prop("readonly", false);
                        $('#discountSelect').addClass('input-error');
                        return false;
                    }
                } else {
                    Payment.addDefaultRow(false, data);
                    $('#discountSelect').removeClass('input-error');
                    return ;
                }
            }
        });
    },
//    addProduct: function () {
//        $('#product-row-main').on('click', 'a.add-product-row', function () {
//            Payment.validateProducts();
//            if (Payment.hasError === false) {
//                var selectedKey = $('#productTypeSelect').val() + "-" + $("#productSelect").val();
//                selectedProducts.push(selectedKey);
//
//                var prod = '<div class="form_field_set small_input_box product-row">';
//                var innerHtml = $('.product-row-template').html();
//                innerHtml = innerHtml.replace("{productType}", $('option:selected', '#productTypeSelect').data('producttypename'));
//                innerHtml = innerHtml.replace("{productTypeId}", $('#productTypeSelect').val());
//                innerHtml = innerHtml.replace("{isFree}", $('option:selected', '#isPaidSelect').data('paidtype'));
//                innerHtml = innerHtml.replace("{product}", $('option:selected', '#productSelect').data('product'));
//                innerHtml = innerHtml.replace("{productId}", $('#productSelect').val());
//                innerHtml = innerHtml.replace("{trainingType}", $('option:selected', '#trainingTypeSelect').data('trainingtype'));
//                innerHtml = innerHtml.replace("{trainingTypeId}", $('#trainingTypeSelect').val());
//                innerHtml = innerHtml.replace("{accessDay}", $('#accessDaySelect').val());
//                innerHtml = innerHtml.replace("{mrp}", $('#mrpSelect').val());
//                innerHtml = innerHtml.replace("{currency}", $('#currencySelect').val());
//                innerHtml = innerHtml.replace("{discount}", $('#discountSelect').val());
//                innerHtml = innerHtml.replace("{sellingPrice}", $('#sellingPriceSelect').val());
//                innerHtml = innerHtml.replace("{dataProductTypeId}", $('#productTypeSelect').val());
//                innerHtml = innerHtml.replace("{dataProductId}", $('#productSelect').val());
//                prod += innerHtml + "</div>";
//                $("#selected-products").append(prod);
//                Payment.selectedProductObj[selectedKey] = {
//                    product_type_id: $('#productTypeSelect').val(),
//                    product_type_name: $('option:selected', '#productTypeSelect').data('producttypename'),
//                    product_id: $('option:selected', '#productSelect').val(),
//                    product_name: $('option:selected', '#productSelect').data('product'),
//                    training_type_id: $('option:selected', '#trainingTypeSelect').val(),
//                    training_type_name: $('option:selected', '#trainingTypeSelect').data('trainingtype'),
//                    access_days: $('#accessDaySelect').val(),
//                    discount_percentage: $('#discountSelect').val(),
//                    mrp: $('#mrpSelect').val(),
//                    currency: $('#currencySelect').val(),
//                    selling_price: $('#sellingPriceSelect').val(),
//                };
//                console.log("Adding :", Payment.selectedProductObj);
//                Payment.resetForm();
//            }
//            return false;
//        });
//    },
    validateProducts: function () {
        var elements = $('.product-row-main').html();
        $(elements).each(function (i, ele) {
            var selector = $(ele).prop('id');
            if (typeof selector != 'undefined' && $("#" + selector).val() == "") {
                $("#" + selector).addClass("input-error");
                Payment.hasError = true;
                return false;
            } else if ($("#" + selector).hasClass('input-error')) {
                $("#" + selector).removeClass("input-error");
                Payment.hasError = false;
            }
        });
        return true;
    },
    backendPayment: function () {

//        $('form[name=payment]').submit(function () {
//            Payment.validateBackendPayment();
//            return false;
//        })
        var result = false;
        $('#payment-generate-button').click(function () {
            var paymentSubType = $('option:selected', '#payment_sub_type').val();
            if (paymentSubType == "0")
            {
                alert("Payment Sub Type must be selected ");
                return false;
            }
            result = Payment.validateBackendPayment();
            if(result === false) {
                return false;
            }
            Payment.showLoader();
            var productType = $('#productTypeSelect').val();
            if (productType !== "0") {
                Payment.validateProducts();
                if (Payment.hasError) {
                    alert("Some error occured in products selected");
                    Payment.hideLoader();
                    return false;
                }
            }

            if ($('#totalSp').val() == 0 && $('option:selected', '#payment-mode').val() == 'backend-payment'){
                alert("For Backend Payment total price should not be zero. Please use Custom Payment Mode");
                Payment.hideLoader();
                return false;
            }

            var subPaymentType = parseInt($('option:selected', '#payment_sub_type').val());
            var countryId = parseInt($('option:selected', '#country').val());
            var paymentType = $('option:selected', '#payment-mode').val();
            var isZestmoney = $("#emiOptions option:selected").val() == 'zestMoney' ? 1 : 0;
            var isEduvanz = $("#emiOptions option:selected").val() == 'eduvanz' ? 1 : 0;
            var isBajajFinserv = $("#emiOptions option:selected").val() == 'bajajFinserv' ? 1 : 0;
            var isAffirm = $("#isAffirm").is(':checked') ? 1 : 0;
            var isLiquiloan = $("#emiOptions option:selected").val() == 'liquiloan' ? 1 : 0;
            var zestMoneyTotal = Payment.validateNetTotal();
          /*  if((countryId == 34) && (subPaymentType == 1) && (paymentType == 'custom-payment') && ( zestMoneyTotal < AFFIRM_LOWER_LIMIT ) && (isAffirm == 1)){
                alert("Product(s) amount sholud be greater than "+AFFIRM_LOWER_LIMIT+" dollars");
                Payment.hideLoader();
                return false;
            }*/
            var emailId = $("input#email").val().trim();
            if(isLiquiloan == 1 && emailId.includes("+")){
                alert("Plus(+) sign is not allowed in Email Id ");
                Payment.hideLoader();
                return false;
            }
           if ((countryId == countryIdIndia) && ((validPaymentSubType.indexOf(subPaymentType) != -1)) && (paymentType == 'custom-payment') && ( zestMoneyTotal < ZEST_MONEY_LIMIT || zestMoneyTotal > ZEST_MONEY_UPPER_LIMIT ) && (isZestmoney == 1 || isLiquiloan == 1)) {
                alert("Product(s) amount sholud be between "+ZEST_MONEY_LIMIT+" to "+ZEST_MONEY_UPPER_LIMIT+" rupees");
                Payment.hideLoader();
                return false;
            }
           if ((countryId == countryIdIndia) && ((validPaymentSubType.indexOf(subPaymentType) != -1)) && (paymentType == 'custom-payment') && ( zestMoneyTotal < ZEST_MONEY_LIMIT || zestMoneyTotal > EDUVANZ_UPPER_LIMIT ) && (isEduvanz == 1)) {
                alert("Product(s) amount sholud be between "+ZEST_MONEY_LIMIT+" to "+ EDUVANZ_UPPER_LIMIT+" rupees");
                Payment.hideLoader();
                return false;
            }
            if((countryId == countryIdIndia) && ((validPaymentSubType.indexOf(subPaymentType) != -1)) && (paymentType == 'custom-payment') && (isZestmoney == 1 || isEduvanz == 1 || isLiquiloan == 1)){
                var totalZestMoneyMRP = totalZestMoneySP = totalZestMoneyDiscount = finalPrice = 0
                var totalAmount = Payment.validateZestMoneyDiscount();
                if(totalAmount && totalAmount['netTotalMRP'] && totalAmount['netTotalSP']){
                    totalZestMoneyMRP = totalAmount['netTotalMRP'];
                    totalZestMoneySP = totalAmount['netTotalSP'];
                    finalPrice = totalAmount['finalPrice'];
                    if( finalPrice <= ZEST_MONEY_DISCOUNT_UPPER_LIMIT){
                        totalZestMoneyDiscount = ((1 - (totalZestMoneySP/totalZestMoneyMRP)) * 100).toFixed(2);
                        if( totalZestMoneyDiscount > ZEST_MONEY_DISCOUNT_LIMIT ){
                            alert("The maximum discount allowed on paid courses is " + ZEST_MONEY_DISCOUNT_LIMIT + "% "+"if the total amount for paid courses after GST is less than "+ZEST_MONEY_DISCOUNT_UPPER_LIMIT);
                            Payment.hideLoader();
                            return false;
                        }
                    }
                }
            }

            if((countryId == countryIdIndia) && ((validPaymentSubType.indexOf(subPaymentType) != -1)) && (paymentType == 'custom-payment') && (isBajajFinserv == 1)){
                var isBajajApplicable = Payment.checkIsBajajApplicable();
                if(isBajajApplicable && isBajajApplicable.length == 0){
                    alert("Atleast one Master Program must be selected to use Bajaj Finserv Payment option!!");
                    Payment.hideLoader();
                    return false;
                }

            }

            if (paymentSubType == partialSubsequentPaymentType  && contractIsRefunded && parseInt($('#refunded-amount').text()) != 0) {
                alert("Subsequent payment not allowed as related order has been refunded.");
                Payment.hideLoader();
                return false;
            } 

            if (paymentSubType == partialSubsequentPaymentType  && contractIsRefunded) {
                alert("Payment not allowed as refund in progress for this purchase.");
                Payment.hideLoader();
                return false;
            } 
            

            if (paymentSubType == partialSubsequentPaymentType  && ($('#pendingAmount').val() == 0 || $('#pendingAmount').val() < 0)) {
                alert("For Partial Subsequent Type, total price should not be zero.");
                Payment.hideLoader();
                return false;
            }


            // Js to check wether advance amount is empty or not
            if (paymentSubType == partialFirstPaymentType) {
                if(isNaN($('#advance-amount').val()) || $('#advance-amount').val() == ""){
                    alert("Please enter a valid advance amount");
                    Payment.hideLoader(); 
                    return false;
                }
            }

            if($('#sellingPriceSelect').val() != "") {
                Payment.validateDiscount();
                if (Payment.popupApproval == 0) {
                    Payment.popupApproval=1;
                    Payment.hideLoader();
                    return false;
                }
            }

            if((Object.keys(Payment.selectedProductObj).length <= 0 && $.isEmptyObject(Payment.selectedProductObj))) {
                alert("Please add products to proceed");
                Payment.hideLoader();
                return false;
            }


            var params = {};
            params.approval_required = 0
            if (Payment.approvalCount > 0) {
                if (confirm("Do you want to Send Order for Approval?")) {
                    params.approval_required = 1;
                } else {
                    Payment.hideLoader();
                    return false;
                }
            }

            var requiredFields = ['product_id', 'product_name', 'product_type_id', 'product_type_name', 'training_type_id', 'training_type_name', 'access_days', 'mrp'];
            var isInvalidData = false;

            if (Object.keys(Payment.selectedProductObj).length) {
                $.each(Payment.selectedProductObj, function (index, value) {
                    console.log(value);
                    for (let fields of requiredFields) {
                        if (!(value[fields]) || value[fields] == "0") {
                            alert(fields + ' is empty');
                            isInvalidData = true;
                            Payment.hideLoader();
                            return false;
                        }
                    }
                });
            }

            if (isInvalidData == true) {
                return false;
            }

            params.type = ($('option:selected', '#payment-mode').val()=='backend-payment') ? "backend" : "custom";
            params.billing_email = $("input#email").val().trim();
            params.contact_number = "+" + $('#callingCode').val() + "-" + $("input#contactNumber").val();
            params.learner_email = $("input#additionalEmail").val().trim();
            params.country_id = $('option:selected', '#country').val();
            params.country_name = $('option:selected', '#country').html();
            params.city_id = $('option:selected', '#pcity_id').val();
            params.city_name = $('option:selected', '#pcity_id').html();
            params.created_by = $('#userId').attr('value');
            params.user_email = $('#userEmail').attr('value');
            params.items = Payment.selectedProductObj;
            params.total_price = $('#totalSp').val();
            if (paymentSubType == partialFirstPaymentType) {
                params.advance_amount = $('#advance-amount').val();
                params.installments = configData.data.installment;
                params.config_id = configData.data.configId;
            }
            params.is_zest_money = $("#emiOptions option:selected").val() == 'zestMoney' ? 1 : 0;
            params.is_eduvanz = $("#emiOptions option:selected").val() == 'eduvanz' ? 1 : 0;
            params.is_bajaj_finserv = $("#emiOptions option:selected").val() == 'bajajFinserv' ? 1 : 0;
            params.is_affirm = $("#isAffirm").is(':checked') ? 1 : 0;
            params.is_liquiloan = $("#emiOptions option:selected").val() == 'liquiloan' ? 1 : 0;
            params.tax_properties = $('#serviceTaxPer').val();
            params.tax_percentage = $('#taxPercentage').val();
            params.region_name = $('#regionName').val();
            params.payment_sub_type_id = paymentSubType;
            params.payment_sub_type = $('option:selected', '#payment_sub_type').text();
            if(params.payment_sub_type_id == resellerRegularPaymentType ){
                params.affiliate_id = $('option:selected','#reseller_account_name').val();
            }
            if (params.payment_sub_type_id == upgradationPaymentType || params.payment_sub_type_id == extensionPaymentType) {
                params.previous_reconciliation_id = $('option:selected', '#reconsile_id').val();
            }
            if (params.payment_sub_type_id == partialSubsequentPaymentType) {
                params.contract_number = $("#contractNumber").val();
                params.advance_amount = $("#pendingAmount").val();
                params.approval_required = 0;
            }
            var method = ($('option:selected', '#payment-mode').val()=='backend-payment') ? "backend-payment" : "custom-payment";
            $.ajax({
                url: baseUrl + "/sso/payment/"+method,
                dataType: 'json',
                data: params,
//                async: false,
                type: 'POST',
                success: function (res) {
                    if (res.status === true) {
                        Payment.hideLoader();
                        if (res.data.type != "" && res.data.type == "custom") {
                            if (res.data.is_approved == 3) {
                                $('#generateCustomLink').removeClass("hidden").append('<span class="form_field_set">' + res.msg + '</span><br>');
                            } else if (res.data.url != "") {
                                $('#generateCustomLink').removeClass("hidden").append('<span class="form_field_set">' + res.msg + '<br></span><span class="form_field_set">' + res.responseText + $("input#email").val() + '</span><br>\n\
                            <span class="form_field_set">Following link has been sent to your customer: <br> Payment link: ' + res.data.url + '</span>');
                            } else {
                                $('#generateCustomLink').addClass("hidden").html("");
                            }
                        }
                        if(res.data.type != "" && res.data.type == "backend") {
                            $('#generateCustomLink').removeClass("hidden").append('<span class="form_field_set">' + res.msg + '<br></span>');
                        }
                        Payment.resetAll();
                        $('.inclusion_text').empty();
                        $('.exams_list').empty();
                    } else {
                        $('#generateCustomLink').addClass("hidden").html("");
                        alert(res.msg);
                        Payment.hideLoader();
                        return false;
                    }
                },
                error: function(jqXHR, exception) {
                    console.log("Exception ====", exception);
                }
            });
        })
    },
    validateNetTotal: function() {
        var totalSP = 0;

        var billingEmail = $('input#email').val().trim();
        var learnerEmail = $('input#additionalEmail').val().trim();

        if(learnerEmail == '' || learnerEmail == ','){
            learnerEmail = billingEmail;
        }
        learnerEmail = learnerEmail.split(",");
        learnerEmail = findUniqueArrayElement(learnerEmail);
        var learnerCount = learnerEmail.length;

        var inputSP = parseFloat($('#sellingPriceSelect').val());
        if (!isNaN(inputSP)) {
            totalSP += inputSP;
        }

        var prices = $("[name='sellingPrice[]']") .map(function(){return $(this).val();}).get();
        prices.forEach(function(item){
            if (!isNaN(item)) {
                totalSP += parseFloat(item);
            }
        });

        var taxAmt = totalAmt = 0;
        var taxRate = parseFloat($("#taxPercentage").val());
        if (!isNaN(taxRate)) {
            taxAmt = (totalSP * taxRate) / 100;
            totalAmt = totalSP + taxAmt;
        }
        var netTotal = 0;
        netTotal = parseFloat(totalAmt * learnerCount).toFixed(2);
        return netTotal;
    },
    checkIsBajajApplicable: function(){
        var courseIds = bajajEnableCourseIds.split(",");
        courseIds = courseIds.map(function(id){
            return parseInt(id);
        });
        var inputproductType = $('#productTypeSelect option:selected').val();
        var productType = [];
        if ( inputproductType && ( inputproductType == typeBundle || inputproductType == typeTechMaster || ( inputproductType == typeCourse && (courseIds.indexOf(Payment.selectedProductId) > -1)))) {
            productType.push(inputproductType);
        }
        $("[name='productTypeId[]']").map(function(){
            if($(this).parent().find("[name='isFree[]']").val() == 'PAID' && ($(this).val() == typeBundle || $(this).val() == typeTechMaster)){
                productType.push($(this).val());
            }
        }).get();

        Object.keys(Payment.selectedProductObj).forEach(function(id) {
            var productId = Payment.selectedProductObj[id]['product_id'] ? Payment.selectedProductObj[id]['product_id'] : '';
            var productTypeId = Payment.selectedProductObj[id]['product_type_id'] ? Payment.selectedProductObj[id]['product_type_id'] : '';
            var productTypeName = Payment.selectedProductObj[id]['product_type_name'] ? Payment.selectedProductObj[id]['product_type_name'] : '';
            if(productTypeId == typeCourse &&  (courseIds.indexOf(productId) > -1)){
                productType.push(productTypeName);
            }
        })

        return productType;
    },

    validateZestMoneyDiscount: function() {
        var totalSP = totalMrp = givenDiscount= 0;
        var totalAmount = [];

        var billingEmail = $('input#email').val().trim();
        var learnerEmail = $('input#additionalEmail').val().trim();

        if(learnerEmail == '' || learnerEmail == ','){
            learnerEmail = billingEmail;
        }
        learnerEmail = learnerEmail.split(",");
        learnerEmail = findUniqueArrayElement(learnerEmail);
        var learnerCount = learnerEmail.length;

        var inputSP = parseFloat($('#sellingPriceSelect').val());
        var isPaidSelect =  $('#isPaidSelect').val();
        if (!isNaN(inputSP) && isPaidSelect == 'paid') {
            totalSP += inputSP;
        }
        var prices = $("[name='sellingPrice[]']").map(function(){
            if($(this).parent().find("[name='isFree[]']").val() == 'PAID'){
                return $(this).val();
            }
        }).get();
        prices.forEach(function(item){
            if (!isNaN(item)) {
                totalSP += parseFloat(item);
            }
        });
        var inputMRP = parseFloat($('#mrpSelect').val());
        if (!isNaN(inputMRP) && isPaidSelect == 'paid') {
            totalMrp += inputMRP;
        }
        var mrpPrices = $("[name='mrp[]']") .map(function(){
            if($(this).parent().find("[name='isFree[]']").val() == 'PAID'){
                return $(this).val();
            }
        }).get();
        mrpPrices.forEach(function(item){
            if (!isNaN(item)) {
                totalMrp += parseFloat(item);
            }
        });

        var netTotalSP = netTotalMRP = taxAmt = totalAmt = finalPrice = 0;
        totalSP = totalSP * learnerCount;
        var taxRate = parseFloat($("#taxPercentage").val());
        if (!isNaN(taxRate)) {
            taxAmt = (totalSP * taxRate) / 100;
            totalAmt = totalSP + taxAmt;
        }

        finalPrice = parseFloat(totalAmt).toFixed(2);
        netTotalSP = parseFloat(totalSP).toFixed(2);
        netTotalMRP = parseFloat(totalMrp * learnerCount).toFixed(2);

        totalAmount['netTotalSP'] = netTotalSP;
        totalAmount['netTotalMRP'] = netTotalMRP;
        totalAmount['finalPrice'] = finalPrice;
        return totalAmount;
    },
    validateBackendPayment: function () {
//        $('.text-validate').each(function () {
//            if ($(this).val() == "") {
//                $(this).addClass('input-error');
//                return false;
//            } else {
//                $(this).removeClass('input-error');
//                return true;
//            }
//        });
        var emailResult = false;
        if ($("input#email").val() == "") {
            $("input#email").addClass('input-error');
            alert("Please enter email");
            return false;
        } else {
            emailResult = Payment.validateEmail($("input#email").val());
            if (emailResult === false) {
                $("input#email").addClass('input-error');
                alert("Invalid email");
                return false;
            }
            $("input#email").removeClass('input-error');
        }

        if ($("#additionalEmail").val() != "") {
            var multiEmails = $("#additionalEmail").val().replace(/[ ,]+/g, ",");
            multiEmails = multiEmails.split(",");
            multiEmails = findUniqueArrayElement(multiEmails);
            for (var i = 0; i < multiEmails.length; i++) {
                if (!Payment.validateEmail(multiEmails[i])) {
                    $("#additionalEmail").addClass('input-error');
                    alert("Invalid email added in multiple learner field - "+multiEmails[i]);
                    return false;
                }
            }
            $("#additionalEmail").removeClass('input-error');
        }
        var contactNoResult = false;
        if ($("input#contactNumber").val() == "") {
            $("input#contactNumber").addClass('input-error');
            alert("Please enter contact number");
            return false;
        } else {
            contactNoResult = Payment.validateContactNoResult($("input#contactNumber").val());
            if (!($.isEmptyObject(contactNoResult)) && contactNoResult.status === false) {
                $("input#contactNumber").addClass('input-error');
                alert(contactNoResult.msg);
                return false;
            }
            $("input#contactNumber").removeClass('input-error');
        }
    },
    additionalLearners: function () {
        $('#hasLearner').click(function () {
            if ($(this).is(":checked")) {
                $(".has-learner").removeClass('hidden');
            } else {
                $("#hasAssignee").prop( "checked", false);
                $("#additionalEmail").val('');
                $(".has-learner").addClass('hidden');
                Payment.calculateTotalSP();
            }
        });

        $('#hasAssignee').click(function () {
            if ($(this).is(":checked") && $("#email").val() != "") {
                var assigneeStr = "";
                var assignee = $("#email").val() + "," + $("#additionalEmail").val();
                assignee = assignee.split(',');
                $.unique(assignee);
                $(assignee).each(function (i, j) {
                    if (j !== "")
                        assigneeStr += j + ",";
                });
                $("#additionalEmail").val(assigneeStr);
            }else{
                var tmp = $("#additionalEmail").val();
                tmp = tmp.replace($("#email").val(),"");
                tmp = tmp.replace(',,','');
                $("#additionalEmail").val(tmp);
            }
            Payment.calculateTotalSP();
        });

        $("#additionalEmail").focusout(function(){
            var emails = $(this).val().replace(/[ ,]+/g, ",");
            emails = emails.split(",");
            emails = findUniqueArrayElement(emails);
            $(this).val(emails);
            Payment.calculateTotalSP();
        })
        $("#email").focusout(function(){
            if ($('#hasAssignee').is(":checked")){
                $('#hasAssignee').click();
                $('#hasAssignee').attr('checked',true);
            }
            Payment.calculateTotalSP();
        });
    },
    resetForm: function(){
        Payment.courseArr=[];
        Payment.productAutoComplete();
        $('#productTypeSelect').val(0);
        $('#isPaidSelect').html('');
        $('#productSelect').val('');
        $('#productSelect').attr('data-courseName', '');
        $('#trainingTypeSelect').html('');
        $('#accessDaySelect').html('');
        $('#mrpSelect').val('');
        $('#currencySelect').val('');
        $('#discountSelect').val('');
        $('#sellingPriceSelect').val('');
        $('#workshopSelect').val('');
    },
    listCity: function () {
        $('#country').on('change', function () {
            $('#productFieldset').prop("disabled", true);
            $('#productFieldset').find('input:text, select').val('');
            $('#partial-payment-message').addClass('hidden');
            $('#selected-products').html("");
            $('select#accessDaySelect').html("");
            $('#advance-amount').prop("disabled",true);
            $('#advance-amount').val('');
            $('#balance-due').html('0.00');
            Payment.selectedProductObj = {};
            selectedProducts = [];
            $('#regionName').val('');
            $('#taxPercentage').val('');
            $('#generateCustomLink').addClass("hidden").html("");
            $('#balance-due-label1').html(")");
            Payment.calculateTotalSP();

            var selectedCountry = parseInt($("#country").val());
            if(selectedCountry === 0) {
                $('select#pcity_id').html("");
                $('#productFieldset').find('input:text, select').val('');
                $('#selected-products').html("");
                return;
            }
            if (selectedCountry !== 0) {
                $('#productFieldset').find('input:text, select').val('');
                $('#selected-products').html("");
                Payment.loadCityRegionByCountry(selectedCountry,Payment.type_extension);
            }
            Payment.resetTaxElement();
            Payment.setTaxLabel(0);

            var callingCode = $('option:selected',"select#country").attr('data-calling-code');
            $('#callingCode').val(callingCode);
        });
    },

    loadCityRegionByCountry(countryId,sync=false){
        $.apiCall('getRegionCityByCountry', {
            countryId: countryId
        }, function (data) {
            var html = "<option value='0'>--Select--</option>";
            $.each(data, function (element, value) {
                html += '<option data-region="'+value.region_name + '" value="' + value.city_id + '">' + value.name + '</option>';
            });
            $('select#pcity_id').closest('li').show();
            $('select#pcity_id').html(html);
            $('select#cityId').closest('li').show();
            $('select#pcityId').html(html);
        },sync);
    },
    getTotalAmountForPartialPayment(sync = true){
        $.apiCall('getTotalAmountForPartialPayment', {
            currencyKey: $("#currency").val(),
            userEmail:$('#userEmail').attr('value')
        }, function (data) {
            configData = JSON.parse(data);
        },sync);
        return configData;
    },
    selectCity: function () {
        $('select[name="pcity_id"]').on('change', function () {
            $('#productFieldset').find('input:text, select').val('');
            $('#productFieldset').prop("disabled", true);
            $('#advance-amount').prop("disabled",true);
            $('#advance-amount').val('');
            $('#balance-due').html('0.00');
            $('#productSelect').prop("disabled", true);
            $('#selected-products').html("");
            $('select#accessDaySelect').html("");
            $('input#sellingPriceSelect').prop("readonly", true);
            $('input#discountSelect').prop("readonly", true);
            $('#generateCustomLink').addClass("hidden").html("");
            Payment.selectedProductObj = {};
            selectedProducts = [];
            Payment.resetExamDetails();
            Payment.calculateTotalSP();

            var selectedCity = parseInt($("#pcity_id").val());
            if (selectedCity === 0) {
                $('#productFieldset').prop("disabled",true);
                return;
            }
            $('#productFieldset').prop("disabled", false);
            var countryId = $('#country').val();
            var state = $(this).find(':selected').data('region');
            if (state !== '') {
                $('#regionName').val(state);
            } else {
                $('#regionName').val('');
            }

            var paymentSubType = parseInt($('option:selected', '#payment_sub_type').val());
            Payment.getTax(countryId, state,Payment.tax_sync_load);
//            call to load contract config details on select of partial payment 
            if (paymentSubType == partialFirstPaymentType) {
                var partPaymentNotAllowed = false;
                configData = Payment.getTotalAmountForPartialPayment();
                console.log(configData);

                if (configData.status == false) {
                    if (configData.data.hasOwnProperty('startingAmount')) {
                        alert(configData.message + " " + $('#currency').val());
                        $('#productFieldset').prop("disabled", true);
                    } else {
                        alert(configData.message);
                        $('#productFieldset').prop("disabled", true);
                    }
                    return;
                }

                if (configData.data.hasOwnProperty('excluded_country')) {
                    if (configData.data.excluded_country.length != 0) {
                        $.each(configData.data.excluded_country, function (key, value) {
                            if (countryId == value) {
                                partPaymentNotAllowed = true;
                            }
                        });
                    }
                }
                if (partPaymentNotAllowed) {
                    alert("Part payment is not allowed for selected country!");
                    $('#productFieldset').prop("disabled", true);
                    return;
                }

                Payment.eligiblePartPaymentAmount = configData.data.startingAmount;
                $('#partial-payment-message').removeClass('hidden');
                $('#pp-minimum-amount-for-currency').html(configData.data.startingAmount + " " + $("#currency").val());
                $('#pp-no-of-installments').html(configData.data.installment);
                if (Payment.eligiblePartPaymentAmount > 0) {
                    var content = 'For partial payment\nTotal amount should be\nminimum ' + Payment.eligiblePartPaymentAmount + " " + $("#currency").val();
                    createTooltip($('#advance-amount-tooltip-ref'), $('#advance-amount-wrapper'), content);
                }
            }
        });
    },
    loadProductsByPaymentSubType(paymentSubType, sync = false) {
        $.apiCall('getCoursesList', {
            paymentSubType: paymentSubType
        }, function (data) {
            allCourseData = JSON.parse(data.data);
        }, sync);
    },    
    getEmailFinsaleIdsAndData: function () {
        var finsaleArrObj = [];
        $('input#email').on('blur', function () {
            finsaleArrObj = [];
            Payment.type_extension = 0;
            Payment.is_disable_momextention = 0;
            Payment.is_backend_payment = 0;
            Payment.type_partial_subsequent = 0;
//            Payment.tax_sync_load = 0;
            $('select#reconsile_id').children().remove().end();
            var paymentSubTypeId = $('#payment_sub_type').val();
            var method = 'getFinsaleIdsAndData';
            if (paymentSubTypeId == upgradationPaymentType || paymentSubTypeId == extensionPaymentType || paymentSubTypeId == partialSubsequentPaymentType) {
                if (Payment.validateEmail($('input#email').val())) {
                    Payment.resetRegularSelect();
                    if (paymentSubTypeId == extensionPaymentType) {
                        Payment.type_extension = 1;
                        Payment.tax_sync_load = 1;
                    }
                    if (paymentSubTypeId == partialSubsequentPaymentType) {
                        Payment.tax_sync_load = 1;
                        Payment.type_partial_subsequent = 1;
                        method = 'getDataForPartialSubsequent';
                    }
                    if ($('option:selected', '#payment-mode').val() == 'backend-payment') {
                        Payment.is_disable_momextention = 1;
                        Payment.is_backend_payment = 1;
                    }
                    $.ajax({
                        url: baseUrl + "/api/v3?method="+method,
                        dataType: 'json',
                        type: "POST",
                        data: {email: $('input#email').val(), extension: Payment.type_extension,disable_mom : Payment.is_disable_momextention, is_backend_payment:Payment.is_backend_payment},
                        success: function (data) {
                            console.log(data)
                            if (data.length > 0) {
                                finsaleArrObj = data;
                                var html = "<option value='0'>--SELECT--</option>";
                                $.each(data, function (element, value) {
                                    if (paymentSubTypeId == partialSubsequentPaymentType) {
                                        html += '<option value="' + value.order_id + '">' + value.order_number + '</option>';
                                    } else
                                        html += '<option value="' + value.reconciliation_id + '">' + value.reconciliation_id + ' | ' + value.course_name + '</option>';
                                });
                                $('select#reconsile_id').html(html);
                            } else {
                                if (Payment.type_partial_subsequent == 1) {
                                    alert('No Order Ids Found');
                                } else {
                                    alert('No Reconciliation Ids Found');
                                }
                            }
                        }
                    });
                } else {
                    alert('Invalid Email');
                }
            }
        });

        $('select#reconsile_id').on('change', function () {
            Payment.resetRegularSelect();
            if (finsaleArrObj) {
                var data = (finsaleArrObj.filter(function (value) {
                    if (Payment.type_partial_subsequent) {
                        return value.order_id == $('option:selected', '#reconsile_id').val()
                    }
                    return value.reconciliation_id == $('option:selected', '#reconsile_id').val()
                })[0]);
                $('#country').val(data.countryId);
                $('#email').val(data.customerEmail);
                $('#currency').val(data.currency).prop('readonly', true);
                $('#tax-label').removeClass('hidden');
                $('#tax-amount').removeClass('hidden');
                var number = data.contact_number;
                if (number && number.indexOf('-') != -1)
                {
                    if (number.indexOf('+') != -1)
                    {
                        number = number.slice(1);
                    }
                    var contactNo = (number).split('-', 2);
                    $('#callingCode').val(contactNo[0]).prop('readonly', true);
                    $('#contactNumber').val(contactNo[1]).prop('readonly', true);
                    $('#country').attr('disabled', true);
                } else
                {
                    var callCode = $('option:selected', "#country").attr('data-calling-code');
                    $('#callingCode').val(callCode).prop('readonly', true);
                    $('#country').attr('disabled', true);
                }
                try {
                    var countryId = parseInt($('option:selected', '#country').val());
                    var paymentSubType = parseInt($('option:selected', '#payment_sub_type').val());
                    if ($('option:selected', '#payment-mode').val() == 'custom-payment' && (validPaymentSubType.indexOf(paymentSubType) != -1) && countryId == 6) {
                        $("#emiOptions").parent().show();
                    } else {
                        $("#emiOptions").val('');
                        $("#emiOptions").parent().hide();
                    }
                    if ($('option:selected', '#payment-mode').val() == 'custom-payment' && (validPaymentSubType.indexOf(paymentSubType) != -1)) {
                        $("#productTypeSelect option[value=5]").show();
                    } else {
                        $("#productTypeSelect option[value=5]").hide();
                    }
                } catch (e) {
                    console.log("Exception ==== At reconsile_id change :::",e);
                }
                if (parseInt(data.cityId)) {
                    $.ajax({
                        url: baseUrl + "/api/v3?method=getCityDetailsById",
                        dataType: 'json',
                        type: "POST",
                        async: false,
                        data: {city_id: data.cityId},
                        success: function (result) {
                            if (result.data['city_id']) {
                                $('select[name="pcity_id"]').append(
                                        $('<option></option>').val(result.data['city_id']).html(result.data['name']).attr('data-region', result.data['region_name'])).val(result.data['city_id']).change().attr('disabled', true);
                            } else if (!Payment.type_extension) {
                                $('#country').change();
                            }else{
                                alert('City is Unavailable.');
                            }
                        }
                    });
                } else if (Payment.type_partial_subsequent) {
                    alert("Data Population Failed, Please Contact Techops");
                    return false;
                } else if (!Payment.type_extension) {
                    $('#country').change();
                } else if (Payment.type_extension) {
                    $.ajax({
                        url: baseUrl + "/api/v3?method=getDefaultCityDetailsByCountryId",
                        dataType: 'json',
                        type: "POST",
                        async: false,
                        data: {country_id: data.countryId},
                        success: function (result) {
                            if (result['city_id']) {
                                $('select[name="pcity_id"]').append(
                                        $('<option></option>').val(result['city_id']).html(result['name']).attr('data-region', result['region_name'])).val(result['city_id']).change().attr('disabled', true);
                            } else {
                                alert('City is Unavailable.');
                            }
                        }
                    });
                }
                if(Payment.type_extension){
                     $('#productTypeSelect').val(data.productType_id).attr('disabled', true).change().end();
                     if (data.productType_id == typeBundle) {
                        if (data.courseId in allCourseData[typeBundle]['free']) {
                            $('#isPaidSelect').val('free').attr('disabled', true).change().end();
                        } else {
                            $('#isPaidSelect').val('paid').attr('disabled', true).change().end();
                        }
                     }else if(data.courseId ){
                         if(data.courseId in allCourseData[1]['free']){
                             $('#isPaidSelect').val('free').attr('disabled', true).change().end();
                         }else{
                             $('#isPaidSelect').val('paid').attr('disabled', true).change().end();
                         }
                     }
                     $('#productSelect').attr('data-courseName',data.course_name);
                     $('#productSelect').val(data.course_name).attr('disabled', true);
                     $('#productSelect').data('ui-autocomplete')._trigger('select', 'autocompleteselect', {item:{value:data.courseId}});
                     $('#productSelect').change().end();
                     $('#trainingTypeSelect').val(data.trainingType_id).attr('disabled', true).change();
                     if(Payment.popUpAccessDaysAlert == 1){
                        alert('Please select Workshop/Access Days.');
                    }
                }

                var selectedKey, prod = '';
                if (Payment.type_partial_subsequent) {
                    $.each(data.contract_items, function (index, value) {
                        selectedKey = value.product_type_id + "-" + value.product_id;
                        prod += '<div class="form_field_set small_input_box product-row-main">';
                        var innerHtml = '';
                        if (index === 0) {
                            innerHtml = $('.product-row1-template').html();
                        } else {
                            innerHtml = $('.product-other-row-template').html();
                        }
                        innerHtml = innerHtml.replace("{productType}", '<option value="' + value.product_type_name + '" selected>' + value.product_type_name + '</option>');
                        innerHtml = innerHtml.replace("{productTypeId}", value.product_type_id);
                        var isFree = '';
                        if (value.product_type_id == typeBundle) {
                            if (value.product_id in allCourseData[typeBundle]['free']) {
                                isFree = 'free';
                            } else {
                                isFree = 'paid';
                            }
                        } else if (value.product_id) {
                            if (value.product_id in allCourseData[typeCourse]['free']) {
                                isFree = 'free';
                            } else {
                                isFree = 'paid';
                            }
                        }
                        innerHtml = innerHtml.replace("{isFree}", '<option value="' + isFree + '" selected>' + isFree + '</option>');
                        innerHtml = innerHtml.replace("{product}", value.product_name);
                        innerHtml = innerHtml.replace("{productId}", value.product_id);
                        innerHtml = innerHtml.replace("{trainingType}", '<option value="' + value.training_type_name + '" selected>' + value.training_type_name + '</option>');
                        innerHtml = innerHtml.replace("{trainingTypeId}", value.training_type_id);
                        innerHtml = innerHtml.replace("{workshop}", '<option value="' + value.workshop_dates + '" selected>' + value.workshop_dates + '</option>');
                        innerHtml = innerHtml.replace("{workshopId}", value.workshop_id);
                        innerHtml = innerHtml.replace("{accessDay}", '<option value="' + value.access_days + '" selected>' + value.access_days + '</option>');
                        innerHtml = innerHtml.replace("{mrp}", value.mrp);
                        innerHtml = innerHtml.replace("{discount}", value.discount_percentage);
                        innerHtml = innerHtml.replace("{sellingPrice}", value.selling_price);
                        if(data.is_refunded) {
                            innerHtml = innerHtml.replace("{errorMessage}", value.refund_status);
                        } else {
                            innerHtml = innerHtml.replace("{errorMessage}", "");
                        }
                        prod += innerHtml + "</div>";
                        Payment.selectedProductObj[selectedKey] = {
                            product_type_id: value.product_type_id,
                            product_type_name: value.product_type_name,
                            product_id: value.product_id,
                            product_name: value.product_name,
                            training_type_id: value.training_type_id,
                            training_type_name: value.training_type_name,
                            workshop_id: value.workshop_id,
                            workshop_dates: value.workshop_dates,
                            access_days: value.access_days,
                            price_id: value.price_id,
                            discount_percentage: value.discount_percentage,
                            mrp: value.mrp,
                            selling_mode:isFree,
//                            currency: data.currency,
                            selling_price: value.selling_price,
                            allowed_discount: value.allowed_discount,
                        };
                    });
                    $("#selected-products").append(prod);
                    if(data.is_refunded) {
                        contractIsRefunded = true;
                        $("#selected-products").find( ".product-row-main" ).addClass("error");
                        $("#selected-products").find( ".error-message" ).css("display","grid");
                    } else {
                        contractIsRefunded = false;
                        $("#selected-products").find( ".product-row-main" ).removeClass("error");
                        $("#selected-products").find( ".error-message" ).css("display","none");
                        $("#selected-products").find( ".error-message" ).text("");
                    }
                    $('#product-row-main').hide();
                    var taxRate = parseFloat($("#taxPercentage").val());
                    var taxAmt = 0;
                    if (!isNaN(taxRate)) {
                        taxAmt = (data.pending_amount * taxRate) / 100;
                    }
                    if (!taxRate) {
                        $('#tax-label').addClass('hidden');
                        $('#tax-amount').addClass('hidden');
                        $('#amount-paid-tax').addClass('hidden');
                        $('#amount-paid-tax').html('');
                    } else {
                        $('#amount-paid-tax').removeClass('hidden');
                        $('#amount-paid-tax').html('(' + parseFloat(data.amount_paid).toFixed(2) + ' + Tax)');
                    }
                    $("#learner-count").html(data.learners_count);
                    $("input#additionalEmail").val(data.learner_email);
                    $("#bill-amount").html(parseFloat(data.sub_total).toFixed(2));
                    $("#net-total").html(parseFloat(data.total_price).toFixed(2));
                    $("#amount-paid").html(parseFloat(data.amount_paid_with_tax).toFixed(2));
                    $("#pending-amount").html(parseFloat(data.pending_amount).toFixed(2));
                    $("#tax-amount").html(parseFloat(taxAmt).toFixed(2));
                    $("#net-total-all").html(parseFloat(data.pending_amount + taxAmt).toFixed(2));
                    $('#totalSp').val(data.total_price);
                    $("#contractNumber").val(data.contract_number);
                    $("#pendingAmount").val(data.pending_amount);
                    if(data.is_refunded && data.refunded_amount) {
                        $('#refunded-amount-label').removeClass('hidden');
                        $('#refunded-amount').removeClass('hidden');
                    } else {
                        $('#refunded-amount-label').addClass('hidden');
                        $('#refunded-amount').addClass('hidden');
                        $("#refunded-amount").html(parseFloat("0.0").toFixed(2));
                    }
                    $("#refunded-amount").html(parseFloat(data.refunded_amount).toFixed(2));
                }
            }
        });
    },
    listProduct: function () {
        $('#productTypeSelect').on('change', function () {
            Payment.courseArr = [];
            Payment.resetProductAutoComplete();
            $('#isPaidSelect').val('');
            $('input#productSelect').val('');
            $('input#productSelect').attr('data-courseName','');
            $('#productSelect').prop("disabled", true);
            $('select#trainingTypeSelect').html("");
            $('select#workshopSelect').html("");
            $('select#accessDaySelect').html("");
            $('#mrpSelect').val('');
            $('#currencySelect').val('');
            $('#discountSelect').val('');
            $('#sellingPriceSelect').val('');
            $('input#sellingPriceSelect').prop("readonly", true);
            $('input#discountSelect').prop("readonly", true)
            //$('input#productSelect').html("");
            Payment.listCourseAccessType();
            Payment.resetExamDetails();

//            var selectedProductType = $("#productTypeSelect" ).val();
//            if (selectedProductType != 0) {
//                Payment.courseAccessTypeChange(selectedProductType);
//                var data = allCourseData[selectedProductType];
//                var html = "<option value='0'>--Select--</option>";
//                $.each(data, function(element, value) {
//                    if ($.inArray($('#productTypeSelect').val() + "-" + element, selectedProducts) != -1) {
//                        console.log(selectedProducts);
//                        html += '<option class="hidden" value="'+element+'" data-product="'+value+'">'+value+'</option>';
//                    } else {
//                        html += '<option value="'+element+'" data-product="'+value+'">'+value+'</option>';
//                    }
//                });
//
//                $('input#productSelect').closest('li').show();
//                $('input#productSelect').html(html);
//            } else {
//                $('input#productSelect').html("");
//            }
        });
    },
    listCourseAccessType: function() {
        var selectedProductType = $("#productTypeSelect" ).val();
        var payment_sub_type_id = $('#payment_sub_type').val();

        var data = {};
        // if (selectedProductType == typeCourse && payment_sub_type_id != complimentaryPaymentType) {
        //     data.paid = "PAID";
        //     data.free = "FREE";
        // } else if (selectedProductType == typeCourse && payment_sub_type_id == complimentaryPaymentType) {
        //     data.free = "FREE";
        // } else if (selectedProductType == 2) {
        //     data.paid = "PAID";
        //     data.free = "FREE";
        // } else if (selectedProductType == 5) {
        //     data.paid = "PAID";
        // }else {
        //      $('select#isPaidSelect').html("");
        // }

        data = Payment.sellingTypeOptions(selectedProductType,payment_sub_type_id);
        if(Object.keys(data).length == 0){
             $('select#isPaidSelect').html("");
        }
        var html = "<option value='0'>--Select--</option>";;
        $.each(data, function(element, value) {
            html += '<option value="'+element+'" data-paidtype="'+value+'">'+value+'</option>';
        });

        $('select#isPaidSelect').closest('li').show();
        $('select#isPaidSelect').html(html);
    },
    sellingTypeOptions:function(selectedProductType, paymentSubType){
        var data = {paid: "PAID", free: "FREE"};
        switch(selectedProductType.toString()){
            case (typeCourse.toString()):
                //If payment subtype is complimentary payment, then only FREE is available                
                if(complimentaryPaymentType == paymentSubType){
                    delete data.paid;
                }
                break;
            case (typeBundle.toString()):
                //If payment subtype is complimentary payment, then only FREE is available                
                if(complimentaryPaymentType == paymentSubType){
                    delete data.paid;
                }
                break;
            case (typeTechMaster.toString()):
                //TechMOM is only PAID
                delete data.free;
                break;
            default:
                delete data.paid;
                delete data.free;
        }
        return data;
    },
    productAutoComplete:function(){
        $('#productSelect').prop("disabled", false);
        $('#productSelect').autocomplete({
            source:Payment.courseArr,
            minlength:0,
                  focus: function( event, ui ) {
        $( "#productSelect" ).val( ui.item.label);
        $( "#productSelect" ).attr('data-courseName', ui.item.courseName);
        return false;
      },
      select: function( event, ui ) {
            $('select#trainingTypeSelect').html("");
            $('select#workshopSelect').html("");
            $('select#accessDaySelect').html("");
            $('#mrpSelect').val('');
            $('#currencySelect').val('');
            $('#discountSelect').val('');
            $('#sellingPriceSelect').val('');
            Payment.resetExamDetails();
            Payment.calculateTotalSP();
            var productId = parseInt(ui.item.value);
            Payment.selectedProductId = productId;
            var productTypeId = parseInt($('select#productTypeSelect').val());
            var countryId = parseInt($('select#country').val());
            var cityId = parseInt($('select#pcity_id').val());
            var sellingMode = $('#isPaidSelect').val();
            var paymentSubTypeId = parseInt($('#payment_sub_type').val());
            if ((productTypeId != 0) && (productId != 0) && countryId != 0) {
                var params = {};
                params.method = 'getTrainingTypeForCountryCityCourseV5';
                params.product_type_id = productTypeId;
                params.product_id = productId;
                params.country_id = countryId;
                params.city_id = cityId;
                AFFIRM_EXCLUDE_OSL = false;
                if(parseInt(countryId) === parseInt(AFFIRM_APPLICABLE_COUNTRY_ID)){
                    if($("#isAffirm").is(':checked')){
                        AFFIRM_EXCLUDE_OSL = true;
                    }
                }
                var bundleTrainingType = (typeof bundleAllowedTrainingType === 'undefined') ? 0 : bundleAllowedTrainingType;
                var momTrainingType = (typeof momAllowedTrainingType === 'undefined') ? 0 : momAllowedTrainingType;
                var freeProductTrainingType = (typeof freeProductsAllowedTrainingType === 'undefined') ? 0 : freeProductsAllowedTrainingType;
                $.ajax({
                    type: "POST",
                    url: baseUrl + "/api/v3",
                    dataType: 'json',
                    async: false,
                    data: params,
                    success: function (res) {
                        
                        var html = "<option value='0'>-- SELECT --</option>";
                        if (res.status === true) {
                            if (productTypeId == typeBundle) {
                                $.each(res.data, function (id, value) {
//                                      For free type bundles only  osl training type will list
                                        if ((paymentSubTypeId !== extensionPaymentType && paymentSubTypeId !== partialSubsequentPaymentType) && sellingMode === 'free') {
                                            if (freeProductTrainingType in res.data && id == freeProductTrainingType) {
                                                html += '<option  data-trainingtype="' + value + '" value="' + id + '">' + value + '</option>';
                                            }
                                        } else if ( (paymentSubTypeId !== extensionPaymentType && paymentSubTypeId !== partialSubsequentPaymentType) && bundleTrainingType in res.data) {
                                            if (id == bundleTrainingType) {
                                                html += '<option  data-trainingtype="' + value + '" value="' + id + '">' + value + '</option>';
                                            }
                                        } else {
                                            html += '<option data-trainingtype="' + value + '" value="' + id + '">' + value + '</option>';
                                        }

                                });
                            } else if(productTypeId == 5) {
                                    $.each(res.data, function (id, value) {
                                        if (bundleTrainingType in res.data) {
                                            if (id == momTrainingType) {
                                                html += '<option  data-trainingtype="' + value + '" value="' + id + '">' + value + '</option>';
                                            }
                                        } else {
                                            html += '<option data-trainingtype="' + value + '" value="' + id + '">' + value + '</option>';
                                        }

                                    });
                              } else {
                                var categoryInfo = res.categoryInfo || '';
                                var primaryCategoryId = 0;
                                if(typeof categoryInfo !=="undefined" && categoryInfo){
                                    primaryCategoryId = parseInt(categoryInfo.primaryLabelId) || '';
                                }
                                $.each(res.data, function (id, value) {
                                    var trainingId = parseInt(id);
                                    if(typeof AFFIRM_EXCLUDE_OSL !=="undefined" && AFFIRM_EXCLUDE_OSL === true && AFFIRM_SKIP_TRAINING_TYPES.indexOf(trainingId) !==-1 && AFFIRM_APPLICABLE_OSL_CATEGORY.indexOf(primaryCategoryId) == -1 && sellingMode !== 'free'){
                                        return true;
                                    }
//                                  For free type courses only  osl training type will list
                                    if ((paymentSubTypeId !== extensionPaymentType && paymentSubTypeId !== partialSubsequentPaymentType) && sellingMode === 'free') {
                                        if (freeProductTrainingType in res.data && id == freeProductTrainingType ){
                                            html += '<option  data-trainingtype="' + value + '" value="' + id + '">' + value + '</option>';
                                        }
                                    } else {
                                        html += '<option data-trainingtype="' + value + '" value="' + id + '">' + value + '</option>';
                                    }
                                });
                            }
                        }else{
                            alert(res.message);
                            return;
                        }
                        $('select#trainingTypeSelect').closest('li').show();
                        console.log()
                        $('select#trainingTypeSelect').html(html);
                    },
                    error: function (jqXHR, exception) {
                    }
                });
            }
            Payment.setDiscountRange(productId);

        return false;
      }
    })
  },
    setDiscountRange: function (productId) {
        var selectedProductType = $("#productTypeSelect").val();
        var selectedCourseAccessType = $('option:selected', '#isPaidSelect').html().toLowerCase();
        var products = allCourseData[selectedProductType][selectedCourseAccessType];
        if (typeof products[productId] != 'undefined' || products[productId] != '') {
            if (selectedCourseAccessType == 'free') {
                $('input#discountSelect').data('min', discountRangeFree.min);
                $('input#discountSelect').data('max', discountRangeFree.max);
            } else {
                $('input#discountSelect').data('min', discountRangeDefault.min);
                $('input#discountSelect').data('max', discountRangeDefault.max);
            }
        } else {
            $('input#discountSelect').data('min', '0');
            $('input#discountSelect').data('max', '0');
        }
    },
    selectTrainingType: function() {
        $('#trainingTypeSelect').on('change', function() {
            // reset chained fields
            $('select#workshopSelect').html("");
            $('select#accessDaySelect').html("");
            $('#mrpSelect').val('');
            $('#currencySelect').val('');
            $('#discountSelect').val('');
            $('#sellingPriceSelect').val('');
            $('#advance-amount').val('');
            $('input#sellingPriceSelect').prop("readonly", true);
            $('input#discountSelect').prop("readonly", true);
            Payment.calculateTotalSP();
            Payment.resetExamDetails();

            var trainingTypeId = parseInt($('select#trainingTypeSelect').val());
            var productId = parseInt(Payment.selectedProductId);
            var productTypeId = parseInt($('select#productTypeSelect').val());
            var countryId = parseInt($('select#country').val());
            var cityId = parseInt($('select#pcity_id').val());

            if (productTypeId !== 0 && productId !== 0 && countryId !== 0 && trainingTypeId !== 0) {

                switch (trainingTypeId) {
                    case 1:
                        var params = {};
                        params.product_type_id = productTypeId;
                        params.course_id = productId;
                        params.country_id = countryId;
                        params.city_id = cityId;
                        params.training_id = trainingTypeId;
                        params.is_backend_payment = ($('option:selected', '#payment-mode').val()=='backend-payment') ? true : false;
                        $.ajax({
                            type: "GET",
                            url: baseUrl + "/sso/payment/get-workshops",
                            dataType: 'json',
                            async: false,
                            data: {"params": params},
                            success: function (res) {
                                if (res.status === true) {
                                    var data = res.data;
                                    var html = "<option value='0'>--Select--</option>";
                                    $.each(data, function (key, value) {
                                        html += '<option value="' + key + '" title="' + key + '" data-wsdates = "'+value+'">' + value + '</option>'
                                    });
                                    $('select#workshopSelect').html(html);
                                    $('select#accessDaySelect').html("<option value='90'>90</option>");
                                }
                            },
                            error: function (jqXHR, exception) {
                            }
                        });
                        break;
                    default:
                        var params = {};
                        params.method = 'fetchAccessDays';
                        params.product_type_id = productTypeId;
                        params.course_id = productId;
                        params.country_id = countryId;
                        params.training_id = trainingTypeId;

                        params.mp_access_days=0;
                        if (productTypeId == 2) {
                            params.mp_access_days=1;
                        }

                        $.ajax({
                            type: "POST",
                            url: baseUrl + "/api/v3",
                            dataType: 'json',
                            async: false,
                            data: params,
                            success: function (res) {
                                var html = "<option value='0'>--Select--</option>";
                                if (res.status === true) {
                                    $.each(res.data, function (id, value) {
                                        html += '<option value="' + value + '" data-accessday = "' + value + '" data-price_id= "' + id + '">' + value + '</option>';

                                    });
                                }else{
                                    Payment.popUpAccessDaysAlert = 0;
                                    alert('Course/Bundle is Inactive Now.');
                                }
                                $('select#accessDaySelect').closest('li').show();
                                $('select#accessDaySelect').html(html);
                                $('select#workshopSelect').html("<option value='0'>--Select--</option>");
                            },
                            error: function (jqXHR, exception) {
                            }
                        });
                        break;
                }

            }else{
                $('select#workshopSelect').html("<option value='0'>--Select--</option>");
                $('select#accessDaySelect').html("<option value='0'>--Select--</option>");
            }
        });
    },
    fetchClassroomPrice: function () {
        $('#workshopSelect').on('change', function () {
            $.apiCall('getCoursePrice', {
                ws_id:  $('select#workshopSelect').val(),
                courseId: $('select#productIdSelect').val(),
                trainingId: $('select#trainingTypeSelect').val(),
                productTypeId: $('select#productTypeSelect').val(),
            }, function (data) {
                $('#mrpSelect').val('');
                if(data.status === true && (Object.keys(data.data).length > 0)) {
                    var price = parseFloat(data.data.price).toFixed(2);
                    var currency = data.data.curr;
                    if (price == null || currency == null) {
                        $('#mrpSelect').html('');
                        $('#currencySelect').val('');
                        $('input#discountSelect').prop("readonly", true);
                        $('input#sellingPriceSelect').prop("readonly", true);
                        return false;
                    }
                    $('#mrpSelect').val(price);
                    $('#sellingPriceSelect').val(price);
                    $('#discountSelect').val(0);
                    $('#currencySelect').val(currency);
                    $('input#discountSelect').prop("readonly", false);
                    $('input#sellingPriceSelect').prop("readonly", false);
                    Payment.calculateTotalSP();
                } else {
                    $('#mrpSelect').html('');
                    $('#currencySelect').val('');
                    $('#discountSelect').val('');
                    $('#sellingPriceSelect').val('');
                    $('input#discountSelect').prop("readonly", true);
                    $('input#sellingPriceSelect').prop("readonly", true);
                    Payment.calculateTotalSP();

                }
            });
        });
    },
    fetchPrice: function () {
        $('select#accessDaySelect').change(function () {
            var countryId = parseInt($('select#country').val());
            var trainingTypeId = parseInt($('select#trainingTypeSelect').val());
            var productId = parseInt(Payment.selectedProductId);
            var accessDays = parseInt($('select#accessDaySelect').val());
            var productTypeId = parseInt($('select#productTypeSelect').val());
            var productSubTypeId = parseInt($('select#payment_sub_type').val());
            var paymentSubTypeId = parseInt($('#payment_sub_type').val());
            var sellingMode =  $('#isPaidSelect').val();
            Payment.resetExamDetails();

            if (accessDays == 0) {
                $('#mrpSelect').val('');
                $('#currencySelect').val('');
                $('#discountSelect').val('');
                $('#sellingPriceSelect').val('');
                $('input#discountSelect').prop("readonly", true);
                $('input#sellingPriceSelect').prop("readonly", true);
                Payment.calculateTotalSP();
            } else {
                $.apiCall('getCoursePrice', {
                    countryId: countryId,
                    courseId: productId,
                    trainingId: trainingTypeId,
                    accessDays: accessDays,
                    productTypeId: productTypeId
                }, function (data) {
                    $('#mrpSelect').val('');
                    if (data.status === true && (Object.keys(data.data).length > 0)) {
                        var price = parseFloat(data.data.price).toFixed(2);
                        var currency = data.data.curr;
                        if (price == null || currency == null) {
                            $('#mrpSelect').html('');
                            $('#discountSelect').val('');
                            $('#currencySelect').val('');
                            $('#sellingPriceSelect').val('');
                            $('input#discountSelect').prop("readonly", true);
                            $('input#sellingPriceSelect').prop("readonly", true);
                            return false;
                        }
                        $('#mrpSelect').val(price);
                        $('#sellingPriceSelect').val(price);
                        $('#discountSelect').val(0);
                        $('#currencySelect').val(currency);
                        $('input#discountSelect').prop("readonly", false);
                        $('input#sellingPriceSelect').prop("readonly", false);

                        /*Get Exam details*/
                        var data = {};
                        data.product_type_id = productTypeId;
                        data.product_id = productId;
                        data.country_id = countryId;
                        data.productSubTypeId = productSubTypeId;
                        if (sellingMode == 'paid' || paymentSubTypeId === extensionPaymentType) {
                            data.method = 'getCourseOfferings';
                            Payment.getExamDetails(data);
                        }
                        Payment.calculateTotalSP();
                    } else {
                        $('#mrpSelect').html('');
                        $('#currencySelect').val('');
                        $('#discountSelect').val('');
                        $('#sellingPriceSelect').val('');
                        $('input#discountSelect').prop("readonly", true);
                        $('input#sellingPriceSelect').prop("readonly", true);
                        Payment.calculateTotalSP();

                    }
                });
            }
        });
    },
    getExamDetails: function(data){
        $.ajax({
            type: "GET",
            url: baseUrl+"/api/v3",
            dataType: "JSON",
            data: data,
            success:function(res){
                if(res.status){
                    if(res.data.length != 0){
                        var exams = ' ';
                        $.each(res.data, function(index, val) {
                            exams = exams+val.voucherName+' - '+val.cost+' '+val.currencyCode+' | ';
                        });
                        exams = exams.substring(0, exams.length-2);
                        if(exams.length > 0){
                            if(data.productSubTypeId == extensionPaymentType){
                                $('.exams_list').text("Note: Exam validity won't get extended");
                                return true;
                            }else{
                                $('#product-row-main .exam_inclusion_text .inclusion_text').text('Inclusive of Exam:');
                                $('#product-row-main .exam_inclusion_text .exams_list').html(exams);   
                            }
                        }
                    }
                }
            }
        });
    },
    resetExamDetails: function(){
        $('#product-row-main .exam_inclusion_text .inclusion_text').empty();
        $('#product-row-main .exam_inclusion_text .exams_list').empty();
    },
    calculateDiscount: function() {
        var discountSelector = $('input#discountSelect');
        $(discountSelector).keyup(function () {
            var discountVal = discountSelector.val();

            if(!(discountVal >= 0 && discountVal <= 100)){
                discountSelector.val(0)
                alert('Discount Percentage should be between 0 to 100');
            }

            Payment.applyRuleDiscount(discountSelector, true);
            Payment.calculateTotalSP();
        });

        $('input#sellingPriceSelect').focusout(function () {
            var mrp = parseFloat($('#mrpSelect').val());

            var sp = parseFloat($('#sellingPriceSelect').val().replace(/,/g, ""));
            $('#sellingPriceSelect').val(sp);
            if (isNaN(parseFloat(sp)) || sp < 0 || sp > mrp) {
                sp = mrp;
                $('#sellingPriceSelect').val(sp);
            }

            var discount = parseFloat(((mrp - sp)/mrp)*100).toFixed(2);
            if(isNaN(discount)){
                discount = 0;
            }
            if(isNaN(parseFloat(sp)) && (mrp == '' || isNaN(parseFloat(mrp)))) {
                $('#sellingPriceSelect').val('');
                discount = '';
            }
            $('#discountSelect').val(discount);
            Payment.applyRuleDiscount(discountSelector, false);
            Payment.calculateTotalSP();
        });
    },

    calculateAdvanceAmount: function () {
        var advanceAmount = $('input#advance-amount');
        $(advanceAmount).keyup(function (e) {
            var advanceAmountValue = advanceAmount.val();
            var number = advanceAmountValue.split('.');
            if (number.length == 2 && number[1].length > 2){
                 advanceAmount.val("");
                 alert('Maximum  2 decimal digits are allowed.');
            }
            if (!(advanceAmountValue >= 0)){
                advanceAmount.val("");
                alert('Please enter a valid advance amount.');
            }
            Payment.calculateTotalSP();
            if ($('#balance-due').text() < 1) {
                advanceAmount.val("");
                alert("Balance amount for partial payment should be equal to or greater than 1.");
                Payment.calculateTotalSP();
            }
        });
    },
    validateContactNo: function () {
        $($("input#contactNumber")).focusout(function (e) {
            console.log(e.keyup);
            contactNoResult = Payment.validateContactNoResult($("input#contactNumber").val());
            if (!($.isEmptyObject(contactNoResult)) && contactNoResult.status === false) {
                $("input#contactNumber").addClass('input-error');
                alert(contactNoResult.msg);
                return false;
            }
            $("input#contactNumber").removeClass('input-error');            
        });
    },
    applyRuleDiscount: function (obj, updateSP = true) {
        console.log(updateSP);
        var userDiscount = parseFloat($('#discountSelect').val());
        var maxDiscount = parseInt($(obj).data('max'));
        if (userDiscount > maxDiscount) {
            $('#discountSelect').val(maxDiscount);
        }

        if (updateSP == true) {
            var mrp = parseFloat($('#mrpSelect').val());
            var discount = parseFloat($('#discountSelect').val());
            if (isNaN(parseFloat(discount))) {
                discount = 0;
            }
            var sp = parseFloat(mrp - (mrp * discount / 100)).toFixed(2);
            if (isNaN(sp)) {
                sp = 0;
            }
            $('#sellingPriceSelect').val(sp);
        }
    },

    resetTaxElement: function(){
        $('#serviceTaxPer').val('');
        $('#currency').val('');
    },
    calculateTotalSP: function() {
        var totalSP = totalAmt = 0;

        var billingEmail = $('input#email').val().trim();
        var learnerEmail = $('input#additionalEmail').val().trim();
        var paymentSubType = parseInt($('option:selected', '#payment_sub_type').val());

        if(learnerEmail == '' || learnerEmail == ','){
            learnerEmail = billingEmail;
        }
//        if ($("#hasLearner").is(':checked') && $('input#additionalEmail').val().trim() !== "") {
//            learnerEmail += "," + $('input#additionalEmail').val();
//        }

        learnerEmail = learnerEmail.split(",");
        learnerEmail = findUniqueArrayElement(learnerEmail);
//        learnerEmail = learnerEmail.filter(function (x, i, a) {
//            if (x != '') {
//                return a.indexOf(x) == i;
//            }
//        });
        var learnerCount = learnerEmail.length;

        var inputSP = parseFloat($('#sellingPriceSelect').val());
        if (!isNaN(inputSP)) {
            totalSP += inputSP;
        }

        var prices = $("[name='sellingPrice[]']") .map(function(){return $(this).val();}).get();
        prices.forEach(function(item){
            if (!isNaN(item)) {
                totalSP += parseFloat(item);
            }
        });

        var totalPrice = totalAmt = totalSP * learnerCount;

        if (Payment.eligiblePartPaymentAmount > 0 && (totalAmt >= Payment.eligiblePartPaymentAmount)) {
            $('#advance-amount').prop("disabled", false);
            removeTooltip($('#advance-amount-tooltip-ref'));
        } else if (Payment.eligiblePartPaymentAmount > 0 && (totalAmt < Payment.eligiblePartPaymentAmount)) {
            $('#advance-amount').prop("disabled", true);
            $('#advance-amount').val('');
            $('#balance-due').html("0.00");
            $('#tax-amount').html("0.00");
            var content = 'For partial payment\nTotal amount should be\nminimum ' + Payment.eligiblePartPaymentAmount + " " + $("#currency").val();
            createTooltip($('#advance-amount-tooltip-ref'), $('#advance-amount-wrapper'), content);
        } else {
            $('#advance-amount').prop("disabled", true);
        }

        var advanceAmount = parseFloat($('#advance-amount').val());
        $('#balance-due').html("0.00");
        $('#tax-amount').html("0.00");

//        var taxAmt = totalAmt = 0;
        var taxAmt = 0;
        var taxRate = parseFloat($("#taxPercentage").val());
        if (!isNaN(taxRate)) {
//         If payment type is partial first then total price will be  advance amount paid and tax is calculated on advance amount
            if (paymentSubType == partialFirstPaymentType) {
                if (advanceAmount < 1 || advanceAmount >= totalAmt) {
                    $('#advance-amount').val('');
                    $('#balance-due').html("0.00");
                    $('#tax-amount').html("0.00");
                    taxAmt = (0 * taxRate) / 100;
                    alert("Advance amount should  be greater than 1 and less than Total Amount");
                } else if(advanceAmount < totalAmt){
                    taxAmt = (advanceAmount * taxRate) / 100;
                    totalPrice = advanceAmount;
                }else{
                    taxAmt = (0 * taxRate) / 100;
                }
            } else {
                //            taxAmt = (totalSP * taxRate) / 100;
                taxAmt = (totalPrice * taxRate) / 100;
                //            totalAmt = totalSP + taxAmt;
            }
        }

        if (paymentSubType == partialFirstPaymentType) {
            if ($('#advance-amount').val() == '') {
                totalPrice = 0;
            }
        }
        var balanceDue = 0;
        if (totalAmt > totalPrice) {
            balanceDue = totalAmt - totalPrice;
        }
        
        $("#bill-amount").html(parseFloat(totalSP).toFixed(2));
        $("#tax-amount").html(parseFloat(taxAmt).toFixed(2));
        $("#learner-count").html(learnerCount);
        $("#net-total").html(parseFloat(totalAmt).toFixed(2));
//        $("#net-total-all").html("<strong>" + parseFloat(totalAmt * learnerCount).toFixed(2) + "</strong>");
        $("#net-total-all").html("<strong>" + parseFloat(totalPrice + taxAmt).toFixed(2) + "</strong>");
//        $('#totalSp').val(totalSP * learnerCount);
        $('#totalSp').val(totalAmt);
        if (balanceDue > 0) {
            if (taxAmt > 0) {
                $('#balance-due').html(parseFloat(balanceDue).toFixed(2));
                $('#balance-due-label1').html(" + tax)")
            } else
                $('#balance-due').html(parseFloat(balanceDue).toFixed(2));
        }
    },
    showBackendPaymentField: function() {
        $('#payment-mode').change(function() {
            Payment.resetAll();
            $('div.backend-payment-form').hide();
            $('button#payment-generate-button').html('Generate Custom Payment Url');
            if ($(this,'option:selected').val()=='backend-payment') {
                //$('div.backend-payment-form').show();
                $("#country option[value=6]").wrap('<span/>');
                $("#country option[value=34]").wrap('<span/>');
                $('button#payment-generate-button').html('Generate Backend Payment');
            } else {
                $("#country option[value=6]").unwrap();
                $("#country option[value=34]").unwrap();
                Payment.fileToUpload = '';
            }
            $('#trainingTypeSelect').change();
            var countryId = parseInt($('option:selected', '#country').val());
            var paymentSubType = parseInt($('option:selected', '#payment_sub_type').val());
            if ($('option:selected', '#payment-mode').val() == 'custom-payment' && countryId == countryIdIndia && (validPaymentSubType.indexOf(paymentSubType) != -1)) {
                $("#emiOptions").parent().show();
            } else {
                $("#emiOptions").val('');
                $("#emiOptions").parent().hide();
            }
            if ($('option:selected', '#payment-mode').val() == 'custom-payment' && countryId == 34 && paymentSubType == 1) {
                $("#isAffirm").parent().show();
            } else {
                $("#isAffirm").prop("checked", false);
                $("#isAffirm").parent().hide();
            }
            if((typeof $(this,'option:selected').val() != 'undefined' && $(this,'option:selected').val() == 'custom-payment' && typeof paymentSubType != 'undefined' && paymentSubType == 1)) {
                $("#productTypeSelect option[value=5]").show();
            } else {
                $("#productTypeSelect option[value=5]").hide();
            }
            $('.inclusion_text').empty();
            $('.exams_list').empty();
        });
    },
    validateEmail: function(email) {
        if (email == "") {
            return false;
        }
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email));
    },
    validateContactNoResult: function (contactNo) {
        var errMsg = {status: false, msg: "Invalid phone number."};
        if (contactNo == '') {
            errMsg.status = false;
            errMsg.msg = "Phone number cannot be empty";
            return errMsg;
        }
        var re = /^\d+$/;

        if (!re.test(contactNo)) {
            errMsg.status = false;
            errMsg.msg = "Phone number invalid.";
            return errMsg;
        }
        var checkIf0Regex = /^0[0-9].*$/;
        if(checkIf0Regex.test(contactNo) === true) {
            errMsg.status = false;
            errMsg.msg = "Please remove preceding 0 from phone number";
            return errMsg;
        }

        if(contactNo.length == 1 && contactNo == 0) {
            errMsg.status = false;
            errMsg.msg = "Phone number cannot be 0";
            return errMsg;
        }

        if (contactNo.length > 10) {
            errMsg.status = false;
            errMsg.msg = "Phone number cannot be more than 10 digits.";
            return errMsg;
        }
        var countryId = parseInt($('select#country').val());
        if (countryId == 6) {
            if (contactNo.length < 8) {
                errMsg.status = false;
                errMsg.msg = "Phone number should be atleast 8 digits.";
                return errMsg;
            }
        }
        errMsg.status = true;
        errMsg.msg = "Valid phone number.";
        return errMsg;
    },
    addDefaultRow: function (approval=false,responseData=Object(null)) {
        Payment.validateProducts();
        if (Payment.hasError === false) {
            var selectedKey = $('#productTypeSelect').val() + "-" + Payment.selectedProductId;
            var workshop = $('option:selected', '#workshopSelect').data('wsdates');
            if(typeof workshop == 'undefined'){
                workshop = '';
            }
            selectedProducts.push(selectedKey);
            var prod = '<div class="form_field_set small_input_box product-row">';
            var innerHtml = $('.product-row-template').html();
            innerHtml = innerHtml.replace("{productType}", $('option:selected', '#productTypeSelect').data('producttypename'));
            innerHtml = innerHtml.replace("{productTypeId}", $('#productTypeSelect').val());
            innerHtml = innerHtml.replace("{isFree}", $('option:selected', '#isPaidSelect').data('paidtype'));
            innerHtml = innerHtml.replace("{product}", $('input#productSelect').val());
            innerHtml = innerHtml.replace("{productId}", Payment.selectedProductId);
            innerHtml = innerHtml.replace("{trainingType}", $('option:selected', '#trainingTypeSelect').data('trainingtype'));
            innerHtml = innerHtml.replace("{trainingTypeId}", $('#trainingTypeSelect').val());
            innerHtml = innerHtml.replace("{workshop}", workshop);
            innerHtml = innerHtml.replace("{workshopId}", $('#workshopSelect').val());
            innerHtml = innerHtml.replace("{accessDay}", $('#accessDaySelect').val());
            innerHtml = innerHtml.replace("{mrp}", $('#mrpSelect').val());
//            innerHtml = innerHtml.replace("{currency}", $('#currencySelect').val());
            innerHtml = innerHtml.replace("{discount}", $('#discountSelect').val());
            innerHtml = innerHtml.replace("{sellingPrice}", $('#sellingPriceSelect').val());
            innerHtml = innerHtml.replace("{dataProductTypeId}", $('#productTypeSelect').val());
            innerHtml = innerHtml.replace("{dataProductId}", Payment.selectedProductId);
            if(approval){
              prod += '<input name="approvalRequest" hidden="true" value="1" id="approvalRequest">';
            }
            prod += innerHtml + "</div>";
            $("#selected-products").append(prod);
            Payment.selectedProductObj[selectedKey] = {
                product_type_id: $('#productTypeSelect').val(),
                product_type_name: $('option:selected', '#productTypeSelect').data('producttypename'),
                product_id: Payment.selectedProductId,
                product_name: $('input#productSelect').attr('data-coursename'),
                training_type_id: $('option:selected', '#trainingTypeSelect').val(),
                training_type_name: $('option:selected', '#trainingTypeSelect').data('trainingtype'),
                workshop_id: $('#workshopSelect').val(),
                workshop_dates: $('option:selected', '#workshopSelect').data('wsdates'),
                access_days: $('#accessDaySelect').val(),
                price_id: $('option:selected','#accessDaySelect').data('price_id'),
                discount_percentage: $('#discountSelect').val(),
                mrp: $('#mrpSelect').val(),
                currency: $('#currencySelect').val(),
                selling_price: $('#sellingPriceSelect').val() == "0" ? parseFloat($('#sellingPriceSelect').val()).toFixed(2) : $('#sellingPriceSelect').val(),
                allowed_discount:responseData.allowed_discount,
                selling_mode: $('#isPaidSelect').val(),
            };
            if(approval){
               Payment.selectedProductObj[selectedKey]['user_role']=responseData.user_role;
               Payment.selectedProductObj[selectedKey]['manager_role']=responseData.manager_role;
            }

            var inclusion_text = $('#product-row-main .exam_inclusion_text .inclusion_text').text();
            var exams_list = $('#product-row-main .exam_inclusion_text .exams_list').html();

            $('#selected-products div.product-row:last .inclusion_text').text(inclusion_text);
            $('#selected-products div.product-row:last .exams_list').html(exams_list);

            Payment.resetExamDetails();
            Payment.resetForm();
        }
        return;
    },
    courseAccessTypeChange: function () {

        $('#isPaidSelect').change(function () {
            Payment.courseArr = [];
            Payment.resetProductAutoComplete();
            Payment.resetExamDetails();
            var removeCourses = [];
            $('input#productSelect').val('');
            $('input#productSelect').attr('data-courseName','');
            $('select#trainingTypeSelect').html("");
            $('select#workshopSelect').html("");
            $('select#accessDaySelect').html("");
            $('#mrpSelect').val('');
            $('#currencySelect').val('');
            $('#discountSelect').val('');
            $('input#sellingPriceSelect').prop("readonly", true);
            $('input#discountSelect').prop("readonly", true);
            $('#sellingPriceSelect').val('');
            var selectedProductType = $("#productTypeSelect").val();
            var selectedCourseAccessType = $('select#isPaidSelect').val().toLowerCase();
            if (selectedProductType != 0 && selectedCourseAccessType != 0) {
                var data = allCourseData[selectedProductType][selectedCourseAccessType];
                if(typeof removedCourses[selectedProductType] != 'undefined') {
                   removeCourses =  $.map(removedCourses[selectedProductType], function(el) { return el });   
                }
               /* var html = "<option value='0'>--Select--</option>";
                $.each(data, function (element, value) {
                    if ($.inArray($('#productTypeSelect').val() + "-" + element, selectedProducts) != -1) {
                        html += '<option class="hidden" value="' + element + '" data-product="' + value + '">' + value + '</option>';
                    } else {
                        html += '<option value="' + element + '" data-product="' + value + '">' + value + '</option>';
                    }
                });
                $('input#productSelect').closest('li').show();
                $('input#productSelect').html(html);
                 */
                 $.each(data, function (key, val) {
                    if ((removeCourses.indexOf(key)==-1) && (($("#emiOptions option:selected").val() == 'zestMoney' || $("#emiOptions option:selected").val() == 'eduvanz' || $("#emiOptions option:selected").val() == 'liquiloan') )) {
                        course = {value: key, label: val+' (Id-'+key+')', courseName:val};
                        if (!($.inArray($('#productTypeSelect').val() + "-" + key, selectedProducts) != -1)) {
                            Payment.courseArr.push(course);
                        }
                    }
                    if (($("#emiOptions option:selected").val() != 'zestMoney' && $("#emiOptions option:selected").val() != 'eduvanz' && $("#emiOptions option:selected").val() != 'liquiloan')) {
                        course = {value: key, label: val+' (Id-'+key+')', courseName:val};
//                        console.log(course,'---------------------------');
                        if (!($.inArray($('#productTypeSelect').val() + "-" + key, selectedProducts) != -1)) {
                            Payment.courseArr.push(course);
                        }
                    }
                 });
                Payment.productAutoComplete();
            } else {
                $('input#productSelect').val("");
                $('input#productSelect').attr('data-courseName','');
            }
        });
        $("#emiOptions").change(function () {
            Payment.courseArr = [];
            var removeCourses = [];
            //Payment.resetProductAutoComplete();
            $('input#productSelect').val('');
            $('input#productSelect').attr('data-courseName','');
            $('select#trainingTypeSelect').html("");
            $('select#workshopSelect').html("");
            $('select#accessDaySelect').html("");
            $('#mrpSelect').val('');
            $('#currencySelect').val('');
            $('#discountSelect').val('');
            $('#sellingPriceSelect').val('');
            Payment.resetExamDetails();
            var selectedProductType  = 0;
            if(typeof $("#productTypeSelect").val() !="undefined" && $("#productTypeSelect").val() !== null) {
                var selectedProductType = $("#productTypeSelect").val();
            }
            var selectedCourseAccessType = 0 ;
            if(typeof  $('select#isPaidSelect').val() !="undefined" && $('select#isPaidSelect').val() !== null ) {
                 selectedCourseAccessType = $('select#isPaidSelect').val().toLowerCase();
            }
            if (selectedProductType != 0 && selectedCourseAccessType != 0) {
                var data = allCourseData[selectedProductType][selectedCourseAccessType];
                removeCourses =  $.map(removedCourses[selectedProductType], function(el) { return el });
                 $.each(data, function (key, val) {
                    if ((removeCourses.indexOf(key)==-1) && ( $("#emiOptions option:selected").val() == 'zestMoney' || $("#emiOptions option:selected").val() == 'eduvanz' || $("#emiOptions option:selected").val() == 'liquiloan' )) {
                         course = {value: key, label: val+' (Id-'+key+')', courseName:val};
                        if (!($.inArray($('#productTypeSelect').val() + "-" + key, selectedProducts) != -1)) {
                            Payment.courseArr.push(course);
                        }
                    }
                    if ($("#emiOptions option:selected").val() != 'zestMoney' && $("#emiOptions option:selected").val() != 'eduvanz' && $("#emiOptions option:selected").val() != 'liquiloan') {
                        course = {value: key, label: val+' (Id-'+key+')', courseName:val};
                        if (!($.inArray($('#productTypeSelect').val() + "-" + key, selectedProducts) != -1)) {
                            Payment.courseArr.push(course);
                        }
                    }
                 });
                Payment.productAutoComplete();
            } else {
                $('input#productSelect').val("");
                $('input#productSelect').attr('data-courseName','');
            }
        });
        
        $("#isAffirm").change(function () {
            Payment.courseArr = [];
            $('#isPaidSelect').val('');
            $('input#productSelect').val('');
            $('input#productSelect').attr('data-courseName','');
            $('select#trainingTypeSelect').html("");
            $('select#workshopSelect').html("");
            $('select#accessDaySelect').html("");
            $('#mrpSelect').val('');
            $('#currencySelect').val('');
            $('#discountSelect').val('');
            $('#sellingPriceSelect').val('');
            Payment.resetExamDetails();
            Payment.listCourseAccessType();
            Payment.productAutoComplete();
            Payment.resetProductAutoComplete();
        });
       /* $("#isAffirm").change(function () {
            Payment.courseArr = [];
            var removeCourses = [];
            //Payment.resetProductAutoComplete();
            $('input#productSelect').val('');
            $('select#trainingTypeSelect').html("");
            $('select#workshopSelect').html("");
            $('select#accessDaySelect').html("");
            $('#mrpSelect').val('');
            $('#currencySelect').val('');
            $('#discountSelect').val('');
            $('#sellingPriceSelect').val('');
            var selectedProductType  = 0;
            if(typeof $("#productTypeSelect").val() !="undefined" && $("#productTypeSelect").val() !== null) {
                var selectedProductType = $("#productTypeSelect").val();
            }
            var selectedCourseAccessType = 0 ;
            if(typeof  $('select#isPaidSelect').val() !="undefined" && $('select#isPaidSelect').val() !== null ) {
                 selectedCourseAccessType = $('select#isPaidSelect').val().toLowerCase();
            }
            if (selectedProductType != 0 && selectedCourseAccessType != 0) {
                var data = allCourseData[selectedProductType][selectedCourseAccessType];
                removeCourses =  $.map(removedCourses[selectedProductType], function(el) { return el });
                 $.each(data, function (key, val) {
                    if ((removeCourses.indexOf(key)==-1) && $("#isAffirm").is(':checked')) {
                        course = {value: key, label: val};
                        if (!($.inArray($('#productTypeSelect').val() + "-" + key, selectedProducts) != -1)) {
                            Payment.courseArr.push(course);
                        }
                    }
                    if (!$("#isAffirm").is(':checked')) {
                        course = {value: key, label: val};
                        if (!($.inArray($('#productTypeSelect').val() + "-" + key, selectedProducts) != -1)) {
                            Payment.courseArr.push(course);
                        }
                    }
                 });
                Payment.productAutoComplete();
            } else {
                $('input#productSelect').val("");
            }
        });*/
    },
    resetAll: function(paymentSubType=true) {
        $('#productFieldset').prop("disabled", true);
        $('#product-row-main').show();
        $('#productFieldset').find('input:text, select').val('');
        $('#selected-products').html("");
        $('form[name=payment]').find('input:text').val('');
        $('#pcity_id').html("");
        $('#country').val('');
        Payment.calculateTotalSP();
        Payment.selectedProductObj = {};
        selectedProducts = [];
        Payment.resetTaxElement();
        Payment.setTaxLabel(0);
        Payment.approvalCount = 0;
        $('#taxPercentage').val('');
        $('#regionName').val('');
        if (paymentSubType) {
            $('#payment_sub_type').val('');
        }
        $('.reseller-regular').addClass('hidden');
        $('select#reconsile_id').children().remove().end();
        $('.course-upgrade').addClass('hidden');
        $('#productTypeSelect').prop('disabled',false);
        $('#isPaidSelect').prop('disabled',false);
        $('#trainingTypeSelect').prop('disabled',false);
        $("#emiOptions").val('');
        $("#emiOptions").parent().hide();
        $("#isAffirm").prop("checked", false);
        $("#isAffirm").parent().hide();
        $('#advance-amount').prop("disabled", true);
        $('#tax-label').removeClass('hidden');
        $('#tax-amount').removeClass('hidden');
        $('#hasLearner').attr('checked',false);
        $('#hasAssignee').attr('checked',false);
        $(".has-learner").addClass('hidden');
        $('#advance-amount-label').addClass('hidden');
        $('#advance-amount-wrapper').addClass('hidden');
        $('#balance-due-label').addClass('hidden');
        $('#balance-due').addClass('hidden');
        $('#amount-paid-label').addClass('hidden');
        $('#amount-paid').addClass('hidden');
        $('#pending-amount-label').addClass('hidden');
        $('#refunded-amount-label').removeClass('hidden');
        $('#refunded-amount').removeClass('hidden');
        $('#pending-amount').addClass('hidden');
        $('#amount-paid').html('0.00');
        $('#pending-amount').html('0.00');
        $('#amount-paid-tax').addClass('hidden');
        $('#partial-payment-message').addClass('hidden');
        $('#refunded-amount').addClass('hidden');
        $('#refunded-amount-label').addClass('hidden');
    },

    getTax: function (countryId, state,extension=0) {
        $.apiCall('getCurrencyDetailsByCountry', {
            countryId: countryId,
            state: state
        }, function (response) {
            if (response.status === 'success') {
                $('#serviceTaxPer').val(JSON.stringify(response.data));
                $('#taxPercentage').val(response.data.totalTax);
                $('#currency').val(response.data.code);
                Payment.setTaxLabel(response.data.totalTax);
            }else{
                Payment.resetTaxElement();
            }
        },extension);
    },
    setTaxLabel: function(tax){
        $('#tax-label').html('Tax ('+parseFloat(tax).toFixed(2) +'%):');
    },
//    uploadFile: function() {
//        $('input[type=file]').on('change', function (event) {
//            console.log("Before - ", Payment.fileToUpload);
////            Payment.fileToUpload = '';
//            Payment.fileToUpload = event.target.files;
//            console.log("After", Payment.fileToUpload);
//        });
//    }
    resetProductAutoComplete: function () {
        if ($('#isPaidSelect').val() == 0 || $('#productTypeSelect').val() == 0) {
            Payment.courseArr = [];
            Payment.productAutoComplete();
            $('#productSelect').prop("disabled", true);
        }
    },
    resellerRegularSelect:function(){
        $('#reseller_account_name').on('change', function () {
            Payment.resetRegularSelect();
            $('#country').prop('disabled',true);
              $.ajax({
                        url: baseUrl + "/api/v3?method=fetchAffiliateByAffiliateId",
                        dataType: 'json',
                        type: "POST",
                        data: {affiliate_id:$('#reseller_account_name option:selected').val()},
                        success: function(data) {
                                  $('#country').val(data.affiliateCountryId);
                                  $('select[name="pcity_id"]').append(
                                  $('<option></option>').val(data.city_id).html(data.city_name).attr('data-region',data.region_name)).val(data.city_id).change().attr('disabled', true);
                                  $('#email').val(data.billing_email).prop('readonly', true);
                                  $('#currency').val(data.currencyCode).prop('readonly', true);
                                  var number = data.contactNumber;
                                  if (number && number.indexOf('-') != -1)
                                  {
                                      if(number.indexOf('+')!=-1)
                                      {number = number.slice(1);}
                                      var contactNo=(number).split('-',2);
                                      $('#callingCode').val(contactNo[0]).prop('readonly', true);
                                      $('#contactNumber').val(contactNo[1]).prop('readonly', true);
                                      $('#country').attr('disabled', true);  
                                  }
                                  else
                                  { 
                                       var callCode = $('option:selected',"#country").attr('data-calling-code');
                                       $('#callingCode').val(callCode).prop('readonly', true);
                                       $('#country').attr('disabled', true);  
                                  }
                       }
             });
        });           
    },
    resetRegularSelect: function () {
        $('#product-row-main').show();
        $('#country').val('');
        $('select[name="pcity_id"]').children().remove().end().attr('disabled', false);
        $('#currency').val('');
        $('#callingCode').val('').prop('readonly', false);
        $('#contactNumber').val('').prop('readonly', false);
        $('#advance-amount').prop('disabled', true);
        var payment_sub_type_idd = $('#payment_sub_type').val();

        if (payment_sub_type_idd != upgradationPaymentType && payment_sub_type_idd != extensionPaymentType && payment_sub_type_idd != partialSubsequentPaymentType) {
            $('#email').val('').prop('readonly', false);
            $('#country').attr('disabled', false);
        }
        if (payment_sub_type_idd == partialFirstPaymentType) {
            $('#advance-amount-label').removeClass('hidden');
            $('#advance-amount-wrapper').removeClass('hidden');
            $('#balance-due-label').removeClass('hidden');
            $('#balance-due').removeClass('hidden');
            $('#balance-due').html('0.00');
        } 
        if (payment_sub_type_idd == partialSubsequentPaymentType) {
            $('#amount-paid-label').removeClass('hidden');
            $('#amount-paid').removeClass('hidden');
            $('#pending-amount-label').removeClass('hidden');
            $('#refunded-amount-label').removeClass('hidden');
            $('#refunded-amount').removeClass('hidden');
            $('#pending-amount').removeClass('hidden');
        }
        $('#productFieldset').prop("disabled", true);
        $('#productFieldset').find('input:text, select').val('');
        $('#selected-products').html("");
        $('select#accessDaySelect').html("");
        Payment.popUpAccessDaysAlert = 1;
        if (payment_sub_type_idd == complimentaryPaymentType) {
            // $('#productTypeSelect option[value=2]').hide();
            $('#productTypeSelect option[value=5]').hide();
        } else {
            $('#productTypeSelect option[value=2]').show();
            if ($('option:selected', '#payment-mode').val() == 'custom-payment') {
                $('#productTypeSelect option[value=5]').show();
            }
        }
    }
};

var PaymentList = {
    fileToUpload : '',
    init: function () {
        PaymentList.hasError = false;
        PaymentList.uploadAttachmentValidation();
        PaymentList.submitUploadedAttachment();
        PaymentList.uploadFile();
        PaymentList.closeBtn();
        PaymentList.clearForm();
        PaymentList.approvePaymentValidation();
        PaymentList.closeBackendApprovalPopup();
        PaymentList.backendPaymentApproval();
    },

    uploadAttachmentValidation: function () {
        $('#data-table').on('click', '#upload-attachment', function (e) {
            var params = {};
            params.paymentId = $(this).data('payment-id');
            params.role = "SIMPLEX_PAYMENT";
            var form_data = new FormData();
            form_data.append('params', JSON.stringify(params));
            $.ajax({
//                url: baseUrl + "/sso/payment/get-payment-popup",
                url: baseUrl + "/api/v3?method=validateRole",
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function (res) {
                    if (res.status === true) {
                        $('#get-payment-block').css("display", "block");
                        $('#get-payment-block #payment_id_value').val(params.paymentId);
                    } else {
                        alert(res.message);
                    }
                },
                error: function(jqXHR, exception) {
                    console.log("Exception ====", exception);
                }
            });
        });
    },
    submitUploadedAttachment: function () {
        $('#uploadFile').click(function () {
            var params = {};

            params.paymentMethod = $('option:selected', '#paymentMethod').val();
            params.remark = $('#remark').val().trim();
            params.paymentId = $('#payment_id_value').val();
            params.referenceNo = $('#referenceNo').val().trim();

            var form_data = new FormData();
            var file_data = PaymentList.fileToUpload[0];
            form_data.append('file', file_data);
            form_data.append('params', JSON.stringify(params));
            Payment.showLoader();
            $.ajax({
                url: baseUrl + "/sso/payment/upload-attachment",
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function (res) {
                   if(res.status === true) {
                       alert(res.message);
                       PaymentList.clearForm();
                       $('#get-payment-block').css("display", "none");
                       $('#upload-attachment').html("Approve");
                       window.location.reload();
                   } else {
                       alert(res.message);
                       PaymentList.clearForm();
                   }
                },
                error: function(jqXHR, exception) {
                    console.log("Exception ====", exception);
                },
                complete: function(){
                    Payment.hideLoader();
                }
            });

        });
    },
    uploadFile: function () {
        $('input[type=file]').on('change', function (event) {
            PaymentList.fileToUpload = event.target.files;
        });
    },
    closeBtn: function() {
        $('.close_btn').on('click', function(event) {
           PaymentList.clearForm();
           $('#get-payment-block').css("display", "none");
        });
    },
    clearForm: function () {
        $('form[name=backend-payment-upload]').find('input:text, select, input:file').val('');
    },
    approvePaymentValidation: function() {
          $('#data-table').on('click', '#approve-payment', function (e) {
            var params = {};
            params.paymentId = $(this).data('payment-id');
            params.role = "SIMPLEX_PAYMENT_APPROVE";
            var form_data = new FormData();
            form_data.append('params', JSON.stringify(params));
            Payment.showLoader();
            $.ajax({
//                url: baseUrl + "/sso/payment/approve-payment",
                url: baseUrl + "/api/v3?method=validateRole",
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function (res) {
                    if (res.status === true) {
//                        PaymentList.showApprovalPopup(params.paymentId);
                        $('#approve-payment-dialog').css("display", "block");
                        $('#approve-payment-dialog #payment_id').val(params.paymentId);
                    } else {
                        alert(res.message);
                    }
                },
                error: function(jqXHR, exception) {
                    console.log("Exception ====", exception);
                },
                complete: function () {
                    Payment.hideLoader();
                }
            });
        });
    },
    backendPaymentApproval: function () {
        $('#approvePayment').click(function () {
            var params = {};
            params.paymentId = $('#payment_id').val();
            Payment.showLoader();
            setTimeout(function () {
                $.ajax({
                    type: "POST",
                    url: baseUrl + "/sso/payment/approve-payment",
                    dataType: 'json',
                    async: false,
                    data: params,
                    success: function (res) {
                        if (res.status === true) {
                            alert(res.message);
                            $('#approve-payment-dialog').css("display", "none");
                            $('#approve-payment').html("Approved");
                            window.location.reload();
                        } else {
                            alert(res.message);
                            $('#approve-payment-dialog').css("display", "none");
                            $('#payment_id').val('');
                        }
                    },
                    error: function (jqXHR, exception) {
                        console.log("Exception ====", exception);
                    },
                    complete: function () {
                        Payment.hideLoader();
                    }
                });

            }, 5);
        });
    },
    closeBackendApprovalPopup : function () {
        $('#approve-payment-dialog .close-popup').click(function() {
            $('#approve-payment-dialog').css("display", "none");
            $('#payment_id').val('');
        });
    }
}


function rationalNumber() {
    $('.rational-number').on('keypress', function (e)
    {
        if (e.charCode >= 32 && e.charCode < 127 &&
                !/^-?\d*[.,]?\d*$/.test(this.value + '' + String.fromCharCode(e.charCode)))
        {
            return false;
        }
    })
}

function findUniqueArrayElement(array) {
    var uniqueEle = [];
    uniqueEle = array.filter(function (x, i, a) {
        if (x != '') {
            return a.indexOf(x) == i;
        }
    });
    return uniqueEle;
}


function examSlotInitialize(){
 examSlot.init();   
}

var examSlot={
  init:function(){
      examSlot.checkDate();
      examSlot.checkTimings();
      examSlot.examSlotCityChange();
  },
  checkTimings:function(){
      $("form#examSlot").submit(function(){
       if(($("form#examSlot #start_time").val()) >= ($("form#examSlot #end_time").val())){
           alert("StartTime after or same as EndTime");
           return false;
       }   
      });
  },
  checkDate:function(){
     $("form#examSlot").submit(function () {
            var formDate = $("form#examSlot #exam_date").val();
            var formDataTimestamp = Date.parse(formDate);
            if (isNaN(formDataTimestamp)) {
                alert("Invalid Date!");
                return false;
            }
            var currentDate = new Date();
            var currentDateTimeStamp = currentDate.getTime();

            if (formDataTimestamp < currentDateTimeStamp) {
                alert("Previous Date Not Allowed!");
                return false;
            }
            return true;
        });

  },
    examSlotCityChange: function () {
        $('select#exam_slot_city_id').change(function () {
            $.apiCall('getExamVenuesForCity', {
                cityId: $('select#exam_slot_city_id').val()
            }, function (data) {
                var html = "<option value=''>--Select--</option>";
                for (var key in data) {
                    html += '<option value="' + key + '">' + data[key] + '</option>'
                }
                $('select#exam_venue_id').closest('li').show();
                $('select#exam_venue_id').html(html);
            });
        });
    }
};

function companyPageTabber(){
    $(".company-page-tab-li").on('click', function(){
            $(".company-page-tab-li").removeClass("active");
            $(this).addClass("active");
    });
}
function displayPricingLevelOnLoad(){
    var isEditMode=$(document).find('#is_edit_mode').val();
    if($(document).find(".company-pricing-level").eq(1).val() && typeof  isEditMode =="undefined"){
     var pricingLevel = $(document).find(".company-pricing-level").eq(1).val();
        var id = $(document).find(".company-pricing-level").eq(1).attr('id');;
        var identifier = id.substr(0, id.indexOf('location_mode'));
       // console.log(pricingLevel, identifier);
        switch (parseInt(pricingLevel)){
            case 1:
                var newIdentifierClusterLabel = "#" + identifier + "cluster_id-label";
                var newIdentifierClusterSelect = "#" + identifier + "cluster_id";
                $(newIdentifierClusterLabel).show();
                $(newIdentifierClusterLabel).find('label').css('display', 'block');
                $(newIdentifierClusterSelect).show();

            break;
            case 2:
                var newIdentifierCountryLabel = "#" + identifier + "country_id-label";
                var newIdentifierCountrySelect = "#" + identifier + "country_id";
                $(newIdentifierCountryLabel).show();
                $(newIdentifierCountryLabel).find('label').css('display', 'block');
                $(newIdentifierCountrySelect).show();
            break;
        }
    }
}
function appendRemoveAllCoursePricing(){
    var enableRemoveAll=true;
    if($(document).find('#is_edit_mode').val()){
        isFlat=$(document).find('#is_flat').val();
        if(parseInt(isFlat)){
             enableRemoveAll=false;
        }
    }
    if(enableRemoveAll){
        $(document).find("div[id$='new-final_product_list-label']").append("<span style='color:red;font-weight:bold;' class='remove-all-selected-course'>Remove All From The List <span style='position:absolute;top:60px;left:210;cursor:pointer;font-size:20px;font-weight:bold;'>X</span></span>");
    }

    $(document).on('click','.remove-all-selected-course',function(e){
        var id=$(this).parent().attr('id');
        var identifier=id.substr(0, id.indexOf('final_product_list-label'));
        var finalProductListSelect=$("#"+identifier+"final_product_list");
        var finalCourseInput=$("#"+identifier+"final_course_ids");
        var mySelect=$("#"+identifier+"product_list");
        mySelect.children('option[selected="selected"]').removeAttr('selected');
        finalProductListSelect.children().remove();
        finalCourseInput.val("");
        allCourseCategoriesSelected=false;
        $(".company_product_list")[1].selectedIndex = -1;
        /**
         * Empty The selectedCourseNameAndIdArr and update.
         */
        selectedCourseNameAndIdArr={};
        $("#final-selected-courses").val("");


    });
  }

    function loadRemoveAllList(){
        var selectedCoursesStr = $("#final-selected-courses").val();
                if(selectedCoursesStr){
                    var selectedCourses = JSON.parse(selectedCoursesStr);
                    for (var key in selectedCourses) {
                    selectedVal = key;
                    selectedText = selectedCourses[selectedVal];
                    selectedCourseNameAndIdArr[selectedVal] = selectedText
                    }
                }

    }
function loadClusterCountriesMapping(){
    previous = new Array();
    $.ajax({
    url: baseUrl + "/api/v3",
            dataType: 'json',
            type: "GET",
            data: {method :'getClusterAndCountriesMapping'},
            success: function(data) {
                if(typeof data === "object" && data.status =="success"){
                   window.clusterCountryMapping = data.data;
                }
            }
    });
}

function loadTrainingsOnPricing(course_id){
    previous = new Array();
    window.trainingsOnPricing = [];
    $.ajax({
    url: baseUrl + "/api/v3",
            dataType: 'json',
            type: "GET",
            data: {method :'getTrainingsOnPricing',courseId:course_id},
            success: function(data) {
                if(typeof data === "object" && data){
                    var trainindIds = data;
                    $('form#addPricing #training_id option').each(function(){
                        var opValue = $(this).val();
                        if(opValue){
                            var splitArr = opValue.split('_');
                            var trainingId = splitArr.length == 2 ? splitArr[1] : 0;
                            if(trainingId && trainindIds.indexOf(trainingId) > -1){
                              $(this).prop("disabled",false);
                            }else{
                              $(this).prop("disabled",true);
                            }
                        }
                    })
                }
            }
    });
}

//New course page functions 
function newCoursePageChanges() {
    if ($('input[name="is_new_course_page"]:checked').val() == 1) {
        console.log('show')
        showCertificateField();
    } else {
        hideCertificateField();
    }
    $(document).on('change','input[name="is_new_course_page"]',function(){
        if ($('#is_new_course_page-1').is(':checked')) {
            showCertificateField();
        } else {
            hideCertificateField();
        }
    })
}

function showCertificateField() {
    $('.courseForm #certificate_image').show();
    $('.courseForm #certificate_image-label').show();
    $('.courseForm #certificate_value-label').show();
    $('.courseForm #certificate_value-label').siblings().show();
    $('.courseForm #certificate_alt_text').show();
    $('.courseForm #certificate_alt_text-label').show();
}

function hideCertificateField() {
    $('.courseForm #certificate_image').hide();
    $('.courseForm #certificate_image-label').hide();
    $('.courseForm #certificate_value-label').hide();
    $('.courseForm #certificate_value-label').siblings().hide();
    $('.courseForm #certificate_alt_text').hide();
    $('.courseForm #certificate_alt_text-label').hide();
}
//Course benefit section functions
$(function() {
    var valdiationLimit = function (items, limit, fieldName) {
        if (Array.isArray(items) && items.length > (limit - 1)) {
            setTimeout(function () {
                alert("Cannot select more than " + limit + " " + fieldName);
            })
            return false;
        }
        return true;
    }
    $('#contentCourse-new-jobdesignation-add').click(function () {
        //var newElm = $('#fieldset-__template__').parent().clone();
        var _template = $('.job-designation-container ul li').eq(0);        
        var newElm = $(_template).clone();  
        var unique = makeUnique(newElm);      
        //$('#labels ul li:first-child').parent().find('> li:last').before(newElm);
        $('.job-designation-container ul').find('> li.subform:last').after(newElm);
        newElm.children('fieldset').eq(0).show();
        //Add sorting form
        var hComapnyID = newElm.find("select[id*='hiring_companies']").attr('id');
        var hComapnyVallues = newElm.find("input[id*='company_ids']").attr('id');
        initSortFieldField('courseBenefits', hComapnyID, hComapnyVallues, 'Company');
    });
    $('#aboutBundle-new-jobdesignation-add').click(function () {                  
        var _template = $('.job-designation-container ul li').eq(0);              
        var newElm = $(_template).clone();  
        var unique = makeUnique(newElm);              
        $('.job-designation-container ul').find('> li.subform:last').after(newElm);
        newElm.children('fieldset').eq(0).show();
        //Add sorting form
       
        var hComapnyID = newElm.find("select[id*='hiring_companies']").attr('id');
        var hComapnyVallues = newElm.find("input[id*='company_ids']").attr('id');        
        initSortFieldField('bundleBenefits', hComapnyID, hComapnyVallues, 'Company',function (items) {
            return valdiationLimit(items, 6, 'Company');
        });
    });
    $(document).on('click','.benefits-city #courseBenefits #Save',function () {
        var IntroInfo = CKEDITOR.instances['contentCourse-new-answer'].getData();
        var productType = $('#prouct_type').val();
        var productId = $('#city_page_course_name').next('span').html();
        var countryId = $('#city_page_city_id option:selected').attr('data-country-id');
        var cityId = $('#city_page_city_id option:selected').val();
        var contentId = $('.benefits-city').data('benefitcontentid');
        var training_types = $('#city_page_training_types').val();

        if(training_types == 0){ //Benefit is in generic Info.
            var jobProfileInfo = [];
            var validFields = true;
            var validInc = true;
            if($.trim(IntroInfo) == ''){
                alert('Please Provide Intro Content');
                return false;
            }

            $('.job-designation-container#jobs .subform fieldset:visible').each(function(){
                var designationInfo = {};
                designationInfo['designation'] = $(this).find('.jobDesignation').val();
                if($.trim($(this).find('.min-salary').val()) != ''){
                    designationInfo['min'] = $.trim($(this).find('.min-salary').val());
                }else{
                    validFields = false;
                }
                if($.trim($(this).find('.avg-salary').val()) != ''){
                    designationInfo['avg'] = $.trim($(this).find('.avg-salary').val());
                }else{
                    validFields = false;
                }
                if($.trim($(this).find('.max-salary').val()) != ''){
                    designationInfo['max'] = $.trim($(this).find('.max-salary').val());
                }else{
                    validFields = false;
                }
                
                var minDesign = typeof designationInfo['min'] !="undefined" ? parseInt(designationInfo['min'].replace('$','').replace('₹','')) : 0;
                var avgDesign = typeof designationInfo['avg'] !="undefined" ? parseInt(designationInfo['avg'].replace('$','').replace('₹','')) : 0;
                var maxDesign = typeof designationInfo['max'] !="undefined" ? parseInt(designationInfo['max'].replace('$','').replace('₹','')): 0;

                if((minDesign > avgDesign) || (minDesign > maxDesign) || (avgDesign > maxDesign)){
                    validInc = false;
                }

                designationInfo['section_id'] = $(this).find('.hidSectionId').val();
                designationInfo['section_map_id'] = $(this).find('.hidSectionMapId').val();
                jobProfileInfo.push(designationInfo);
            });

            if(!validFields){
                alert('Please Enter all Fields');
                return false;
            }
            
            if(!validInc){
                alert('Please Enter valid Incremental value (min,avg,max)');
                return false;
            }

            var postData = {
                linkable_type:productType,
                linkable_id:productId,
                answer:IntroInfo,
                country_id:countryId,
                city_id:cityId,
                training_types:training_types,
                course_faq_id:contentId,
                jobdesignation:jobProfileInfo
            };
            $.ajax({
                dataType: 'json',
                type: "POST",
                url: baseUrl + "/admin/city-page/save-benefit-salary",
                data: postData,      
                success: function (response) {
                    $('#city_page_training_types').trigger('change');
                    alert(response.message); 
                },
                error: function (response) {
                    alert(response.message); 
                }
            });
            
        }
    });
    $(document).ready(function() {
        $('form#courseBenefits .job-designation-container select').map(function() {
            var name = $(this).data("name");
            initSortFieldField('courseBenefits', 'contentCourse-new-jobdesignation-'+name+'-hiring_companies',
             'contentCourse-new-jobdesignation-'+name+'-company_ids', 'Company');
        })
    });
    $(document).ready(function() {
        $('form#bundleBenefits .job-designation-container select').map(function() {
            var name = $(this).data("name");
            initSortFieldField('bundleBenefits', 'aboutBundle-new-jobdesignation-'+name+'-hiring_companies',
             'aboutBundle-new-jobdesignation-'+name+'-company_ids', 'Company'
             , function (items) {
                return valdiationLimit(items, 6, "Company");
            });
        })
    });
    
});
//onchange of country remove the salary values
//.shorttext val empty
function clearSalaries(){
    $('.job-designation-container .shorttext').val('');
}

//getSalaryDetailsForBundle 

/**
 * Makes the api call and gets the salaries of job position
 * @param {event} e 
 */
function getSalaryDetailsForBundle(e, apiUrl){
    var serielId = e.id.split('-')[3];    
    $(e).closest('.min-salary').val(10);
    var jobPosition = $('#aboutBundle-new-jobdesignation-'+serielId+'-designation').val();
    //TODO if jobPosition blank show errror
    if (jobPosition == ''){
        alert("Cannot search for salaries without job position.")
        return;
    }    
    var country = $('#aboutBundle-new-country_id option:selected').text();
    if (country == ''){
        alert("Please select the country for salary details.")
        return;
    }
    var postData = {"job": jobPosition, "country": country};
    //var apiUrl = 'http://t9bsmdpuz0.execute-api.us-east-2.amazonaws.com/ice9-automation/fetch-salary-data';
    //show loading 
    $(e).html('<img src="http://cfs22.simplicdn.net/ice9/ajax-loader.gif" height="15px"/>');
    $.ajax({
        url: apiUrl,
        type: 'POST',
        data: JSON.stringify(postData),        
        success: function (response) {
            //remove loading
            $(e).html('Get Salary');
            if (response.status == 'Success'){
                $('#aboutBundle-new-jobdesignation-'+serielId+'-min').val(response.Low);
                $('#aboutBundle-new-jobdesignation-'+serielId+'-avg').val(response.Avg);
                $('#aboutBundle-new-jobdesignation-'+serielId+'-max').val(response.High);
            } else {
                alert(response.message);
            }
        },
        error: function (response) {
            $(e).html('Get Salary');
            if (response.statusText == 'error'){
                var error = JSON.parse(response.responseText);
                alert(error.message); 
            }
        }
    });
   
}

/**
 * Makes the api call and gets the salaries of job position
 * @param {event} e 
 */
function getSalaryDetails(e, apiUrl){
    var serielId = e.id.split('-')[3];    
    $(e).closest('.min-salary').val(10);
    var jobPosition = $('#contentCourse-new-jobdesignation-'+serielId+'-designation').val();
    //TODO if jobPosition blank show errror
    if (jobPosition == ''){
        alert("Cannot search for salaries without job position.")
        return;
    }    
    var country = $('#contentCourse-new-country_id option:selected').text();
    if (country == ''){
        alert("Please select the country for salary details.")
        return;
    }
    var postData = {"job": jobPosition, "country": country};
    //var apiUrl = 'http://t9bsmdpuz0.execute-api.us-east-2.amazonaws.com/ice9-automation/fetch-salary-data';
    //show loading 
    $(e).html('<img src="http://cfs22.simplicdn.net/ice9/ajax-loader.gif" height="15px"/>');
    $.ajax({
        url: apiUrl,
        type: 'POST',
        data: JSON.stringify(postData),        
        success: function (response) {
            //remove loading
            $(e).html('Get Salary');
            if (response.status == 'Success'){
                $('#contentCourse-new-jobdesignation-'+serielId+'-min').val(response.Low);
                $('#contentCourse-new-jobdesignation-'+serielId+'-avg').val(response.Avg);
                $('#contentCourse-new-jobdesignation-'+serielId+'-max').val(response.High);
            } else {
                alert(response.message);
            }
        },
        error: function (response) {
            $(e).html('Get Salary');
            if (response.statusText == 'error'){
                var error = JSON.parse(response.responseText);
                alert(error.message); 
            }
        }
    });
   
}
//ENDS Course benefit section functions
/**
 * H2 tag functions
 */

$(document).ready(function(){
     $('input.h2TagElement').bind('change keydown keyup',function () {        
        showSuffix($(this));
     });
     showH2tags($('#url_type').val());

     $('select#linkable_id option').bind('click',function () {
         console.log('changes');
        showH2tags($('select#url_type').val());
     });
     
     $('.h2TagElement').each(function() {
        var currentElement = $(this);
    
        showSuffix(currentElement);
    });
})

function showSuffix(element) {
    if ($("."+element.attr('id')+"-suffix").length) {
        $("."+element.attr('id')+"-suffix").remove();
    }
    element.after($('<div />', {
        "class": element.attr('id')+'-suffix h2-preview',
        html: element.val()+" <b>"+element.data('suffix')+'</b>',
    }));
}

function showH2tags(val) {
    if (val == 'Course' || (val == 'City Page' && $('#linkable_type_id').val() == '1')) {
        $('#h2tags-element').show();
    } else {
        $('#h2tags-element').hide();
    }    
}

/**
 * END: H2 tag functions
 */
function createTooltip(refElement, hoverElement, content) {
    const tooltipEl = $('<div class="tooltip">' + content.replace(/\n/g, '<br>') + '</div>');
    refElement.append(tooltipEl);
    tooltipEl.append('<div class="arrow"></div>');
    hoverElement.mouseover(function() {
        const clientRect = refElement[0].getBoundingClientRect();
        tooltipEl.css('transform', 'translate(-110%, -50%)');
        tooltipEl.css('top', (clientRect.top + (clientRect.height / 2)) + 'px');
        tooltipEl.css('left', clientRect.left + 'px');

        tooltipEl.css('visibility', 'visible');
        tooltipEl.css('opacity', 1);
    });
    hoverElement.mouseout(function() {
        tooltipEl.css('visibility', 'hidden');
        tooltipEl.css('opacity', 0);
    });
}

function removeTooltip(refElement) {
    refElement.find('.tooltip').remove();
}

//function productTypeChange(){
//    $('#MobileWidget #product_type').change(function(){
//        location.href = 'edit?widget_type='+$('#MobileWidget #widget_type').val()+'&product_type='+$('#MobileWidget #product_type').val();   
//    });
//}

function orderChange(){
    var tableList = $('#orderingTable');
    $( tableList ).sortable({
        items: "tr",
        stop: function() {
            recalculateArrangeTableRows();
        }
    });
}

function recalculateArrangeTableRows(){
    var rowCount = $('#orderingTable tr').length;
    
    $('#orderingTable > tbody  > tr').each(function(index, tr) { 
        console.log("index",index);
        console.log(tr);
        $(tr).find("input:text,select,input:file,button").each(function(idx,inp) {
            $(inp).attr('name', $(inp).attr('name').replace(/\d+/,index));
            console.log("idx",idx);
            console.log(inp);
        });
    });
}

// function arrangeTableApplication(fieldId){
//     var dataArr = JSON.parse($('#'+fieldId).val());
//     var colums = TableAppHeading[fieldId];

//     //Splice : use only when id is not generated (db) for data
//     var splice = ["app_industry_data","app_we_designation_data",
//         "app_we_exp_data","app_ed_industry_data",
//         "app_ed_logo_data"].indexOf(fieldId) > -1 ? 1 : 0;
    
//     var table = '<table><thead>';
//     table += '<tr>';
//     table += '<th>' + colums['labelTitle'] + '</th>';
//     table += '<th>' + colums['valueTitle'] + '</th>';
//     table += '<th>Order</th><th>Action</th></tr></thead>';
//     table += '<tbody>';
//     var hasActive = false;
//     for (let i = 0; i < dataArr.length; i++) {
//         const dataObj = dataArr[i];
//         if (parseInt(dataObj.status) == 0) continue;
//         hasActive = true;
//         table += '<tr>';
//         table += '<td>' + dataObj.label + '</td>';
//         table += '<td>' + dataObj.value + '</td>';
//         table += '<td><input type="text" class="sequence" onChange="changeOrderInfo(this,\'' + fieldId + '\',' + i + ')" value="' + dataObj.sequence + '"/></td>';
//         table += '<td><a onclick="deleteInfo(\'' + fieldId + '\',' + i + ', '+splice+')">X</a></td>';
//         table += '</tr>';
//     }

//     table += '</tbody>';
//     table += '</table>';
//     var divContainer = '<div class="appTable ' + fieldId + '"><span><b>Note:</b> To move Info below at nth position try (n+1), and to move Info above at nth postion try (n-1)</span>' + table + '</div>';
//     if(hasActive){
//         return divContainer;
//     }else{
//         return '';
//     }
    
// }

// function deleteInfo(fieldId,index,splice){

//     var dataArr = JSON.parse($('#'+fieldId).val());
//     dataArr[index].status = "0";
//     dataArr[index].sequence = "0";

//     if(splice)
//         dataArr.splice(index,1);

//     //reorder
//     dataArr = infoSort(dataArr);
//     $('#'+fieldId).val(JSON.stringify(dataArr));
//     var linksHtml = arrangeTableApplication(fieldId);
//     $('.appTable.'+fieldId).remove();
//     $('#'+fieldId).parent().append(linksHtml);
//     $('#'+fieldId).parent().parent().addClass('appTableli');
// }

// function infoSort(dataArr){
//     var sequence = 0;
//     if(typeof dataArr == "string"){
//         dataArr = JSON.parse(dataArr);  
//     }
//     dataArr.sort(function(a,b){ return parseInt(a.sequence)-parseInt(b.sequence);});
//     for (let i = 0; i < dataArr.length; i++) {
//         const dataObj = dataArr[i];
//         if(parseInt(dataObj.status) == 0){
//             dataObj.sequence = "0";
//         }else{
//             sequence++;
//             dataObj.sequence = String(sequence);
//         }
//     }
//     return dataArr;
// }

// function changeOrderInfo(element,fieldId,index){
//     var dataArr = JSON.parse($('#'+fieldId).val());
//     dataArr[index].sequence = String($(element).val());

//     //reorder
//     dataArr = infoSort(dataArr);
//     $('#'+fieldId).val(JSON.stringify(dataArr));
//     var linksHtml = arrangeTableApplication(fieldId);
//     $('.appTable.'+fieldId).remove();
//     $('#'+fieldId).parent().append(linksHtml);
//     $('#'+fieldId).parent().parent().addClass('appTableli');
// }

// function AddInfoApplication(fieldId,field_data,label,value){

//     var newData = {
//         'label': label,
//         'value':value,
//         'status': 1,
//         'sequence': 9999
//     };

//     if( !(['app_industry_data','app_we_designation_data','app_we_exp_data',
//             'app_ed_industry_data','app_ed_logo_data'].indexOf(fieldId) > -1) ){
//         newData['id'] = 0;
//     }

//     field_data.push(newData);

//     //reorder
//     field_data = infoSort(field_data);
//     $('#'+fieldId).val(JSON.stringify(field_data));
//     var linksHtml = arrangeTableApplication(fieldId);
//     $('.appTable.'+fieldId).remove();
//     $('#'+fieldId).parent().append(linksHtml);
//     $('#'+fieldId).parent().parent().addClass('appTableli');
// }

function createSortableDataLi(formObj,elementObj,hiddenEleObj,ulClass){
    var courseIdStr = hiddenEle.val() || [];
    var courseIds = Array.isArray(courseIdStr)?courseIdStr:courseIdStr.split(",");
    var courseIdsLen = courseIds.length;
    var coursesSelect = ele;
    console.log(coursesSelect);    
    var coursesOptions = [];
    if(courseIdsLen > 0){
        var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative' data-cid='"+0+"'>Remove All<span class='rm_all_crs' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='0'>X</span></li>");
        coursesOptions[0] = $(liObj);
    }
    var n = 0;
    for(var i=0;i<courseIdsLen;i++){
        if(courseIds[i] != 0){
            var coursesOptionTmp = $(coursesSelect).find("option[value='"+courseIds[i]+"']");
            var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative' data-cid='"+courseIds[i]+"'>"+$(coursesOptionTmp).text()+"<span class='rm_bndl_crs' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='"+courseIds[i]+"'>X</span></li>");
            n = i + 1;
            coursesOptions[n] = $(liObj);
        }
    }

    var ulList = $("<ul class='"+listClass+"' style='float: right;width: 210px;padding: 10px;'></ul>");
    if(coursesOptions != null && courseIdStr != ''){
        $(ulList).append(coursesOptions);
    }
    $(ulList).insertAfter(ele);
    $( ulList ).sortable({
        items: "li",
        stop: function() {
            recalculateCourseIdsStr(ulList,hiddenEle);
        }
    });

    ele.parent().on( "click", "ul li span", function() {
        var cid = $(this).parent().data("cid");
        $(this).parent().remove();
        if(cid > 0){
            var ulList = $(formObj).find("ul."+listClass);
            recalculateCourseIdsStr(ulList,hiddenEle);
        } else {
            var ulList = $(formObj).find("ul."+listClass);
            $(ulList).html('');
            recalculateCourseIdsStr(ulList,hiddenEle);
        }
    });
}

function applicationScripts(){
    var formObj = $("form#application");
    if(document.querySelector('form#application') != null){

        //hiring companies
        var hiringCompnyIdStr = $(formObj).find("input[name='app_hiring_companies_id']").val();
        if(typeof hiringCompnyIdStr != 'undefined' && hiringCompnyIdStr != null){
            createSortableLi(formObj,$(formObj).find("#app_hiring_companies"),$(formObj).find("#app_hiring_companies_id"),'bundle_hiring_companies_sortable');
        }

        //  hidden fields
        //  var InitInfoFields = ["app_industry_data","app_we_designation_data",
        //    "app_we_exp_data","app_ed_industry_data","app_ed_logo_data"];

        /* InitInfoFields.forEach(function(fieldId){
             var fieldValue = $(formObj).find("input[name='"+fieldId+"']").val();
             fieldValue = fieldValue != '' ? JSON.parse(fieldValue): [];
             if(typeof fieldValue != 'undefined' && fieldValue != null){
                createSortableDataLi(formObj,fieldId,fieldValue);
             }
          });*/

        $('#app-section,#add-content').show();
        //add Extra Label
        $('#app_eligibility_work_exp_order,#app_eligibility_degree_order,#app_eligibility_basic_order').parent().append('<span>/ 3<span>');
        //Added notes
        $('#fieldset-we_group legend').html('Work Experience (Optional) <span class="option-note">Note: Please fill data for all the fields to show this section on the program webpage<span>');
        $('#fieldset-ed_group legend').html('Educational (Optional) <span class="option-note">Note: Please fill data for all the fields to show this section on the program webpage<span>');
        
        $('[id*="_add-label"]').hide();
        $('[id*="_add-label"]').parent().css('width','50px')
        var fieldname = [
            'form#application #industry_name',
            'form#application #we_designation_name',
            'form#application #we_years_name',
            'form#application #ed_industry_name',
            'form#application #ed_logo_name',
        ];
        var fieldvalue = [
            'form#application #industry_ratio',
            'form#application #we_designation_ratio',
            'form#application #we_years_ratio',
            'form#application #ed_industry_ratio',
            'form#application #ed_logo_url',
        ];

        $(fieldname.join(',')).parent().parent().addClass('application-subform-name');
        $(fieldvalue.join(',')).parent().parent().addClass('application-subform-value');

        var allErrorFields = fieldname.concat(fieldvalue);
        $(allErrorFields.join(',')).on('keypress',function(){
            $(this).removeClass('error');
        });

        var InitInfoFields = ["app_industry_data","app_we_designation_data",
            "app_we_exp_data","app_ed_industry_data","app_ed_logo_data"];
        InitInfoFields.forEach(function(fieldId){
            if($('#'+fieldId).val()){
                var field_data = JSON.parse($('#'+fieldId).val());
                field_data = infoSort(field_data);
                $('#' + fieldId).val(JSON.stringify(field_data));
                var linksHtml = arrangeTableApplication(fieldId);
                $('.appTable.' + fieldId).remove();
                $('#' + fieldId).parent().append(linksHtml);
                $('#'+fieldId).parent().parent().addClass('appTableli');
            }
        });

        $('#industry_add').on('click',function(){
            var label = $.trim($('#industry_name').val());
            var value = $.trim($('#industry_ratio').val());
            var error = false;
            $('#industry_name,#industry_ratio').removeClass('error');
            if(label == '' && (value == '' || isNaN(value))){
                error = true;
                $('#industry_name,#industry_ratio').addClass('error');
            }else if(label == ''){
                error = true;
                $('#industry_name').addClass('error');
            }else if( value == '' || isNaN(value) || parseInt(value) == 0){
                error = true;
                $('#industry_ratio').addClass('error');
            }else if(label.length > 22){
                error = true;
                $('#industry_name').addClass('error');
                alert('Limit for industry name is max: 22 characters')
            } else if(parseFloat(value) < 1  || parseFloat(value) > 99){
                error = true;
                $('#industry_ratio').addClass('error');
                alert("Value should be between 1 to 99");
            }
            
            if(error) return false;

            if(parseInt(value) > 99){
                alert('Value must be between 1 to 99, with total sum of 100.');
                return false;
            }

            var fieldId = 'app_industry_data';
            var field_data = JSON.parse($('#'+fieldId).val());
            var itemCount = 0;
            var sum = (field_data || []).reduce(function (accumulator, currentValue) {
                if(currentValue.status == 1){
                    itemCount++;
                    return accumulator + parseFloat(currentValue.value);
                }else{
                    return accumulator;
                }
            }, 0);

            if((itemCount + 1) > 6){
                alert('Industry data should have max 6 items.');
                return false;
            }

            if((sum + parseFloat(value)) > 100){
                alert('Value must be between 1 to 99, with total sum of 100.');
                return false;
            }

            var exists = field_data.filter(function(item){ return item.label == label && item.status == 1;});
            if(exists.length){
                alert('Info Already Added.');
                return;
            }

            AddInfoApplication(fieldId,field_data,label,value);
            $('#industry_name,#industry_ratio').val('');
        });
        
        $(document).on("click", "#app_hiring_companies option", function ($event) {
            $event.preventDefault();
            var hiringCompnyId = $(this).attr("value");
            var hiddenEle = $(formObj).find("#app_hiring_companies_id");
            var hiringCompnyIdStr = $(hiddenEle).val();
            var hiringCompnyIdsArr = hiringCompnyIdStr.split(",");

            if (hiringCompnyIdsArr[0] == "")
                hiringCompnyIdsArr = [];
            if (hiringCompnyIdsArr.length < 12) {
                if (hiringCompnyIdsArr.indexOf(hiringCompnyId) == -1) {
                    var ulList = $(formObj).find("ul.bundle_hiring_companies_sortable");
                    var liObj = $("<li style='border-bottom: 1px solid;padding: 5px;cursor:move;background:#f8f8f8;border:1px solid #eee;position:relative;' data-cid='" + hiringCompnyId + "'>" + $(this).text() + "<span class='rm_bndl_crs' style='position:absolute;top:5px;right:5px;cursor:pointer;' data-cid='" + hiringCompnyId + "'>X</span></li>");
                    $(ulList).append(liObj);
                    recalculateCourseIdsStr(ulList, hiddenEle);
                } else {
                    alert('Company already selected');
                }
            } else {
                alert('12 companies already selected.');
            }
        });

        var validOrderValues = ['1','2','3'];
        var invalidOrderValueError = 'Value should be one of 1, 2, 3';

        $('#app_eligibility_work_exp_order').on('change', function() {
            var thisSel = $(this)
            
            thisSel.removeClass('error');

            var thisOrder = thisSel.val();
            if (validOrderValues.indexOf(thisOrder) == '-1') {
                $(this).addClass('error');
                alert(invalidOrderValueError);
                return false;
            }

            var degreeValue = $('#app_eligibility_degree_order').val();
            var conceptValue = $('#app_eligibility_basic_order').val();
            if (thisOrder == degreeValue || thisOrder == conceptValue) {
                $(this).addClass('error');
                alert('Value should not be equal to degree and basic concept order');
                return false;
            }
        });

        $('#app_eligibility_degree_order').on('change', function() {
            var thisSel = $(this)
            
            thisSel.removeClass('error');

            var thisOrder = thisSel.val();
            if (validOrderValues.indexOf(thisOrder) == '-1') {
                $(this).addClass('error');
                alert(invalidOrderValueError);
                return false;
            }

            var expValue = $('#app_eligibility_work_exp_order').val();
            var conceptValue = $('#app_eligibility_basic_order').val();
            if (thisOrder == expValue || thisOrder == conceptValue) {
                $(this).addClass('error');
                alert('Value should not be equal to work experience and basic concept order');
                return false;
            }
        });

        $('#app_eligibility_basic_order').on('change', function() {
            var thisSel = $(this)
            
            thisSel.removeClass('error');

            var thisOrder = thisSel.val();
            if (validOrderValues.indexOf(thisOrder) == '-1') {
                $(this).addClass('error');
                alert(invalidOrderValueError);
                return false;
            }

            var degreeValue = $('#app_eligibility_degree_order').val();
            var expValue = $('#app_eligibility_work_exp_order').val();
            if (thisOrder == degreeValue || thisOrder == expValue) {
                $(this).addClass('error');
                alert('Value should not be equal to work experience and degree order');
                return false;
            }
        });

        $('#we_designation_add').on('click',function(){
            var label = $.trim($('#we_designation_name').val());
            var value = $.trim($('#we_designation_ratio').val());
            var error = false;
            $('#we_designation_name,#we_designation_ratio').removeClass('error');
            if(label == '' && (value == '' || isNaN(value))){
                error = true;
                $('#we_designation_name,#we_designation_ratio').addClass('error');
            }else if(label == ''){
                error = true;
                $('#we_designation_name').addClass('error');
            }else if( value == '' || isNaN(value) || parseInt(value) == 0){
                error = true;
                $('#we_designation_ratio').addClass('error');
            }else if(label.length > 22){
                error = true;
                $('#we_designation_name').addClass('error');
                alert('Limit for designation is max: 22 characters')
            } else if(parseFloat(value) < 1  || parseFloat(value) > 99){
                error = true;
                $('#we_designation_ratio').addClass('error');
                alert("Value should be between 1 to 99");
            }
            
            if(error) return false;

            if(parseInt(value) > 99){
                alert('Value must be between 1 to 99, with total sum of 100.');
                return false;
            }

            var fieldId = 'app_we_designation_data';
            var field_data = JSON.parse($('#'+fieldId).val());
            var itemCount = 0;
            var sum = (field_data || []).reduce(function (accumulator, currentValue) {
                if(currentValue.status == 1){
                    itemCount++;
                    return accumulator + parseFloat(currentValue.value);
                }else{
                    return accumulator;
                }
            }, 0);

            if((itemCount + 1) > 6){
                alert('Designation data should have max 6 items.');
                return false;
            }
            
            if((sum + parseFloat(value)) > 100){
                alert('Value must be between 1 to 99, with total sum of 100.');
                return false;
            }

            var exists = field_data.filter(function(item){ return item.label == label && item.status == 1;});
            if(exists.length){
                alert('Info Already Added.');
                return;
            }

            AddInfoApplication(fieldId,field_data,label,value);
            $('#we_designation_name,#we_designation_ratio').val('');
        });

        $('#we_years_add').on('click',function(){
            var label = $.trim($('#we_years_name').val());
            var value = $.trim($('#we_years_ratio').val());
            var error = false;
            $('#we_years_name,#we_years_ratio').removeClass('error');
            if(label == '' && (value == '' || isNaN(value))){
                error = true;
                $('#we_years_name,#we_years_ratio').addClass('error');
            }else if(label == ''){
                error = true;
                $('#we_years_name').addClass('error');
            }else if( value == '' || isNaN(value) || parseInt(value) == 0){
                error = true;
                $('#we_years_ratio').addClass('error');
            }else if(label.length > 22){
                error = true;
                $('#we_years_name').addClass('error');
                alert("Limit for # Year's is max: 22 characters");
            } else if(parseFloat(value) < 1  || parseFloat(value) > 99){
                error = true;
                $('#we_years_ratio').addClass('error');
                alert("Value should be between 1 to 99");
            }
            
            if(error) return false;

            if(parseInt(value) > 99){
                alert('Value must be between 1 to 99, with total sum of 100.');
                return false;
            }

            var fieldId = 'app_we_exp_data';
            var field_data = JSON.parse($('#'+fieldId).val());
            var itemCount = 0;
            var sum = (field_data || []).reduce(function (accumulator, currentValue) {
                if(currentValue.status == 1){
                    itemCount++;
                    return accumulator + parseFloat(currentValue.value);
                }else{
                    return accumulator;
                }
            }, 0);

            if((itemCount + 1) > 6){
                alert('Exp. data should have max 6 items.');
                return false;
            }
            
            if((sum + parseFloat(value)) > 100){
                alert('Value must be between 1 to 99, with total sum of 100.');
                return false;
            }

            var exists = field_data.filter(function(item){ return item.label == label && item.status == 1;});
            if(exists.length){
                alert('Info Already Added.');
                return;
            }

            AddInfoApplication(fieldId,field_data,label,value);
            $('#we_years_name,#we_years_ratio').val('');
        });

        $('#ed_industry_add').on('click',function(){
            var label = $.trim($('#ed_industry_name').val());
            var value = $.trim($('#ed_industry_ratio').val());
            var error = false;
            $('#ed_industry_name,#ed_industry_ratio').removeClass('error');
            if(label == '' && (value == '' || isNaN(value))){
                error = true;
                $('#ed_industry_name,#ed_industry_ratio').addClass('error');
            }else if(label == ''){
                error = true;
                $('#ed_industry_name').addClass('error');
            }else if( value == '' || isNaN(value) || parseInt(value) == 0){
                error = true;
                $('#ed_industry_ratio').addClass('error');
            }else if(label.length > 22){
                error = true;
                $('#ed_industry_name').addClass('error');
                alert('Limit for Industry Name is max: 22 characters')
            } else if(parseFloat(value) < 1  || parseFloat(value) > 99){
                error = true;
                $('#ed_industry_ratio').addClass('error');
                alert("Value should be between 1 to 99");
            }
            
            if(error) return false;

            if(parseInt(value) > 99){
                alert('Value must be between 1 to 99, with total sum of 100.');
                return false;
            }

            var fieldId = 'app_ed_industry_data';
            var field_data = JSON.parse($('#'+fieldId).val());
            var itemCount = 0;
            var sum = (field_data || []).reduce(function (accumulator, currentValue) {
                if(currentValue.status == 1){
                    itemCount++;
                    return accumulator + parseFloat(currentValue.value);
                }else{
                    return accumulator;
                }
            }, 0);

            if((itemCount + 1) > 6){
                alert('Industry data should have max 6 items.');
                return false;
            }
            
            if((sum + parseFloat(value)) > 100){
                alert('Value must be between 1 to 99, with total sum of 100.');
                return false;
            }

            var exists = field_data.filter(function(item){ return item.label == label && item.status == 1;});
            if(exists.length){
                alert('Info Already Added.');
                return;
            }

            AddInfoApplication(fieldId,field_data,label,value);
            $('#ed_industry_name,#ed_industry_ratio').val('');
        });

        $('#ed_logo_add').on('click',function(){
            var label = $.trim($('#ed_logo_name').val());
            var value = $.trim($('#ed_logo_url').val());
            var error = false;
            $('#ed_logo_name,#ed_logo_url').removeClass('error');
            var regUrl = new RegExp('^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
            var validUrl = regUrl.test(String(value));
            if(label == '' && value == ''){
                error = true;
                $('#ed_logo_name,#ed_logo_url').addClass('error');
            }else if(label == ''){
                error = true;
                $('#ed_logo_name').addClass('error');
            }else if( value == '' || !validUrl){
                error = true;
                $('#ed_logo_url').addClass('error');
            }
            
            if(error) return false;

            var fieldId = 'app_ed_logo_data';
            var field_data = JSON.parse($('#'+fieldId).val());
            var activeLogos = field_data.filter(function(item){ return item.status == 1;});
            if(activeLogos.length == 12){
                alert('max 12 limit reached')
                return false;
            }

            var exists = field_data.filter(function(item){ return item.label == label && item.status == 1;});
            if(exists.length){
                alert('Info Already Added.');
                return;
            }
            
            AddInfoApplication(fieldId,field_data,label,value);
            $('#ed_logo_name,#ed_logo_url').val('');
        });
    }
}

function appendSequence(){
    $('#MobileWidget #orderingTable').find("tr:last").hide();
    $('#MobileWidget #addToSequenceList').click(function(){
        var data = $('#MobileWidget').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        console.log("===data",data);
        var trLast      = $('#orderingTable').find("tr:last");
        for (var key in data) {     
            $(trLast).find("input:text,select,input:file,button").each(function(idx,inp) {
                if( $(inp).attr('name').includes(key) && !$(inp).attr('name').includes("banner_edit") ){
                  $(trLast).find(inp).attr('value', "data[key]"); 
                }
            });
        }
        var trNew       = trLast.clone();
        trLast.before(trNew);
        $(trNew).show();
        //console.log("===trLast",trLast);
//        data.each(function(key,val) {
//            $(trLast).find("input:text,select,input:file,button").each(function(idx,inp) {
//                if($(inp).attr('name').includes(key)){
//                    $(inp).val = val;
//                }
//            });
//        });
    
        //var str = $( "#MobileWidget" ).serializeArray();
        
        //var rowCount    = $('#orderingTable tr').length;
        
//        $(trLast).find("input:text,select,input:file,button").each(function(idx,inp) {
//            $(inp).attr('name', $(inp).attr('name').replace(/\d+/,index));
//
//        });
        
        
//        var trNew       = trLast.clone();
//        trLast.after(trNew);
    });
}

function intBundlePage() {
    var masterType = $("input[name='master_type']:checked").val();
    if (typeof masterType != 'undefined') {
        sessionStorage.setItem("bundleType", masterType)
    }
    if (typeof window != 'undefined') {
        // masterType = sessionStorage.getItem("bundleType");
        // if (typeof masterType != 'undefined') {
        //     if (masterType == MASTER_TYPE_UNIVERSITY) {
        //     } else if (masterType == MASTER_TYPE_COHORT) {
        //         $('#app-section').hide();
        //     } else {
        //         $('#add-content').hide();
        //         $('#app-section').hide();
        //     }
        // }
        var formObj = $("form#Bundles");
        if (typeof formObj != 'undefined' && formObj != null) {
            var res = window.location.pathname.match(/\/id\/(\d+)/);
            var bundleId = typeof res != 'undefined' && res ? res[1] : '';
            if (typeof bundleId != 'undefined' && bundleId) {
                $.ajax({
                    url: baseUrl + "/api/v3",
                    dataType: 'json',
                    type: "GET",
                    data: { method: 'getBundleData', 'bundle_id': bundleId },
                    success: function (data) {
                        if (typeof data != 'undefined' && data.status) {
                            var bundleData = typeof data.data != 'undefined' ? data.data : [];
                            var bundlInfo = typeof bundleData[0] != 'undefined' ? bundleData[0] : {};
                            var masterType = typeof bundlInfo.master_type != 'undefined' ? bundlInfo.master_type : '';
                            if (typeof masterType != 'undefined') {
                                sessionStorage.setItem("bundleType", masterType)
                            }
                            masterType = sessionStorage.getItem("bundleType");
                            if (typeof masterType != 'undefined') {
                                if (masterType == MASTER_TYPE_UNIVERSITY) {
                                    $('#add-content').show();
                                    $('#app-section').show();
                                } else if (masterType == MASTER_TYPE_COHORT) {
                                    $('#add-content').show();
                                    $('#app-section').hide();
                                } else {
                                    $('#add-content').hide();
                                    $('#app-section').hide();
                                }
                            }
                        }
                    }
                });
            }
        }
    }
}

function deleteWidget(sId){
        var dataDelete = {
            sequence_id: sId,           
        };
        $.ajax( {
           dataType: 'json',
           type: "POST",
           url: baseUrl + "/admin/mobile-app/delete",
           data: dataDelete,
           success: function(status) {               
               if(status){
                   alert('Widget Deleted Successfully');                   
               }else{
                   alert('Some Error Occured');
               }
           }
        });
     
}

function deleteBanner(sId){
    var dataDelete = {
        sequence_id: sId,           
    };
    $.ajax( {
       dataType: 'json',
       type: "POST",
       url: baseUrl + "/admin/mobile-app/delete-banner-content",
       data: dataDelete,
       success: function(status) {               
           if(status){
               alert('Content Deleted Successfully');                   
           }else{
               alert('Some Error Occured');
           }
       }
    });
}

function getProductBylabel(type, label, callback){
    var resourceCategory = $('#choose_learning').val();
    var data = {
        type : type,
        label : label,
        resourse : resourceCategory,
        method :'fetchProductDetailsByLable'
    };
    $.ajax( {
        dataType: 'json',
        type: "POST",
        url: baseUrl + "/api/v3",
        data: data,
        success: function(data) {            
            if(data){
                //window._courseMap = {};
                var ddProducts = $("#product_id_temp");
                ddProducts.find('option')
                .remove()
                .end()               
                $.each(data,function (key ,val) {
                    var option = $("<option />");                         
                    option.html(val);
                    option.val(key);
                    window._courseMap[key] = val;
                    ddProducts.append(option);
                });               
                if(typeof callback === "function") {
                    callback();
                }
            }else{
                alert('Some Error Occured');
            }
        }
     });
}


$(document).ready(function () {
    initSearchBoxPlugin();
})

function initSearchBoxPlugin() {
    function search(list, query) {
        var result = [];
        list.forEach(function(item, index) {
            if(item.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                result.push(item.key);
            }
        });
        return result;
    }

    function hideOptionsByValue(selectDom, values, options) {
        $(selectDom).find("option").remove();
        let appendStr = "";
        options.forEach(function (option, index) {
            if(values.indexOf(option.key) > -1) {
                appendStr +='<option value="' + option.key + '" label="'+option.name+'">'+option.name+'</option>'
            }
        });
        $(selectDom).append(appendStr);
    }

    $(".SearchBoxPlugin").each(function (index, selectDom) {
        var options = [];
        var id = "searchBoxDom_" + index;
        $(selectDom).before('<input type="text" value="" class="searchBoxDom" id="' + id + '"/>')
        $(selectDom).find("option").each(function (index, option) {
            options.push({
                name: $(option).text(), 
                key: $(option).val()
            })
        });
        $("#"+id).keyup(function() {
            var query = $(this).val();
            var result = search(options, query);
            hideOptionsByValue(selectDom, result, options);
        })
    });
}

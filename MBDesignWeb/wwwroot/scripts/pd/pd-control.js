$(function () {
    callSelect2StatusPD('#form-search-pd-queue #select-search-pd-checklist-status', true);
    callGetPDList();
    callGetNameSelectPD();
 /*   callSelect2StatusPD('#form-editPD #select-search-pd-checklist-status');*/
    //callSelectSizePlank('#form-createPlanks #select-planks-size');
    //callSelect2Status('#form-search-planks #select-search-planks-status', true);
    //callSpecListQuatationNoCal('#form-add-calculate #select-cal-quotation-no', 'กรุณาเลือก', 'F');
    //callSpecListQuatationNoCal('#form-add-calculate-clearglass #select-clearglass-quotation-no', 'กรุณาเลือก', 'C');
    //callSpecListQuatationNoPlanks('#form-createPlanks #select-quotation-no', 'กรุณาเลือก');
    //callSpecListQuatationNoFitting('#form-createFitting #select-fitting-quotation-no', 'กรุณาเลือก');
    //callSpecListQuatationNo('#form-editSpec #select-edit-spec-quotation', 'กรุณาเลือก');
    //callGetDesign3DNameSelectSpec();
    //callGetSpecList();
    //callPlanksList();
    //callFittingList();
    //callSelectDoorType('#form-add-calculate #select-insert-glassdoor-type', true);
    //callSelectDoorType('#form-add-calculate-clearglass #select-insert-glassdoor-type-clearglass', true);
    //callStockProductData('#form-add-calculate #select-insert-product-item', 'กรุณาเลือก');
    //callStockProductData('#form-add-calculate-clearglass #select-insert-product-item-clearglass', 'กรุณาเลือก');
    //callGetCalculateCode();
    //callGetFittingCode();
    //callGetFrameList();
    //callGetGlassList();
    /*    callPlanksList();*/

    //$('#form-search-pd-queue .btn-search-pd').on('click', function () {
    //    /* callPlanksList();*/
    //});

    //$('#form-search-planks .btn-clear-search-pd').on('click', function () {
    //    //clearSearchForm("planks");
    //    //callPlanksList();
    //});


    //$(document).on('click', '.btn-edit-planks', function () {
    //    $(`#modal-createPlanks #itemHeader`).text('แก้ไขรายการสั่งไม้');
    //    $(`#modal-createPlanks`).modal('show');
    //    _product_item_action = 'edit';
    //    clearForm('modal-createPlanks');
    //    if (_product_item_action == "edit") {
    //        $(`#select-quotation-no`).css('display', 'none');
    //        $("#input-quotation-no").css("display", "");
    //    }
    //    else {
    //        $(`#select-quotation-no`).css("display", "");
    //        $("#input-quotation-no").css('display', 'none');
    //    }
    //    //$('#modal-createProduct #divOptions').empty();
    //    $("#tb-planks-detail tbody tr").remove();

    //    callGetPlanksById($(this).data('id'), 'modal-createPlanks');
    //});


    //$('.btn-modal-save-planks').on('click', function () {
    //    DoAddOrUpdatePlanks("modal-createPlanks");
    //});



    //$(document).on('click', '.btn-print-planks', function () {

    //    //$('#modal-createProduct #divOptions').empty();
    //    printPlanks($(this).data('id'));
    //});

    //$(document).on('click', '.btn-print-fitting', function () {

    //    //$('#modal-createProduct #divOptions').empty();
    //    printFitting($(this).data('id'));
    //});
    $('.btn-modal-save-pd').on('click', function () {
        callSavePD();
    });
    $(document).on('click', '.btn-edit-pd', function () {
        var _id = $(this).data('id');
        var _order_id = $(this).data('orderid');
        var _spec_id = $(this).data('specid');
        var _fitting_id = $(this).data('fittingid');
        var _checkstatus_id = $(this).data('step');

        console.log(_checkstatus_id);

        if (_id == 0) {
            _product_item_action = 'add';
        }
        else {
            _product_item_action = 'edit';
        }
        $("#input-prod-id").val(_id);
        $("#input-spec-id").val(_spec_id);
        $("#input-order-id").val(_order_id);
        $("#input-fitting-id").val(_fitting_id);

       /* clearInputForm();*/
        CreateNewCheckListPD();
        //$(`#select-edit-pd-quotation`).css('display', 'none');
        //$("#txtquotationedit").css("display", "");
        renderEditPD(_order_id, _id, _checkstatus_id);
        var txtheader = settxtHeaderPD(_checkstatus_id);
        console.log(txtheader);
        //if (_checkstatus_id == 5) {
        //    $("#lbldesignname").css("display", "none");
        //    $("#lblcommitdate").css("display", "none");
        //    $("#select-edit-spec-designName").css("display", "none");
        //    $("#input-edit-spec-due-date ").css("display", "none");
        //    $("#btnsavespec").css("display", "none");
        //}
        //else {
        //    $("#lbldesignname").css("display", "");
        //    $("#lblcommitdate").css("display", "");
        //    $("#select-edit-spec-designName").css("display", "");
        //    $("#input-edit-spec-due-date").css("display", "");
        //    $("#btnsavespec").css("display", "");
        //}
        $(`#modal-editPD #itemHeader`).text(txtheader);
/*        $('#form-editPD #select-edit-pd-quotation').removeAttr("disabled");*/
        /* $('#form-editSpec #select-edit-spec-quotation').attr("onchange", "yourFunction()");*/
        $('#modal-editPD').modal('show');
    });

    $(document).on('click', '.btn-print-pd-fitting', function () {

        //$('#modal-createProduct #divOptions').empty();
        printFittingpd($(this).data('fittingid'));
    });

    $(document).on('click', '.btn-print-pd-planks', function () {

        //$('#modal-createProduct #divOptions').empty();
        printPlankspd($(this).data('orderid'));
    });
})
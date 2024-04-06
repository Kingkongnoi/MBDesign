$(function () {
    callSelect2Status('#form-createPlanks #select-planks-status');
    callSelect2Status('#form-search-planks #select-search-planks-status', true);
    /*  callQuatationNo('#form-createPlanks #select-quotation-no', 'กรุณาเลือก')*/
    callSpecListQuatationNo('#form-createPlanks #select-quotation-no', 'กรุณาเลือก');
    /*    callSpecListQuatationNo('#form-search-spec-queue #input-search-spec-quotation-number', 'กรุณาเลือก')*/
    callSpecListQuatationNo('#form-editSpec #select-edit-spec-quotation', 'กรุณาเลือก');
    callGetDesign3DNameSelectSpec();
    callGetSpecList();
    /*    callPlanksList();*/

    $('#form-search-planks .btn-search-planks').on('click', function () {
        callPlanksList();
    });

    $('#form-search-planks .btn-clear-search-planks').on('click', function () {
        clearSearchForm("planks");
        callPlanksList();
    });

    $('.btn-add-planks').on('click', function () {
        _product_item_action = 'add';
        $(`#modal-createPlanks #itemHeader`).text('เพิ่มรายการสั่งไม้');
        $('#modal-createPlanks').modal('show');
    });

    $(document).on('click', '.btn-edit-planks', function () {
        $(`#modal-createPlanks #itemHeader`).text('แก้ไขรายการสั่งไม้');
        $(`#modal-createPlanks`).modal('show');
        _product_item_action = 'edit';
        clearForm('modal-createPlanks');
        //$('#modal-createProduct #divOptions').empty();
        callGetPlanksById($(this).data('id'), 'modal-createPlanks');
    });

    $('.btn-modal-save-planks').on('click', function () {
        DoAddOrUpdatePlanks("modal-createPlanks");
    });

    $(document).on('click', '.btn-edit-spec', function () {
        var _order_id = $(this).data('orderid');
        var _spec_id = $(this).data('specid');
        var _checkstatus_id = $(this).data('statusid');
        _product_item_action = 'edit';
        clearInputForm();
        CreateNewCheckList();
        $(`#select-edit-spec-quotation`).css('display', 'none');
        $("#txtquotationedit").css("display", "");
        renderEditSpec(_order_id, _spec_id, _checkstatus_id);
        $(`#modal-editSpec #itemHeader`).text('เพิ่มรายการบันทึกรับเรื่อง');
        $('#form-editSpec #select-edit-spec-quotation').removeAttr("disabled");
        /* $('#form-editSpec #select-edit-spec-quotation').attr("onchange", "yourFunction()");*/
        $('#modal-editSpec').modal('show');
    });

    $('.btn-add-spec').on('click', function () {
        _product_item_action = 'add';
        clearInputForm();
        CreateNewCheckList();
        $("#input-edit-spec-quotation").css("display", "");
        $("#txtquotationedit").css("display", "none");
        $(`#modal-editSpec #itemHeader`).text('เพิ่มรายการบันทึกรับเรื่อง');
        $('#form-editSpec #select-edit-spec-quotation').removeAttr("disabled");
        /* $('#form-editSpec #select-edit-spec-quotation').attr("onchange", "yourFunction()");*/
        $('#modal-editSpec').modal('show');
    });

    $('.btn-modal-save-spec').on('click', function () {
        callSaveSpec();
    });
    //$('#liMaster2 #chkMaster2').change(function (e) {
    //    // checked will equal true if checked or false otherwise
    //    const checked = $(this).is(':checked')
    //    console.log(checked);
    //});
   
    //$("#liMaster2 #chkMaster2").change(function () {
    //    alert("hey");
    //    if (this.checked) {
    //        $("txtvideourl").removeAttr("disabled");
    //    }
    //    else {
    //        $("txtvideourl").attr('disabled');
    //    }
    //});


})
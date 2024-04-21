$(function () {
    callSelect2Status('#form-createPlanks #select-planks-status');
    callSelect2Status('#form-search-planks #select-search-planks-status', true);
    callSpecListQuatationNoCal('#form-add-calculate #select-cal-quotation-no', 'กรุณาเลือก','F');
    callSpecListQuatationNoCal('#form-add-calculate-clearglass #select-clearglass-quotation-no', 'กรุณาเลือก', 'C');
    callSpecListQuatationNoPlanks('#form-createPlanks #select-quotation-no', 'กรุณาเลือก');
    callSpecListQuatationNoFitting('#form-createFitting #select-fitting-quotation-no','กรุณาเลือก');
    callSpecListQuatationNo('#form-editSpec #select-edit-spec-quotation', 'กรุณาเลือก');
    callGetDesign3DNameSelectSpec();
    callGetSpecList();
    callPlanksList();

    callSelectDoorType('#form-add-calculate #select-insert-glassdoor-type', true);
    callSelectDoorType('#form-add-calculate-clearglass #select-insert-glassdoor-type-clearglass', true);

    callGetCalculateCode();
    callGetFittingCode();
    callGetFrameList();
    callGetGlassList();
    /*    callPlanksList();*/

    $('#form-search-planks .btn-search-planks').on('click', function () {
        callPlanksList();
    });

    $('#form-search-planks .btn-clear-search-planks').on('click', function () {
        clearSearchForm("planks");
        callPlanksList();
    });

    $('#form-search-spec-queue .btn-search-spec').on('click', function () {
        callGetSpecList();
    });

    $('#form-search-spec-queue .btn-clear-search-spec').on('click', function () {
        clearSearchForm("spec");
        callGetSpecList();
    });
    $('.btn-add-planks').on('click', function () {
        _product_item_action = 'add';
        $(`#modal-createPlanks #itemHeader`).text('เพิ่มรายการสั่งไม้');
        $('#modal-createPlanks').modal('show');
    });

    $('.btn-add-fitting').on('click', function () {
        _product_item_action = 'add';
        $(`#modal-createFitting #itemHeader`).text('เพิ่มรายการจัดฟิตติ้ง');
        $('#modal-createFitting').modal('show');
    });

    $(document).on('click', '.btn-edit-planks', function () {
        $(`#modal-createPlanks #itemHeader`).text('แก้ไขรายการสั่งไม้');
        $(`#modal-createPlanks`).modal('show');
        _product_item_action = 'edit';
        clearForm('modal-createPlanks');
        if (_product_item_action =="edit") {
            $(`#select-quotation-no`).css('display', 'none');
            $("#input-quotation-no").css("display", "");
        }
        else {
            $(`#select-quotation-no`).css("display", "");
            $("#input-quotation-no").css('display', 'none');
        }
        //$('#modal-createProduct #divOptions').empty();
        callGetPlanksById($(this).data('id'), 'modal-createPlanks');
    });

    $('.btn-modal-save-planks').on('click', function () {
        DoAddOrUpdatePlanks("modal-createPlanks");
    });

    $(document).on('click', '.btn-edit-spec', function () {
        var _order_id = $(this).data('orderid');
        var _spec_id = $(this).data('specid');
        var _checkstatus_id = $(this).data('step');
        console.log(_order_id);
        console.log(_spec_id);
        console.log(_checkstatus_id);
        _product_item_action = 'edit';
        clearInputForm();
        CreateNewCheckList();
        $(`#select-edit-spec-quotation`).css('display', 'none');
        $("#txtquotationedit").css("display", "");
        renderEditSpec(_order_id, _spec_id, _checkstatus_id);
        var txtheader = settxtHeader(_checkstatus_id);
        if (_checkstatus_id == 5) {
            $("#lbldesignname").css("display", "none");
            $("#lblcommitdate").css("display", "none");
            $("#select-edit-spec-designName").css("display", "none");
            $("#input-edit-spec-due-date ").css("display", "none");
            $("#btnsavespec").css("display", "none");
        }
        else {
            $("#lbldesignname").css("display", "");
            $("#lblcommitdate").css("display", "");
            $("#select-edit-spec-designName").css("display", "");
            $("#input-edit-spec-due-date").css("display", "");
            $("#btnsavespec").css("display", "");
        }
        $(`#modal-editSpec #itemHeader`).text(txtheader);
        $('#form-editSpec #select-edit-spec-quotation').removeAttr("disabled");
        /* $('#form-editSpec #select-edit-spec-quotation').attr("onchange", "yourFunction()");*/
        $('#modal-editSpec').modal('show');
    });

    $('.btn-add-spec').on('click', function () {
        _product_item_action = 'add';
        clearInputForm();
        CreateNewCheckList();
        $("#select-edit-spec-quotation").css("display", "");
        $("#txtquotationedit").css("display", "none");
        $(`#modal-editSpec #itemHeader`).text('เพิ่มรายการบันทึกรับเรื่อง');
        $('#form-editSpec #select-edit-spec-quotation').removeAttr("disabled");
        /* $('#form-editSpec #select-edit-spec-quotation').attr("onchange", "yourFunction()");*/
        $('#modal-editSpec').modal('show');
    });

    $('.btn-modal-save-spec').on('click', function () {
        callSaveSpec();
    });

    $('#form-search-calculate .btn-search-calculate').on('click', function () {
        callGetFrameList();
    });

    $('#form-search-calculate-clearglass .btn-search-calculate-clearglass').on('click', function () {
        callGetGlassList();
    });

    $('#form-search-calculate .btn-clear-search-calculate').on('click', function () {
        var table = $('#tb-search-frameglass-list').DataTable();

        //clear datatable
        table.clear().draw();
        /*$('#tb-search-frameglass-list').DataTable().clear();*/
        $('#form-search-calculate input[name="input-search-calulate-code"]').val('');
        $('.btn-print-search-calculate').css('display', 'none');
    });

    $('#form-search-calculate-clearglass .btn-clear-search-calculate-clearglass').on('click', function () {
        var table = $('#tb-search-clearglass-list').DataTable();

        //clear datatable
        table.clear().draw();
        /*$('#tb-search-frameglass-list').DataTable().clear();*/
        $('#form-search-calculate-clearglass input[name="input-search-calulate-code-clearglass"]').val('');
        $('.btn-print-search-calculate-clearglass').css('display', 'none');
    });

    $('.btn-save-calculate').on('click', function () {
        saveCalculate();
    });
    $('.btn-clear-add-calculate').on('click', function () {
        clearcalinsert();
    });

    $('.btn-save-calculate-clearglass').on('click', function () {
        saveCalculateClearglass();
    });
    $('.btn-clear-add-calculate-clearglass').on('click', function () {
        clearcalglassinsert();
    });

    $('.btn-print-calculate').on('click', function () {
        saveCalculatePrint();
    });

    $('.btn-print-calculate-clearglass').on('click', function () {
        saveCalculateClearglassPrint();
    });

    $('.btn-print-search-calculate').on('click', function () {
        RePrintFrame();
    });
    $('.btn-print-search-calculate-clearglass').on('click', function () {
        ReprintClearGlass();
    });

    $('.btn-modal-print-cal').on('click', function () {
        DoPrintCal("modal-printFrameCalculate");
    });
    $('.btn-modal-reprint-cal').on('click', function () {
        DoRePrintCal("modal-ReprintFrameCalculate");
    });
    $('.btn-modal-print-cal-clearglass').on('click', function () {
        DoPrintClearGlassCal("modal-printClearglassCalculate");
    });
    $('.btn-modal-reprint-cal-clearglass').on('click', function () {
        DoRePrintClearGlassCal("modal-ReprintClearglassCalculate");
    });

    $('#form-add-calculate .btn-add-calculate').on('click', function () {
        var glassdoortype = $('#form-add-calculate #select-insert-glassdoor-type').val();
        var glassdoortypetext = $('#form-add-calculate #select-insert-glassdoor-type option:selected').text();
        var product = $('#form-add-calculate #select-insert-product-item').val();
        var producttext = $('#form-add-calculate #select-insert-product-item option:selected').text();
        var heigh = $('#form-add-calculate #input-insert-heigh-cupboard').val();
        var width = $('#form-add-calculate #input-insert-width-cupboard').val();

        $('#form-add-calculate #select-cal-quotation-no').attr("disabled");
        if (glassdoortype != '' && product != '' && heigh != '' && width != '') {
            var rowid = $('#tb-frameglass-list tr').length;
            /*$('#form-add-calculate #tb-product-list tbody').empty();*/
            var calhm = parseInt(heigh);
            var calwm = parseInt(width);
            var calh = parseFloat(parseInt(heigh) - 0.3);
            var calw = parseFloat((parseInt(width) - 0.5) / 2);
            if (glassdoortype == "S") {
                calw = parseFloat(width);
            }
            var row;
            row = $('<tr id="row' + rowid + '">');
            /*  row.append($('<td style="display:none;">').html(length));*/
            row.append($('<td style="display:none;">').html(product));
            row.append($('<td style="display:none;">').html(glassdoortype));
            row.append($('<td>').html(producttext));
            row.append($('<td>').html(calhm));
            row.append($('<td>').html(calwm));
            row.append($('<td>').html(calh));
            row.append($('<td>').html(calw));
            row.append($('<td>').html(parseFloat(calh - 0.7)));
            row.append($('<td>').html(parseFloat(calw - 3.7)));
            row.append($('<td>').html(glassdoortypetext));
            row.append($('<td>').html(`<button type="button" class="btn btn-primary btn-circle-xs btn-del-group"  onclick="delRowCal('#${"row"}${rowid}')" title="ลบ">
                    <i class="fa fa-trash"></i></button>`));
            $('#tb-frameglass-list').append(row);
            clearcalinsert();
        }
        else {
            var table = document.getElementById("tb-frameglass-list");
            var rows = table.getElementsByTagName("tr")
            for (var i = 0; i < rows.length; i++) {
                totalRowCount++;
                if (rows[i].getElementsByTagName("td").length > 0) {
                    rowCount++;
                }
            }

            if (rowCount == 0) {
                $('#form-add-calculate #select-cal-quotation-no').removeAttr("disabled");
            }
            Swal.fire({
                text: "กรุณากรอกข้อมูลให้ครบถ้วน",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: _modal_primary_color_code,
                //cancelButtonColor: _modal_default_color_code,
                confirmButtonText: 'ตกลง'
            }).then((result) => {

            });
           
        }
    });

    $('#form-add-calculate-clearglass .btn-add-calculate-clearglass').on('click', function () {
        var glassdoortype = $('#form-add-calculate-clearglass #select-insert-glassdoor-type-clearglass').val();
        var glassdoortypetext = $('#form-add-calculate-clearglass #select-insert-glassdoor-type-clearglass option:selected').text();
        var product = $('#form-add-calculate-clearglass #select-insert-product-item-clearglass').val();
        var producttext = $('#form-add-calculate-clearglass #select-insert-product-item-clearglass option:selected').text();
        var heigh = $('#form-add-calculate-clearglass #input-insert-heigh-cupboard-clearglass').val();
        var width = $('#form-add-calculate-clearglass #input-insert-width-cupboard-clearglass').val();

        $('#form-add-calculate-clearglass #select-clearglass-quotation-no').attr("disabled");
        if (glassdoortype != '' && product != '' && heigh != '' && width != '') {
            var rowid = $('#tb-clearglass-list tr').length;
            /*$('#form-add-calculate #tb-product-list tbody').empty();*/
            var calhm = parseInt(heigh);
            var calwm = parseInt(width);
            var calh = parseFloat(parseInt(heigh) - 0.7);
            var calw = parseFloat((parseInt(width) - 1) / 2);
            if (glassdoortype == "S") {
                calw = parseFloat((parseInt(width) - 0.6));
            }
            var row;
            row = $('<tr id="row' + rowid + '">');
            /*  row.append($('<td style="display:none;">').html(length));*/
            row.append($('<td style="display:none;">').html(product));
            row.append($('<td style="display:none;">').html(glassdoortype));
            row.append($('<td>').html(producttext));
            row.append($('<td>').html(calhm));
            row.append($('<td>').html(calwm));
            row.append($('<td>').html(calh));
            row.append($('<td>').html(calw));
            row.append($('<td>').html(glassdoortypetext));
            row.append($('<td>').html(`<button type="button" class="btn btn-primary btn-circle-xs btn-del-group"  onclick="delRowCal('#${"row"}${rowid}')" title="ลบ">
                    <i class="fa fa-trash"></i></button>`));
            $('#tb-clearglass-list').append(row);
            clearcalglassinsert();
        }
        else {
            var table = document.getElementById("tb-clearglass-list");
            var rows = table.getElementsByTagName("tr")
            for (var i = 0; i < rows.length; i++) {
                totalRowCount++;
                if (rows[i].getElementsByTagName("td").length > 0) {
                    rowCount++;
                }
            }

            if (rowCount == 0) {
                $('#form-add-calculate-clearglass #select-clearglass-quotation-no').removeAttr("disabled");
            }
            Swal.fire({
                text: "กรุณากรอกข้อมูลให้ครบถ้วน",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: _modal_primary_color_code,
                //cancelButtonColor: _modal_default_color_code,
                confirmButtonText: 'ตกลง'
            }).then((result) => {

            });
        }
    });

    $(document).on('click', '.btn-print-calf', function () {
        RePrintFrameList($(this).data('id'));

    });

    $(document).on('click', '.btn-print-calc', function () {
        RePrintGlassList($(this).data('id'));

    });

    $(document).on('click', '.btn-view-calf', function () {
        getPrintDetail($(this).data('id'));

    });

    $(document).on('click', '.btn-view-calc', function () {
        getPrintDetailClear($(this).data('id'));

    });
})
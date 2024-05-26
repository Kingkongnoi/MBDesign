$(function () {
    callSelect2Status('#form-createPlanks #select-planks-status');
    callSelectSizePlank('#form-createPlanks #select-planks-size');
    callSelect2Status('#form-search-planks #select-search-planks-status', true);
    callSpecListQuatationNoCal('#form-add-calculate #select-cal-quotation-no', 'กรุณาเลือก', 'F');
    callSpecListQuatationNoCal('#form-add-calculate-clearglass #select-clearglass-quotation-no', 'กรุณาเลือก', 'C');
    callSpecListQuatationNoPlanks('#form-createPlanks #select-quotation-no', 'กรุณาเลือก');
    callSpecListQuatationNoFitting('#form-createFitting #select-fitting-quotation-no', 'กรุณาเลือก');
    callSpecListQuatationNo('#form-editSpec #select-edit-spec-quotation', 'กรุณาเลือก');
    callGetDesign3DNameSelectSpec();
    callGetSpecList();
    callPlanksList();
    callFittingList();
    callSelectDoorType('#form-add-calculate #select-insert-glassdoor-type', true);
    callSelectDoorType('#form-add-calculate-clearglass #select-insert-glassdoor-type-clearglass', true);
    callStockProductData('#form-add-calculate #select-insert-product-item', 'กรุณาเลือก');
    callStockProductData('#form-add-calculate-clearglass #select-insert-product-item-clearglass', 'กรุณาเลือก');
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

    $('#form-search-fitting .btn-search-fitting').on('click', function () {
        callFittingList();
    });
    $('#form-search-fitting .btn-clear-search-fitting').on('click', function () {
        clearSearchForm("fitting");
        callFittingList();
    });

    $('#form-search-spec-queue .btn-clear-search-spec').on('click', function () {
        clearSearchForm("spec");
        callGetSpecList();
    });
    $('.btn-add-planks').on('click', function () {
        _product_item_action = 'add';
        clearInputPlankForm();
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
        if (_product_item_action == "edit") {
            $(`#select-quotation-no`).css('display', 'none');
            $("#input-quotation-no").css("display", "");
        }
        else {
            $(`#select-quotation-no`).css("display", "");
            $("#input-quotation-no").css('display', 'none');
        }
        //$('#modal-createProduct #divOptions').empty();
        $("#tb-planks-detail tbody tr").remove();

        callGetPlanksById($(this).data('id'), 'modal-createPlanks');
    });

    $(document).on('click', '.btn-edit-fitting', function () {
        $(`#modal-createFitting #itemHeader`).text('แก้ไขรายการสั่งไม้');
        $(`#modal-createFitting`).modal('show');
        _product_item_action = 'edit';
        clearForm('modal-createFitting');
        if (_product_item_action == "edit") {
            $('#form-createFitting #select-fitting-quotation-no').attr("disabled");

        }
        else {
            $('#form-createFitting #select-fitting-quotation-no').removeAttr("disabled");
        }
        //$('#modal-createProduct #divOptions').empty();
        callGetFittingById($(this).data('id'), 'modal-createFitting');
    });

    $('.btn-modal-save-planks').on('click', function () {
        DoAddOrUpdatePlanks("modal-createPlanks");
    });
    $('.btn-modal-save-fitting').on('click', function () {
        DoAddOrUpdateFitting("modal-createFitting");
    });

    $(document).on('click', '.btn-edit-spec', function () {
        var _order_id = $(this).data('orderid');
        var _spec_id = $(this).data('specid');
        var _checkstatus_id = $(this).data('step');
        //console.log(_order_id);
        //console.log(_spec_id);
        //console.log(_checkstatus_id);
        if (_spec_id == 0) {
            _product_item_action = 'add';
        }
        else {
            _product_item_action = 'edit';
        }
        $("#input-order-id").val(_order_id);

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

    $('#nav-tab-master-calculate #nav-search-frameglass-tab').on('click', function () {

        clearcalinsert();
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
            clearcalinsert2();
            var table = document.getElementById("tb-frameglass-list");
            var tbodyRowCount = table.tBodies[0].rows.length;

            if (tbodyRowCount > 0) {
                $('#form-add-calculate #select-cal-quotation-no').attr('disabled', 'disabled');
            }
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
            clearcalglassinsert2();
            var table = document.getElementById("tb-clearglass-list");
            var tbodyRowCount = table.tBodies[0].rows.length;

            if (tbodyRowCount > 0) {
                $('#form-add-calculate-clearglass #select-clearglass-quotation-no').attr('disabled', 'disabled');
            }
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
        RePrintFrameList($(this).data('id'), $(this).data('calid'));

    });

    $(document).on('click', '.btn-print-calc', function () {
        RePrintGlassList($(this).data('id'), $(this).data('calid'));

    });

    $(document).on('click', '.btn-view-calf', function () {
        getPrintDetail($(this).data('id'));

    });

    $(document).on('click', '.btn-view-calc', function () {
        getPrintDetailClear($(this).data('id'));

    });

    $(document).on('click', '.btn-print-planks', function () {

        //$('#modal-createProduct #divOptions').empty();
        printPlanks($(this).data('id'));
    });

    $('#form-createPlanks .btn-modal-add-planks').on('click', function () {

        if (_product_item_action != 'edit') {
            var obj = {
                id: ($('#input-planks-id').val() == "") ? 0 : $('#input-planks-id').val(),
                orderid: $('#form-createPlanks #select-quotation-no').val(),
                colorcode: $('#input-color-code').val(),
                planksizeid: $('#form-createPlanks #select-planks-size').val(),
                planksamount: $('#input-planks-amount').val(),
                remark: $('#input-planks-remark').val(),
                loginCode: _userCode
            };

            if (obj.colorcode != '' && obj.planksizeid != '' && obj.planksamount != '') {
                var rowid = $('#tb-planks-detail tr').length;
               /* var codelist = $("#hdplankslist").val();*/
                //var checkdup = false;


                //if (codelist != "") {
                //    var lst = codelist.split(',');
                //    for (var i = 0; i < lst.length; i++) {
                //        if (lst[i] == obj.stockproductcode) {
                //            checkdup = true;
                //        }
                //    }
                //    if (!checkdup) {
                //        $("#hdplankslist").val($("#hdplankslist").val() + ',' + obj.stockproductcode)
                //    }
                //}
                //else {
                //    $("#hdproductcodelist").val(obj.stockproductcode);
                //}

                //var lstcode = $("#hdproductcodelist").val().split(',');
                //for (var i = 0; i < lstcode; i++) {
                //    var lstdel = $("#hddelproductcodelist").val().split(',');
                //    if (lstdel.length > 0) {
                //        lstdel = jQuery.grep(lstdel, function (value) {
                //            return value != lstcode[i];
                //        });

                //        if (lstdel.length == 0) {
                //            $("#hddelproductcodelist").val('');
                //        }
                //        else {
                //            for (var i = 0; i < lstdel.length; i++) {
                //                if (i == 0) {
                //                    $("#hddelproductcodelist").val(lstdel[i]);
                //                }
                //                else {
                //                    $("#hddelproductcodelist").val($("#hddelproductcodelist").val() + ',' + lstdel[i]);
                //                }
                //            }
                //        }
                //    }
                //}

                /*               if (!checkdup) {*/

                //var productfull = $('#form-getInStock #select-getInStock-Product option:selected').text();
                //var productname;;
                //if (productfull != '') {
                //    productname = productfull.split('-');
                //}
                var row;
                row = $('<tr id="row' + rowid + '">');

                /*  row.append($('<td style="display:none;">').html(length));*/

                row.append($('<td style="display:none;">').html(0));
                row.append($('<td style="display:none;">').html(obj.id));
                row.append($('<td style="display:none;">').html(obj.planksizeid));
                row.append($('<td>').html(obj.colorcode));
                row.append($('<td>').html($('#form-createPlanks #select-planks-size option:selected').text()));
                row.append($('<td>').html(obj.planksamount));
                row.append($('<td>').html(obj.remark));

                row.append($('<td>').html(`<button type="button" class="btn btn-primary btn-circle-xs btn-del-planks-detail" onclick="delRowCalPlanks('#${"row"}${rowid}','${obj.id}')" title="ลบ">
                    <i class="fa fa-trash"></i></button>`));
                $('#tb-planks-detail').append(row);

                var table = document.getElementById("tb-planks-detail");
                var tbodyRowCount = table.tBodies[0].rows.length;

                if (tbodyRowCount > 0) {

                    $('#form-createPlanks #select-quotation-no').attr('disabled', 'disabled');
                }
                clearPlanksAdd();
            }
            else {
                var rowc = 0;
                var table = document.getElementById("tb-planks-detail");
                var rows = table.getElementsByTagName("tr")
                for (var i = 0; i < rows.length; i++) {

                    if (rows[i].getElementsByTagName("td").length > 0) {
                        rowc++;
                    }
                }

                if (rowc == 0) {
                    $('#form-createPlanks #select-quotation-no').removeAttr("disabled");
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
        }
        else {
            var obj = {
                id: ($('#input-planks-id').val() == "") ? 0 : $('#input-planks-id').val(),
                orderid: $('#form-createPlanks #select-quotation-no').val(),
                colorcode: $('#input-color-code').val(),
                planksizeid: $('#form-createPlanks #select-planks-size').val(),
                planksamount: $('#input-planks-amount').val(),
                remark: $('#input-planks-remark').val(),
                loginCode: _userCode
            };

            if (obj.colorcode != '' && obj.planksizeid != '' && obj.planksamount != '') {
                var rowid = $('#tb-stockin-detail tr').length;
                //var codelist = $("#hdproductcodelist").val();
                //var checkdup = false;


                //if (codelist != "") {
                //    var lst = codelist.split(',');
                //    for (var i = 0; i < lst.length; i++) {
                //        if (lst[i] == obj.stockproductcode) {
                //            checkdup = true;
                //        }
                //    }
                //    if (!checkdup) {
                //        $("#hdproductcodelist").val($("#hdproductcodelist").val() + ',' + obj.stockproductcode)
                //    }
                //}
                //else {
                //    $("#hdproductcodelist").val(obj.stockproductcode);
                //}


                /*   var lstcode = $("#hdproductcodelist").val().split(',');*/
                /*   for (var i = 0; i < lstcode.length; i++) {*/
                //var lstdel = $("#hddelplankslist").val().split(',');
                //if (lstdel.length > 0) {
                //    for (var i = 0; i < lstdel.length; i++) {
                //        if (i == 0) {
                //            $("#hddelplankslist").val(lstdel[i]);
                //        }
                //        else {
                //            $("#hddelplankslist").val($("#hddelplankslist").val() + ',' + lstdel[i]);
                //        }
                //    }
                //}
                //else {
                //    $("#hddelproductcodelist").val('');
                //}

                //var productfull = $('#form-getInStock #select-getInStock-Product option:selected').text();
                //var productname;;
                //if (productfull != '') {
                //    productname = productfull.split('-');
                //}
                var row;
                row = $('<tr id="row' + rowid + '">');
                /*  row.append($('<td style="display:none;">').html(length));*/

                row.append($('<td style="display:none;">').html(0));
                row.append($('<td style="display:none;">').html(obj.id));
                row.append($('<td style="display:none;">').html(obj.planksizeid));
                row.append($('<td>').html(obj.colorcode));
                row.append($('<td>').html($('#form-createPlanks #select-planks-size option:selected').text()));
                row.append($('<td>').html(obj.planksamount));
                row.append($('<td>').html(obj.remark));

                row.append($('<td>').html(`<button type="button" class="btn btn-primary btn-circle-xs btn-del-planks-detail"  onclick="delRowCalPlanks('#${"row"}${rowid}','${obj.id}')" title="ลบ">
                    <i class="fa fa-trash"></i></button>`));
                $('#tb-planks-detail').append(row);

                var table = document.getElementById("tb-planks-detail");
                var tbodyRowCount = table.tBodies[0].rows.length;

                if (tbodyRowCount > 0) {

                    $('form-createPlanks #select-quotation-no').attr('disabled', 'disabled');
                }


                clearPlanksAdd();
            }
            else {
                var rowc = 0;
                var table = document.getElementById("tb-planks-detail");
                var rows = table.getElementsByTagName("tr")
                for (var i = 0; i < rows.length; i++) {

                    if (rows[i].getElementsByTagName("td").length > 0) {
                        rowc++;
                    }
                }

                if (rowc == 0) {
                    $('#form-createPlanks #select-quotation-no').removeAttr("disabled");
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
        }
    });
})
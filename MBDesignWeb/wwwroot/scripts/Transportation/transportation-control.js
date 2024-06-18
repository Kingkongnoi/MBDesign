$(function () {
    callSelect2StatusTP('#form-search-tp-queue #select-search-tp-checklist-status', true);
    callGetTPList();
    callGetTPQList();
    callGetNameSelectTPQ();
    callGetNameSelectTP();
    callGetTPSelect('select-edit-tp-custname', 0);
    callGetTPSelect('select-edit-tp-number', 0);

    $('.btn-modal-save-tp').on('click', function () {
        callSaveTP();
    });

    $('.btn-modal-save-tpq').on('click', function () {
        callSaveTPQ();
    });
    $(document).on('click', '.btn-edit-tp', function () {
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
        CreateNewCheckListTP();
        //$(`#select-edit-tp-quotation`).css('display', 'none');
        //$("#txtquotationedit").css("display", "");
        renderEditTP(_order_id, _id, _checkstatus_id);
        var txtheader = settxtHeaderTP(_checkstatus_id);
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
        $(`#modal-editTP #itemHeader`).text(txtheader);
        /*        $('#form-editPD #select-edit-tp-quotation').removeAttr("disabled");*/
        /* $('#form-editSpec #select-edit-spec-quotation').attr("onchange", "yourFunction()");*/
        $('#modal-editTP').modal('show');
    });

    $(document).on('click', '.btn-edit-tpqlist', function () {
        _product_item_action = 'edit';
        clearTransQ();
        var _id = $(this).data('id');
        $('#input-tp-id').val(_id);
        console.log($('#input-tp-id').val());
        renderEditTPQ(_id);

        $(`#modal-TPQueue #itemHeader`).text('จัดคิวรถ');
        $('#modal-TPQueue').modal('show');
    });
    $('#form-search-tp-queue-list .btn-search-tpq').on('click', function () {
        callGetTPQList();
    });
    $('.btn-add-tpqueue').on('click', function () {
        _product_item_action = 'add';
        clearTransQ();
        $(`#select-edit-tpq-name`).removeAttr("disabled");
        //clearInputForm();
        //CreateNewCheckList();
        //$("#select-edit-spec-quotation").css("display", "");
        //$("#txtquotationedit").css("display", "none");
        $(`#modal-TPQueue #itemHeader`).text('จัดคิวรถ');
        /*        $('#form-editSpec #select-edit-spec-quotation').removeAttr("disabled");*/
        /* $('#form-editSpec #select-edit-spec-quotation').attr("onchange", "yourFunction()");*/
        $('#modal-TPQueue').modal('show');

    });

    $("input:checkbox").on('click', function () {
        // in the handler, 'this' refers to the box clicked on
        var $box = $(this);
        if ($box.is(":checked")) {
            // the name of the box is retrieved using the .attr() method
            // as it is assumed and expected to be immutable
            var group = "input:checkbox[name='" + $box.attr("name") + "']";
            // the checked state of the group/box on the other hand will change
            // and the current value is retrieved using .prop() method
            $(group).prop("checked", false);
            $box.prop("checked", true);
        } else {
            $box.prop("checked", false);
        }
    });

    $('#form-TPQueue .btn-modal-add-tpq').on('click', function () {
        var outbTime = getTime("timepicker1");
        var inbTime = getTime("timepicker2");

        if (_product_item_action != 'edit') {
            var obj = {
                id: ($('#input-tp-id').val() == "") ? 0 : $('#input-tp-id').val(),
                drivername: $('#txtdrivername').val(),
                transportationdate: $('#txttpdate').val(),
                subdrivername1: $('#txtsubdrivername1').val(),
                subdrivername2: $('#txtsubdrivername2').val(),
                outboundmileage: $('#txtoutboundmileage').val(),
                inboundmileage: $('#txtinboundmileage').val(),
                outboundtime: outbTime,
                inboundtime: inbTime,
                remark: $('#txttpremark').val(),
                loginCode: _userCode
            };

            var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
            var orderid = 0;
            var chkType = '';

            for (var i = 0; i < checkboxes.length; i++) {
                chkType = checkboxes[i].value;
            }

            if (chkType == '1') {
                orderid = $('#form-TPQueue #select-edit-tp-custname').val();
            }
            else if (chkType == '2') {
                orderid = $('#form-TPQueue #select-edit-tp-number').val();
            }
            if (orderid != '') {
                getItemList(orderid, obj, chkType);
            } else {

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
        //else {
        //    var obj = {
        //        id: ($('#input-getin-id').val() == "") ? 0 : $('#input-getin-id').val(),
        //        documentcode: $('#input-getInStock-code').val(),
        //        stockid: $('#form-getInStock #select-getInStock-Stock').val(),
        //        stockproductcode: $('#form-getInStock #select-getInStock-Product').val(),
        //        dealername: $('#input-getInStock-dealer').val(),
        //        receiverid: $('#form-getInStock #select-getInStock-by').val(),
        //        actiondate: $('#input-getInStock-date').val(),
        //        actiontype: 'I',
        //        amount: $('#input-getInStock-amount').val(),
        //        remark: $('#input-getInStock-remark').val(),
        //        status: ($('#form-getInStock #select-getInStock-status').val() == "1") ? true : false,
        //        loginCode: _userCode
        //    };

        //    if (obj.stockid != '' && obj.stockproductcode != '' && obj.dealername != '' && obj.receiverid != '' && obj.actiondate != '') {
        //        var rowid = $('#tb-stockin-detail tr').length;
        //        var codelist = $("#hdproductcodelist").val();
        //        var checkdup = false;


        //        if (codelist != "") {
        //            var lst = codelist.split(',');
        //            for (var i = 0; i < lst.length; i++) {
        //                if (lst[i] == obj.stockproductcode) {
        //                    checkdup = true;
        //                }
        //            }
        //            if (!checkdup) {
        //                $("#hdproductcodelist").val($("#hdproductcodelist").val() + ',' + obj.stockproductcode)
        //            }
        //        }
        //        else {
        //            $("#hdproductcodelist").val(obj.stockproductcode);
        //        }


        //        var lstcode = $("#hdproductcodelist").val().split(',');
        //        for (var i = 0; i < lstcode.length; i++) {
        //            var lstdel = $("#hddelproductcodelist").val().split(',');
        //            if (lstdel.length > 0) {
        //                lstdel = jQuery.grep(lstdel, function (value) {
        //                    return value != lstcode[i];
        //                });
        //                if (lstdel.length == 0) {
        //                    $("#hddelproductcodelist").val('');
        //                }
        //                else {
        //                    for (var i = 0; i < lstdel.length; i++) {
        //                        if (i == 0) {
        //                            $("#hddelproductcodelist").val(lstdel[i]);
        //                        }
        //                        else {
        //                            $("#hddelproductcodelist").val($("#hddelproductcodelist").val() + ',' + lstdel[i]);
        //                        }
        //                    }
        //                }

        //            }
        //            else {
        //                $("#hddelproductcodelist").val('');
        //            }
        //        }

        //        if (!checkdup) {
        //            var productfull = $('#form-getInStock #select-getInStock-Product option:selected').text();
        //            var productname;;
        //            if (productfull != '') {
        //                productname = productfull.split('-');
        //            }
        //            var row;
        //            row = $('<tr id="row' + rowid + '">');
        //            /*  row.append($('<td style="display:none;">').html(length));*/

        //            row.append($('<td style="display:none;">').html(rowid));
        //            row.append($('<td style="display:none;">').html(obj.stockid));
        //            row.append($('<td>').html(obj.stockproductcode));
        //            row.append($('<td>').html(productname[1]));
        //            row.append($('<td>').html($('#form-getInStock #select-getInStock-Stock option:selected').text()));
        //            row.append($('<td class="' + obj.stockproductcode + '_dealername">').html(obj.dealername));
        //            row.append($('<td>').html($('#form-getInStock #hdunitname').val()));
        //            row.append($('<td>').html($('#form-getInStock #unitprice').val()));
        //            row.append($('<td class="' + obj.stockproductcode + '_amount">').html(obj.amount));
        //            row.append($('<td class="' + obj.stockproductcode + '_remark">').html(obj.remark));

        //            row.append($('<td>').html(`<button type="button" class="btn btn-primary btn-circle-xs btn-del-group"  onclick="delRowCalManageStock('#${"row"}${rowid}','${obj.stockproductcode}')" title="ลบ">
        //            <i class="fa fa-trash"></i></button>`));
        //            $('#tb-stockin-detail').append(row);

        //            var table = document.getElementById("tb-stockin-detail");
        //            var tbodyRowCount = table.tBodies[0].rows.length;

        //            if (tbodyRowCount > 0) {

        //                $('#form-getInStock #select-getInStock-by').attr('disabled', 'disabled');
        //                $('#form-getInStock #input-getInStock-date').attr('disabled', 'disabled');
        //            }

        //        }
        //        else {
        //            $(`#tb-stockin-detail tr td.${obj.stockproductcode}_amount`).each(
        //                function () {
        //                    if ($(this).text() != obj.amount) {
        //                        $(this).text(obj.amount);
        //                    }
        //                }
        //            );

        //            $(`#tb-stockin-detail tr td.${obj.stockproductcode}_remark`).each(
        //                function () {
        //                    if ($(this).text() != obj.remark) {
        //                        $(this).text(obj.remark);
        //                    }
        //                }
        //            );

        //            $(`#tb-stockin-detail tr td.${obj.stockproductcode}_dealername`).each(
        //                function () {
        //                    if ($(this).text() != obj.dealername) {
        //                        $(this).text(obj.dealername);
        //                    }
        //                }
        //            );
        //        }
        //        clearGetinAdd();
        //    }
        //    else {
        //        var table = document.getElementById("tb-stockin-detail");
        //        var rows = table.getElementsByTagName("tr")
        //        for (var i = 0; i < rows.length; i++) {

        //            if (rows[i].getElementsByTagName("td").length > 0) {
        //                rowCount++;
        //            }
        //        }

        //        if (rowCount == 0) {
        //            $('#form-getInStock #select-getInStock-by').removeAttr("disabled");
        //            $('#form-getInStock #input-getInStock-date').removeAttr("disabled");
        //        }

        //        Swal.fire({
        //            text: "กรุณากรอกข้อมูลให้ครบถ้วน",
        //            icon: 'warning',
        //            showCancelButton: false,
        //            confirmButtonColor: _modal_primary_color_code,
        //            //cancelButtonColor: _modal_default_color_code,
        //            confirmButtonText: 'ตกลง'
        //        }).then((result) => {

        //        });
        //    }
        //}
    });

    $(document).on('click', '.btn-print-tpq', function () {

        //$('#modal-createProduct #divOptions').empty();
        printTransQ($(this).data('id'));
    });
})
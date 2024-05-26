﻿$(function () {

    const source = document.getElementById('input-subgroup-name');
    const result = document.getElementById('select-group-name');

    const inputHandler = function (e) {
        /*     console.log(e.target.value.trim());*/
        if (e.target.value.length > 0 && e.target.value.trim() != "") {
            $('#form-createSubGroup #select-group-name').removeAttr("disabled");
        }
        else {
            $('#form-createSubGroup #select-group-name').attr('disabled', 'disabled');
        }
    }

    source.addEventListener('input', inputHandler);
    source.addEventListener('propertychange', inputHandler);

    callSelect2Status('#form-createGroup #select-group-status');
    callSelect2Status('#form-search-Group #select-search-group-status', true);

    callSelect2Status('#form-createSubGroup #select-subgroup-status');
    callSelect2Status('#form-search-subgroup #select-search-subgroup-status', true);
    callGroupNameBySubGroup('#form-createSubGroup #select-group-name', 'กรุณาเลือก');

    callSelect2Status('#form-createBrand #select-brand-status');
    callSelect2Status('#form-search-brand #select-search-brand-status', true);

    callSelect2Status('#form-createUnit #select-unit-status');
    callSelect2Status('#form-search-Unit #select-search-unit-status', true);

    callSelect2Status('#form-createReceiver #select-receiver-status');
    callSelect2Status('#form-search-receiver #select-search-receiver-status', true);
    callEmpData('#form-createReceiver #select-receiver-empcode', 'กรุณาเลือก');

    callSelect2Status('#form-createStock #select-stock-status');
    callSelect2Status('#form-search-stock #select-search-stock-status', true);

    callSelect2Status('#form-search-viewstock #select-search-viewstock-status', true);
    callSelect2Status('#form-createStockProduct #select-viewstock-status', true);

    callSelect2Status('#form-search-stockin #select-search-stockin-status', true);
    callSelect2Status('#form-getInStock #select-getInStock-status', false);

    callSelect2Status('#form-search-stockout #select-search-stockout-status', true);
    callSelect2Status('#form-getOutStock #select-getOutStock-status', false);

    callGroupData('#form-search-viewstock #select-search-viewstock-group', 'ทั้งหมด');
    callGroupData('#form-createStockProduct #select-viewstock-group', 'กรุณาเลือก');
    callSubGroupData('#form-search-viewstock #select-search-viewstock-subgroup', 'ทั้งหมด');
    callSubGroupData('#form-createStockProduct #select-viewstock-subgroup', 'กรุณาเลือก');
    callBrandData('#form-search-viewstock #select-search-viewstock-brand', 'ทั้งหมด');
    callBrandData('#form-createStockProduct #select-viewstock-brand', 'กรุณาเลือก');
    callStockData('#form-search-viewstock #select-search-viewstock-stock', 'ทั้งหมด');
    callStockData('#form-createStockProduct #select-viewstock-stock', 'กรุณาเลือก');
    callStockData('#form-search-stockin #select-search-stockin-stock', '-- เลือกทั้งหมด --');
    callStockData('#form-search-stockout #select-search-stockout-stock', '-- เลือกทั้งหมด --');
    callStockData('#form-getOutStock #select-getOutStock-Stock', 'กรุณาเลือก');
    callStockData('#form-getInStock #select-getInStock-Stock', 'กรุณาเลือก');

    callUnitData('#form-createStockProduct #select-viewstock-unit', 'กรุณาเลือก');
    callRecieverList('#form-getInStock #select-getInStock-by', 'กรุณาเลือก');
    callRecieverList('#form-search-stockin #select-search-stockin-by', '-- เลือกทั้งหมด --')
    callRecieverList('#form-getOutStock #select-getOutStock-by', 'กรุณาเลือก');
    callRecieverList('#form-search-stockout #select-search-stockout-by', '-- เลือกทั้งหมด --')

    callGetGroupList();
    callGetSubGroupList();
    callGetBrandList();
    callGetUnitList();
    callGetReceiverList();
    callGetStockList();
    callGetStockProductList();
    callGetInList();
    callGetOutList();

    $('.btn-add-group').on('click', function () {
        _product_item_action = 'add';
        $(`#modal-createGroup #itemHeader`).text('เพิ่มหมวดหมู่หลัก');
        $('#modal-createGroup').modal('show');
    });

    $('.btn-add-subgroup').on('click', function () {
        _product_item_action = 'add';
        $(`#modal-createSubGroup #itemHeader`).text('เพิ่มหมวดหมู่ย่อย');
        $('#modal-createSubGroup').modal('show');
    });

    $('.btn-add-brand').on('click', function () {
        _product_item_action = 'add';
        $(`#modal-createBrand #itemHeader`).text('เพิ่มแบนรด์สินค้า');
        $('#modal-createBrand').modal('show');
    });

    $('.btn-add-unit').on('click', function () {
        _product_item_action = 'add';
        $(`#modal-createUnit #itemHeader`).text('เพิ่มหน่วยสินค้า');
        $('#modal-createUnit').modal('show');
    });

    $('.btn-add-receiver').on('click', function () {
        _product_item_action = 'add';
        $(`#modal-createReceiver #itemHeader`).text('เพิ่มผู้รับสินค้า');
        $('#modal-createReceiver').modal('show');
    });

    $('.btn-add-stock').on('click', function () {
        _product_item_action = 'add';
        $(`#modal-createStock #itemHeader`).text('เพิ่มคลังสินค้า');
        $('#modal-createStock').modal('show');
    });

    $('.btn-add-viewstock').on('click', function () {
        _product_item_action = 'add';
        $(`#modal-createStockProduct #itemHeader`).text('เพิ่มสินค้า');
        $('#modal-createStockProduct').modal('show');
    });

    $('.btn-add-getin').on('click', function () {
        _product_item_action = 'add';
        clearForm('modal-getInStock');
        $(`#modal-getInStock #itemHeader`).text('รับเข้าสินค้า');
        $('#modal-getInStock').modal('show');
        callSelect2Status('#form-getInStock #select-getInStock-status');
        callGetLastestGetInItemId();
    });

    $('.btn-add-getout').on('click', function () {
        _product_item_action = 'add';
        clearForm('modal-getOutStock');
        $(`#modal-getOutStock #itemHeader`).text('เบิกออกสินค้า');
        $('#modal-getOutStock').modal('show');
        callSelect2Status('#form-getOutStock #select-getOutStock-status');
        callGetLastestGetOutItemId();
    });

    $(document).on('click', '.btn-edit-product', function () {
        $(`#modal-createProduct #itemHeader`).text('แก้ไขข้อมูลสินค้า (Items)');
        $(`#modal-createProduct`).modal('show');
        _product_item_action = 'edit';
        clearForm('modal-createProduct');
        $('#modal-createProduct #divOptions').empty();
        callGetItemById($(this).data('id'), $(this).data('typeid'), 'modal-createProduct');
    });

    $(document).on('click', '.btn-edit-group', function () {
        $(`#modal-createGroup #itemHeader`).text('แก้ไขข้อมูลหมวดหมู่หลัก');
        $(`#modal-createGroup`).modal('show');
        _product_item_action = 'edit';
        clearForm('modal-createGroup');
        //$('#modal-createProduct #divOptions').empty();
        callGetGroupById($(this).data('id'), 'modal-creatGroup');
    });

    $(document).on('click', '.btn-edit-stockin', function () {
        $(`#modal-getInStock #itemHeader`).text('แก้ไขรับเข้าสินค้า');
        $(`#modal-getInStock`).modal('show');
        _product_item_action = 'edit';
        clearForm('modal-getInStock');
        //$('#modal-createProduct #divOptions').empty();
        callGetManangeListByID($(this).data('id'), 'modal-getInStock', 'getin');
    });

    $(document).on('click', '.btn-print-stockin', function () {

        //$('#modal-createProduct #divOptions').empty();
        printGetIn($(this).data('id'));
    });

    $(document).on('click', '.btn-print-stockout', function () {

        //$('#modal-createProduct #divOptions').empty();
        printGetOut($(this).data('id'));
    });

    $(document).on('click', '.btn-edit-stockout', function () {
        $(`#modal-getOutStock #itemHeader`).text('แก้ไขรับเข้าสินค้า');
        $(`#modal-getOutStock`).modal('show');
        _product_item_action = 'edit';
        clearForm('modal-getOutStock');
        //$('#modal-createProduct #divOptions').empty();
        callGetManangeListByID($(this).data('id'), 'modal-getOutStock', 'getout');
    });

    $(document).on('click', '.btn-edit-subgroup', function () {
        $(`#modal-createSubGroup #itemHeader`).text('แก้ไขข้อมูลหมวดหมู่ย่อย');
        $(`#modal-createSubGroup`).modal('show');
        _product_item_action = 'edit';
        clearForm('modal-createSubGroup');
        //$('#modal-createProduct #divOptions').empty();
        callGetSubGroupById($(this).data('id'), 'modal-creatSubGroup');
    });
    $(document).on('click', '.btn-edit-brand', function () {
        $(`#modal-createBrand #itemHeader`).text('แก้ไขข้อมูลแบรนด์สินค้า');
        $(`#modal-createBrand`).modal('show');
        _product_item_action = 'edit';
        clearForm('modal-createBrand');
        //$('#modal-createProduct #divOptions').empty();
        callGetBrandById($(this).data('id'), 'modal-createBrand');
    });
    $(document).on('click', '.btn-edit-unit', function () {
        $(`#modal-createUnit #itemHeader`).text('แก้ไขข้อมูลหน่วยสินค้า');
        $(`#modal-createUnit`).modal('show');
        _product_item_action = 'edit';
        clearForm('modal-createUnit');
        //$('#modal-createProduct #divOptions').empty();
        callGetUnitById($(this).data('id'), 'modal-createUnit');
    });
    $(document).on('click', '.btn-edit-receiver', function () {
        $(`#modal-createReceiver #itemHeader`).text('แก้ไขข้อมูลพนักงานรับสินค้า');
        $(`#modal-createReceiver`).modal('show');
        _product_item_action = 'edit';
        clearForm('modal-createReceiver');
        //$('#modal-createProduct #divOptions').empty();
        callGetReceiverById($(this).data('id'), 'modal-createReceiver');
    });

    $(document).on('click', '.btn-edit-stock', function () {
        $(`#modal-createStock #itemHeader`).text('แก้ไขข้อมูลคลังสินค้า');
        $(`#modal-createStock`).modal('show');
        _product_item_action = 'edit';
        clearForm('modal-createStock');
        //$('#modal-createProduct #divOptions').empty();
        callGetStockById($(this).data('id'), 'modal-creatStock');
    });
    $(document).on('click', '.btn-edit-viewstock', function () {
        $(`#modal-createStockProduct #itemHeader`).text('แก้ไขข้อมูลหมวดหมู่หลัก');
        $(`#modal-createStockProduct`).modal('show');
        _product_item_action = 'edit';
        clearForm('modal-createStockProduct');
        //$('#modal-createProduct #divOptions').empty();
        callGetStockProductById($(this).data('id'), 'modal-createStockProduct');
    });


    $('#tb-product-list').on('click', 'td.item-details', function () {
        var tr = $(this).closest('tr');

        var id = tr.data('id');
        var typeId = tr.data('typeid');

        $(`#modal-viewProduct`).modal('show');
        _product_item_action = 'view';
        clearForm('modal-viewProduct');
        $('#modal-viewProduct #divOptions').empty();
        callGetItemById(id, typeId, "modal-viewProduct", true);
    });

    $('#tb-group-list').on('click', 'td.item-details', function () {
        var tr = $(this).closest('tr');
        var id = tr.data('id');
        $(`#modal-viewGroup`).modal('show');
        _product_item_action = 'view';
        clearForm('modal-viewGroup');
        callGetGroupById(id, "modal-viewGroup", true);
    });

    $('#tb-subgroup-list').on('click', 'td.item-details', function () {
        var tr = $(this).closest('tr');
        var id = tr.data('id');
        $(`#modal-viewSubGroup`).modal('show');
        _product_item_action = 'view';
        clearForm('modal-viewSubGroup');
        callGetSubGroupById(id, "modal-viewSubGroup", true);
    });

    $('#tb-brand-list').on('click', 'td.item-details', function () {
        var tr = $(this).closest('tr');
        var id = tr.data('id');
        $(`#modal-viewBrand`).modal('show');
        _product_item_action = 'view';
        clearForm('modal-viewBrand');
        callGetBrandById(id, "modal-viewBrand", true);
    });

    $('#tb-unit-list').on('click', 'td.item-details', function () {
        var tr = $(this).closest('tr');
        var id = tr.data('id');
        $(`#modal-viewUnit`).modal('show');
        _product_item_action = 'view';
        clearForm('modal-viewUnit');
        callGetUnitById(id, "modal-viewUnit", true);
    });

    $('#tb-receiver-list').on('click', 'td.item-details', function () {
        var tr = $(this).closest('tr');
        var id = tr.data('id');
        $(`#modal-viewReceiver`).modal('show');
        _product_item_action = 'view';
        clearForm('modal-viewReceiver');
        callGetReceiverById(id, "modal-viewReceiver", true);
    });

    $('#tb-stock-list').on('click', 'td.item-details', function () {
        var tr = $(this).closest('tr');
        var id = tr.data('id');
        $(`#modal-viewStock`).modal('show');
        _product_item_action = 'view';
        clearForm('modal-viewStock');
        callGetStockById(id, "modal-viewStock", true);
    });

    $('#tb-viewstock-list').on('click', 'td.item-details', function () {
        var tr = $(this).closest('tr');
        var id = tr.data('id');
        $(`#modal-viewStockProduct`).modal('show');
        _product_item_action = 'view';
        clearForm('modal-viewStockProduct');
        callGetStockProductById(id, "modal-viewStockProduct", true);
    });
    /* End ProductItem */

    /* Begin ProductType */
    $('#nav-master-productType .btn-add-type').on('click', function () {
        _product_type_action = 'add';
        $(`#modal-createType #typeHeader`).text('เพิ่มหมวดหมู่');
        $(`#modal-createType`).modal('show');
    });

    $(document).on('click', '.btn-edit-type', function () {
        $(`#modal-createType #typeHeader`).text('แก้ไขหมวดหมู่');
        $(`#modal-createType`).modal('show');
        _product_type_action = 'edit';
        callGetTypeById($(this).data('id'));
    });

    $(`#modal-createGroup`).on('show.bs.modal', function () {
        clearForm("modal-createGroup");
        if (_product_item_action == 'add') { callGroupID(); }
    });

    $(`#modal-createSubGroup`).on('show.bs.modal', function () {
        clearForm("modal-createSubGroup");
        if (_product_item_action == 'add') { }
    });

    $(`#modal-createBrand`).on('show.bs.modal', function () {
        clearForm("modal-createBrand");
        if (_product_item_action == 'add') { callBrandCode(); }
    });

    $(`#modal-createUnit`).on('show.bs.modal', function () {
        clearForm("modal-createUnit");
        if (_product_item_action == 'add') { callUnitID(); }
    });

    $(`#modal-createReceiver`).on('show.bs.modal', function () {
        clearForm("modal-createReceiver");
        if (_product_item_action == 'add') { }
    });

    $(`#modal-createStock`).on('show.bs.modal', function () {
        clearForm("modal-createStock");
        if (_product_item_action == 'add') { callStockID(); }
    });

    $(`#modal-createStockProduct`).on('show.bs.modal', function () {
        clearForm("modal-createStockProduct");
        if (_product_item_action == 'add') { callStockProductCode(); }
    });

    $('.btn-modal-save-group').on('click', function () {
        DoAddOrUpdateGroup("modal-createGroup");
    });

    $('.btn-modal-save-subgroup').on('click', function () {
        DoAddOrUpdateSubGroup("modal-createSubGroup");
    });

    $('.btn-modal-save-brand').on('click', function () {
        DoAddOrUpdateBrand("modal-createBrand");
    });
    $('.btn-modal-save-unit').on('click', function () {
        DoAddOrUpdateUnit("modal-createUnit");
    });

    $('.btn-modal-save-receiver').on('click', function () {
        DoAddOrUpdateReceiver("modal-createReceiver");
    });

    $('.btn-modal-save-stock').on('click', function () {
        DoAddOrUpdateStock("modal-createStock");
    });
    $('.btn-modal-save-getin').on('click', function () {
        DoAddOrUpdateGetin("modal-getInStock");
    });
    $('.btn-modal-cancel-getin').on('click', function () {
        clearGetinSave();
    });
    $('.btn-modal-cancel-getout').on('click', function () {
        clearGetoutSave();
    });
    $('.btn-modal-save-getout').on('click', function () {
        DoAddOrUpdateGetout("modal-getOutStock");
    });
    $('.btn-modal-save-viewstock').on('click', function () {
        DoAddOrUpdateStockProduct("modal-createStockProduct");
    });
    $('#form-search-Group .btn-search-group').on('click', function () {
        callGetGroupList();
    });

    $('#form-search-Group .btn-clear-search-group').on('click', function () {
        clearSearchForm("group");
        callGetGroupList();
    });

    $('#form-search-subgroup .btn-search-subgroup').on('click', function () {
        callGetSubGroupList();
    });

    $('#form-search-subgroup .btn-clear-search-subgroup').on('click', function () {
        clearSearchForm("subgroup");
        callGetSubGroupList();
    });

    $('#form-search-brand .btn-search-brand').on('click', function () {
        callGetBrandList();
    });

    $('#form-search-brand .btn-clear-search-brand').on('click', function () {
        clearSearchForm("brand");
        callGetBrandList();
    });


    $('#form-search-Unit .btn-search-unit').on('click', function () {
        callGetUnitList();
    });

    $('#form-search-Unit .btn-clear-search-unit').on('click', function () {
        clearSearchForm("unit");
        callGetUnitList();
    });

    $('#form-search-receiver .btn-search-receiver').on('click', function () {
        callGetReceiverList();
    });

    $('#form-search-receiver .btn-clear-search-receiver').on('click', function () {
        clearSearchForm("receiver");
        callGetReceiverList();
    });

    $('#form-search-stock .btn-search-stock').on('click', function () {
        callGetStockList();
    });

    $('#form-search-stock .btn-clear-search-stock').on('click', function () {
        clearSearchForm("stock");
        callGetStockList();
    });

    $('#form-search-stockin .btn-search-stockin').on('click', function () {
        callGetInList();
    });

    $('#form-search-stockin .btn-search-stockout').on('click', function () {
        callGetOutList();
    });

    $('#form-search-viewstock .btn-search-viewstock').on('click', function () {
        callGetStockProductList();
    });

    $('#form-search-viewstock .btn-clear-search-viewstock').on('click', function () {
        clearSearchForm("viewstock");
        callGetStockProductList();
    });

    $('#form-search-stockin .btn-clear-search-stockin').on('click', function () {
        clearSearchForm("stockin");
        callGetInList();
    });

    $('#form-search-stockout .btn-clear-search-stockout').on('click', function () {
        clearSearchForm("stockout");
        callGetOutList();
    });

    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).data("bs-target") // activated tab
        if (target == "#nav-store-Group") {
            clearSearchForm("group");
            //callProductTypeSelect2('#form-createProduct #select-product-type', 'กรุณาเลือก')
            /*      callProductTypeSelect2('#form-search-Group #select-search-product-type', 'ทั้งหมด');*/
            callGetGroupList();

        }
        else if (target == "#nav-master-SubGroup") {
            clearSearchForm("subgroup");
            //callProductTypeSelect2('#form-createProduct #select-product-type', 'กรุณาเลือก')
            /*      callProductTypeSelect2('#form-search-Group #select-search-product-type', 'ทั้งหมด');*/
            callGetSubGroupList();

        }
        else if (target == "#nav-master-Brand") {
            clearSearchForm("brand");
            //callProductTypeSelect2('#form-createProduct #select-product-type', 'กรุณาเลือก')
            /*      callProductTypeSelect2('#form-search-Group #select-search-product-type', 'ทั้งหมด');*/
            callGetBrandList();

        }
        else if (target == "#nav-master-Unit") {
            clearSearchForm("unit");
            //callProductTypeSelect2('#form-createProduct #select-product-type', 'กรุณาเลือก')
            /*      callProductTypeSelect2('#form-search-Group #select-search-product-type', 'ทั้งหมด');*/
            callGetUnitList();

        }
        else if (target == "#nav-master-Reciever") {
            clearSearchForm("receiver");
            //callProductTypeSelect2('#form-createProduct #select-product-type', 'กรุณาเลือก')
            /*      callProductTypeSelect2('#form-search-Group #select-search-product-type', 'ทั้งหมด');*/
            callGetReceiverList();

        }
        else if (target == "#nav-master-Stock") {
            clearSearchForm("stock");
            //callProductTypeSelect2('#form-createProduct #select-product-type', 'กรุณาเลือก')
            /*      callProductTypeSelect2('#form-search-Group #select-search-product-type', 'ทั้งหมด');*/
            callGetStockList();

        }
        else if (target == "#nav-master-viewStock") {
            clearSearchForm("viewstock");
            //callProductTypeSelect2('#form-createProduct #select-product-type', 'กรุณาเลือก')
            /*      callProductTypeSelect2('#form-search-Group #select-search-product-type', 'ทั้งหมด');*/
            callGetStockProductList();

        }
        else if (target == "#nav-master-getIn") {
            clearSearchForm("stockin");
            //callProductTypeSelect2('#form-createProduct #select-product-type', 'กรุณาเลือก')
            /*      callProductTypeSelect2('#form-search-Group #select-search-product-type', 'ทั้งหมด');*/
            callGetInList();

        }
        else if (target == "#nav-master-getOut") {
            clearSearchForm("stockout");
            //callProductTypeSelect2('#form-createProduct #select-product-type', 'กรุณาเลือก')
            /*      callProductTypeSelect2('#form-search-Group #select-search-product-type', 'ทั้งหมด');*/
            callGetOutList();

        }
    });

    $('#form-getInStock .btn-modal-add-getin').on('click', function () {

        if (_product_item_action != 'edit') {
            var obj = {
                id: ($('#input-getin-id').val() == "") ? 0 : $('#input-getin-id').val(),
                documentcode: $('#input-getInStock-code').val(),
                stockid: $('#form-getInStock #select-getInStock-Stock').val(),
                stockproductcode: $('#form-getInStock #select-getInStock-Product').val(),
                dealername: $('#input-getInStock-dealer').val(),
                receiverid: $('#form-getInStock #select-getInStock-by').val(),
                actiondate: $('#input-getInStock-date').val(),
                actiontype: 'I',
                amount: $('#input-getInStock-amount').val(),
                remark: $('#input-getInStock-remark').val(),
                status: ($('#form-getInStock #select-getInStock-status').val() == "1") ? true : false,
                loginCode: _userCode
            };

            if (obj.stockid != '' && obj.stockproductcode != '' && obj.dealername != '' && obj.receiverid != '' && obj.actiondate != '') {
                var rowid = $('#tb-stockin-detail tr').length;
                var codelist = $("#hdproductcodelist").val();
                var checkdup = false;


                if (codelist != "") {
                    var lst = codelist.split(',');
                    for (var i = 0; i < lst.length; i++) {
                        if (lst[i] == obj.stockproductcode) {
                            checkdup = true;
                        }
                    }
                    if (!checkdup) {
                        $("#hdproductcodelist").val($("#hdproductcodelist").val() + ',' + obj.stockproductcode)
                    }
                }
                else {
                    $("#hdproductcodelist").val(obj.stockproductcode);
                }

                var lstcode = $("#hdproductcodelist").val().split(',');
                for (var i = 0; i < lstcode; i++) {
                    var lstdel = $("#hddelproductcodelist").val().split(',');
                    if (lstdel.length > 0) {
                        lstdel = jQuery.grep(lstdel, function (value) {
                            return value != lstcode[i];
                        });

                        console.log(lstdel);

                        if (lstdel.length == 0) {
                            $("#hddelproductcodelist").val('');
                        }
                        else {
                            for (var i = 0; i < lstdel.length; i++) {
                                if (i == 0) {
                                    $("#hddelproductcodelist").val(lstdel[i]);
                                }
                                else {
                                    $("#hddelproductcodelist").val($("#hddelproductcodelist").val() + ',' + lstdel[i]);
                                }
                            }
                        }
                    }
                }
                //for (var i = 0; i < lstcode.length; i++) {
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
                //    else {
                //        $("#hddelproductcodelist").val('');
                //    }
                //}


                if (!checkdup) {

                    var productfull = $('#form-getInStock #select-getInStock-Product option:selected').text();
                    var productname;;
                    if (productfull != '') {
                        productname = productfull.split('-');
                    }
                    var row;
                    row = $('<tr id="row' + rowid + '">');

                    /*  row.append($('<td style="display:none;">').html(length));*/

                    row.append($('<td style="display:none;">').html(rowid));
                    row.append($('<td style="display:none;">').html(obj.stockid));
                    row.append($('<td>').html(obj.stockproductcode));
                    row.append($('<td>').html(productname[1]));
                    row.append($('<td>').html($('#form-getInStock #select-getInStock-Stock option:selected').text()));
                    row.append($('<td class="' + obj.stockproductcode + '_dealername">').html(obj.dealername));
                    row.append($('<td>').html($('#form-getInStock #hdunitname').val()));
                    row.append($('<td>').html($('#form-getInStock #unitprice').val()));
                    row.append($('<td class="' + obj.stockproductcode + '_amount">').html(obj.amount));
                    row.append($('<td class="' + obj.stockproductcode + '_remark">').html(obj.remark));

                    row.append($('<td>').html(`<button type="button" class="btn btn-primary btn-circle-xs btn-del-group"  onclick="delRowCalManageStock('#${"row"}${rowid}','${obj.stockproductcode}')" title="ลบ">
                    <i class="fa fa-trash"></i></button>`));
                    $('#tb-stockin-detail').append(row);

                    var table = document.getElementById("tb-stockin-detail");
                    var tbodyRowCount = table.tBodies[0].rows.length;

                    if (tbodyRowCount > 0) {

                        $('#form-getInStock #select-getInStock-by').attr('disabled', 'disabled');
                        $('#form-getInStock #input-getInStock-date').attr('disabled', 'disabled');
                    }

                }
                else {
                    $(`#tb-stockin-detail tr td.${obj.stockproductcode}_amount`).each(
                        function () {
                            if ($(this).text() != obj.amount) {
                                $(this).text(obj.amount);
                            }
                        }
                    );

                    $(`#tb-stockin-detail tr td.${obj.stockproductcode}_remark`).each(
                        function () {
                            if ($(this).text() != obj.remark) {
                                $(this).text(obj.remark);
                            }
                        }
                    );

                    $(`#tb-stockin-detail tr td.${obj.stockproductcode}_dealername`).each(
                        function () {
                            if ($(this).text() != obj.dealername) {
                                $(this).text(obj.dealername);
                            }
                        }
                    );
                }
                clearGetinAdd();
            }
            else {
                var table = document.getElementById("tb-stockin-detail");
                var rows = table.getElementsByTagName("tr")
                for (var i = 0; i < rows.length; i++) {

                    if (rows[i].getElementsByTagName("td").length > 0) {
                        rowCount++;
                    }
                }

                if (rowCount == 0) {
                    $('#form-getInStock #select-getInStock-by').removeAttr("disabled");
                    $('#form-getInStock #input-getInStock-date').removeAttr("disabled");
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
                id: ($('#input-getin-id').val() == "") ? 0 : $('#input-getin-id').val(),
                documentcode: $('#input-getInStock-code').val(),
                stockid: $('#form-getInStock #select-getInStock-Stock').val(),
                stockproductcode: $('#form-getInStock #select-getInStock-Product').val(),
                dealername: $('#input-getInStock-dealer').val(),
                receiverid: $('#form-getInStock #select-getInStock-by').val(),
                actiondate: $('#input-getInStock-date').val(),
                actiontype: 'I',
                amount: $('#input-getInStock-amount').val(),
                remark: $('#input-getInStock-remark').val(),
                status: ($('#form-getInStock #select-getInStock-status').val() == "1") ? true : false,
                loginCode: _userCode
            };

            if (obj.stockid != '' && obj.stockproductcode != '' && obj.dealername != '' && obj.receiverid != '' && obj.actiondate != '') {
                var rowid = $('#tb-stockin-detail tr').length;
                var codelist = $("#hdproductcodelist").val();
                var checkdup = false;


                if (codelist != "") {
                    var lst = codelist.split(',');
                    for (var i = 0; i < lst.length; i++) {
                        if (lst[i] == obj.stockproductcode) {
                            checkdup = true;
                        }
                    }
                    if (!checkdup) {
                        $("#hdproductcodelist").val($("#hdproductcodelist").val() + ',' + obj.stockproductcode)
                    }
                }
                else {
                    $("#hdproductcodelist").val(obj.stockproductcode);
                }


                var lstcode = $("#hdproductcodelist").val().split(',');
                for (var i = 0; i < lstcode.length; i++) {
                    var lstdel = $("#hddelproductcodelist").val().split(',');
                    if (lstdel.length > 0) {
                        lstdel = jQuery.grep(lstdel, function (value) {
                            return value != lstcode[i];
                        });
                        if (lstdel.length == 0) {
                            $("#hddelproductcodelist").val('');
                        }
                        else {
                            for (var i = 0; i < lstdel.length; i++) {
                                if (i == 0) {
                                    $("#hddelproductcodelist").val(lstdel[i]);
                                }
                                else {
                                    $("#hddelproductcodelist").val($("#hddelproductcodelist").val() + ',' + lstdel[i]);
                                }
                            }
                        }

                    }
                    else {
                        $("#hddelproductcodelist").val('');
                    }
                }

                if (!checkdup) {
                    var productfull = $('#form-getInStock #select-getInStock-Product option:selected').text();
                    var productname;;
                    if (productfull != '') {
                        productname = productfull.split('-');
                    }
                    var row;
                    row = $('<tr id="row' + rowid + '">');
                    /*  row.append($('<td style="display:none;">').html(length));*/

                    row.append($('<td style="display:none;">').html(rowid));
                    row.append($('<td style="display:none;">').html(obj.stockid));
                    row.append($('<td>').html(obj.stockproductcode));
                    row.append($('<td>').html(productname[1]));
                    row.append($('<td>').html($('#form-getInStock #select-getInStock-Stock option:selected').text()));
                    row.append($('<td class="' + obj.stockproductcode + '_dealername">').html(obj.dealername));
                    row.append($('<td>').html($('#form-getInStock #hdunitname').val()));
                    row.append($('<td>').html($('#form-getInStock #unitprice').val()));
                    row.append($('<td class="' + obj.stockproductcode + '_amount">').html(obj.amount));
                    row.append($('<td class="' + obj.stockproductcode + '_remark">').html(obj.remark));

                    row.append($('<td>').html(`<button type="button" class="btn btn-primary btn-circle-xs btn-del-group"  onclick="delRowCalManageStock('#${"row"}${rowid}','${obj.stockproductcode}')" title="ลบ">
                    <i class="fa fa-trash"></i></button>`));
                    $('#tb-stockin-detail').append(row);

                    var table = document.getElementById("tb-stockin-detail");
                    var tbodyRowCount = table.tBodies[0].rows.length;

                    if (tbodyRowCount > 0) {

                        $('#form-getInStock #select-getInStock-by').attr('disabled', 'disabled');
                        $('#form-getInStock #input-getInStock-date').attr('disabled', 'disabled');
                    }

                }
                else {
                    $(`#tb-stockin-detail tr td.${obj.stockproductcode}_amount`).each(
                        function () {
                            if ($(this).text() != obj.amount) {
                                $(this).text(obj.amount);
                            }
                        }
                    );

                    $(`#tb-stockin-detail tr td.${obj.stockproductcode}_remark`).each(
                        function () {
                            if ($(this).text() != obj.remark) {
                                $(this).text(obj.remark);
                            }
                        }
                    );

                    $(`#tb-stockin-detail tr td.${obj.stockproductcode}_dealername`).each(
                        function () {
                            if ($(this).text() != obj.dealername) {
                                $(this).text(obj.dealername);
                            }
                        }
                    );
                }
                clearGetinAdd();
            }
            else {
                var table = document.getElementById("tb-stockin-detail");
                var rows = table.getElementsByTagName("tr")
                for (var i = 0; i < rows.length; i++) {

                    if (rows[i].getElementsByTagName("td").length > 0) {
                        rowCount++;
                    }
                }

                if (rowCount == 0) {
                    $('#form-getInStock #select-getInStock-by').removeAttr("disabled");
                    $('#form-getInStock #input-getInStock-date').removeAttr("disabled");
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

    $('#form-getOutStock .btn-modal-add-getout').on('click', function () {

        if (_product_item_action != 'edit') {
            var obj = {
                id: ($('#input-getout-id').val() == "") ? 0 : $('#input-getout-id').val(),
                documentcode: $('#input-getOutStock-code').val(),
                stockid: $('#form-getOutStock #select-getOutStock-Stock').val(),
                stockproductcode: $('#form-getOutStock #select-getOutStock-Product').val(),
                dealername: $('#input-getOutStock-dealer').val(),
                receiverid: $('#form-getOutStock #select-getOutStock-by').val(),
                actiondate: $('#input-getOutStock-date').val(),
                actiontype: 'O',
                amount: $('#input-getOutStock-amount').val(),
                remark: $('#input-getOutStock-remark').val(),
                status: ($('#form-getOutStock #select-getOutStock-status').val() == "1") ? true : false,
                loginCode: _userCode
            };

            if (obj.stockid != '' && obj.stockproductcode != '' && obj.dealername != '' && obj.receiverid != '' && obj.actiondate != '') {
                var rowid = $('#tb-stockout-detail tr').length;
                var codelist = $("#hdproductcodelistout").val();
                var checkdup = false;

                if (codelist != "") {
                    var lst = codelist.split(',');
                    for (var i = 0; i < lst.length; i++) {
                        if (lst[i] == obj.stockproductcode) {
                            checkdup = true;
                        }
                    }
                    if (!checkdup) {
                        $("#hdproductcodelistout").val($("#hdproductcodelistout").val() + ',' + obj.stockproductcode)
                    }
                }
                else {
                    $("#hdproductcodelistout").val(obj.stockproductcode);
                }

                var lstcode = $("#hdproductcodelistout").val().split(',');
                for (var i = 0; i < lstcode; i++) {
                    var lstdel = $("#hddelproductcodelistout").val().split(',');
                    if (lstdel.length > 0) {
                        lstdel = jQuery.grep(lstdel, function (value) {
                            return value != lstcode[i];
                        });

                        console.log(lstdel);

                        if (lstdel.length == 0) {
                            $("#hddelproductcodelistout").val('');
                        }
                        else {
                            for (var i = 0; i < lstdel.length; i++) {
                                if (i == 0) {
                                    $("#hddelproductcodelistout").val(lstdel[i]);
                                }
                                else {
                                    $("#hddelproductcodelistout").val($("#hddelproductcodelistout").val() + ',' + lstdel[i]);
                                }
                            }
                        }
                    }
                }
                if (!checkdup) {

                    var productfull = $('#form-getOutStock #select-getOutStock-Product option:selected').text();
                    var productname;;
                    if (productfull != '') {
                        productname = productfull.split('-');
                    }
                    var row;
                    row = $('<tr id="row' + rowid + '">');

                    /*  row.append($('<td style="display:none;">').html(length));*/

                    row.append($('<td style="display:none;">').html(rowid));
                    row.append($('<td style="display:none;">').html(obj.stockid));
                    row.append($('<td>').html(obj.stockproductcode));
                    row.append($('<td>').html(productname[1]));
                    row.append($('<td>').html($('#form-getOutStock #select-getOutStock-Stock option:selected').text()));
                    row.append($('<td class="' + obj.stockproductcode + '_dealername">').html(obj.dealername));
                    row.append($('<td>').html($('#form-getOutStock #hdunitname').val()));
                    row.append($('<td>').html($('#form-getOutStock #unitprice').val()));
                    row.append($('<td class="' + obj.stockproductcode + '_amount">').html(obj.amount));
                    row.append($('<td class="' + obj.stockproductcode + '_remark">').html(obj.remark));

                    row.append($('<td>').html(`<button type="button" class="btn btn-primary btn-circle-xs btn-del-group"  onclick="delRowCalManageStock('#${"row"}${rowid}','${obj.stockproductcode}')" title="ลบ">
                    <i class="fa fa-trash"></i></button>`));
                    $('#tb-stockout-detail').append(row);

                    var table = document.getElementById("tb-stockout-detail");
                    var tbodyRowCount = table.tBodies[0].rows.length;

                    if (tbodyRowCount > 0) {

                        $('#form-getOutStock #select-getOutStock-by').attr('disabled', 'disabled');
                        $('#form-getOutStock #input-getOutStock-date').attr('disabled', 'disabled');
                    }

                }
                else {
                    $(`#tb-stockout-detail tr td.${obj.stockproductcode}_amount`).each(
                        function () {
                            if ($(this).text() != obj.amount) {
                                $(this).text(obj.amount);
                            }
                        }
                    );

                    $(`#tb-stockout-detail tr td.${obj.stockproductcode}_remark`).each(
                        function () {
                            if ($(this).text() != obj.remark) {
                                $(this).text(obj.remark);
                            }
                        }
                    );

                    $(`#tb-stockout-detail tr td.${obj.stockproductcode}_dealername`).each(
                        function () {
                            if ($(this).text() != obj.dealername) {
                                $(this).text(obj.dealername);
                            }
                        }
                    );
                }
                clearGetoutAdd();
            }
            else {
                var table = document.getElementById("tb-stockout-detail");
                var rows = table.getElementsByTagName("tr")
                for (var i = 0; i < rows.length; i++) {

                    if (rows[i].getElementsByTagName("td").length > 0) {
                        rowCount++;
                    }
                }

                if (rowCount == 0) {
                    $('#form-getOutStock #select-getOutStock-by').removeAttr("disabled");
                    $('#form-getOutStock #input-getOutStock-date').removeAttr("disabled");
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
                id: ($('#input-getout-id').val() == "") ? 0 : $('#input-getout-id').val(),
                documentcode: $('#input-getOutStock-code').val(),
                stockid: $('#form-getOutStock #select-getOutStock-Stock').val(),
                stockproductcode: $('#form-getInStock #select-getOutStock-Product').val(),
                dealername: $('#input-getOutStock-dealer').val(),
                receiverid: $('#form-getOutStock #select-getOutStock-by').val(),
                actiondate: $('#input-getOutStock-date').val(),
                actiontype: 'I',
                amount: $('#input-getOutStock-amount').val(),
                remark: $('#input-getOutStock-remark').val(),
                status: ($('#form-getOutStock #select-getOutStock-status').val() == "1") ? true : false,
                loginCode: _userCode
            };

            if (obj.stockid != '' && obj.stockproductcode != '' && obj.dealername != '' && obj.receiverid != '' && obj.actiondate != '') {
                var rowid = $('#tb-stockout-detail tr').length;
                var codelist = $("#hdproductcodelistout").val();
                var checkdup = false;


                if (codelist != "") {
                    var lst = codelist.split(',');
                    for (var i = 0; i < lst.length; i++) {
                        if (lst[i] == obj.stockproductcode) {
                            checkdup = true;
                        }
                    }
                    if (!checkdup) {
                        $("#hdproductcodelistout").val($("#hdproductcodelistout").val() + ',' + obj.stockproductcode)
                    }
                }
                else {
                    $("#hdproductcodelistout").val(obj.stockproductcode);
                }


                var lstcode = $("#hdproductcodelistout").val().split(',');
                for (var i = 0; i < lstcode.length; i++) {
                    var lstdel = $("#hddelproductcodelistout").val().split(',');
                    if (lstdel.length > 0) {
                        lstdel = jQuery.grep(lstdel, function (value) {
                            return value != lstcode[i];
                        });
                        if (lstdel.length == 0) {
                            $("#hddelproductcodelistout").val('');
                        }
                        else {
                            for (var i = 0; i < lstdel.length; i++) {
                                if (i == 0) {
                                    $("#hddelproductcodelistout").val(lstdel[i]);
                                }
                                else {
                                    $("#hddelproductcodelistout").val($("#hddelproductcodelistout").val() + ',' + lstdel[i]);
                                }
                            }
                        }

                    }
                    //else {
                    //    $("#hddelproductcodelistout").val('');
                    //}
                }

                if (!checkdup) {
                    var productfull = $('#form-getOutStock #select-getOutStock-Product option:selected').text();
                    var productname;;
                    if (productfull != '') {
                        productname = productfull.split('-');
                    }
                    var row;
                    row = $('<tr id="row' + rowid + '">');
                    /*  row.append($('<td style="display:none;">').html(length));*/

                    row.append($('<td style="display:none;">').html(rowid));
                    row.append($('<td style="display:none;">').html(obj.stockid));
                    row.append($('<td>').html(obj.stockproductcode));
                    row.append($('<td>').html(productname[1]));
                    row.append($('<td>').html($('#form-getOutStock #select-getOutStock-Stock option:selected').text()));
                    row.append($('<td class="' + obj.stockproductcode + '_dealername">').html(obj.dealername));
                    row.append($('<td>').html($('#form-getOutStock #hdunitname').val()));
                    row.append($('<td>').html($('#form-getOutStock #unitprice').val()));
                    row.append($('<td class="' + obj.stockproductcode + '_amount">').html(obj.amount));
                    row.append($('<td class="' + obj.stockproductcode + '_remark">').html(obj.remark));

                    row.append($('<td>').html(`<button type="button" class="btn btn-primary btn-circle-xs btn-del-group"  onclick="delRowCalManageStock('#${"row"}${rowid}','${obj.stockproductcode}')" title="ลบ">
                    <i class="fa fa-trash"></i></button>`));
                    $('#tb-stockout-detail').append(row);

                    var table = document.getElementById("tb-stockout-detail");
                    var tbodyRowCount = table.tBodies[0].rows.length;

                    if (tbodyRowCount > 0) {

                        $('#form-getOutStock #select-getOutStock-by').attr('disabled', 'disabled');
                        $('#form-getOutStock #input-getOutStock-date').attr('disabled', 'disabled');
                    }

                }
                else {
                    $(`#tb-stockout-detail tr td.${obj.stockproductcode}_amount`).each(
                        function () {
                            if ($(this).text() != obj.amount) {
                                $(this).text(obj.amount);
                            }
                        }
                    );

                    $(`#tb-stockout-detail tr td.${obj.stockproductcode}_remark`).each(
                        function () {
                            if ($(this).text() != obj.remark) {
                                $(this).text(obj.remark);
                            }
                        }
                    );

                    $(`#tb-stockout-detail tr td.${obj.stockproductcode}_dealername`).each(
                        function () {
                            if ($(this).text() != obj.dealername) {
                                $(this).text(obj.dealername);
                            }
                        }
                    );
                }
                clearGetoutAdd();
            }
            else {
                var table = document.getElementById("tb-stockout-detail");
                var rows = table.getElementsByTagName("tr")
                for (var i = 0; i < rows.length; i++) {

                    if (rows[i].getElementsByTagName("td").length > 0) {
                        rowCount++;
                    }
                }

                if (rowCount == 0) {
                    $('#form-getOutStock #select-getOutStock-by').removeAttr("disabled");
                    $('#form-getOutStock #input-getOutStock-date').removeAttr("disabled");
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
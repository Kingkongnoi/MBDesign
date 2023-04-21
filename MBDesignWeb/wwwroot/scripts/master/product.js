$(function () {
    renderFirstTab();
    /* Begin ProductItem */
    $('#nav-master-productData .btn-add-product').on('click', function () {
        _product_item_action = 'add';
        $(`#modal-createProduct #itemHeader`).text('เพิ่มข้อมูลสินค้า (Items)');
        $('#modal-createProduct').modal('show');
    });

    $(document).on('click', '.btn-edit-product', function () {
        $(`#modal-createProduct #itemHeader`).text('แก้ไขข้อมูลสินค้า (Items)');
        $(`#modal-createProduct`).modal('show');
        _product_item_action = 'edit';
        //callProductTypeSelect2('#form-createProduct #select-product-type', 'กรุณาเลือก')
        callSelect2Status('#form-createProduct #select-product-status');
        callGetItemById($(this).data('id'), $(this).data('typeid'));
    });

    $(`#modal-createProduct`).on('show.bs.modal', function () {
        clearForm("modal-createProduct");
        callProductTypeSelect2('#form-createProduct #select-product-type', 'กรุณาเลือก')
        callSelect2Status('#form-createProduct #select-product-status');
        if (_product_item_action == 'add') { callGetLastestItemId(); }
    });

    $('.btn-modal-save-product').on('click', function () {
        DoAddOrUpdateItem("modal-createProduct");
    });

    $('#form-search-product .btn-search-product').on('click', function () {
        callGetItemList();
    });

    $('#form-search-product .btn-clear-search-product').on('click', function () {
        clearSearchForm("item");
        //callProductTypeSelect2('#form-search-product #select-search-product-type', 'ทั้งหมด')
        callSelect2Status('#form-search-product #select-search-product-status', true);
        callGetItemList();
    });

    $('#tb-product-list').on('click', 'td.item-details', function () {
        var tr = $(this).closest('tr');

        var id = tr.data('id');
        $(`#modal-viewProduct`).modal('show');
        _product_item_action = 'view';
        clearForm('modal-createProduct');
        callSelect2Status('#form-createProduct #select-product-status');
        callGetItemById(id);
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
        callSelect2Status('#form-createType #select-type-status');
        callGetTypeById($(this).data('id'));
    });

    $(`#modal-createType`).on('show.bs.modal', function () {
        clearForm("modal-createType");
        callSelect2Status('#form-createType #select-type-status');
        if (_product_type_action == 'add') { callGetLastestTypeId(); }
    });

    $('.btn-modal-save-type').on('click', function () {
        DoAddOrUpdateType("modal-createType");
    });

    $('#form-search-type .btn-search-type').on('click', function () {
        callGetTypeList();
    });

    $('#form-search-type .btn-clear-search-type').on('click', function () {
        clearSearchForm("type");
        callSelect2Status('#form-search-type #select-search-type-status', true);
        callGetTypeList();
    });

    $('#tb-type-list').on('click', 'td.type-details', function () {
        var tr = $(this).closest('tr');

        var id = tr.data('id');
        $(`#modal-viewType`).modal('show');
        _product_type_action = 'view';
        clearForm('modal-createType');
        callSelect2Status('#form-createType #select-type-status');
        callGetTypeById(id);
    });
    /* End ProductType */

    /* Begin ProductStyle */
    $('#nav-master-productStyle .btn-add-style').on('click', function () {
        _product_style_action = 'add';
        $(`#modal-createStyle #styleHeader`).text('เพิ่มสไตล์');
        $(`#modal-createStyle`).modal('show');
    });

    $(document).on('click', '.btn-edit-style', function () {
        $(`#modal-createStyle #styleHeader`).text('แก้ไขสไตล์');
        $(`#modal-createStyle`).modal('show');
        _product_style_action = 'edit';
        callSelect2Status('#form-createStyle #select-style-status');
        callGetStyleById($(this).data('id'));
    });

    $(`#modal-createStyle`).on('show.bs.modal', function () {
        clearForm("modal-createStyle");
        callSelect2Status('#form-createStyle #select-style-status');
        if (_product_style_action == 'add') { callGetLastestStyleId(); }
    });

    $('.btn-modal-save-style').on('click', function () {
        DoAddOrUpdateStyle("modal-createStyle");
    });

    $('#form-search-style .btn-search-style').on('click', function () {
        callGetStyleList();
    });

    $('#form-search-style .btn-clear-search-style').on('click', function () {
        clearSearchForm("style");
        callSelect2Status('#form-search-style #select-search-style-status', true);
        callGetStyleList();
    });

    $('#tb-style-list').on('click', 'td.style-details', function () {
        var tr = $(this).closest('tr');

        var id = tr.data('id');
        $(`#modal-viewStyle`).modal('show');
        _product_style_action = 'view';
        clearForm('modal-createStyle');
        callSelect2Status('#form-createStyle #select-style-status');
        callGetStyleById(id);
    });
    /* End ProductStyle */

    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).data("bs-target") // activated tab
        if (target == "#nav-master-productData") {
            renderFirstTab();
        }
        else if (target == "#nav-master-productType") {
            clearSearchForm("type");
            callSelect2Status('#form-search-type #select-search-type-status', true);
            callGetTypeList();
        }
        else if (target == "#nav-master-productStyle") {
            clearSearchForm("style");
            callSelect2Status('#form-search-style #select-search-style-status', true);
            callGetStyleList();
        }
    });
});

let loader = $('<div/>').addClass('loader');

let _modal_primary_color_code = "#F09723";
let _modal_default_color_code = "#EFEFEF";

let _product_style_action = 'add';
let _product_type_action = 'add';
let _product_item_action = 'add';

function renderFirstTab() {
    clearSearchForm("item");
    callProductTypeSelect2('#form-search-product #select-search-product-type', 'ทั้งหมด')
    callSelect2Status('#select-search-product-status', true);
    callGetItemList();
}
function callSelect2Status(id, isSearch = false) {
    $(id).empty();
    if (isSearch) {
        $(id).append(`<option value="">ทั้งหมด</option>`);
    }
    $(id).append(`<option value="1">ใช้งาน</option>`);
    $(id).append(`<option value="0">ไม่ใช้งาน</option>`);
}
function clearSearchForm(area) {
    switch (area) {
        case "item":
            $('#form-search-product #input-search-product-items').val('');
            $('#form-search-product #select-search-product-type').empty();
            $('#form-search-product #select-search-product-status').empty();
            break;
        case "type":
            $('#form-search-type #input-search-type-code').val('');
            $('#form-search-type #input-search-type-name').val('');
            $('#form-search-type #select-search-type-status').empty();
            break;
        case "style":
            $('#form-search-style #input-search-style-code').val('');
            $('#form-search-style #input-search-style-name').val('');
            $('#form-search-style #select-search-style-status').empty();
            break;
    }
}
function clearForm(modal) {
    switch (modal) {
        case "modal-createProduct":
            $('#form-createProduct input[name="input-product-code"]').val('');
            $('#form-createProduct #select-product-type').val('').trigger('change');
            $('#form-createProduct input[name="input-product-name"]').val('');
            $('#form-createProduct input[name="input-product-price"]').val('');
            $('#form-createProduct #select-product-status').val(0).trigger('change');
            break;
        case "modal-createType":
            $('#form-createType input[name="input-type-code"]').val('');
            $('#form-createType input[name="input-type-name"]').val('');
            $('#form-createType input[name="input-type-price"]').val('');
            $('#form-createType #select-type-status').val(0).trigger('change');
            break;
        case "modal-createStyle":
            $('#form-createStyle input[name="input-style-code"]').val('');
            $('#form-createStyle input[name="input-style-name"]').val('');
            $('#form-createStyle #select-style-status').val(0).trigger('change');
            break;
    }
}
let validateInput = function (modal) {
    switch (modal) {
        case "modal-createProduct":
            if ($('#form-createProduct #input-product-code').val() == "") {
                Swal.fire({
                    text: "กรุณารอระบบ generate รหัสสินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createProduct #input-product-code').focus();
                });
                return false;
            }
            else if ($('#form-createProduct #select-product-type').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกชื่อหมวดหมู่",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createProduct #select-product-type').focus();
                });
                return false;
            }
            else if ($('#form-createProduct #input-product-name').val() == "") {
                Swal.fire({
                    text: "กรุณากรอก Items",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createProduct #input-product-name').focus();
                });
                return false;
            }
            else if ($('#form-createProduct #input-product-price').val() == "" || $('#form-createProduct #input-product-price').val() == "0") {
                Swal.fire({
                    text: "กรุณากรอกราคาต่อเมตร",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createProduct #input-product-price').focus();
                });
                return false;
            }
            else { return true; }
            break;
        case "modal-createType":
            if ($('#form-createType #input-type-code').val() == "") {
                Swal.fire({
                    text: "กรุณารอระบบ generate รหัสหมวดหมู่",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createType #input-type-code').focus();
                });
                return false;
            }
            else if ($('#form-createType #input-type-name').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อหมวดหมู่",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createType #input-type-name').focus();
                });
                return false;
            }
            else if ($('#form-createType #input-type-price').val() == "" || $('#form-createType #input-type-price').val() == "0") {
                Swal.fire({
                    text: "กรุณากรอกราคาต่อเมตร",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createType #input-type-price').focus();
                });
                return false;
            }
            else { return true; }
            break;
        case "modal-createStyle":
            if ($('#form-createStyle #input-style-code').val() == "") {
                Swal.fire({
                    text: "กรุณารอระบบ generate รหัสสไตล์",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStyle #input-style-code').focus();
                });
                return false;
            }
            else if ($('#form-createStyle #input-style-name').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อสไตล์",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStyle #input-style-name').focus();
                });
                return false;
            }
            else { return true; }
            break;
    }

};

/* ProductItem */
function callProductTypeSelect2(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Product/GetTypeSelect2`,
        success: function (data) {
            renderProductTypeSelect2(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}
function renderProductTypeSelect2(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.typeId}">${v.typeName}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}
function DoAddOrUpdateItem(modal) {
    if (!validateInput(modal)) return;

    Swal.fire({
        title: 'คุณต้องการบันทึกข้อมูลหรือไม่?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'บันทึก',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
        //cancelButtonColor: _modal_default_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            callAddOrUpdateItem(_product_item_action);
        }
    });
}
function callAddOrUpdateItem() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/Product/AddItem` : `${app_settings.api_url}/api/Product/UpdateItem`;

    var obj = {
        itemId: $('#input-product-code').val(),
        itemName: $('#input-product-name').val(),
        typeId: $('#form-createProduct #select-product-type').val(),
        itemPrice: $('#input-product-price').val(),
        status: ($('#form-createProduct #select-product-status').val() == "1") ? true : false
    };

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $(`#modal-createProduct`).modal('hide');
                callGetItemList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อสินค้ามีอยู่แล้ว กรุณากรอกชื่อสินค้าอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createProduct #input-product-name').focus();
                    });
                }
            }
        },
        error: () => {
        }
    });

}
function callGetLastestItemId() {
    let url = `${app_settings.api_url}/api/Product/GetLastestItemId`;

    $.ajax({
        url: url,
        type: 'GET',
        success: (res) => {
            $('#form-createProduct input[name="input-product-code"]').val(res.itemId);
        },
        error: () => {
        }
    });
}
function callGetItemList() {
    let itemName = ($('#form-search-product #input-search-product-items').val() == '' || $('#form-search-product #input-search-product-items').val() == undefined) ? "%%" : $('#form-search-product #input-search-product-items').val();
    let typeId = ($('#form-search-product #select-search-product-type').val() == '' || $('#form-search-product #select-search-product-type').val() == null) ? "0" : $('#form-search-product #select-search-product-type').val();
    let status = ($('#form-search-product #select-search-product-status').val() == '' || $('#form-search-product #select-search-product-status').val() == undefined) ? "%%" : $('#form-search-product #select-search-product-status').val();

    let loaded = $('#tb-product-list');

    loaded.prepend(loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Product/GetItemList?itemName=${itemName}&typeId=${typeId}&status=${status}`,
        success: function (data) {
            renderGetItemList(data);
            loaded.find(loader).remove();
        },
        error: function (err) {
            loaded.find(loader).remove();
        }
    });
}
function renderGetItemList(data) {
    $('#tb-product-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bfrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.itemId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'itemId',
                    className: "item-details",
                },
                {
                    targets: 1,
                    data: 'typeName',
                },
                {
                    targets: 2,
                    data: 'itemName',
                },
                {
                    targets: 3,
                    data: 'price',
                },
                {
                    targets: 4,
                    data: 'createDate',
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 5,
                    data: 'createBy'
                },
                {
                    targets: 6,
                    data: 'updateDate',
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 7,
                    data: 'updateBy'
                },
                {
                    targets: 8,
                    data: 'status',
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 9,
                    data: null,
                    orderable: false,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-product" data-id="${row.itemId}" data-typeid="${row.typeId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function callGetItemById(id, typeId) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Product/GetItemByItemId?itemId=${id}`,
        success: function (data) {
            renderItemForm(data, typeId);
        },
        error: function (err) {

        }
    });
}
function renderItemForm(data, typeId) {
    let status = (data.status) ? 1 : 0;
    $('#form-createProduct #select-product-type').val("").trigger('change');
    $('#form-createProduct #select-product-type').val(typeId).trigger('change');
    $('#form-createProduct input[name="input-product-code"]').val(data.itemId);
    $('#form-createProduct input[name="input-product-name"]').val(data.itemName);
    $('#form-createProduct input[name="input-product-price"]').val(data.itemPrice);
    $('#form-createProduct #select-product-status').val(status).trigger('change');
}
/* ProductItem */

/* ProductType */
function DoAddOrUpdateType(modal) {
    if (!validateInput(modal)) return;

    Swal.fire({
        title: 'คุณต้องการบันทึกข้อมูลหรือไม่?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'บันทึก',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
        //cancelButtonColor: _modal_default_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            callAddOrUpdateType(_product_type_action);
        }
    });
}
function callAddOrUpdateType() {
    let url = (_product_type_action == 'add') ? `${app_settings.api_url}/api/Product/AddProductType` : `${app_settings.api_url}/api/Product/UpdateProductType`;

    var obj = {
        typeId: $('#input-type-code').val(),
        typeName: $('#input-type-name').val(),
        typePrice: $('#input-type-price').val(),
        status: ($('#form-createType #select-type-status').val() == "1") ? true : false
    };

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $(`#modal-createType`).modal('hide');
                callGetTypeList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อสไตล์มีอยู่แล้ว กรุณากรอกชื่อสไตล์อีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createType #input-type-name').focus();
                    });
                }
            }
        },
        error: () => {
        }
    });

}
function callGetLastestTypeId() {
    let url = `${app_settings.api_url}/api/Product/GetLastestTypeId`;

    $.ajax({
        url: url,
        type: 'GET',
        success: (res) => {
            $('#form-createType input[name="input-type-code"]').val(res.typeId);
        },
        error: () => {
        }
    });
}
function callGetTypeList() {

    //let typeId = ($('#form-search-type #input-search-type-code').val() == '') ? "%%" : $('#form-search-type #input-search-type-code').val();
    let typeName = ($('#form-search-type #input-search-type-name').val() == '') ? "%%" : $('#form-search-type #input-search-type-name').val();
    let status = ($('#form-search-type #select-search-type-status').val() == '') ? "%%" : $('#form-search-type #select-search-type-status').val();

    let loaded = $('#tb-type-list');

    loaded.prepend(loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Product/GetTypeList?typeName=${typeName}&status=${status}`,
        success: function (data) {
            renderGetTypeList(data);
            loaded.find(loader).remove();
        },
        error: function (err) {
            loaded.find(loader).remove();
        }
    });
}
function renderGetTypeList(data) {
    $('#tb-type-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bfrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.typeId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'typeId',
                    className: "type-details",
                },
                {
                    targets: 1,
                    data: 'typeName',
                },
                {
                    targets: 2,
                    data: 'typePrice',
                },
                {
                    targets: 3,
                    data: 'createDate',
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 4,
                    data: 'createBy'
                },
                {
                    targets: 5,
                    data: 'updateDate',
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 6,
                    data: 'updateBy'
                },
                {
                    targets: 7,
                    data: 'status',
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 8,
                    data: null,
                    orderable: false,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-type" data-id="${row.typeId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function callGetTypeById(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Product/GetTypeByTypeId?typeId=${id}`,
        success: function (data) {
            renderTypeForm(data);
        },
        error: function (err) {

        }
    });
}
function renderTypeForm(data) {
    let status = (data.status) ? 1 : 0;
    $('#form-createType input[name="input-type-code"]').val(data.typeId);
    $('#form-createType input[name="input-type-name"]').val(data.typeName);
    $('#form-createType input[name="input-type-price"]').val(data.typePrice);
    $('#form-createType #select-type-status').val(status).trigger('change');
}
/* ProductType */

/* ProductStyle */
function DoAddOrUpdateStyle(modal) {
    if (!validateInput(modal)) return;

    Swal.fire({
        title: 'คุณต้องการบันทึกข้อมูลหรือไม่?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'บันทึก',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
        //cancelButtonColor: _modal_default_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            callAddOrUpdateStyle(_product_style_action);
        }
    });
}
function callAddOrUpdateStyle() {
    let url = (_product_style_action == 'add') ? `${app_settings.api_url}/api/Product/AddStyle` : `${app_settings.api_url}/api/Product/UpdateStyle`;

    var obj = {
        styleId: $('#input-style-code').val(),
        styleName: $('#input-style-name').val(),
        status: ($('#form-createStyle #select-style-status').val() == "1") ? true : false
    };

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $(`#modal-createStyle`).modal('hide');
                callGetStyleList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อสไตล์มีอยู่แล้ว กรุณากรอกชื่อสไตล์อีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createStyle #input-style-name').focus();
                    });
                }
            }
        },
        error: () => {
        }
    });

}
function callGetLastestStyleId() {
    let url = `${app_settings.api_url}/api/Product/GetLastestStyleId`;

    $.ajax({
        url: url,
        type: 'GET',
        success: (res) => {
            $('#form-createStyle input[name="input-style-code"]').val(res.styleId);
        },
        error: () => {
        }
    });
}
function callGetStyleList() {

    //let styleId = ($('#form-search-style #input-search-style-code').val() == '') ? "%%" : $('#form-search-style #input-search-style-code').val();
    let styleName = ($('#form-search-style #input-search-style-name').val() == '') ? "%%" : $('#form-search-style #input-search-style-name').val();
    let status = ($('#form-search-style #select-search-style-status').val() == '') ? "%%" : $('#form-search-style #select-search-style-status').val();

    let loaded = $('#tb-style-list');

    loaded.prepend(loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Product/GetStyleList?styleName=${styleName}&status=${status}`,
        success: function (data) {
            renderGetStyleList(data);
            loaded.find(loader).remove();
        },
        error: function (err) {
            loaded.find(loader).remove();
        }
    });
}
function renderGetStyleList(data) {
    $('#tb-style-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bfrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.styleId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'styleId',
                    className: "style-details",
                },
                {
                    targets: 1,
                    data: 'styleName',
                },
                {
                    targets: 2,
                    data: 'createDate',
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 3,
                    data: 'createBy'
                },
                {
                    targets: 4,
                    data: 'updateDate',
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 5,
                    data: 'updateBy'
                },
                {
                    targets: 6,
                    data: 'status',
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 7,
                    data: null,
                    orderable: false,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-style" data-id="${row.styleId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function callGetStyleById(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Product/GetStyleByStyleId?styleId=${id}`,
        success: function (data) {
            renderStyleForm(data);
        },
        error: function (err) {

        }
    });
}
function renderStyleForm(data) {
    let status = (data.status) ? 1 : 0;
    $('#form-createStyle input[name="input-style-code"]').val(data.styleId);
    $('#form-createStyle input[name="input-style-name"]').val(data.styleName);
    $('#form-createStyle #select-style-status').val(status).trigger('change');
}
/* ProductStyle */

function callSuccessAlert() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'บันทึกข้อมูลสำเร็จ',
        showConfirmButton: false,
        timer: 1500
    });
}
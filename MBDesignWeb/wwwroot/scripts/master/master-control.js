$(function () {
    //callGetRolePerMenu();
    //renderPermissionMenu();

    callAllBankSelect2();

    callProductTypeSelect2('#form-createProduct #select-product-type', 'กรุณาเลือก')
    callProductTypeSelect2('#form-search-product #select-search-product-type', 'ทั้งหมด');

    callSelect2AccountType('#form-search-bankAccount #select-search-account-type', true);
    callSelect2AccountType('#form-createAccount #select-account-type', true);

    callSelect2Status('#form-createProduct #select-product-status');
    callSelect2Status('#form-search-product #select-search-product-status', true);

    callSelect2Status('#form-createType #select-type-status');
    callSelect2Status('#form-search-type #select-search-type-status', true);

    callSelect2Status('#form-createStyle #select-style-status');
    callSelect2Status('#form-search-style #select-search-style-status', true);

    callSelect2Status('#form-createAccount #select-account-status');
    callSelect2Status('#form-search-bankAccount #select-search-account-status', true);

   


    //callProductTypeSelect2('#form-createProductQuickQT #select-product-type', 'กรุณาเลือก');
    callProductTypeSelect2('#form-search-product-QuickQT #select-search-product-type', 'ทั้งหมด');
    //callSelect2Status('#form-createProductQuickQT #select-product-status');
    callSelect2Status('#form-search-product-QuickQT #select-search-product-status', true);

    renderNewOptions("modal-createProduct");

    //$('#states').select2();

    callGetAccountList();
    callGetItemList();
    callGetProductItemQuickQTList();

    /* Begin ProductItem */
    $('#nav-master-productData .btn-add-product').on('click', function () {
        _product_item_action = 'add';
        $(`#modal-createProduct #itemHeader`).text('เพิ่มข้อมูลสินค้า (Items)');
        $('#modal-createProduct').modal('show');
    });

    
    //$('#form-createSubGroup #select-group-name').on('change', function () {
    //    if (this.value != '') {
    //        callGetSubGroupcode(this.value);
    //    }
    //    else {
    //        $('#form-createSubGroup input[name="input-subgroup-code"]').val('');
    //    }

    //});

    //$(document).on('change', '#select-group-name', function () {
    //    console.log('1');
    //    if (this.value != '') {
    //        callGetSubGroupcode(this.value);
    //    }
    //    else {
    //        $('#form-createSubGroup input[name="input-subgroup-code"]').val('');
    //    }

    //});
    //$(document).on('change', '#select-group-name', function () {
    //    console.log(this.value);
    //    //$(`#modal-createProduct #itemHeader`).text('แก้ไขข้อมูลสินค้า (Items)');
    //    //$(`#modal-createProduct`).modal('show');
    //    //_product_item_action = 'edit';
    //    //clearForm('modal-createProduct');
    //    //$('#modal-createProduct #divOptions').empty();
    //    //callGetItemById($(this).data('id'), $(this).data('typeid'), 'modal-createProduct');
    //});

    

    $(`#modal-createProduct`).on('show.bs.modal', function () {
        clearForm("modal-createProduct");
        $('#modal-createProduct #divOptions').empty();
        renderNewOptions('modal-createProduct');
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
        callGetItemList();
    });


    


    $(document).on('click', '.btn-edit-type', function () {
        $(`#modal-createType #typeHeader`).text('แก้ไขหมวดหมู่');
        $(`#modal-createType`).modal('show');
        _product_type_action = 'edit';
        callGetTypeById($(this).data('id'));
    });

    

    $(`#modal-createType`).on('show.bs.modal', function () {
        clearForm("modal-createType");
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
        callGetTypeList();
    });


    $('#tb-type-list').on('click', 'td.type-details', function () {
        var tr = $(this).closest('tr');

        var id = tr.data('id');
        $(`#modal-viewType`).modal('show');
        _product_type_action = 'view';
        clearForm('modal-createType');
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
        callGetStyleById($(this).data('id'));
    });

    $(`#modal-createStyle`).on('show.bs.modal', function () {
        clearForm("modal-createStyle");
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
        callGetStyleList();
    });

    $('#tb-style-list').on('click', 'td.style-details', function () {
        var tr = $(this).closest('tr');

        var id = tr.data('id');
        $(`#modal-viewStyle`).modal('show');
        _product_style_action = 'view';
        clearForm('modal-createStyle');
        callGetStyleById(id);
    });
    /* End ProductStyle */

    $('.btn-add-account').on('click', function () {
        _action = 'add';
        $(`#modal-createAccount #accountHeader`).text('เพิ่มข้อมูลบัญชี');
        $('#modal-createAccount').modal('show');
    });

    $(document).on('click', '.btn-edit-account', function () {
        $(`#modal-createAccount #accountHeader`).text('แก้ไขข้อมูลบัญชี');
        $(`#modal-createAccount`).modal('show');
        _action = 'edit';
        _id = $(this).data('id');
        callGetAccountById($(this).data('id'));
    });

    $(`#modal-createAccount`).on('show.bs.modal', function () {
        clearForm('modal-createAccount');
        callSelect2Status('#form-createAccount #select-account-status');
    });

    $('.btn-modal-save-account').on('click', function () {
        DoAddOrUpdateAccount();
    });

    $('#form-search-bankAccount .btn-search-account').on('click', function () {
        callGetAccountList();
    });

    $('#form-search-bankAccount .btn-clear-search-account').on('click', function () {
        clearSearchForm('bankAccount');
        callGetAccountList();
    });

    $('#tb-account-list').on('click', 'td.account-details', function () {
        var tr = $(this).closest('tr');

        var id = tr.data('id');
        $(`#modal-viewAccount`).modal('show');
        _action = 'view';
        clearForm('modal-createAccount');
        callGetAccountById(id);
    });

    $('#form-search-product-QuickQT .btn-search-product-quickQT').on('click', function () {
        callGetProductItemQuickQTList();
    });

    $('#form-search-product-QuickQT .btn-clear-search-product-quickQT').on('click', function () {
        clearSearchForm('item-quickQT');
        callGetProductItemQuickQTList();
    });

    $('.btn-add-product-quickQT').on('click', function () {
        _procutQuickQT_action = 'add';
        $(`#modal-createProduct-QuickQT #itemQuickQTHeader`).text('เพิ่มข้อมูลสินค้า (Quick QT)');
        $('#modal-createProduct-QuickQT').modal('show');
    });

    $(document).on('click', '.btn-edit-productQuickQT', function () {
        $(`#modal-createProduct-QuickQT #itemQuickQTHeader`).text('แก้ไขเพิ่มข้อมูลสินค้า (Quick QT)');
        $(`#modal-createProduct-QuickQT`).modal('show');
        _procutQuickQT_action = 'edit';
        var id = $(this).data('id');
        callGetItemQuickQTById($(this).data('id'), "#modal-createProduct-QuickQT");
    });

    $(`#modal-createProduct-QuickQT`).on('show.bs.modal', function () {
        clearForm('modal-createProduct-QuickQT');
        callProductTypeSelect2('#form-createProductQuickQT #select-product-type', 'กรุณาเลือก');
        callSelect2Status('#form-createProductQuickQT #select-product-status');
    });

    $('.btn-modal-save-product-quickQT').on('click', function () {
        DoAddOrUpdateItemQuickQT("modal-createProduct-QuickQT");
    });

    $('#tb-product-quickQT-list').on('click', 'tbody tr td:not(:last-child)', function () {
        var table = $('#tb-product-quickQT-list').DataTable();
        var row = table.row($(this)).data();
        clearForm('modal-createProduct-QuickQT');
        callGetItemQuickQTById(row.itemId, "#modal-viewProduct-QuickQT");
        $('#modal-viewProduct-QuickQT').modal('show');
    });


    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).data("bs-target") // activated tab
        if (target == "#nav-master-empData") {
            clearSearchForm("employee");
            callSelect2EmpRole();
            callSelect2EmpPosition();
            callSelect2EmpDepartment();
            callGetEmployeeList();
        }
        else if (target == "#nav-master-role") {
            clearSearchForm("role");
            callGetRoleList();
        }
        else if (target == "#nav-master-holiday") {
            clearSearchForm("holiday");
            callGetHolidayList();
        }
        else if (target == "#nav-master-department") {
            clearSearchForm("department");
            callGetDepartmentList();
        }
        else if (target == "#nav-master-position") {
            clearSearchForm("position");
            callGetPositionList();
        }
        else if (target == "#nav-master-productData") {
            clearSearchForm("item");
            callProductTypeSelect2('#form-createProduct #select-product-type', 'กรุณาเลือก')
            callProductTypeSelect2('#form-search-product #select-search-product-type', 'ทั้งหมด');
            callGetItemList();
        }
        else if (target == "#nav-master-productType") {
            clearSearchForm("type");
            callGetTypeList();
        }
        else if (target == "#nav-master-productStyle") {
            clearSearchForm("style");
            callGetStyleList();
        }
        else if (target == "#nav-master-productDataQuickQT") {
            clearSearchForm("item-quickQT");
            callProductTypeSelect2('#form-createProductQuickQT #select-product-type', 'กรุณาเลือก')
            callProductTypeSelect2('#form-search-product-QuickQT #select-search-product-type', 'ทั้งหมด');
            callGetProductItemQuickQTList();
        }
    });

    $(document).on('click', '.btn-edit-product', function () {
        $(`#modal-createProduct #itemHeader`).text('แก้ไขข้อมูลสินค้า (Items)');
        $(`#modal-createProduct`).modal('show');
        _product_item_action = 'edit';
        clearForm('modal-createProduct');
        $('#modal-createProduct #divOptions').empty();
        callGetItemById($(this).data('id'), $(this).data('typeid'), 'modal-createProduct');
    });
});
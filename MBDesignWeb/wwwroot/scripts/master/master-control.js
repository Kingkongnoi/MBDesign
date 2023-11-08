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

    //callProductTypeSelect2('#form-createProductQuickQT #select-product-type', 'กรุณาเลือก');
    callProductTypeSelect2('#form-search-product-QuickQT #select-search-product-type', 'ทั้งหมด');
    //callSelect2Status('#form-createProductQuickQT #select-product-status');
    callSelect2Status('#form-search-product-QuickQT #select-search-product-status', true);

    renderNewOptions("modal-createProduct");

    //$('#states').select2();

    callGetAccountList();
    callGetItemList();
    callGetProductItemQuickQTList();
    callGetGroupList();
    callGetSubGroupList();
    callGetBrandList();
    callGetUnitList();
    callGetReceiverList();

    /* Begin ProductItem */
    $('#nav-master-productData .btn-add-product').on('click', function () {
        _product_item_action = 'add';
        $(`#modal-createProduct #itemHeader`).text('เพิ่มข้อมูลสินค้า (Items)');
        $('#modal-createProduct').modal('show');
    });

    $('#nav-master-Group .btn-add-group').on('click', function () {
        _product_item_action = 'add';
        $(`#modal-createGroup #itemHeader`).text('เพิ่มหมวดหมู่หลัก');
        $('#modal-createGroup').modal('show');
    });

    $('#nav-master-subGroup .btn-add-subgroup').on('click', function () {
        _product_item_action = 'add';
        $(`#modal-createSubGroup #itemHeader`).text('เพิ่มหมวดหมู่ย่อย');
        $('#modal-createSubGroup').modal('show');
    });

    $('#nav-master-Brand .btn-add-brand').on('click', function () {
        _product_item_action = 'add';
        $(`#modal-createBrand #itemHeader`).text('เพิ่มแบนรด์สินค้า');
        $('#modal-createBrand').modal('show');
    });

    $('#nav-master-Unit .btn-add-unit').on('click', function () {
        _product_item_action = 'add';
        $(`#modal-createUnit #itemHeader`).text('เพิ่มหน่วยสินค้า');
        $('#modal-createUnit').modal('show');
    });

    $('#nav-master-Reciever .btn-add-receiver').on('click', function () {
        _product_item_action = 'add';
        $(`#modal-createReceiver #itemHeader`).text('เพิ่มผู้รับสินค้า');
        $('#modal-createReceiver').modal('show');
    });

    $('#nav-master-Stock .btn-add-stock').on('click', function () {
        _product_item_action = 'add';
        $(`#modal-createStock #itemHeader`).text('เพิ่มคลังสินค้า');
        $('#modal-createStock').modal('show');
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

    $(`#modal-createProduct`).on('show.bs.modal', function () {
        clearForm("modal-createProduct");
        $('#modal-createProduct #divOptions').empty();
        renderNewOptions('modal-createProduct');
        if (_product_item_action == 'add') { callGetLastestItemId(); }
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

    $('.btn-modal-save-product').on('click', function () {
        DoAddOrUpdateItem("modal-createProduct");
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

    $('#form-search-product .btn-search-product').on('click', function () {
        callGetItemList();
    });

    $('#form-search-product .btn-clear-search-product').on('click', function () {
        clearSearchForm("item");
        callGetItemList();
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
        console.log("AAA");
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
        else if (target == "#nav-master-Group") {
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
    });

});
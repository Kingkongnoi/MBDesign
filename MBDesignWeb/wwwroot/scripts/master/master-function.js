let _loader = $('<div/>').addClass('loader');

let _modal_holiday_name = 'modal-createHoliday';
let _holiday_action = 'add';

let _modal_department_name = 'modal-createDepartment';
let _department_action = 'add';

let _modal_position_name = 'modal-createPosition';
let _position_action = 'add';

let _product_style_action = 'add';
let _product_type_action = 'add';
let _product_item_action = 'add';

let _action = 'add';
let _id = 0;
let _empId = 0;

let _emp_action = 'add';
let _role_action = 'add';

let _modal_primary_color_code = "#F09723";
let _modal_default_color_code = "#EFEFEF";

let _userId = localStorage.getItem('loginId');
let _userCode = localStorage.getItem('loginCode');
let _userName = localStorage.getItem('loginName');

let _procutQuickQT_action = "add";
let _issavecal = false;
let _issaveglasscal = false;
let _calCode = "";
let _calCodeClearGlass = "";

function callSelect2Status(id, isSearch = false) {
    $(id).empty();
    if (isSearch) {
        $(id).append(`<option value="">ทั้งหมด</option>`);
    }
    $(id).append(`<option value="1">ใช้งาน</option>`);
    $(id).append(`<option value="0">ไม่ใช้งาน</option>`);
}

function callSelectDoorType(id, isSearch = false) {
    $(id).empty();
    if (isSearch) {
        $(id).append(`<option value="">-- กรุณาเลือก --</option>`);
    }
    $(id).append(`<option value="S">บานเดี่ยว</option>`);
    $(id).append(`<option value="M">บานคู่</option>`);
}

function callPrintDoorType(id, isSearch = false) {
    $(id).empty();
    if (isSearch) {
        $(id).append(`<option value="A">-- ทั้งหมด --</option>`);
    }
    $(id).append(`<option value="S">บานเดี่ยว</option>`);
    $(id).append(`<option value="M">บานคู่</option>`);
}
//function callProductItemCal(select2Id, select2FirstText) {
//    $.ajax({
//        type: 'GET',
//        url: `${app_settings.api_url}/api/Calculate/GetProductItemSelect`,
//        success: function (data) {
//            renderProductItemDataSelect(select2Id, select2FirstText, data);
//        },
//        error: function (err) {
//        }
//    });
//}

function callCustItemCal(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetCustListSelect`,
        success: function (data) {
            renderCustItemDataSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}

function callCalMaster(CalCode,Type) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetCalMasterByCode?calculatecode=${CalCode}`,
        success: function (data) {
  
            var setDate = new Date(data[0].createDate);
      
            var fulldate = setDate.getDate() + "/" + (setDate.getMonth() + 1) + "/" + setDate.getFullYear();
            if (Type == "F") {
                $('#form-printFrameCalculate input[name="input-print-createdate"]').val(fulldate);
            }
            else {
                $('#form-printClearglassCalculate input[name="input-print-createdate-clearglass"]').val(fulldate);
            }
        },
        error: function (err) {
        }
    });
}

function callReCalMaster(CalCode, Type) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetCalMasterByCode?calculatecode=${CalCode}`,
        success: function (data) {

            var setDate = new Date(data[0].createDate);

            var fulldate = setDate.getDate() + "/" + (setDate.getMonth() + 1) + "/" + setDate.getFullYear();
            if (Type == "F") {
                $('#form-ReprintFrameCalculate input[name="input-reprint-createdate"]').val(fulldate);
            }
            else {
                $('#form-ReprintClearglassCalculate input[name="input-reprint-createdate-clearglass"]').val(fulldate);
            }
        },
        error: function (err) {
        }
    });
}

function clearSearchForm(area) {
    switch (area) {
        case "employee":
            let empFormId = '#form-search-employee';
            $(`${empFormId} #input-search-emp-code`).val('');
            $(`${empFormId} #input-search-emp-name`).val('');
            $(`${empFormId} #select-search-emp-department`).val('').trigger('change');
            $(`${empFormId} #select-search-emp-position`).val('').trigger('change');
            $(`${empFormId} #select-search-emp-status`).val('').trigger('change');
            break;
        case "role":
            let roleFormId = '#form-search-role';
            $(`${roleFormId} #input-search-role`).val('');
            $(`${roleFormId} #select-search-role-status`).val('').trigger('change');
            break;
        case "holiday":
            $('#form-search-holiday #select-search-holiday-year').val('').trigger('change');
            $('#form-search-holiday #select-search-holiday-day').val('').trigger('change');
            $('#form-search-holiday #input-search-holiday-date').val('');
            $('#form-search-holiday #input-search-holiday-name').val('');
            $('#form-search-holiday #select-search-holiday-status').val('').trigger('change');
            break;
        case "department":
            $('#form-search-department #input-search-department').val('');
            $('#form-search-department #select-search-department-status').val('').trigger('change');
            break;
        case "position":
            $('#form-search-position #input-search-position').val('');
            $('#form-search-position #select-search-position-status').val('').trigger('change');
            break;
        case "item":
            $('#form-search-product #input-search-product-items').val('');
            $('#form-search-product #select-search-product-type').val('').trigger('change');
            $('#form-search-product #select-search-product-status').val('').trigger('change');
            break;
        case "type":
            $('#form-search-type #input-search-type-code').val('');
            $('#form-search-type #input-search-type-name').val('');
            $('#form-search-type #select-search-type-status').val('').trigger('change');
            break;
        case "style":
            $('#form-search-style #input-search-style-code').val('');
            $('#form-search-style #input-search-style-name').val('');
            $('#form-search-style #select-search-style-status').val('').trigger('change');
            break;
        case "bankAccount":
            $('#form-search-bankAccount #select-search-bank-name').val('').trigger('change');
            $('#form-search-bankAccount #input-search-account-name').val('');
            $('#form-search-bankAccount #input-search-account-number').val('');
            $('#form-search-bankAccount #select-search-account-type').val('').trigger('change');
            $('#form-search-bankAccount #select-search-account-status').val('').trigger('change');
            break;
        case "item-quickQT":
            $('#form-search-product-QuickQT #input-search-product-items').val('');
            $('#form-search-product-QuickQT #select-search-product-type').val('');
            $('#form-search-product-QuickQT #input-search-product-items-text').val('');
            $('#form-search-product-QuickQT #select-search-product-status').val('').trigger('change');
            break;
        case "group":
            $('#form-search-Group #input-search-groupcode-items').val('');
            $('#form-search-Group #input-search-groupname-items').val('');
            $('#form-search-Group #select-search-group-status').val('').trigger('change');
            break;
        case "subgroup":
            $('#form-search-subgroup #input-search-subgroupcode-items').val('');
            $('#form-search-subgroup #input-search-subgroupname-items').val('');
            $('#form-search-subgroup #select-search-subgroup-status').val('').trigger('change');
            break; sub
        case "brand":
            $('#form-search-brand #input-search-brand-code').val('');
            $('#form-search-brand #input-search-brand-name').val('');
            $('#form-search-brand #select-search-brand-status').val('').trigger('change');
            break;
        case "unit":
            $('#form-search-Unit #input-search-unit-code').val('');
            $('#form-search-Unit #input-search-unit-name').val('');
            $('#form-search-Unit #select-search-unit-status').val('').trigger('change');
            break;
        case "receiver":
            $('#form-search-receiver #input-search-receiver-code').val('');
            $('#form-search-receiver #input-search-receiver-name').val('');
            $('#form-search-receiver #select-search-receiver-status').val('').trigger('change');
            break;
        case "stock":
            $('#form-search-stock #input-search-stock-code').val('');
            $('#form-search-stock #input-search-stock-name').val('');
            $('#form-search-stock #select-search-stock-status').val('').trigger('change');
            break;
        case "viewstock":
            $('#form-search-viewstock input[name="input-search-viewstock-code"]').val('');
            $('#form-search-viewstock #select-search-viewstock-status').val('').trigger('change');
            $('#form-search-viewstock input[name="input-search-viewstock-name"]').val('');
            $('#form-search-viewstock #select-search-viewstock-group').val('').trigger('change');
            $('#form-search-viewstock #select-search-viewstock-subgroup').val('').trigger('change');
            $('#form-search-viewstock #select-search-viewstock-brand').val('').trigger('change');
            $('#form-search-viewstock #select-search-viewstock-stock').val('').trigger('change');
            $('#form-search-viewstock input[name="input-search-viewstock-price"]').val('');
            $('#form-search-viewstock input[name="input-search-viewstock-amount"]').val('');

            break;
    }
}
function clearForm(modal) {
    switch (modal) {
        case "modal-createEmployee" || "modal-viewEmployee":
            let empFormId = '#form-createEmployee';
            $(`${empFormId} input[name="input-emp-code"]`).val('');
            $(`${empFormId} input[name="input-emp-idCard"]`).val('');
            $(`${empFormId} #select-emp-role`).val('').trigger('change');
            $(`${empFormId} input[name="input-emp-firstName"]`).val('');
            $(`${empFormId} input[name="input-emp-lastName"]`).val('');
            $(`${empFormId} #select-emp-department`).val('').trigger('change');
            $(`${empFormId} #select-emp-position`).val('').trigger('change');
            $(`${empFormId} #select-salary-type`).val('').trigger('change');
            $(`${empFormId} input[name="input-emp-salary"]`).val('');
            $(`${empFormId} #select-emp-status`).val(1).trigger('change');
            $(`${empFormId} input[name="input-start-date"]`).val('');
            $(`${empFormId} input[name="select-emp-signature"]`).val('');
            $(`${empFormId} #radioEmpInputCard`).prop('checked', true);
            break;
        case "modal-createRole" || "modal-viewRole":
            let roleFormId = '#form-createRole';
            $(`${roleFormId} input[name="input-role-id"]`).val('');
            $(`${roleFormId} input[name="input-role-name"]`).val('');
            $(`${roleFormId} #select-role-status`).val(1).trigger('change');
            break;
        case "modal-createHoliday" || "modal-viewHoliday":
            $('#form-createHoliday input[name="input-holiday-code"]').val('');
            $('#form-createHoliday #select-holiday-day').val('').trigger('change');
            $('#form-createHoliday input[name="input-holiday-date"]').val('');
            $('#form-createHoliday input[name="input-holiday-name"]').val('');
            $('#form-createHoliday #select-holiday-status').val(1).trigger('change');
            break;
        case "modal-createDepartment" || "modal-viewDepartment":
            $('#form-createDepartment input[name="input-department-code"]').val('');
            $('#form-createDepartment input[name="input-department-name"]').val('');
            $('#form-createDepartment #select-department-status').val(1).trigger('change');
            break;
        case "modal-createPosition" || "modal-viewPosition":
            $('#form-createPosition input[name="input-position-code"]').val('');
            $('#form-createPosition input[name="input-position-name"]').val('');
            $('#form-createPosition #select-position-status').val(1).trigger('change');
            break;
        case "modal-createProduct" || "modal-viewProduct":
            $('#form-createProduct input[name="input-product-code"]').val('');
            $('#form-createProduct #select-product-type').val('').trigger('change');
            $('#form-createProduct input[name="input-product-name"]').val('');
            $('#form-createProduct input[name="input-product-price"]').val('');
            $('#form-createProduct #select-product-status').val(1).trigger('change');
            break;
        case "modal-createType" || "modal-viewType":
            $('#form-createType input[name="input-type-code"]').val('');
            $('#form-createType input[name="input-type-name"]').val('');
            $('#form-createType input[name="input-type-price"]').val('');
            $('#form-createType #select-type-status').val(1).trigger('change');
            break;
        case "modal-createStyle" || "modal-viewStyle":
            $('#form-createStyle input[name="input-style-code"]').val('');
            $('#form-createStyle input[name="input-style-name"]').val('');
            $('#form-createStyle #select-style-status').val(1).trigger('change');
            break;
        case "modal-createAccount" || "modal-viewAccount":
            $('#form-createAccount #select-bank-name').val('').trigger('change');
            $('#form-createAccount input[name="input-account-name"]').val('');
            $('#form-createAccount #select-account-status').val(1).trigger('change');
            $('#form-createAccount #select-account-type').val('').trigger('change');
            $('#form-createAccount input[name="input-account-number"]').val('');
            break;
        case "modal-createProduct-QuickQT" || "modal-viewProduct-QuickQT":
            $('#form-createProductQuickQT input[name="input-product-code"]').val('');
            $('#form-createProductQuickQT #select-product-type').val('').trigger('change');
            $('#form-createProductQuickQT input[name="input-product-text"]').val('');
            $('#form-createProductQuickQT input[name="input-product-price"]').val('');
            $('#form-createProductQuickQT #select-product-status').val(1).trigger('change');
            break;
        case "modal-createGroup" || "modal-viewGroup":
            $('#form-createGroup input[name="input-group-code"]').val('');
            $('#form-createGroup input[name="input-group-name"]').val('');
            $('#form-createGroup #select-group-status').val(1).trigger('change');
            break;
        case "modal-createSubGroup" || "modal-viewSubGroup":
            $('#form-createSubGroup #select-group-name').val('').trigger('change');
            $('#form-createSubGroup input[name="input-subgroup-name"]').val('');
            $('#form-createSubGroup #select-subgroup-status').val(1).trigger('change');
            break;
        case "modal-createBrand" || "modal-viewBrand":
            $('#form-createBrand input[name="input-brand-code"]').val('');
            $('#form-createBrand input[name="input-brand-name"]').val('');
            $('#form-createBrand #select-brand-status').val(1).trigger('change');
            break;
        case "modal-createUnit" || "modal-viewUnit":
            $('#form-createUnit input[name="input-unit-code"]').val('');
            $('#form-createUnit input[name="input-unit-name"]').val('');
            $('#form-createUnit #select-unit-status').val(1).trigger('change');
            break;
        case "modal-createReceiver" || "modal-viewReceiver":
            $('#form-createReceiver #select-receiver-empcode').val(1).trigger('change');
            $('#form-createReceiver input[name="input-receiver-name"]').val('');
            $('#form-createReceiver #select-stock-status').val(1).trigger('change');
            break;
        case "modal-createStock" || "modal-viewStock":
            $('#form-createStock input[name="input-stock-code"]').val('');
            $('#form-createStock input[name="input-stock-name"]').val('');
            $('#form-createStock #select-stock-status').val(1).trigger('change');
            break;
        case "modal-createStockProduct" || "modal-viewStockProduct":
            $('#form-createStockProduct input[name="input-viewstock-code"]').val('');
            $('#form-createStockProduct #select-viewstock-status').val(1).trigger('change');
            $('#form-createStockProduct input[name="input-viewstock-name"]').val('');
            $('#form-createStockProduct #select-viewstock-group').val('').trigger('change');
            $('#form-createStockProduct #select-viewstock-subgroup').val('').trigger('change');
            $('#form-createStockProduct #select-viewstock-brand').val('').trigger('change');
            $('#form-createStockProduct #select-viewstock-stock').val('').trigger('change');
            $('#form-createStockProduct input[name="input-viewstock-price"]').val('');
            $('#form-createStockProduct input[name="input-viewstock-amount"]').val('');
            $('#form-createStockProduct #select-viewstock-unit').val('').trigger('change');
            break;
    }
}

function clearcalinsert() {
    $('#form-add-calculate #input-insert-heigh-cupboard').val('');
    $('#form-add-calculate #input-insert-width-cupboard').val('');
    $('#form-add-calculate #select-insert-glassdoor-type').val('').trigger('change');
    $('#form-add-calculate #select-insert-product-item').val('').trigger('change');
}
function clearcalglassinsert() {
    $('#form-add-calculate-clearglass #input-insert-heigh-cupboard-clearglass').val('');
    $('#form-add-calculate-clearglass #input-insert-width-cupboard-clearglass').val('');
    $('#form-add-calculate-clearglass #select-insert-glassdoor-type-clearglass').val('').trigger('change');
    $('#form-add-calculate-clearglass #select-insert-product-item-clearglass').val('').trigger('change');
}
let validateInput = function (modal) {
    switch (modal) {
        case _modal_holiday_name:
            if ($('#form-createHoliday #input-holiday-code').val() == "") {
                Swal.fire({
                    text: "กรุณารอระบบ generate ลำดับ",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createHoliday #input-holiday-code').focus();
                });
                return false;
            }
            else if ($('#form-createHoliday #select-holiday-day').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกวัน",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createHoliday #select-holiday-day').focus();
                });
                return false;
            }
            else if ($('#form-createHoliday #input-holiday-date').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกวันที่",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createHoliday #input-holiday-date').focus();
                });
                return false;
            }
            else if ($('#form-createHoliday #input-holiday-name').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกวันหยุด",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createHoliday #input-holiday-name').focus();
                });
                return false;
            }
            else { return true; }
            break;
        case _modal_department_name:
            if ($('#form-createDepartment #input-department-code').val() == "") {
                Swal.fire({
                    text: "กรุณารอระบบ generate รหัสแผนก",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createDepartment #input-department-code').focus();
                });
                return false;
            }
            else if ($('#form-createDepartment #input-department-name').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อแผนก",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createDepartment #input-department-name').focus();
                });
                return false;
            }
            else { return true; }
            break;
        case _modal_position_name:
            if ($('#form-createPosition #input-position-code').val() == "") {
                Swal.fire({
                    text: "กรุณารอระบบ generate รหัสตำแหน่ง",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createPosition #input-position-code').focus();
                });
                return false;
            }
            else if ($('#form-createPosition #input-position-name').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อตำแหน่ง",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createPosition #input-position-name').focus();
                });
                return false;
            }
            else { return true; }
            break;
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
        case "modal-createAccount":
            if ($('#form-createAccount #select-bank-name').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกชื่อธนาคาร",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createAccount #select-bank-name').focus();
                });
                return false;
            }
            else if ($('#form-createAccount #select-account-type').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกรูปแบบบัญชี",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createAccount #select-account-type').focus();
                });
                return false;
            }
            else if ($('#form-createAccount #select-product-type').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกชื่อหมวดหมู่",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createAccount #select-product-type').focus();
                });
                return false;
            }
            else if ($('#form-createAccount #input-account-name').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อบัญชี",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createAccount #input-account-name').focus();
                });
                return false;
            }
            else if ($('#form-createAccount #input-account-number').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกเลขบัญชี",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createAccount #input-account-number').focus();
                });
                return false;
            }
            else { return true; }
            break;
        case "modal-createEmployee":
            let empFormId = '#form-createEmployee';
            if ($(`${empFormId} input[name="input-emp-code"]`).val() == "") {
                Swal.fire({
                    text: "กรุณากรอกรหัสพนักงาน",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $(`${empFormId} input[name="input-emp-code"]`).focus();
                });
                return false;
            }
            else if ($(`${empFormId} input[name="input-emp-idCard"]`).val() == "") {
                Swal.fire({
                    text: "กรุณากรอกเลขบัตรประชาชน",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $(`${empFormId} input[name="input-emp-idCard"]`).focus();
                });
                return false;
            }
            else if ($(`${empFormId} #select-emp-role`).val() == "" || $(`${empFormId} #select-emp-role`).val() == null) {
                Swal.fire({
                    text: "กรุณาเลือกบทบาท",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $(`${empFormId} #select-emp-role`).focus();
                });
                return false;
            }
            else if ($(`${empFormId} input[name="input-emp-firstName"]`).val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อ",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $(`${empFormId} input[name="input-emp-firstName"]`).focus();
                });
                return false;
            }
            else if ($(`${empFormId} input[name="input-emp-lastName"]`).val() == "") {
                Swal.fire({
                    text: "กรุณากรอกนามสกุล",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $(`${empFormId} input[name="input-emp-lastName"]`).focus();
                });
                return false;
            }
            else if ($(`${empFormId} #select-emp-department`).val() == "" || $(`${empFormId} #select-emp-department`).val() == null) {
                Swal.fire({
                    text: "กรุณาเลือกแผนก",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $(`${empFormId} #select-emp-department`).focus();
                });
                return false;
            }
            else if ($(`${empFormId} #select-emp-position`).val() == "" || $(`${empFormId} #select-emp-position`).val() == null) {
                Swal.fire({
                    text: "กรุณาเลือกตำแหน่ง",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $(`${empFormId} #select-emp-position`).focus();
                });
                return false;
            }
            else if ($(`${empFormId} #select-salary-type`).val() == "" || $(`${empFormId} #select-salary-type`).val() == null) {
                Swal.fire({
                    text: "กรุณาเลือกการรับเงินเดือน",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $(`${empFormId} #select-salary-type`).focus();
                });
                return false;
            }
            else if ($(`${empFormId} input[name="input-emp-salary"]`).val() == "" || $(`${empFormId} input[name="input-emp-salary"]`).val() == "0") {
                Swal.fire({
                    text: "กรุณากรอกเงินเดือน",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $(`${empFormId} input[name="input-emp-salary"]`).focus();
                });
                return false;
            }
            else if ($(`${empFormId} input[name="input-start-date"]`).val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกวันที่เริ่มงาน",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $(`${empFormId} input[name="input-start-date"]`).focus();
                });
                return false;
            }
            else { return true; }
            break;
        case "modal-createRole":
            let roleFormId = '#form-createRole';
            if ($(`${roleFormId} input[name="input-role-id"]`).val() == "") {
                Swal.fire({
                    text: "กรุณารอระบบ generate รหัสบทบาท",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $(`${roleFormId} input[name="input-role-id"]`).focus();
                });
                return false;
            }
            else if ($(`${roleFormId} input[name="input-role-name"]`).val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อบทบาท",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $(`${roleFormId} input[name="input-role-name"]`).focus();
                });
                return false;
            }
            else { return true; }
            break;
        case "modal-createProduct-QuickQT":
            if ($('#form-createProductQuickQT #input-product-code').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกรหัสสินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createProductQuickQT #input-product-code').focus();
                });
                return false;
            }
            else if ($('#form-createProductQuickQT #select-product-type').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกชื่อหมวดหมู่",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createProductQuickQT #select-product-type').focus();
                });
                return false;
            }
            else if ($('#form-createProductQuickQT #input-product-text').val() == "") {
                Swal.fire({
                    text: "กรุณากรอก Text (คำอธิบายรายละเอียดที่ใช้ในการแสดงผลในใบเสนอราคา)",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createProductQuickQT #input-product-text').focus();
                });
                return false;
            }
            else if ($('#form-createProductQuickQT #input-product-price').val() == "" || $('#form-createProductQuickQT #input-product-price').val() == "0") {
                Swal.fire({
                    text: "กรุณากรอกราคาต่อเมตร",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createProductQuickQT #input-product-price').focus();
                });
                return false;
            }
            else { return true; }
            break;
        case "modal-createGroup":
            if ($('#form-createGroup #input-group-code').val() == "") {
                Swal.fire({
                    text: "กรุณารอระบบ generate รหัสหมวดหมู่หลัก",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createGroup #input-group-code').focus();
                });
                return false;
            }
            else if ($('#form-createGroup #input-group-name').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อหมวดหมู่หลัก",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createGroup #input-group-name').focus();
                });
                return false;
            }

            else { return true; }
            break;
        case "modal-createSubGroup":

            if ($('#form-createSubGroup #input-subgroup-code').val() == "") {
                Swal.fire({
                    text: "กรุณารอระบบ generate รหัสหมวดหมู่ย่อย",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createSubGroup #input-subgroup-code').focus();
                });
                return false;
            }
            else if ($('#form-createSubGroup #input-subgroup-name').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อหมวดหมู่หลัก",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createSubGroup #input-subgroup-name').focus();
                });
                return false;
            }
            else if ($('#form-createSubGroup #input-subgroup-name').val() == "" && $('#form-createSubGroup #select-group-name').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกหมวดหมู่เพื่อ generate รหัสหมวดหมู่ย่อย",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createSubGroup #select-group-name').focus();
                });
                return false;
            }
            else { return true; }
            break;
        case "modal-createBrand":
            if ($('#form-createBrand #input-brand-code').val() == "") {
                Swal.fire({
                    text: "กรุณารอระบบ generate รหัสแบรนด์สินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createBrand #input-brand-code').focus();
                });
                return false;
            }
            else if ($('#form-createBrand #input-brand-name').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อแบรนด์สินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createBrand #input-brand-name').focus();
                });
                return false;
            }

            else { return true; }
            break;
        case "modal-createUnit":
            if ($('#form-createUnit #input-unit-code').val() == "") {
                Swal.fire({
                    text: "กรุณารอระบบ generate รหัสหน่วยสินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createUnit #input-unit-code').focus();
                });
                return false;
            }
            else if ($('#form-createUnit #input-unit-name').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อหน่วยสินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createUnit #input-unit-name').focus();
                });
                return false;
            }

            else { return true; }
            break;
        case "modal-createReceiver":
            if ($('#form-createReceiver #select-receiver-empcode').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกรหัสพนักงาน",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createReceiver #select-receiver-empcode').focus();
                });
                return false;
            }
            else if ($('#form-createReceiver #input-receiver-name').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกรหัสพนักงาน",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createReceiver #select-receiver-empcode').focus();
                });
                return false;
            }

            else { return true; }
            break;
        case "modal-createStock":
            if ($('#form-createStock #input-stock-code').val() == "") {
                Swal.fire({
                    text: "กรุณารอระบบ generate รหัสหมวดคลังสินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStock #input-stock-code').focus();
                });
                return false;
            }
            else if ($('#form-createStock #input-stock-name').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อคลังสินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStock #input-stock-name').focus();
                });
                return false;
            }

            else { return true; }
            break;
        case "modal-createStockProduct":
            if ($('#form-createStockProduct #input-viewstock-code').val() == "") {
                Swal.fire({
                    text: "กรุณารอระบบ generate รหัสสินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStockProduct #input-viewstock-code').focus();
                });
                return false;
            }
            else if ($('#form-createStockProduct #input-viewstock-name').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อสินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStockProduct #input-viewstock-name').focus();
                });
                return false;
            }
            else if ($('#form-createStockProduct #select-viewstock-group').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกหมวดหมู่",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStockProduct #select-viewstock-group').focus();
                });
                return false;
            }
            else if ($('#form-createStockProduct #select-viewstock-subgroup').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกหมวดหมู่ย่อย",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStockProduct #select-viewstock-subgroup').focus();
                });
                return false;
            }
            else if ($('#form-createStockProduct #select-viewstock-brand').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกแบรนด์สินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStockProduct #select-viewstock-brand').focus();
                });
                return false;
            }
            else if ($('#form-createStockProduct #select-viewstock-stock').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกคลังสินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStockProduct #select-viewstock-stock').focus();
                });
                return false;
            }
            else if ($('#form-createStockProduct #input-viewstock-price').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกราคา",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStockProduct #input-viewstock-price').focus();
                });
                return false;
            }
            else if ($('#form-createStockProduct #input-viewstock-amount').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกจำนวน",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStockProduct #input-viewstock-amount').focus();
                });
                return false;
            }
            else if ($('#form-createStockProduct #select-viewstock-stock').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกหน่วย",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStockProduct #select-viewstock-stock').focus();
                });
                return false;
            }
            else { return true; }
            break;
        case "modal-printFrameCalculate":
            if ($('#form-printFrameCalculate #input-print-calno').val() == "") {
                Swal.fire({
                    text: "กรุณาทำรายการใหม่อีกครั้ง",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-printFrameCalculate #input-print-calno').focus();
                });
                return false;
            }
            else if ($('#form-printFrameCalculate #select-calprint-cust').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกรายชื่อลูกค้าก่อนทำการพิมพ์",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-printFrameCalculate #select-calprint-cust').focus();
                });
                return false;
            }

            else { return true; }
            break;
        case "modal-printClearglassCalculate":
            if ($('#form-printClearglassCalculate #input-print-calno-clearglass').val() == "") {
                Swal.fire({
                    text: "กรุณาทำรายการใหม่อีกครั้ง",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-printClearglassCalculate #input-print-calno-clearglass').focus();
                });
                return false;
            }
            else if ($('#form-printClearglassCalculate #select-calprint-clearglass').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกรายชื่อลูกค้าก่อนทำการพิมพ์",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-printClearglassCalculate #select-calprint-clearglass').focus();
                });
                return false;
            }

            else { return true; }
            break;
        case "modal-ReprintFrameCalculate":
            if ($('#form-ReprintFrameCalculate #input-reprint-calno').val() == "") {
                Swal.fire({
                    text: "กรุณาทำรายการใหม่อีกครั้ง",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-ReprintFrameCalculate #input-reprint-calno').focus();
                });
                return false;
            }
            else if ($('#form-ReprintFrameCalculate #select-calreprint-cust').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกรายชื่อลูกค้าก่อนทำการพิมพ์",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-ReprintFrameCalculate #select-calreprint-cust').focus();
                });
                return false;
            }

            else { return true; }
            break;
        case "modal-ReprintClearglassCalculate":
            if ($('#form-ReprintClearglassCalculate #input-reprint-calno-clearglass').val() == "") {
                Swal.fire({
                    text: "กรุณาทำรายการใหม่อีกครั้ง",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-ReprintClearglassCalculate #input-reprint-calno-clearglass').focus();
                });
                return false;
            }
            else if ($('#form-ReprintClearglassCalculate #select-calreprint-clearglass').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกรายชื่อลูกค้าก่อนทำการพิมพ์",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-ReprintClearglassCalculate #select-calreprint-clearglass').focus();
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

function callGroupNameBySubGroup(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/SubGroup/GetGroupNameSelect`,
        success: function (data) {
            renderGroupNameSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}

function callEmpData(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Receiver/GetEmpDataSelect`,
        success: function (data) {
            renderEmpDataSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}

function callGroupData(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockProduct/GetGroupSelect`,
        success: function (data) {
            renderGroupDataSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}
function callSubGroupData(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockProduct/GetSubGroupSelect`,
        success: function (data) {
            renderSubGroupDataSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}
function callBrandData(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockProduct/GetBrandSelect`,
        success: function (data) {
            renderBrandDataSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}
function callStockData(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockProduct/GetStockSelect`,
        success: function (data) {
            renderStockDataSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}
function callStockProductData(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetStockProductSelect`,
        success: function (data) {
            renderStockProductDataSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}
function callUnitData(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockProduct/GetUnitSelect`,
        success: function (data) {
            renderUnitDataSelect(select2Id, select2FirstText, data);
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

function renderGroupNameSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.id}">${v.groupname}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}

function renderEmpDataSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.id}">${v.empCode}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}
function renderGroupDataSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.id}">${v.groupname}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}
function renderSubGroupDataSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.id}">${v.subgroupname}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}
function renderProductItemDataSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.id}">${v.groupname}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}

function renderCustItemDataSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.custId}">${v.custFirstName}  ${v.custSurName}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}

function renderBrandDataSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.id}">${v.brandname}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}
function renderStockDataSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.id}">${v.stockname}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}
function renderStockProductDataSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.productcode}">${v.productcode} - ${v.productname}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}
function renderUnitDataSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.id}">${v.unitname}</option>`);
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

    var options = [];
    $.each($(`#modal-createProduct #divOptions div[name="divRenderOptions"]`), (i, item) => {
        let divId = $(item).attr('id');
        let seq = (divId.split("-")[1])

        var optionsName = $(`#${divId} #input-options-name-${seq}`).val();
        var optionsPrice = $(`#${divId} #input-options-price-${seq}`).val();
        options.push({ options: optionsName, optionsPrice: optionsPrice });
    });

    var obj = {
        itemId: $('#input-product-code').val(),
        itemName: $('#input-product-name').val(),
        typeId: $('#form-createProduct #select-product-type').val(),
        itemPrice: $('#input-product-price').val(),
        status: ($('#form-createProduct #select-product-status').val() == "1") ? true : false,
        options: options,
        loginCode: _userCode
    };

    $('.btn-modal-save-product').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-product').removeLoading();
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
                $('.btn-modal-save-product').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-product').removeLoading();
        }
    });

}

function DoAddOrUpdateGroup(modal) {
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
            callAddOrUpdateGroup(_product_item_action);
        }
    });
}

function DoAddOrUpdateStock(modal) {
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
            callAddOrUpdateStock(_product_item_action);
        }
    });
}

function callAddOrUpdateGroup() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/Group/AddItem` : `${app_settings.api_url}/api/Group/UpdateItem`;


    var obj = {
        id: $('#input-group-code').val(),
        groupname: $('#input-group-name').val(),
        status: ($('#form-createGroup #select-group-status').val() == "1") ? true : false,
        loginCode: _userCode
    };

    $('.btn-modal-save-group').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-group').removeLoading();
                $(`#modal-createGroup`).modal('hide');
                callGetGroupList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อหมวดหมู่หลักมีอยู่แล้ว กรุณากรอกชื่อหมวดหมู่หลักอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createGroup #input-group-name').focus();
                    });
                }
                $('.btn-modal-save-group').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-group').removeLoading();
        }
    });

}

function callAddOrUpdateStock() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/Stock/AddItem` : `${app_settings.api_url}/api/Stock/UpdateItem`;


    var obj = {
        id: $('#input-stock-code').val(),
        stockname: $('#input-stock-name').val(),
        status: ($('#form-createStock #select-stock-status').val() == "1") ? true : false,
        loginCode: _userCode
    };

    $('.btn-modal-save-stock').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-stock').removeLoading();
                $(`#modal-createStock`).modal('hide');
                callGetStockList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อหมวดหมู่หลักมีอยู่แล้ว กรุณากรอกชื่อหมวดหมู่หลักอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createStock #input-stock-name').focus();
                    });
                }
                $('.btn-modal-save-stock').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-group').removeLoading();
        }
    });

}

function DoAddOrUpdateSubGroup(modal) {
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
            callAddOrUpdateSubGroup(_product_item_action);
        }
    });
}

function DoPrintCal(modal) {
    if (!validateInput(modal)) return;

    Swal.fire({
        title: 'คุณต้องการพิมพ์สูตรคำนวนหรือไม่',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
        //cancelButtonColor: _modal_default_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            var calCode = $('#form-printFrameCalculate input[name="input-print-calno"]').val();
            var CreateDate = $('#form-printFrameCalculate #input-print-createdate').val();
            var DoorType = $('#form-printFrameCalculate #select-calprint-glassdoortype').val();
            var InstallDate = $('#form-printFrameCalculate #input-print-installdate').val();
            var CustName = $('#form-printFrameCalculate #select-calprint-cust option:selected').text();
            var InstallAddress = document.getElementById('input-print-address').value;
            callPrintCal(calCode, DoorType, CreateDate, InstallDate, CustName, InstallAddress);
            $('#modal-printFrameCalculate').modal('hide');
        }
    });
}

function DoRePrintCal(modal) {
    if (!validateInput(modal)) return;

    Swal.fire({
        title: 'คุณต้องการพิมพ์สูตรคำนวนหรือไม่',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
        //cancelButtonColor: _modal_default_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            var calCode = $('#form-ReprintFrameCalculate input[name="input-reprint-calno"]').val();
            var CreateDate = $('#form-ReprintFrameCalculate #input-reprint-createdate').val();
            var DoorType = $('#form-ReprintFrameCalculate #select-calreprint-glassdoortype').val();
            var InstallDate = $('#form-ReprintFrameCalculate #input-reprint-installdate').val();
            var CustName = $('#form-ReprintFrameCalculate #select-calreprint-cust option:selected').text();
            var InstallAddress = document.getElementById('input-reprint-address').value;
            callPrintCal(calCode, DoorType, CreateDate, InstallDate, CustName, InstallAddress);
            $('#modal-ReprintFrameCalculate').modal('hide');
            var table = $('#tb-search-frameglass-list').DataTable();

            //clear datatable
            table.clear().draw();
            /*$('#tb-search-frameglass-list').DataTable().clear();*/
            $('#form-search-calculate input[name="input-search-calulate-code"]').val('');
            $('.btn-print-search-calculate').css('display', 'none');
        }
    });
}

function DoPrintClearGlassCal(modal) {
    if (!validateInput(modal)) return;

    Swal.fire({
        title: 'คุณต้องการพิมพ์สูตรคำนวนหรือไม่',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
        //cancelButtonColor: _modal_default_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            var calCode = $('#form-printClearglassCalculate input[name="input-print-calno-clearglass"]').val();
            var CreateDate = $('#form-printClearglassCalculate #input-print-createdate-clearglass').val();
            var DoorType = $('#form-printClearglassCalculate #select-calprint-glassdoortype-clearglass').val();
            var InstallDate = $('#form-printClearglassCalculate #input-print-installdate-clearglass').val();
            var CustName = $('#form-printClearglassCalculate #select-calprint-cust-clearglass option:selected').text();
            var InstallAddress = document.getElementById('input-print-address-clearglass').value;
            callPrintClearGlassCal(calCode, DoorType, CreateDate, InstallDate, CustName, InstallAddress);
            $('#modal-printClearglassCalculate').modal('hide');
        }
    });
}

function DoRePrintClearGlassCal(modal) {
    if (!validateInput(modal)) return;

    Swal.fire({
        title: 'คุณต้องการพิมพ์สูตรคำนวนหรือไม่',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
        //cancelButtonColor: _modal_default_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            var calCode = $('#form-ReprintClearglassCalculate input[name="input-reprint-calno-clearglass"]').val();
            var CreateDate = $('#form-ReprintClearglassCalculate #input-reprint-createdate-clearglass').val();
            var DoorType = $('#form-ReprintClearglassCalculate #select-calreprint-glassdoortype-clearglass').val();
            var InstallDate = $('#form-ReprintClearglassCalculate #input-reprint-installdate-clearglass').val();
            var CustName = $('#form-ReprintClearglassCalculate #select-calreprint-cust-clearglass option:selected').text();
            var InstallAddress = document.getElementById('input-reprint-address-clearglass').value;
            callPrintClearGlassCal(calCode, DoorType, CreateDate, InstallDate, CustName, InstallAddress);
            $('#modal-ReprintClearglassCalculate').modal('hide');
            var table = $('#tb-search-clearglass-list').DataTable();

            //clear datatable
            table.clear().draw();
            /*$('#tb-search-frameglass-list').DataTable().clear();*/
            $('#form-search-calculate-clearglass input[name="input-search-calulate-code-clearglass"]').val('');
            $('.btn-print-search-calculate-clearglass').css('display', 'none');
        }
    });
}

function onCustCalChange() {
    var val = document.getElementById("select-calprint-cust").value;
    if (val != '') {
      
        callGetCustCalDetail(val);
    }
    else {
        $('#form-printFrameCalculate input[name="input-print-installdate"]').val("");
        $('#form-printFrameCalculate input[name="input-print-address"]').val("");
    }
}

function onCustReprintCalChange() {
    var val = document.getElementById("select-calreprint-cust").value;
    if (val != '') {

        callGetCustReprintCalDetail(val);
    }
    else {
        $('#form-ReprintFrameCalculate input[name="input-reprint-installdate"]').val("");
        $('#form-ReprintFrameCalculate input[name="input-reprint-address"]').val("");
    }
}

function onCustClearGlassCalChange() {
    var val = document.getElementById("select-calprint-cust-clearglass").value;
    if (val != '') {

        callGetCustCalClearDetail(val);
    }
    else {
        $('#form-printClearglassCalculate input[name="input-print-installdate-clearglass"]').val("");
        $('#form-printClearglassCalculate input[name="input-print-address-clearglass"]').val("");
    }
}

function onCustReprintClearGlassCalChange() {
    var val = document.getElementById("select-calreprint-cust-clearglass").value;
    if (val != '') {

        callGetCustReCalClearDetail(val);
    }
    else {
        $('#form-ReprintClearglassCalculate input[name="input-reprint-installdate-clearglass"]').val("");
        $('#form-ReprintClearglassCalculate input[name="input-reprint-address-clearglass"]').val("");
    }
}

function callGetCustCalDetail(id, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetCustDetailList?id=${id}`,
        success: function (data) {
            console.log(data);
            if (data != '') {
                var setDate = new Date(data[0].installDate);
                var fulldate = setDate.getDate() + "/" + (setDate.getMonth() + 1) + "/" + setDate.getFullYear();
                $('#form-printFrameCalculate input[name="input-print-installdate"]').val(fulldate);
                document.getElementById('input-print-address').value = data[0].custInstallAddress;
                //$('#form-printFrameCalculate input[name="input-print-address"]').val(data[0].custInstallAddress);
            }

        },
        error: function (err) {

        }
    });
}

function callGetCustReprintCalDetail(id, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetCustDetailList?id=${id}`,
        success: function (data) {
            console.log(data);
            if (data != '') {
                var setDate = new Date(data[0].installDate);
                var fulldate = setDate.getDate() + "/" + (setDate.getMonth() + 1) + "/" + setDate.getFullYear();
                $('#form-ReprintFrameCalculate input[name="input-reprint-installdate"]').val(fulldate);
                document.getElementById('input-reprint-address').value = data[0].custInstallAddress;
                //$('#form-printFrameCalculate input[name="input-print-address"]').val(data[0].custInstallAddress);
            }

        },
        error: function (err) {

        }
    });
}

function callGetCustCalClearDetail(id, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetCustDetailList?id=${id}`,
        success: function (data) {
            console.log(data);
            if (data != '') {
                var setDate = new Date(data[0].installDate);
                var fulldate = setDate.getDate() + "/" + (setDate.getMonth() + 1) + "/" + setDate.getFullYear();
                $('#form-printClearglassCalculate input[name="input-print-installdate-clearglass"]').val(fulldate);
                document.getElementById('input-print-address-clearglass').value = data[0].custInstallAddress;
                //$('#form-printFrameCalculate input[name="input-print-address"]').val(data[0].custInstallAddress);
            }

        },
        error: function (err) {

        }
    });
}
function callGetCustReCalClearDetail(id, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetCustDetailList?id=${id}`,
        success: function (data) {
            console.log(data);
            if (data != '') {
                var setDate = new Date(data[0].installDate);
                var fulldate = setDate.getDate() + "/" + (setDate.getMonth() + 1) + "/" + setDate.getFullYear();
                $('#form-ReprintClearglassCalculate input[name="input-reprint-installdate-clearglass"]').val(fulldate);
                document.getElementById('input-reprint-address-clearglass').value = data[0].custInstallAddress;
                //$('#form-printFrameCalculate input[name="input-print-address"]').val(data[0].custInstallAddress);
            }

        },
        error: function (err) {

        }
    });
}
function callAddOrUpdateSubGroup() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/SubGroup/AddItem` : `${app_settings.api_url}/api/SubGroup/UpdateItem`;


    var obj = {
        id: $("#input-subgroup-id").val(),
        subgroupcode: $('#input-subgroup-code').val(),
        subgroupname: $('#input-subgroup-name').val(),
        groupid: $('#select-group-name').val(),
        status: ($('#form-createSubGroup #select-subgroup-status').val() == "1") ? true : false,
        loginCode: _userCode
    };

    $('.btn-modal-save-subgroup').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-subgroup').removeLoading();
                $(`#modal-createSubGroup`).modal('hide');
                callGetSubGroupList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อหมวดหมู่หลักมีอยู่แล้ว กรุณากรอกชื่อหมวดหมู่หลักอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createSubGroup #input-subgroup-name').focus();
                    });
                }
                $('.btn-modal-save-subgroup').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-subgroup').removeLoading();
        }
    });

}

function DoAddOrUpdateBrand(modal) {
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
            callAddOrUpdateBrand(_product_item_action);
        }
    });
}

function callAddOrUpdateBrand() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/Brand/AddItem` : `${app_settings.api_url}/api/Brand/UpdateItem`;


    var obj = {
        id: $('#input-brand-id').val(),
        brandcode: $('#input-brand-code').val(),
        brandname: $('#input-brand-name').val(),
        status: ($('#form-createBrand #select-brand-status').val() == "1") ? true : false,
        loginCode: _userCode
    };


    $('.btn-modal-save-brand').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-brand').removeLoading();
                $(`#modal-createBrand`).modal('hide');
                callGetBrandList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อแบรนด์สินค้ามีอยู่แล้ว กรุณากรอกชื่อแบรนด์สินค้าอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createBrand #input-brand-name').focus();
                    });
                }
                $('.btn-modal-save-brand').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-brand').removeLoading();
        }
    });

}

function DoAddOrUpdateUnit(modal) {
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
            callAddOrUpdateUnit(_product_item_action);
        }
    });
}

function callAddOrUpdateUnit() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/Unit/AddItem` : `${app_settings.api_url}/api/Unit/UpdateItem`;


    var obj = {
        id: $('#input-unit-code').val(),
        unitname: $('#input-unit-name').val(),
        status: ($('#form-createUnit #select-unit-status').val() == "1") ? true : false,
        loginCode: _userCode
    };

    $('.btn-modal-save-unit').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-unit').removeLoading();
                $(`#modal-createUnit`).modal('hide');
                callGetUnitList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อหมวดหมู่หลักมีอยู่แล้ว กรุณากรอกชื่อหมวดหมู่หลักอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createUnit #input-unit-name').focus();
                    });
                }
                $('.btn-modal-save-unit').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-unit').removeLoading();
        }
    });

}
function DoAddOrUpdateStockProduct(modal) {
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
            callAddOrUpdateStockProduct(_product_item_action);
        }
    });
}

function callAddOrUpdateStockProduct() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/StockProduct/AddItem` : `${app_settings.api_url}/api/StockProduct/UpdateItem`;


    var obj = {
        id: $('#input-viewstock-id').val(),
        productcode: $('#input-viewstock-code').val(),
        productname: $('#input-viewstock-name').val(),
        productprice: $('#input-viewstock-price').val(),
        stockamount: $('#input-viewstock-amount').val(),
        groupid: $('#form-createStockProduct #select-viewstock-group').val(),
        subgroupid: $('#form-createStockProduct #select-viewstock-subgroup').val(),
        brandid: $('#form-createStockProduct #select-viewstock-brand').val(),
        stockid: $('#form-createStockProduct #select-viewstock-stock').val(),
        unitmasterid: $('#form-createStockProduct #select-viewstock-unit').val(),
        status: ($('#form-createStockProduct #select-viewstock-status').val() == "1") ? true : false,
        loginCode: _userCode
    };
    console.log(JSON.stringify(obj));

    $('.btn-modal-save-viewstock').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-viewstock').removeLoading();
                $(`#modal-createStockProduct`).modal('hide');
                callGetStockProductList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อแบรนด์สินค้ามีอยู่แล้ว กรุณากรอกชื่อแบรนด์สินค้าอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createStockProduct #input-viewstock-name').focus();
                    });
                }
                $('.btn-modal-save-viewstock').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-viewstock').removeLoading();
        }
    });

}
function DoAddOrUpdateReceiver(modal) {
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
            callAddOrUpdateReceiver(_product_item_action);
        }
    });
}

function callAddOrUpdateReceiver() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/Receiver/AddItem` : `${app_settings.api_url}/api/Receiver/UpdateItem`;

    var obj = {
        id: ($('#form-createReceiver #input-receiver-id').val() == '') ? 0 : $('#form-createReceiver #input-receiver-id').val(),
        empid: $('#form-createReceiver #select-receiver-empcode').val(),
        status: ($('#form-createReceiver #select-receiver-status').val() == "1") ? true : false,
        loginCode: _userCode
    };

    $('.btn-modal-save-receiver').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-receiver').removeLoading();
                $(`#modal-createReceiver`).modal('hide');
                callGetReceiverList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อหมวดหมู่หลักมีอยู่แล้ว กรุณากรอกชื่อหมวดหมู่หลักอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createReceiver #input-unit-name').focus();
                    });
                }
                $('.btn-modal-save-receiver').removeLoading()
            }
        },
        error: () => {
            $('.btn-modal-save-receiver').removeLoading();
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
    let itemName = ($('#form-search-product #input-search-product-items').val() == '' || $('#form-search-product #input-search-product-items').val() == undefined) ? null : $('#form-search-product #input-search-product-items').val();
    let typeId = ($('#form-search-product #select-search-product-type').val() == '' || $('#form-search-product #select-search-product-type').val() == null) ? "0" : $('#form-search-product #select-search-product-type').val();
    let status = ($('#form-search-product #select-search-product-status').val() == '' || $('#form-search-product #select-search-product-status').val() == undefined) ? null : $('#form-search-product #select-search-product-status').val();

    let loaded = $('#tb-product-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Product/GetItemList?itemName=${itemName}&typeId=${typeId}&status=${status}`,
        success: function (data) {
            renderGetItemList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function callGetGroupList() {
    let groupcode = ($('#form-search-Group #input-search-groupcode-items').val() == '' || $('#form-search-Group #input-search-groupcode-items').val() == undefined) ? 0 : $('#form-search-Group #input-search-groupcode-items').val();
    let groupname = ($('#form-search-Group #input-search-groupname-items').val() == '' || $('#form-search-Group #input-search-groupname-items').val() == undefined) ? null : $('#form-search-Group #input-search-groupname-items').val();
    let status = ($('#form-search-Group #select-search-group-status').val() == '' || $('#form-search-Group #select-search-group-status').val() == undefined) ? null : $('#form-search-Group #select-search-group-status').val();

    let loaded = $('#tb-group-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Group/GetGroupList?groupName=${groupname}&groupId=${groupcode}&status=${status}`,
        success: function (data) {

            if (data.length > 0) {
                renderGetItemGroupList(data);
                callGroupNameBySubGroup('#form-createSubGroup #select-group-name', 'กรุณาเลือก');
            }

            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function callGetFrameList() {
    
    let calcode = ($('#form-search-calculate #input-search-calulate-code').val() == '' || $('#form-search-calculate #input-search-calulate-code').val() == undefined) ? null : $('#form-search-calculate #input-search-calulate-code').val();

    let loaded = $('#tb-search-frameglass-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetCalByCode?calcode=${calcode}&caltype=F`,
        success: function (data) {

            if (data.length > 0) {
                renderCalFrameList(data);
                $('.btn-print-search-calculate').css('display', '');
            }
            else {
                $('.btn-print-search-calculate').css('display', 'none');
            }
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function callGetClearGlassList() {

    let calcode = ($('#form-search-calculate-clearglass #input-search-calulate-code-clearglass').val() == '' || $('#form-search-calculate-clearglass #input-search-calulate-code-clearglass').val() == undefined) ? null : $('#form-search-calculate-clearglass #input-search-calulate-code-clearglass').val();

    let loaded = $('#tb-search-clearglass-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetCalByCode?calcode=${calcode}&caltype=C`,
        success: function (data) {

            if (data.length > 0) {
                renderCalClearGlassList(data);
                $('.btn-print-search-calculate-clearglass').css('display', '');
            }
            else {
                $('.btn-print-search-calculate-clearglass').css('display', 'none');
            }
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function callGetSubGroupList() {
    let code = ($('#form-search-subgroup #input-search-subgroupcode-items').val() == '' || $('#form-search-subgroup #input-search-subgroupcode-items').val() == undefined) ? null : $('#form-search-subgroup #input-search-subgroupcode-items').val();
    let name = ($('#form-search-subgroup #input-search-subgroupname-items').val() == '' || $('#form-search-subgroup #input-search-subgroupname-items').val() == undefined) ? null : $('#form-search-subgroup #input-search-subgroupname-items').val();
    let status = ($('#form-search-subgroup #select-search-subgroup-status').val() == '' || $('#form-search-subgroup #select-search-subgroup-status').val() == undefined) ? null : $('#form-search-subgroup #select-search-subgroup-status').val();

    let loaded = $('#tb-subgroup-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/SubGroup/GetSubGroupList?subgroupCode=${code}&subgroupName=${name}&status=${status}`,
        success: function (data) {

            if (data.length > 0) {
                renderGetItemSubGroupList(data);
            }

            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function callGetBrandList() {
    let brandcode = ($('#form-search-brand #input-search-brand-code').val() == '' || $('#form-search-brand #input-search-brand-code').val() == undefined) ? null : $('#form-search-brand #input-search-brand-code').val();
    let brandname = ($('#form-search-brand #input-search-brand-name').val() == '' || $('#form-search-brand #input-search-brand-name').val() == undefined) ? null : $('#form-search-brand #input-search-brand-name').val();
    let status = ($('#form-search-brand #select-search-brand-status').val() == '' || $('#form-search-brand #select-search-brand-status').val() == undefined) ? null : $('#form-search-brand #select-search-brand-status').val();

    let loaded = $('#tb-brand-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Brand/GetBrandList?brandcode=${brandcode}&brandname=${brandname}&status=${status}`,
        success: function (data) {

            if (data.length > 0) {
                renderGetItemBrandList(data);

            }

            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function callGetUnitList() {
    let id = ($('#form-search-Unit #input-search-unit-code').val() == '' || $('#form-search-Unit #input-search-unit-code').val() == undefined) ? 0 : $('#form-search-Unit #input-search-unit-code').val();
    let unitname = ($('#form-search-Unit #input-search-unit-name').val() == '' || $('#form-search-Unit #input-search-unit-name').val() == undefined) ? null : $('#form-search-Unit #input-search-unit-name').val();
    let status = ($('#form-search-Unit #select-search-unit-status').val() == '' || $('#form-search-Unit #select-search-unit-status').val() == undefined) ? null : $('#form-search-Unit #select-search-unit-status').val();

    let loaded = $('#tb-unit-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Unit/GetUnitList?id=${id}&unitname=${unitname}&status=${status}`,
        success: function (data) {

            if (data.length > 0) {
                renderGetItemUnitList(data);

            }

            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function callGetReceiverList() {
    let empcode = ($('#form-search-receiver #input-search-receiver-code').val() == '' || $('#form-search-receiver #input-search-receiver-code').val() == undefined) ? null : $('#form-search-receiver #input-search-receiver-code').val();
    let empname = ($('#form-search-receiver #input-search-receiver-name').val() == '' || $('#form-search-receiver #input-search-receiver-name').val() == undefined) ? null : $('#form-search-receiver #input-search-receiver-name').val();
    let status = ($('#form-search-receiver #select-search-receiver-status').val() == '' || $('#form-search-receiver #select-search-receiver-status').val() == undefined) ? null : $('#form-search-receiver #select-search-receiver-status').val();

    let loaded = $('#tb-receiver-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Receiver/GetReceiverList?empcode=${empcode}&empname=${empname}&status=${status}`,
        success: function (data) {

            if (data.length > 0) {
                renderGetItemReceiverList(data);
                callEmpData('#form-createReceiver #select-receiver-empcode', 'กรุณาเลือก');
            }

            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function callGetStockList() {
    let stockid = ($('#form-search-stock #input-search-stock-code').val() == '' || $('#form-search-stock #input-search-stock-code').val() == undefined) ? 0 : $('#form-search-stock #input-search-stock-code').val();
    let stockname = ($('#form-search-stock #input-search-stock-name').val() == '' || $('#form-search-stock #input-search-stock-name').val() == undefined) ? null : $('#form-search-stock #input-search-stock-name').val();
    let status = ($('#form-search-stock #select-search-stock-status').val() == '' || $('#form-search-stock #select-search-stock-status').val() == undefined) ? null : $('#form-search-stock #select-search-stock-status').val();

    let loaded = $('#tb-stock-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Stock/GetStockList?stockname=${stockname}&stockid=${stockid}&status=${status}`,
        success: function (data) {

            if (data.length > 0) {
                renderGetItemStockList(data);
                //callGroupNameBySubGroup('#form-createSubGroup #select-group-name', 'กรุณาเลือก');
            }

            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function callPrintCal(CalCode, DoorType, CreateDate, InstallDate, CustName, InstallAddress) {
    window.location = `/api/Calculate/ExportFrameCal?calcode=${CalCode}&glassdoorType=${DoorType}&CreateDate=${CreateDate}&InstallDate=${InstallDate}&CustName=${CustName}&InstallAddress=${InstallAddress}`;
}
function callPrintClearGlassCal(CalCode, DoorType, CreateDate, InstallDate, CustName, InstallAddress) {
    window.location = `/api/Calculate/ExportClearGlassCal?calcode=${CalCode}&glassdoorType=${DoorType}&CreateDate=${CreateDate}&InstallDate=${InstallDate}&CustName=${CustName}&InstallAddress=${InstallAddress}`;
}

function callGetStockProductList() {
    let productcode = ($('#form-search-viewstock #input-search-viewstock-code').val() == '' || $('#form-search-viewstock #input-search-viewstock-code').val() == undefined) ? null : $('#form-search-viewstock #input-search-viewstock-code').val();
    let productname = ($('#form-search-viewstock #input-search-viewstock-name').val() == '' || $('#form-search-viewstock #input-search-viewstock-name').val() == undefined) ? null : $('#form-search-viewstock #input-search-viewstock-name').val();
    let status = ($('#form-search-viewstock #select-search-viewstock-status').val() == '' || $('#form-search-viewstock #select-search-viewstock-status').val() == undefined) ? null : $('#form-search-viewstock #select-search-viewstock-status').val();
    let groupid = ($('#form-search-viewstock #select-search-viewstock-group').val() == '' || $('#form-search-viewstock #select-search-viewstock-group').val() == undefined) ? 0 : $('#form-search-viewstock #select-search-viewstock-group').val();
    let subgroupid = ($('#form-search-viewstock #select-search-viewstock-subgroup').val() == '' || $('#form-search-viewstock #select-search-viewstock-subgroup').val() == undefined) ? 0 : $('#form-search-viewstock #select-search-viewstock-subgroup').val();
    let brandid = ($('#form-search-viewstock #select-search-viewstock-brand').val() == '' || $('#form-search-viewstock #select-search-viewstock-brand').val() == undefined) ? 0 : $('#form-search-viewstock #select-search-viewstock-brand').val();
    let stockid = ($('#form-search-viewstock #select-search-viewstock-stock').val() == '' || $('#form-search-viewstock #select-search-viewstock-stock').val() == undefined) ? 0 : $('#form-search-viewstock #select-search-viewstock-stock').val();

    let loaded = $('#tb-viewstock-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockProduct/GetStockProductList?groupid=${groupid}&subgroupid=${subgroupid}&brandid=${brandid}&stockid=${stockid}&productcode=${productcode}&productname=${productname}&status=${status}`,
        success: function (data) {

            if (data.length > 0) {
                renderGetItemStockProductList(data);
                //callGroupNameBySubGroup('#form-createSubGroup #select-group-name', 'กรุณาเลือก');
            }

            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function saveCalculate() {
    let loaded = $('#tb-frameglass-list');
    loaded.prepend(_loader);
    var SaveCalculate = {};
    var calListDetailData = new Array();
    var calcode = $('#form-add-calculate input[name="input-insert-calulate-code"]').val();
    if (calcode != '') {
        $("#tb-frameglass-list tbody tr").each(function () {
            var row = $(this);
            var calListDetail = {};
            calListDetail.product = row.find("td").eq(0).html();
            calListDetail.glassdoortype = row.find("td").eq(1).html();
            calListDetail.producttext = row.find("td").eq(2).html();
            calListDetail.calhm = row.find("td").eq(3).html();
            calListDetail.calwm = row.find("td").eq(4).html();
            calListDetail.calh = row.find("td").eq(5).html();
            calListDetail.calw = row.find("td").eq(6).html();
            calListDetail.calhdel = row.find("td").eq(7).html();
            calListDetail.calwdel = row.find("td").eq(8).html();
            calListDetail.glassdoortypetext = row.find("td").eq(9).html();
            calListDetailData.push(calListDetail);
        });

        SaveCalculate.calculatecode = calcode;
        SaveCalculate.userlogin = _userCode;
        SaveCalculate.listdetail = calListDetailData;
        _calCode = calcode;
        $.ajax({
            type: 'POST',
            url: `${app_settings.api_url}/api/Calculate/AddGlassFrameItem`,
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: JSON.stringify(SaveCalculate),
            success: function (data) {

                if (data.result && data.resultStatus == "success") {
                    callSuccessAlert();
                    callGetCalculateCode();
                    clearcalinsert();
                    _issavecal = true;
                    $("#tb-frameglass-list tbody tr").remove();
                }
                else {
                    Swal.fire({
                        text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {

                    });
                }
                loaded.find(_loader).remove();
            },
            error: function (err) {
                loaded.find(_loader).remove();
            }
        });
    }
    else {
        Swal.fire({
            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {

        });
    }
}

function saveCalculateClearglass() {
    let loaded = $('#tb-clearglass-list');
    loaded.prepend(_loader);
    var SaveCalculate = {};
    var calListDetailData = new Array();
    var calcode = $('#form-add-calculate-clearglass input[name="input-insert-calulate-code-clearglass"]').val();
    if (calcode != '') {
        $("#tb-clearglass-list tbody tr").each(function () {
            var row = $(this);
            var calListDetail = {};
            calListDetail.product = row.find("td").eq(0).html();
            calListDetail.glassdoortype = row.find("td").eq(1).html();
            calListDetail.producttext = row.find("td").eq(2).html();
            calListDetail.calhm = row.find("td").eq(3).html();
            calListDetail.calwm = row.find("td").eq(4).html();
            calListDetail.calh = row.find("td").eq(5).html();
            calListDetail.calw = row.find("td").eq(6).html();
            calListDetail.glassdoortypetext = row.find("td").eq(9).html();
            calListDetailData.push(calListDetail);
        });

        SaveCalculate.calculatecode = calcode;
        SaveCalculate.userlogin = _userCode;
        SaveCalculate.listdetail = calListDetailData;
        _calCodeClearGlass = calcode;
        $.ajax({
            type: 'POST',
            url: `${app_settings.api_url}/api/Calculate/AddClearGlassItem`,
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: JSON.stringify(SaveCalculate),
            success: function (data) {
                if (data.result && data.resultStatus == "success") {
                    callSuccessAlert();
                    callGetCalculateCode();
                    clearcalglassinsert();
                    _issaveglasscal = true;
                    $("#tb-clearglass-list tbody tr").remove();
                }
                else {
                    Swal.fire({
                        text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {

                    });
                }
                loaded.find(_loader).remove();
            },
            error: function (err) {
                loaded.find(_loader).remove();
            }
        });
    }
    else {
        Swal.fire({
            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {

        });
    }
}

function saveCalculatePrint() {
    let loaded = $('#tb-frameglass-list');
    loaded.prepend(_loader);
    var SaveCalculate = {};
    var calListDetailData = new Array();
    var calcode = $('#form-add-calculate input[name="input-insert-calulate-code"]').val();
    if (calcode != '') {
        $("#tb-frameglass-list tbody tr").each(function () {
            var row = $(this);
            var calListDetail = {};
            calListDetail.product = row.find("td").eq(0).html();
            calListDetail.glassdoortype = row.find("td").eq(1).html();
            calListDetail.producttext = row.find("td").eq(2).html();
            calListDetail.calhm = row.find("td").eq(3).html();
            calListDetail.calwm = row.find("td").eq(4).html();
            calListDetail.calh = row.find("td").eq(5).html();
            calListDetail.calw = row.find("td").eq(6).html();
            calListDetail.calhdel = row.find("td").eq(7).html();
            calListDetail.calwdel = row.find("td").eq(8).html();
            calListDetail.glassdoortypetext = row.find("td").eq(9).html();
            calListDetailData.push(calListDetail);
        });

        SaveCalculate.calculatecode = calcode;
        SaveCalculate.userlogin = _userCode;
        SaveCalculate.listdetail = calListDetailData;
        _calCode = calcode;
        $.ajax({
            type: 'POST',
            url: `${app_settings.api_url}/api/Calculate/AddGlassFrameItem`,
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: JSON.stringify(SaveCalculate),
            success: function (data) {

                if (data.result && data.resultStatus == "success") {

                    callGetCalculateCode();
                    clearcalinsert();
                    _issavecal = true;
                    $("#tb-frameglass-list tbody tr").remove();
  
                    if (_issavecal) {
                        callCustItemCal('#form-printFrameCalculate #select-calprint-cust', '-- กรุณาเลือก --');
                        callPrintDoorType('#form-printFrameCalculate #select-calprint-glassdoortype', true);
                        callCalMaster(_calCode,"F");
                        $('#form-printFrameCalculate input[name="input-print-calno"]').val(_calCode);
                        $(`#modal-printFrameCalculate #itemHeader`).text('พิมพ์สูตรคำนวน');
                        $('#modal-printFrameCalculate').modal('show');
                    }
                }
                else {
                    Swal.fire({
                        text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {

                    });
                }
                loaded.find(_loader).remove();
            },
            error: function (err) {
                loaded.find(_loader).remove();
            }
        });
    }
    else {
        Swal.fire({
            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {

        });
    }
}

function saveCalculateClearglassPrint() {
    let loaded = $('#tb-clearglass-list');
    loaded.prepend(_loader);
    var SaveCalculate = {};
    var calListDetailData = new Array();
    var calcode = $('#form-add-calculate-clearglass input[name="input-insert-calulate-code-clearglass"]').val();
    if (calcode != '') {
        $("#tb-clearglass-list tbody tr").each(function () {
            var row = $(this);
            var calListDetail = {};
            calListDetail.product = row.find("td").eq(0).html();
            calListDetail.glassdoortype = row.find("td").eq(1).html();
            calListDetail.producttext = row.find("td").eq(2).html();
            calListDetail.calhm = row.find("td").eq(3).html();
            calListDetail.calwm = row.find("td").eq(4).html();
            calListDetail.calh = row.find("td").eq(5).html();
            calListDetail.calw = row.find("td").eq(6).html();
            calListDetail.glassdoortypetext = row.find("td").eq(9).html();
            calListDetailData.push(calListDetail);
        });

        SaveCalculate.calculatecode = calcode;
        SaveCalculate.userlogin = _userCode;
        SaveCalculate.listdetail = calListDetailData;
        _calCodeClearGlass = calcode;
        $.ajax({
            type: 'POST',
            url: `${app_settings.api_url}/api/Calculate/AddClearGlassItem`,
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: JSON.stringify(SaveCalculate),
            success: function (data) {
                if (data.result && data.resultStatus == "success") {
                    callGetCalculateCode();
                    clearcalglassinsert();
                    _issaveglasscal = true;
                    $("#tb-clearglass-list tbody tr").remove();

                    if (_issaveglasscal) {
                        console.log("aa");
                        callCustItemCal('#form-printClearglassCalculate #select-calprint-cust-clearglass', '-- กรุณาเลือก --');
                        callPrintDoorType('#form-printClearglassCalculate #select-calprint-glassdoortype-clearglass', true);
                        callCalMaster(_calCodeClearGlass,"C");
                        $('#form-printClearglassCalculate input[name="input-print-calno-clearglass"]').val(_calCodeClearGlass);
                        $(`#modal-printClearglassCalculate #itemHeader`).text('พิมพ์สูตรคำนวน');
                        $('#modal-printClearglassCalculate').modal('show');
                    }
                }
                else {
                    Swal.fire({
                        text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {

                    });
                }
                loaded.find(_loader).remove();
            },
            error: function (err) {
                loaded.find(_loader).remove();
            }
        });
    }
    else {
        Swal.fire({
            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {

        });
    }
}

function RePrintFrame() {
  
    var calcode = $('#form-search-calculate input[name="input-search-calulate-code"]').val();
    if (calcode != '') {
       
        callCustItemCal('#form-ReprintFrameCalculate #select-calreprint-cust', '-- กรุณาเลือก --');
        callPrintDoorType('#form-ReprintFrameCalculate #select-calreprint-glassdoortype', true);
        callReCalMaster(calcode, "F");
        $('#form-ReprintFrameCalculate input[name="input-reprint-calno"]').val(calcode);
        $(`#modal-ReprintFrameCalculate #itemHeader`).text('พิมพ์สูตรคำนวน');
        $('#modal-ReprintFrameCalculate').modal('show');
    }
    else {
        Swal.fire({
            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {

        });
    }
}

function ReprintClearGlass() {

    var calcode = $('#form-search-calculate-clearglass input[name="input-search-calulate-code-clearglass"]').val();
    if (calcode != '') {
        callCustItemCal('#form-ReprintClearglassCalculate #select-calreprint-cust-clearglass', '-- กรุณาเลือก --');
        callPrintDoorType('#form-ReprintClearglassCalculate #select-calreprint-glassdoortype-clearglass', true);
        callReCalMaster(calcode, "C");
        $('#form-ReprintClearglassCalculate input[name="input-reprint-calno-clearglass"]').val(calcode);
        $(`#modal-ReprintClearglassCalculate #itemHeader`).text('พิมพ์สูตรคำนวน');
        $('#modal-ReprintClearglassCalculate').modal('show');
    }
    else {
        Swal.fire({
            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {

        });
    }
}

function callGetCalculateCode() {
    let url = `${app_settings.api_url}/api/Calculate/GetLastestItemId`;

    $.ajax({
        url: url,
        type: 'GET',
        success: (res) => {
            $('#form-add-calculate input[name="input-insert-calulate-code"]').val(res);
            $('#form-add-calculate-clearglass input[name="input-insert-calulate-code-clearglass"]').val(res);
        },
        error: () => {
        }
    });
}

function renderGetItemSubGroupList(data) {

    $('#tb-subgroup-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.id);
                /*   $(row).attr('data-typeid', data.typeId);*/
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "hidecol",
                },
                {
                    targets: 1,
                    data: 'subgroupcode',
                    className: "item-details",
                },
                {
                    targets: 2,
                    data: 'subgroupname',
                },
                {
                    targets: 3,
                    data: 'groupname',
                },
                {
                    targets: 4,
                    data: 'createDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 5,
                    data: 'createByName'
                },
                {
                    targets: 6,
                    data: 'updateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 7,
                    data: 'updateByName'
                },
                {
                    targets: 8,
                    data: 'status',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 9,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-subgroup" data-id="${row.id}" title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}

function renderGetItemGroupList(data) {

    $('#tb-group-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.id);
                /*   $(row).attr('data-typeid', data.typeId);*/
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "item-details",
                },
                {
                    targets: 1,
                    data: 'groupname',
                },
                {
                    targets: 2,
                    data: 'createDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 3,
                    data: 'createByName'
                },
                {
                    targets: 4,
                    data: 'updateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 5,
                    data: 'updateByName'
                },
                {
                    targets: 6,
                    data: 'status',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 7,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-group" data-id="${row.id}" title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}

function renderCalFrameList(data) {

    $('#tb-search-frameglass-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.id);
                /*   $(row).attr('data-typeid', data.typeId);*/
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "hidecol",
                },
                {
                    targets: 1,
                    data: 'productname',
                    
                },
                {
                    targets: 2,
                    data: 'masterheigh',
                },
                {
                    targets: 3,
                    data: 'masterwidth',
                },
                {
                    targets: 4,
                    data: 'calheigh',
                },
                {
                    targets: 5,
                    data: 'calwidth'
                },
                {
                    targets: 6,
                    data: 'deburringheigh'
                },
                {
                    targets: 7,
                    data: 'deburringwidth'
                },
                {
                    targets: 8,
                    data: 'glassdoortype'
                },
            ],
        }
    );
}

function renderCalClearGlassList(data) {

    $('#tb-search-clearglass-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.id);
                /*   $(row).attr('data-typeid', data.typeId);*/
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "hidecol",
                },
                {
                    targets: 1,
                    data: 'productname',

                },
                {
                    targets: 2,
                    data: 'masterheigh',
                },
                {
                    targets: 3,
                    data: 'masterwidth',
                },
                {
                    targets: 4,
                    data: 'calheigh',
                },
                {
                    targets: 5,
                    data: 'calwidth'
                },
                {
                    targets: 6,
                    data: 'glassdoortype'
                },
            ],
        }
    );
}

function renderGetItemBrandList(data) {

    $('#tb-brand-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.id);
                /*   $(row).attr('data-typeid', data.typeId);*/
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "hidecol",
                },
                {
                    targets: 1,
                    data: 'brandcode',
                    className: "item-details",
                },
                {
                    targets: 2,
                    data: 'brandname',
                },
                {
                    targets: 3,
                    data: 'createDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 4,
                    data: 'createByName'
                },
                {
                    targets: 5,
                    data: 'updateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 6,
                    data: 'updateByName'
                },
                {
                    targets: 7,
                    data: 'status',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 8,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-brand" data-id="${row.id}" title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}

function renderGetItemUnitList(data) {

    $('#tb-unit-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.id);
                /*   $(row).attr('data-typeid', data.typeId);*/
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "item-details",
                },
                {
                    targets: 1,
                    data: 'unitname',
                },
                {
                    targets: 2,
                    data: 'createDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 3,
                    data: 'createByName'
                },
                {
                    targets: 4,
                    data: 'updateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 5,
                    data: 'updateByName'
                },
                {
                    targets: 6,
                    data: 'status',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 7,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-unit" data-id="${row.id}" title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}

function renderGetItemReceiverList(data) {

    $('#tb-receiver-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.id);
                /*   $(row).attr('data-typeid', data.typeId);*/
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "hidecol",
                },
                {
                    targets: 1,
                    data: 'empCode',
                    className: "item-details",
                },
                {
                    targets: 2,
                    data: 'empName',

                },
                {
                    targets: 3,
                    data: 'createDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 4,
                    data: 'createByName'
                },
                {
                    targets: 5,
                    data: 'updateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 6,
                    data: 'updateByName'
                },
                {
                    targets: 7,
                    data: 'status',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 8,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-receiver" data-id="${row.id}" title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}

function renderGetItemStockList(data) {

    $('#tb-stock-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.id);
                /*   $(row).attr('data-typeid', data.typeId);*/
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "item-details",
                },
                {
                    targets: 1,
                    data: 'stockname',
                },
                {
                    targets: 2,
                    data: 'createDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 3,
                    data: 'createByName'
                },
                {
                    targets: 4,
                    data: 'updateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 5,
                    data: 'updateByName'
                },
                {
                    targets: 6,
                    data: 'status',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 7,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-stock" data-id="${row.id}" title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function renderGetItemStockProductList(data) {

    $('#tb-viewstock-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.id);
                /*   $(row).attr('data-typeid', data.typeId);*/
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "hidecol",
                },
                {
                    targets: 1,
                    data: 'productcode',
                    className: "item-details",
                },
                {
                    targets: 2,
                    data: 'productname',
                },
                {
                    targets: 3,
                    data: 'groupname',
                },
                {
                    targets: 4,
                    data: 'subgroupname',
                },
                {
                    targets: 5,
                    data: 'brandname',
                },
                {
                    targets: 6,
                    data: 'stockname',
                },
                {
                    targets: 7,
                    data: 'productprice',
                },
                {
                    targets: 8,
                    data: 'stockamount',
                },
                {
                    targets: 9,
                    data: 'unitname',
                },
                {
                    targets: 10,
                    data: 'status',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 11,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-viewstock" data-id="${row.id}" title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}

function renderGetItemList(data) {

    $('#tb-product-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.itemId);
                $(row).attr('data-typeid', data.typeId);
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
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 5,
                    data: 'createByName'
                },
                {
                    targets: 6,
                    data: 'updateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 7,
                    data: 'updateByName'
                },
                {
                    targets: 8,
                    data: 'status',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 9,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-product" data-id="${row.itemId}" data-typeid="${row.typeId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function callGetItemById(id, typeId, modal, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Product/GetItemByItemId?itemId=${id}`,
        success: function (data) {
            renderItemForm(data.item, typeId);
            renderItemOptions(data.itemOptions, modal, isView);
        },
        error: function (err) {

        }
    });
}

function callGetSubGroupcode(id, subgroupname, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/SubGroup/GetLastestSubGroupCode?groupid=${id}&subgroupname=${subgroupname}`,
        success: function (data) {
            if (data != '') {
                $('#form-createSubGroup input[name="input-subgroup-code"]').val(data);
            }

        },
        error: function (err) {

        }
    });
}

function callGetempNameByEmpCode(id, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Receiver/GetempFullName?empid=${id}`,
        success: function (data) {
            if (data != '') {
                $('#form-createReceiver input[name="input-receiver-name"]').val(data);
            }

        },
        error: function (err) {

        }
    });
}

function callGetGroupById(id, modal, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Group/GetItemByItemId?id=${id}`,
        success: function (data) {
            renderGroupForm(data.item);

        },
        error: function (err) {

        }
    });
}

function callGetStockById(id, modal, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Stock/GetItemByItemId?id=${id}`,
        success: function (data) {
            renderStockForm(data.item);

        },
        error: function (err) {

        }
    });
}
function callGetStockProductById(id, modal, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockProduct/GetItemByItemId?id=${id}`,
        success: function (data) {
            renderStockProductForm(data.item);

        },
        error: function (err) {

        }
    });
}
function callGetReceiverById(id, modal, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Receiver/GetItemByItemId?id=${id}`,
        success: function (data) {
            renderReceiverForm(data.item);

        },
        error: function (err) {

        }
    });
}

function callGetBrandById(id, modal, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Brand/GetItemByItemId?id=${id}`,
        success: function (data) {
            renderBrandForm(data.item);

        },
        error: function (err) {

        }
    });
}

function callGetSubGroupById(id, modal, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/SubGroup/GetItemByItemId?id=${id}`,
        success: function (data) {
            renderSubGroupForm(data.item);

        },
        error: function (err) {

        }
    });
}

function callGetUnitById(id, modal, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Unit/GetItemByItemId?id=${id}`,
        success: function (data) {
            renderUnitForm(data.item);

        },
        error: function (err) {

        }
    });
}

function callGroupID() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Group/GetLastestItemId`,
        success: function (data) {

            $('#form-createGroup input[name="input-group-code"]').val(data.id);
        },
        error: function (err) {

        }
    });
}

function callStockID() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Stock/GetLastestItemId`,
        success: function (data) {
            console.log(data);
            $('#form-createStock input[name="input-stock-code"]').val(data.id);
        },
        error: function (err) {

        }
    });
}

function callStockProductCode() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockProduct/GetLastestItemId`,
        success: function (data) {
            console.log(data);
            $('#form-createStockProduct input[name="input-viewstock-code"]').val(data);
        },
        error: function (err) {

        }
    });
}

function callBrandCode() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Brand/GetLastestBrandCode`,
        success: function (data) {

            $('#form-createBrand input[name="input-brand-code"]').val(data);
        },
        error: function (err) {

        }
    });
}

function callUnitID() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Unit/GetLastestItemId`,
        success: function (data) {
            $('#form-createUnit input[name="input-unit-code"]').val(data);
        },
        error: function (err) {

        }
    });
}
function renderItemForm(data, typeId) {
    let status = (data.status) ? 1 : 0;
    $('#form-createProduct #select-product-type').val(typeId).trigger('change');
    $('#form-createProduct input[name="input-product-code"]').val(data.itemId);
    $('#form-createProduct input[name="input-product-name"]').val(data.itemName);
    $('#form-createProduct input[name="input-product-price"]').val(data.itemPrice);
    $('#form-createProduct #select-product-status').val(status).trigger('change');
}
function renderItemOptions(data, modal, isView = false) {
    $(`#${modal} #divOptions`).empty();
    if (data.length == 0) {
        renderNewOptions(modal, isView);
    }
    else {
        data.forEach((v) => {
            renderNewOptions(modal, isView);
            let seq = $(`#${modal} div[name="divRenderOptions"]`).length;
            $(`#${modal} #divRenderOptions-${seq} #input-options-name-${seq}`).val(v.options);
            $(`#${modal} #divRenderOptions-${seq} #input-options-price-${seq}`).val(v.optionsPrice);
        });
    }

}

function renderGroupForm(data, typeId) {
    let status = (data.status) ? 1 : 0;
    $('#form-createGroup input[name="input-group-code"]').val(data.id);
    $('#form-createGroup input[name="input-group-name"]').val(data.groupname);
    $('#form-createGroup #select-group-status').val(status).trigger('change');
}

function renderStockForm(data, typeId) {
    let status = (data.status) ? 1 : 0;
    $('#form-createStock input[name="input-stock-code"]').val(data.id);
    $('#form-createStock input[name="input-stock-name"]').val(data.stockname);
    $('#form-createStock #select-stock-status').val(status).trigger('change');
}
function renderStockProductForm(data, typeId) {
    let status = (data.status) ? 1 : 0;
    $('#form-createStockProduct input[name="input-viewstock-id"]').val(data.id);
    $('#form-createStockProduct input[name="input-viewstock-code"]').val(data.productcode);
    $('#form-createStockProduct #select-viewstock-status').val(status).trigger('change');
    $('#form-createStockProduct input[name="input-viewstock-name"]').val(data.productname);
    $('#form-createStockProduct #select-viewstock-group').val(data.groupid).trigger('change');
    $('#form-createStockProduct #select-viewstock-subgroup').val(data.subgroupid).trigger('change');
    $('#form-createStockProduct #select-viewstock-brand').val(data.brandid).trigger('change');
    $('#form-createStockProduct #select-viewstock-stock').val(data.stockid).trigger('change');
    $('#form-createStockProduct input[name="input-viewstock-price"]').val(data.productprice);
    $('#form-createStockProduct input[name="input-viewstock-amount"]').val(data.stockamount);
    $('#form-createStockProduct #select-viewstock-unit').val(data.unitmasterid).trigger('change');
}

function renderReceiverForm(data, typeId) {
    let status = (data.status) ? 1 : 0;
    $('#form-createReceiver input[name="input-receiver-id"]').val(data.id);
    $('#form-createReceiver #select-receiver-empcode').val(data.empid).trigger('change');
    $('#form-createReceiver input[name="input-receiver-name"]').val(data.empname);
    $('#form-createReceiver #select-brand-status').val(status).trigger('change');
}

function renderSubGroupForm(data, typeId) {
    let status = (data.status) ? 1 : 0;
    $('#form-createSubGroup input[name="input-subgroup-id"]').val(data.id);
    $('#form-createSubGroup input[name="input-subgroup-code"]').val(data.subgroupcode);
    $('#form-createSubGroup input[name="input-subgroup-name"]').val(data.subgroupname);
    $('#form-createSubGroup #select-group-name').val(data.groupid).trigger('change');
    $('#form-createSubGroup #select-subgroup-status').val(status).trigger('change');
}

function renderBrandForm(data, typeId) {
    let status = (data.status) ? 1 : 0;
    $('#form-createBrand input[name="input-brand-id"]').val(data.id);
    $('#form-createBrand input[name="input-brand-code"]').val(data.brandcode);
    $('#form-createBrand input[name="input-brand-name"]').val(data.brandname);
    $('#form-createBrand #select-brand-status').val(status).trigger('change');
}

function renderUnitForm(data, typeId) {
    let status = (data.status) ? 1 : 0;
    $('#form-createUnit input[name="input-unit-code"]').val(data.id);
    $('#form-createUnit input[name="input-unit-name"]').val(data.unitname);
    $('#form-createUnit #select-unit-status').val(status).trigger('change');
}

function renderNewOptions(modal, isView = false) {
    let newSeq = $(`#${modal} div[name="divRenderOptions"]`).length == 0 ? 1 : $(`#${modal} div[name="divRenderOptions"]`).length + 1;
    let removeBtn = (newSeq > 1) ? `
    <button type="button" class="btn btn-primary btn-circle-xs" data-seq="${newSeq}" onclick="removeRenderOptions(this)"><i class="fa fa-minus" aria-hidden="true"></i></button>` : ``;

    let setDisabled = (!isView) ? "" : "disabled";
    let styleVisibility = (!isView) ? "" : 'style="visibility:hidden;"';

    let renderDiv = `<div class="row mb-2" name="divRenderOptions" id="divRenderOptions-${newSeq}">
                            <div class="col-sm-7"><input class="form-control" type="text" id="input-options-name-${newSeq}" name="input-options-name-${newSeq}" ${setDisabled}/></div>
                            <div class="col-sm-3"><input class="form-control" type="number" id="input-options-price-${newSeq}" name="input-options-price-${newSeq}" ${setDisabled} /></div>
                            <div class="col-sm-2" ${styleVisibility}>
                                <button type="button" class="btn btn-primary btn-circle-xs" title="เพิ่ม" data-seq="${newSeq}" onclick="addRenderOptions()"><i class="fa fa-plus"></i></button>
                                ${removeBtn}
                            </div>
                        </div>`

    $(`#${modal} #divOptions`).append(renderDiv)
}
function addRenderOptions() {
    renderNewOptions("modal-createProduct");
}
function removeRenderOptions(obj) {
    Swal.fire({
        title: 'คุณต้องการลบหรือไม่?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'บันทึก',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            let currSeq = $(obj).data('seq');
            $(`#divRenderOptions-${currSeq}`).remove();
        }
    });
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
        status: ($('#form-createType #select-type-status').val() == "1") ? true : false,
        loginCode: _userCode
    };

    $('.btn-modal-save-type').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-type').removeLoading();
                $(`#modal-createType`).modal('hide');
                callGetTypeList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อหมวดหมู่มีอยู่แล้ว กรุณากรอกชื่อหมวดหมู่อีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createType #input-type-name').focus();
                    });
                }
                $('.btn-modal-save-type').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-type').removeLoading();
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
    let typeName = ($('#form-search-type #input-search-type-name').val() == '') ? null : $('#form-search-type #input-search-type-name').val();
    let status = ($('#form-search-type #select-search-type-status').val() == '') ? null : $('#form-search-type #select-search-type-status').val();

    let loaded = $('#tb-type-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Product/GetTypeList?typeName=${typeName}&status=${status}`,
        success: function (data) {
            renderGetTypeList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
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
            dom: 'Bflrtip',
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
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 4,
                    data: 'createByName'
                },
                {
                    targets: 5,
                    data: 'updateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 6,
                    data: 'updateByName'
                },
                {
                    targets: 7,
                    data: 'status',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 8,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
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
        status: ($('#form-createStyle #select-style-status').val() == "1") ? true : false,
        loginCode: _userCode
    };

    $('.btn-modal-save-style').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-style').removeLoading();
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
                $('.btn-modal-save-style').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-style').removeLoading();
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
    let styleName = ($('#form-search-style #input-search-style-name').val() == '') ? null : $('#form-search-style #input-search-style-name').val();
    let status = ($('#form-search-style #select-search-style-status').val() == '') ? null : $('#form-search-style #select-search-style-status').val();

    let loaded = $('#tb-style-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Product/GetStyleList?styleName=${styleName}&status=${status}`,
        success: function (data) {
            renderGetStyleList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
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
            dom: 'Bflrtip',
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
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 3,
                    data: 'createByName'
                },
                {
                    targets: 4,
                    data: 'updateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 5,
                    data: 'updateByName'
                },
                {
                    targets: 6,
                    data: 'status',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 7,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
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

/* Bank Account */
function callAllBankSelect2() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/BankAccount/GetAllBank`,
        success: function (data) {
            renderAllBankSelect2(data);
        },
        error: function (err) {
        }
    });
}
function renderAllBankSelect2(data) {
    $(`#form-createAccount #select-bank-name`).empty();
    $(`#form-createAccount #select-bank-name`).append(`<option value="">กรุณาเลือก</option>`);

    $(`#form-search-bankAccount #select-search-bank-name`).empty();
    $(`#form-search-bankAccount #select-search-bank-name`).append(`<option value="">ทั้งหมด</option>`);

    data.forEach((v) => {
        $(`#form-createAccount #select-bank-name`).append(`<option value="${v.bank}">${v.bank}</option>`);
        $(`#form-search-bankAccount #select-search-bank-name`).append(`<option value="${v.bank}">${v.bank}</option>`);
    });
    $(`#form-createAccount #select-bank-name`).val('').trigger('change')
    $(`#form-search-bankAccount #select-search-bank-name`).val('').trigger('change')
}
function callSelect2AccountType(id, isSearch = false) {
    $(id).empty();
    if (isSearch) {
        $(id).append(`<option value="">ทั้งหมด</option>`);
    } else { $(id).append(`<option value="">กรุณาเลือก</option>`); }

    $(id).append(`<option value="บัญชีนามบริษัท">บัญชีนามบริษัท</option>`);
    $(id).append(`<option value="บัญชีส่วนบุคคล">บัญชีส่วนบุคคล</option>`);
}
function DoAddOrUpdateAccount() {
    if (!validateInput('modal-createAccount')) return;

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
            callAddOrUpdateAccount(_action);
        }
    });
}
function callAddOrUpdateAccount() {
    let url = (_action == 'add') ? `${app_settings.api_url}/api/BankAccount/AddBankAccount` : `${app_settings.api_url}/api/BankAccount/UpdateBankAccount`;

    var obj = {
        accountId: _id,
        bank: $('#form-createAccount #select-bank-name').val(),
        accountNumber: $('#form-createAccount #input-account-number').val(),
        accountName: $('#form-createAccount #input-account-name').val(),
        accountType: $('#form-createAccount #select-account-type').val(),
        status: ($('#form-createAccount #select-account-status').val() == "1") ? true : false,
        loginCode: _userCode
    };

    $('.btn-modal-save-account').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-account').removeLoading();
                $(`#modal-createAccount`).modal('hide');
                callGetAccountList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "รูปแบบ" + $('#form-createAccount #select-account-type').val() + "ถูกใช้งานอยู่",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {

                    });
                }
                $('.btn-modal-save-account').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-account').removeLoading();
        }
    });

}
function callGetAccountList() {

    let bank = ($('#form-search-bankAccount #select-search-bank-name').val() == '' || $('#form-search-bankAccount #select-search-bank-name').val() == undefined) ? null : $('#form-search-bankAccount #select-search-bank-name').val();
    let accountName = ($('#form-search-bankAccount #input-search-account-name').val() == '') ? null : $('#form-search-bankAccount #input-search-account-name').val();
    let accountNumber = ($('#form-search-bankAccount #input-search-account-number').val() == '') ? null : $('#form-search-bankAccount #input-search-account-number').val();
    let accountType = ($('#form-search-bankAccount #select-search-account-type').val() == '' || $('#form-search-bankAccount #select-search-account-type').val() == undefined) ? null : $('#form-search-bankAccount #select-search-account-type').val();
    let status = ($('#form-search-bankAccount #select-search-account-status').val() == '') ? null : $('#form-search-bankAccount #select-search-account-status').val();

    let loaded = $('#tb-account-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/BankAccount/GetBankAccountList?bank=${bank}&accountName=${accountName}&accountNumber=${accountNumber}&accountType=${accountType}&status=${status}`,
        success: function (data) {
            renderGetAccountList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function renderGetAccountList(data) {

    $('#tb-account-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.accountId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'bank',
                    className: "account-details",
                },
                {
                    targets: 1,
                    data: 'accountName',
                },
                {
                    targets: 2,
                    data: 'accountNumber',
                },
                {
                    targets: 3,
                    data: 'countUsageDisplay',
                    render: function (data, type, row) {
                        return (row.status) ? row.countUsageDisplay : "";
                    },
                },
                {
                    targets: 4,
                    data: 'accountType',
                },
                {
                    targets: 5,
                    data: 'createDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 6,
                    data: 'createByName'
                },
                {
                    targets: 7,
                    data: 'updateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 8,
                    data: 'updateByName'
                },
                {
                    targets: 9,
                    data: 'status',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 10,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_bank_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-account" data-id="${row.accountId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function callGetAccountById(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/BankAccount/GetByBankAccountId?accountId=${id}`,
        success: function (data) {
            renderAccountForm(data);
        },
        error: function (err) {

        }
    });
}
function renderAccountForm(data) {
    let status = (data.status) ? 1 : 0;
    $('#form-createAccount #select-bank-name').val(data.bank).trigger('change');
    $('#form-createAccount input[name="input-account-name"]').val(data.accountName);
    $('#form-createAccount #select-account-status').val(status).trigger('change');
    $('#form-createAccount #select-account-type').val(data.accountType).trigger('change');
    $('#form-createAccount input[name="input-account-number"]').val(data.accountNumber);
}
/* Bank Account */

function callGetProductItemQuickQTList() {

    let itemCode = ($('#form-search-product-QuickQT #input-search-product-code').val() == '') ? null : $('#form-search-product-QuickQT #input-search-product-code').val();
    let itemType = ($('#form-search-product-QuickQT #select-search-product-type').val() == '') ? 0 : $('#form-search-product-QuickQT #select-search-product-type').val();
    let itemText = ($('#form-search-product-QuickQT #input-search-product-items-text').val() == '') ? null : $('#form-search-product-QuickQT #input-search-product-items-text').val();
    let status = ($('#form-search-product-QuickQT #select-search-product-status').val() == '') ? null : $('#form-search-product-QuickQT #select-search-product-status').val();

    let loaded = $('#tb-product-quickQT-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Product/GetItemQuickQTList?itemCode=${itemCode}&typeId=${itemType}&itemText=${itemText}&status=${status}`,
        success: function (data) {
            renderGetProductItemQuickQTList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function renderGetProductItemQuickQTList(data) {

    $('#tb-product-quickQT-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
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
                    data: 'itemCode',
                },
                {
                    targets: 1,
                    data: 'typeName',
                },
                {
                    targets: 2,
                    data: 'itemText',
                },
                {
                    targets: 3,
                    data: 'price',
                    className: "dt-body-right",
                    render: function (data, type, row) {
                        var price = (row.price == "0" || row.price == "") ? 0 : parseFloat(row.price).toFixed(2);
                        return (price == 0) ? "-" : price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    },
                },
                {
                    targets: 4,
                    data: 'createDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 5,
                    data: 'createByName'
                },
                {
                    targets: 6,
                    data: 'updateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 7,
                    data: 'updateByName'
                },
                {
                    targets: 8,
                    data: 'status',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 9,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_productQuickQT_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-productQuickQT" data-id="${row.itemId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function DoAddOrUpdateItemQuickQT(modal) {
    if (!validateInput(modal)) return;

    let formId = '#form-createProductQuickQT';
    let itemCode = $(`${formId} input[name="input-product-code"]`).val();
    let prefix = itemCode.substring(0, 3);
    let suffix = itemCode.substring(3, itemCode.length);
    if (itemCode.length < 6 || itemCode.length > 6) {
        Swal.fire({
            text: "กรุณากรอกรหัสสินค้า 6 หลัก",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} input[name="input-product-code"]`).focus();
        });
        return;
    }
    if ($.isNumeric(prefix) == true) {
        Swal.fire({
            text: "กรุณากรอกรหัสสินค้า 3 ตัวแรกเป็นตัวหนังสือ",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} input[name="input-product-code"]`).focus();
        });
        return;
    }
    if ($.isNumeric(suffix) == false) {
        Swal.fire({
            text: "กรุณากรอกรหัสสินค้า 3 ตัวท้ายเป็นตัวเลข",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} input[name="input-product-code"]`).focus();
        });
        return;
    }

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
            callAddOrUpdateItemQuickQT(_product_item_action);
        }
    });
}
function callAddOrUpdateItemQuickQT() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/Product/AddItemQuickQT` : `${app_settings.api_url}/api/Product/UpdateItemQuickQT`;

    var obj = {
        itemCode: $('#form-createProductQuickQT #input-product-code').val(),
        itemText: $('#form-createProductQuickQT #input-product-text').val(),
        typeId: $('#form-createProductQuickQT #select-product-type').val(),
        itemPrice: $('#form-createProductQuickQT #input-product-price').val(),
        status: ($('#form-createProductQuickQT #select-product-status').val() == "1") ? true : false,
        loginCode: _userCode
    };

    $('.btn-modal-save-product-quickQT').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-product-quickQT').removeLoading();
                $(`#modal-createProduct-QuickQT`).modal('hide');
                callGetProductItemQuickQTList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "รหัสสินค้ามีอยู่แล้ว กรุณากรอกรหัสสินค้าอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createProductQuickQT #input-product-code').focus();
                    });
                }
                $('.btn-modal-save-product-quickQT').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-product-quickQT').removeLoading();
        }
    });

}
function callGetItemQuickQTById(id, modalId, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Product/GetItemQuickQTByItemId?itemId=${id}`,
        success: function (data) {
            renderItemQuickQTForm(data.item, modalId);
        },
        error: function (err) {

        }
    });
}
function renderItemQuickQTForm(data, modalId) {
    let status = (data.status) ? 1 : 0;
    $(`${modalId} #form-createProductQuickQT #select-product-type`).val(data.typeId).trigger('change');
    $(`${modalId} #form-createProductQuickQT input[name="input-product-code"]`).val(data.itemCode);
    $(`${modalId} #form-createProductQuickQT input[name="input-product-text"]`).val(data.itemText);
    $(`${modalId} #form-createProductQuickQT input[name="input-product-price"]`).val(data.itemPrice);
    $(`${modalId} #form-createProductQuickQT #select-product-status`).val(status).trigger('change');
}
//$(document).on('change', '#select-group-name', function () {
//    console.log('1');
//    if (this.value != '') {
//        callGetSubGroupcode(this.value);
//    }
//    else {
//        $('#form-createSubGroup input[name="input-subgroup-code"]').val('');
//    }

//});
function onGroupListChange() {
    var val = document.getElementById("select-group-name").value;
    if (val != '') {
        var name = document.getElementById("input-subgroup-name").value;
        callGetSubGroupcode(val, name);
    }
    else {
        $('#form-createSubGroup input[name="input-subgroup-code"]').val('');
    }
}

function onempCodeChangeListChange() {
    var val = document.getElementById("select-receiver-empcode").value;
    if (val != '') {

        callGetempNameByEmpCode(val);
    }
    else {
        $('#form-createReceiver input[name="input-receiver-name"]').val('');
    }
}

function delRowCal(id) {
    Swal.fire({
        text: "ยืนยันการลบรายการ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: _modal_primary_color_code,
        //cancelButtonColor: _modal_default_color_code,
        confirmButtonText: 'ยืนยัน'
    }).then((result) => {
        $(id).remove();
    });

}

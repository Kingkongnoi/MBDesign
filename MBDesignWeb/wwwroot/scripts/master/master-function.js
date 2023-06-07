let loader = $('<div/>').addClass('loader');

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

let _emp_action = 'add';
let _role_action = 'add';

let _modal_primary_color_code = "#F09723";
let _modal_default_color_code = "#EFEFEF";

let _userId = localStorage.getItem('loginId');
let _userCode = localStorage.getItem('loginCode');
let _userName = localStorage.getItem('loginName');

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
    }
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
                    text: "กรุณารอระบบ generate รหัสพนักงาน",
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
    }

};

/* Employee */
function DoAddOrUpdateEmployee(modal) {
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
            callAddOrUpdateEmployee(_emp_action);
        }
    });
}
function callAddOrUpdateEmployee() {
    let url = (_emp_action == 'add') ? `${app_settings.api_url}/api/Employee/AddEmployee` : `${app_settings.api_url}/api/Employee/UpdateEmployee`;

    let empFormId = '#form-createEmployee';
    let empId = $(`${empFormId} input[name="input-emp-code"]`).val();
    let empIdCard = $(`${empFormId} input[name="input-emp-idCard"]`).val();
    let roleId = $(`${empFormId} #select-emp-role`).val();
    let empFirstName = $(`${empFormId} input[name="input-emp-firstName"]`).val();
    let empLastName = $(`${empFormId} input[name="input-emp-lastName"]`).val();
    let departmentId = $(`${empFormId} #select-emp-department`).val();
    let positionId = $(`${empFormId} #select-emp-position`).val();
    let salaryType = $(`${empFormId} #select-salary-type`).val();
    let salary = $(`${empFormId} input[name="input-emp-salary"]`).val();
    let status = ($(`${empFormId} #select-emp-status`).val() == "1") ? true : false;
    let hiringDate = $(`${empFormId} input[name="input-start-date"]`).val();
    //let signatureFileName = $(`${empFormId} input[name="select-emp-signature"]`).val();
    let timeStampType = $(`${empFormId} #radioEmpInputCard`).prop('checked') == true ? true : false;

    var obj = {
        empId: empId,
        roleId: roleId,
        empFirstName: empFirstName,
        empLastName: empLastName,
        departmentId: departmentId,
        positionId: positionId,
        salaryType: salaryType,
        salary: salary,
        status: status,
        hiringDate: hiringDate,
        timeStampType: timeStampType,
        idCard: empIdCard,
        signatureFileName: "",
        loginCode: _userCode
    };

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callAddOrUpdateSignatureFile(empId);
                callSuccessAlert();
                $(`#modal-createEmployee`).modal('hide');
                callGetEmployeeList();
            }
        },
        error: () => {
        }
    });

}
function callAddOrUpdateSignatureFile(empId) {
    var control = document.getElementById(`select-emp-signature`);
    var files = control.files;
    var formData = new FormData();
    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }

    let url = `${app_settings.api_url}/api/Employee/DoUpdateSignatureFile?empCode=${empId}`;

    $.ajax({
        url: url,
        type: "POST",
        contentType: false, // Do not set any content header
        processData: false, // Do not process data
        data: formData,
        async: false,
        success: function (result) {
        },
        error: function (err) {
        }
    });
}
function callGetEmployeeList() {
    let formId = '#form-search-employee';

    let empId = ($(`${formId} #input-search-emp-code`).val() == '') ? null : $(`${formId} #input-search-emp-code`).val();
    let empName = ($(`${formId} #input-search-emp-name`).val() == '') ? null : $(`${formId} #input-search-emp-name`).val();
    let departmentId = ($(`${formId} #select-search-emp-department`).val() == '' || $(`${formId} #select-search-emp-department`).val() == undefined || $(`${formId} #select-search-emp-department`).val() == null) ? null : $(`${formId} #select-search-emp-department`).val();
    let positionId = ($(`${formId} #select-search-emp-position`).val() == '' || $(`${formId} #select-search-emp-position`).val() == undefined || $(`${formId} #select-search-emp-position`).val() == null) ? null : $(`${formId} #select-search-emp-position`).val();
    let status = ($(`${formId} #select-search-emp-status`).val() == '') ? null : $(`${formId} #select-search-emp-status`).val();

    //let loaded = $('#tb-employee-list');

    //loaded.prepend(loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Employee/GetEmpList?empId=${empId}&empName=${empName}&departmentId=${departmentId}&positionId=${positionId}&status=${status}`,
        success: function (data) {
            renderGetEmployeeList(data);
            //loaded.find(loader).remove();
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}
function renderGetEmployeeList(data) {
    $('#tb-employee-list').DataTable(
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
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'empCode',
                    className: "emp-details",
                },
                {
                    targets: 1,
                    data: 'fullName',
                },
                {
                    targets: 2,
                    data: 'departmentName',
                },
                {
                    targets: 3,
                    data: 'positionName',
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
                    className: "dt-center",
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-employee" data-id="${row.id}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function callGetEmployeeById(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Employee/GetEmpByEmpId?id=${id}`,
        success: function (data) {
            renderEmployeeForm(data);
            renderEmployeeSignature(data.signatureFileName);
        },
        error: function (err) {

        }
    });
}
function renderEmployeeForm(data) {
    let status = (data.status) ? 1 : 0;
    let empFormId = '#form-createEmployee';
    $(`${empFormId} input[name="input-emp-code"]`).val(data.empCode);
    $(`${empFormId} input[name="input-emp-idCard"]`).val(data.idCard);
    $(`${empFormId} #select-emp-role`).val(data.roleId).trigger('change');
    $(`${empFormId} input[name="input-emp-firstName"]`).val(data.empFirstName);
    $(`${empFormId} input[name="input-emp-lastName"]`).val(data.empLastName);
    $(`${empFormId} #select-emp-department`).val(data.departmentId).trigger('change');
    $(`${empFormId} #select-emp-position`).val(data.positionId).trigger('change');
    $(`${empFormId} #select-salary-type`).val(data.salaryType).trigger('change');
    $(`${empFormId} input[name="input-emp-salary"]`).val(data.salary);
    $(`${empFormId} #select-emp-status`).val(status).trigger('change');
    $(`${empFormId} input[name="input-start-date"]`).val(convertDateTimeFormat(data.hiringDate, 'YYYY-MM-DD'));
    //$(`${empFormId} input[name="select-emp-signature"]`).val('');
    if (data.timeStampType == true) {
        $(`${empFormId} #radioEmpInputCard`).prop('checked', true);
    } else { $(`${empFormId} #radioEmpNoInputCard`).prop('checked', true); }
}
function renderEmployeeSignature(signatureFileName) {
    let formId = '#form-createEmployee #select-emp-signature';

    var lstUrl = [];
    var lstPreviewImg = [];
    if (signatureFileName != "") {
        //data.forEach((a) => {
        lstUrl.push(`${signatureFileName}`);

        var addPreview = {
            //caption: data.fileName,
            //width: '120px',
            //url: '/localhost/public/delete',
            //key: data.uploadId,
            //extra: { id: data.uploadId },
        };

        lstPreviewImg.push(addPreview);
        //});
    }

    $(`${formId}`).fileinput('destroy');
    if (signatureFileName != "") {
        $(`${formId}`).fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: true,
            showUpload: false,
            showCaption: true,
            initialPreview: lstUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewImg
            ],
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }
    else {
        $(`${formId}`).fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: true,
            browseOnZoneClick: true,
            showCaption: true,
            showUpload: false,
        });
    }

    let viewformId = '#form-createEmployee #display-emp-signature';
    var lstViewUrl = [];
    var lstViewPreviewImg = [];
    if (signatureFileName != "") {
        //data.forEach((a) => {
        lstViewUrl.push(`${signatureFileName}`);

        var addPreview = {
            //caption: data.fileName,
            //width: '120px',
            //url: '/localhost/public/delete',
            //key: data.uploadId,
            //extra: { id: data.uploadId },
        };

        lstViewPreviewImg.push(addPreview);
        //});
    }

    $(`${viewformId}`).fileinput('destroy');
    if (signatureFileName != "") {
        $(`${viewformId}`).fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: false,
            showUpload: false,
            showCaption: false,
            initialPreview: lstUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewImg
            ],
            browseOnZoneClick: false,
            browseLabel: 'เลือกไฟล์'
        });
    }
    else {
        $(`${viewformId}`).fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: false,
            browseOnZoneClick: false,
            showCaption: false,
            showUpload: false,
        });
    }
}
function callSelect2EmpDepartment() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Employee/GetDepartmentSelect2`,
        success: function (data) {
            renderSelect2Department(data, true);
            renderSelect2Department(data);
        },
        error: function (err) {
        }
    });
    
}
function renderSelect2Department(data, isSearch = false) {
    let formName = (!isSearch) ? '#form-createEmployee' : '#form-search-employee';
    let select2Name = (!isSearch) ? '#select-emp-department' : '#select-search-emp-department';
    let select2FirstVal = (!isSearch) ? 'กรุณาเลือก' : 'ทั้งหมด';

    $(`${formName} ${select2Name}`).empty();
    $(`${formName} ${select2Name}`).append(`<option value="">${select2FirstVal}</option>`);

    data.forEach((v) => {
        $(`${formName} ${select2Name}`).append(`<option value="${v.departmentId}">${v.departmentName}</option>`);
    });
}
function callSelect2EmpSalaryType() {
    let formName = '#form-createEmployee';
    $(`${formName} #select-salary-type`).empty();
    $(`${formName} #select-salary-type`).append(`<option value="">กรุณาเลือก</option>`);
    $(`${formName} #select-salary-type`).append(`<option value="รายวัน">รายวัน</option>`);
    $(`${formName} #select-salary-type`).append(`<option value="รายสัปดาห์">รายสัปดาห์</option>`);
    $(`${formName} #select-salary-type`).append(`<option value="รายเดือน">รายเดือน</option>`);
}
function callSelect2EmpPosition() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Employee/GetPositionSelect2`,
        success: function (data) {
            renderSelect2Position(data, true);
            renderSelect2Position(data);
        },
        error: function (err) {
        }
    });
}
function renderSelect2Position(data, isSearch = false) {
    let formName = (!isSearch) ? '#form-createEmployee' : '#form-search-employee';
    let select2Name = (!isSearch) ? '#select-emp-position' : '#select-search-emp-position';
    let select2FirstVal = (!isSearch) ? 'กรุณาเลือก' : 'ทั้งหมด';

    $(`${formName} ${select2Name}`).empty();
    $(`${formName} ${select2Name}`).append(`<option value="">${select2FirstVal}</option>`);

    data.forEach((v) => {
        $(`${formName} ${select2Name}`).append(`<option value="${v.positionId}">${v.positionName}</option>`);
    });
}
function callGetLastestRoleId() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Employee/GenerateEmpId`,
        success: function (data) {
            $(`#form-createEmployee input[name="input-emp-code"]`).val(data);
        },
        error: function (err) {
        }
    });
}
function callSelect2EmpRole() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Employee/GetRoleSelect2`,
        success: function (data) {
            renderSelect2Role(data);
        },
        error: function (err) {
        }
    });
}
function renderSelect2Role(data) {
    let formName = '#form-createEmployee';
    let select2Name = '#select-emp-role';
    let select2FirstVal = 'กรุณาเลือก';

    $(`${formName} ${select2Name}`).empty();
    $(`${formName} ${select2Name}`).append(`<option value="">${select2FirstVal}</option>`);

    data.forEach((v) => {
        $(`${formName} ${select2Name}`).append(`<option value="${v.roleId}">${v.name}</option>`);
    });
}
function generateEmpId() {
    let url = `${app_settings.api_url}/api/Employee/GenerateEmpId`;

    $.ajax({
        url: url,
        type: 'GET',
        success: (res) => {
            $('#form-createEmployee input[name="input-emp-code"]').val(res);
        },
        error: () => {
        }
    });
}
/* Employee */

/* Role */
function DoAddOrUpdateRole(modal) {
    if (!validateInput(modal)) return;

    Swal.fire({
        title: 'คุณต้องการบันทึกข้อมูลหรือไม่?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'บันทึก',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            callAddOrUpdateRole(_role_action);
        }
    });
}
function callAddOrUpdateRole() {
    let url = (_role_action == 'add') ? `${app_settings.api_url}/api/Employee/AddRole` : `${app_settings.api_url}/api/Employee/UpdateRole`;

    let formId = '#form-createRole';
    let roleId = $(`${formId} input[name="input-role-id"]`).val();
    let name = $(`${formId} input[name="input-role-name"]`).val();
    let status = ($(`${formId} #select-role-status`).val() == "1") ? true : false;

    var roleMenu = [];
    $(`#tb-menu-list tbody input[type="checkbox"]`).each(function () {
        let chkId = $(this).attr('id');
        let menuId = chkId.split('-')[1];
        let chkValue = $(this).val();

        let strRoleAction = "";
        let chkResult = false;

        let chkRoleMenuId = $(this).attr('rolemenuid');

        switch (chkValue) {
            case "all":
                strRoleAction = 'all';
                chkResult = $(`#chkAll-${menuId}`).prop('checked');
                break;
            case "add":
                strRoleAction = 'add';
                chkResult = $(`#chkAdd-${menuId}`).prop('checked');
                break;
            case "edit":
                strRoleAction = 'edit';
                chkResult = $(`#chkEdit-${menuId}`).prop('checked');
                break;
            case "approve":
                strRoleAction = 'approve';
                chkResult = $(`#chkApprove-${menuId}`).prop('checked');
                break;
            case "view":
                strRoleAction = 'view';
                chkResult = $(`#chkView-${menuId}`).prop('checked');
                break;
        }

        roleMenu.push({
            roleId: roleId,
            menuId: menuId,
            roleMenuId: chkRoleMenuId,
            action: strRoleAction,
            chkResult: chkResult,
        });
    });

    var obj = {
        roleId: roleId,
        name: name,
        status: status,
        roleMenu: roleMenu,
        loginCode: _userCode
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
                $(`#modal-createRole`).modal('hide');
                callGetRoleList();
            }
        },
        error: () => {
        }
    });

}
function callGetLastestRoleId() {
    let url = `${app_settings.api_url}/api/Employee/GetLastestRoleId`;

    $.ajax({
        url: url,
        type: 'GET',
        success: (res) => {
            $('#form-createRole input[name="input-role-id"]').val(res.roleId);
        },
        error: () => {
        }
    });
}
function callGetRoleList() {
    let formId = '#form-search-role';

    let roleName = ($(`${formId} #input-search-role`).val() == '') ? null : $(`${formId} #input-search-role`).val();
    let status = ($(`${formId} #select-search-role-status`).val() == '') ? null : $(`${formId} #select-search-role-status`).val();

    //let loaded = $('#tb-employee-list');

    //loaded.prepend(loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Employee/GetRoleList?roleName=${roleName}&status=${status}`,
        success: function (data) {
            renderGetRoleList(data);
            //loaded.find(loader).remove();
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}
function renderGetRoleList(data) {
    $('#tb-role-list').DataTable(
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
                $(row).attr('data-id', data.roleId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'roleId',
                    className: "role-details",
                },
                {
                    targets: 1,
                    data: 'name',
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
                    className: "dt-center",
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-role" data-id="${row.roleId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function callGetRoleById(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Employee/GetRoleByRoleId?id=${id}`,
        success: function (data) {
            renderRoleForm(data);
            callGetMenuList(id);
        },
        error: function (err) {

        }
    });
}
function renderRoleForm(data) {
    let status = (data.status) ? 1 : 0;
    let formId = '#form-createRole';
    $(`${formId} input[name="input-role-id"]`).val(data.roleId);
    $(`${formId} input[name="input-role-name"]`).val(data.name);
    $(`${formId} #select-role-status`).val(status).trigger('change');
}
function callGetMenuList(id) {
    //let loaded = $('#tb-employee-list');

    //loaded.prepend(loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Employee/GetMenuList?id=${id}`,
        success: function (data) {
            renderGetMenuList(data);
            //loaded.find(loader).remove();
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}
function renderGetMenuList(data) {
    let table = "#tb-menu-list";
    if (_role_action == "view") {
        table = "#tb-view-menu-list";
    }
    $(`${table}`).dataTable().fnDestroy();
    $(`${table}`).DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            pageLength: 20,
            dom: 'Bflrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            order: [],
            columnDefs: [
                {
                    targets: 0,
                    data: 'name',
                    orderable: false,
                    render: function (data, type, row) {
                        let display = (row.parentMenuId == 0) ? row.name : `<li>${row.name}</li>`;
                        return `${display}`;
                    },
                },
                {
                    targets: 1,
                    data: null,
                    orderable: false,
                    className: "text-center",
                    render: function (data, type, row) {
                        let checked = (row.canAdd == true && row.canEdit == true && row.canApprove == true && row.canView == true)
                            ? 'checked' : '';
                        let disabled = (_role_action == "view") ? 'disabled' : '';
                        return (row.headerLevel == false) ? `<input type="checkbox" name="chkRole" id="chkAll-${row.menuId}" value="all" menuname="${row.name}" parentmenu="${row.parentMenuId}" rolemenuid="${row.roleMenuId}" ${disabled} ${checked}>` : ``;
                    },
                },
                {
                    targets: 2,
                    data: 'canAdd',
                    orderable: false,
                    className: "text-center",
                    render: function (data, type, row) {
                        let disabled = '';
                        if (_role_action == "view") { disabled = 'disabled'; }
                        else { disabled = (row.enableAdd == false) ? 'disabled' : ''; }

                        let chkResult = (row.canAdd) ? 'checked' : '';
                        let checked = (row.canAdd == true && row.canEdit == true && row.canApprove == true && row.canView == true)
                            ? '' : chkResult;
                        return (row.headerLevel == false) ? `<input type="checkbox" name="chkRole" id="chkAdd-${row.menuId}" value="add" menuname="${row.name}" parentmenu="${row.parentMenuId}" rolemenuid="${row.roleMenuId}" ${disabled} ${checked}>` : ``;
                    },
                },
                {
                    targets: 3,
                    data: 'canEdit',
                    className: "text-center",
                    orderable: false,
                    render: function (data, type, row) {
                        let disabled = '';
                        if (_role_action == "view") { disabled = 'disabled'; }
                        else { disabled = (row.enableEdit == false) ? 'disabled' : ''; }

                        let chkResult = (row.canEdit) ? 'checked' : '';
                        let checked = (row.canAdd == true && row.canEdit == true && row.canApprove == true && row.canView == true)
                            ? '' : chkResult;
                        return (row.headerLevel == false) ? `<input type="checkbox" name="chkRole" id="chkEdit-${row.menuId}" value="edit" menuname="${row.name}" parentmenu="${row.parentMenuId}" rolemenuid="${row.roleMenuId}" ${disabled} ${checked}>` : ``;
                    },
                },
                {
                    targets: 4,
                    data: 'canApprove',
                    className: "text-center",
                    orderable: false,
                    render: function (data, type, row) {
                        let disabled = '';
                        if (_role_action == "view") { disabled = 'disabled'; }
                        else { disabled = (row.enableApprove == false) ? 'disabled' : ''; }

                        let chkResult = (row.canApprove) ? 'checked' : '';
                        let checked = (row.canAdd == true && row.canEdit == true && row.canApprove == true && row.canView == true)
                            ? '' : chkResult;
                        return (row.headerLevel == false) ? `<input type="checkbox" name="chkRole" id="chkApprove-${row.menuId}" value="approve" menuname="${row.name}" parentmenu="${row.parentMenuId}" rolemenuid="${row.roleMenuId}" ${disabled} ${checked}>` : ``;
                    },
                },
                {
                    targets: 5,
                    data: 'canView',
                    className: "text-center",
                    orderable: false,
                    render: function (data, type, row) {
                        let disabled = '';
                        if (_role_action == "view") { disabled = 'disabled'; }
                        else { disabled = (row.enableView == false) ? 'disabled' : ''; }

                        let chkResult = (row.canView) ? 'checked' : '';
                        let checked = (row.canAdd == true && row.canEdit == true && row.canApprove == true && row.canView == true)
                            ? '' : chkResult;
                        return (row.headerLevel == false) ? `<input type="checkbox" name="chkRole" id="chkView-${row.menuId}" value="view" menuname="${row.name}" parentmenu="${row.parentMenuId}" rolemenuid="${row.roleMenuId}" ${disabled} ${checked}>` : ``;
                    },
                },
            ],
        }
    );
}
/* Role */

/* Holiday */
function DoAddOrUpdateHoliday(modal) {
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
            callAddOrUpdateHoliday(_department_action);
        }
    });
}
function callAddOrUpdateHoliday() {
    let url = (_holiday_action == 'add') ? `${app_settings.api_url}/api/Employee/AddHoliday` : `${app_settings.api_url}/api/Employee/UpdateHoliday`;

    var obj = {
        holidayId: $('#form-createHoliday #input-holiday-code').val(),
        day: $('#form-createHoliday #select-holiday-day').val(),
        holidayDate: $('#form-createHoliday #input-holiday-date').val(),
        holiday: $('#form-createHoliday #input-holiday-name').val(),
        status: ($('#form-createHoliday #select-holiday-status').val() == "1") ? true : false,
        loginCode: _userCode
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
                $(`#${_modal_holiday_name}`).modal('hide');
                callSelect2SearchHolidayYear();
                callGetHolidayList();
            }
        },
        error: () => {
        }
    });

}
function callGetLastestHolidayId() {
    let url = `${app_settings.api_url}/api/Employee/GetLastestHolidayId`;

    $.ajax({
        url: url,
        type: 'GET',
        success: (res) => {
            $('#form-createHoliday input[name="input-holiday-code"]').val(res.holidayId);
        },
        error: () => {
        }
    });
}
function callGetHolidayList() {
    let year = ($('#form-search-holiday #select-search-holiday-year').val() == '' || $('#form-search-holiday #select-search-holiday-year').val() == null) ? null : $('#form-search-holiday #select-search-holiday-year').val();
    let day = ($('#form-search-holiday #select-search-holiday-day').val() == '') ? null : $('#form-search-holiday #select-search-holiday-day').val();
    let holidayDate = ($('#select-search-holiday-date').val() == '' || $('#select-search-holiday-date').val() == undefined) ? null : $('#select-search-holiday-date').val();
    let holiday = ($('#form-search-holiday #input-search-holiday-name').val() == '') ? null : $('#form-search-holiday #input-search-holiday-name').val();
    let status = ($('#form-search-holiday #select-search-holiday-status').val() == '') ? null : $('#form-search-holiday #select-search-holiday-status').val();

    let loaded = $('#tb-holiday-list');

    loaded.prepend(loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Employee/GetHolidayList?year=${year}&day=${day}&holidayDate=${holidayDate}&holiday=${holiday}&status=${status}`,
        success: function (data) {
            renderGetHolidayList(data);
            loaded.find(loader).remove();
        },
        error: function (err) {
            loaded.find(loader).remove();
        }
    });
}
function renderGetHolidayList(data) {
    $('#tb-holiday-list').DataTable(
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
                $(row).attr('data-id', data.holidayId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'holidayId',
                    className: "holiday-details",
                },
                {
                    targets: 1,
                    data: 'day',
                },
                {
                    targets: 2,
                    data: 'holidayDate',
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.holidayDate ? convertDateTimeFormat(row.holidayDate, 'DD/MM/YYYY') : "";
                    },
                },
                {
                    targets: 3,
                    data: 'holiday',
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
                    className: "dt-center",
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-holiday" data-id="${row.holidayId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function callGetHolidayById(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Employee/GetHolidayByHolidayId?holidayId=${id}`,
        success: function (data) {
            renderHolidayForm(data);
        },
        error: function (err) {

        }
    });
}
function renderHolidayForm(data) {
    let status = (data.status) ? 1 : 0;
    $('#form-createHoliday input[name="input-holiday-code"]').val(data.holidayId);
    $('#form-createHoliday #select-holiday-day').val(data.day).trigger('change');
    $('#form-createHoliday input[name="input-holiday-date"]').val(convertDateTimeFormat(data.holidayDate, 'YYYY-MM-DD'));
    $('#form-createHoliday input[name="input-holiday-name"]').val(data.holiday);
    $('#form-createHoliday #select-holiday-status').val(status).trigger('change');
}
function callSelect2HolidayDay(isSearch = true) {
    let formName = (!isSearch) ? '#form-createHoliday' : '#form-search-holiday';
    let select2Name = (!isSearch) ? '#select-holiday-day' : '#select-search-holiday-day';
    let select2FirstVal = (!isSearch) ? 'กรุณาเลือก' : 'ทั้งหมด';

    $(`${formName} ${select2Name}`).empty();
    $(`${formName} ${select2Name}`).append(`<option value="">${select2FirstVal}</option>`);
    $(`${formName} ${select2Name}`).append(`<option value="จันทร์">จันทร์</option>`);
    $(`${formName} ${select2Name}`).append(`<option value="อังคาร">อังคาร</option>`);
    $(`${formName} ${select2Name}`).append(`<option value="พุธ">พุธ</option>`);
    $(`${formName} ${select2Name}`).append(`<option value="พฤหัสบดี">พฤหัสบดี</option>`);
    $(`${formName} ${select2Name}`).append(`<option value="ศุกร์">ศุกร์</option>`);
    $(`${formName} ${select2Name}`).append(`<option value="เสาร์">เสาร์</option>`);
    $(`${formName} ${select2Name}`).append(`<option value="อาทิตย์">อาทิตย์</option>`);
}
function callSelect2SearchHolidayYear() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Employee/GetHolidayYear`,
        success: function (data) {
            renderSelect2SearchHolidayYear(data);
        },
        error: function (err) {
        }
    });
}
function renderSelect2SearchHolidayYear(data) {
    $('#form-search-holiday #select-search-holiday-year').empty();
    $('#form-search-holiday #select-search-holiday-year').append(`<option value="">ทั้งหมด</option>`);
    data.forEach((v) => {
        $('#form-search-holiday #select-search-holiday-year').append(`<option value="${v.holidayYear}">${v.holidayYear}</option>`);
    });
    $('#form-search-holiday #select-search-holiday-year').val('').trigger('change')
}
/* Holiday */

/* Department */
function DoAddOrUpdateDepartment(modal) {
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
            callAddOrUpdateDepartment(_department_action);
        }
    });
}
function callAddOrUpdateDepartment() {
    let url = (_department_action == 'add') ? `${app_settings.api_url}/api/Employee/AddDepartment` : `${app_settings.api_url}/api/Employee/UpdateDepartment`;

    var obj = {
        departmentId: $('#input-department-code').val(),
        departmentName: $('#input-department-name').val(),
        status: ($('#form-createDepartment #select-department-status').val() == "1") ? true : false,
        loginCode: _userCode
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
                $(`#${_modal_department_name}`).modal('hide');
                callGetDepartmentList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อแผนกมีอยู่แล้ว กรุณากรอกชื่อแผนกอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createDepartment #input-department-name').focus();
                    });
                }
            }
        },
        error: () => {
        }
    });

}
function callGetLastestDepartmentId() {
    let url = `${app_settings.api_url}/api/Employee/GetLastestDepartmentId`;

    $.ajax({
        url: url,
        type: 'GET',
        success: (res) => {
            $('#form-createDepartment input[name="input-department-code"]').val(res.departmentId);
        },
        error: () => {
        }
    });
}
function callGetDepartmentList() {
    let departmentName = ($('#form-search-department #input-search-department').val() == '') ? null : $('#form-search-department #input-search-department').val();
    let status = ($('#form-search-department #select-search-department-status').val() == '') ? null : $('#form-search-department #select-search-department-status').val();

    let loaded = $('#tb-department-list');

    loaded.prepend(loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Employee/GetDepartmentList?departmentName=${departmentName}&status=${status}`,
        success: function (data) {
            renderGetDepartmentList(data);
            loaded.find(loader).remove();
        },
        error: function (err) {
            loaded.find(loader).remove();
        }
    });
}
function renderGetDepartmentList(data) {

    $('#tb-department-list').DataTable(
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
                $(row).attr('data-id', data.departmentId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'departmentId',
                    className: "department-details",
                },
                {
                    targets: 1,
                    data: 'departmentName',
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
                    className: "dt-center",
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-department" data-id="${row.departmentId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function callGetDepartmentById(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Employee/GetDepartmentByDepartmentId?departmentId=${id}`,
        success: function (data) {
            renderDepartmentForm(data);
        },
        error: function (err) {

        }
    });
}
function renderDepartmentForm(data) {
    let status = (data.status) ? 1 : 0;
    $('#form-createDepartment input[name="input-department-code"]').val(data.departmentId);
    $('#form-createDepartment input[name="input-department-name"]').val(data.departmentName);
    $('#form-createDepartment #select-department-status').val(status).trigger('change');
}
/* Department */

/* Position */
function DoAddOrUpdatePosition(modal) {
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
            callAddOrUpdatePosition(_department_action);
        }
    });
}
function callAddOrUpdatePosition() {
    let url = (_position_action == 'add') ? `${app_settings.api_url}/api/Employee/AddPosition` : `${app_settings.api_url}/api/Employee/UpdatePosition`;

    var obj = {
        positionId: $('#input-position-code').val(),
        positionName: $('#input-position-name').val(),
        status: ($('#form-createPosition #select-position-status').val() == "1") ? true : false,
        loginCode: _userCode
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
                $(`#${_modal_position_name}`).modal('hide');
                callGetPositionList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อตำแหน่งมีอยู่แล้ว กรุณากรอกชื่อตำแหน่งอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createPosition #input-position-name').focus();
                    });
                }
            }
        },
        error: () => {
        }
    });

}
function callGetLastestPositionId() {
    let url = `${app_settings.api_url}/api/Employee/GetLastestPositionId`;

    $.ajax({
        url: url,
        type: 'GET',
        success: (res) => {
            $('#form-createPosition input[name="input-position-code"]').val(res.positionId);
        },
        error: () => {
        }
    });
}
function callGetPositionList() {
    let positionName = ($('#form-search-position #input-search-position').val() == '') ? null : $('#form-search-position #input-search-position').val();
    let status = ($('#form-search-position #select-search-position-status').val() == '') ? null : $('#form-search-position #select-search-position-status').val();

    let loaded = $('#tb-position-list');

    loaded.prepend(loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Employee/GetPositionList?positionName=${positionName}&status=${status}`,
        success: function (data) {
            renderGetPositionList(data);
            loaded.find(loader).remove();
        },
        error: function (err) {
            loaded.find(loader).remove();
        }
    });
}
function renderGetPositionList(data) {
    $('#tb-position-list').DataTable(
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
                $(row).attr('data-id', data.positionId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'positionId',
                    className: "position-details",
                },
                {
                    targets: 1,
                    data: 'positionName',
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
                    className: "dt-center",
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-position" data-id="${row.positionId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function callGetPositionById(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Employee/GetPositionByPositionId?positionId=${id}`,
        success: function (data) {
            renderPositionForm(data);
        },
        error: function (err) {

        }
    });
}
function renderPositionForm(data) {
    let status = (data.status) ? 1 : 0;
    $('#form-createPosition input[name="input-position-code"]').val(data.positionId);
    $('#form-createPosition input[name="input-position-name"]').val(data.positionName);
    $('#form-createPosition #select-position-status').val(status).trigger('change');
}
/* Position */


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
    let itemName = ($('#form-search-product #input-search-product-items').val() == '' || $('#form-search-product #input-search-product-items').val() == undefined) ? null : $('#form-search-product #input-search-product-items').val();
    let typeId = ($('#form-search-product #select-search-product-type').val() == '' || $('#form-search-product #select-search-product-type').val() == null) ? "0" : $('#form-search-product #select-search-product-type').val();
    let status = ($('#form-search-product #select-search-product-status').val() == '' || $('#form-search-product #select-search-product-status').val() == undefined) ? null : $('#form-search-product #select-search-product-status').val();

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
                    className: "dt-center",
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
    let typeName = ($('#form-search-type #input-search-type-name').val() == '') ? null : $('#form-search-type #input-search-type-name').val();
    let status = ($('#form-search-type #select-search-type-status').val() == '') ? null : $('#form-search-type #select-search-type-status').val();

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
                    className: "dt-center",
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
    let styleName = ($('#form-search-style #input-search-style-name').val() == '') ? null : $('#form-search-style #input-search-style-name').val();
    let status = ($('#form-search-style #select-search-style-status').val() == '') ? null : $('#form-search-style #select-search-style-status').val();

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
                    className: "dt-center",
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

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
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
            }
        },
        error: () => {
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

    loaded.prepend(loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/BankAccount/GetBankAccountList?bank=${bank}&accountName=${accountName}&accountNumber=${accountNumber}&accountType=${accountType}&status=${status}`,
        success: function (data) {
            renderGetAccountList(data);
            loaded.find(loader).remove();
        },
        error: function (err) {
            loaded.find(loader).remove();
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
                    data: 'countUsage',
                    render: function (data, type, row) {
                        return (row.status) ? row.countUsage : "";
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
                    className: "dt-center",
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

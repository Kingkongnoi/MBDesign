$(document).ready(function () {

    callSelect2Status('#form-createHoliday #select-holiday-status');
    callSelect2Status('#form-search-holiday #select-search-holiday-status', true);

    callSelect2Status('#form-createDepartment #select-department-status');
    callSelect2Status('#form-search-department #select-search-department-status', true);

    callSelect2Status('#form-createPosition #select-position-status');
    callSelect2Status('#form-search-position #select-search-position-status', true);

    callSelect2HolidayDay(false);
    callSelect2HolidayDay(true);

    callSelect2SearchHolidayYear();

    $('#nav-master-empData .btn-add-employee').on('click', function () {
        $('#modal-createEmployee').modal('show');
    });

    $('#nav-master-role .btn-add-role').on('click', function () {
        $('#modal-createRole').modal('show');
    });

    /* Begin Holiday */
    $('#nav-master-holiday .btn-add-holiday').on('click', function () {
        _holiday_action = 'add';
        $(`#${_modal_holiday_name} #holidayHeader`).text('เพิ่มวันหยุด');
        $(`#${_modal_holiday_name}`).modal('show');
        $(`#${_modal_holiday_name} #`)
    });

    $(document).on('click', '.btn-edit-holiday', function () {
        $(`#${_modal_holiday_name} #holidayHeader`).text('แก้ไขวันหยุด');
        $(`#${_modal_holiday_name}`).modal('show');
        _holiday_action = 'edit';
        callGetHolidayById($(this).data('id'));
    });

    $(`#${_modal_holiday_name}`).on('show.bs.modal', function () {
        clearForm(_modal_holiday_name);
        if (_holiday_action == 'add') { callGetLastestHolidayId(); }
    });

    $('.btn-modal-save-holiday').on('click', function () {
        DoAddOrUpdateHoliday(_modal_holiday_name);
    });

    $('#form-search-holiday .btn-search-holiday').on('click', function () {
        callGetHolidayList();
    });

    $('#form-search-holiday .btn-clear-search-holiday').on('click', function () {
        clearSearchForm("holiday");
        callGetHolidayList();
    });

    $('#tb-holiday-list').on('click', 'td.holiday-details', function () {
        var tr = $(this).closest('tr');

        var id = tr.data('id');
        $(`#modal-viewHoliday`).modal('show');
        _holiday_action = 'view';
        clearForm(_modal_holiday_name);
        callGetHolidayById(id);
    });
    /* End Holiday */

    /* Begin Department */
    $('#nav-master-department .btn-add-department').on('click', function () {
        _department_action = 'add';
        $(`#${_modal_department_name} #departmentHeader`).text('เพิ่มแผนก');
        $(`#${_modal_department_name}`).modal('show');
    });

    $(document).on('click', '.btn-edit-department', function () {
        $(`#${_modal_department_name} #departmentHeader`).text('แก้ไขแผนก');
        $(`#${_modal_department_name}`).modal('show');
        _department_action = 'edit';
        callGetDepartmentById($(this).data('id'));
    });

    $(`#${_modal_department_name}`).on('show.bs.modal', function () {
        clearForm(_modal_department_name);
        if (_department_action == 'add') { callGetLastestDepartmentId(); }
    });

    $('.btn-modal-save-department').on('click', function () {
        DoAddOrUpdateDepartment(_modal_department_name);
    });

    $('#form-search-department .btn-search-department').on('click', function () {
        callGetDepartmentList();
    });

    $('#form-search-department .btn-clear-search-department').on('click', function () {
        clearSearchForm("department");
        callGetDepartmentList();
    });

    $('#tb-department-list').on('click', 'td.department-details', function () {
        var tr = $(this).closest('tr');

        var id = tr.data('id');
        $(`#modal-viewDepartment`).modal('show');
        _department_action = 'view';
        clearForm(_modal_department_name);
        callGetDepartmentById(id);
    });
    /* End Department */

    /* Begin Position */
    $('#nav-master-position .btn-add-position').on('click', function () {
        _position_action = 'add';
        $(`#${_modal_position_name} #positionHeader`).text('เพิ่มตำแหน่ง');
        $(`#${_modal_position_name}`).modal('show');
    });

    $(document).on('click', '.btn-edit-position', function () {
        $(`#${_modal_position_name} #positionHeader`).text('แก้ไขตำแหน่ง');
        $(`#${_modal_position_name}`).modal('show');
        _position_action = 'edit';
        
        callGetPositionById($(this).data('id'));
    });

    $(`#${_modal_position_name}`).on('show.bs.modal', function () {
        clearForm(_modal_position_name);
        if (_position_action == 'add') { callGetLastestPositionId(); }
    });

    $('.btn-modal-save-position').on('click', function () {
        DoAddOrUpdatePosition(_modal_position_name);
    });

    $('#form-search-position .btn-search-position').on('click', function () {
        callGetPositionList();
    });

    $('#form-search-position .btn-clear-search-position').on('click', function () {
        clearSearchForm("position");
        callGetPositionList();
    });

    $('#tb-position-list').on('click', 'td.position-details', function () {
        var tr = $(this).closest('tr');

        var id = tr.data('id');
        $(`#modal-viewPosition`).modal('show');
        _position_action = 'view';
        clearForm(_modal_department_name);
        callGetPositionById(id);
    });
    /* End Position */

    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).data("bs-target") // activated tab
        if (target == "#nav-master-holiday") {
            clearSearchForm("holiday");
            //callSelect2SearchHolidayYear();
            //callSelect2HolidayDay(true);
            //callSelect2Status('#form-search-holiday #select-search-holiday-status', true);
            callGetHolidayList();
        }
        else if (target == "#nav-master-department") {
            clearSearchForm("department");
            //callSelect2Status('#form-search-department #select-search-department-status', true);
            callGetDepartmentList();
        }
        else if (target == "#nav-master-position") {
            clearSearchForm("position");
            //callSelect2Status('#form-search-position #select-search-position-status', true);
            callGetPositionList();
        }
    });

});

let loader = $('<div/>').addClass('loader');

let _modal_holiday_name = 'modal-createHoliday';
let _holiday_action = 'add';

let _modal_department_name = 'modal-createDepartment';
let _department_action = 'add';

let _modal_position_name = 'modal-createPosition';
let _position_action = 'add';


let _modal_primary_color_code = "#F09723";
let _modal_default_color_code = "#EFEFEF";

var page = {
    initial: async function () {
    }
};

page.initial();

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
    }
}
function clearForm(modal) {
    switch (modal) {
        case "modal-createEmployee":

            break;
        case "modal-createHoliday":
            $('#form-createHoliday input[name="input-holiday-code"]').val('');
            $('#form-createHoliday #select-holiday-day').val('').trigger('change');
            $('#form-createHoliday input[name="input-holiday-date"]').val('');
            $('#form-createHoliday input[name="input-holiday-name"]').val('');
            $('#form-createHoliday #select-holiday-status').val(0).trigger('change');
            break;
        case "modal-createDepartment":
            $('#form-createDepartment input[name="input-department-code"]').val('');
            $('#form-createDepartment input[name="input-department-name"]').val('');
            $('#form-createDepartment #select-department-status').val(0).trigger('change');
            break;
        case "modal-createPosition":
            $('#form-createPosition input[name="input-position-code"]').val('');
            $('#form-createPosition input[name="input-position-name"]').val('');
            $('#form-createPosition #select-position-status').val(0).trigger('change');
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
    }

};


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
        status: ($('#form-createHoliday #select-holiday-status').val() == "1") ? true : false
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
    let year = ($('#form-search-holiday #select-search-holiday-year').val() == '' || $('#form-search-holiday #select-search-holiday-year').val() == null) ? "%%" : $('#form-search-holiday #select-search-holiday-year').val();
    let day = ($('#form-search-holiday #select-search-holiday-day').val() == '') ? "%%" : $('#form-search-holiday #select-search-holiday-day').val();
    let holidayDate = ($('#select-search-holiday-date').val() == '' || $('#select-search-holiday-date').val() == undefined) ? "%%" : $('#select-search-holiday-date').val();
    let holiday = ($('#form-search-holiday #input-search-holiday-name').val() == '') ? "%%" : $('#form-search-holiday #input-search-holiday-name').val();
    let status = ($('#form-search-holiday #select-search-holiday-status').val() == '') ? "%%" : $('#form-search-holiday #select-search-holiday-status').val();

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
            dom: 'Bfrtip',
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
    $('#form-createHoliday input[name="input-holiday-date"]').val(convertDateTimeFormat(data.holidayDate,'YYYY-MM-DD'));
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
        status: ($('#form-createDepartment #select-department-status').val() == "1") ? true : false 
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
    let departmentName = ($('#form-search-department #input-search-department').val() == '') ? "%%" : $('#form-search-department #input-search-department').val();
    let status = ($('#form-search-department #select-search-department-status').val() == '') ? "%%" : $('#form-search-department #select-search-department-status').val();

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
            dom: 'Bfrtip',
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
        status: ($('#form-createPosition #select-position-status').val() == "1") ? true : false
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
    let positionName = ($('#form-search-position #input-search-position').val() == '') ? "%%" : $('#form-search-position #input-search-position').val();
    let status = ($('#form-search-position #select-search-position-status').val() == '') ? "%%" : $('#form-search-position #select-search-position-status').val();

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
            dom: 'Bfrtip',
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

function callSuccessAlert() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'บันทึกข้อมูลสำเร็จ',
        showConfirmButton: false,
        timer: 1500
    });
}
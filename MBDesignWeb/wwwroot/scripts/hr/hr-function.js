var _leaveTypeId = 0;
var _leaveId = 0;
var _leave_action = "add";
var _attendance_setting_action = "add";
var _attendance_setting_id = 0;
function hrLoading() {
    callSelect2Status("#select-search-leave-status", true);
    callSelect2Status("#modal-editLeaveType #form-editLeaveType #select-leave-type-status", false);
    callSelect2Status("#modal-viewLeaveType #form-editLeaveType #select-leave-type-status", false);

    callSelect2LeaveType("#form-search-leave-type #select-search-leave-type", true);
    callSelect2LeaveType("#form-search-leave-information #select-search-leave-type", true);
    callSelect2LeaveType("#form-createLeave #select-leave-type", false);

    callSelect2EmpCode();
    callSelect2EmpFullName();
    renderSelect2LeaveHour();
    renderSelect2InstallmentType();

    callGetLeaveTypeList();

    callGetAttendanceList();

    callSelect2AttendanceSalaryType();
    callGetAttendanceSalaryList();
    renderEmpWarningDocumentList();
}
function clearSearchLeaveType() {
    let formId = '#form-search-leave-type';
    $(`${formId} #select-search-leave-type`).val('').trigger('change');
    $(`${formId} #select-search-leave-status`).val('').trigger('change');
}
function callSelect2LeaveType(select2Id, isSearch = true) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/HR/GetSelect2LeaveTypeName`,
        success: function (data) {
            renderSelect2LeaveType(select2Id, data, isSearch);
        },
        error: function (err) {
        }
    });
}
function renderSelect2LeaveType(select2Id, data, isSearch) {
    //let formName = (isSearch) ? '#form-search-leave-type' : '';
    //let select2Name = (isSearch) ? '#select-search-leave-type' : '';
    let select2FirstVal = (isSearch) ? 'ทั้งหมด' : 'กรุณาเลือก';

    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstVal}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.leaveTypeName}">${v.leaveTypeName}</option>`);
    });
}
function callGetLeaveTypeList() {
    let formId = '#form-search-leave-type';

    let leaveType = ($(`${formId} #select-search-leave-type`).val() == '') ? null : $(`${formId} #select-search-leave-type`).val();
    let status = ($(`${formId} #select-search-leave-status`).val() == '') ? null : $(`${formId} #select-search-leave-status`).val();

    let loaded = $('#tb-leave-type-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/HR/GetLeaveTypeList?leaveType=${leaveType}&status=${status}`,
        success: function (data) {
            renderGetLeaveTypeList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function renderGetLeaveTypeList(data) {
    $('#tb-leave-type-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            order:[],
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.leaveTypeId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'leaveTypeId',
                    className: "dt-center",
                },
                {
                    targets: 1,
                    data: 'leaveTypeName',
                },
                {
                    targets: 2,
                    data: 'leaveTypeDays',
                    className: "dt-body-right",
                },
                {
                    targets: 3,
                    data: 'leaveTypeDetail',
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
                    className: `dt-center ${_role_hr_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-leave-type" data-id="${row.leaveTypeId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function clearEditLeaveTypeForm() {
    let formId = '#form-editLeaveType';
    $(`${formId} input[name="input-leave-type-id"]`).val("");
    $(`${formId} input[name="input-leave-days"]`).val("");
    $(`${formId} #input-leave-detail`).val("");
    $(`${formId} #select-leave-type-status`).val(1).trigger('change');
}
function callGetLeaveTypeById(id, modal) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/HR/GetLeaveTypeById?leaveTypeId=${id}`,
        success: function (data) {
            renderLeaveTypeForm(data, modal);
        },
        error: function (err) {

        }
    });
}
function renderLeaveTypeForm(data, modal) {
    let status = (data.status) ? 1 : 0;
    let formId = '#form-editLeaveType';
    $(`${modal} ${formId} input[name="input-leave-type-id"]`).val(data.leaveTypeId);
    $(`${modal} ${formId} input[name="input-leave-days"]`).val(data.leaveTypeDays);
    $(`${modal} ${formId} #input-leave-detail`).val(data.leaveTypeDetail);
    $(`${modal} ${formId} #select-leave-type-status`).val(status).trigger('change');
}
let validateInputLeaveTypeForm = function () {
    let formId = '#form-editLeaveType';
    if ($(`${formId} input[name="input-leave-days"]`).val() == "" || $(`${formId} input[name="input-leave-days"]`).val() == "0") {
        Swal.fire({
            text: "กรุณากรอกจำนวนวันลา",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} input[name="input-leave-days"]`).focus();
        });
        return false;
    }
    else {
        return true;
    }
}
function DoUpdateLeaveType() {
    if (!validateInputLeaveTypeForm()) return;

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
            callUpdateLeaveType();
        }
    });
}
function callUpdateLeaveType() {
    $('.btn-modal-save-leave-type').addLoading();

    let url = `${app_settings.api_url}/api/HR/UpdateLeaveType`;

    let formId = '#form-editLeaveType';
    let leaveTypeDays = $(`${formId} input[name="input-leave-days"]`).val();
    let status = ($(`${formId} #select-leave-type-status`).val() == "1") ? true : false;

    var obj = {
        leaveTypeDays: leaveTypeDays,
        status: status,
        updateBy: _userCode,
        leaveTypeId: _leaveTypeId
    };

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            console.log(res);
            if (res.isResult) {
                callSuccessAlert();
                $('.btn-modal-save-leave-type').removeLoading();
                $(`#modal-editLeaveType`).modal('hide');
                callGetLeaveTypeList();
            }
            else {
                Swal.fire({
                    text: res.strResult,
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    confirmButtonText: 'ตกลง'
                });
                $('.btn-modal-save-leave-type').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-leave-type').removeLoading();
        }
    });

}

function clearSearchLeaveInformation() {
    let formId = '#form-search-leave-information';
    $(`${formId} input[name="input-search-leave-emp-code"]`).val("");
    $(`${formId} input[name="input-search-leave-emp-name"]`).val("");
    $(`${formId} #select-search-leave-type`).val('').trigger('change');
    $(`${formId} #input-search-leave-start-date`).val('');
    $(`${formId} #input-search-leave-end-date`).val('');
}
function callGetLeaveInformationList() {
    let formId = '#form-search-leave-information';

    let empCode = ($(`${formId} input[name="input-search-leave-emp-code"]`).val() == '') ? null : $(`${formId} input[name="input-search-leave-emp-code"]`).val();
    let empName = ($(`${formId} input[name="input-search-leave-emp-name"]`).val() == '') ? null : $(`${formId} input[name="input-search-leave-emp-name"]`).val();
    let leaveType = ($(`${formId} #select-search-leave-type`).val() == '') ? null : $(`${formId} #select-search-leave-type`).val();
    let leaveStartDate = ($(`${formId} input[name="input-search-leave-start-date"]`).val() == '') ? null : $(`${formId} input[name="input-search-leave-start-date"]`).val();
    let leaveEndDate = ($(`${formId} input[name="input-search-leave-end-date"]`).val() == '') ? null : $(`${formId} input[name="input-search-leave-end-date"]`).val();
    //let status = ($(`${formId} #select-search-leave-status`).val() == '') ? null : $(`${formId} #select-search-leave-status`).val();

    let loaded = $('#tb-leave-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/HR/GetLeaveList?empCode=${empCode}&empName=${empName}&leaveType=${leaveType}&leaveStartDate=${leaveStartDate}&leaveEndDate=${leaveEndDate}`,
        success: function (data) {
            renderGetLeaveInformationList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function renderGetLeaveInformationList(data) {
    $('#tb-leave-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            order:[],
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.leaveId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'empCode',
                },
                {
                    targets: 1,
                    data: 'empFullName',
                },
                {
                    targets: 2,
                    data: 'leaveTypeName',
                },
                {
                    targets: 3,
                    data: null,
                    render: function (data, type, row) {
                        let startDate = convertDateTimeFormat(row.leaveStartDate, 'DD/MM/YYYY');
                        let endDate = convertDateTimeFormat(row.leaveEndDate, 'DD/MM/YYYY');

                        return (startDate == endDate) ? `${startDate}` : `${startDate}-${endDate}`;
                    },
                },
                {
                    targets: 4,
                    data: 'leaveDays',
                    className: "dt-center",
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
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_hr_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-leave" data-id="${row.leaveId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function clearLeaveForm() {
    let formId = '#form-createLeave';
    $(`${formId} #select-leave-empCode`).val("").trigger('change');
    $(`${formId} #select-leave-empName`).val("").trigger('change');
    $(`${formId} #select-leave-type`).val("").trigger('change');

    $(`${formId} #input-leave-start-date`).val("");
    $(`${formId} #input-leave-end-date`).val("");
    $(`${formId} #select-leave-hour`).val("").trigger('change');
    $(`${formId} input[name="input-leave-days"]`).val("");
    $(`${formId} #input-leave-remark`).val("");
}
function callSelect2EmpCode() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/HR/GetSelect2EmpCode`,
        success: function (data) {
            renderSelect2EmpCode(data, '#form-createLeave #select-leave-empCode', '#modal-createLeave');
            renderSelect2EmpCode(data, '#form-createOtherPayment #select-empCode', '#modal-createOtherPayment');
        },
        error: function (err) {
        }
    });

    
}
function renderSelect2EmpCode(data, select2Id, modalId) {
    let tmpData = [];
    let param = {
        text: '',
        title: '',
        id: '',
        header: '',
        detail: '',
        rev: ``
    };
    $(`${select2Id}`).empty();
    tmpData.push(param);
    Array.from(data).forEach((item, i) => {
        let param = {
            text: item.empCode,
            title: item.empCode,
            id: item.id,
            header: item.empCode,
            detail: ``,
            rev: ''
        };
        tmpData.push(param);
    });
    let convert = convertDroupDownData(tmpData);
    $(`${select2Id}`).select2({
        placeholder: "-- SELECT --",
        width: '100%',
        allowClear: true,
        dropdownParent: $(`${modalId}`),
        data: convert,
        escapeMarkup: function (markup) {
            return markup;
        }
    });

}
function callSelect2EmpFullName() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/HR/GetSelect2EmpFullName`,
        success: function (data) {
            renderSelect2EmpFullName(data, '#form-createLeave #select-leave-empName', '#modal-createLeave');
            renderSelect2EmpFullName(data, '#form-createOtherPayment #select-empName', '#modal-createOtherPayment');
        },
        error: function (err) {
        }
    });


}
function renderSelect2EmpFullName(data, select2Id, modalId) {
    let tmpData = [];
    let param = {
        text: '',
        title: '',
        id: '',
        header: '',
        detail: '',
        rev: ``
    };
    $(`${select2Id}`).empty();
    tmpData.push(param);
    Array.from(data).forEach((item, i) => {
        let param = {
            text: item.fullName,
            title: item.fullName,
            id: item.id,
            header: item.fullName,
            detail: ``,
            rev: ''
        };
        tmpData.push(param);
    });
    let convert = convertDroupDownData(tmpData);
    $(`${select2Id}`).select2({
        placeholder: "-- SELECT --",
        width: '100%',
        allowClear: true,
        dropdownParent: $(`${modalId}`),
        data: convert,
        escapeMarkup: function (markup) {
            return markup;
        }
    });

}
var _selected_empCode = true;
var _selected_empName = true;
function onChangeSelect2EmpCode() {
    if (_selected_empCode) {
        let empId = $('#form-createLeave #select-leave-empCode').val();
        _selected_empName = false;
        $('#form-createLeave #select-leave-empName').val(empId).trigger('change');
    }
    _selected_empCode = true;
}
function onChangeSelect2EmpName() {
    if (_selected_empName) {
        let empId = $('#form-createLeave #select-leave-empName').val();
        _selected_empCode = false;
        $('#form-createLeave #select-leave-empCode').val(empId).trigger('change');
    }
    _selected_empName = true;
}
function renderSelect2LeaveHour() {
    $(`#form-createLeave #select-leave-hour`).empty();
    $(`#form-createLeave #select-leave-hour`).append(`<option value="">กรุณาเลือก</option>`);
    $(`#form-createLeave #select-leave-hour`).append(`<option value="4">ครึ่งวัน</option>`);
    $(`#form-createLeave #select-leave-hour`).append(`<option value="8">เต็มวัน</option>`);
}
let validateInputLeaveForm = function () {
    let formId = '#form-createLeave';
    if ($(`${formId} #select-leave-empCode`).val() == "" || $(`${formId} #select-leave-empCode`).val() == null) {
        Swal.fire({
            text: "กรุณาเลือกรหัสพนักงาน",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #select-leave-empCode`).focus();
        });
        return false;
    }
    else if ($(`${formId} #select-leave-empName`).val() == "" || $(`${formId} #select-leave-empName`).val() == null) {
        Swal.fire({
            text: "กรุณาเลือกชื่อพนักงาน",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #select-leave-empName`).focus();
        });
        return false;
    }
    else if ($(`${formId} #select-leave-type`).val() == "" || $(`${formId} #select-leave-type`).val() == null) {
        Swal.fire({
            text: "กรุณาเลือกประเภทการลา",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #select-leave-type`).focus();
        });
        return false;
    }
    else if ($(`${formId} #input-leave-start-date`).val() == "" || $(`${formId} #input-leave-start-date`).val() == null) {
        Swal.fire({
            text: "กรุณาเลือกวันที่ลาเริ่มต้น",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #input-leave-start-date`).focus();
        });
        return false;
    }
    else if ($(`${formId} #input-leave-end-date`).val() == "" || $(`${formId} #input-leave-end-date`).val() == null) {
        Swal.fire({
            text: "กรุณาเลือกวันที่ลาสิ้นสุด",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #input-leave-end-date`).focus();
        });
        return false;
    }
    else if ($(`${formId} #select-leave-hour`).val() == "" || $(`${formId} #select-leave-hour`).val() == null) {
        Swal.fire({
            text: "กรุณาเลือกเวลา",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #select-leave-hour`).focus();
        });
        return false;
    }
    else if ($(`${formId} #input-leave-days`).val() == "" || $(`${formId} #input-leave-days`).val() <= 0) {
        Swal.fire({
            text: "กรุณากดคำนวณเวลา",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #input-leave-days`).focus();
        });
        return false;
    }
    else {
        return true;
    }
}
function DoUpdateLeave() {
    if (!validateInputLeaveForm()) return;

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
            callAddOrUpdateLeave();
        }
    });
}
function callAddOrUpdateLeave() {
    $('.btn-modal-save-leave').addLoading();

    let url = (_leave_action == "add") ? `${app_settings.api_url}/api/HR/AddLeave` : `${app_settings.api_url}/api/HR/UpdateLeave`;

    let formId = '#form-createLeave';
    let empId = $(`${formId} #select-leave-empCode`).val();
    let leaveTypeName = $(`${formId} #select-leave-type`).val();

    let leaveStartDate = $(`${formId} #input-leave-start-date`).val();
    let leaveEndDate = $(`${formId} #input-leave-end-date`).val();
    let leaveHours = $(`${formId} #select-leave-hour`).val();
    let leaveDays = $(`${formId} input[name="input-leave-days"]`).val();
    let leaveRemark = $(`${formId} #input-leave-remark`).val();

    var obj = {
        empId: empId,
        leaveTypeName: leaveTypeName,
        leaveStartDate: leaveStartDate,
        leaveEndDate: leaveEndDate,
        leaveHours: leaveHours,
        leaveDays: leaveDays,
        leaveRemark: leaveRemark,
        userCode: _userCode,
        leaveId: _leaveId
    };

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            console.log(res);
            if (res.isResult) {
                callSuccessAlert();
                $('.btn-modal-save-leave').removeLoading();
                $(`#modal-createLeave`).modal('hide');
                callGetLeaveInformationList();
            }
            else {
                Swal.fire({
                    text: res.strResult,
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    confirmButtonText: 'ตกลง'
                });
                $('.btn-modal-save-leave').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-leave').removeLoading();
        }
    });

}
function calculateLeaveDays() {
    let formId = '#form-createLeave';
    let leaveStartDate = $(`${formId} #input-leave-start-date`).val();
    let leaveEndDate = $(`${formId} #input-leave-end-date`).val();
    let leaveHours = $(`${formId} #select-leave-hour`).val();

    if (leaveStartDate > leaveEndDate) {
        Swal.fire({
            text: "กรุณาเลือกวันที่ลาเริ่มต้นให้น้อยกว่าวันที่ลาสิ้นสุด",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
        });
        return false;
    }
    else if (leaveHours == "" || leaveHours == "0") {
        Swal.fire({
            text: "กรุณาเลือกเวลา",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #select-leave-hour`).focus();
        });
        return false;
    }

    var startDay = new Date(leaveStartDate);
    var endDay = new Date(leaveEndDate);

    var millisBetween = startDay.getTime() - endDay.getTime();
    var Difference_In_Days = millisBetween / (1000 * 3600 * 24);

    var result = (leaveHours == "4") ? Math.round(Math.abs(Difference_In_Days)) + 0.5 : Math.round(Math.abs(Difference_In_Days)) + 1;
    var finalResult = `${result.toString()} วัน`;
    $(`${formId} input[name="input-leave-days"]`).val(finalResult);
}
function callGetLeaveById(id, modal) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/HR/GetLeaveById?leaveId=${id}`,
        success: function (data) {
            renderLeaveForm(data, modal);
        },
        error: function (err) {

        }
    });
}
function renderLeaveForm(data, modal) {
    let formId = '#form-createLeave';
    $(`${modal} ${formId} #select-leave-empCode`).val(data.empId).trigger('change');
    $(`${modal} ${formId} #select-leave-empName`).val(data.empId).trigger('change');
    $(`${modal} ${formId} #select-leave-type`).val(data.leaveTypeName).trigger('change');

    $(`${modal} ${formId} #input-leave-start-date`).val(convertDateTimeFormat(data.leaveStartDate, 'YYYY-MM-DD'));
    $(`${modal} ${formId} #input-leave-end-date`).val(convertDateTimeFormat(data.leaveEndDate, 'YYYY-MM-DD'));
    $(`${modal} ${formId} #select-leave-hour`).val(data.leaveHours).trigger('change');
    $(`${modal} ${formId} input[name="input-leave-days"]`).val(`${data.leaveDays} วัน`);
    $(`${modal} ${formId} #input-leave-remark`).val(data.leaveRemark);
}

function clearSearchLeaveSummary() {
    let formId = '#form-search-leave-summary';
    $(`${formId} input[name="input-search-leave-emp-code"]`).val("");
    $(`${formId} input[name="input-search-leave-emp-name"]`).val("");
}
function callGetLeaveSummaryList() {
    let formId = '#form-search-leave-summary';

    let empCode = ($(`${formId} input[name="input-search-leave-emp-code"]`).val() == '') ? null : $(`${formId} input[name="input-search-leave-emp-code"]`).val();
    let empName = ($(`${formId} input[name="input-search-leave-emp-name"]`).val() == '') ? null : $(`${formId} input[name="input-search-leave-emp-name"]`).val();

    let loaded = $('#tb-leave-summary-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/HR/GetLeaveSummaryByEmpData?empCode=${empCode}&empName=${empName}`,
        success: function (data) {
            renderGetLeaveSummaryList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function renderGetLeaveSummaryList(data) {
    $('#tb-leave-summary-list').DataTable(
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
                $(row).attr('data-id', data.leaveTypeId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'leaveTypeId',
                },
                {
                    targets: 1,
                    data: 'leaveTypeName',
                },
                {
                    targets: 2,
                    data: 'leaveTypeDetail',
                },
                {
                    targets: 3,
                    data: 'leaveTypeDays',
                    className: "dt-body-right",
                },
                {
                    targets: 4,
                    data: 'useLeaveDays',
                    className: "dt-body-right",
                },
                {
                    targets: 5,
                    data: 'remainLeaveDays',
                    className: "dt-body-right",
                },
            ],
        }
    );
}

function clearSearchInstallmentForm() {
    let formId = '#form-search-salary-other';
    $(`${formId} input[name="input-search-emp-code"]`).val("");
    $(`${formId} input[name="input-search-emp-name"]`).val("");
    $(`${formId} #select-search-other-type`).val('').trigger('change');
    $(`${formId} #input-search-start-date`).val('');
}
function callGetOtherPaymentList() {
    let formId = '#form-search-salary-other';

    let empCode = ($(`${formId} input[name="input-search-emp-code"]`).val() == '') ? null : $(`${formId} input[name="input-search-emp-code"]`).val();
    let empName = ($(`${formId} input[name="input-search-emp-name"]`).val() == '') ? null : $(`${formId} input[name="input-search-emp-name"]`).val();
    let type = ($(`${formId} #select-search-other-type`).val() == '') ? null : $(`${formId} #select-search-other-type`).val();
    let installmentStartDate = ($(`${formId} input[name="input-search-start-date"]`).val() == '') ? null : $(`${formId} input[name="input-search-start-date"]`).val();

    let loaded = $('#tb-other-payment-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/HR/GetOtherPaymentList?empCode=${empCode}&empName=${empName}&type=${type}&installmentStartDate=${installmentStartDate}`,
        success: function (data) {
            renderGetOtherPaymentList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function renderGetOtherPaymentList(data) {
    $('#tb-other-payment-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            order:[],
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.otherPaymentId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'empCode',
                },
                {
                    targets: 1,
                    data: 'empFullName',
                },
                {
                    targets: 2,
                    data: 'type',
                },
                {
                    targets: 3,
                    data: 'installmentStartDateShow',
                },
                {
                    targets: 4,
                    data: 'installmentQty',
                },
                {
                    targets: 5,
                    data: null,
                    render: function (data, type, row) {
                        return (row.installment == 0) ? `-` : `${row.installment}`;
                    },
                },
                {
                    targets: 6,
                    data: 'installmentAmount',
                },
                {
                    targets: 7,
                    data: null,
                    render: function (data, type, row) {
                        return (row.installmentPayment == 0) ? `-` : `${row.installmentPayment}`;
                    },
                },
                {
                    targets: 8,
                    data: null,
                    render: function (data, type, row) {
                        return parseFloat(row.installmentAmount - row.installmentPayment).toFixed(2);
                    },
                },
                {
                    targets: 9,
                    data: 'createDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 10,
                    data: 'createByName'
                },
                {
                    targets: 11,
                    data: 'updateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 12,
                    data: 'updateByName'
                },
            ],
        }
    );
}
function clearInstallmentForm() {
    let formId = '#form-createOtherPayment';
    $(`${formId} #select-empCode`).val("").trigger('change');
    $(`${formId} #select-empName`).val("").trigger('change');
    $(`${formId} #select-type`).val("").trigger('change');
    $(`${formId} #input-total-amount`).val("");
    $(`${formId} #input-total-installment`).val("");
    $(`${formId} #input-installment-amount`).val("");
    $(`${formId} #input-start-installment-payment`).val("");
    $(`${formId} #input-installment-remark`).val("");
}
function renderSelect2InstallmentType() {
    $(`#form-createOtherPayment #select-type`).empty();
    $(`#form-createOtherPayment #select-type`).append(`<option value="">กรุณาเลือก</option>`);
    $(`#form-createOtherPayment #select-type`).append(`<option value="ชดใช้ค่าทรัพย์สินที่เสียหาย">ชดใช้ค่าทรัพย์สินที่เสียหาย</option>`);
    $(`#form-createOtherPayment #select-type`).append(`<option value="ชดใช้ค่าใช้จ่ายเบ็ดเตล็ด">ชดใช้ค่าใช้จ่ายเบ็ดเตล็ด</option>`);

    $(`#form-search-salary-other #select-search-other-type`).empty();
    $(`#form-search-salary-other #select-search-other-type`).append(`<option value="">ทั้งหมด</option>`);
    $(`#form-search-salary-other #select-search-other-type`).append(`<option value="ชดใช้ค่าทรัพย์สินที่เสียหาย">ชดใช้ค่าทรัพย์สินที่เสียหาย</option>`);
    $(`#form-search-salary-other #select-search-other-type`).append(`<option value="ชดใช้ค่าใช้จ่ายเบ็ดเตล็ด">ชดใช้ค่าใช้จ่ายเบ็ดเตล็ด</option>`);
}
let validateInputOtherPaymentForm = function () {
    let formId = '#form-createOtherPayment';
    if ($(`${formId} #select-empCode`).val() == "" || $(`${formId} #select-empCode`).val() == null) {
        Swal.fire({
            text: "กรุณาเลือกรหัสพนักงาน",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #select-empCode`).focus();
        });
        return false;
    }
    else if ($(`${formId} #select-empName`).val() == "" || $(`${formId} #select-empName`).val() == null) {
        Swal.fire({
            text: "กรุณาเลือกชื่อพนักงาน",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #select-empName`).focus();
        });
        return false;
    }
    else if ($(`${formId} #select-type`).val() == "" || $(`${formId} #select-type`).val() == null) {
        Swal.fire({
            text: "กรุณาเลือกประเภทการหักชดใช้",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #select-type`).focus();
        });
        return false;
    }
    else if ($(`${formId} #input-total-amount`).val() == "" || $(`${formId} #input-total-amount`).val() == "0") {
        Swal.fire({
            text: "กรุณากรอกจำนวนเงินทั้งหมด",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #input-total-amount`).focus();
        });
        return false;
    }
    else if ($(`${formId} #input-total-installment`).val() == "" || $(`${formId} #input-total-installment`).val() == "0") {
        Swal.fire({
            text: "กรุณากรอกจำนวนงวดทั้งหมด",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #input-total-installment`).focus();
        });
        return false;
    }
    else if ($(`${formId} #input-installment-amount`).val() == "" || $(`${formId} #input-installment-amount`).val() == "0") {
        Swal.fire({
            text: "กรุณากดคำนวณยอดหักต่องวด",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #input-installment-amount`).focus();
        });
        return false;
    }
    else if ($(`${formId} #input-start-installment-payment`).val() == "" || $(`${formId} #input-start-installment-payment`).val() == null) {
        Swal.fire({
            text: "กรุณาเลือกเดือนและปีที่เริ่มผ่อน",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #input-start-installment-payment`).focus();
        });
        return false;
    }
    else {
        return true;
    }
}
let validateInputOtherPaymentBeforeCalculate = function () {
    let formId = '#form-createOtherPayment';
    if ($(`${formId} #input-total-amount`).val() == "" || $(`${formId} #input-total-amount`).val() == "0") {
        Swal.fire({
            text: "กรุณากรอกจำนวนเงินทั้งหมด",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #input-total-amount`).focus();
        });
        return false;
    }
    else if ($(`${formId} #input-total-installment`).val() == "" || $(`${formId} #input-total-installment`).val() == "0") {
        Swal.fire({
            text: "กรุณากรอกจำนวนงวดทั้งหมด",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #input-total-installment`).focus();
        });
        return false;
    }
    else {
        return true;
    }
}
var _selected_empCode_other_payment = true;
var _selected_empName_other_payment = true;
function onChangeSelect2EmpCodeOtherPayment(modal) {
    if (_selected_empCode_other_payment) {
        let empId = $(`#${modal} #form-createOtherPayment #select-empCode`).val();
        _selected_empName_other_payment = false;
        $(`#${modal} #form-createOtherPayment #select-empName`).val(empId).trigger('change');
    }
    _selected_empCode_other_payment = true;
}
function onChangeSelect2EmpNameOtherPayment(modal) {
    if (_selected_empName_other_payment) {
        let empId = $(`#${modal} #form-createOtherPayment #select-empName`).val();
        _selected_empCode_other_payment = false;
        $(`#${modal} #form-createOtherPayment #select-empCode`).val(empId).trigger('change');
    }
    _selected_empName_other_payment = true;
}
function DoAddOtherPayment() {
    if (!validateInputOtherPaymentForm()) return;

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
            callAddOrUpdateOtherPayment();
        }
    });
}
function callAddOrUpdateOtherPayment() {
    $('.btn-modal-save-other-payment').addLoading();

    let url = `${app_settings.api_url}/api/HR/AddOtherPaymentModel`;

    let formId = '#form-createOtherPayment';
    let empId = $(`${formId} #select-empCode`).val();
    let type = $(`${formId} #select-type`).val();

    let amount = $(`${formId} #input-total-amount`).val();
    let installmentQty = $(`${formId} #input-total-installment`).val();
    let installmentAmount = $(`${formId} #input-installment-amount`).val();
    let installmentStartDate = $(`${formId} input[name="input-start-installment-payment"]`).val();
    let remark = $(`${formId} #input-installment-remark`).val();

    var obj = {
        empId: empId,
        type: type,
        amount: amount,
        installmentQty: installmentQty,
        installmentAmount: installmentAmount,
        installmentStartDate: installmentStartDate,
        remark: remark,
        userCode: _userCode
    };

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            console.log(res);
            if (res.isResult) {
                callSuccessAlert();
                $('.btn-modal-save-other-payment').removeLoading();
                $(`#modal-createOtherPayment`).modal('hide');
                callGetOtherPaymentList();
            }
            else {
                Swal.fire({
                    text: res.strResult,
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    confirmButtonText: 'ตกลง'
                });
                $('.btn-modal-save-other-payment').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-other-payment').removeLoading();
        }
    });

}
function calculateInstallmentPayment() {
    if (!validateInputOtherPaymentBeforeCalculate) return;

    $('.btn-calculate-installment-payment').addLoading();

    let formId = '#form-createOtherPayment';
    let amount = parseFloat($(`${formId} #input-total-amount`).val());
    let installmentQty = parseInt($(`${formId} #input-total-installment`).val());

    let installmentAmount = (amount / installmentQty).toFixed(2);
    $(`${formId} #input-installment-amount`).val("");
    $(`${formId} #input-installment-amount`).val(installmentAmount);

    $('.btn-calculate-installment-payment').removeLoading();
}
function callGetOtherPaymentById(id, modal) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/HR/GetOtherPaymentById?otherPaymentId=${id}`,
        success: function (data) {
            renderOtherPaymentForm(data, modal);
        },
        error: function (err) {

        }
    });
}
function renderOtherPaymentForm(data, modal) {
    let formId = '#form-createOtherPayment';
    $(`${modal} ${formId} #select-empCode`).val(data.empId).trigger('change');
    $(`${modal} ${formId} #select-empName`).val(data.empId).trigger('change');
    $(`${modal} ${formId} #select-type`).val(data.leaveTypeName).trigger('change');
    $(`${modal} ${formId} #input-total-amount`).val(data.amount);
    $(`${modal} ${formId} #input-total-installment`).val(data.installmentQty);
    $(`${modal} ${formId} #input-installment-amount`).val(data.installmentAmount);
    $(`${modal} ${formId} #input-start-installment-payment`).val(convertDateTimeFormat(data.installmentStartDate, 'YYYY-MM-DD'));
    $(`${modal} ${formId} #input-installment-remark`).val(data.remark);
}

function clearSearchAttendanceSettingForm() {
    let formId = '#form-search-attendance-setting';
    $(`${formId} #select-search-attendance-setting-department`).val('').trigger('change');
}
function clearAttendanceSettingForm() {
    let formId = '#form-createAttendanceSetting';
    $(`${formId} #select-attendance-department`).val("").trigger('change');
    $(`${formId} #select-attendance-status`).val("1").trigger('change');

    $(`${formId} #input-attendance-time-in`).val("");
    $(`${formId} #input-attendance-time-out`).val("");

    _attendance_setting_id = 0;
}
function callSelect2AttendanceDepartmentStatus(id) {
    $(id).empty();
    $(id).append(`<option value="1">ใช้งาน</option>`);
    $(id).append(`<option value="0">ไม่ใช้งาน</option>`);
}
function callSelect2ActiveDepartment() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Employee/GetDepartmentSelect2`,
        success: function (data) {
            renderSelect2ActiveDepartment(data);
        },
        error: function (err) {
        }
    });
}
function renderSelect2ActiveDepartment(data) {
    var select2SearchId = '#form-search-attendance-setting #select-search-attendance-setting-department';
    var select2Id = '#form-createAttendanceSetting #select-attendance-department';

    $(`${select2SearchId}`).empty();
    $(`${select2SearchId}`).append(`<option value="">ทั้งหมด</option>`);

    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">กรุณาเลือก</option>`);

    data.forEach((v) => {
        $(`${select2SearchId}`).append(`<option value="${v.departmentId}">${v.departmentName}</option>`);
        $(`${select2Id}`).append(`<option value="${v.departmentId}">${v.departmentName}</option>`);
    });
}
function callGetAttendanceSettingList() {
    let formId = '#form-search-attendance-setting';

    let departmentId = ($(`${formId} #select-search-attendance-setting-department`).val() == '') ? null : $(`${formId} #select-search-attendance-setting-department`).val();

    let loaded = $('#tb-attendance-setting-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/HR/GetAttendanceSettingList?departmentId=${departmentId}`,
        success: function (data) {
            renderGetAttendanceSettingList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function renderGetAttendanceSettingList(data) {
    $('#tb-attendance-setting-list').DataTable(
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
                    data: 'rowNo',
                },
                {
                    targets: 1,
                    data: 'departmentName',
                },
                {
                    targets: 2,
                    data: 'attendanceTimeIn',
                    className: "dt-center",
                },
                {
                    targets: 3,
                    data: 'attendanceTimeOut',
                    className: "dt-center",
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
                    className: `dt-center ${_role_hr_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-attendance-setting" data-id="${row.id}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function callGetAttendanceSettingById(id, modal) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/HR/GetAttendanceSettingById?id=${id}`,
        success: function (data) {
            renderAttendanceSettingForm(data, modal);
        },
        error: function (err) {

        }
    });
}
function renderAttendanceSettingForm(data, modal) {
    let formId = '#form-createAttendanceSetting';
    $(`${modal} ${formId} #select-attendance-department`).val(data.departmentId).trigger('change');

    $(`${modal} ${formId} #input-attendance-time-in`).val(data.attendanceTimeIn);
    $(`${modal} ${formId} #input-attendance-time-out`).val(data.attendanceTimeOut);

    var status = (data.status == true) ? "1" : "0";
    $(`${modal} ${formId} #select-attendance-status`).val(status).trigger('change');
}
let validateInputAttendanceSettingForm = function () {
    let formId = '#form-createAttendanceSetting';
    if ($(`${formId} #select-attendance-department`).val() == "" || $(`${formId} #select-attendance-department`).val() == null) {
        Swal.fire({
            text: "กรุณาเลือกแผนก",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #select-attendance-department`).focus();
        });
        return false;
    }
    else if ($(`${formId} #input-attendance-time-in`).val() == "" || $(`${formId} #input-attendance-time-in`).val() == null) {
        Swal.fire({
            text: "กรุณากรอกเวลาเข้างาน",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #input-attendance-time-in`).focus();
        });
        return false;
    }
    else if ($(`${formId} #input-attendance-time-out`).val() == "" || $(`${formId} #input-attendance-time-out`).val() == null) {
        Swal.fire({
            text: "กรุณากรอกเวลาออกงาน",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #input-attendance-time-out`).focus();
        });
        return false;
    }
    else if (/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test($(`#form-createAttendanceSetting #input-attendance-time-in`).val()) == false) {
        Swal.fire({
            text: "กรุณากรอกเวลาเข้างานด้วย Format HH:mm",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #input-attendance-time-in`).focus();
        });
        return false;
    }
    else if (/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test($(`#form-createAttendanceSetting #input-attendance-time-out`).val()) == false) {
        Swal.fire({
            text: "กรุณากรอกเวลาออกงานด้วย Format HH:mm",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #input-attendance-time-out`).focus();
        });
        return false;
    }
    else {
        if ($(`#form-createAttendanceSetting #input-attendance-time-in`).val().split(':')[0] > $(`#form-createAttendanceSetting #input-attendance-time-out`).val().split(':')[0]) {
            Swal.fire({
                text: "กรุณากรอกเวลาเข้า-ออกงานให้ถูกต้อง",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: _modal_primary_color_code,
                confirmButtonText: 'ตกลง'
            }).then((result) => {
                $(`${formId} #input-attendance-time-in`).focus();
            });
            return false;
        }
        else if ($(`#form-createAttendanceSetting #input-attendance-time-in`).val().split(':')[0] == $(`#form-createAttendanceSetting #input-attendance-time-out`).val().split(':')[0] &&
            $(`#form-createAttendanceSetting #input-attendance-time-in`).val().split(':')[1] >= $(`#form-createAttendanceSetting #input-attendance-time-out`).val().split(':')[1]) {
            Swal.fire({
                text: "กรุณากรอกเวลาเข้า-ออกงานให้ถูกต้อง",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: _modal_primary_color_code,
                confirmButtonText: 'ตกลง'
            }).then((result) => {
                $(`${formId} #input-attendance-time-in`).focus();
            });
            return false;
        }
        else {
            return true;
        }
    }
}
function DoSaveAttendanceSetting() {
    if (!validateInputAttendanceSettingForm()) return;

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
            callAddOrUpdateAttendanceSetting();
        }
    });
}
function callAddOrUpdateAttendanceSetting() {
    $('.btn-modal-save-attendance-setting').addLoading();

    let url = (_attendance_setting_action == "add") ? `${app_settings.api_url}/api/HR/AddAttendanceSetting` : `${app_settings.api_url}/api/HR/UpdateAttendanceSetting`;

    let formId = '#form-createAttendanceSetting';
    let departmentId = $(`${formId} #select-attendance-department`).val();
    let attendanceTimeIn = $(`${formId} #input-attendance-time-in`).val();
    let attendanceTimeOut = $(`${formId} #input-attendance-time-out`).val();
    let status = $(`${formId} #select-attendance-status`).val() == 1 ? true : false;

    var obj = {
        id: _attendance_setting_id,
        departmentId: departmentId,
        attendanceTimeIn: attendanceTimeIn,
        attendanceTimeOut: attendanceTimeOut,
        userCode: _userCode,
        status: status,
    };

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.isResult) {
                callSuccessAlert();
                $('.btn-modal-save-attendance-setting').removeLoading();
                $(`#modal-createAttendanceSetting`).modal('hide');
                callGetAttendanceSettingList();
            }
            else {
                Swal.fire({
                    text: res.strResult,
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    confirmButtonText: 'ตกลง'
                });
                $('.btn-modal-save-attendance-setting').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-attendance-setting').removeLoading();
        }
    });

}


function clearSearchAttendanceForm() {
    let formId = '#form-search-attendance-time';
    $(`${formId} #input-search-attendance-time-emp-code`).val('');
    $(`${formId} #input-search-attendance-time-emp-name`).val('');
    $(`${formId} #input-search-attendance-time-start-date`).val('');
    $(`${formId} #input-search-attendance-time-end-date`).val('');
}
function callGetAttendanceList() {
    let formId = '#form-search-attendance-time';

    let empCode = ($(`${formId} #input-search-attendance-time-emp-code`).val() == '') ? null : $(`${formId} #input-search-attendance-time-emp-code`).val();
    let empName = ($(`${formId} #input-search-attendance-time-emp-name`).val() == '') ? null : $(`${formId} #input-search-attendance-time-emp-name`).val();
    let startDate = ($(`${formId} #input-search-attendance-time-start-date`).val() == '') ? null : $(`${formId} #input-search-attendance-time-start-date`).val();
    let endDate = ($(`${formId} #input-search-attendance-time-end-date`).val() == '') ? null : $(`${formId} #input-search-attendance-time-end-date`).val();

    let loaded = $('#tb-attendance-time-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/HR/GetAttendanceList?empCode=${empCode}&empName=${empName}&startDate=${startDate}&endDate=${endDate}`,
        success: function (data) {
            renderGetAttendanceList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function renderGetAttendanceList(data) {
    $('#tb-attendance-time-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            order:[],
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.attendanceId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'empCode',
                },
                {
                    targets: 1,
                    data: 'employeeName',
                },
                {
                    targets: 2,
                    data: 'attendanceDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.attendanceDate ? convertDateTimeFormat(row.attendanceDate, 'DD/MM/YYYY') : "";
                    },
                },
                {
                    targets: 3,
                    data: 'attendanceTimeIn',
                    className: "dt-center",
                },
                {
                    targets: 4,
                    data: 'attendanceTimeOut',
                    className: "dt-center",
                },
                {
                    targets: 5,
                    data: 'attendanceHour',
                    className: "dt-center",
                },
                {
                    targets: 6,
                    data: 'createDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 7,
                    data: 'createByName'
                },
            ],
        }
    );
}


function clearSearchSalaryForm() {
    let formId = '#form-search-salary-calculate';
    $(`${formId} #input-search-emp-code`).val('');
    $(`${formId} #input-search-emp-name`).val('');
    $(`${formId} #input-search-start-date`).val('');
    $(`${formId} #input-search-end-date`).val('');
}
function callGetSalaryList() {
    let formId = '#form-search-salary-calculate';

    let empCode = ($(`${formId} #input-search-emp-code`).val() == '') ? null : $(`${formId} #input-search-emp-code`).val();
    let empName = ($(`${formId} #input-search-emp-name`).val() == '') ? null : $(`${formId} #input-search-emp-name`).val();
    let startDate = ($(`${formId} #input-search-start-date`).val() == '') ? null : $(`${formId} #input-search-start-date`).val();
    let endDate = ($(`${formId} #input-search-end-date`).val() == '') ? null : $(`${formId} #input-search-end-date`).val();

    let loaded = $('#tb-salary-summary-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/HR/GetSalaryList?empCode=${empCode}&empName=${empName}&startDate=${startDate}&endDate=${endDate}`,
        success: function (data) {
            renderGetSalaryList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function renderGetSalaryList(data) {
    $('#tb-salary-summary-list').DataTable(
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
                $(row).attr('data-id', data.salaryId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'empCode',
                },
                {
                    targets: 1,
                    data: 'employeeName',
                },
                {
                    targets: 2,
                    data: 'departmentName',
                },
                {
                    targets: 3,
                    data: 'salaryType',
                },
                {
                    targets: 4,
                    data: 'paymentPeriod',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.paymentPeriod ? convertDateTimeFormat(row.paymentPeriod, 'DD/MM/YYYY') : "";
                    },
                },
                {
                    targets: 5,
                    data: 'diligenceAllowance',
                    className: "dt-body-right",
                    render: function (data, type, row) {
                        return row.diligenceAllowance == 0 ? "-" : new Intl.NumberFormat().format(row.diligenceAllowance);
                    },
                },
                {
                    targets: 6,
                    data: 'totalExpenses',
                    className: "dt-body-right",
                    render: function (data, type, row) {
                        return row.totalExpenses == 0 ? "-" : new Intl.NumberFormat().format(row.totalExpenses);
                    },
                },
                {
                    targets: 7,
                    data: 'ot',
                    className: "dt-body-right",
                    render: function (data, type, row) {
                        return row.ot == 0 ? "-" : new Intl.NumberFormat().format(row.ot);
                    },
                },
                {
                    targets: 8,
                    data: 'commission',
                    className: "dt-body-right",
                    render: function (data, type, row) {
                        return row.commission == 0 ? "-" : new Intl.NumberFormat().format(row.commission);
                    },
                },
                {
                    targets: 9,
                    data: 'salary',
                    className: "dt-body-right",
                    render: function (data, type, row) {
                        return row.salary == 0 ? "-" : new Intl.NumberFormat().format(row.salary);
                    },
                },
                {
                    targets: 10,
                    data: null,
                    orderable: false,
                    className: "dt-center",
                    render: function (data, type, row) {
                        //return `<a class="btn btn-view-payslip" href="../Document/GetPaySlipBySalaryId?salaryId=${row.salaryId}" target="_blank"><img src="../images/analysis.png" width="25px" /></a>`;
                        return `<a class="btn btn-view-payslip" target="_blank" onclick="generatePaySlip(${row.salaryId})"><img src="../images/analysis.png" width="25px" /></a>`;
                    },
                },
            ],
        }
    );
}

function clearSearchAttendanceSalaryForm() {
    let formId = '#form-search-salary-attendance';
    $(`${formId} #input-search-emp-code`).val('');
    $(`${formId} #input-search-emp-name`).val('');
    $(`${formId} #select-search-attendance-type`).val('').trigger('change');
    $(`${formId} #input-search-start-date`).val('');
    $(`${formId} #input-search-end-date`).val('');
}
function callGetAttendanceSalaryList() {
    let formId = '#form-search-salary-attendance';

    let empCode = ($(`${formId} #input-search-emp-code`).val() == '') ? null : $(`${formId} #input-search-emp-code`).val();
    let empName = ($(`${formId} #input-search-emp-name`).val() == '') ? null : $(`${formId} #input-search-emp-name`).val();
    let leaveType = ($(`${formId} #select-search-attendance-type`).val() == '' || $(`${formId} #select-search-attendance-type`).val() == null || $(`${formId} #select-search-attendance-type`).val() == undefined) ? null : $(`${formId} #select-search-attendance-type`).val();
    let startDate = ($(`${formId} #input-search-start-date`).val() == '') ? null : $(`${formId} #input-search-start-date`).val();
    let endDate = ($(`${formId} #input-search-end-date`).val() == '') ? null : $(`${formId} #input-search-end-date`).val();

    let loaded = $('#tb-salary-attendance-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/HR/GetAttendanceSalaryList?empCode=${empCode}&empName=${empName}&leaveType=${leaveType}&startDate=${startDate}&endDate=${endDate}`,
        success: function (data) {
            renderGetAttendanceSalaryList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function renderGetAttendanceSalaryList(data) {
    $('#tb-salary-attendance-list').DataTable(
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
                $(row).attr('data-id', data.attendanceId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'empCode',
                },
                {
                    targets: 1,
                    data: 'employeeName',
                },
                {
                    targets: 2,
                    data: 'departmentName',
                },
                {
                    targets: 3,
                    data: 'salaryType',
                },
                {
                    targets: 4,
                    data: 'attendanceType',
                },
                {
                    targets: 5,
                    data: 'attendanceDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.attendanceDate ? convertDateTimeFormat(row.attendanceDate, 'DD/MM/YYYY') : "";
                    },
                },
                {
                    targets: 6,
                    data: 'attendanceTimeIn',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return (row.attendanceTimeIn == "" || row.attendanceTimeIn == 0) ? "-" : row.attendanceTimeIn;
                    },
                },
                {
                    targets: 7,
                    data: 'attendanceTimeOut',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return (row.attendanceTimeOut == "" || row.attendanceTimeOut == 0) ? "-" : row.attendanceTimeOut;
                    },
                },
                {
                    targets: 8,
                    data: 'amountDeducted',
                    className: "dt-body-right",
                    render: function (data, type, row) {
                        var amount = (row.amountDeducted == "0" || row.amountDeducted == "") ? 0 : parseFloat(row.amountDeducted).toFixed(2);
                        return (amount == 0) ? "-" : amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    },
                },
                {
                    targets: 9,
                    data: 'remark'
                },
            ],
        }
    );
}
function callSelect2AttendanceSalaryType() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/HR/GetAttendanceSalaryType`,
        success: function (data) {
            renderSelect2AttendanceSalaryType(data);
        },
        error: function (err) {
        }
    });
}
function renderSelect2AttendanceSalaryType(data) {
    var select2SearchId = '#form-search-salary-attendance #select-search-attendance-type';

    $(`${select2SearchId}`).empty();
    $(`${select2SearchId}`).append(`<option value="">ทั้งหมด</option>`);

    data.forEach((v) => {
        $(`${select2SearchId}`).append(`<option value="${v.attendanceType}">${v.attendanceType}</option>`);
    });
}

function clearSearchAttendanceOTForm() {
    let formId = '#form-search-salary-ot';
    $(`${formId} #input-search-emp-code`).val('');
    $(`${formId} #input-search-emp-name`).val('');
    $(`${formId} #input-search-start-date`).val('');
    $(`${formId} #input-search-end-date`).val('');
}
function callGetAttendanceOTList() {
    let formId = '#form-search-salary-ot';

    let empCode = ($(`${formId} #input-search-emp-code`).val() == '') ? null : $(`${formId} #input-search-emp-code`).val();
    let empName = ($(`${formId} #input-search-emp-name`).val() == '') ? null : $(`${formId} #input-search-emp-name`).val();
    let startDate = ($(`${formId} #input-search-start-date`).val() == '') ? null : $(`${formId} #input-search-start-date`).val();
    let endDate = ($(`${formId} #input-search-end-date`).val() == '') ? null : $(`${formId} #input-search-end-date`).val();

    let loaded = $('#tb-salary-ot-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/HR/GetAttendanceOTList?empCode=${empCode}&empName=${empName}&startDate=${startDate}&endDate=${endDate}`,
        success: function (data) {
            renderGetAttendanceOTList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function renderGetAttendanceOTList(data) {
    $('#tb-salary-ot-list').DataTable(
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
                $(row).attr('data-id', data.attendanceId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'empCode',
                },
                {
                    targets: 1,
                    data: 'employeeName',
                },
                {
                    targets: 2,
                    data: 'departmentName',
                },
                {
                    targets: 3,
                    data: 'salaryType',
                },
                {
                    targets: 4,
                    data: 'attendanceDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.attendanceDate ? convertDateTimeFormat(row.attendanceDate, 'DD/MM/YYYY') : "";
                    },
                },
                {
                    targets: 5,
                    data: 'diligenceAllowance',
                    className: "dt-body-right",
                    render: function (data, type, row) {
                        var amount = (row.diligenceAllowance == "0" || row.diligenceAllowance == "") ? 0 : parseFloat(row.diligenceAllowance).toFixed(2);
                        return (amount == 0) ? "-" : amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    },
                },
                {
                    targets: 6,
                    data: 'otHours',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return (row.otHours == "0" || row.otHours == "") ? "-" : row.otHours;
                    },
                },
                {
                    targets: 7,
                    data: 'ot',
                    className: "dt-body-right",
                    render: function (data, type, row) {
                        var amount = (row.ot == "0" || row.ot == "") ? 0 : parseFloat(row.ot).toFixed(2);
                        return (amount == 0) ? "-" : amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    },
                },
            ],
        }
    );
}

function renderEmpWarningDocumentList() {
    var data = [];

    data.push({ No: 1, document: "ใบปลด MB", documentUrl: "https://www.mbdesignth.com/fileUploads/files/ใบปลด%20MB.pdf", fileName:"ใบปลด.pdf" });
    data.push({ No: 2, document: "ฟอร์มหนังสือแจ้งการกระทำความผิดทางวินัย", documentUrl: "https://www.mbdesignth.com/fileUploads/files/ฟอร์มหนังสือแจ้งการกระทำความผิดทางวินัย.pdf", fileName: "ฟอร์มหนังสือแจ้งการกระทำความผิดทางวินัย.pdf" });

    $('#tb-emp-warning-document-list').DataTable(
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
                
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'No',
                },
                {
                    targets: 1,
                    data: 'document',
                },
                {
                    targets: 2,
                    data: 'documentUrl',
                    className: "dt-center",
                    render: function (data, type, row) {
                        let btnView = `<a class="btn" href="${row.documentUrl}" target="_blank"><img src="../images/analysis.png" width="25px" /></a>`;
                        return `${btnView}`;
                    },
                },
                {
                    targets: 3,
                    data: null,
                    className: "dt-center",
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-download-emp-warning" onclick="callDownloadFromUrl('${row.documentUrl}','${row.fileName}')"><img src="../images/pdf.png" width="25px" /></button>`;
                    },
                },
            ],
        }
    );
}

var _attendanceList = [];
function clearAttendanceModal() {
    $('#form-createAttendanceUpload #select-attendance-upload-file').val("");
    $('#form-createAttendanceUpload #select-attendance-upload-file').fileinput('destroy');
    $(`#form-createAttendanceUpload #select-attendance-upload-file`).fileinput({
        showBrowse: true,
        showUpload: true,
        showCaption: true,
        browseOnZoneClick: false,
        browseLabel: 'เลือกไฟล์'
    });
    var cleanData = []
    renderImportAttendance(cleanData);
    $('.btn-modal-save-attendance-upload').removeLoading();
}
function callImportAttendance() {
    let loaded = $('#tb-attendance-upload-list');

    loaded.prepend(_loader);

    var control = document.getElementById(`select-attendance-upload-file`);
    var files = control.files;
    var formData = new FormData();
    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }

    let url = `${app_settings.api_url}/api/HR/DoImportAttendance?createBy=${_userCode}`;

    $.ajax({
        url: url,
        type: "POST",
        contentType: false, // Do not set any content header
        processData: false, // Do not process data
        data: formData,
        async: false,
        //disableImageResize: /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
        success: function (result) {
            _attendanceList = result;
            renderImportAttendance(result);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            console.log(err);
            loaded.find(_loader).remove();
        }
    });
}
function renderImportAttendance(data) {
    $('#tb-attendance-upload-list').DataTable(
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
            columnDefs: [
                {
                    targets: 0,
                    data: 'empCode',
                },
                {
                    targets: 1,
                    data: 'attendanceDate',
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.attendanceDate ? convertDateTimeFormat(row.attendanceDate, 'DD/MM/YYYY') : "";
                    },
                },
                {
                    targets: 2,
                    data: 'attendanceTimeIn',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return row.attendanceTimeIn ? row.attendanceTimeIn : "";
                    },
                },
                {
                    targets: 3,
                    data: 'attendanceTimeOut',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return row.attendanceTimeOut ? row.attendanceTimeOut : "";
                    },
                },
            ],
        }
    );
}
function doInsertOrUpdateAttendance() {
    let loaded = $('#tb-attendance-upload-list');

    loaded.prepend(_loader);

    $('.btn-modal-save-attendance-upload').addLoading();

    let url = `${app_settings.api_url}/api/HR/AddOrUpdateAttendance`;

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(_attendanceList),
        success: (res) => {
            if (res.isResult) {
                callSuccessAlert();
                $('.btn-modal-save-attendance-upload').removeLoading();
                loaded.find(_loader).remove();
                $(`#modal-createAttendanceUpload`).modal('hide');
                callGetAttendanceList();
            }
            else {
                Swal.fire({
                    text: res.strResult,
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    confirmButtonText: 'ตกลง'
                });
                $('.btn-modal-save-attendance-upload').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-attendance-upload').removeLoading();
            loaded.find(_loader).remove();
        }
    });
}

function callDownloadFromUrl(url, fileName) {
    $.ajax({
        url: url,
        cache: false,
        xhr: function () {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 2) {
                    if (xhr.status == 200) {
                        xhr.responseType = "blob";
                    } else {
                        xhr.responseType = "text";
                    }
                }
            };
            return xhr;
        },
        success: function (data) {
            //Convert the Byte Data to BLOB object.
            var blob = new Blob([data], { type: "application/octetstream" });

            //Check the Browser type and download the File.
            var isIE = false || !!document.documentMode;
            if (isIE) {
                window.navigator.msSaveBlob(blob, fileName);
            } else {
                var url = window.URL || window.webkitURL;
                link = url.createObjectURL(blob);
                var a = $("<a />");
                a.attr("download", fileName);
                a.attr("href", link);
                $("body").append(a);
                a[0].click();
                $("body").remove(a);
            }
        }
    });
}

function generatePaySlip(salaryId) {
    let loaded = $('#tb-salary-summary-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Document/GetPaySlipInformation?salaryId=${salaryId}`,
        success: function (data) {
            renderPaySlipToPdf(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function renderPaySlipToPdf(data) {
    $('#spnGenDate').html(data.paySlipGenDate);

    $('#lblEmpCode').html(data.empCode);
    $('#lblEmpName').html(data.employeeName);
    $('#lblEmpDepartment').html(data.departmentName);

    $('#lblIncomeSalaryPayment').html(data.incomeSalaryPayment);
    $('#lblIncomeSalaryInformation').html(data.incomeSalaryInformation);
    $('#lblIncomeSalaryPeriod').html(data.incomeSalaryPeriod);
    $('#lblIncomeOtPayment').html(data.incomeOtPayment);
    $('#lblIncomeOtherPayment').html(data.incomeOtherPayment);
    $('#lblIncomeHomePayment').html(data.incomeHomePayment);
    $('#lblTotalIncome').html(data.totalIncome);

    $('#lblSocialPayment').html(data.socialPayment);
    $('#lblTaxPayment').html(data.taxPayment);
    $('#lblAdvancePayment').html(data.advancePayment);
    $('#lblElectricityPayment').html(data.electricityPayment);
    $('#lblInstallmentPayment').html(data.installmentPayment);
    $('#lblHomePayment').html(data.homePayment);
    $('#lblAttendancePayment').html(data.attendancePayment);
    $('#lblTotalPayment').html(data.totalPayment);

    $('#lblTotalPaymentThaiInformation').html(data.totalPaymentThaiInformation);

    let element = document.getElementById("reportPaySlipElement"); 
    HtmlToPdf(element, "paySlip");
}

const HtmlToPdf = (element, fileName) => {
    let opt = {
        margin: 5,
        //pagebreak: { mode: "avoid-all", before: "#page2el" },
        filename: fileName,
        image: { type: "svg", quality: 0.98 },
        html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf()
        .set(opt)
        .from(element)
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
            window.open(pdf.output('bloburl'), '_blank');
    });
};
var _leaveTypeId = 0;
var _leaveId = 0;
var _leave_action = "add";
function leaveTypeLoading() {
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
    //callGetLeaveInformationList();
    //callGetLeaveSummaryList();
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
                    className: `dt-center ${_role_leave_type_class_disaply}`,
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
                    className: `dt-center ${_role_leave_class_disaply}`,
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
function renderGetOtherPaymentList(data) {
    $('#tb-leave-list').DataTable(
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
                    className: `dt-center ${_role_leave_class_disaply}`,
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
function onChangeSelect2EmpCodeOtherPayment() {
    if (_selected_empCode_other_payment) {
        let empId = $('#form-createOtherPayment #select-empCode').val();
        _selected_empName_other_payment = false;
        $('#form-createOtherPayment #select-empName').val(empId).trigger('change');
    }
    _selected_empCode_other_payment = true;
}
function onChangeSelect2EmpNameOtherPayment() {
    if (_selected_empName_other_payment) {
        let empId = $('#form-createOtherPayment #select-empName').val();
        _selected_empCode_other_payment = false;
        $('#form-createOtherPayment #select-empCode').val(empId).trigger('change');
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
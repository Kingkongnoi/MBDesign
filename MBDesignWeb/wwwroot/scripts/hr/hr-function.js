var _leaveTypeId = 0;
function leaveTypeLoading() {
    callSelect2Status("#select-search-leave-status", true);
    callSelect2Status("#select-leave-type-status", false);

    callSelect2LeaveType(true);

    callGetLeaveTypeList();
}
function clearSearchLeaveType() {
    let formId = '#form-search-leave-type';
    $(`${formId} #select-search-leave-type`).val('').trigger('change');
    $(`${formId} #select-search-leave-status`).val('').trigger('change');
}
function callSelect2LeaveType() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/HR/GetSelect2LeaveTypeName`,
        success: function (data) {
            renderSelect2LeaveType(data);
        },
        error: function (err) {
        }
    });
}
function renderSelect2LeaveType(data, isSearch = true) {
    let formName = (isSearch) ? '#form-search-leave-type' : '';
    let select2Name = (isSearch) ? '#select-search-leave-type' : '';
    let select2FirstVal = (isSearch) ? 'ทั้งหมด' : 'กรุณาเลือก';

    $(`${formName} ${select2Name}`).empty();
    $(`${formName} ${select2Name}`).append(`<option value="">${select2FirstVal}</option>`);

    data.forEach((v) => {
        $(`${formName} ${select2Name}`).append(`<option value="${v.leaveTypeName}">${v.leaveTypeName}</option>`);
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
function callGetLeaveTypeById(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/HR/GetLeaveTypeById?leaveTypeId=${id}`,
        success: function (data) {
            renderLeaveTypeForm(data);
        },
        error: function (err) {

        }
    });
}
function renderLeaveTypeForm(data) {
    let status = (data.status) ? 1 : 0;
    let formId = '#form-editLeaveType';
    $(`${formId} input[name="input-leave-type-id"]`).val(data.leaveTypeId);
    $(`${formId} input[name="input-leave-days"]`).val(data.leaveTypeDays);
    $(`${formId} #input-leave-detail`).val(data.leaveTypeDetail);
    $(`${formId} #select-leave-type-status`).val(status).trigger('change');
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
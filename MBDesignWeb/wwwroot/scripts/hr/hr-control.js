$(function () {
    hrLoading();

    $('#click-leave-type').on('click', function () {
        hrLoading();
    });
    $('#form-search-leave-type .btn-clear-search-leave-type').on('click', function () {
        clearSearchLeaveType();
        callGetLeaveTypeList();
    });

    $('#form-search-leave-type .btn-search-leave-type').on('click', function () {
        callGetLeaveTypeList();
    });
    $(document).on('click', '.btn-edit-leave-type', function () {
        _leaveTypeId = $(this).data('id');
        clearEditLeaveTypeForm();
        callGetLeaveTypeById($(this).data('id'), "#modal-editLeaveType");
        $('#modal-editLeaveType').modal('show');
    });

    $('.btn-modal-save-leave-type').on('click', function () {
        DoUpdateLeaveType();
    });

    $('#tb-leave-type-list').on('click', 'tbody tr td:not(:last-child)', function () {
        var table = $('#tb-leave-type-list').DataTable();
        var row = table.row($(this)).data();
        clearEditLeaveTypeForm();
        callGetLeaveTypeById(row.leaveTypeId, "#modal-viewLeaveType");
        $('#modal-viewLeaveType').modal('show');
    });


    $('#form-search-leave-information .btn-clear-search-leave').on('click', function () {
        clearSearchLeaveInformation();
        callGetLeaveInformationList();
    });

    $('#form-search-leave-information .btn-search-leave').on('click', function () {
        callGetLeaveInformationList();
    });

    $('.btn-add-leave').on('click', function () {
        $(`#modal-createLeave #leaveHeader`).text('เพิ่มข้อมูลการลา');
        _leave_action = "add";
        clearLeaveForm();
        $('#modal-createLeave').modal('show');
    });

    $(document).on('click', '.btn-edit-leave', function () {
        $(`#modal-createLeave #leaveHeader`).text('แก้ไขข้อมูลการลา');
        _leave_action = "edit";
        _leaveId = $(this).data('id');
        clearLeaveForm();
        callGetLeaveById($(this).data('id'), "#modal-createLeave");
        $('#modal-createLeave').modal('show');
    });

    $('.btn-modal-save-leave').on('click', function () {
        DoUpdateLeave();
    });

    $('.btn-cal-leave-days').on('click', function () {
        calculateLeaveDays();
    });

    $('#tb-leave-list').on('click', 'tbody tr td:not(:last-child)', function () {
        var table = $('#tb-leave-list').DataTable();
        var row = table.row($(this)).data();
        clearLeaveForm();
        callGetLeaveById(row.leaveId, "#modal-viewLeave");
        $('#modal-viewLeave').modal('show');
    });


    $('#form-createLeave #select-leave-empName').on("select2:unselecting", function (e) {
        $('#form-createLeave #select-leave-empCode').val("").trigger("change");
    });

    $('#form-createLeave #select-leave-empCode').on("select2:unselecting", function (e) {
        $('#form-createLeave #select-leave-empName').val("").trigger("change");
    });

    $('#form-search-leave-summary .btn-clear-search-leave-summary').on('click', function () {
        clearSearchLeaveSummary();
        callGetLeaveSummaryList();
    });

    $('#form-search-leave-summary .btn-search-leave-summary').on('click', function () {
        callGetLeaveSummaryList();
    });

    $('#form-search-salary-other .btn-clear-search-other-payment').on('click', function () {
        clearSearchInstallmentForm();
        callGetOtherPaymentList();
    });

    $('#form-search-salary-other .btn-search-other-payment').on('click', function () {
        callGetOtherPaymentList();
    });

    $('.btn-add-other-payment').on('click', function () {
        clearInstallmentForm();
        $('#modal-createOtherPayment').modal('show');
    });

    $('#form-createOtherPayment #select-empName').on("select2:unselecting", function (e) {
        $('#form-createOtherPayment #select-empCode').val("").trigger("change");
    });

    $('#form-createOtherPayment #select-empCode').on("select2:unselecting", function (e) {
        $('#form-createOtherPayment #select-empName').val("").trigger("change");
    });
    $('.btn-modal-save-other-payment').on('click', function () {
        DoAddOtherPayment();
    });
    $('.btn-calculate-installment-payment').on('click', function () {
        calculateInstallmentPayment();
    });
    $('#tb-other-payment-list').on('click', 'tbody tr', function () {
        var table = $('#tb-other-payment-list').DataTable();
        var row = table.row($(this)).data();
        clearInstallmentForm();
        callGetOtherPaymentById(row.otherPaymentId, "#modal-viewOtherPayment");
        $('#modal-viewOtherPayment').modal('show');
    });

    $('.btn-add-attendance-time').on('click', function () {
        //clearLeaveForm();
        //$('#modal-createAttendanceUpload').modal('show');
    });

    $('.btn-add-attendance-setting').on('click', function () {
        $(`#modal-createAttendanceSetting #attendanceSettingHeader`).text('เพิ่มกำหนดเวลางาน');
        _attendance_setting_action = "add";
        clearAttendanceSettingForm();
        $('#modal-createAttendanceSetting').modal('show');
    });
    $(document).on('click', '.btn-edit-attendance-setting', function () {
        $(`#modal-createAttendanceSetting #attendanceSettingHeader`).text('แก้ไขกำหนดเวลางาน');
        _attendance_setting_action = "edit";
        _attendance_setting_id = $(this).data('id');
        clearAttendanceSettingForm();
        callGetAttendanceSettingById($(this).data('id'), "#modal-createAttendanceSetting");
        $('#modal-createAttendanceSetting').modal('show');
    });

    $('#form-search-attendance-setting .btn-clear-search-attendance-setting').on('click', function () {
        clearSearchAttendanceSettingForm();
        callGetAttendanceSettingList();
    });

    $('#form-search-attendance-setting .btn-search-attendance-setting').on('click', function () {
        callGetAttendanceSettingList();
    });
    $('.btn-modal-save-attendance-setting').on('click', function () {
        DoSaveAttendanceSetting();
    });
    $('#tb-attendance-setting-list').on('click', 'tbody tr td:not(:last-child)', function () {
        var table = $('#tb-attendance-setting-list').DataTable();
        var row = table.row($(this)).data();
        clearAttendanceSettingForm();
        callGetAttendanceSettingById(row.id, "#modal-viewAttendanceSetting");
        $('#modal-viewAttendanceSetting').modal('show');
    });

    $('#form-search-attendance-time .btn-clear-search-attendance-time').on('click', function () {
        clearSearchAttendanceForm();
        callGetAttendanceList();
    });

    $('#form-search-attendance-time .btn-search-attendance-time').on('click', function () {
        callGetAttendanceList();
    });

    $('#form-search-salary-calculate .btn-clear-search-salary-calculate').on('click', function () {
        clearSearchSalaryForm();
        callGetSalaryList();
    });

    $('#form-search-salary-calculate .btn-search-salary-calculate').on('click', function () {
        callGetSalaryList();
    });

    $('#form-search-salary-attendance .btn-search-salary-attendance').on('click', function () {
        callGetAttendanceSalaryList();
    });

    $('#form-search-salary-attendance .btn-clear-search-salary-attendance').on('click', function () {
        clearSearchAttendanceSalaryForm();
        callGetAttendanceSalaryList();
    });

    $('#form-search-salary-ot .btn-search-salary-ot').on('click', function () {
        callGetAttendanceOTList();
    });

    $('#form-search-salary-ot .btn-clear-search-salary-ot').on('click', function () {
        clearSearchAttendanceOTForm();
        callGetAttendanceOTList();
    });

    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).data("bs-target") // activated tab
        if (target == "#nav-leave-type") {
            clearSearchLeaveType();
            callGetLeaveTypeList();
        }
        else if (target == "#nav-leave-information") {
            clearSearchLeaveInformation();
            callGetLeaveInformationList();
        }
        else if (target == "#nav-leave-summary") {
            clearSearchLeaveSummary();
            callGetLeaveSummaryList();
        }
        else if (target == "#nav-salary-attendance") {
            clearSearchAttendanceSalaryForm();
            callGetAttendanceSalaryList();
        }
        else if (target == "#nav-salary-other") {
            clearSearchInstallmentForm();
            callGetOtherPaymentList();
        }
        else if (target == "#nav-salary-ot") {
            clearSearchAttendanceOTForm();
            callGetAttendanceOTList();
        }
        else if (target == "#nav-salary-bonus") {
        }
        else if (target == "#nav-salary-commission") {
        }
        else if (target == "#nav-salary-calculate") {
            clearSearchSalaryForm();
            callGetSalaryList();
        }
        else if (target == "#nav-attendance-time") {
            clearSearchAttendanceForm();
            callGetAttendanceList();
        }
        else if (target == "#nav-attendance-setting") {
            clearSearchAttendanceSettingForm();
            callSelect2AttendanceDepartmentStatus(`#form-createAttendanceSetting #select-attendance-status`);
            callSelect2ActiveDepartment();
            callGetAttendanceSettingList();
        }
    });
});
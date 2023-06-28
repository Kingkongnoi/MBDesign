$(function () {
    leaveTypeLoading();

    $('#click-leave-type').on('click', function () {
        leaveTypeLoading();
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

        }
        
    });
});
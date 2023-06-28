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

    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).data("bs-target") // activated tab
        if (target == "#nav-leave-type") {
            clearSearchLeaveType();
            callGetLeaveTypeList();
        }
        else if (target == "#nav-leave-information") {

        }
        else if (target == "#nav-leave-summary") {

        }
        
    });
});
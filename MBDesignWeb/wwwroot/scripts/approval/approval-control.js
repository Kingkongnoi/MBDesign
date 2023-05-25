$(function () {
    GetWaitApproveList();
    GetApproveHistoryList();
    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).data("bs-target") // activated tab
        if (target == "#nav-approve") {
            GetWaitApproveList();
        }
        else if (target == "#nav-approve-history") {
            GetApproveHistoryList();
        }
    });
});
let _order_id = 0;
let _design_3d_id = 0;
let _modal_primary_color_code = "#F09723";
let _modal_default_color_code = "#EFEFEF";

let _userId = localStorage.getItem('loginId');
let _userCode = localStorage.getItem('loginCode');
let _userName = localStorage.getItem('loginName');

let _loader = $('<div/>').addClass('loader');

function clearSearchForm() {
    let formId = '#form-search-3d-queue';

    $(`${formId} #input-search-3d-quotation-number`).val('');
    $(`${formId} #input-search-3d-design-name`).val('');
    $(`${formId} #select-search-3d-checklist-status`).val('').trigger('change');
    $(`${formId} #input-search-3d-install-date`).val('');
}
function callGet3DQueueList() {
    let formId = '#form-search-3d-queue';

    let quotationNumber = ($(`${formId} #input-search-3d-quotation-number`).val() == '') ? null : $(`${formId} #input-search-3d-quotation-number`).val();
    let empName = ($(`${formId} #input-search-3d-design-name`).val() == '') ? null : $(`${formId} #input-search-3d-design-name`).val();
    let checklistStatus = ($(`${formId} #select-search-3d-checklist-status`).val() == '') ? null : $(`${formId} #select-search-3d-checklist-status`).val();
    let installDate = ($(`${formId} #input-search-3d-install-date`).val() == '') ? null : $(`${formId} #input-search-3d-install-date`).val();

    let loaded = $('#tb-3d-queue-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Design3D/Get3DQueueList?quotationNumber=${quotationNumber}&empName=${empName}&checklistStatus=${checklistStatus}&installDate=${installDate}`,
        success: function (data) {
            renderGet3DQueueList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function renderGet3DQueueList(data) {
    $('#tb-3d-queue-list').DataTable(
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
                $(row).attr('data-orderid', data.orderId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'quotationNumber',
                    className: "quotationNumber-details",
                },
                {
                    targets: 1,
                    data: 'installDate',
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.installDate ? convertDateTimeFormat(row.installDate, 'DD/MM/YYYY') : "";
                    },
                },
                {
                    targets: 2,
                    data: 'ownerEmpName',
                },
                {
                    targets: 3,
                    data: 'dueDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.dueDate ? convertDateTimeFormat(row.dueDate, 'DD/MM/YYYY') : "";
                    },
                },
                {
                    targets: 4,
                    data: 'checklistStatus',
                    className: "dt-center",
                },
                {
                    targets: 5,
                    data: 'lastUpdateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.lastUpdateDate ? convertDateTimeFormat(row.lastUpdateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 6,
                    data: 'lastUpdateBy'
                },
                {
                    targets: 7,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_3d_class_display}`,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-3d" data-orderid="${row.orderId}" data-design3did="${row.design3dId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function callGetChecklistStatusSelect2() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Design3D/GetChecklistStatusSelect2`,
        success: function (data) {
            renderChecklistStatusSelect2(data);
        },
        error: function (err) {
        }
    });
}
function renderChecklistStatusSelect2(data) {
    $(`#form-search-3d-queue #select-search-3d-checklist-status`).empty();
    $(`#form-search-3d-queue #select-search-3d-checklist-status`).append(`<option value="">ทั้งหมด</option>`);
    data.forEach((v) => {
        $(`#form-search-3d-queue #select-search-3d-checklist-status`).append(`<option value="${v.checklistStatus}">${v.checklistStatus}</option>`);
    });
    $(`#form-search-3d-queue #select-search-3d-checklist-status`).val('').trigger('change');
}

function callGetDesign3DNameSelect2() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Design3D/GetDesign3DNameSelect2`,
        success: function (data) {
            renderDesign3DNameSelect2(data);
        },
        error: function (err) {
        }
    });
}
function renderDesign3DNameSelect2(data) {
    $(`#form-editDesign3D #select-edit-3d-designName`).empty();
    $(`#form-editDesign3D #select-edit-3d-designName`).append(`<option value="">กรุณาเลือก</option>`);
    data.forEach((v) => {
        $(`#form-editDesign3D #select-edit-3d-designName`).append(`<option value="${v.empId}">${v.fullName}</option>`);
    });
    $(`#form-editDesign3D #select-edit-3d-designName`).val('').trigger('change');
}

function clearInputForm() {
    let formId = '#form-editDesign3D';
    $(`${formId} #input-edit-3d-quotation`).val('');
    $(`${formId} #input-edit-3d-install-date`).val('');
    $(`${formId} #select-edit-3d-designName`).val('').trigger('change');
    $(`${formId} #input-edit-3d-due-date`).val('');
    $(`${formId} #input-edit-3d-checklist-status`).val('');
    $(`${formId} #chkFinal3D`).prop('checked', false);
}
function renderEditDesign3D(id) {
    $('#modal-editDesign3D').prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Design3D/GetDesign3DByOrderId?orderId=${id}`,
        success: function (data) {
            render3DToForm(data);
            $('#modal-editDesign3D').find(_loader).remove();
        },
        error: function (err) {
            $('#modal-editDesign3D').find(_loader).remove();
        }
    });
}
function render3DToForm(data) {
    let formId = '#form-editDesign3D';

    $(`${formId} #input-edit-3d-quotation`).val(data.custOrder.quotationNumber);
    var installDate = data.custOrder.installDate ? convertDateTimeFormat(data.custOrder.installDate, 'DD/MM/YYYY') : ""
    $(`${formId} #input-edit-3d-install-date`).val(installDate);

    if (data.custOrder.ownerEmpId == 0) {
        $(`${formId} #select-edit-3d-designName`).val('').trigger('change');
    }
    else {
        $(`${formId} #select-edit-3d-designName`).val(data.custOrder.ownerEmpId).trigger('change');
    }

    var dueDate = data.custOrder.dueDate ? convertDateTimeFormat(data.custOrder.dueDate, 'YYYY-MM-DD') : "";

    $(`${formId} #input-edit-3d-due-date`).val(dueDate);
    $(`${formId} #input-edit-3d-checklist-status`).val(data.custOrder.checklistStatus);

    renderImageUpload(formId, data.uploadRef, data.imagesForeman);

    $(`${formId} #chkFinal3D`).prop('checked', data.custOrder.isCheckFinal3d);
}
function renderImageUpload(formId, data, foreman) {
    var planImg = data.filter(v => { return v.categoryName == "CustOrderPlan" });

    var lstPlanUrl = [];
    var lstPreviewImg = [];
    planImg.forEach((a) => {
        lstPlanUrl.push(`${a.url}`);

        var addPreview = {
            caption: a.fileName,
            //width: '120px',
            //url: '/localhost/public/delete',
            key: a.uploadId,
            extra: { id: a.uploadId }
        };

        lstPreviewImg.push(addPreview);
    });

    $(`${formId} #display-picture-plan`).fileinput('destroy');
    if (planImg.length > 0) {
        $(`${formId} #display-picture-plan`).fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: false,
            showUpload: false,
            showCaption: false,
            initialPreview: lstPlanUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewImg
            ],
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }
    else {
        $(`${formId} #display-picture-plan`).fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: false,
            browseOnZoneClick: false,
            showCaption: false,
            showUpload: false,
            dropZoneTitle: "รอรูปแปลน"
        });
    }

    var refImg = data.filter(v => { return v.categoryName == "CustOrderReference" });

    var lstRefUrl = [];
    var lstPreviewRefImg = [];
    refImg.forEach((a) => {
        lstRefUrl.push(`${a.url}`);

        var addPreview = {
            caption: a.fileName,
            width: '120px',
            //url: '/localhost/public/delete',
            key: a.uploadId,
            extra: { id: a.uploadId }
        };

        lstPreviewRefImg.push(addPreview);
    });

    $(`${formId} #display-picture-reference`).fileinput('destroy');
    if (refImg.length > 0) {
        $(`${formId} #display-picture-reference`).fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: false,
            showUpload: false,
            showCaption: false,
            initialPreview: lstRefUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewRefImg
            ],
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }
    else {
        $(`${formId} #display-picture-reference`).fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: false,
            browseOnZoneClick: false,
            showCaption: false,
            showUpload: false,
            dropZoneTitle: "รอรูป Reference"
        });
    }

    var approved3dImg = data.filter(v => { return v.categoryName == "3dApproved" });

    var lstApproved3dUrl = [];
    var lstPreviewApproved3dImg = [];
    approved3dImg.forEach((a) => {
        lstApproved3dUrl.push(`${a.url}`);

        var addPreview = {
            caption: a.fileName,
            width: '120px',
            //url: '/localhost/public/delete',
            key: a.uploadId,
            extra: { id: a.uploadId }
        };

        lstPreviewApproved3dImg.push(addPreview);
    });

    $(`${formId} #select-3d-approve`).fileinput('destroy');
    if (approved3dImg.length > 0) {
        $(`${formId} #select-3d-approve`).fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: true,
            showUpload: true,
            showCaption: true,
            initialPreview: lstApproved3dUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewApproved3dImg
            ],
            //deleteUrl: "/site/file-delete",
            overwriteInitial: false,
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }
    else {
        $(`${formId} #select-3d-approve`).fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: true,
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์',
        });
    }

    var foremanImg = foreman.filter(v => { return v.categoryName == "foremanUpload" });

    var lstIdUrl = [];
    var lstPreviewIdImg = [];
    foremanImg.forEach((a) => {
        lstIdUrl.push(`${a.url}`);

        var addPreview = {
            caption: a.fileName,
            width: '120px',
            //url: '/localhost/public/delete',
            key: a.uploadId,
            extra: { id: a.uploadId }
        };

        lstPreviewIdImg.push(addPreview);
    });

    $(`${formId} #display-picture-from-foreman`).fileinput('destroy');
    if (foremanImg.length > 0) {
        $(`${formId} #display-picture-from-foreman`).fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: false,
            showUpload: false,
            showCaption: false,
            initialPreview: lstIdUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewIdImg
            ],
            browseOnZoneClick: false,
            browseLabel: 'เลือกไฟล์'
        });
    }
    else {
        $(`${formId} #display-picture-from-foreman`).fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: false,
            browseOnZoneClick: false,
            showCaption: false,
            showUpload: false,
            dropZoneTitle: "รอรูปภาพหน้างานจากโฟร์แมน"
        });
    }
}

let validateInput = function () {
    if ($('#form-editDesign3D #select-edit-3d-designName').val() == "") {
        Swal.fire({
            text: "กรุณาเลือกผู้รับผิดชอบออกแบบ 3D",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-editDesign3D #select-edit-3d-designName').focus();
        });
        return false;
    }
    return true;
};
function callSave3dDesign() {
    if (!validateInput()) { return; }

    Swal.fire({
        title: 'คุณต้องการบันทึกข้อมูลหรือไม่?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'บันทึก',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.close();
            DoSave3dDesign();
        }
    });
}
function DoSave3dDesign() {
    let formId = '#form-editDesign3D';
    let empId = $(`${formId} #select-edit-3d-designName`).val() == "" ? 0 : $(`${formId} #select-edit-3d-designName`).val();
    let dueDate = $(`${formId} #input-edit-3d-due-date`).val() == "" ? null : $(`${formId} #input-edit-3d-due-date`).val();
    let final3d = $(`${formId} #chkFinal3D`).prop('checked');

    let url = `${app_settings.api_url}/api/Design3D/DoUpdateDesign3D?orderId=${_order_id}&empId=${empId}&dueDate=${dueDate}&final3d=${final3d}&design3dId=${_design_3d_id}&loginCode=${_userCode}`;

    var control = document.getElementById(`select-3d-approve`);
    var files = control.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }

    $('.btn-modal-save-3d').addLoading();

    $.ajax({
        url: url,
        type: "POST",
        contentType: false, // Do not set any content header
        processData: false, // Do not process data
        data: formData,
        async: false,
        success: function (result) {
            if (result.isResult == true) {
                callSuccessAlert();
                $('.btn-modal-save-3d').removeLoading();
                $(`#modal-editDesign3D`).modal('hide');
                callGetChecklistStatusSelect2();
                callGet3DQueueList();
            }
        },
        error: function (err) {
            $('.btn-modal-save-3d').removeLoading();
        }
    });
}
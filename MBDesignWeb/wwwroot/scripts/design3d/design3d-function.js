function clearSearchForm() {
    let formId = '#form-search-3d-queue';

    $(`${formId} #input-search-3d-quotation-number`).val('');
    $(`${formId} #input-search-3d-design-name`).val('');
    $(`${formId} #select-search-3d-checklist-status`).val('').trigger('change');
    $(`${formId} #input-search-3d-install-date`).val('');
}
function callGet3DQueueList() {
    let formId = '#form-search-3d-queue';

    let quotationNumber = ($(`${formId} #input-search-3d-quotation-number`).val() == '') ? "%%" : $(`${formId} #input-search-3d-quotation-number`).val();
    let empName = ($(`${formId} #input-search-3d-design-name`).val() == '') ? "%%" : $(`${formId} #input-search-3d-design-name`).val();
    let checklistStatus = ($(`${formId} #select-search-3d-checklist-status`).val() == '') ? "%%" : $(`${formId} #select-search-3d-checklist-status`).val();
    let installDate = ($(`${formId} #input-search-3d-install-date`).val() == '') ? "%%" : $(`${formId} #input-search-3d-install-date`).val();

    //let loaded = $('#tb-quotation-list');

    //loaded.prepend(loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Design3D/Get3DQueueList?quotationNumber=${quotationNumber}&empName=${empName}&checklistStatus=${checklistStatus}&installDate=${installDate}`,
        success: function (data) {
            renderGet3DQueueList(data);
            //loaded.find(loader).remove();
        },
        error: function (err) {
            //loaded.find(loader).remove();
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
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.dueDate ? convertDateTimeFormat(row.dueDate, 'DD/MM/YYYY') : "";
                    },
                },
                {
                    targets: 4,
                    data: 'checklistStatus',
                },
                {
                    targets: 5,
                    data: 'lastUpdateDate',
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
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-3d" data-orderid="${row.orderId}"  title="แก้ไข">
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

function clearEditForm() {
    let formId = '#form-editDesign3D';

    $(`${formId} #input-edit-3d-quotation`).val('');
    $(`${formId} #select-edit-3d-designName`).val('').trigger('change');
    $(`${formId} #input-edit-3d-install-date`).val('');
    $(`${formId} #input-edit-3d-due-date`).val('');
    $(`${formId} #input-edit-3d-checklist-status`).val('');
}
function callGetDesign3DNameSelect2() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Design3D/GetDesign3DNameSelect2`,
        success: function (data) {
            renderDesign3DSelect2(data);
        },
        error: function (err) {
        }
    });
}
function renderDesign3DSelect2(data) {
    $(`#form-search-3d-queue #select-edit-3d-designName`).empty();
    $(`#form-search-3d-queue #select-edit-3d-designName`).append(`<option value="">กรุณาเลือก</option>`);
    data.forEach((v) => {
        $(`#form-search-3d-queue #select-edit-3d-designName`).append(`<option value="${v.checklistStatus}">${v.checklistStatus}</option>`);
    });
    $(`#form-search-3d-queue #select-edit-3d-designName`).val('').trigger('change');
}
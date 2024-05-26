let _loader = $('<div/>').addClass('loader');

let _modal_holiday_name = 'modal-createHoliday';
let _holiday_action = 'add';

let _modal_department_name = 'modal-createDepartment';
let _department_action = 'add';

let _modal_position_name = 'modal-createPosition';
let _position_action = 'add';

let _product_style_action = 'add';
let _product_type_action = 'add';
let _product_item_action = 'add';

let _action = 'add';
let _id = 0;
let _empId = 0;

let _emp_action = 'add';
let _role_action = 'add';

let _modal_primary_color_code = "#F09723";
let _modal_default_color_code = "#EFEFEF";

let _userId = localStorage.getItem('loginId');
let _userCode = localStorage.getItem('loginCode');
let _userName = localStorage.getItem('loginName');

let _procutQuickQT_action = "add";
let _issavecal = false;
let _issaveglasscal = false;
let _calCode = "";
let _calCodeClearGlass = "";
let totalRowCount = 0;
let rowCount = 0;

function callSelect2Status(id, isSearch = false) {
    $(id).empty();
    if (isSearch) {
        $(id).append(`<option value="">ทั้งหมด</option>`);
    }
    $(id).append(`<option value="1">ใช้งาน</option>`);
    $(id).append(`<option value="0">ไม่ใช้งาน</option>`);
}

function callGroupNameBySubGroup(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/SubGroup/GetGroupNameSelect`,
        success: function (data) {
            renderGroupNameSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}

function callEmpData(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Receiver/GetEmpDataSelect`,
        success: function (data) {
            renderEmpDataSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}

function callGroupData(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockProduct/GetGroupSelect`,
        success: function (data) {
            renderGroupDataSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}
function renderGroupNameSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.id}">${v.groupname}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}
function renderStockDataSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.id}">${v.stockname}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}

function renderUnitDataSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.id}">${v.unitname}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}
function renderEmpDataSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.id}">${v.empCode}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}
function renderRecieverSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.id}">${v.empCode} - ${v.empName}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}
function renderBrandDataSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.id}">${v.brandname}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}

function renderGroupDataSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.id}">${v.groupname}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}
function callSubGroupData(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockProduct/GetSubGroupSelect`,
        success: function (data) {
            renderSubGroupDataSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}
function callBrandData(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockProduct/GetBrandSelect`,
        success: function (data) {
            renderBrandDataSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}
function callStockData(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockProduct/GetStockSelect`,
        success: function (data) {
            renderStockDataSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}

function callUnitData(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockProduct/GetUnitSelect`,
        success: function (data) {
            renderUnitDataSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}

function callRecieverList(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Receiver/GetReciverList`,
        success: function (data) {

            renderRecieverSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}

function callGetGroupList() {
    let groupcode = ($('#form-search-Group #input-search-groupcode-items').val() == '' || $('#form-search-Group #input-search-groupcode-items').val() == undefined) ? 0 : $('#form-search-Group #input-search-groupcode-items').val();
    let groupname = ($('#form-search-Group #input-search-groupname-items').val() == '' || $('#form-search-Group #input-search-groupname-items').val() == undefined) ? null : $('#form-search-Group #input-search-groupname-items').val();
    let status = ($('#form-search-Group #select-search-group-status').val() == '' || $('#form-search-Group #select-search-group-status').val() == undefined) ? null : $('#form-search-Group #select-search-group-status').val();

    let loaded = $('#tb-group-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Group/GetGroupList?groupName=${groupname}&groupId=${groupcode}&status=${status}`,
        success: function (data) {

            if (data.length > 0) {
                renderGetItemGroupList(data);
                callGroupNameBySubGroup('#form-createSubGroup #select-group-name', 'กรุณาเลือก');
            }

            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function renderGetItemGroupList(data) {

    $('#tb-group-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            order: [],
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.id);
                /*   $(row).attr('data-typeid', data.typeId);*/
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "item-details",
                },
                {
                    targets: 1,
                    data: 'groupname',
                },
                {
                    targets: 2,
                    data: 'createDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 3,
                    data: 'createByName'
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
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-group" data-id="${row.id}" title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}

function callGetSubGroupList() {
    let code = ($('#form-search-subgroup #input-search-subgroupcode-items').val() == '' || $('#form-search-subgroup #input-search-subgroupcode-items').val() == undefined) ? null : $('#form-search-subgroup #input-search-subgroupcode-items').val();
    let name = ($('#form-search-subgroup #input-search-subgroupname-items').val() == '' || $('#form-search-subgroup #input-search-subgroupname-items').val() == undefined) ? null : $('#form-search-subgroup #input-search-subgroupname-items').val();
    let status = ($('#form-search-subgroup #select-search-subgroup-status').val() == '' || $('#form-search-subgroup #select-search-subgroup-status').val() == undefined) ? null : $('#form-search-subgroup #select-search-subgroup-status').val();

    let loaded = $('#tb-subgroup-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/SubGroup/GetSubGroupList?subgroupCode=${code}&subgroupName=${name}&status=${status}`,
        success: function (data) {

            if (data.length > 0) {
                renderGetItemSubGroupList(data);
            }

            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function callGetBrandList() {
    let brandcode = ($('#form-search-brand #input-search-brand-code').val() == '' || $('#form-search-brand #input-search-brand-code').val() == undefined) ? null : $('#form-search-brand #input-search-brand-code').val();
    let brandname = ($('#form-search-brand #input-search-brand-name').val() == '' || $('#form-search-brand #input-search-brand-name').val() == undefined) ? null : $('#form-search-brand #input-search-brand-name').val();
    let status = ($('#form-search-brand #select-search-brand-status').val() == '' || $('#form-search-brand #select-search-brand-status').val() == undefined) ? null : $('#form-search-brand #select-search-brand-status').val();

    let loaded = $('#tb-brand-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Brand/GetBrandList?brandcode=${brandcode}&brandname=${brandname}&status=${status}`,
        success: function (data) {

            if (data.length > 0) {
                renderGetItemBrandList(data);

            }

            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function callGetUnitList() {
    let id = ($('#form-search-Unit #input-search-unit-code').val() == '' || $('#form-search-Unit #input-search-unit-code').val() == undefined) ? 0 : $('#form-search-Unit #input-search-unit-code').val();
    let unitname = ($('#form-search-Unit #input-search-unit-name').val() == '' || $('#form-search-Unit #input-search-unit-name').val() == undefined) ? null : $('#form-search-Unit #input-search-unit-name').val();
    let status = ($('#form-search-Unit #select-search-unit-status').val() == '' || $('#form-search-Unit #select-search-unit-status').val() == undefined) ? null : $('#form-search-Unit #select-search-unit-status').val();

    let loaded = $('#tb-unit-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Unit/GetUnitList?id=${id}&unitname=${unitname}&status=${status}`,
        success: function (data) {

            if (data.length > 0) {
                renderGetItemUnitList(data);

            }

            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function callGetReceiverList() {
    let empcode = ($('#form-search-receiver #input-search-receiver-code').val() == '' || $('#form-search-receiver #input-search-receiver-code').val() == undefined) ? null : $('#form-search-receiver #input-search-receiver-code').val();
    let empname = ($('#form-search-receiver #input-search-receiver-name').val() == '' || $('#form-search-receiver #input-search-receiver-name').val() == undefined) ? null : $('#form-search-receiver #input-search-receiver-name').val();
    let status = ($('#form-search-receiver #select-search-receiver-status').val() == '' || $('#form-search-receiver #select-search-receiver-status').val() == undefined) ? null : $('#form-search-receiver #select-search-receiver-status').val();

    let loaded = $('#tb-receiver-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Receiver/GetReceiverList?empcode=${empcode}&empname=${empname}&status=${status}`,
        success: function (data) {

            if (data.length > 0) {
                renderGetItemReceiverList(data);
                callEmpData('#form-createReceiver #select-receiver-empcode', 'กรุณาเลือก');
            }

            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function callGetStockList() {
    let stockid = ($('#form-search-stock #input-search-stock-code').val() == '' || $('#form-search-stock #input-search-stock-code').val() == undefined) ? 0 : $('#form-search-stock #input-search-stock-code').val();
    let stockname = ($('#form-search-stock #input-search-stock-name').val() == '' || $('#form-search-stock #input-search-stock-name').val() == undefined) ? null : $('#form-search-stock #input-search-stock-name').val();
    let status = ($('#form-search-stock #select-search-stock-status').val() == '' || $('#form-search-stock #select-search-stock-status').val() == undefined) ? null : $('#form-search-stock #select-search-stock-status').val();

    let loaded = $('#tb-stock-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Stock/GetStockList?stockname=${stockname}&stockid=${stockid}&status=${status}`,
        success: function (data) {

            if (data.length > 0) {
                renderGetItemStockList(data);
                //callGroupNameBySubGroup('#form-createSubGroup #select-group-name', 'กรุณาเลือก');
            }

            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function callGetInList() {
    let docode = ($('#form-search-stockin #input-search-doc-code').val() == '' || $('#form-search-stockin #input-search-doc-code').val() == undefined) ? null : $('#form-search-stockin #input-search-doc-code').val();
    let saler = ($('#form-search-stockin #select-search-saler').val() == '' || $('#form-search-stockin #select-search-saler').val() == undefined) ? null : $('form-search-stockin #select-search-saler').val();
    let getin = ($('#form-search-stockin #input-search-getin-date').val() == '' || $('#form-search-stockin #input-search-getin-date').val() == undefined) ? null : $('form-search-stockin #input-search-getin-date').val();
    let stockinby = ($('#form-search-stockin #select-search-stockin-by').val() == '' || $('#form-search-stockin #select-search-stockin-by').val() == undefined) ? 0 : $('form-search-stockin #select-search-stockin-by').val();
    let stock = ($('#form-search-stockin #select-search-stockin-stock').val() == '' || $('#form-search-stockin #select-search-stockin-stock').val() == undefined) ? 0 : $('form-search-stockin #select-search-stockin-stock').val();
    let status = ($('#form-search-stockin #select-search-stockin-status').val() == '' || $('#form-search-stockin #select-search-stockin-status').val() == undefined) ? null : $('#form-search-stockin #select-search-stockin-status').val();
    let loaded = $('#tb-stockin-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockManage/GetStockInList?docode=${docode}&saler=${saler}&getin=${getin}&stockinby=${stockinby}&stock=${stock}&status=${status}`,
        success: function (data) {
            console.log(data);
            if (data.length > 0) {
                renderGetItemStockinList(data);
                //callGroupNameBySubGroup('#form-createSubGroup #select-group-name', 'กรุณาเลือก');
            }

            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function callGetOutList() {
    let docode = ($('#form-search-stockout #input-search-getout-doc-code').val() == '' || $('#form-search-stockout #input-search-getout-doc-code').val() == undefined) ? null : $('#form-search-stockout #input-search-getout-doc-code').val();
    let saler = ($('#form-search-stockout #select-search-getout-saler').val() == '' || $('#form-search-stockout #select-search-getout-saler').val() == undefined) ? null : $('form-search-stockout #select-search-getout-saler').val();
    let getin = ($('#form-search-stockout #input-search-getout-date').val() == '' || $('#form-search-stockout #input-search-getout-date').val() == undefined) ? null : $('form-search-stockout #input-search-getout-date').val();
    let stockinby = ($('#form-search-stockout #select-search-stockout-by').val() == '' || $('#form-search-stockout #select-search-stockout-by').val() == undefined) ? 0 : $('form-search-stockout #select-search-stockin-by').val();
    let stock = ($('#form-search-stockout #select-search-stockout-stock').val() == '' || $('#form-search-stockout #select-search-stockout-stock').val() == undefined) ? 0 : $('form-search-stockout #select-search-stockin-stock').val();
    let status = ($('#form-search-stockout #select-search-stockout-status').val() == '' || $('#form-search-stockout #select-search-stockout-status').val() == undefined) ? null : $('#form-search-stockout #select-search-stockin-status').val();
    let loaded = $('#tb-stockout-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockManage/GetStockOutList?docode=${docode}&saler=${saler}&getin=${getin}&stockinby=${stockinby}&stock=${stock}&status=${status}`,
        success: function (data) {
            console.log(data);
            if (data.length > 0) {
                renderWithdrawItemStockinList(data);
                //callGroupNameBySubGroup('#form-createSubGroup #select-group-name', 'กรุณาเลือก');
            }

            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function renderGetItemSubGroupList(data) {

    $('#tb-subgroup-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            order: [],
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.id);
                /*   $(row).attr('data-typeid', data.typeId);*/
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "hidecol",
                },
                {
                    targets: 1,
                    data: 'subgroupcode',
                    className: "item-details",
                },
                {
                    targets: 2,
                    data: 'subgroupname',
                },
                {
                    targets: 3,
                    data: 'groupname',
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
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-subgroup" data-id="${row.id}" title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}

function renderGetItemBrandList(data) {

    $('#tb-brand-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            order: [],
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.id);
                /*   $(row).attr('data-typeid', data.typeId);*/
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "hidecol",
                },
                {
                    targets: 1,
                    data: 'brandcode',
                    className: "item-details",
                },
                {
                    targets: 2,
                    data: 'brandname',
                },
                {
                    targets: 3,
                    data: 'createDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 4,
                    data: 'createByName'
                },
                {
                    targets: 5,
                    data: 'updateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 6,
                    data: 'updateByName'
                },
                {
                    targets: 7,
                    data: 'status',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 8,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-brand" data-id="${row.id}" title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}

function renderGetItemUnitList(data) {

    $('#tb-unit-list').DataTable(
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
                $(row).attr('data-id', data.id);
                /*   $(row).attr('data-typeid', data.typeId);*/
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "item-details",
                },
                {
                    targets: 1,
                    data: 'unitname',
                },
                {
                    targets: 2,
                    data: 'createDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 3,
                    data: 'createByName'
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
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-unit" data-id="${row.id}" title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}

function renderGetItemReceiverList(data) {

    $('#tb-receiver-list').DataTable(
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
                $(row).attr('data-id', data.id);
                /*   $(row).attr('data-typeid', data.typeId);*/
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "hidecol",
                },
                {
                    targets: 1,
                    data: 'empCode',
                    className: "item-details",
                },
                {
                    targets: 2,
                    data: 'empName',

                },
                {
                    targets: 3,
                    data: 'createDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 4,
                    data: 'createByName'
                },
                {
                    targets: 5,
                    data: 'updateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 6,
                    data: 'updateByName'
                },
                {
                    targets: 7,
                    data: 'status',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 8,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-receiver" data-id="${row.id}" title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}

function renderGetItemStockList(data) {

    $('#tb-stock-list').DataTable(
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
                $(row).attr('data-id', data.id);
                /*   $(row).attr('data-typeid', data.typeId);*/
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "item-details",
                },
                {
                    targets: 1,
                    data: 'stockname',
                },
                {
                    targets: 2,
                    data: 'createDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 3,
                    data: 'createByName'
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
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-stock" data-id="${row.id}" title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}

function renderWithdrawItemStockinList(data) {
    $('#tb-stockout-list').DataTable(
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
                /*   $(row).attr('data-typeid', data.typeId);*/
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "hidecol",
                },
                {
                    targets: 1,
                    data: 'documentcode',
                    className: "item-details"
                },

                {
                    targets: 2,
                    data: 'fullname',
                },
                {
                    targets: 3,
                    data: 'actiondate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.actiondate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 4,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-stockout" data-id="${row.id}" title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
                {
                    targets: 5,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-print-stockout" data-id="${row.id}" title="พิมพ์">
                    <i class="fa fa-print"></i></button>`;
                    },
                },
            ],
        }
    );
    //$('#tb-stockout-list').DataTable(
    //    {
    //        destroy: true,
    //        responsive: true,
    //        searching: false,
    //        data: data,
    //        dom: 'Bflrtip',
    //        oLanguage: {
    //            oPaginate: {
    //                sPrevious: "«",
    //                sNext: "»",
    //            }
    //        },
    //        createdRow: function (row, data) {
    //            $(row).attr('data-id', data.id);
    //            /*   $(row).attr('data-typeid', data.typeId);*/
    //        },
    //        columnDefs: [
    //            {
    //                targets: 0,
    //                data: 'id',
    //                className: "hidecol",
    //            },
    //            {
    //                targets: 1,
    //                data: 'documentcode',
    //                className: "item-details"
    //            },
    //            {
    //                targets: 2,
    //                data: 'stockproductcode',
    //                className: "item-details"
    //            },
    //            {
    //                targets: 3,
    //                data: 'productname',
    //            },
    //            {
    //                targets: 4,
    //                data: 'stockname',
    //            },
    //            {
    //                targets: 5,
    //                data: 'fullname',
    //            },
    //            {
    //                targets: 6,
    //                data: 'actiondate',
    //                className: "dt-center",
    //                render: function (data, type, row) {
    //                    return type === 'sort' ? data : row.actiondate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
    //                },
    //            },
    //            {
    //                targets: 7,
    //                data: 'unitname',

    //            },
    //            {
    //                targets: 8,
    //                data: 'productprice',

    //            },
    //            {
    //                targets: 9,
    //                data: 'amount',

    //            },
    //            {
    //                targets: 10,
    //                data: null,
    //                orderable: false,
    //                className: `dt-center ${_role_product_class_display}`,
    //                //className: cls,
    //                render: function (data, type, row) {
    //                    return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-stockout" data-id="${row.id}" title="แก้ไข">
    //                <i class="fa fa-edit"></i></button>`;
    //                },
    //            },
    //        ],
    //    }
    //);
}

function renderGetItemStockinList(data) {

    $('#tb-stockin-list').DataTable(
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
                /*   $(row).attr('data-typeid', data.typeId);*/
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "hidecol",
                },
                {
                    targets: 1,
                    data: 'documentcode',
                    className: "item-details"
                },

                {
                    targets: 2,
                    data: 'fullname',
                },
                {
                    targets: 3,
                    data: 'actiondate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.actiondate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 4,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-stockin" data-id="${row.id}" title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
                {
                    targets: 5,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-print-stockin" data-id="${row.id}" title="พิมพ์">
                    <i class="fa fa-print"></i></button>`;
                    },
                },
            ],
        }
    );
}

function renderGetItemStockProductList(data) {

    $('#tb-viewstock-list').DataTable(
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
                /*   $(row).attr('data-typeid', data.typeId);*/
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "hidecol",
                },
                {
                    targets: 1,
                    data: 'productcode',
                    className: "item-details",
                },
                {
                    targets: 2,
                    data: 'productname',
                },
                {
                    targets: 3,
                    data: 'groupname',
                },
                {
                    targets: 4,
                    data: 'subgroupname',
                },
                {
                    targets: 5,
                    data: 'brandname',
                },
                {
                    targets: 6,
                    data: 'stockname',
                },
                {
                    targets: 7,
                    data: 'productprice',
                },
                {
                    targets: 8,
                    data: 'stockamount',
                },
                {
                    targets: 9,
                    data: 'unitname',
                },
                {
                    targets: 10,
                    data: 'status',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 11,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-viewstock" data-id="${row.id}" title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}


function callGetLastestGetInItemId() {
    let url = `${app_settings.api_url}/api/StockManage/GetLastestGetinItemId`;

    $.ajax({
        url: url,
        type: 'GET',
        success: (res) => {
            $('#form-getInStock input[name="input-getInStock-code"]').val(res);
        },
        error: () => {
        }
    });
}

function callGetLastestGetOutItemId() {
    let url = `${app_settings.api_url}/api/StockManage/GetLastestGetOutItemId`;

    $.ajax({
        url: url,
        type: 'GET',
        success: (res) => {
            $('#form-getOutStock input[name="input-getOutStock-code"]').val(res);
        },
        error: () => {
        }
    });
}

function callGetStockProductList() {
    let productcode = ($('#form-search-viewstock #input-search-viewstock-code').val() == '' || $('#form-search-viewstock #input-search-viewstock-code').val() == undefined) ? null : $('#form-search-viewstock #input-search-viewstock-code').val();
    let productname = ($('#form-search-viewstock #input-search-viewstock-name').val() == '' || $('#form-search-viewstock #input-search-viewstock-name').val() == undefined) ? null : $('#form-search-viewstock #input-search-viewstock-name').val();
    let status = ($('#form-search-viewstock #select-search-viewstock-status').val() == '' || $('#form-search-viewstock #select-search-viewstock-status').val() == undefined) ? null : $('#form-search-viewstock #select-search-viewstock-status').val();
    let groupid = ($('#form-search-viewstock #select-search-viewstock-group').val() == '' || $('#form-search-viewstock #select-search-viewstock-group').val() == undefined) ? 0 : $('#form-search-viewstock #select-search-viewstock-group').val();
    let subgroupid = ($('#form-search-viewstock #select-search-viewstock-subgroup').val() == '' || $('#form-search-viewstock #select-search-viewstock-subgroup').val() == undefined) ? 0 : $('#form-search-viewstock #select-search-viewstock-subgroup').val();
    let brandid = ($('#form-search-viewstock #select-search-viewstock-brand').val() == '' || $('#form-search-viewstock #select-search-viewstock-brand').val() == undefined) ? 0 : $('#form-search-viewstock #select-search-viewstock-brand').val();
    let stockid = ($('#form-search-viewstock #select-search-viewstock-stock').val() == '' || $('#form-search-viewstock #select-search-viewstock-stock').val() == undefined) ? 0 : $('#form-search-viewstock #select-search-viewstock-stock').val();

    let loaded = $('#tb-viewstock-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockProduct/GetStockProductList?groupid=${groupid}&subgroupid=${subgroupid}&brandid=${brandid}&stockid=${stockid}&productcode=${productcode}&productname=${productname}&status=${status}`,
        success: function (data) {

            if (data.length > 0) {
                renderGetItemStockProductList(data);
                //callGroupNameBySubGroup('#form-createSubGroup #select-group-name', 'กรุณาเลือก');
            }

            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function clearForm(modal) {
    switch (modal) {
        case "modal-createGroup" || "modal-viewGroup":
            $('#form-createGroup input[name="input-group-code"]').val('');
            $('#form-createGroup input[name="input-group-name"]').val('');
            $('#form-createGroup #select-group-status').val(1).trigger('change');
            break;
        case "modal-createSubGroup" || "modal-viewSubGroup":
            $('#form-createSubGroup #select-group-name').val('').trigger('change');
            $('#form-createSubGroup input[name="input-subgroup-name"]').val('');
            $('#form-createSubGroup #select-subgroup-status').val(1).trigger('change');
            break;
        case "modal-createBrand" || "modal-viewBrand":
            $('#form-createBrand input[name="input-brand-code"]').val('');
            $('#form-createBrand input[name="input-brand-name"]').val('');
            $('#form-createBrand #select-brand-status').val(1).trigger('change');
            break;
        case "modal-createUnit" || "modal-viewUnit":
            $('#form-createUnit input[name="input-unit-code"]').val('');
            $('#form-createUnit input[name="input-unit-name"]').val('');
            $('#form-createUnit #select-unit-status').val(1).trigger('change');
            break;
        case "modal-createReceiver" || "modal-viewReceiver":
            $('#form-createReceiver #select-receiver-empcode').val(1).trigger('change');
            $('#form-createReceiver input[name="input-receiver-name"]').val('');
            $('#form-createReceiver #select-stock-status').val(1).trigger('change');
            break;
        case "modal-createStock" || "modal-viewStock":
            $('#form-createStock input[name="input-stock-code"]').val('');
            $('#form-createStock input[name="input-stock-name"]').val('');
            $('#form-createStock #select-stock-status').val(1).trigger('change');
            break;
        case "modal-createStockProduct" || "modal-viewStockProduct":
            $('#form-createStockProduct input[name="input-viewstock-code"]').val('');
            $('#form-createStockProduct #select-viewstock-status').val(1).trigger('change');
            $('#form-createStockProduct input[name="input-viewstock-name"]').val('');
            $('#form-createStockProduct #select-viewstock-group').val('').trigger('change');
            $('#form-createStockProduct #select-viewstock-subgroup').val('').trigger('change');
            $('#form-createStockProduct #select-viewstock-brand').val('').trigger('change');
            $('#form-createStockProduct #select-viewstock-stock').val('').trigger('change');
            $('#form-createStockProduct input[name="input-viewstock-price"]').val('');
            /*            $('#form-createStockProduct input[name="input-viewstock-amount"]').val('');*/
            $('#form-createStockProduct #select-viewstock-unit').val('').trigger('change');
            break;
        case "modal-getInStock":
            $('#form-getInStock #input-getInStock-code').val('');
            $('#form-getInStock #input-getInStock-dealer').val('');
            $('#form-getInStock #input-getInStock-date').val('');
            $('#form-getInStock #input-getInStock-amount').val('');
            $('#form-getInStock #input-getInStock-remark').val('');
            $('#form-getInStock #select-getInStock-by').val('').trigger('change');
            $('#form-getInStock #select-getInStock-Stock').val('').trigger('change');
            $('#form-getInStock #select-getInStock-Product').val('').trigger('change');
            $('#form-getInStock #select-getInStock-Product').empty();
            $('#form-getInStock #select-getInStock-Product').attr('disabled', 'disabled');
            $('#form-getInStock #select-getInStock-status').val(1).trigger('change');
            break;
        case "modal-getOutStock":
            $('#form-getOutStock #input-getOutStock-code').val('');
            $('#form-getOutStock #input-getOutStock-dealer').val('');
            $('#form-getOutStock #input-getOutStock-date').val('');
            $('#form-getOutStock #input-getOutStock-amount').val('');
            $('#form-getOutStock #input-getOutStock-remark').val('');
            $('#form-getOutStock #select-getOutStock-by').val('').trigger('change');
            $('#form-getOutStock #select-getOutStock-Stock').val('').trigger('change');
            $('#form-getOutStock #select-getOutStock-Product').val('').trigger('change');
            $('#form-getOutStock #select-getOutStock-Product').empty();
            $('#form-getOutStock #select-getOutStock-Product').attr('disabled', 'disabled');
            $('#form-getOutStock #select-getOutStock-status').val(1).trigger('change');
            break;
    }
}

function callGetItemById(id, typeId, modal, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Product/GetItemByItemId?itemId=${id}`,
        success: function (data) {
            renderItemForm(data.item, typeId);
            renderItemOptions(data.itemOptions, modal, isView);
        },
        error: function (err) {

        }
    });
}

function renderItemForm(data, typeId) {
    let status = (data.status) ? 1 : 0;
    $('#form-createProduct #select-product-type').val(typeId).trigger('change');
    $('#form-createProduct input[name="input-product-code"]').val(data.itemId);
    $('#form-createProduct input[name="input-product-name"]').val(data.itemName);
    $('#form-createProduct input[name="input-product-price"]').val(data.itemPrice);
    $('#form-createProduct #select-product-status').val(status).trigger('change');
}

function callGetGroupById(id, modal, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Group/GetItemByItemId?id=${id}`,
        success: function (data) {
            renderGroupForm(data.item);

        },
        error: function (err) {

        }
    });
}

function callGetManangeListByID(id, modal, selectype, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockManage/GetItemByItemId?id=${id}`,
        success: function (data) {
            renderStockProductManageForm(data, selectype);

        },
        error: function (err) {

        }
    });
}

function callGetStockById(id, modal, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Stock/GetItemByItemId?id=${id}`,
        success: function (data) {
            renderStockForm(data.item);

        },
        error: function (err) {

        }
    });
}
function callGetStockProductById(id, modal, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockProduct/GetItemByItemId?id=${id}`,
        success: function (data) {
            renderStockProductForm(data.item);

        },
        error: function (err) {

        }
    });
}
function callGetReceiverById(id, modal, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Receiver/GetItemByItemId?id=${id}`,
        success: function (data) {
            renderReceiverForm(data.item);

        },
        error: function (err) {

        }
    });
}

function callGetBrandById(id, modal, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Brand/GetItemByItemId?id=${id}`,
        success: function (data) {
            renderBrandForm(data.item);

        },
        error: function (err) {

        }
    });
}

function callGetSubGroupById(id, modal, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/SubGroup/GetItemByItemId?id=${id}`,
        success: function (data) {
            renderSubGroupForm(data.item);

        },
        error: function (err) {

        }
    });
}

function callGetUnitById(id, modal, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Unit/GetItemByItemId?id=${id}`,
        success: function (data) {
            renderUnitForm(data.item);

        },
        error: function (err) {

        }
    });
}

function renderSubGroupDataSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.id}">${v.subgroupname}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}
function callGroupID() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Group/GetLastestItemId`,
        success: function (data) {

            $('#form-createGroup input[name="input-group-code"]').val(data.id);
        },
        error: function (err) {

        }
    });
}

function callStockID() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Stock/GetLastestItemId`,
        success: function (data) {

            $('#form-createStock input[name="input-stock-code"]').val(data.id);
        },
        error: function (err) {

        }
    });
}

function callStockProductCode() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockProduct/GetLastestItemId`,
        success: function (data) {

            $('#form-createStockProduct input[name="input-viewstock-code"]').val(data);
        },
        error: function (err) {

        }
    });
}

function callBrandCode() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Brand/GetLastestBrandCode`,
        success: function (data) {

            $('#form-createBrand input[name="input-brand-code"]').val(data);
        },
        error: function (err) {

        }
    });
}

function callUnitID() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Unit/GetLastestItemId`,
        success: function (data) {
            $('#form-createUnit input[name="input-unit-code"]').val(data);
        },
        error: function (err) {

        }
    });
}

function clearSearchForm(area) {
    switch (area) {
        case "group":
            $('#form-search-Group #input-search-groupcode-items').val('');
            $('#form-search-Group #input-search-groupname-items').val('');
            $('#form-search-Group #select-search-group-status').val('').trigger('change');
            break;
        case "subgroup":
            $('#form-search-subgroup #input-search-subgroupcode-items').val('');
            $('#form-search-subgroup #input-search-subgroupname-items').val('');
            $('#form-search-subgroup #select-search-subgroup-status').val('').trigger('change');
            break; sub
        case "brand":
            $('#form-search-brand #input-search-brand-code').val('');
            $('#form-search-brand #input-search-brand-name').val('');
            $('#form-search-brand #select-search-brand-status').val('').trigger('change');
            break;
        case "unit":
            $('#form-search-Unit #input-search-unit-code').val('');
            $('#form-search-Unit #input-search-unit-name').val('');
            $('#form-search-Unit #select-search-unit-status').val('').trigger('change');
            break;
        case "receiver":
            $('#form-search-receiver #input-search-receiver-code').val('');
            $('#form-search-receiver #input-search-receiver-name').val('');
            $('#form-search-receiver #select-search-receiver-status').val('').trigger('change');
            break;
        case "stock":
            $('#form-search-stock #input-search-stock-code').val('');
            $('#form-search-stock #input-search-stock-name').val('');
            $('#form-search-stock #select-search-stock-status').val('').trigger('change');
            break;
        case "viewstock":
            $('#form-search-viewstock input[name="input-search-viewstock-code"]').val('');
            $('#form-search-viewstock #select-search-viewstock-status').val('').trigger('change');
            $('#form-search-viewstock input[name="input-search-viewstock-name"]').val('');
            $('#form-search-viewstock #select-search-viewstock-group').val('').trigger('change');
            $('#form-search-viewstock #select-search-viewstock-subgroup').val('').trigger('change');
            $('#form-search-viewstock #select-search-viewstock-brand').val('').trigger('change');
            $('#form-search-viewstock #select-search-viewstock-stock').val('').trigger('change');
            $('#form-search-viewstock input[name="input-search-viewstock-price"]').val('');
            $('#form-search-viewstock input[name="input-search-viewstock-amount"]').val('');

            break;
        case "stockin":
            $('#form-search-stockin #input-search-doc-code').val('');
            $('#form-search-stockin #select-search-saler').val('');
            $('#form-search-stockin #input-search-getin-date').val('');
            $('#form-search-stockin #select-search-stockin-by').val('').trigger('change');
            $('#form-search-stockin #select-search-stockin-stock').val('').trigger('change');
            $('#form-search-stock #select-search-stockin-status').val('').trigger('change');
            break;
        case "stockout":
            $('#form-search-stockin #input-search-getout-doc-code').val('');
            $('#form-search-stockin #select-search-getout-saler').val('');
            $('#form-search-stockin #input-search-getout-date').val('');
            $('#form-search-stockin #select-search-stockout-by').val('').trigger('change');
            $('#form-search-stockin #select-search-stockout-stock').val('').trigger('change');
            $('#form-search-stock #select-search-stockout-status').val('').trigger('change');
            break;
    }
}

function callAddOrUpdateSubGroup() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/SubGroup/AddItem` : `${app_settings.api_url}/api/SubGroup/UpdateItem`;


    var obj = {
        id: $("#input-subgroup-id").val(),
        subgroupcode: $('#input-subgroup-code').val(),
        subgroupname: $('#input-subgroup-name').val(),
        groupid: $('#select-group-name').val(),
        status: ($('#form-createSubGroup #select-subgroup-status').val() == "1") ? true : false,
        loginCode: _userCode
    };

    $('.btn-modal-save-subgroup').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-subgroup').removeLoading();
                $(`#modal-createSubGroup`).modal('hide');
                callGetSubGroupList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อหมวดหมู่หลักมีอยู่แล้ว กรุณากรอกชื่อหมวดหมู่หลักอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createSubGroup #input-subgroup-name').focus();
                    });
                }
                $('.btn-modal-save-subgroup').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-subgroup').removeLoading();
        }
    });

}

function DoAddOrUpdateBrand(modal) {
    if (!validateInputStore(modal)) return;

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
            callAddOrUpdateBrand(_product_item_action);
        }
    });
}

function callAddOrUpdateBrand() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/Brand/AddItem` : `${app_settings.api_url}/api/Brand/UpdateItem`;


    var obj = {
        id: ($('#input-brand-id').val() == "") ? 0 : $('#input-brand-id').val(),
        brandcode: $('#input-brand-code').val(),
        brandname: $('#input-brand-name').val(),
        status: ($('#form-createBrand #select-brand-status').val() == "1") ? true : false,
        loginCode: _userCode
    };


    $('.btn-modal-save-brand').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-brand').removeLoading();
                $(`#modal-createBrand`).modal('hide');
                callGetBrandList();
                $('.btn-modal-save-brand').removeLoading();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อแบรนด์สินค้ามีอยู่แล้ว กรุณากรอกชื่อแบรนด์สินค้าอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createBrand #input-brand-name').focus();
                    });
                }
                $('.btn-modal-save-brand').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-brand').removeLoading();
        }
    });

}

function DoAddOrUpdateUnit(modal) {
    if (!validateInputStore(modal)) return;

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
            callAddOrUpdateUnit(_product_item_action);
        }
    });
}

function callAddOrUpdateUnit() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/Unit/AddItem` : `${app_settings.api_url}/api/Unit/UpdateItem`;


    var obj = {
        id: $('#input-unit-code').val(),
        unitname: $('#input-unit-name').val(),
        status: ($('#form-createUnit #select-unit-status').val() == "1") ? true : false,
        loginCode: _userCode
    };

    $('.btn-modal-save-unit').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-unit').removeLoading();
                $(`#modal-createUnit`).modal('hide');
                callGetUnitList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อหมวดหมู่หลักมีอยู่แล้ว กรุณากรอกชื่อหมวดหมู่หลักอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createUnit #input-unit-name').focus();
                    });
                }
                $('.btn-modal-save-unit').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-unit').removeLoading();
        }
    });

}
function DoAddOrUpdateStockProduct(modal) {
    if (!validateInputStore(modal)) return;

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
            callAddOrUpdateStockProduct(_product_item_action);
        }
    });
}

function callAddOrUpdateStockProduct() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/StockProduct/AddItem` : `${app_settings.api_url}/api/StockProduct/UpdateItem`;


    var obj = {
        id: ($('#input-viewstock-id').val() == "") ? 0 : $('#input-viewstock-id').val(),
        productcode: $('#input-viewstock-code').val(),
        productname: $('#input-viewstock-name').val(),
        productprice: $('#input-viewstock-price').val(),
        /*     stockamount: $('#input-viewstock-amount').val(),*/
        groupid: $('#form-createStockProduct #select-viewstock-group').val(),
        subgroupid: $('#form-createStockProduct #select-viewstock-subgroup').val(),
        brandid: $('#form-createStockProduct #select-viewstock-brand').val(),
        stockid: $('#form-createStockProduct #select-viewstock-stock').val(),
        unitmasterid: $('#form-createStockProduct #select-viewstock-unit').val(),
        status: ($('#form-createStockProduct #select-viewstock-status').val() == "1") ? true : false,
        loginCode: _userCode
    };
    console.log(JSON.stringify(obj));

    $('.btn-modal-save-viewstock').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-viewstock').removeLoading();
                $(`#modal-createStockProduct`).modal('hide');
                callGetStockProductList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อแบรนด์สินค้ามีอยู่แล้ว กรุณากรอกชื่อแบรนด์สินค้าอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createStockProduct #input-viewstock-name').focus();
                    });
                }
                $('.btn-modal-save-viewstock').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-viewstock').removeLoading();
        }
    });

}
function DoAddOrUpdateReceiver(modal) {
    if (!validateInputStore(modal)) return;

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
            callAddOrUpdateReceiver(_product_item_action);
        }
    });
}

function callAddOrUpdateReceiver() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/Receiver/AddItem` : `${app_settings.api_url}/api/Receiver/UpdateItem`;

    var obj = {
        id: ($('#form-createReceiver #input-receiver-id').val() == '') ? 0 : $('#form-createReceiver #input-receiver-id').val(),
        empid: $('#form-createReceiver #select-receiver-empcode').val(),
        status: ($('#form-createReceiver #select-receiver-status').val() == "1") ? true : false,
        loginCode: _userCode
    };

    $('.btn-modal-save-receiver').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-receiver').removeLoading();
                $(`#modal-createReceiver`).modal('hide');
                callGetReceiverList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อหมวดหมู่หลักมีอยู่แล้ว กรุณากรอกชื่อหมวดหมู่หลักอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createReceiver #input-unit-name').focus();
                    });
                }
                $('.btn-modal-save-receiver').removeLoading()
            }
        },
        error: () => {
            $('.btn-modal-save-receiver').removeLoading();
        }
    });

}

let validateInputStore = function (modal) {
    switch (modal) {
        case "modal-createGroup":
            if ($('#form-createGroup #input-group-code').val() == "") {
                Swal.fire({
                    text: "กรุณารอระบบ generate รหัสหมวดหมู่หลัก",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createGroup #input-group-code').focus();
                });
                return false;
            }
            else if ($('#form-createGroup #input-group-name').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อหมวดหมู่หลัก",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createGroup #input-group-name').focus();
                });
                return false;
            }

            else { return true; }
            break;
        case "modal-createSubGroup":

            if ($('#form-createSubGroup #input-subgroup-code').val() == "") {
                Swal.fire({
                    text: "กรุณารอระบบ generate รหัสหมวดหมู่ย่อย",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createSubGroup #input-subgroup-code').focus();
                });
                return false;
            }
            else if ($('#form-createSubGroup #input-subgroup-name').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อหมวดหมู่หลัก",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createSubGroup #input-subgroup-name').focus();
                });
                return false;
            }
            else if ($('#form-createSubGroup #input-subgroup-name').val() == "" && $('#form-createSubGroup #select-group-name').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกหมวดหมู่เพื่อ generate รหัสหมวดหมู่ย่อย",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createSubGroup #select-group-name').focus();
                });
                return false;
            }
            else { return true; }
            break;
        case "modal-createBrand":
            if ($('#form-createBrand #input-brand-code').val() == "") {
                Swal.fire({
                    text: "กรุณารอระบบ generate รหัสแบรนด์สินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createBrand #input-brand-code').focus();
                });
                return false;
            }
            else if ($('#form-createBrand #input-brand-name').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อแบรนด์สินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createBrand #input-brand-name').focus();
                });
                return false;
            }

            else { return true; }
            break;
        case "modal-createUnit":
            if ($('#form-createUnit #input-unit-code').val() == "") {
                Swal.fire({
                    text: "กรุณารอระบบ generate รหัสหน่วยสินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createUnit #input-unit-code').focus();
                });
                return false;
            }
            else if ($('#form-createUnit #input-unit-name').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อหน่วยสินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createUnit #input-unit-name').focus();
                });
                return false;
            }

            else { return true; }
            break;
        case "modal-createReceiver":
            if ($('#form-createReceiver #select-receiver-empcode').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกรหัสพนักงาน",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createReceiver #select-receiver-empcode').focus();
                });
                return false;
            }
            else if ($('#form-createReceiver #input-receiver-name').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกรหัสพนักงาน",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createReceiver #select-receiver-empcode').focus();
                });
                return false;
            }

            else { return true; }
            break;
        case "modal-createStock":
            if ($('#form-createStock #input-stock-code').val() == "") {
                Swal.fire({
                    text: "กรุณารอระบบ generate รหัสหมวดคลังสินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStock #input-stock-code').focus();
                });
                return false;
            }
            else if ($('#form-createStock #input-stock-name').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อคลังสินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStock #input-stock-name').focus();
                });
                return false;
            }

            else { return true; }
            break;
        case "modal-createStockProduct":
            if ($('#form-createStockProduct #input-viewstock-code').val() == "") {
                Swal.fire({
                    text: "กรุณารอระบบ generate รหัสสินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStockProduct #input-viewstock-code').focus();
                });
                return false;
            }
            else if ($('#form-createStockProduct #input-viewstock-name').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อสินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStockProduct #input-viewstock-name').focus();
                });
                return false;
            }
            else if ($('#form-createStockProduct #select-viewstock-group').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกหมวดหมู่",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStockProduct #select-viewstock-group').focus();
                });
                return false;
            }
            else if ($('#form-createStockProduct #select-viewstock-subgroup').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกหมวดหมู่ย่อย",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStockProduct #select-viewstock-subgroup').focus();
                });
                return false;
            }
            else if ($('#form-createStockProduct #select-viewstock-brand').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกแบรนด์สินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStockProduct #select-viewstock-brand').focus();
                });
                return false;
            }
            else if ($('#form-createStockProduct #select-viewstock-stock').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกคลังสินค้า",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStockProduct #select-viewstock-stock').focus();
                });
                return false;
            }
            else if ($('#form-createStockProduct #input-viewstock-price').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกราคา",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStockProduct #input-viewstock-price').focus();
                });
                return false;
            }
            //else if ($('#form-createStockProduct #input-viewstock-amount').val() == "") {
            //    Swal.fire({
            //        text: "กรุณากรอกจำนวน",
            //        icon: 'warning',
            //        showCancelButton: false,
            //        confirmButtonColor: _modal_primary_color_code,
            //        //cancelButtonColor: _modal_default_color_code,
            //        confirmButtonText: 'ตกลง'
            //    }).then((result) => {
            //        $('#form-createStockProduct #input-viewstock-amount').focus();
            //    });
            //    return false;
            //}
            else if ($('#form-createStockProduct #select-viewstock-stock').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกหน่วย",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createStockProduct #select-viewstock-stock').focus();
                });
                return false;
            }
            else { return true; }
            break;
        case "modal-getInStock":
            var table = document.getElementById("tb-stockin-detail");
            var tbodyRowCount = table.tBodies[0].rows.length;
            if (tbodyRowCount == 0) {
                Swal.fire({
                    text: "กรุณาเพิ่มข้อมูลก่อนทำการบันทึก",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    /* $('#form-getInStock #input-getInStock-code').focus();*/
                });
                return false;
            }
            //else if ($('#form-getInStock #input-getInStock-date').val() == "") {
            //    Swal.fire({
            //        text: "กรุณาเลือกวันที่รับเข้า",
            //        icon: 'warning',
            //        showCancelButton: false,
            //        confirmButtonColor: _modal_primary_color_code,
            //        //cancelButtonColor: _modal_default_color_code,
            //        confirmButtonText: 'ตกลง'
            //    }).then((result) => {
            //        $('#form-getInStock #input-getInStock-date').focus();
            //    });
            //    return false;
            //}
            //else if ($('#form-getInStock #input-getInStock-dealer').val() == "") {
            //    Swal.fire({
            //        text: "กรุณากรอกผู้ผลิต/ผู้ขาย",
            //        icon: 'warning',
            //        showCancelButton: false,
            //        confirmButtonColor: _modal_primary_color_code,
            //        //cancelButtonColor: _modal_default_color_code,
            //        confirmButtonText: 'ตกลง'
            //    }).then((result) => {
            //        $('#form-getInStock #input-getInStock-dealer').focus();
            //    });
            //    return false;
            //}
            //else if ($('#form-getInStock #select-getInStock-by').val() == "") {
            //    Swal.fire({
            //        text: "กรุณาเลือกผูรับเข้า",
            //        icon: 'warning',
            //        showCancelButton: false,
            //        confirmButtonColor: _modal_primary_color_code,
            //        //cancelButtonColor: _modal_default_color_code,
            //        confirmButtonText: 'ตกลง'
            //    }).then((result) => {
            //        $('#form-getInStock #select-getInStock-by').focus();
            //    });
            //    return false;
            //}
            //else if ($('#form-getInStock #select-getInStock-Stock').val() == "") {
            //    Swal.fire({
            //        text: "กรุณาเลือกคลังสินค้า",
            //        icon: 'warning',
            //        showCancelButton: false,
            //        confirmButtonColor: _modal_primary_color_code,
            //        //cancelButtonColor: _modal_default_color_code,
            //        confirmButtonText: 'ตกลง'
            //    }).then((result) => {
            //        $('#form-getInStock #select-getInStock-Stock').focus();
            //    });
            //    return false;
            //}
            //else if ($('#form-getInStock #select-getInStock-Product').val() == "") {
            //    Swal.fire({
            //        text: "กรุณาเลือกสินค้า",
            //        icon: 'warning',
            //        showCancelButton: false,
            //        confirmButtonColor: _modal_primary_color_code,
            //        //cancelButtonColor: _modal_default_color_code,
            //        confirmButtonText: 'ตกลง'
            //    }).then((result) => {
            //        $('#form-getInStock #select-getInStock-Product').focus();
            //    });
            //    return false;
            //}
            else { return true; }
            break;
        case "modal-getOutStock":
            var table = document.getElementById("tb-stockout-detail");
            var tbodyRowCount = table.tBodies[0].rows.length;
            if (tbodyRowCount == 0) {
                Swal.fire({
                    text: "กรุณาเพิ่มข้อมูลก่อนทำการบันทึก",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    /* $('#form-getInStock #input-getInStock-code').focus();*/
                });
                return false;
            }
            else { return true; }
            //if ($('#form-getOutStock #input-getOutStock-code').val() == "") {
            //    Swal.fire({
            //        text: "กรุณารอระบบ generate เลขที่เอกสารอ้างอิง",
            //        icon: 'warning',
            //        showCancelButton: false,
            //        confirmButtonColor: _modal_primary_color_code,
            //        //cancelButtonColor: _modal_default_color_code,
            //        confirmButtonText: 'ตกลง'
            //    }).then((result) => {
            //        $('#form-getInStock #input-getOutStock-code').focus();
            //    });
            //    return false;
            //}
            //else if ($('#form-getOutStock #input-getOutStock-date').val() == "") {
            //    Swal.fire({
            //        text: "กรุณาเลือกวันที่รับเข้า",
            //        icon: 'warning',
            //        showCancelButton: false,
            //        confirmButtonColor: _modal_primary_color_code,
            //        //cancelButtonColor: _modal_default_color_code,
            //        confirmButtonText: 'ตกลง'
            //    }).then((result) => {
            //        $('#form-getOutStock #input-getOutStock-date').focus();
            //    });
            //    return false;
            //}
            //else if ($('#form-getOutStock #input-getOutStock-dealer').val() == "") {
            //    Swal.fire({
            //        text: "กรุณากรอกผู้ผลิต/ผู้ขาย",
            //        icon: 'warning',
            //        showCancelButton: false,
            //        confirmButtonColor: _modal_primary_color_code,
            //        //cancelButtonColor: _modal_default_color_code,
            //        confirmButtonText: 'ตกลง'
            //    }).then((result) => {
            //        $('#form-getOutStock #input-getOutStock-dealer').focus();
            //    });
            //    return false;
            //}
            //else if ($('#form-getOutStock #select-getOutStock-by').val() == "") {
            //    Swal.fire({
            //        text: "กรุณาเลือกผูรับเข้า",
            //        icon: 'warning',
            //        showCancelButton: false,
            //        confirmButtonColor: _modal_primary_color_code,
            //        //cancelButtonColor: _modal_default_color_code,
            //        confirmButtonText: 'ตกลง'
            //    }).then((result) => {
            //        $('#form-getOutStock #select-getOutStock-by').focus();
            //    });
            //    return false;
            //}
            //else if ($('#form-getOutStock #select-getOutStock-Stock').val() == "") {
            //    Swal.fire({
            //        text: "กรุณาเลือกคลังสินค้า",
            //        icon: 'warning',
            //        showCancelButton: false,
            //        confirmButtonColor: _modal_primary_color_code,
            //        //cancelButtonColor: _modal_default_color_code,
            //        confirmButtonText: 'ตกลง'
            //    }).then((result) => {
            //        $('#form-getOutStock #select-getOutStock-Stock').focus();
            //    });
            //    return false;
            //}
            //else if ($('#form-getOutStock #select-getOutStock-Product').val() == "") {
            //    Swal.fire({
            //        text: "กรุณาเลือกสินค้า",
            //        icon: 'warning',
            //        showCancelButton: false,
            //        confirmButtonColor: _modal_primary_color_code,
            //        //cancelButtonColor: _modal_default_color_code,
            //        confirmButtonText: 'ตกลง'
            //    }).then((result) => {
            //        $('#form-getOutStock #select-getOutStock-Product').focus();
            //    });
            //    return false;
            //}
            //else { return true; }
            break;
    }

};


function callAddOrUpdateGetinStock() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/StockManage/AddItem` : `${app_settings.api_url}/api/StockManage/UpdateItem`;
    let loaded = $('#tb-stockin-detail');
    loaded.prepend(_loader);
    var ManageData = new Array();
    //var obj = {
    //    id: ($('#input-getin-id').val() == "") ? 0 : $('#input-getin-id').val(),
    //    documentcode: $('#input-getInStock-code').val(),
    //    stockid: $('#form-getInStock #select-getInStock-Stock').val(),
    //    stockproductcode: $('#form-getInStock #select-getInStock-Product').val(),
    //    dealername: $('#input-getInStock-dealer').val(),
    //    receiverid: $('#form-getInStock #select-getInStock-by').val(),
    //    actiondate: $('#input-getInStock-date').val(),
    //    actiontype: 'I',
    //    amount: $('#input-getInStock-amount').val(),
    //    remark: $('#input-getInStock-remark').val(),
    //    status: ($('#form-getInStock #select-getInStock-status').val() == "1") ? true : false,
    //    loginCode: _userCode
    //};
    var table = document.getElementById("tb-stockin-detail");
    var tbodyRowCount = table.tBodies[0].rows.length;
    if (tbodyRowCount > 0) {
        $("#tb-stockin-detail tbody tr").each(function () {
            var row = $(this);
            var ManageDetail = {};
            ManageDetail.id = row.find("td").eq(0).html();
            ManageDetail.stockid = row.find("td").eq(1).html();
            ManageDetail.stockproductcode = row.find("td").eq(2).html();
            /*            ManageDetail.calhm = row.find("td").eq(3).html();*/
            /*ManageDetail.dealername = row.find("td").eq(4).html();*/
            ManageDetail.dealername = row.find("td").eq(5).html();
            //ManageDetail.calw = row.find("td").eq(6).html();
            //ManageDetail.calhdel = row.find("td").eq(7).html();
            ManageDetail.amount = row.find("td").eq(8).html();
            ManageDetail.remark = row.find("td").eq(9).html();
            ManageData.push(ManageDetail);
        });
    }
    var obj = {
        id: ($('#input-getin-id').val() == "") ? 0 : $('#input-getin-id').val(),
        documentcode: $('#input-getInStock-code').val(),
        ////stockid: $('#form-getInStock #select-getInStock-Stock').val(),
        ////stockproductcode: $('#form-getInStock #select-getInStock-Product').val(),
        //dealername: $('#input-getInStock-dealer').val(),
        receiverid: $('#form-getInStock #select-getInStock-by').val(),
        actiondate: $('#input-getInStock-date').val(),
        actiontype: 'I',
        //amount: $('#input-getInStock-amount').val(),
        //remark: $('#input-getInStock-remark').val(),
        status: ($('#form-getInStock #select-getInStock-status').val() == "1") ? true : false,
        loginCode: _userCode,
        listdelid: $('#hddelproductcodelist').val(),
        ManageDetail: ManageData
    };


    $('.btn-modal-save-getin').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-getin').removeLoading();
                $(`#modal-getInStock`).modal('hide');
                callGetInList();
                clearGetinSave();
                $("#tb-stockin-detail tbody tr").remove();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "เอกสารอ้างอิงนี้มีอยู่แล้ว กรุณา refresh แล้วทำอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-getInStock #input-getInStock-code').focus();
                    });
                }
                $('.btn-modal-save-getin').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-getin').removeLoading();
        }
    });

}

function callAddOrUpdateGetoutStock() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/StockManage/AddItem` : `${app_settings.api_url}/api/StockManage/UpdateItem`;

    //var obj = {
    //    id: ($('#input-getout-id').val() == "") ? 0 : $('#input-getout-id').val(),
    //    documentcode: $('#input-getOutStock-code').val(),
    //    stockid: $('#form-getOutStock #select-getOutStock-Stock').val(),
    //    stockproductcode: $('#form-getOutStock #select-getOutStock-Product').val(),
    //    dealername: $('#input-getOutStock-dealer').val(),
    //    receiverid: $('#form-getOutStock #select-getOutStock-by').val(),
    //    actiondate: $('#input-getOutStock-date').val(),
    //    actiontype: 'O',
    //    amount: $('#input-getOutStock-amount').val(),
    //    remark: $('#input-getOutStock-remark').val(),
    //    status: ($('#form-getOutStock #select-getOutStock-status').val() == "1") ? true : false,
    //    loginCode: _userCode
    //};


    //$('.btn-modal-save-getout').addLoading();

    //$.ajax({
    //    url: url,
    //    type: 'POST',
    //    contentType: 'application/json; charset=utf-8',
    //    dataType: "json",
    //    data: JSON.stringify(obj),
    //    success: (res) => {
    //        if (res.result) {
    //            callSuccessAlert();
    //            $('.btn-modal-save-getin').removeLoading();
    //            $(`#modal-getOutStock`).modal('hide');
    //            callGetOutList();
    //            $('.btn-modal-save-getout').removeLoading();
    //        }
    //        else {
    //            if (res.resultStatus == 'duplicate') {
    //                Swal.fire({
    //                    text: "เอกสารอ้างอิงนี้มีอยู่แล้ว กรุณา refresh แล้วทำอีกครั้ง",
    //                    icon: 'warning',
    //                    showCancelButton: false,
    //                    confirmButtonColor: _modal_primary_color_code,
    //                    //cancelButtonColor: _modal_default_color_code,
    //                    confirmButtonText: 'ตกลง'
    //                }).then((result) => {
    //                    $('#form-getOutStock #input-getOutStock-code').focus();
    //                });
    //            }
    //            $('.btn-modal-save-getout').removeLoading();
    //        }
    //    },
    //    error: () => {
    //        $('.btn-modal-save-getout').removeLoading();
    //    }
    //});

    let loaded = $('#tb-stockout-detail');
    loaded.prepend(_loader);
    var ManageData = new Array();
    //var obj = {
    //    id: ($('#input-getin-id').val() == "") ? 0 : $('#input-getin-id').val(),
    //    documentcode: $('#input-getInStock-code').val(),
    //    stockid: $('#form-getInStock #select-getInStock-Stock').val(),
    //    stockproductcode: $('#form-getInStock #select-getInStock-Product').val(),
    //    dealername: $('#input-getInStock-dealer').val(),
    //    receiverid: $('#form-getInStock #select-getInStock-by').val(),
    //    actiondate: $('#input-getInStock-date').val(),
    //    actiontype: 'I',
    //    amount: $('#input-getInStock-amount').val(),
    //    remark: $('#input-getInStock-remark').val(),
    //    status: ($('#form-getInStock #select-getInStock-status').val() == "1") ? true : false,
    //    loginCode: _userCode
    //};
    var table = document.getElementById("tb-stockout-detail");
    var tbodyRowCount = table.tBodies[0].rows.length;
    if (tbodyRowCount > 0) {
        $("#tb-stockout-detail tbody tr").each(function () {
            var row = $(this);
            var ManageDetail = {};
            ManageDetail.id = row.find("td").eq(0).html();
            ManageDetail.stockid = row.find("td").eq(1).html();
            ManageDetail.stockproductcode = row.find("td").eq(2).html();
            /*            ManageDetail.calhm = row.find("td").eq(3).html();*/
            /*ManageDetail.dealername = row.find("td").eq(4).html();*/
            ManageDetail.dealername = row.find("td").eq(5).html();
            //ManageDetail.calw = row.find("td").eq(6).html();
            //ManageDetail.calhdel = row.find("td").eq(7).html();
            ManageDetail.amount = row.find("td").eq(8).html();
            ManageDetail.remark = row.find("td").eq(9).html();
            ManageData.push(ManageDetail);
        });
    }
    var obj = {
        id: ($('#input-getout-id').val() == "") ? 0 : $('#input-getout-id').val(),
        documentcode: $('#input-getOutStock-code').val(),
        ////stockid: $('#form-getInStock #select-getInStock-Stock').val(),
        ////stockproductcode: $('#form-getInStock #select-getInStock-Product').val(),
        //dealername: $('#input-getInStock-dealer').val(),
        receiverid: $('#form-getOutStock #select-getOutStock-by').val(),
        actiondate: $('#input-getOutStock-date').val(),
        actiontype: 'O',
        //amount: $('#input-getInStock-amount').val(),
        //remark: $('#input-getInStock-remark').val(),
        status: ($('#form-getOutStock #select-getOutStock-status').val() == "1") ? true : false,
        loginCode: _userCode,
        listdelid: $('#hddelproductcodelistout').val(),
        ManageDetail: ManageData
    };


    $('.btn-modal-save-getout').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-getout').removeLoading();
                $(`#modal-getOutStock`).modal('hide');
                callGetOutList();
                clearGetoutSave();
                $("#tb-stockout-detail tbody tr").remove();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "เอกสารอ้างอิงนี้มีอยู่แล้ว กรุณา refresh แล้วทำอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-getOutStock #input-getOutStock-code').focus();
                    });
                }
                $('.btn-modal-save-getout').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-getout').removeLoading();
        }
    });

}

function DoAddOrUpdateSubGroup(modal) {
    if (!validateInputStore(modal)) return;

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
            callAddOrUpdateSubGroup(_product_item_action);
        }
    });
}

function DoAddOrUpdateGroup(modal) {
    if (!validateInputStore(modal)) return;

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
            callAddOrUpdateGroup(_product_item_action);
        }
    });
}

function DoAddOrUpdateStock(modal) {
    if (!validateInputStore(modal)) return;

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
            callAddOrUpdateStock(_product_item_action);
        }
    });
}

function DoAddOrUpdateGetin(modal) {
    if (!validateInputStore(modal)) return;

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
            callAddOrUpdateGetinStock(_product_item_action);
        }
    });
}

function DoAddOrUpdateGetout(modal) {
    if (!validateInputStore(modal)) return;

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
            callAddOrUpdateGetoutStock(_product_item_action);
        }
    });
}


function callAddOrUpdateGroup() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/Group/AddItem` : `${app_settings.api_url}/api/Group/UpdateItem`;


    var obj = {
        id: $('#input-group-code').val(),
        groupname: $('#input-group-name').val(),
        status: ($('#form-createGroup #select-group-status').val() == "1") ? true : false,
        loginCode: _userCode
    };

    $('.btn-modal-save-group').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-group').removeLoading();
                $(`#modal-createGroup`).modal('hide');
                callGetGroupList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อหมวดหมู่หลักมีอยู่แล้ว กรุณากรอกชื่อหมวดหมู่หลักอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createGroup #input-group-name').focus();
                    });
                }
                $('.btn-modal-save-group').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-group').removeLoading();
        }
    });

}

function callAddOrUpdateStock() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/Stock/AddItem` : `${app_settings.api_url}/api/Stock/UpdateItem`;


    var obj = {
        id: $('#input-stock-code').val(),
        stockname: $('#input-stock-name').val(),
        status: ($('#form-createStock #select-stock-status').val() == "1") ? true : false,
        loginCode: _userCode
    };

    $('.btn-modal-save-stock').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-stock').removeLoading();
                $(`#modal-createStock`).modal('hide');
                callGetStockList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อหมวดหมู่หลักมีอยู่แล้ว กรุณากรอกชื่อหมวดหมู่หลักอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createStock #input-stock-name').focus();
                    });
                }
                $('.btn-modal-save-stock').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-group').removeLoading();
        }
    });

}
function onGroupListChange() {
    var val = document.getElementById("select-group-name").value;
    console.log(val);
    if (val != '') {
        var name = document.getElementById("input-subgroup-name").value;
        console.log(name);
        callGetSubGroupcode(val, name);
    }
    else {
        $('#form-createSubGroup input[name="input-subgroup-code"]').val('');
    }
}

function onProductGetInOutChange(typeid) {
    var productcode; 
    if (typeid == '#form-getInStock') {
        productcode = $('#form-getInStock #select-getInStock-Product').val();
    } else {
        productcode = $('#form-getOutStock #select-getOutStock-Product').val();
    }
   
    if (productcode != '') {
        $.ajax({
            type: 'GET',
            url: `${app_settings.api_url}/api/StockProduct/GetProductDetailByCode?productcode=${productcode}`,
            success: function (data) {
                console.log(data);
                if (data != null) {
                    $(`${typeid} #hdunitname`).val(data.unitname);
                    $(`${typeid} #unitprice`).val(data.productprice);
                    //$('#form-getInStock #hdunitname').val(data.unitname);
                    //$('#form-getInStock #unitprice').val(data.productprice);

                }
            },
            error: function (err) {

            }
        });
    }

}


function onStockListChange(selecttype) {
    if (selecttype == "getin") {
        var val = document.getElementById("select-getInStock-Stock").value;
        if (val != '') {

            callGetStockProductManage(val, selecttype);
        }
        else {
            $('#form-getInStock #select-getInStock-Product').empty();
            $('#form-getInStock #select-getInStock-Product').attr('disabled', 'disabled');

        }
    }
    else {
        var val = document.getElementById("select-getOutStock-Stock").value;
        if (val != '') {

            callGetStockProductManage(val, selecttype);
        }
        else {
            $('#form-getOutStock #select-getOutStock-Product').empty();
            $('#form-getOutStock #select-getOutStock-Product').attr('disabled', 'disabled');

        }
    }

}

function onempCodeChangeListChange() {
    var val = document.getElementById("select-receiver-empcode").value;
    if (val != '') {

        callGetempNameByEmpCode(val);
    }
    else {
        $('#form-createReceiver input[name="input-receiver-name"]').val('');
    }
}


function renderGroupForm(data, typeId) {
    let status = (data.status) ? 1 : 0;
    $('#form-createGroup input[name="input-group-code"]').val(data.id);
    $('#form-createGroup input[name="input-group-name"]').val(data.groupname);
    $('#form-createGroup #select-group-status').val(status).trigger('change');
}

function renderStockForm(data, typeId) {
    let status = (data.status) ? 1 : 0;
    $('#form-createStock input[name="input-stock-code"]').val(data.id);
    $('#form-createStock input[name="input-stock-name"]').val(data.stockname);
    $('#form-createStock #select-stock-status').val(status).trigger('change');
}
function renderStockProductForm(data, typeId) {
    let status = (data.status) ? 1 : 0;
    $('#form-createStockProduct input[name="input-viewstock-id"]').val(data.id);
    $('#form-createStockProduct input[name="input-viewstock-code"]').val(data.productcode);
    $('#form-createStockProduct #select-viewstock-status').val(status).trigger('change');
    $('#form-createStockProduct input[name="input-viewstock-name"]').val(data.productname);
    $('#form-createStockProduct #select-viewstock-group').val(data.groupid).trigger('change');
    $('#form-createStockProduct #select-viewstock-subgroup').val(data.subgroupid).trigger('change');
    $('#form-createStockProduct #select-viewstock-brand').val(data.brandid).trigger('change');
    $('#form-createStockProduct #select-viewstock-stock').val(data.stockid).trigger('change');
    $('#form-createStockProduct input[name="input-viewstock-price"]').val(data.productprice);
    /*    $('#form-createStockProduct input[name="input-viewstock-amount"]').val(data.stockamount);*/
    $('#form-createStockProduct #select-viewstock-unit').val(data.unitmasterid).trigger('change');
}

function renderReceiverForm(data, typeId) {
    let status = (data.status) ? 1 : 0;
    $('#form-createReceiver input[name="input-receiver-id"]').val(data.id);
    $('#form-createReceiver #select-receiver-empcode').val(data.empid).trigger('change');
    $('#form-createReceiver input[name="input-receiver-name"]').val(data.empname);
    $('#form-createReceiver #select-brand-status').val(status).trigger('change');
}

function renderSubGroupForm(data, typeId) {
    let status = (data.status) ? 1 : 0;
    $('#form-createSubGroup input[name="input-subgroup-id"]').val(data.id);
    $('#form-createSubGroup input[name="input-subgroup-code"]').val(data.subgroupcode);
    $('#form-createSubGroup input[name="input-subgroup-name"]').val(data.subgroupname);
    $('#form-createSubGroup #select-group-name').val(data.groupid).trigger('change');
    $('#form-createSubGroup #select-subgroup-status').val(status).trigger('change');
}

function renderBrandForm(data, typeId) {
    let status = (data.status) ? 1 : 0;
    $('#form-createBrand input[name="input-brand-id"]').val(data.id);
    $('#form-createBrand input[name="input-brand-code"]').val(data.brandcode);
    $('#form-createBrand input[name="input-brand-name"]').val(data.brandname);
    $('#form-createBrand #select-brand-status').val(status).trigger('change');
}

function renderUnitForm(data, typeId) {
    let status = (data.status) ? 1 : 0;
    $('#form-createUnit input[name="input-unit-code"]').val(data.id);
    $('#form-createUnit input[name="input-unit-name"]').val(data.unitname);
    $('#form-createUnit #select-unit-status').val(status).trigger('change');
}

function callGetStockProductManage(stockid, selecttype, isView = false) {
    if (selecttype == "getin") {
        $.ajax({
            type: 'GET',
            url: `${app_settings.api_url}/api/StockProduct/GetStockProductManageByID?stockid=${stockid}`,
            success: function (data) {
                if (data != '') {
                    $('#form-getInStock #select-getInStock-Product').removeAttr("disabled");
                    renderStockProductManage('#form-getInStock #select-getInStock-Product', 'กรุณาเลือก', data);
                }
                else {
                    $('#form-getInStock #select-getInStock-Product').empty();
                    $('#form-getInStock #select-getInStock-Product').attr('disabled', 'disabled');
                }

            },
            error: function (err) {

            }
        });
    }
    else {
        $.ajax({
            type: 'GET',
            url: `${app_settings.api_url}/api/StockProduct/GetStockProductManageByID?stockid=${stockid}`,
            success: function (data) {
                if (data != '') {
                    $('#form-getOutStock #select-getOutStock-Product').removeAttr("disabled");
                    renderStockProductManage('#form-getOutStock #select-getOutStock-Product', 'กรุณาเลือก', data);
                }
                else {
                    $('#form-getOutStock #select-getOutStock-Product').empty();
                    $('#form-getOutStock #select-getOutStock-Product').attr('disabled', 'disabled');
                }

            },
            error: function (err) {

            }
        });
    }

}

function callGetStockProductManageedit(stockid, productid, selecttype, isView = false) {
    if (selecttype == 'getin') {
        $.ajax({
            type: 'GET',
            url: `${app_settings.api_url}/api/StockProduct/GetStockProductManageByID?stockid=${stockid}`,
            success: function (data) {
                if (data != '') {
                    $('#form-getInStock #select-getInStock-Product').removeAttr("disabled");
                    renderStockProductManageedit('#form-getInStock #select-getInStock-Product', 'กรุณาเลือก', data, productid);
                }
                else {
                    $('#form-getInStock #select-getInStock-Product').empty();
                    $('#form-getInStock #select-getInStock-Product').attr('disabled', 'disabled');
                }

            },
            error: function (err) {

            }
        });
    }
    else {
        $.ajax({
            type: 'GET',
            url: `${app_settings.api_url}/api/StockProduct/GetStockProductManageByID?stockid=${stockid}`,
            success: function (data) {
                if (data != '') {
                    $('#form-getOutStock #select-getOutStock-Product').removeAttr("disabled");
                    renderStockProductManageedit('#form-getOutStock #select-getOutStock-Product', 'กรุณาเลือก', data, productid);
                }
                else {
                    $('#form-getOutStock #select-getOutStock-Product').empty();
                    $('#form-getOutStock #select-getOutStock-Product').attr('disabled', 'disabled');
                }

            },
            error: function (err) {

            }
        });
    }
}


function renderStockProductManage(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.productcode}">${v.productcode} - ${v.productname}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}
function renderStockProductManageedit(select2Id, select2FirstText, data, prodcode) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.productcode}">${v.productcode} - ${v.productname}</option>`);
    });
    $(`${select2Id}`).val(prodcode).trigger('change')
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function callGetSubGroupcode(id, subgroupname, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/SubGroup/GetLastestSubGroupCode?groupid=${id}&subgroupname=${subgroupname}`,
        success: function (data) {
            if (data != '') {
                $('#form-createSubGroup input[name="input-subgroup-code"]').val(data);
            }

        },
        error: function (err) {

        }
    });
}

function callGetempNameByEmpCode(id, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Receiver/GetempFullName?empid=${id}`,
        success: function (data) {
            if (data != '') {
                $('#form-createReceiver input[name="input-receiver-name"]').val(data);
            }

        },
        error: function (err) {

        }
    });
}

function TabReload(_page) {
    if (_page == "VIEWSTOCK") {
        callGetStockProductList();
    }
}

function clearGetinAdd() {
    $('#input-getInStock-amount').val('');
    $('#input-getInStock-remark').val('');
    $('#input-getInStock-dealer').val('');
    $('#form-getInStock #select-getInStock-Stock').val('').trigger('change');
    $('#form-getInStock #select-getInStock-Product').val('').trigger('change');
}

function clearGetinSave() {
    $('#input-getInStock-amount').val('');
    $('#input-getin-id').val('');
    $('#input-getInStock-code').val('');
    $('#input-getInStock-date').val('');
    $('#input-getInStock-date').removeAttr('disabled')
    $('#select-getInStock-by').val('').trigger('change');
    $('#select-getInStock-by').removeAttr('disabled')
    $('#hdunitname').val('');
    $('#unitprice').val('');
    $('#hdproductcodelist').val('');
    $('#hddelproductcodelist').val('');
    $('#input-getInStock-remark').val('');
    $('#input-getInStock-dealer').val('');
    $('#form-getInStock #select-getInStock-Stock').val('').trigger('change');
    $('#form-getInStock #select-getInStock-Product').val('').trigger('change');
}

function clearGetoutAdd() {
    $('#input-getOutStock-amount').val('');
    $('#input-getOutStock-remark').val('');
    $('#input-getOutStock-dealer').val('');
    $('#form-getOutStock #select-getOutStock-Stock').val('').trigger('change');
    $('#form-getOutStock #select-getOutStock-Product').val('').trigger('change');
}

function clearGetoutSave() {
    $('#input-getOutStock-amount').val('');
    $('#input-getout-id').val('');
    $('#input-getOutStock-code').val('');
    $('#input-getOutStock-date').val('');
    $('#input-getOutStock-date').removeAttr('disabled')
    $('#select-getOutStock-by').val('').trigger('change');
    $('#select-getOutStock-by').removeAttr('disabled')
    $('#hdunitname').val('');
    $('#unitprice').val('');
    $('#hdproductcodelistout').val('');
    $('#hddelproductcodelistout').val('');
    $('#input-getOutStock-remark').val('');
    $('#input-getOutStock-dealer').val('');
    $('#form-getOutStock #select-getOutStock-Stock').val('').trigger('change');
    $('#form-getOutStock #select-getOutStock-Product').val('').trigger('change');
}
function delRowCalManageStock(id, productcode) {
    Swal.fire({
        text: "ยืนยันการลบรายการ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: _modal_primary_color_code,
        //cancelButtonColor: _modal_default_color_code,
        confirmButtonText: 'ยืนยัน'
    }).then((result) => {

        if (_product_item_action == "edit") {
            if ($("#hddelproductcodelist").val() == "") {
                $("#hddelproductcodelist").val(productcode);
            }
            else {
                $("#hddelproductcodelist").val($("#hddelproductcodelist").val() + ',' + productcode);
            }
        }

        $("#hddelproductcodelist").val(productcode)
        var lst = $("#hdproductcodelist").val().split(',');
        if (lst.length > 0) {
            lst = jQuery.grep(lst, function (value) {
                return value != productcode;
            });
            if (lst.length == 0) {
                $("#hdproductcodelist").val('');
            }
            else {
                for (var i = 0; i < lst.length; i++) {
                    if (i == 0) {
                        $("#hdproductcodelist").val(lst[i]);
                    }
                    else {
                        $("#hdproductcodelist").val($("#hdproductcodelist").val() + ',' + lst[i]);
                    }
                }
            }

        }
        else {
            $("#hdproductcodelist").val('');
        }
        $(id).remove();
    });

}

function renderStockProductManageForm(data, selectype, typeId) {
    if (selectype == 'getin') {
        $("#tb-stockin-detail tbody tr").remove();

        let status = (data.master.status) ? 1 : 0;
        $('#form-getInStock input[name="input-getin-id"]').val(data.master.id);
        $('#form-getInStock input[name="input-getInStock-code"]').val(data.master.documentcode);
        var now = new Date(data.master.actiondate);

        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);

        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        $('#form-getInStock input[name="input-getInStock-date"]').val(today);
        $('#form-getInStock input[name="input-getInStock-date"]').attr('disabled', 'disabled');
        //$('#form-getInStock input[name="input-getInStock-dealer"]').val(data.dealername);
        $('#form-getInStock #select-getInStock-by').val(data.master.receiverid).trigger('change');
        $('#form-getInStock #select-getInStock-by').attr('disabled', 'disabled');

        $('#form-getInStock #select-getInStock-status').val(status).trigger('change');
        //$('#input-getInStock-remark').val(data.remark);
        for (var i = 0; i < data.item.length; i++) {
            var row;
            row = $('<tr id="row' + data.item[i].id + '">');
            /*  row.append($('<td style="display:none;">').html(length));*/

            row.append($('<td style="display:none;">').html(data.item[i].id));
            row.append($('<td style="display:none;">').html(data.item[i].stockid));
            row.append($('<td>').html(data.item[i].stockproductcode));
            row.append($('<td>').html(data.item[i].productname));
            row.append($('<td>').html(data.item[i].stockname));
            row.append($('<td class="' + data.item[i].stockproductcode + '_dealername">').html(data.item[i].dealername));
            row.append($('<td>').html(data.item[i].unitname));
            row.append($('<td>').html(data.item[i].productprice));
            row.append($('<td class="' + data.item[i].stockproductcode + '_amount">').html(data.item[i].amount));
            row.append($('<td class="' + data.item[i].stockproductcode + '_remark">').html(data.item[i].remark));

            row.append($('<td>').html(`<button type="button" class="btn btn-primary btn-circle-xs btn-del-group"  onclick="delRowCalManageStock('#${"row"}${data.item[i].id}','${data.item[i].stockproductcode}')" title="ลบ">
                    <i class="fa fa-trash"></i></button>`));
            $('#tb-stockin-detail').append(row);
        }
    }
    else {
        $("#tb-stockout-detail tbody tr").remove();

        let status = (data.master.status) ? 1 : 0;
        $('#form-getOutStock input[name="input-getout-id"]').val(data.master.id);
        $('#form-getOutStock input[name="input-getOutStock-code"]').val(data.master.documentcode);
        var now = new Date(data.master.actiondate);

        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);

        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        $('#form-getOutStock input[name="input-getInStock-date"]').val(today);
        $('#form-getOutStock input[name="input-getOutStock-date"]').attr('disabled', 'disabled');
        //$('#form-getInStock input[name="input-getInStock-dealer"]').val(data.dealername);
        $('#form-getOutStock #select-getOutStock-by').val(data.master.receiverid).trigger('change');
        $('#form-getOutStock #select-getOutStock-by').attr('disabled', 'disabled');

        $('#form-getOutStock #select-getOutStock-status').val(status).trigger('change');
        //$('#input-getInStock-remark').val(data.remark);
        for (var i = 0; i < data.item.length; i++) {
            var row;
            row = $('<tr id="row' + data.item[i].id + '">');
            /*  row.append($('<td style="display:none;">').html(length));*/

            row.append($('<td style="display:none;">').html(data.item[i].id));
            row.append($('<td style="display:none;">').html(data.item[i].stockid));
            row.append($('<td>').html(data.item[i].stockproductcode));
            row.append($('<td>').html(data.item[i].productname));
            row.append($('<td>').html(data.item[i].stockname));
            row.append($('<td class="' + data.item[i].stockproductcode + '_dealername">').html(data.item[i].dealername));
            row.append($('<td>').html(data.item[i].unitname));
            row.append($('<td style="text-align:center;">').html(data.item[i].productprice));
            row.append($('<td style="text-align:center;" class="' + data.item[i].stockproductcode + '_amount">').html(data.item[i].amount));
            row.append($('<td class="' + data.item[i].stockproductcode + '_remark">').html(data.item[i].remark));

            row.append($('<td>').html(`<button type="button" class="btn btn-primary btn-circle-xs btn-del-group"  onclick="delRowCalManageStock('#${"row"}${data.item[i].id}','${data.item[i].stockproductcode}')" title="ลบ">
                    <i class="fa fa-trash"></i></button>`));
            $('#tb-stockout-detail').append(row);
        }
    }
}

function printGetIn(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockManage/GetItemByItemId?id=${id}`,
        success: function (data) {

            generateGetInDocument(data);

        },
        error: function (err) {
        }
    });
    //$(this).attr('href', `../Document/GetInvoiceByInvoiceId?invoiceId=${_invoice_id}`);
    //$(this).attr("target", "_blank");
}

function printGetOut(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/StockManage/GetItemByItemId?id=${id}`,
        success: function (data) {

            generateGetOutDocument(data);

        },
        error: function (err) {
        }
    });
    //$(this).attr('href', `../Document/GetInvoiceByInvoiceId?invoiceId=${_invoice_id}`);
    //$(this).attr("target", "_blank");
}

async function generateGetInDocument(data) {
    await renderGetInHtml(data);
}

async function generateGetOutDocument(data) {
    await renderGetOutHtml(data);
}

async function renderGetInHtml(data) {
    //$('#form-getInStock input[name="input-getin-id"]').val(data.master.id);
    $('#getindoccode').html(data.master.documentcode);
    console.log(data.master);
    $('#spnreciver').html(data.master.recName);

    var now = new Date(data.master.actiondate);

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    $('#spnCreateDate').html(today);
    $('#spnreciverPosition').html(data.master.positionName);

    var itemNo = 1;
    var size = "";
    var qty = 0;
    var item = ''
    $('#tb-getin-itemlist').empty();
    for (var i = 0; i < data.item.length; i++) {
        var row;
        row = $('<tr id="row' + data.item[i].id + '">');


        row.append($('<td style="width: 25.65pt; border-width: 0.75pt 0pt; border-style:none; border-color: rgb(166, 166, 166) black; vertical-align: middle;"><p style="text-align: center;"><span style="font-family:KaLaTeXaTEXT; min-height: 16pt; font-size: 16pt;">').html(itemNo));
        row.append($('<td style="width: 136.25pt; border-width: 0.75pt 0pt; border-style: solid; border-color: rgb(166, 166, 166) black; vertical-align: middle;"><p style="text-align: left;"><span style="font-family:KaLaTeXaTEXT; min-height: 16pt; font-size: 16pt;">').html(data.item[i].stockproductcode + ' - ' + data.item[i].productname));
        row.append($('<td style="width: 90.8pt; border-width: 0.75pt 0pt; border-style: solid; border-color: rgb(166, 166, 166) black; vertical-align: middle;"><p style="text-align: center;"><span style="font-family:KaLaTeXaTEXT; min-height: 16pt; font-size: 16pt;">').html(data.item[i].stockname));
        row.append($('<td style="width: 30.8pt; border-width: 0.75pt 0pt; border-style: solid; border-color: rgb(166, 166, 166) black; vertical-align: middle;"><p style="text-align: center;"><span style="font-family:KaLaTeXaTEXT; min-height: 16pt; font-size: 16pt;text-align: center;">').html(data.item[i].amount));
        row.append($('<td style="width: 42.55pt; border-width: 0.75pt 0pt; border-style: solid; border-color: rgb(166, 166, 166) black; vertical-align: middle;"><p style="text-align: center;"><span style="font-family:KaLaTeXaTEXT; min-height: 16pt; font-size: 16pt;">').html(data.item[i].unitname));
        row.append($('<td style="width: 148.45pt; border-width: 0.75pt 0pt; border-style: solid; border-color: rgb(166, 166, 166) black; vertical-align: middle;"><p style="text-align: center;"><span style="font-family:KaLaTeXaTEXT; min-height: 16pt; font-size: 16pt;">').html(data.item[i].remark));
        $('#tb-getin-itemlist').append(row);
        itemNo++;
        qty += data.item[i].amount;
    }

    $('#spnTotalAmount').html(qty);
    $('#spnTotalQty').html(itemNo);

    const options = {
        margin: 0.3,
        filename: 'IN_' + data.master.documentcode +'.pdf',
        image: {
            type: 'jpeg',
            quality: 0.98
        },
        html2canvas: {
            scale: 2
        },
        jsPDF: {
            unit: 'in',
            format: 'a4',
            orientation: 'portrait'
        }
    }


    var element = document.getElementById("getInPrintElement");
    html2pdf()
        .set(options)
        .from(element)
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
            window.open(pdf.output('bloburl'), '_blank');
        });
}

async function renderGetOutHtml(data) {
    //$('#form-getInStock input[name="input-getin-id"]').val(data.master.id);
    $('#getoutdoccode').html(data.master.documentcode);
    console.log(data.master);
    $('#spnreciverout').html(data.master.recName);

    var now = new Date(data.master.actiondate);

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    $('#spnCreateDateout').html(today);
    $('#spnreciverPositionout').html(data.master.positionName);

    var itemNo = 1;
    var size = "";
    var qty = 0;
    var item = ''
    $('#tb-getout-itemlist').empty();
    for (var i = 0; i < data.item.length; i++) {
        var row;
        row = $('<tr id="row' + data.item[i].id + '">');


        row.append($('<td style="width: 25.65pt; border-width: 0.75pt 0pt; border-style:none; border-color: rgb(166, 166, 166) black; vertical-align: middle;"><p style="text-align: center;"><span style="font-family:KaLaTeXaTEXT; min-height: 16pt; font-size: 16pt;">').html(itemNo));
        row.append($('<td style="width: 136.25pt; border-width: 0.75pt 0pt; border-style: solid; border-color: rgb(166, 166, 166) black; vertical-align: middle;"><p style="text-align: left;"><span style="font-family:KaLaTeXaTEXT; min-height: 16pt; font-size: 16pt;">').html(data.item[i].stockproductcode + ' - ' + data.item[i].productname));
        row.append($('<td style="width: 90.8pt; border-width: 0.75pt 0pt; border-style: solid; border-color: rgb(166, 166, 166) black; vertical-align: middle;"><p style="text-align: center;"><span style="font-family:KaLaTeXaTEXT; min-height: 16pt; font-size: 16pt;">').html(data.item[i].stockname));
        row.append($('<td style="width: 30.8pt; border-width: 0.75pt 0pt; border-style: solid; border-color: rgb(166, 166, 166) black; vertical-align: middle;"><p style="text-align: center;"><span style="font-family:KaLaTeXaTEXT; min-height: 16pt; font-size: 16pt;text-align: center;">').html(data.item[i].amount));
        row.append($('<td style="width: 42.55pt; border-width: 0.75pt 0pt; border-style: solid; border-color: rgb(166, 166, 166) black; vertical-align: middle;"><p style="text-align: center;"><span style="font-family:KaLaTeXaTEXT; min-height: 16pt; font-size: 16pt;">').html(data.item[i].unitname));
        row.append($('<td style="width: 148.45pt; border-width: 0.75pt 0pt; border-style: solid; border-color: rgb(166, 166, 166) black; vertical-align: middle;"><p style="text-align: center;"><span style="font-family:KaLaTeXaTEXT; min-height: 16pt; font-size: 16pt;">').html(data.item[i].remark));
        $('#tb-getout-itemlist').append(row);
        itemNo++;
        qty += data.item[i].amount;
    }

    $('#spnTotalAmountout').html(qty);
    $('#spnTotalQtyout').html(itemNo);

    const options = {
        margin: 0.3,
        filename: 'OUT_' + data.master.documentcode + '.pdf',
        image: {
            type: 'jpeg',
            quality: 0.98
        },
        html2canvas: {
            scale: 2
        },
        jsPDF: {
            unit: 'in',
            format: 'a4',
            orientation: 'portrait'
        }
    }


    var element = document.getElementById("getOutPrintElement");
    html2pdf()
        .set(options)
        .from(element)
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
            window.open(pdf.output('bloburl'), '_blank');
        });
}

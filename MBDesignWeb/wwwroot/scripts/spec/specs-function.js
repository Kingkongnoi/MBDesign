let _loader = $('<div/>').addClass('loader');
let _product_style_action = 'add';
let _product_type_action = 'add';
let _product_item_action = 'add';

let _action = 'add';
let _id = 0;
let _empId = 0;
let _maxIDcheck = "";
let _liMaxID = "";

let _emp_action = 'add';
let _role_action = 'add';

let _modal_primary_color_code = "#F09723";
let _modal_default_color_code = "#EFEFEF";

let _userId = localStorage.getItem('loginId');
let _userCode = localStorage.getItem('loginCode');
let _userName = localStorage.getItem('loginName');

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

function callSelectSizePlank(id, isSearch = false) {
    $(id).empty();

    $(id).append(`<option value="">กรุณาเลือก</option>`);

    $(id).append(`<option value="1">18MM</option>`);
    $(id).append(`<option value="2">9MM</option>`);
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function callPlanksList() {
    let quotaioncode = ($('#form-search-planks #input-search-quotation-code').val() == '' || $('#form-search-planks #input-search-quotation-code').val() == undefined) ? null : $('#form-search-planks #input-search-quotation-code').val();
    let status = ($('#form-search-planks #select-search-planks-status').val() == '' || $('#form-search-planks #select-search-planks-status').val() == undefined) ? null : $('#form-search-planks #select-search-planks-status').val();
    let loaded = $('#tb-planks-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Planks/GetPlanksList?quotaioncode=${quotaioncode}&status=${status}`,
        success: function (data) {
            if (data.length > 0) {
                renderGetPlanksList(data);
                //callGroupNameBySubGroup('#form-createSubGroup #select-group-name', 'กรุณาเลือก');
            }

            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function callFittingList() {
    let quotaioncode = ($('#form-search-fitting #input-search-quotation-code').val() == '' || $('#form-search-fitting #input-search-quotation-code').val() == undefined) ? null : $('#form-search-fitting #input-search-quotation-code').val();
    let fittingcode = ($('#form-search-fitting #input-search-fitting-code').val() == '' || $('#form-search-fitting #input-search-fitting-code').val() == undefined) ? null : $('#form-search-fitting #input-search-fitting-code').val();
    let loaded = $('#tb-fitting-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Fitting/GetFittingList?fittingcode=${fittingcode}&quotationNumber=${quotaioncode}`,
        success: function (data) {
            if (data.length > 0) {
                renderGetFittingList(data);
                //callGroupNameBySubGroup('#form-createSubGroup #select-group-name', 'กรุณาเลือก');
            }

            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function callGetFrameList() {

    let calcode = ($('#form-search-calculate #input-search-calulate-code').val() == '' || $('#form-search-calculate #input-search-calulate-code').val() == undefined) ? null : $('#form-search-calculate #input-search-calulate-code').val();

    let loaded = $('#tb-search-frameglass-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetListMasterF?calcode=${calcode}&caltype=F`,
        success: function (data) {

            if (data.length > 0) {
                renderCalFrameList(data);

            }
            else {

            }
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function callGetGlassList() {

    let calcode = ($('#form-search-calculate-clearglass #input-search-calulate-code-clearglass').val() == '' || $('#form-search-calculate-clearglass #input-search-calulate-code-clearglass').val() == undefined) ? null : $('#form-search-calculate-clearglass #input-search-calulate-code-clearglass').val();

    let loaded = $('#tb-search-clearglass-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetListMasterF?calcode=${calcode}&caltype=C`,
        success: function (data) {

            if (data.length > 0) {
                renderCalClearList(data);

            }
            else {

            }
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function callViewFrameList(calcode) {

    let loaded = $('#tb-view-frameglass-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetCalDetailByCode?calcode=${calcode}&caltype=F`,
        success: function (data) {

            if (data.length > 0) {
                renderviewCalFrameList(data);

            }
            else {

            }
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function callViewClearList(calcode) {

    let loaded = $('#tb-view-clear-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetCalDetailByCode?calcode=${calcode}&caltype=C`,
        success: function (data) {

            if (data.length > 0) {
                renderviewCalClearList(data);

            }
            else {

            }
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function callGetClearGlassList() {

    let calcode = ($('#form-search-calculate-clearglass #input-search-calulate-code-clearglass').val() == '' || $('#form-search-calculate-clearglass #input-search-calulate-code-clearglass').val() == undefined) ? null : $('#form-search-calculate-clearglass #input-search-calulate-code-clearglass').val();

    let loaded = $('#tb-search-clearglass-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetListMasterF?calcode=${calcode}&caltype=C`,
        success: function (data) {

            if (data.length > 0) {
                /*renderCalClearList(data);*/

            }
            else {

            }
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function renderGetPlanksList(data) {
    $('#tb-planks-list').DataTable(
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
                    data: 'orderid',
                    className: "hidecol",
                },
                {
                    targets: 2,
                    data: 'quotationNumber',
                    className: "item-details"
                },
                {
                    targets: 3,
                    data: 'amount18mm',
                    className: "dt-center",
                },
                {
                    targets: 4,
                    data: 'amount9mm',
                    className: "dt-center",
                },
                {
                    targets: 5,
                    data: 'status',
                    className: "dt-center",
                },
                {
                    targets: 6,
                    data: 'createBy',
                },
                {
                    targets: 7,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_spec_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-planks" data-id="${row.id}" title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
                {
                    targets: 8,
                    data: null,
                    orderable: false,
                    /*className: `dt-center ${_role_product_class_display}`,*/
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-print-planks" data-id="${row.id}" title="พิมพ์">
                    <i class="fa fa-print"></i></button>`;
                    },
                },
            ],
        }
    );
}

function renderGetFittingList(data) {
    $('#tb-fitting-list').DataTable(
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
                    data: 'orderId',
                    className: "hidecol",
                },
                {
                    targets: 2,
                    data: 'fittingcode',
                    className: "item-details"
                },
                {
                    targets: 3,
                    data: 'quotationNumber',
                    className: "item-details"
                },
                {
                    targets: 4,
                    data: 'fullname',
                    className: "dt-center",
                },
                {
                    targets: 5,
                    data: 'custTel',
                    className: "dt-center",
                },
                {
                    targets: 6,
                    data: 'createby',
                    className: "dt-center",
                },
                {
                    targets: 7,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_spec_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-fitting" data-id="${row.id}" title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
                {
                    targets: 8,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-print-fitting" data-id="${row.id}" title="พิมพ์">
                    <i class="fa fa-print"></i></button>`;
                    },
                },
            ],
        }
    );
}

function callGetPlanksById(id, modal, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Planks/GetItemByItemId?id=${id}`,
        success: function (data) {
            renderPlanksForm(data);
        },
        error: function (err) {
        }
    });
}

function callGetFittingById(id, modal, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Fitting/GetItemByItemId?id=${id}`,
        success: function (data) {
            generateFittingFrm(data);
        },
        error: function (err) {
        }
    });
}

function renderPlanksForm(data) {
    let status = (data.item.status) ? 1 : 0;
    $('#form-createPlanks #input-planks-id').val(data.item.id);
    console.log($('#form-createPlanks #input-planks-id').val());
    if (_product_item_action == "edit") {
        $('#form-createPlanks input[name="input-quotation-no"]').val(data.item.quotationNumber);
        $('#form-createPlanks input[name="hd-quotation-no"]').val(data.item.orderid);

    }
    else {
        $('#form-createPlanks #select-quotation-no').val(data.item.orderid).trigger('change');
    }

    for (var i = 0; i < data.list.length; i++) {
        var row;
        row = $('<tr id="row' + data.list[i].id + '">');
        /*  row.append($('<td style="display:none;">').html(length));*/

        row.append($('<td style="display:none;">').html(data.list[i].id));
        row.append($('<td style="display:none;">').html(data.list[i].plankid));
        row.append($('<td style="display:none;">').html(data.list[i].thicknesstype));
        row.append($('<td>').html(data.list[i].colorcode));
        row.append($('<td>').html(data.list[i].thicknesstype == 1 ? '18MM' : '9MM'));
        row.append($('<td>').html(data.list[i].amount));
        row.append($('<td>').html(data.list[i].remark));

        row.append($('<td>').html(`<button type="button" class="btn btn-primary btn-circle-xs btn-del-planks-detail"  onclick="delRowCalPlanks('#${"row"}${data.list[i].id}','${data.list[i].id}')"  title="ลบ">
                    <i class="fa fa-trash"></i></button>`));
        $('#tb-planks-detail').append(row);
    }
    //$('#form-createPlanks input[name="input-color-code"]').val(data.colorCode);
    //$('#form-createPlanks input[name="input-18mm-amount"]').val(data.thickness18MM);
    //$('#form-createPlanks input[name="input-9mm-amount"]').val(data.thickness9MM);
    //$('#form-createPlanks #select-brand-status').val(status).trigger('change');
}

async function generateFittingFrm(data) {
    await renderFitting(data);
}

async function renderFitting(data) {
    console.log(data);

    $('#form-createFitting #input-fitting-no').val(data.fittingcode);
    $('#form-createFitting #input-fitting-id').val(data.id);
    $('#form-createFitting #input-minifixset-amount').val(data.minifixset);
    $('#form-createFitting #input-woodendowel-amount').val(data.woodendowel);
    $('#form-createFitting #input-other-desc').val(data.otherdescription);
    $(`#form-createFitting #input-quotation-no`).val(data.quotationNumber);
    $("#form-createFitting #lblfullname").text(data.fullname);

    data.hinge.forEach((item) => {
        switch (item.hingetype) {
            case 1:
                $('#form-createFitting #input-hinge1-amount').val(item.amount);
                break;
            case 2:
                $('#form-createFitting #input-hinge2-amount').val(item.amount);

                break;
            case 3:
                $('#form-createFitting #input-hinge3-amount').val(item.amount);
                break;
            case 4:
                $('#form-createFitting #input-hinge4-amount').val(item.amount);
                $('#form-createFitting #input-hinge4-desc').val(item.othertext);
                break;
        };
    });

    data.drawerRail.forEach((item) => {
        switch (item.drawerrailtype) {
            case 1:
                $('#form-createFitting #input-drawerrail1-amount').val(item.amount);
                $('#form-createFitting #input-bouncepress-amount').val(item.pressbounceamount);
                break;
            case 2:
                $('#form-createFitting #input-drawerrail2-amount').val(item.amount);

                break;
            case 3:
                $('#form-createFitting #input-drawerrail3-amount').val(item.amount);
                $('#form-createFitting #input-drawerrailsize-desc').val(item.othersize);
                break;
        };
    });

    data.slideDoor.forEach((item) => {
        switch (item.slidingdoortype) {
            case 1:
                $('#form-createFitting #input-slidedoor1-amount').val(item.amount);
                break;
            case 2:
                $('#form-createFitting #input-slidedoorrail1-amount').val(item.amount);
                $('#form-createFitting #input-slidedoor1-size').val(item.length);
                break;
            case 3:
                $('#form-createFitting #input-slidedoor2-amount').val(item.amount);
                break;
            case 4:
                $('#form-createFitting #input-slidedoorrail2-amount').val(item.amount);
                $('#form-createFitting #input-slidedoor2-size').val(item.length);
                break;
            case 5:
                $('#form-createFitting #input-slidedoor3-amount').val(item.amount);
                break;
            case 6:
                $('#form-createFitting #input-slidedoorrail3-amount').val(item.amount);
                $('#form-createFitting #input-slidedoor3-size').val(item.length);
                break;
        };
    });

    data.electrical.forEach((item) => {
        switch (item.electricaltype) {
            case 1:
                $('#form-createFitting #input-elec1-amount').val(item.amount);
                break;
            case 2:
                $('#form-createFitting #input-elec2-amount').val(item.amount);
                break;
            case 3:
                $('#form-createFitting #input-elec3-amount').val(item.amount);
                $('#form-createFitting #input-elec3-color').val(item.color);
                break;
            case 4:
                $('#form-createFitting #input-elec4-amount').val(item.amount);
                break;
            case 5:
                $('#form-createFitting #input-elec5-amount').val(item.amount);
                break;
            case 6:
                $('#form-createFitting #input-elec6-amount').val(item.amount);
                break;
            case 7:
                $('#form-createFitting #input-elec7-amount').val(item.amount);
                break;
            case 8:
                $('#form-createFitting #input-elec8-amount').val(item.amount);
                break;
            case 9:
                $('#form-createFitting #input-elec9-amount').val(item.amount);
                break;
            case 10:
                $('#form-createFitting #input-elec10-amount').val(item.amount);
                break;
            case 11:
                $('#form-createFitting #input-elec11-amount').val(item.amount);
                break;
            case 12:
                $('#form-createFitting #input-elec12-amount').val(item.amount);
                break;
            case 13:
                $('#form-createFitting #input-elec13-amount').val(item.amount);
                break;
            case 14:
                $('#form-createFitting #input-elec14-amount').val(item.amount);
                break;
        };
    });

    data.edgeLaminate.forEach((item) => {
        switch (item.edgelaminatetype) {
            case 1:
                if (item.seqno == 1) {
                    $('#form-createFitting #input-edge1-color').val(item.color);
                }
                else if (item.seqno == 2) {
                    $('#form-createFitting #input-edge2-color').val(item.color);
                }
                else {
                    $('#form-createFitting #input-edge3-color').val(item.color);
                }
                break;
            case 2:
                if (item.seqno == 1) {
                    $('#form-createFitting #input-edge4-color').val(item.color);
                }
                else if (item.seqno == 2) {
                    $('#form-createFitting #input-edge5-color').val(item.color);
                }
                else {
                    $('#form-createFitting #input-edge6-color').val(item.color);
                }
                break;
            case 3:
                if (item.seqno == 1) {
                    $('#form-createFitting #input-edge7-color').val(item.color);
                }
                else if (item.seqno == 2) {
                    $('#form-createFitting #input-edge8-color').val(item.color);
                }
                else {
                    $('#form-createFitting #input-edge9-color').val(item.color);
                }
                break;
            case 4:
                $('#form-createFitting #input-edge10-amount').val(item.amount);
                break;
        };
    });

    data.otherFitting.forEach((item) => {
        switch (item.otherfittingtype) {
            case 1:
                $('#form-createFitting #input-other1-amount').val(item.amount);
                $('#form-createFitting #input-other1-color').val(item.color);
                break;
            case 2:
                $('#form-createFitting #input-other2-amount').val(item.amount);
                $('#form-createFitting #input-other2-color').val(item.color);
                break;
            case 3:
                $('#form-createFitting #input-other3-amount').val(item.amount);
                $('#form-createFitting #input-other3-size').val(item.size);
                break;
            case 4:
                $('#form-createFitting #input-other4-amount').val(item.amount);
                break;
            case 5:
                $('#form-createFitting #input-other5-amount').val(item.amount);
                break;
            case 6:
                $('#form-createFitting #input-other6-amount').val(item.amount);
                break;
            case 7:
                $('#form-createFitting #input-other7-amount').val(item.amount);
                break;
            case 8:
                $('#form-createFitting #input-other8-amount').val(item.amount);
                break;
            case 9:
                $('#form-createFitting #input-other9-amount').val(item.amount);
                break;
            case 10:
                $('#form-createFitting #input-other10-amount').val(item.amount);
                break;
        };
    });

    data.frameTrim.forEach((item) => {
        switch (item.frametrimtype) {
            case 1:
                $('#form-createFitting #input-fandc1-amount').val(item.amount);
                $('#form-createFitting #input-fandc1-color').val(item.color);
                break;
            case 2:
                $('#form-createFitting #input-fandc2-amount').val(item.amount);
                break;
            case 3:
                $('#form-createFitting #input-fandc3-amount').val(item.amount);
                $('#form-createFitting #input-fandc3-color').val(item.color);
                $('#form-createFitting #input-fandc3-size').val(item.size);
                break;
            case 4:
                $('#form-createFitting #input-fandc4-amount').val(item.amount);
                $('#form-createFitting #input-fandc4-color').val(item.color);
                $('#form-createFitting #input-fandc4-size').val(item.size);
                break;
            case 5:
                $('#form-createFitting #input-fandc5-amount').val(item.amount);
                $('#form-createFitting #input-fandc5-size').val(item.size);
                break;
            case 6:
                $('#form-createFitting #input-fandc6-amount').val(item.amount);
                $('#form-createFitting #input-fandc6-color').val(item.color);
                $('#form-createFitting #input-fandc6-size').val(item.size);
                break;
            case 7:
                if (item.seqno == 1) {
                    $('#form-createFitting #input-fandc7-amount').val(item.amount);
                    $('#form-createFitting #input-fandc7-number').val(item.number);
                    $('#form-createFitting #input-fandc7-size').val(item.size);
                }
                else {
                    $('#form-createFitting #input-fandc8-amount').val(item.amount);
                    $('#form-createFitting #input-fandc8-number').val(item.number);
                    $('#form-createFitting #input-fandc8-size').val(item.size);
                }
                break;
            case 8:
                $('#form-createFitting #input-fandc9-amount').val(item.amount);
                $('#form-createFitting #input-fandc9-number').val(item.number);
                break;
            case 9:
                if (item.seqno == 1) {
                    $('#form-createFitting #input-fandc10-amount').val(item.amount);
                    $('#form-createFitting #input-fandc10-color').val(item.color);

                }
                else {
                    $('#form-createFitting #input-fandc11-amount').val(item.amount);
                    $('#form-createFitting #input-fandc11-color').val(item.color);
                }
                break;
            case 10:
                $('#form-createFitting #input-fandc12-amount').val(item.amount);
                break;
        };
    });
}

function clearSearchForm(area) {
    switch (area) {
        case "planks":
            $('#form-search-planks #input-search-quotation-code').val('');
            $('#form-search-planks #select-search-planks-status').val('').trigger('change');
            break;
        case "spec":
            $('#form-search-spec-queue #input-search-spec-quotation-number').val('');
            $('#form-search-spec-queue #input-search-spec-design-name').val('');
            $('#form-search-spec-queue #select-search-spec-checklist-status').val('').trigger('change');
            $('#form-search-spec-queue #input-search-spec-install-date').val('');
            break;
        case "fitting":
            $('#form-search-fitting #input-search-fitting-code').val('');
            $('#form-search-fitting #input-search-quotation-code').val('');
            break;
    }
}

function clearFormSpec(modal) {
    switch (modal) {
        case "modal-createFitting":
            callGetFittingCode();
            $("#form-createFitting #lblfullname").text('');
            $('#input-hinge1-amount').val('');
            $('#input-hinge2-amount').val('');
            $('#input-hinge3-amount').val('');
            $('#input-hinge4-amount').val('');
            $('#input-hinge4-desc').val('');
            $('#input-drawerrail1-amount').val('');
            $('#input-bouncepress-amount').val('');
            $('#input-drawerrail2-amount').val('');
            $('#input-drawerrail3-amount').val('');
            $('input-drawerrailsize-desc').val('');
            $('#input-slidedoor1-amount').val('');
            $('#input-slidedoorrail1-amount').val('');
            $('#input-slidedoor1-size').val('')
            $('#input-slidedoor2-amount').val('');
            $('#input-slidedoorrail2-amount').val('');
            $('#input-slidedoor2-size').val('')

            $('#input-slidedoor3-amount').val('');

            $('#input-slidedoorrail3-amount').val('');
            $('#input-slidedoor3-size').val('')

            $('#input-elec1-amount').val('');
            $('#input-elec2-amount').val('');
            $('#input-elec3-amount').val('');
            $('#input-elec1-color').val()

            $('#input-elec4-amount').val('');

            $('#input-elec5-amount').val('');
            $('#input-elec6-amount').val('');
            $('#input-elec7-amount').val('');
            $('#input-elec8-amount').val('');
            $('#input-elec9-amount').val('');
            $('#input-elec10-amount').val('');
            $('#input-elec11-amount').val('');
            $('#input-elec12-amount').val('');
            $('#input-elec13-amount').val('');
            $('#input-elec14-amount').val('');

            $('#input-edge1-color').val('');
            $('#input-edge2-color').val('');
            $('#input-edge3-color').val('');
            $('#input-edge4-color').val('');
            $('#input-edge5-color').val('');
            $('#input-edge6-color').val('');
            $('#input-edge7-color').val('');
            $('#input-edge8-color').val('');
            $('#input-edge9-color').val('');
            $('#input-edge10-amount').val('')

            $('#input-other1-color').val('');
            $('#input-other1-amount').val('');

            $('#input-other2-color').val('');
            $('#input-other2-amount').val('');

            $('#input-other3-amount').val('');
            $('#input-other3-size').val()

            $('#input-other4-amount').val('');

            $('#input-other5-amount').val('');

            $('#input-other6-amount').val('');

            $('#input-other7-amount').val('');

            $('#input-other8-amount').val('');

            $('#input-other9-amount').val('');

            $('#input-other10-amount').val('');

            $('#input-fandc1-color').val('');
            $('#input-fandc1-amount').val('')
            $('#input-fandc2-amount').val('')


            $('#input-fandc3-color').val('');
            $('#input-fandc3-amount').val('');
            $('#input-fandc3-size').val('');

            $('#input-fandc4-color').val('');
            $('#input-fandc4-amount').val('');
            $('#input-fandc4-size').val('');

            $('#input-fandc5-amount').val('');
            $('#input-fandc5-size').val('');

            $('#input-fandc6-color').val('');
            $('#input-fandc6-amount').val('');
            $('#input-fandc6-size').val('');

            $('#input-fandc7-amount').val('');
            $('#input-fandc7-size').val('');
            $('#input-fandc7-number').val('');

            $('#input-fandc8-amount').val('');
            $('#input-fandc8-size').val();
            $('#input-fandc8-number').val('');
            $('#input-fandc9-amount').val('');

            $('#input-fandc9-number').val('');

            $('#input-fandc10-color').val('');
            $('#input-fandc10-amount').val('');

            $('#input-fandc11-color').val('');
            $('#input-fandc11-amount').val('');

            $('#input-fandc12-amount').val('');

            $('#input-fitting-id').val('')
            $('#select-fitting-quotation-no').val('');
            $('#input-minifixset-amount').val('');
            $('#input-woodendowel-amount').val('');
            $('#input-other-desc').val('');

            break;
    }
}

function DoAddOrUpdatePlanks(modal) {
    if (!validateInputSpec(modal)) return;

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
            callAddOrUpdatePlanks(_product_item_action);
        }
    });
}

function DoAddOrUpdateFitting(modal) {
    if (!validateInputSpec(modal)) return;

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
            callAddOrUpdateFitting(_product_item_action);
        }
    });
}

let validateInputSpec = function (modal) {

    switch (modal) {
        case "modal-createPlanks":
            var table = document.getElementById("tb-planks-detail");
            var tbodyRowCount = table.tBodies[0].rows.length;
            if (tbodyRowCount == 0) {
                Swal.fire({
                    text: "กรุณาเพิ่มข้อมูล",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createPlanks #select-quotation-no').focus();
                });
                return false;
            }
            //else if ($('#form-createPlanks #input-color-code').val() == "") {
            //    Swal.fire({
            //        text: "กรุณากรอกรหัสสี",
            //        icon: 'warning',
            //        showCancelButton: false,
            //        confirmButtonColor: _modal_primary_color_code,
            //        //cancelButtonColor: _modal_default_color_code,
            //        confirmButtonText: 'ตกลง'
            //    }).then((result) => {
            //        $('#form-createPlanks #input-color-code').focus();
            //    });
            //    return false;
            //}
            //else if ($('#form-createPlanks #input-18mm-amount').val() == "") {
            //    Swal.fire({
            //        text: "กรุณากรอกจำนวนของ 18mm",
            //        icon: 'warning',
            //        showCancelButton: false,
            //        confirmButtonColor: _modal_primary_color_code,
            //        //cancelButtonColor: _modal_default_color_code,
            //        confirmButtonText: 'ตกลง'
            //    }).then((result) => {
            //        $('#form-createPlanks #input-18mm-amount').focus();
            //    });
            //    return false;
            //}
            //else if ($('#form-createPlanks #input-9mm-amount').val() == "") {
            //    Swal.fire({
            //        text: "กรุณากรอกจำนวนของ 9mm",
            //        icon: 'warning',
            //        showCancelButton: false,
            //        confirmButtonColor: _modal_primary_color_code,
            //        //cancelButtonColor: _modal_default_color_code,
            //        confirmButtonText: 'ตกลง'
            //    }).then((result) => {
            //        $('#form-createPlanks #input-9mm-amount').focus();
            //    });
            //    return false;
            //}

            else { return true; }
            break;
        case "modal-editSpec":
            if ($('#form-editSpec #select-edit-spec-designName').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกผู้รับผิดชอบออกแบบ Spec",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-editSpec #select-edit-spec-designName').focus();
                });
                return false;
            }

            else if ($('#form-editSpec #input-edit-spec-due-date').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือก วันที่กำหนดส่งงาน",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-editSpec #input-edit-spec-due-date').focus();
                });
                return false;
            }
            else if (_product_item_action == "add") {
                if (!$('#liMaster1 #chkMaster1').is(":checked")) {
                    Swal.fire({
                        text: "กรุณาเลือกยืนยันสถานะปัจจุบัน",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#liMaster1 #chkMaster1').focus();
                    });
                    return false;
                }
                else {
                    return true;
                }
            }
            else if (_product_item_action == "edit") {
                if (_maxIDcheck != "") {

                    if ($('#form-editSpec #txtquotationedit').val() == "") {
                        Swal.fire({
                            text: "กรุณาเลือกใบเสนอราคา",
                            icon: 'warning',
                            showCancelButton: false,
                            confirmButtonColor: _modal_primary_color_code,
                            //cancelButtonColor: _modal_default_color_code,
                            confirmButtonText: 'ตกลง'
                        }).then((result) => {
                            $('#form-editSpec #txtquotationedit').focus();
                        });
                        return false;
                    }
                    //else if (_maxIDcheck == "#chkMaster2" && $('#form-editSpec #txtvideourl').val() == "") {
                    //    Swal.fire({
                    //        text: "กรุณากรอก url สำหรับ video",
                    //        icon: 'warning',
                    //        showCancelButton: false,
                    //        confirmButtonColor: _modal_primary_color_code,
                    //        //cancelButtonColor: _modal_default_color_code,
                    //        confirmButtonText: 'ตกลง'
                    //    }).then((result) => {
                    //        $('#form-editSpec #txtvideourl').focus();
                    //    });
                    //    return false;
                    //}
                    else if (_maxIDcheck == "#chkMaster4" && $('#form-editSpec #txtApproveDate').val() == "") {
                        Swal.fire({
                            text: "กรุณากรอก เลือกวันที่ยืนยัน",
                            icon: 'warning',
                            showCancelButton: false,
                            confirmButtonColor: _modal_primary_color_code,
                            //cancelButtonColor: _modal_default_color_code,
                            confirmButtonText: 'ตกลง'
                        }).then((result) => {
                            $('#form-editSpec #txtApproveDate').focus();
                        });
                        return false;
                    }
                    else if (!$(`${_liMaxID} ${_maxIDcheck}`).is(":checked")) {
                        Swal.fire({
                            text: "กรุณาเลือกยืนยันสถานะปัจจุบัน",
                            icon: 'warning',
                            showCancelButton: false,
                            confirmButtonColor: _modal_primary_color_code,
                            //cancelButtonColor: _modal_default_color_code,
                            confirmButtonText: 'ตกลง'
                        }).then((result) => {
                            $(`${_liMaxID} ${_maxIDcheck}`).focus();
                        });
                        return false;
                    }
                    else {
                        return true;
                    }
                }

            }
            else { return true; }
            break;
        case "modal-printFrameCalculate":
            if ($('#form-printFrameCalculate #input-print-calno').val() == "") {
                Swal.fire({
                    text: "กรุณาทำรายการใหม่อีกครั้ง",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-printFrameCalculate #input-print-calno').focus();
                });
                return false;
            }
            else if ($('#form-printFrameCalculate #select-calprint-cust').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกรายชื่อลูกค้าก่อนทำการพิมพ์",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-printFrameCalculate #select-calprint-cust').focus();
                });
                return false;
            }

            else { return true; }
            break;
        case "modal-printClearglassCalculate":
            if ($('#form-printClearglassCalculate #input-print-calno-clearglass').val() == "") {
                Swal.fire({
                    text: "กรุณาทำรายการใหม่อีกครั้ง",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-printClearglassCalculate #input-print-calno-clearglass').focus();
                });
                return false;
            }
            else if ($('#form-printClearglassCalculate #select-calprint-clearglass').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกรายชื่อลูกค้าก่อนทำการพิมพ์",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-printClearglassCalculate #select-calprint-clearglass').focus();
                });
                return false;
            }

            else { return true; }
            break;
        case "modal-ReprintFrameCalculate":
            if ($('#form-ReprintFrameCalculate #input-reprint-calno').val() == "") {
                Swal.fire({
                    text: "กรุณาทำรายการใหม่อีกครั้ง",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-ReprintFrameCalculate #input-reprint-calno').focus();
                });
                return false;
            }
            else if ($('#form-ReprintFrameCalculate #select-calreprint-cust').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกรายชื่อลูกค้าก่อนทำการพิมพ์",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-ReprintFrameCalculate #select-calreprint-cust').focus();
                });
                return false;
            }

            else { return true; }
            break;
        case "modal-ReprintClearglassCalculate":
            if ($('#form-ReprintClearglassCalculate #input-reprint-calno-clearglass').val() == "") {
                Swal.fire({
                    text: "กรุณาทำรายการใหม่อีกครั้ง",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-ReprintClearglassCalculate #input-reprint-calno-clearglass').focus();
                });
                return false;
            }
            else if ($('#form-ReprintClearglassCalculate #select-calreprint-cust-clearglass').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกรายชื่อลูกค้าก่อนทำการพิมพ์",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-ReprintClearglassCalculate #select-calreprint-cust-clearglass').focus();
                });
                return false;
            }

            else { return true; }
            break;
        case "modal-createFitting":
            if ($('#form-createFitting #select-fitting-quotation-no').val() == "" && _product_item_action != "edit") {
                Swal.fire({
                    text: "กรุณาเลือกเลขใบเสนอราคา",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createFitting #select-fitting-quotation-no').focus();
                });
                return false;
            }
            else if ($('#form-createFitting #input-fitting-no').val() == "") {
                Swal.fire({
                    text: "ไม่สามารถทำรายการได้ กรุณาลองใหม่อีกครั้ง",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createFitting #input-fitting-no').focus();
                });
                return false;
            }
            else { return true; }
            break;
    }
};

function callAddOrUpdatePlanks() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/Planks/AddItem` : `${app_settings.api_url}/api/Planks/UpdateItem`;

    var table = document.getElementById("tb-planks-detail");
    var tbodyRowCount = table.tBodies[0].rows.length;
    var PlanksData = new Array();
    if (tbodyRowCount > 0) {
        $("#tb-planks-detail tbody tr").each(function () {
            var row = $(this);
            var PlanksDetail = {};
            PlanksDetail.id = row.find("td").eq(0).html();
            PlanksDetail.plankid = row.find("td").eq(1).html();
            PlanksDetail.thicknesstype = row.find("td").eq(2).html();
            PlanksDetail.colorcode = row.find("td").eq(3).html();
            PlanksDetail.amount = row.find("td").eq(5).html();
            PlanksDetail.remark = row.find("td").eq(6).html();
            PlanksData.push(PlanksDetail);
        });
    }
    var obj = {
        id: ($('#input-planks-id').val() == "") ? 0 : $('#input-planks-id').val(),
        orderid: _product_item_action == 'add' ? $('#form-createPlanks #select-quotation-no').val() : $('#form-createPlanks #hd-quotation-no').val(),
        status: ($('#form-createPlanks #select-planks-status').val() == "1") ? true : false,
        loginCode: _userCode,
        /* listdelid: $('#hddelproductcodelist').val(),*/
        planksDetailsModels: PlanksData,
        DeleteID: $('#form-createPlanks #hddelplankslist').val()
    };

    console.log($('#form-createPlanks #input-planks-id').val());
    //var obj = {
    //    id: ($('#input-planks-id').val() == "") ? 0 : $('#input-planks-id').val(),
    //    orderid: _product_item_action == 'add' ? $('#select-quotation-no').val() : $('#form-createPlanks input[name="hd-quotation-no"]').val(),
    //    colorCode: $('#input-color-code').val(),
    //    thickness18MM: $('#input-18mm-amount').val(),
    //    thickness9MM: $('#input-9mm-amount').val(),
    //    status: ($('#form-createPlanks #select-planks-status').val() == "1") ? true : false,
    //    loginCode: _userCode
    //};


    $('.btn-modal-save-planks').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-planks').removeLoading();
                $(`#modal-createPlanks`).modal('hide');
                $('.btn-modal-save-planks').removeLoading();
                callSpecListQuatationNoPlanks('#form-createPlanks #select-quotation-no', 'กรุณาเลือก');
                callPlanksList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "รายการนี้มีอยู่แล้ว กรุณาออกแล้วทำอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createPlanks #select-quotation-no').focus();
                    });
                }
                $('.btn-modal-save-planks').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-planks').removeLoading();
        }
    });

}

function callAddOrUpdateFitting() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/Fitting/AddItem` : `${app_settings.api_url}/api/Fitting/UpdateItem`;

    var Hinge = [];
    Hinge.push({
        hingetype: 1,
        amount: $('#input-hinge1-amount').val(),
    });
    Hinge.push({
        hingetype: 2,
        amount: $('#input-hinge2-amount').val(),
    });
    Hinge.push({
        hingetype: 3,
        amount: $('#input-hinge3-amount').val(),
    });
    Hinge.push({
        hingetype: 4,
        amount: $('#input-hinge4-amount').val(),
        othertext: $('#input-hinge4-desc').val()

    });

    var DrawerRail = [];
    DrawerRail.push({
        drawerrailtype: 1,
        amount: $('#input-drawerrail1-amount').val(),
        pressbounceamount: $('#input-bouncepress-amount').val(),
        /*     othersize: $('#input-hinge4-amount').val(),*/
    });
    DrawerRail.push({
        drawerrailtype: 2,
        amount: $('#input-drawerrail2-amount').val(),
        /*     pressbounceamount: $('#input-bouncepress-amount').val(),*/
        /*     othersize: $('#input-hinge4-amount').val(),*/
    });
    DrawerRail.push({
        drawerrailtype: 3,
        amount: $('#input-drawerrail3-amount').val(),
        /*     pressbounceamount: $('#input-bouncepress-amount').val(),*/
        othersize: $('#input-drawerrailsize-desc').val()
    });

    var SlideDoor = [];
    SlideDoor.push({
        slidingdoortype: 1,
        amount: $('#input-slidedoor1-amount').val(),
        /*        length: $('#input-drawerrail3-amount').val(),*/
    });
    SlideDoor.push({
        slidingdoortype: 2,
        amount: $('#input-slidedoorrail1-amount').val(),
        length: $('#input-slidedoor1-size').val()
    });
    SlideDoor.push({
        slidingdoortype: 3,
        amount: $('#input-slidedoor2-amount').val(),
        /*     length: $('#input-slidedoor1-size').val()*/
    });
    SlideDoor.push({
        slidingdoortype: 4,
        amount: $('#input-slidedoorrail2-amount').val(),
        length: $('#input-slidedoor2-size').val()
    });
    SlideDoor.push({
        slidingdoortype: 5,
        amount: $('#input-slidedoor3-amount').val(),
        /* length: $('#input-slidedoor2-size').val()*/
    });
    SlideDoor.push({
        slidingdoortype: 6,
        amount: $('#input-slidedoorrail3-amount').val(),
        length: $('#input-slidedoor3-size').val()
    });

    var Electrical = [];
    Electrical.push({
        electricaltype: 1,
        amount: $('#input-elec1-amount').val(),
        /* color: $('#input-slidedoorrail3-amount').val()*/
    });
    Electrical.push({
        electricaltype: 2,
        amount: $('#input-elec2-amount').val(),
        /* color: $('#input-slidedoorrail3-amount').val()*/
    });
    Electrical.push({
        electricaltype: 3,
        amount: $('#input-elec3-amount').val(),
        color: $('#input-elec1-color').val()
    });
    Electrical.push({
        electricaltype: 4,
        amount: $('#input-elec4-amount').val(),
        /* color: $('#input-slidedoorrail3-amount').val()*/
    });
    Electrical.push({
        electricaltype: 5,
        amount: $('#input-elec5-amount').val(),
        /* color: $('#input-slidedoorrail3-amount').val()*/
    });
    Electrical.push({
        electricaltype: 6,
        amount: $('#input-elec6-amount').val(),
        /* color: $('#input-slidedoorrail3-amount').val()*/
    });
    Electrical.push({
        electricaltype: 7,
        amount: $('#input-elec7-amount').val(),
        /* color: $('#input-slidedoorrail3-amount').val()*/
    });
    Electrical.push({
        electricaltype: 8,
        amount: $('#input-elec8-amount').val(),
        /* color: $('#input-slidedoorrail3-amount').val()*/
    });
    Electrical.push({
        electricaltype: 9,
        amount: $('#input-elec9-amount').val(),
        /* color: $('#input-slidedoorrail3-amount').val()*/
    });
    Electrical.push({
        electricaltype: 10,
        amount: $('#input-elec10-amount').val(),
        /* color: $('#input-slidedoorrail3-amount').val()*/
    });
    Electrical.push({
        electricaltype: 11,
        amount: $('#input-elec11-amount').val(),
        /* color: $('#input-slidedoorrail3-amount').val()*/
    });
    Electrical.push({
        electricaltype: 12,
        amount: $('#input-elec12-amount').val(),
        /* color: $('#input-slidedoorrail3-amount').val()*/
    });
    Electrical.push({
        electricaltype: 13,
        amount: $('#input-elec13-amount').val(),
        /* color: $('#input-slidedoorrail3-amount').val()*/
    });
    Electrical.push({
        electricaltype: 14,
        amount: $('#input-elec14-amount').val(),
        /* color: $('#input-slidedoorrail3-amount').val()*/
    });

    var EdgeLaminate = [];
    EdgeLaminate.push({
        edgelaminatetype: 1,
        color: $('#input-edge1-color').val(),
        seqno: 1,
        /*        amount: $('#input-elec14-amount').val()*/
    });
    EdgeLaminate.push({
        edgelaminatetype: 1,
        color: $('#input-edge2-color').val(),
        seqno: 2,
        /*        amount: $('#input-elec14-amount').val()*/
    });
    EdgeLaminate.push({
        edgelaminatetype: 1,
        color: $('#input-edge3-color').val(),
        seqno: 3,
        /*        amount: $('#input-elec14-amount').val()*/
    });
    EdgeLaminate.push({
        edgelaminatetype: 2,
        color: $('#input-edge4-color').val(),
        seqno: 1,
        /*        amount: $('#input-elec14-amount').val()*/
    });
    EdgeLaminate.push({
        edgelaminatetype: 2,
        color: $('#input-edge5-color').val(),
        seqno: 2,
        /*        amount: $('#input-elec14-amount').val()*/
    });
    EdgeLaminate.push({
        edgelaminatetype: 2,
        color: $('#input-edge6-color').val(),
        seqno: 3,
        /*        amount: $('#input-elec14-amount').val()*/
    });
    EdgeLaminate.push({
        edgelaminatetype: 3,
        color: $('#input-edge7-color').val(),
        seqno: 1,
        /*        amount: $('#input-elec14-amount').val()*/
    });
    EdgeLaminate.push({
        edgelaminatetype: 3,
        color: $('#input-edge8-color').val(),
        seqno: 2,
        /*        amount: $('#input-elec14-amount').val()*/
    });
    EdgeLaminate.push({
        edgelaminatetype: 3,
        color: $('#input-edge9-color').val(),
        seqno: 3,
        /*        amount: $('#input-elec14-amount').val()*/
    });
    EdgeLaminate.push({
        edgelaminatetype: 4,
        //color: $('#input-edge9-color').val(),
        //seqno: 3,
        amount: $('#input-edge10-amount').val()
    });

    var OtherFitting = [];
    OtherFitting.push({
        otherfittingtype: 1,
        color: $('#input-other1-color').val(),
        amount: $('#input-other1-amount').val(),
        /*size: $('#input-edge10-amount').val()*/
    });
    OtherFitting.push({
        otherfittingtype: 2,
        color: $('#input-other2-color').val(),
        amount: $('#input-other2-amount').val(),
        /*size: $('#input-edge10-amount').val()*/
    });
    OtherFitting.push({
        otherfittingtype: 3,
        //color: $('#input-other1-color').val(),
        amount: $('#input-other3-amount').val(),
        size: $('#input-other3-size').val()
    });
    OtherFitting.push({
        otherfittingtype: 4,
        //color: $('#input-other1-color').val(),
        amount: $('#input-other4-amount').val(),
        /*        size: $('#input-other3-size').val()*/
    });
    OtherFitting.push({
        otherfittingtype: 5,
        //color: $('#input-other1-color').val(),
        amount: $('#input-other5-amount').val(),
        /* size: $('#input-other3-size').val()*/
    });
    OtherFitting.push({
        otherfittingtype: 6,
        //color: $('#input-other1-color').val(),
        amount: $('#input-other6-amount').val(),
        /* size: $('#input-other3-size').val()*/
    });
    OtherFitting.push({
        otherfittingtype: 7,
        //color: $('#input-other1-color').val(),
        amount: $('#input-other7-amount').val(),
        /* size: $('#input-other3-size').val()*/
    });
    OtherFitting.push({
        otherfittingtype: 8,
        //color: $('#input-other1-color').val(),
        amount: $('#input-other8-amount').val(),
        /* size: $('#input-other3-size').val()*/
    });
    OtherFitting.push({
        otherfittingtype: 9,
        //color: $('#input-other1-color').val(),
        amount: $('#input-other9-amount').val(),
        /* size: $('#input-other3-size').val()*/
    });
    OtherFitting.push({
        otherfittingtype: 10,
        //color: $('#input-other1-color').val(),
        amount: $('#input-other10-amount').val(),
        /* size: $('#input-other3-size').val()*/
    });

    var FrameTrim = [];
    FrameTrim.push({
        frametrimtype: 1,
        color: $('#input-fandc1-color').val(),
        amount: $('#input-fandc1-amount').val()
        //size: $('#input-other10-amount').val(),
        //number: $('#input-other10-amount').val(),
        //seqno: $('#input-other10-amount').val()
    });
    FrameTrim.push({
        frametrimtype: 2,
        /* color: $('#input-fandc1-color').val(),*/
        amount: $('#input-fandc2-amount').val()
        //size: $('#input-other10-amount').val(),
        //number: $('#input-other10-amount').val(),
        //seqno: $('#input-other10-amount').val()
    });
    FrameTrim.push({
        frametrimtype: 3,
        color: $('#input-fandc3-color').val(),
        amount: $('#input-fandc3-amount').val(),
        size: $('#input-fandc3-size').val(),
        //number: $('#input-other10-amount').val(),
        //seqno: $('#input-other10-amount').val()
    });
    FrameTrim.push({
        frametrimtype: 4,
        color: $('#input-fandc4-color').val(),
        amount: $('#input-fandc4-amount').val(),
        size: $('#input-fandc4-size').val(),
        //number: $('#input-other10-amount').val(),
        //seqno: $('#input-other10-amount').val()
    });
    FrameTrim.push({
        frametrimtype: 5,
        /*        color: $('#input-fandc4-color').val(),*/
        amount: $('#input-fandc5-amount').val(),
        size: $('#input-fandc5-size').val(),
        //number: $('#input-other10-amount').val(),
        //seqno: $('#input-other10-amount').val()
    });
    FrameTrim.push({
        frametrimtype: 6,
        color: $('#input-fandc6-color').val(),
        amount: $('#input-fandc6-amount').val(),
        size: $('#input-fandc6-size').val(),
        //number: $('#input-other10-amount').val(),
        //seqno: $('#input-other10-amount').val()
    });
    FrameTrim.push({
        frametrimtype: 7,
        /*   color: $('#input-fandc6-color').val(),*/
        amount: $('#input-fandc7-amount').val(),
        size: $('#input-fandc7-size').val(),
        number: $('#input-fandc7-number').val(),
        seqno: 1
    });
    FrameTrim.push({
        frametrimtype: 7,
        /*   color: $('#input-fandc6-color').val(),*/
        amount: $('#input-fandc8-amount').val(),
        size: $('#input-fandc8-size').val(),
        number: $('#input-fandc8-number').val(),
        seqno: 2
    });
    FrameTrim.push({
        frametrimtype: 8,
        /*        color: $('#input-fandc4-color').val(),*/
        amount: $('#input-fandc9-amount').val(),
        /*        size: $('#input-fandc5-size').val(),*/
        number: $('#input-fandc9-number').val(),
        //seqno: $('#input-other10-amount').val()
    });
    FrameTrim.push({
        frametrimtype: 9,
        color: $('#input-fandc10-color').val(),
        amount: $('#input-fandc10-amount').val(),
        /*        size: $('#input-fandc5-size').val(),*/
        /*      number: $('#input-fandc9-number').val(),*/
        seqno: 1
    });
    FrameTrim.push({
        frametrimtype: 9,
        color: $('#input-fandc11-color').val(),
        amount: $('#input-fandc11-amount').val(),
        /*        size: $('#input-fandc5-size').val(),*/
        /*      number: $('#input-fandc9-number').val(),*/
        seqno: 2
    });
    FrameTrim.push({
        frametrimtype: 10,
        /*        color: $('#input-fandc11-color').val(),*/
        amount: $('#input-fandc12-amount').val(),
        /*        size: $('#input-fandc5-size').val(),*/
        /*      number: $('#input-fandc9-number').val(),*/
        /* seqno: 2*/
    });

    var obj = {
        id: ($('#input-fitting-id').val() == "") ? 0 : $('#input-fitting-id').val(),
        fittingcode:  $('#input-fitting-no').val(),
        orderid: _product_item_action != "edit" ? $('#select-fitting-quotation-no').val() : $('input-quotation-no').val(),
        minifixset: $('#input-minifixset-amount').val(),
        woodendowel: $('#input-woodendowel-amount').val(),
        otherdescription: $('#input-other-desc').val(),
        loginCode: _userCode,
        Hinge: Hinge,
        SlideDoor: SlideDoor,
        Electrical: Electrical,
        DrawerRail: DrawerRail,
        OtherFitting: OtherFitting,
        EdgeLaminate: EdgeLaminate,
        FrameTrim: FrameTrim
    };
       console.log(obj);
    $('.btn-modal-save-fitting').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $('.btn-modal-save-fitting').removeLoading();
                $(`#modal-createFitting`).modal('hide');
                callSpecListQuatationNoFitting('#form-createFitting #select-fitting-quotation-no', 'กรุณาเลือก');
                callFittingList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "รายการนี้มีอยู่แล้ว กรุณาออกแล้วทำอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#modal-createFitting #input-fitting-id').focus();
                    });
                }
                $('.btn-modal-save-fitting').removeLoading();
            }
        },
        error: () => {
            $('.btn-modal-save-fitting').removeLoading();
        }
    });

}

function callQuatationNo(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Planks/GetQuatationList`,
        success: function (data) {
            /*            console.log(data);*/
            renderQuatationNoSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}

function callSpecListQuatationNo(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/SpecList/GetQuatationList`,
        success: function (data) {
            renderQuatationNoSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}

function callSpecListQuatationNoPlanks(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/SpecList/GetQuatationListPlanks`,
        success: function (data) {
            renderQuatationNoSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}

function callSpecListQuatationNoFitting(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Fitting/GetQuatationListFitting`,
        success: function (data) {
            renderQuatationNoSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}

function callSpecListQuatationNoCal(select2Id, select2FirstText, type) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetQuatationListCal?type=${type}`,
        success: function (data) {
            /*          console.log(data);*/
            renderQuatationNoSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}


function renderQuatationNoSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.orderId}">${v.quotationNumber}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}

function callGetSpecList() {
    let formId = '#form-search-spec-queue';

    let quotationNumber = ($(`${formId} #input-search-spec-quotation-number`).val() == '') ? null : $(`${formId} #input-search-spec-quotation-number`).val();
    let empName = ($(`${formId} #input-search-spec-design-name`).val() == '') ? null : $(`${formId} #input-search-spec-design-name`).val();
    let checklistStatus = ($(`${formId} #select-search-spec-checklist-status`).val() == '') ? null : $(`${formId} #select-search-spec-checklist-status`).val();
    let installDate = ($(`${formId} #input-search-spec-install-date`).val() == '') ? null : $(`${formId} #input-search-spec-install-date`).val();

    let loaded = $('#tb-spec-queue-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/SpecList/GetSpecList?quotaioncode=${quotationNumber}&empName=${empName}&checkListStatus=${checklistStatus}&installDate=${installDate}`,
        success: function (data) {

            renderGetSpecQueueList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function renderGetSpecQueueList(data) {
    $('#tb-spec-queue-list').DataTable(
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
                $(row).attr('data-orderid', data.orderId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "hidecol",
                },
                {
                    targets: 1,
                    data: 'orderid',
                    className: "hidecol",
                },
                {
                    targets: 2,
                    data: 'quotationNumber',
                    className: "dt-center",
                },
                {
                    targets: 3,
                    data: 'installDate',
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.installDate ? convertDateTimeFormat(row.installDate, 'DD/MM/YYYY') : "";
                    },
                },
                {
                    targets: 4,
                    data: 'fullName',
                    className: "dt-center",
                },
                {
                    targets: 5,
                    data: 'commitDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.commitDate ? convertDateTimeFormat(row.commitDate, 'DD/MM/YYYY') : "-";
                    },
                },
                {
                    targets: 6,
                    data: 'checklistStatus',
                    className: "dt-center",
                },
                {
                    targets: 7,
                    data: 'lastUpdateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.lastUpdateDate ? convertDateTimeFormat(row.lastUpdateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 8,
                    data: 'lastUpdateBy'
                },
                {
                    targets: 9,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_spec_class_display}`,
                    render: function (data, type, row) {
                        /*       console.log(row);*/
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-spec" data-orderid="${row.orderid}" data-specid="${row.id}" data-step="${row.statusid}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}

function clearInputForm() {
    let formId = '#form-editSpec';
    $(`${formId} #select-edit-spec-quotation`).val('').trigger('change');
    $(`${formId} #input-edit-spec-install-date`).val('');
    $(`${formId} #select-edit-spec-designName`).val('').trigger('change');
    $(`${formId} #input-edit-spec-due-date`).val('');
    $(`${formId} #input-edit-spec-checklist-status`).trigger('change');
    /*    $(`${formId} #chkFinal3D`).prop('checked', false);*/
}

function clearInputPlankForm() {
    let formId = '#form-createPlanks';

    $(`${formId} #select-edit-spec-quotation`).val('').trigger('change');
    $(`${formId} #select-quotation-no`).val('').trigger('change');
    $(`${formId} #select-quotation-no`).css('display', '');
    $(`${formId} #input-quotation-no`).css('display', 'none');
    $(`${formId} #input-color-code`).val('');
    $(`${formId} #input-18mm-amount`).val('');
    $(`${formId} #input-9mm-amount`).val('');

}

function renderEditSpec(orderid, specid, statusid) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/SpecList/GetSpecListByID?id=${specid}&orderid=${orderid}`,
        success: function (data) {
            renderSpecToForm(data, specid);
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}

function renderSpecToForm(data, specid) {
    console.log(specid);
    let maxValue = Math.max.apply(null,
        data.dataspec.map(function (o) { return o.statusid; }));

    data.dataspec.forEach((d) => {
        $(`#chkMaster${d.statusid}`).prop('checked', true);
        //if (d.statusid == 2) {
        //    $(`#txtvideourl`).val(d.videourl);
        //}
        if (d.statusid == 4) {
            $(`#txtApproveDate`).val(d.approveDate);
        }
    });
    if (data.dataspec.length == 0) {
        maxValue = 0;
    }

    _maxIDcheck = `#chkMaster${maxValue + 1}`;
    _liMaxID = `#liMaster${maxValue + 1}`;
    console.log(_maxIDcheck);
    if (maxValue < 6) {
        $(`#chkMaster${maxValue + 1}`).removeAttr("onclick");
    }

    /* $('#chkMaster1').attr("onclick", "return false;");*/
    //if (_maxIDcheck == "#chkMaster2") {
    //    $('#chkMaster2').attr("onclick", "handleClick(this);");

    //}
    if (_maxIDcheck == "#chkMaster4") {
        $('#chkMaster4').attr("onclick", "handleClickApproveDate(this);");
    }

    let formId = '#form-editSpec';
    $(`${formId} #input-spec-id`).val(specid);
    $(`${formId} #txtquotationedit`).val(data.custOrder.quotationNumber);

    /*    $(`${formId} #input-edit-spec-quotation`).val(data.dataspec[0].orderid);*/
    var installDate = data.custOrder.installDate ? convertDateTimeFormat(data.custOrder.installDate, 'DD/MM/YYYY') : ""
    $(`${formId} #input-edit-spec-install-date`).val(installDate);
    /* let d = new Date(data.dataspec[0].approveDate);*/

    if (data.dataspec != null && data.dataspec.length > 0) {
        if (data.dataspec[0].approveDate != null) {
            var now = new Date(data.dataspec[0].approveDate);

            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);

            var today = now.getFullYear() + "-" + (month) + "-" + (day);

            /* var approveDate = data.dataspec[0].approveDate ? convertDateTimeFormat('2024-04-30', 'DD/MM/YYYY') : ""*/
            $(`${formId} #txtApproveDate`).val(today);
        }
    }



    //if (data.custOrder.ownerEmpId == 0) {
    //    $(`${formId} #select-edit-spec-designName`).val('');
    //}
    //else {
    //    $(`${formId} #select-edit-spec-designName`).val(data.custOrder.ownerEmpId);
    //}

    $(`${formId} #input-cus-product-length`).val(data.custOrderDetail[0].orderLength);
    $(`${formId} #input-cus-product-depth`).val(data.custOrderDetail[0].orderDepth);
    $(`${formId} #input-cus-product-height`).val(data.custOrderDetail[0].orderHeight);
    $(`${formId} #input-foreman-note`).val(data.custOrder.orderNote);
    $(`${formId} #txtproductcustomer`).val(data.listproductname);

    /*  var dueDate = data.custOrder.dueDate ? convertDateTimeFormat(data.custOrder.dueDate, 'YYYY-MM-DD') : "";*/

    /*   $(`${formId} #input-edit-3d-due-date`).val(dueDate);*/
    //$(`${formId} #input-edit-3d-checklist-status`).val(data.custOrder.checklistStatus);

    var foreImg = data.imagesForeman.filter(v => { return v.categoryName == "foremanUpload" });

    var lstForeUrl = [];
    var lstForePreviewImg = [];
    foreImg.forEach((a) => {
        lstForeUrl.push(`${a.url}`);

        var addPreview = {
            caption: a.fileName,
            //width: '120px',
            //url: '/localhost/public/delete',
            key: a.uploadOrderDetailId,
            extra: { id: a.uploadOrderDetailId }
        };

        lstForePreviewImg.push(addPreview);
    });

    $(`${formId} #display-picture-from-foreman`).fileinput('destroy');
    if (foreImg.length > 0) {
        $(`${formId} #display-picture-from-foreman`).fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: false,
            showUpload: false,
            showCaption: false,
            initialPreview: lstForeUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstForePreviewImg
            ],
            browseOnZoneClick: true,
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
        });
    }
    renderImageUpload(formId, data.uploadRef);



    /*    $(`${formId} #chkFinal3D`).prop('checked', data.custOrder.isCheckFinal3d);*/
}
function formatDate(date) {
    let day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    let year = date.getFullYear();
    return day + "/" + month + "/" + year;
}
function settxtHeader(steptype) {
    var txt = '';
    switch (steptype) {
        case 1: txt = 'บันทึกรับเรื่อง';
            break;
        case 2: txt = 'ส่งวีดีโอ Approved ลูกค้าดราฟต์ 1';
            break;
        case 3: txt = 'ระหว่างดำเนินการแก้ไขแบบ';
            break;
        case 4: txt = 'แบบ Spec Approved';
            break;
        case 5: txt = 'งานเอกสารติดตั้งจบ';
            break;
        case 6: txt = 'ส่งใบสั่งไม้ไปยังสโตรแล้ว';
            break;
        case 7: txt = 'ส่งใบจัดฟิตติ้งไปยังสโตรแล้ว';
            break;
        case 8: txt = 'ส่งใบสั่งกระจกไปยังจัดซื้อแล้ว';
            break;
        case 9: txt = 'ส่งใบสั่งเฟรมไปยังสโตรแล้ว';
            break;
        default: break;
    }
    return txt;
}

function renderNewSpecToForm(data) {

    let formId = '#form-editSpec';

    $(`${formId} #input-edit-3d-quotation`).val(data.custOrder.quotationNumber);
    var installDate = data.custOrder.installDate ? convertDateTimeFormat(data.custOrder.installDate, 'DD/MM/YYYY') : ""
    $(`${formId} #input-edit-spec-install-date`).val(installDate);


    if (data.custOrder.ownerEmpId == 0) {
        $(`${formId} #select-edit-spec-designName`).val('');
    }
    else {
        $(`${formId} #select-edit-spec-designName`).val(data.custOrder.ownerEmpId);
    }

    $(`${formId} #input-cus-product-length`).val(data.custOrderDetail[0].orderLength);
    $(`${formId} #input-cus-product-depth`).val(data.custOrderDetail[0].orderDepth);
    $(`${formId} #input-cus-product-height`).val(data.custOrderDetail[0].orderHeight);
    $(`${formId} #input-foreman-note`).val(data.custOrder.orderNote);

    /*  var dueDate = data.custOrder.dueDate ? convertDateTimeFormat(data.custOrder.dueDate, 'YYYY-MM-DD') : "";*/

    /*   $(`${formId} #input-edit-3d-due-date`).val(dueDate);*/
    //$(`${formId} #input-edit-3d-checklist-status`).val(data.custOrder.checklistStatus);

    var foreImg = data.imagesForeman.filter(v => { return v.categoryName == "foremanUpload" });

    var lstForeUrl = [];
    var lstForePreviewImg = [];
    foreImg.forEach((a) => {
        lstForeUrl.push(`${a.url}`);

        var addPreview = {
            caption: a.fileName,
            //width: '120px',
            //url: '/localhost/public/delete',
            key: a.uploadOrderDetailId,
            extra: { id: a.uploadOrderDetailId }
        };

        lstForePreviewImg.push(addPreview);
    });

    $(`${formId} #display-picture-from-foreman`).fileinput('destroy');
    if (foreImg.length > 0) {
        $(`${formId} #display-picture-from-foreman`).fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: false,
            showUpload: false,
            showCaption: false,
            initialPreview: lstForeUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstForePreviewImg
            ],
            browseOnZoneClick: true,
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
        });
    }



    renderImageUpload(formId, data.uploadRef);

    /*    $(`${formId} #chkFinal3D`).prop('checked', data.custOrder.isCheckFinal3d);*/
}
function renderImageUpload(formId, data) {
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
            showBrowse: false,
            showUpload: false,
            showCaption: false,
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
            browseLabel: 'เลือกไฟล์'
        });
    }

}

function onQuotatiChange() {
    var val = document.getElementById("select-edit-spec-quotation").value;
    if (val != '') {
        $.ajax({
            type: 'GET',
            url: `${app_settings.api_url}/api/SpecList/GetNewSpecListByID?id=${val}`,
            success: function (data) {
                renderNewSpecToForm(data);
            },
            error: function (err) {
                //loaded.find(loader).remove();
            }
        });
    }
    //else {
    //    $('#form-createSubGroup input[name="input-subgroup-code"]').val('');
    //}
}

function onFittingQuotatiChange() {
    var val = $('#form-createFitting #select-fitting-quotation-no').val();
    if (val != '') {
        $.ajax({
            type: 'GET',
            url: `${app_settings.api_url}/api/Fitting/GetNameByOrderID?id=${val}`,
            success: function (data) {
                $("#lblfullname").text(data);
            },
            error: function (err) {
                //loaded.find(loader).remove();
            }
        });
    }
    //else {
    //    $('#form-createSubGroup input[name="input-subgroup-code"]').val('');
    //}
}

//function renderNewSpec(id) {
//    $.ajax({
//        type: 'GET',
//        url: `${app_settings.api_url}/api/SpecList/GetEdiSpecByOrderId?orderId=${id}`,
//        success: function (data) {
//            renderNewSpecToForm(data);
//        },
//        error: function (err) {
//            //loaded.find(loader).remove();
//        }
//    });
//}

function renderDesign3DNameSelectSpec(data) {
    $(`#form-editSpec #select-edit-spec-designName`).empty();
    $(`#form-editSpec #select-edit-spec-designName`).append(`<option value="">กรุณาเลือก</option>`);
    data.forEach((v) => {
        $(`#form-editSpec #select-edit-spec-designName`).append(`<option value="${v.empId}">${v.fullName}</option>`);
    });
    $(`#form-editSpec #select-edit-spec-designName`).val('').trigger('change');
}

function callGetDesign3DNameSelectSpec() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Design3D/GetDesign3DNameSelect2`,
        success: function (data) {
            renderDesign3DNameSelectSpec(data);
        },
        error: function (err) {
        }
    });
}
function CreateNewCheckList() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/SpecList/GetMasterSpecList`,
        success: function (data) {
            renderMasterCheckList(data);
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}

function renderMasterCheckList(data) {
    $("#listChecklist").empty();
    data.forEach((v) => {
        /*       console.log(v.id);*/
        /*$("#listChecklist").append(`<option value="${v.orderId}">${v.quotationNumber}</option>`);*/
        if (v.id != 1) {
            switch (v.id) {
                //case 2:
                //    $("#listChecklist").append(`<li id="liMaster${v.id}" class="list-group-item border-0 d-flex align-items-center ps-0">
                //                   <input id="chkMaster${v.id}" name="chkMaster" class="form-check-input me-3 col-xl-2" type="checkbox" value="${v.id}" aria-label="..." onclick="return false;"/>
                //                   <label class="col-xl-3"> ${v.checklistname}</label>
                //                     <label class="col-xl-3 text-end" style="margin-right: 3%;">Video URL : </label><input class="form-control" type="text" id="txtvideourl" name="txtvideourl" disabled />
                //                    </li>`);
                //    break;
                case 4:
                    $("#listChecklist").append(`<li id="liMaster${v.id}" class="list-group-item border-0 d-flex align-items-center ps-0">
                                   <input id="chkMaster${v.id}" name="chkMaster" class="form-check-input me-3 col-xl-2" type="checkbox" value="${v.id}" aria-label="..." onclick="return false;"/>
                                   <label class="col-xl-3"> ${v.checklistname}</label>
                                     <label class="col-xl-3 text-end" style="margin-right: 3%;">วันที่ลูกค้า Approved : </label><input class="form-control" type="date" id="txtApproveDate" name="txtApproveDate"  disabled/>
                                    </li>`);
                    break;
                default:
                    $("#listChecklist").append(`<li id="liMaster${v.id}" class="list-group-item border-0 d-flex align-items-center ps-0">
                                   <input id="chkMaster${v.id}" name="chkMaster" class="form-check-input me-3" type="checkbox" value="${v.id}" aria-label="..." onclick="return false;"/>
                                    ${v.checklistname}</li>`);
            }
        }
        else {
            $("#listChecklist").append(`<li id="liMaster${v.id}" class="list-group-item border-0 d-flex align-items-center ps-0">
                                   <input id="chkMaster${v.id}" name="chkMaster" class="form-check-input me-3" type="checkbox" value="${v.id}" aria-label="..." onclick="return false;"/>
                                    ${v.checklistname}</li>`);
        }


    });
}

//function handleClick(cb) {
//    if (cb.checked) {
//        $("#txtvideourl").removeAttr("disabled");
//    }
//    else {
//        $("#txtvideourl").attr('disabled', 'disabled');
//    }
//}

function handleClickApproveDate(cb) {
    /*    console.log(cb);*/
    if (cb.checked) {
        $("#txtApproveDate").removeAttr("disabled");
    }
    else {
        $("#txtApproveDate").attr('disabled', 'disabled');
    }
}


function callSaveSpec() {
    if (!validateInputSpec("modal-editSpec")) { return; }

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
            DoSaveSpec();
        }
    });
}

function DoSaveSpec() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/SpecList/AddItem` : `${app_settings.api_url}/api/SpecList/UpdateItem`;
    var listurl = '';
    if (_product_item_action == "edit") {
        let checkboxes =
            document.getElementsByName('chkMaster');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                if (listurl == '') {
                    listurl = checkboxes[i].value;
                }
                else {
                    listurl += ',' + checkboxes[i].value;
                }
            }
        }
        /*   console.log($('#input-spec-id').val());*/
        var obj = {
            id: ($('#input-spec-id').val() == "") ? 0 : $('#input-spec-id').val(),
            quotationnumber: $('#txtquotationedit').val(),
            commitdate: $('#input-edit-spec-due-date').val(),
            empid: $('#select-edit-spec-designName').val(),
            listStatus: listurl,
            /*    vieoUrl: $('#txtvideourl').val(),*/
            approveDate: $('#txtApproveDate').val(),
            loginCode: _userCode
        };

        $('.btn-modal-save-spec').addLoading();
        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: JSON.stringify(obj),
            success: (res) => {
                if (res.result) {

                    callSuccessAlert();
                    /*         console.log(res);*/
                    $('.btn-modal-save-spec').removeLoading();
                    $(`#modal-editSpec`).modal('hide');
                    /*               console.log(res);*/
                    callGetSpecList();
                }
                else {

                    $('.btn-modal-save-spec').removeLoading();
                }
            },
            error: () => {
                $('.btn-modal-save-spec').removeLoading();
            }
        });
    }
    else {
        //var obj = {
        //    id: ($('#input-spec-id').val() == "") ? 0 : $('#input-spec-id').val(),
        //    orderid: $('#select-edit-spec-quotation').val(),
        //    commitdate: $('#input-edit-spec-due-date').val(),
        //    empid: $('#select-edit-spec-designName').val(),
        //    checkliststatus: $('#chkMaster1').val(),
        //    loginCode: _userCode
        //};
        let checkboxes =
            document.getElementsByName('chkMaster');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                if (listurl == '') {
                    listurl = checkboxes[i].value;
                }
                else {
                    listurl += ',' + checkboxes[i].value;
                }
            }
        }

        var obj = {
            id: 0,
            orderid: $("#input-order-id").val(),
            commitdate: $('#input-edit-spec-due-date').val(),
            empid: $('#select-edit-spec-designName').val(),
            checkliststatus: listurl,
            loginCode: _userCode
        };
        $('.btn-modal-save-spec').addLoading();

        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: JSON.stringify(obj),
            success: (res) => {
                if (res.result) {
                    callSuccessAlert();
                    $('.btn-modal-save-spec').removeLoading();
                    $(`#modal-editSpec`).modal('hide');
                    callGetSpecList();
                }
                else {
                    //if (res.resultStatus == 'duplicate') {
                    //    Swal.fire({
                    //        text: "ชื่อหมวดหมู่หลักมีอยู่แล้ว กรุณากรอกชื่อหมวดหมู่หลักอีกครั้ง",
                    //        icon: 'warning',
                    //        showCancelButton: false,
                    //        confirmButtonColor: _modal_primary_color_code,
                    //        //cancelButtonColor: _modal_default_color_code,
                    //        confirmButtonText: 'ตกลง'
                    //    }).then((result) => {
                    //        $('#form-createSubGroup #input-subgroup-name').focus();
                    //    });
                    //}
                    $('.btn-modal-save-spec').removeLoading();
                }
            },
            error: () => {
                $('.btn-modal-save-spec').removeLoading();
            }
        });

    }

}

function callSelectDoorType(id, isSearch = false) {
    $(id).empty();
    if (isSearch) {
        $(id).append(`<option value="">กรุณาเลือก</option>`);
    }
    $(id).append(`<option value="S">บานเดี่ยว</option>`);
    $(id).append(`<option value="M">บานคู่</option>`);
}

function callGetCalculateCode() {
    let url = `${app_settings.api_url}/api/Calculate/GetLastestItemId`;

    $.ajax({
        url: url,
        type: 'GET',
        success: (res) => {
            $('#form-add-calculate input[name="input-insert-calulate-code"]').val(res);
            $('#form-add-calculate-clearglass input[name="input-insert-calulate-code-clearglass"]').val(res);
        },
        error: () => {
        }
    });
}

function callGetFittingCode() {
    let url = `${app_settings.api_url}/api/Fitting/GetLastestItemId`;

    $.ajax({
        url: url,
        type: 'GET',
        success: (res) => {
            $('#form-createFitting input[name="input-fitting-no"]').val(res);
        },
        error: () => {
        }
    });
}

function renderCalFrameList(data) {

    $('#tb-search-frameglass-list').DataTable(
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
                    data: 'calculatecode',

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
                    data: 'createBy',
                    className: "dt-center",

                },
                {
                    targets: 4,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-view-calf" data-id="${row.calculatecode}" title="ดูข้อมูล">
                    <i class="fa fa-magnifying-glass"></i></button>`;
                    },
                },
                {
                    targets: 5,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-print-calf" data-id="${row.calculatecode}" data-calid="${row.id}" title="พิมพ์">
                    <i class="fa fa-print"></i></button>`;
                    },
                },
            ],
        }
    );
}

function renderCalClearList(data) {

    $('#tb-search-clearglass-list').DataTable(
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
                    data: 'calculatecode',

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
                    data: 'createBy',
                    className: "dt-center",

                },
                {
                    targets: 4,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-view-calc" data-id="${row.calculatecode}" title="ดูข้อมูล">
                    <i class="fa fa-magnifying-glass"></i></button>`;
                    },
                },
                {
                    targets: 5,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-print-calc" data-id="${row.calculatecode}" data-calid="${row.id}" title="พิมพ์">
                    <i class="fa fa-print"></i></button>`;
                    },
                },
            ],
        }
    );
}
function renderviewCalFrameList(data) {

    $('#tb-view-frameglass-list').DataTable(
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
                    data: 'productname',

                },
                {
                    targets: 2,
                    data: 'masterheigh',
                },
                {
                    targets: 3,
                    data: 'masterwidth',
                },
                {
                    targets: 4,
                    data: 'calheigh',
                },
                {
                    targets: 5,
                    data: 'calwidth'
                },
                {
                    targets: 6,
                    data: 'deburringheigh'
                },
                {
                    targets: 7,
                    data: 'deburringwidth'
                },
                {
                    targets: 8,
                    data: 'glassdoortype'
                },
            ],
        }
    );
}

function renderviewCalClearList(data) {

    $('#tb-view-clear-list').DataTable(
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
                    data: 'productname',

                },
                {
                    targets: 2,
                    data: 'masterheigh',
                },
                {
                    targets: 3,
                    data: 'masterwidth',
                },
                {
                    targets: 4,
                    data: 'calheigh',
                },
                {
                    targets: 5,
                    data: 'calwidth'
                },
                {
                    targets: 6,
                    data: 'glassdoortype'
                },
            ],
        }
    );
}

function renderCalClearGlassList(data) {

    $('#tb-search-clearglass-list').DataTable(
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
                    data: 'productname',

                },
                {
                    targets: 2,
                    data: 'masterheigh',
                },
                {
                    targets: 3,
                    data: 'masterwidth',
                },
                {
                    targets: 4,
                    data: 'calheigh',
                },
                {
                    targets: 5,
                    data: 'calwidth'
                },
                {
                    targets: 6,
                    data: 'glassdoortype'
                },
            ],
        }
    );
}

function callPrintCal(CalCode, DoorType, CreateDate, InstallDate, CustName, InstallAddress, hdcalculateMasterID, CustID, userid) {
    window.location = `/api/Calculate/ExportFrameCal?calcode=${CalCode}&glassdoorType=${DoorType}&CreateDate=${CreateDate}&InstallDate=${InstallDate}&CustName=${CustName}&InstallAddress=${InstallAddress}&hdcalculateMasterID=${hdcalculateMasterID}&CustID=${CustID}&userid=${userid}`;
}
function callRePrintCal(CalCode, DoorType, CreateDate, InstallDate, CustName, InstallAddress, hdcalculateMasterID, CustID, userid) {
    window.location = `/api/Calculate/ExportRePrintFrameCal?calcode=${CalCode}&glassdoorType=${DoorType}&CreateDate=${CreateDate}&InstallDate=${InstallDate}&CustName=${CustName}&InstallAddress=${InstallAddress}&hdcalculateMasterID=${hdcalculateMasterID}&CustID=${CustID}&userid=${userid}`;
}
function callPrintClearGlassCal(CalCode, DoorType, CreateDate, InstallDate, CustName, InstallAddress, hdcalculateMasterID, CustID, userid) {
    window.location = `/api/Calculate/ExportClearGlassCal?calcode=${CalCode}&glassdoorType=${DoorType}&CreateDate=${CreateDate}&InstallDate=${InstallDate}&CustName=${CustName}&InstallAddress=${InstallAddress}&hdcalculateMasterID=${hdcalculateMasterID}&CustID=${CustID}&userid=${userid}`;
}
function callRePrintClearGlassCal(CalCode, DoorType, CreateDate, InstallDate, CustName, InstallAddress, hdcalculateMasterID, CustID, userid) {
    window.location = `/api/Calculate/ExportReprintClearGlassCal?calcode=${CalCode}&glassdoorType=${DoorType}&CreateDate=${CreateDate}&InstallDate=${InstallDate}&CustName=${CustName}&InstallAddress=${InstallAddress}&hdcalculateMasterID=${hdcalculateMasterID}&CustID=${CustID}&userid=${userid}`;
}



function saveCalculate() {
    let loaded = $('#tb-frameglass-list');
    loaded.prepend(_loader);
    var SaveCalculate = {};
    var calListDetailData = new Array();
    var calcode = $('#form-add-calculate input[name="input-insert-calulate-code"]').val();
    if (calcode != '') {
        var table = document.getElementById("tb-frameglass-list");
        var tbodyRowCount = table.tBodies[0].rows.length;
        if (tbodyRowCount > 0) {
            $("#tb-frameglass-list tbody tr").each(function () {
                var row = $(this);
                var calListDetail = {};
                calListDetail.product = row.find("td").eq(0).html();
                calListDetail.glassdoortype = row.find("td").eq(1).html();
                calListDetail.producttext = row.find("td").eq(2).html();
                calListDetail.calhm = row.find("td").eq(3).html();
                calListDetail.calwm = row.find("td").eq(4).html();
                calListDetail.calh = row.find("td").eq(5).html();
                calListDetail.calw = row.find("td").eq(6).html();
                calListDetail.calhdel = row.find("td").eq(7).html();
                calListDetail.calwdel = row.find("td").eq(8).html();
                calListDetail.glassdoortypetext = row.find("td").eq(9).html();
                calListDetailData.push(calListDetail);
            });

            SaveCalculate.calculatecode = calcode;
            SaveCalculate.userlogin = _userCode;
            SaveCalculate.orderid = $('#form-add-calculate #select-cal-quotation-no').val();
            SaveCalculate.listdetail = calListDetailData;

            _calCode = calcode;
            $.ajax({
                type: 'POST',
                url: `${app_settings.api_url}/api/Calculate/AddGlassFrameItem`,
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                data: JSON.stringify(SaveCalculate),
                success: function (data) {

                    if (data.result && data.resultStatus == "success") {
                        callSuccessAlert();
                        callGetCalculateCode();
                        clearcalinsert();
                        callGetFrameList();
                        _issavecal = true;
                        $("#tb-frameglass-list tbody tr").remove();
                        $('#form-add-calculate #select-cal-quotation-no').removeAttr("disabled");
                        $('#form-add-calculate #select-cal-quotation-no').val('').trigger('change');
                        callStockProductData('#form-add-calculate #select-insert-product-item', 'กรุณาเลือก');
                    }
                    else {
                        Swal.fire({
                            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
                            icon: 'warning',
                            showCancelButton: false,
                            confirmButtonColor: _modal_primary_color_code,
                            //cancelButtonColor: _modal_default_color_code,
                            confirmButtonText: 'ตกลง'
                        }).then((result) => {

                        });
                    }
                    loaded.find(_loader).remove();
                },
                error: function (err) {
                    loaded.find(_loader).remove();
                }
            });
        }
        else {
            loaded.find(_loader).remove();
            Swal.fire({
                text: "กรุณาเพิ่มรายการก่อนบันทึก",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: _modal_primary_color_code,
                //cancelButtonColor: _modal_default_color_code,
                confirmButtonText: 'ตกลง'
            }).then((result) => {

            });
        }
    }
    else {
        Swal.fire({
            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {

        });
    }
}

function saveCalculateClearglass() {
    let loaded = $('#tb-clearglass-list');
    loaded.prepend(_loader);
    var SaveCalculate = {};
    var calListDetailData = new Array();
    var calcode = $('#form-add-calculate-clearglass input[name="input-insert-calulate-code-clearglass"]').val();
    if (calcode != '') {
        var table = document.getElementById("tb-clearglass-list");
        var tbodyRowCount = table.tBodies[0].rows.length;
        if (tbodyRowCount > 0) {
            $("#tb-clearglass-list tbody tr").each(function () {
                var row = $(this);
                var calListDetail = {};
                calListDetail.product = row.find("td").eq(0).html();
                calListDetail.glassdoortype = row.find("td").eq(1).html();
                calListDetail.producttext = row.find("td").eq(2).html();
                calListDetail.calhm = row.find("td").eq(3).html();
                calListDetail.calwm = row.find("td").eq(4).html();
                calListDetail.calh = row.find("td").eq(5).html();
                calListDetail.calw = row.find("td").eq(6).html();
                calListDetail.glassdoortypetext = row.find("td").eq(9).html();
                calListDetailData.push(calListDetail);
            });

            SaveCalculate.calculatecode = calcode;
            SaveCalculate.userlogin = _userCode;
            SaveCalculate.orderid = $('#form-add-calculate-clearglass #select-clearglass-quotation-no').val();
            SaveCalculate.listdetail = calListDetailData;
            _calCodeClearGlass = calcode;
            $.ajax({
                type: 'POST',
                url: `${app_settings.api_url}/api/Calculate/AddClearGlassItem`,
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                data: JSON.stringify(SaveCalculate),
                success: function (data) {
                    if (data.result && data.resultStatus == "success") {
                        callSuccessAlert();
                        callGetCalculateCode();
                        clearcalglassinsert();
                        _issaveglasscal = true;
                        $("#tb-clearglass-list tbody tr").remove();

                        $('#form-add-calculate-clearglass #select-clearglass-quotation-no').removeAttr("disabled");
                        $('#form-add-calculate-clearglass #select-clearglass-quotation-no').val('').trigger('change');
                    }
                    else {
                        Swal.fire({
                            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
                            icon: 'warning',
                            showCancelButton: false,
                            confirmButtonColor: _modal_primary_color_code,
                            //cancelButtonColor: _modal_default_color_code,
                            confirmButtonText: 'ตกลง'
                        }).then((result) => {

                        });
                    }
                    loaded.find(_loader).remove();
                },
                error: function (err) {
                    loaded.find(_loader).remove();
                }
            });
        }
        else {
            loaded.find(_loader).remove();
            Swal.fire({
                text: "กรุณาเพิ่มรายการก่อนบันทึก",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: _modal_primary_color_code,
                //cancelButtonColor: _modal_default_color_code,
                confirmButtonText: 'ตกลง'
            }).then((result) => {

            });
        }
    }
    else {
        Swal.fire({
            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {

        });
    }
}

function saveCalculatePrint() {
    let loaded = $('#tb-frameglass-list');
    loaded.prepend(_loader);
    var SaveCalculate = {};
    var calListDetailData = new Array();
    var calcode = $('#form-add-calculate input[name="input-insert-calulate-code"]').val();
    if (calcode != '') {
        var table = document.getElementById("tb-frameglass-list");
        var tbodyRowCount = table.tBodies[0].rows.length;
        if (tbodyRowCount > 0) {
            $("#tb-frameglass-list tbody tr").each(function () {
                var row = $(this);
                var calListDetail = {};
                calListDetail.product = row.find("td").eq(0).html();
                calListDetail.glassdoortype = row.find("td").eq(1).html();
                calListDetail.producttext = row.find("td").eq(2).html();
                calListDetail.calhm = row.find("td").eq(3).html();
                calListDetail.calwm = row.find("td").eq(4).html();
                calListDetail.calh = row.find("td").eq(5).html();
                calListDetail.calw = row.find("td").eq(6).html();
                calListDetail.calhdel = row.find("td").eq(7).html();
                calListDetail.calwdel = row.find("td").eq(8).html();
                calListDetail.glassdoortypetext = row.find("td").eq(9).html();
                calListDetailData.push(calListDetail);
            });

            SaveCalculate.calculatecode = calcode;
            SaveCalculate.userlogin = _userCode;
            SaveCalculate.orderid = $('#form-add-calculate #select-cal-quotation-no').val();
            SaveCalculate.listdetail = calListDetailData;
            _calCode = calcode;
            $.ajax({
                type: 'POST',
                url: `${app_settings.api_url}/api/Calculate/AddGlassFrameItem`,
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                data: JSON.stringify(SaveCalculate),
                success: function (data) {

                    if (data.result && data.resultStatus == "success") {

                        callGetCalculateCode();
                        clearcalinsert();
                        _issavecal = true;
                        $("#tb-frameglass-list tbody tr").remove();

                        if (_issavecal) {
                            $('#form-add-calculate #select-cal-quotation-no').removeAttr("disabled");
                            $('#form-add-calculate #select-cal-quotation-no').val('').trigger('change');
                            callCustItemCal('#form-printFrameCalculate #select-calprint-cust', 'กรุณาเลือก');
                            callPrintDoorType('#form-printFrameCalculate #select-calprint-glassdoortype', true);
                            callCalMaster(_calCode, "F");
                            $('#form-printFrameCalculate input[name="hdcalculateMasterID"]').val(data.calculateMasterID);
                            $('#form-printFrameCalculate input[name="input-print-calno"]').val(_calCode);
                            $(`#modal-printFrameCalculate #itemHeader`).text('พิมพ์สูตรคำนวน');
                            $('#modal-printFrameCalculate').modal('show');
                        }
                    }
                    else {
                        Swal.fire({
                            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
                            icon: 'warning',
                            showCancelButton: false,
                            confirmButtonColor: _modal_primary_color_code,
                            //cancelButtonColor: _modal_default_color_code,
                            confirmButtonText: 'ตกลง'
                        }).then((result) => {

                        });
                    }
                    loaded.find(_loader).remove();
                },
                error: function (err) {
                    loaded.find(_loader).remove();
                }
            });
        }
        else {
            Swal.fire({
                text: "กรุณาเพิ่มข้อมูล ก่อนพิมพ์รายการ",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: _modal_primary_color_code,
                //cancelButtonColor: _modal_default_color_code,
                confirmButtonText: 'ตกลง'
            }).then((result) => {

            });
        }
    }
    else {
        Swal.fire({
            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {

        });
    }
}

function saveCalculateClearglassPrint() {
    let loaded = $('#tb-clearglass-list');
    loaded.prepend(_loader);
    var SaveCalculate = {};
    var calListDetailData = new Array();
    var calcode = $('#form-add-calculate-clearglass input[name="input-insert-calulate-code-clearglass"]').val();
    if (calcode != '') {
        var table = document.getElementById("tb-clearglass-list");
        var tbodyRowCount = table.tBodies[0].rows.length;
        if (tbodyRowCount > 0) {
            $("#tb-clearglass-list tbody tr").each(function () {
                var row = $(this);
                var calListDetail = {};
                calListDetail.product = row.find("td").eq(0).html();
                calListDetail.glassdoortype = row.find("td").eq(1).html();
                calListDetail.producttext = row.find("td").eq(2).html();
                calListDetail.calhm = row.find("td").eq(3).html();
                calListDetail.calwm = row.find("td").eq(4).html();
                calListDetail.calh = row.find("td").eq(5).html();
                calListDetail.calw = row.find("td").eq(6).html();
                calListDetail.glassdoortypetext = row.find("td").eq(9).html();
                calListDetailData.push(calListDetail);
            });

            SaveCalculate.calculatecode = calcode;
            SaveCalculate.userlogin = _userCode;
            SaveCalculate.orderid = $('#form-add-calculate-clearglass #select-clearglass-quotation-no').val();
            SaveCalculate.listdetail = calListDetailData;
            _calCodeClearGlass = calcode;
            $.ajax({
                type: 'POST',
                url: `${app_settings.api_url}/api/Calculate/AddClearGlassItem`,
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                data: JSON.stringify(SaveCalculate),
                success: function (data) {
                    if (data.result && data.resultStatus == "success") {
                        callGetCalculateCode();
                        clearcalglassinsert();
                        _issaveglasscal = true;
                        $("#tb-clearglass-list tbody tr").remove();

                        if (_issaveglasscal) {

                            $('#form-add-calculate-clearglass #select-clearglass-quotation-no').removeAttr("disabled");
                            $('#form-add-calculate-clearglass #select-clearglass-quotation-no').val('').trigger('change');
                            callCustItemCal('#form-printClearglassCalculate #select-calprint-cust-clearglass', 'กรุณาเลือก');
                            callPrintDoorType('#form-printClearglassCalculate #select-calprint-glassdoortype-clearglass', true);
                            callCalMaster(_calCodeClearGlass, "C");

                            $('#form-printClearglassCalculate input[name="input-print-calno-clearglass"]').val(_calCodeClearGlass);
                            $('#form-printClearglassCalculate input[name="hdcalculateClearglassMasterID"]').val(data.calculateMasterID);
                            $(`#modal-printClearglassCalculate #itemHeader`).text('พิมพ์สูตรคำนวน');
                            $('#modal-printClearglassCalculate').modal('show');
                        }
                    }
                    else {
                        Swal.fire({
                            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
                            icon: 'warning',
                            showCancelButton: false,
                            confirmButtonColor: _modal_primary_color_code,
                            //cancelButtonColor: _modal_default_color_code,
                            confirmButtonText: 'ตกลง'
                        }).then((result) => {

                        });
                    }
                    loaded.find(_loader).remove();
                },
                error: function (err) {
                    loaded.find(_loader).remove();
                }
            });
        }
        else {
            loaded.find(_loader).remove();
            Swal.fire({
                text: "กรุณาเพิ่มข้อมูล ก่อนพิมพ์รายการ",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: _modal_primary_color_code,
                //cancelButtonColor: _modal_default_color_code,
                confirmButtonText: 'ตกลง'
            }).then((result) => {

            });
        }
    }
    else {
        Swal.fire({
            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {

        });
    }
}

function RePrintFrame() {

    var calcode = $('#form-search-calculate input[name="input-search-calulate-code"]').val();
    if (calcode != '') {

        callCustItemCal('#form-ReprintFrameCalculate #select-calreprint-cust', 'กรุณาเลือก');
        callPrintDoorType('#form-ReprintFrameCalculate #select-calreprint-glassdoortype', true);
        callReCalMaster(calcode, "F");
        $('#form-ReprintFrameCalculate input[name="input-reprint-calno"]').val(calcode);
        $(`#modal-ReprintFrameCalculate #itemHeader`).text('พิมพ์สูตรคำนวน');
        $('#modal-ReprintFrameCalculate').modal('show');
    }
    else {
        Swal.fire({
            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {

        });
    }
}

function getPrintDetail(calcode) {
    /*  var calcode = $('#form-search-calculate input[name="input-search-calulate-code"]').val();*/
    if (calcode != '') {
        var table = $('#tb-view-frameglass-list').DataTable();

        //clear datatable
        table.clear().draw();
        callViewFrameList(calcode)
        $(`#modal-ViewprintFrameCalculate #itemHeader`).text('แสดงรายละเอียกสูตรคำนวน');
        $('#modal-ViewprintFrameCalculate').modal('show');
    }
    else {
        Swal.fire({
            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {

        });
    }
}
function getPrintDetailClear(calcode) {
    /*  var calcode = $('#form-search-calculate input[name="input-search-calulate-code"]').val();*/
    if (calcode != '') {
        var table = $('#tb-view-clear-list').DataTable();

        //clear datatable
        table.clear().draw();
        callViewClearList(calcode)
        $(`#modal-ViewClearglassCalculate #itemHeader`).text('แสดงรายละเอียกสูตรคำนวน');
        $('#modal-ViewClearglassCalculate').modal('show');
    }
    else {
        Swal.fire({
            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {

        });
    }
}
function RePrintFrameList(calcode, calid) {

    /*  var calcode = $('#form-search-calculate input[name="input-search-calulate-code"]').val();*/
    if (calcode != '') {

        callCustItemCal('#form-ReprintFrameCalculate #select-calreprint-cust', 'กรุณาเลือก');
        callPrintDoorType('#form-ReprintFrameCalculate #select-calreprint-glassdoortype', true);
        callReCalMaster(calcode, "F");
        getSelectCustPrint(calid);
        $('#form-ReprintFrameCalculate input[name="hdcalculateMasterID"]').val(calid);
        $('#form-ReprintFrameCalculate input[name="input-reprint-calno"]').val(calcode);
        $(`#modal-ReprintFrameCalculate #itemHeader`).text('พิมพ์สูตรคำนวน');
        $('#modal-ReprintFrameCalculate').modal('show');

    }
    else {
        Swal.fire({
            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {

        });
    }
}

function RePrintGlassList(calcode, calid) {

    /*  var calcode = $('#form-search-calculate input[name="input-search-calulate-code"]').val();*/
    if (calcode != '') {
        callCustItemCal('#form-ReprintClearglassCalculate #select-calreprint-cust-clearglass', 'กรุณาเลือก');
        callPrintDoorType('#form-ReprintClearglassCalculate #select-calreprint-glassdoortype-clearglass', true);
        callReCalMaster(calcode, "C");
        $('#form-ReprintClearglassCalculate input[name="input-reprint-calno-clearglass"]').val(calcode);
        $('#form-ReprintClearglassCalculate input[name="hdcalculateClearglass"]').val(calid);

        $(`#modal-ReprintClearglassCalculate #itemHeader`).text('พิมพ์สูตรคำนวน');
        $('#modal-ReprintClearglassCalculate').modal('show');
    }
    else {
        Swal.fire({
            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {

        });
    }
}
function callPrintDoorType(id, isSearch = false) {
    $(id).empty();
    if (isSearch) {
        $(id).append(`<option value="A">-- ทั้งหมด --</option>`);
    }
    $(id).append(`<option value="S">บานเดี่ยว</option>`);
    $(id).append(`<option value="M">บานคู่</option>`);
}
function ReprintClearGlass() {

    var calcode = $('#form-search-calculate-clearglass input[name="input-search-calulate-code-clearglass"]').val();
    if (calcode != '') {
        callCustItemCal('#form-ReprintClearglassCalculate #select-calreprint-cust-clearglass', 'กรุณาเลือก');
        callPrintDoorType('#form-ReprintClearglassCalculate #select-calreprint-glassdoortype-clearglass', true);
        callReCalMaster(calcode, "C");
        $('#form-ReprintClearglassCalculate input[name="input-reprint-calno-clearglass"]').val(calcode);
        $(`#modal-ReprintClearglassCalculate #itemHeader`).text('พิมพ์สูตรคำนวน');
        $('#modal-ReprintClearglassCalculate').modal('show');
    }
    else {
        Swal.fire({
            text: "ทำรายการไม่สำเร็จ กรุณาทำรายการอีกครั้ง",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {

        });
    }
}


function DoPrintCal(modal) {
    if (!validateInputSpec(modal)) return;

    Swal.fire({
        title: 'คุณต้องการพิมพ์สูตรคำนวนหรือไม่',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
        //cancelButtonColor: _modal_default_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            var calCode = $('#form-printFrameCalculate input[name="input-print-calno"]').val();
            var CreateDate = $('#form-printFrameCalculate #input-print-createdate').val();
            var DoorType = $('#form-printFrameCalculate #select-calprint-glassdoortype').val();
            var InstallDate = $('#form-printFrameCalculate #input-print-installdate').val();
            var CustName = $('#form-printFrameCalculate #select-calprint-cust option:selected').text();
            var InstallAddress = document.getElementById('input-print-address').value;
            var hdcalculateMasterID = $('#form-printFrameCalculate input[name="hdcalculateMasterIDPrint"]').val();
            var userid = _userCode;
            var CustID = $('#form-printFrameCalculate #select-calprint-cust option:selected').val();
            callPrintCal(calCode, DoorType, CreateDate, InstallDate, CustName, InstallAddress, hdcalculateMasterID, CustID, userid);
            $('#modal-printFrameCalculate').modal('hide');
        }
    });
}

function DoRePrintCal(modal) {
    if (!validateInputSpec(modal)) return;

    Swal.fire({
        title: 'คุณต้องการพิมพ์สูตรคำนวนหรือไม่',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
        //cancelButtonColor: _modal_default_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            var calCode = $('#form-ReprintFrameCalculate input[name="input-reprint-calno"]').val();
            var CreateDate = $('#form-ReprintFrameCalculate #input-reprint-createdate').val();
            var DoorType = $('#form-ReprintFrameCalculate #select-calreprint-glassdoortype').val();
            var InstallDate = $('#form-ReprintFrameCalculate #input-reprint-installdate').val();
            var CustName = $('#form-ReprintFrameCalculate #select-calreprint-cust option:selected').text();
            var CustID = $('#form-ReprintFrameCalculate #select-calreprint-cust option:selected').val();
            var InstallAddress = document.getElementById('input-reprint-address').value;
            var hdcalculateMasterID = $('#form-ReprintFrameCalculate input[name="hdcalculateMasterID"]').val();
            var userid = _userCode;
            callRePrintCal(calCode, DoorType, CreateDate, InstallDate, CustName, InstallAddress, hdcalculateMasterID, CustID, userid);
            $('#modal-ReprintFrameCalculate').modal('hide');
            $('#form-search-calculate input[name="input-search-calulate-code"]').val('');
            $('.btn-print-search-calculate').css('display', 'none');
            callGetFrameList();
            /*$('#tb-search-frameglass-list').DataTable().clear();*/

        }
    });
}

function DoPrintClearGlassCal(modal) {
    if (!validateInputSpec(modal)) return;

    Swal.fire({
        title: 'คุณต้องการพิมพ์สูตรคำนวนหรือไม่',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
        //cancelButtonColor: _modal_default_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            var calCode = $('#form-printClearglassCalculate input[name="input-print-calno-clearglass"]').val();
            var CreateDate = $('#form-printClearglassCalculate #input-print-createdate-clearglass').val();
            var DoorType = $('#form-printClearglassCalculate #select-calprint-glassdoortype-clearglass').val();
            var InstallDate = $('#form-printClearglassCalculate #input-print-installdate-clearglass').val();
            var CustName = $('#form-printClearglassCalculate #select-calprint-cust-clearglass option:selected').text();
            var InstallAddress = document.getElementById('input-print-address-clearglass').value;
            var hdcalculateMasterID = $('#form-printClearglassCalculate input[name="hdcalculateClearglassMasterID"]').val();
            var userid = _userCode;
            var CustID = $('#form-printClearglassCalculate #select-calprint-cust-clearglass option:selected').val();

            callPrintClearGlassCal(calCode, DoorType, CreateDate, InstallDate, CustName, InstallAddress, hdcalculateMasterID, CustID, userid);
            $('#modal-printClearglassCalculate').modal('hide');
        }
    });
}

function DoRePrintClearGlassCal(modal) {
    if (!validateInputSpec(modal)) return;

    Swal.fire({
        title: 'คุณต้องการพิมพ์สูตรคำนวนหรือไม่',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
        //cancelButtonColor: _modal_default_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            var calCode = $('#form-ReprintClearglassCalculate input[name="input-reprint-calno-clearglass"]').val();
            var CreateDate = $('#form-ReprintClearglassCalculate #input-reprint-createdate-clearglass').val();
            var DoorType = $('#form-ReprintClearglassCalculate #select-calreprint-glassdoortype-clearglass').val();
            var InstallDate = $('#form-ReprintClearglassCalculate #input-reprint-installdate-clearglass').val();
            var CustName = $('#form-ReprintClearglassCalculate #select-calreprint-cust-clearglass option:selected').text();
            var InstallAddress = document.getElementById('input-reprint-address-clearglass').value;
            var hdcalculateMasterID = $('#form-ReprintClearglassCalculate input[name="hdcalculateClearglass"]').val();
            var userid = _userCode;
            var CustID = $('#form-ReprintClearglassCalculate #select-calreprint-cust-clearglass option:selected').val();
            callRePrintClearGlassCal(calCode, DoorType, CreateDate, InstallDate, CustName, InstallAddress, hdcalculateMasterID, CustID, userid);
            $('#modal-ReprintClearglassCalculate').modal('hide');

            $('#form-search-calculate-clearglass input[name="input-search-calulate-code-clearglass"]').val('');
            $('.btn-print-search-calculate-clearglass').css('display', 'none');
            callGetGlassList();
        }
    });
}
function callCustItemCal(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetCustListSelect`,
        success: function (data) {
            renderCustItemDataSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}

function renderCustItemDataSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.custId}">${v.custFirstName}  ${v.custSurName}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change');
}

function callCalMaster(CalCode, Type) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetCalMasterByCode?calculatecode=${CalCode}`,
        success: function (data) {

            var setDate = new Date(data[0].createDate);

            var fulldate = setDate.getDate() + "/" + (setDate.getMonth() + 1) + "/" + setDate.getFullYear();
            if (Type == "F") {
                $('#form-printFrameCalculate input[name="input-print-createdate"]').val(fulldate);
            }
            else {
                $('#form-printClearglassCalculate input[name="input-print-createdate-clearglass"]').val(fulldate);
            }
        },
        error: function (err) {
        }
    });
}

function getSelectCustPrint(calid) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetCalPrintByID?calculateMasterID=${calid}`,
        success: function (data) {

            if (data != null) {
                $('#form-ReprintFrameCalculate #select-calreprint-cust').val(data.custid).trigger('change');
            }
        },
        error: function (err) {
        }
    });
}

function callReCalMaster(CalCode, Type) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetCalMasterByCode?calculatecode=${CalCode}`,
        success: function (data) {

            var setDate = new Date(data[0].createDate);

            var fulldate = setDate.getDate() + "/" + (setDate.getMonth() + 1) + "/" + setDate.getFullYear();
            if (Type == "F") {
                $('#form-ReprintFrameCalculate input[name="input-reprint-createdate"]').val(fulldate);
            }
            else {
                $('#form-ReprintClearglassCalculate input[name="input-reprint-createdate-clearglass"]').val(fulldate);
            }
        },
        error: function (err) {
        }
    });
}

function clearcalinsert() {
    $('#form-add-calculate #input-insert-heigh-cupboard').val('');
    $('#form-add-calculate #input-insert-width-cupboard').val('');
    $('#form-add-calculate #select-insert-glassdoor-type').val('').trigger('change');
    $('#form-add-calculate #select-insert-product-item').val('').trigger('change');

    $('#form-add-calculate #select-cal-quotation-no').removeAttr("disabled");
    $('#form-add-calculate #select-cal-quotation-no').val('').trigger('change');
}

function clearcalinsert2() {
    $('#form-add-calculate #input-insert-heigh-cupboard').val('');
    $('#form-add-calculate #input-insert-width-cupboard').val('');
    $('#form-add-calculate #select-insert-glassdoor-type').val('').trigger('change');
    $('#form-add-calculate #select-insert-product-item').val('').trigger('change');

    //$('#form-add-calculate #select-cal-quotation-no').removeAttr("disabled");
    //$('#form-add-calculate #select-cal-quotation-no').val('').trigger('change');
}

function clearcalglassinsert() {
    $('#form-add-calculate-clearglass #input-insert-heigh-cupboard-clearglass').val('');
    $('#form-add-calculate-clearglass #input-insert-width-cupboard-clearglass').val('');
    $('#form-add-calculate-clearglass #select-insert-glassdoor-type-clearglass').val('').trigger('change');
    $('#form-add-calculate-clearglass #select-insert-product-item-clearglass').val('').trigger('change');

    $('#form-add-calculate-clearglass #select-clearglass-quotation-no').removeAttr("disabled");
    $('#form-add-calculate-clearglass #select-clearglass-quotation-no').val('').trigger('change');
}

function clearcalglassinsert2() {
    $('#form-add-calculate-clearglass #input-insert-heigh-cupboard-clearglass').val('');
    $('#form-add-calculate-clearglass #input-insert-width-cupboard-clearglass').val('');
    $('#form-add-calculate-clearglass #select-insert-glassdoor-type-clearglass').val('').trigger('change');
    $('#form-add-calculate-clearglass #select-insert-product-item-clearglass').val('').trigger('change');

    //$('#form-add-calculate-clearglass #select-clearglass-quotation-no').removeAttr("disabled");
    //$('#form-add-calculate-clearglass #select-clearglass-quotation-no').val('').trigger('change');
}


function callStockProductData(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetStockProductSelect`,
        success: function (data) {
            renderStockProductDataSelect(select2Id, select2FirstText, data);
        },
        error: function (err) {
        }
    });
}

function renderStockProductDataSelect(select2Id, select2FirstText, data) {
    $(`${select2Id}`).empty();
    $(`${select2Id}`).append(`<option value="">${select2FirstText}</option>`);

    data.forEach((v) => {
        $(`${select2Id}`).append(`<option value="${v.productcode}">${v.productcode} - ${v.productname}</option>`);
    });
    $(`${select2Id}`).val('').trigger('change')
}

function onCustCalChange() {
    var val = document.getElementById("select-calprint-cust").value;
    if (val != '') {

        callGetCustCalDetail(val);
    }
    else {
        $('#form-printFrameCalculate input[name="input-print-installdate"]').val("");
        $('#form-printFrameCalculate input[name="input-print-address"]').val("");
    }
}

function onCustReprintCalChange() {
    var val = document.getElementById("select-calreprint-cust").value;
    if (val != '') {

        callGetCustReprintCalDetail(val);
    }
    else {
        $('#form-ReprintFrameCalculate input[name="input-reprint-installdate"]').val("");
        $('#form-ReprintFrameCalculate input[name="input-reprint-address"]').val("");
    }
}

function onCustClearGlassCalChange() {
    var val = document.getElementById("select-calprint-cust-clearglass").value;
    if (val != '') {

        callGetCustCalClearDetail(val);
    }
    else {
        $('#form-printClearglassCalculate input[name="input-print-installdate-clearglass"]').val("");
        $('#form-printClearglassCalculate input[name="input-print-address-clearglass"]').val("");
    }
}

function onCustReprintClearGlassCalChange() {
    var val = document.getElementById("select-calreprint-cust-clearglass").value;
    if (val != '') {

        callGetCustReCalClearDetail(val);
    }
    else {
        $('#form-ReprintClearglassCalculate input[name="input-reprint-installdate-clearglass"]').val("");
        $('#form-ReprintClearglassCalculate input[name="input-reprint-address-clearglass"]').val("");
    }
}

function callGetCustCalDetail(id, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetCustDetailList?id=${id}`,
        success: function (data) {

            if (data != '') {
                var setDate = new Date(data[0].installDate);
                var fulldate = setDate.getDate() + "/" + (setDate.getMonth() + 1) + "/" + setDate.getFullYear();
                $('#form-printFrameCalculate input[name="input-print-installdate"]').val(fulldate);
                document.getElementById('input-print-address').value = data[0].custInstallAddress;
                //$('#form-printFrameCalculate input[name="input-print-address"]').val(data[0].custInstallAddress);
            }

        },
        error: function (err) {

        }
    });
}

function callGetCustReprintCalDetail(id, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetCustDetailList?id=${id}`,
        success: function (data) {

            if (data != '') {
                var setDate = new Date(data[0].installDate);
                var fulldate = setDate.getDate() + "/" + (setDate.getMonth() + 1) + "/" + setDate.getFullYear();
                $('#form-ReprintFrameCalculate input[name="input-reprint-installdate"]').val(fulldate);
                document.getElementById('input-reprint-address').value = data[0].custInstallAddress;
                //$('#form-printFrameCalculate input[name="input-print-address"]').val(data[0].custInstallAddress);
            }

        },
        error: function (err) {

        }
    });
}

function callGetCustCalClearDetail(id, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetCustDetailList?id=${id}`,
        success: function (data) {

            if (data != '') {
                var setDate = new Date(data[0].installDate);
                var fulldate = setDate.getDate() + "/" + (setDate.getMonth() + 1) + "/" + setDate.getFullYear();
                $('#form-printClearglassCalculate input[name="input-print-installdate-clearglass"]').val(fulldate);
                document.getElementById('input-print-address-clearglass').value = data[0].custInstallAddress;
                //$('#form-printFrameCalculate input[name="input-print-address"]').val(data[0].custInstallAddress);
            }

        },
        error: function (err) {

        }
    });
}
function callGetCustReCalClearDetail(id, isView = false) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Calculate/GetCustDetailList?id=${id}`,
        success: function (data) {

            if (data != '') {
                var setDate = new Date(data[0].installDate);
                var fulldate = setDate.getDate() + "/" + (setDate.getMonth() + 1) + "/" + setDate.getFullYear();
                $('#form-ReprintClearglassCalculate input[name="input-reprint-installdate-clearglass"]').val(fulldate);
                document.getElementById('input-reprint-address-clearglass').value = data[0].custInstallAddress;
                //$('#form-printFrameCalculate input[name="input-print-address"]').val(data[0].custInstallAddress);
            }

        },
        error: function (err) {

        }
    });
}

function delRowCal(id) {
    Swal.fire({
        text: "ยืนยันการลบรายการ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: _modal_primary_color_code,
        //cancelButtonColor: _modal_default_color_code,
        confirmButtonText: 'ยืนยัน'
    }).then((result) => {
        $(id).remove();
    });

}

function delRowCalPlanks(id, objid) {
    Swal.fire({
        text: "ยืนยันการลบรายการ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: _modal_primary_color_code,
        //cancelButtonColor: _modal_default_color_code,
        confirmButtonText: 'ยืนยัน'
    }).then((result) => {
        if (_product_item_action == "edit") {
            if ($("#hddelplankslist").val() == "") {
                $("#hddelplankslist").val(objid);
            }
            else {
                $("#hddelplankslist").val($("#hddelplankslist").val() + ',' + objid);
            }
        }
        $(id).remove();
    });

}
function printPlanks(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Planks/GetItemByItemId?id=${id}`,
        success: function (data) {

            generatePrintDocument(data);

        },
        error: function (err) {
        }
    });

}

function printFitting(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Fitting/GetItemByItemId?id=${id}`,
        success: function (data) {

            generatePrintFittingDocument(data);

        },
        error: function (err) {
        }
    });

}

async function generatePrintDocument(data) {
    await renderPrinttHtml(data);
}
async function renderPrinttHtml(data) {
    //$('#form-getInStock input[name="input-getin-id"]').val(data.master.id);
    //$('#getoutdoccode').html(data.master.documentcode);
    //console.log(data.master);
    //$('#spnreciverout').html(data.master.recName);

    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    $('#DateAction').html(today);
    //$('#spnreciverPositionout').html(data.master.positionName);

    //var itemNo = 1;
    //var size = "";
    //var qty = 0;
    //var item = ''
    for (var i = 0; i < data.list.length; i++) {
        var row;
        row = $('<tr id="row' + data.list[i].id + '">');

        //<td class="column0 style6 s" style="padding-left:1%;">Test01</td>
        //        <td class="column1 style6 s" style="padding-left:1%;">FFFFFFFFF</td>
        //        <td class="column2 style6 n" style="padding-right:1%;">0.05</td>
        //        <td class="column3 style6 n" style="padding-right:1%;">6</td>
        //        <td class="column4 style6 s" style="padding-left:1%;">FFFFFFFFFFFF</td>
        row.append($('<td class="column0 style6 s" style="padding-left:1%;"><span style="font-family:KaLaTeXaTEXT;">').html(data.item.quotationNumber));
        row.append($('<td class="column1 style6 s" style="padding-left:1%;"><span style="font-family:KaLaTeXaTEXT;">').html(data.list[i].colorcode));
        row.append($('<td class="column2 style6 n" style="padding-right:1%;">0.05</td><span style="font-family:KaLaTeXaTEXT; ">').html(data.list[i].thicknesstype == 1 ? '18MM' : '9MM'));
        row.append($('<td class="column3 style6 n" style="padding-right:1%;"><span style="font-family:KaLaTeXaTEXT;">').html(data.list[i].amount));
        row.append($('<td class="column4 style6 s" style="padding-left:1%;"><span style="font-family:KaLaTeXaTEXT;">').html(data.list[i].remark));
        $('#tbl-planks-print').append(row);
        //    itemNo++;
        //    qty += data.item[i].amount;
    }
    //var itemNo = 1;
    //var size = "";
    //var qty = 0;
    //var item = ''
    //$('#tb-getout-itemlist').empty();
    //for (var i = 0; i < data.item.length; i++) {
    //    var row;
    //    row = $('<tr id="row' + data.item[i].id + '">');


    //    row.append($('<td style="width: 25.65pt; border-width: 0.75pt 0pt; border-style:none; border-color: rgb(166, 166, 166) black; vertical-align: middle;"><p style="text-align: center;"><span style="font-family:KaLaTeXaTEXT; min-height: 16pt; font-size: 16pt;">').html(itemNo));
    //    row.append($('<td style="width: 136.25pt; border-width: 0.75pt 0pt; border-style: solid; border-color: rgb(166, 166, 166) black; vertical-align: middle;"><p style="text-align: left;"><span style="font-family:KaLaTeXaTEXT; min-height: 16pt; font-size: 16pt;">').html(data.item[i].stockproductcode + ' - ' + data.item[i].productname));
    //    row.append($('<td style="width: 90.8pt; border-width: 0.75pt 0pt; border-style: solid; border-color: rgb(166, 166, 166) black; vertical-align: middle;"><p style="text-align: center;"><span style="font-family:KaLaTeXaTEXT; min-height: 16pt; font-size: 16pt;">').html(data.item[i].stockname));
    //    row.append($('<td style="width: 30.8pt; border-width: 0.75pt 0pt; border-style: solid; border-color: rgb(166, 166, 166) black; vertical-align: middle;"><p style="text-align: center;"><span style="font-family:KaLaTeXaTEXT; min-height: 16pt; font-size: 16pt;text-align: center;">').html(data.item[i].amount));
    //    row.append($('<td style="width: 42.55pt; border-width: 0.75pt 0pt; border-style: solid; border-color: rgb(166, 166, 166) black; vertical-align: middle;"><p style="text-align: center;"><span style="font-family:KaLaTeXaTEXT; min-height: 16pt; font-size: 16pt;">').html(data.item[i].unitname));
    //    row.append($('<td style="width: 148.45pt; border-width: 0.75pt 0pt; border-style: solid; border-color: rgb(166, 166, 166) black; vertical-align: middle;"><p style="text-align: center;"><span style="font-family:KaLaTeXaTEXT; min-height: 16pt; font-size: 16pt;">').html(data.item[i].remark));
    //    $('#tb-getout-itemlist').append(row);
    //    itemNo++;
    //    qty += data.item[i].amount;
    //}

    //$('#spnTotalAmountout').html(qty);
    //$('#spnTotalQtyout').html(itemNo);

    const options = {
        margin: 0.3,
        filename: 'OUT.pdf',
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


    var element = document.getElementById("printPlanks");
    html2pdf()
        .set(options)
        .from(element)
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
            window.open(pdf.output('bloburl'), '_blank');
        });
}

async function generatePrintFittingDocument(data) {
    await renderPrintFittingtHtml(data);
}
async function renderPrintFittingtHtml(data) {
    console.log(data);
    //$('#input-fitting-no').val(data.fittingcode);
    //$('#input-fitting-id').val(data.id);
    $('#txtminifixset').val(data.minifixset);
    $('#txtwoodendowel').val(data.woodendowel);
    $('#txtotherdesc').val(data.otherdescription);
/*    $(`#input-quotation-no`).val(data.quotationNumber);*/
    $("#txtAddress").val(data.fullname);

    data.hinge.forEach((item) => {
        switch (item.hingetype) {
            case 1:
                $('#txtHinge1').val(item.amount);
                break;
            case 2:
                $('#txtHinge2').val(item.amount);

                break;
            case 3:
                $('#txtHinge3').val(item.amount);
                break;
            case 4:
                $('#txtHinge4').val(item.amount);
                $('#txtHingeOther').val(item.othertext);
                break;
        };
    });

    data.drawerRail.forEach((item) => {
        switch (item.drawerrailtype) {
            case 1:
                $('#txtDrawerRail1').val(item.amount);
                $('#txtDrawerRail2').val(item.pressbounceamount);
                break;
            case 2:
                $('#txtDrawerRail3').val(item.amount);

                break;
            case 3:
                $('#txtDrawerRail5').val(item.amount);
                $('#txtDrawerRail4').val(item.othersize);
                break;
        };
    });

    data.slideDoor.forEach((item) => {
        switch (item.slidingdoortype) {
            case 1:
                $('#txtSlideDoor1').val(item.amount);
                break;
            case 2:
                $('#txtSlideDoor3').val(item.amount);
                $('#txtSlideDoor2').val(item.length);
                break;
            case 3:
                $('#txtSlideDoor4').val(item.amount);
                break;
            case 4:
                $('#txtSlideDoor6').val(item.amount);
                $('#txtSlideDoor5').val(item.length);
                break;
            case 5:
                $('#txtSlideDoor7').val(item.amount);
                break;
            case 6:
                $('#txtSlideDoor9').val(item.amount);
                $('#txtSlideDoor8').val(item.length);
                break;
        };
    });

    data.electrical.forEach((item) => {
        switch (item.electricaltype) {
            case 1:
                $('#txtElec1').val(item.amount);
                break;
            case 2:
                $('#txtElec2').val(item.amount);
                break;
            case 3:
                $('#txtElec4').val(item.amount);
                $('#txtElec3').val(item.color);
                break;
            case 4:
                $('#txtElec5').val(item.amount);
                break;
            case 5:
                $('#txtElec6').val(item.amount);
                break;
            case 6:
                $('#txtElec7').val(item.amount);
                break;
            case 7:
                $('#txtElec8').val(item.amount);
                break;
            case 8:
                $('#txtElec9').val(item.amount);
                break;
            case 9:
                $('#txtElec10').val(item.amount);
                break;
            case 10:
                $('#txtElec11').val(item.amount);
                break;
            case 11:
                $('#txtElec12').val(item.amount);
                break;
            case 12:
                $('#txtElec13').val(item.amount);
                break;
            case 13:
                $('#txtElec14').val(item.amount);
                break;
            case 14:
                $('#txtElec15').val(item.amount);
                break;
        };
    });

    data.edgeLaminate.forEach((item) => {
        switch (item.edgelaminatetype) {
            case 1:
                if (item.seqno == 1) {
                    $('#txtEdge1').val(item.color);
                }
                else if (item.seqno == 2) {
                    $('#txtEdge2').val(item.color);
                }
                else {
                    $('#txtEdge3').val(item.color);
                }
                break;
            case 2:
                if (item.seqno == 1) {
                    $('#txtEdge4').val(item.color);
                }
                else if (item.seqno == 2) {
                    $('#txtEdge5').val(item.color);
                }
                else {
                    $('#txtEdge6').val(item.color);
                }
                break;
            case 3:
                if (item.seqno == 1) {
                    $('#txtEdge7').val(item.color);
                }
                else if (item.seqno == 2) {
                    $('#txtEdge8').val(item.color);
                }
                else {
                    $('#txtEdge9').val(item.color);
                }
                break;
            case 4:
                $('#txtEdge10').val(item.amount);
                break;
        };
    });

    data.otherFitting.forEach((item) => {
        switch (item.otherfittingtype) {
            case 1:
                $('#txtOther2').val(item.amount);
                $('#txtOther1').val(item.color);
                break;
            case 2:
                $('#txtOther4').val(item.amount);
                $('#txtOther3').val(item.color);
                break;
            case 3:
                $('#txtOther6').val(item.amount);
                $('#txtOther5').val(item.size);
                break;
            case 4:
                $('#txtOther7').val(item.amount);
                break;
            case 5:
                $('#txtOther8').val(item.amount);
                break;
            case 6:
                $('#txtOther9').val(item.amount);
                break;
            case 7:
                $('#txtOther10').val(item.amount);
                break;
            case 8:
                $('#txtOther11').val(item.amount);
                break;
            case 9:
                $('#txtOther12').val(item.amount);
                break;
            case 10:
                $('#txtOther13').val(item.amount);
                break;
        };
    });

    data.frameTrim.forEach((item) => {
        switch (item.frametrimtype) {
            case 1:
                $('#txtFrame2').val(item.amount);
                $('#txtFrame1').val(item.color);
                break;
            case 2:
                $('#txtFrame3').val(item.amount);
                break;
            case 3:
                $('#txtFrame6').val(item.amount);
                $('#txtFrame4').val(item.color);
                $('#txtFrame5').val(item.size);
                break;
            case 4:
                $('#txtFrame9').val(item.amount);
                $('#txtFrame7').val(item.color);
                $('#txtFrame8').val(item.size);
                break;
            case 5:
                $('#txtFrame11').val(item.amount);
                $('#txtFrame10').val(item.size);
                break;
            case 6:
                $('#txtFrame14').val(item.amount);
                $('#txtFrame12').val(item.color);
                $('#txtFrame13').val(item.size);
                break;
            case 7:
                if (item.seqno == 1) {
                    $('#txtFrame16').val(item.amount);
                    $('#txtFrame15').val(item.number);
                /*    $('#form-createFitting #input-fandc7-size').val(item.size);*/
                }
                else {
                    $('#txtFrame18').val(item.amount);
                    $('#txtFrame17').val(item.number);
                 /*   $('#form-createFitting #input-fandc8-size').val(item.size);*/
                }
                break;
            case 8:
                $('#txtFrame20').val(item.amount);
                $('#txtFrame19').val(item.number);
                break;
            case 9:
                if (item.seqno == 1) {
                    $('#txtFrame22').val(item.amount);
                    $('#txtFrame21').val(item.color);

                }
                else {
                    $('#txtFrame24').val(item.amount);
                    $('#txtFrame23').val(item.color);
                }
                break;
            case 10:
                $('#txtFrame25').val(item.amount);
                break;
        };
    });
    

    const options = {
        margin: 0.3,
        filename: 'OUT.pdf',
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


    var element = document.getElementById("printFitting");
    html2pdf()
        .set(options)
        .from(element)
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
            window.open(pdf.output('bloburl'), '_blank');
        });
}

function clearPlanksAdd() {
    /*    $('#input-planks-id').val('');*/
    $('#input-color-code').val('');
    $('#input-planks-amount').val('');
    $('#input-planks-remark').val('');
    $('#form-createPlanks #select-planks-size').val('').trigger('change');
}
//function DoSaveSpec() {
//    let formId = '#form-editSpec';
//    let empId = $(`${formId} #select-edit-3d-designName`).val() == "" ? 0 : $(`${formId} #select-edit-3d-designName`).val();
//    let dueDate = $(`${formId} #input-edit-3d-due-date`).val() == "" ? null : $(`${formId} #input-edit-3d-due-date`).val();
//    let final3d = $(`${formId} #chkFinal3D`).prop('checked');

//    let url = `${app_settings.api_url}/api/Spec/AddItem?orderId=${_order_id}&empId=${empId}&commitDate=${dueDate}&checkliststatus=${final3d}&loginCode=${_userCode}`;

//    //var control = document.getElementById(`select-3d-approve`);
//    //var files = control.files;
//    //var formData = new FormData();

//    //for (var i = 0; i != files.length; i++) {
//    //    formData.append("files", files[i]);
//    //}

//    $('.btn-modal-save-spec').addLoading();

//    $.ajax({
//        url: url,
//        type: "POST",
//        contentType: false, // Do not set any content header
//        processData: false, // Do not process data
//        data: formData,
//        async: false,
//        success: function (result) {
//            if (result.isResult == true) {
//                callSuccessAlert();
//                $('.btn-modal-save-3d').removeLoading();
//                $(`#modal-editDesign3D`).modal('hide');
//                callGetChecklistStatusSelect2();
//                callGet3DQueueList();
//            }
//        },
//        error: function (err) {
//            $('.btn-modal-save-3d').removeLoading();
//        }
//    });
//}
//function renderEditDesign3D(id) {
//    $.ajax({
//        type: 'GET',
//        url: `${app_settings.api_url}/api/SpecList/GetDesign3DSpecListByOrderId?orderId=${id}`,
//        success: function (data) {
//            render3DToForm(data);
//        },
//        error: function (err) {
//            //loaded.find(loader).remove();
//        }
//    });
//}

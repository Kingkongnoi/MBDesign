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

function callSelect2StatusTP(id, isSearch = false) {
    $(id).empty();
    if (isSearch) {
        $(id).append(`<option value="">ทั้งหมด</option>`);
    }
    $(id).append(`<option value="1">ใช้งาน</option>`);
    $(id).append(`<option value="0">ไม่ใช้งาน</option>`);
}

function renderSelect(data, id) {
    $(`#form-TPQueue #${id}`).empty();
    $(`#form-TPQueue #${id}`).append(`<option value="">กรุณาเลือก</option>`);
    data.forEach((v) => {
        $(`#form-TPQueue #${id}`).append(`<option value="${v.id}">${v.value}</option>`);
    });
    $(`#form-TPQueue #${id}`).val('').trigger('change');
}

function callGetTPSelect(id, orderid) {
    console.log('AAA');
    var txt = '';
    if (id == "select-edit-tp-custname") {
        txt = 'GetCustNameSelect';
    }
    else if (id == 'select-edit-tp-number') {
        txt = 'GetQuotationSelect';
    }
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/TransportationQueue/${txt}?orderid=${orderid}`,
        success: function (data) {
            renderSelect(data, id);
        },
        error: function (err) {
        }
    });
}

function delRowtp(id, orderid) {
    Swal.fire({
        text: "ยืนยันการลบรายการ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: _modal_primary_color_code,
        //cancelButtonColor: _modal_default_color_code,
        confirmButtonText: 'ยืนยัน'
    }).then((result) => {

        //if (_product_item_action == "edit") {
        //    if ($("#hddelproductcodelist").val() == "") {
        //        $("#hddelproductcodelist").val(orderid);
        //    }
        //    else {
        //        $("#hddelproductcodelist").val($("#hddelproductcodelist").val() + ',' + orderid);
        //    }
        //}


        var lst = $("#hdorderid").val().split(',');
        if (lst.length > 0) {
            lst = jQuery.grep(lst, function (value) {
                return value != orderid;
            });
            if (lst.length == 0) {
                $("#hdorderid").val('');
            }
            else {
                for (var i = 0; i < lst.length; i++) {
                    if (i == 0) {
                        $("#hdorderid").val(lst[i]);
                    }
                    else {
                        $("#hdorderid").val($("#hdorderid").val() + ',' + lst[i]);
                    }
                }
            }

        }
        else {
            $("#hdorderid").val('');
        }
        $(id).remove();
        var orderlist = $("#hdorderid").val();
        if (orderlist == '') {
            orderlist = '0';
        }

        callGetTPSelect('select-edit-tp-custname', orderlist);
        callGetTPSelect('select-edit-tp-number', orderlist);

        $(`#form-TPQueue #select-edit-tp-custname`).val('').trigger('change');
        $(`#form-TPQueue #select-edit-tp-number`).val('').trigger('change');
    });

}

function callGetCustNameTPSelect() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/TransportationQueue/GetCustNameSelect`,
        success: function (data) {
            renderSelect(data);
        },
        error: function (err) {
        }
    });
}
function CreateNewCheckListTP() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/TransportationList/GetMasterSpecListTP`,
        success: function (data) {
            renderMasterCheckListTP(data);
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}

function renderMasterCheckListTP(data) {
    $("#listChecklistTP").empty();
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
                //case 4:
                //    $("#listChecklistPD").append(`<li id="liMaster${v.id}" class="list-group-item border-0 d-flex align-items-center ps-0">
                //                   <input id="chkMaster${v.id}" name="chkMaster" class="form-check-input me-3 col-xl-2" type="checkbox" value="${v.id}" aria-label="..." onclick="return false;"/>
                //                   <label class="col-xl-3"> ${v.checklistname}</label>
                //                     <label class="col-xl-3 text-end" style="margin-right: 3%;">วันที่ลูกค้า Approved : </label><input class="form-control" type="date" id="txtApproveDate" name="txtApproveDate"  disabled/>
                //                    </li>`);
                //    break;
                default:
                    $("#listChecklistTP").append(`<li id="liMaster${v.id}" class="list-group-item border-0 d-flex align-items-center ps-0">
                                   <input id="chkMaster${v.id}" name="chkMaster" class="form-check-input me-3" type="checkbox" value="${v.id}" aria-label="..." onclick="return false;"/>
                                    ${v.checklistname}</li>`);
            }
        }
        else {
            $("#listChecklistTP").append(`<li id="liMaster${v.id}" class="list-group-item border-0 d-flex align-items-center ps-0">
                                   <input id="chkMaster${v.id}" name="chkMaster" class="form-check-input me-3" type="checkbox" value="${v.id}" aria-label="..." onclick="return false;"/>
                                    ${v.checklistname}</li>`);
        }


    });
}

function callGetTPList() {
    let formId = '#form-search-tp-queue';

    let quotationNumber = ($(`${formId} #input-search-tp-quotation-number`).val() == '' || $(`${formId} #input-search-tp-quotation-number`).val() == undefined) ? null : $(`${formId} #input-search-tp-quotation-number`).val();

    let loaded = $('#tb-tp-queue-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/TransportationList/GetTPList?quotaioncode=${quotationNumber}`,
        success: function (data) {

            renderGetCheckListTP(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function renderGetCheckListTP(data) {
    $('#tb-tp-queue-list').DataTable(
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
                    data: 'fittingid',
                    className: "hidecol",
                },
                {
                    targets: 3,
                    data: 'quotationNumber',
                    className: "dt-center",
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
                        /*       console.log(row);*/
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-tp" data-id="${row.id}" data-orderid="${row.orderid}" data-specid="${row.specid}" data-fittingid="${row.fittingid}" data-step="${row.id == 0 ? 0 : row.statusid}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}

function callGetTPQList() {
    let formId = '#form-search-tp-queue-list';

    let quotationNumber = ($(`${formId} #input-search-tp-driver-name`).val() == '' || $(`${formId} #input-search-tp-driver-name`).val() == undefined) ? null : $(`${formId} #input-search-tp-driver-name`).val();

    let loaded = $('#tb-tp-queue-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/TransportationQueue/GetTPQList?drivername=${quotationNumber}`,
        success: function (data) {

            renderGetCheckListTPQ(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function renderGetCheckListTPQ(data) {
    $('#tb-transq-list').DataTable(
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
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'id',
                    className: "hidecol",
                },
                {
                    targets: 1,
                    data: 'transportationdate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.transportationdate ? convertDateTimeFormat(row.transportationdate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 2,
                    data: 'drivername',
                    className: "dt-center",
                },
                {
                    targets: 3,
                    data: 'subdrivername1',
                    className: "dt-center",
                },
                {
                    targets: 4,
                    data: 'subdrivername2',
                    className: "dt-center",
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
                    data: 'updateBy',
                    className: "dt-center",
                },
                {
                    targets: 7,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_3d_class_display}`,
                    render: function (data, type, row) {
                        /*       console.log(row);*/
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-tpqlist" data-id="${row.id}"  title="แก้ไข">
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
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-print-tpq" data-id="${row.id}" title="พิมพ์">
                    <i class="fa fa-print"></i></button>`;
                    },
                },
            ],
        }
    );
}
function renderEditTP(orderid, prodid, statusid) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/TransportationList/GetTPListByID?id=${prodid}&orderid=${orderid}`,
        success: function (data) {
            renderTPToForm(data, prodid);
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}

function renderEditTPQ(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/TransportationQueue/GetBindingTPQList?drivername=${null}&id=${id}`,
        success: function (data) {
            renderTPQForm(data);
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}

function getItemList(orderid, obj, chkType) {
    console.log(orderid);
    var rtn;
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/TransportationQueue/GetListData?orderid=${orderid}`,
        success: function (data) {

            console.log(data);
            generateTPQ(data, obj, chkType);
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });

}

async function generateTPQ(data, obj, chkType) {
    await renderTPQ(data, obj, chkType);
}

async function renderTPQ(data, obj, chkType) {

    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    if (chkType == '1') {
        getVal = $('#form-TPQueue #select-edit-tp-custname').val();
    }
    else if (chkType == '2') {
        getVal = $('#form-TPQueue #select-edit-tp-number').val();
    }

    if (checkboxes.length > 0 && getTime("timepicker3") != null && getTime("timepicker4") != null) {
        var rowid = $('#tb-trans-queue tr').length;
        var row;
        var orderidlist = $("#hdorderid").val();

        if (orderidlist != "") {
            if (chkType == '1') {
                $("#hdorderid").val($("#hdorderid").val() + ',' + $('#form-TPQueue #select-edit-tp-custname').val());
            }
            else if (chkType == '2') {
                $("#hdorderid").val($("#hdorderid").val() + ',' + $('#form-TPQueue #select-edit-tp-number').val());
            }
        }
        else {
            if (chkType == '1') {
                $("#hdorderid").val($('#form-TPQueue #select-edit-tp-custname').val());
            }
            else if (chkType == '2') {
                $("#hdorderid").val($('#form-TPQueue #select-edit-tp-number').val());
            }
        }
        row = $('<tr id="row' + rowid + '">');

        /*  row.append($('<td style="display:none;">').html(length));*/

        row.append($('<td style="display:none;">').html(rowid));
        row.append($('<td style="display:none;">').html(0));
        row.append($('<td style="display:none;">').html(data.orderId));
        row.append($('<td>').html(rowid));
        row.append($('<td>').html(data.fullname));
        row.append($('<td>').html(data.itemName));
        row.append($('<td>').html(getTime("timepicker3")));
        row.append($('<td>').html(getTime("timepicker4")));
        row.append($('<td>').html(data.custAddress));

        row.append($('<td>').html(`<button type="button" class="btn btn-primary btn-circle-xs btn-del-tp"  onclick="delRowtp('#${"row"}${rowid}','${data.orderId}')" title="ลบ">
                    <i class="fa fa-trash"></i></button>`));
        $('#tb-trans-queue').append(row);

        callGetTPSelect('select-edit-tp-custname', $("#hdorderid").val());
        callGetTPSelect('select-edit-tp-number', $("#hdorderid").val());

        $(`#form-TPQueue #select-edit-tp-custname`).val('').trigger('change');
        $(`#form-TPQueue #select-edit-tp-number`).val('').trigger('change');
        $(`#form-TPQueue #txttoh1`).val('')
        $(`#form-TPQueue #txttoh2`).val('')
        $(`#form-TPQueue #txttoh3`).val('')
        $(`#form-TPQueue #txttoh4`).val('')

    }
    else {

        Swal.fire({
            text: "กรุณากรอกข้อมูลให้ครบถ้วน",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {

        });
    }
}
function renderTPToForm(data, prodid) {
    let maxValue = Math.max.apply(null,
        data.datatp.map(function (o) { return o.statusid; }));

    data.datatp.forEach((d) => {
        $(`#chkMaster${d.statusid}`).prop('checked', true);
        //if (d.statusid == 2) {
        //    $(`#txtvideourl`).val(d.videourl);
        //}
        if (d.statusid == 4) {
            $(`#txtApproveDate`).val(d.approveDate);
        }
    });
    if (data.datatp.length == 0) {
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
    //if (_maxIDcheck == "#chkMaster4") {
    //    $('#chkMaster4').attr("onclick", "handleClickApproveDate(this);");
    //}

    let formId = '#form-editTP';
    $(`${formId} #input-prod-id`).val(prodid);
    $(`${formId} #txtquotationedit`).val(data.custOrder.quotationNumber);

    /*    $(`${formId} #input-edit-spec-quotation`).val(data.dataspec[0].orderid);*/
    //var installDate = data.custOrder.installDate ? convertDateTimeFormat(data.custOrder.installDate, 'DD/MM/YYYY') : ""
    //$(`${formId} #input-edit-spec-install-date`).val(installDate);
    /* let d = new Date(data.dataspec[0].approveDate);*/

    //if (data.dataspec != null && data.dataspec.length > 0) {
    //    if (data.dataspec[0].approveDate != null) {
    //        var now = new Date(data.dataspec[0].approveDate);

    //        var day = ("0" + now.getDate()).slice(-2);
    //        var month = ("0" + (now.getMonth() + 1)).slice(-2);

    //        var today = now.getFullYear() + "-" + (month) + "-" + (day);

    //        /* var approveDate = data.dataspec[0].approveDate ? convertDateTimeFormat('2024-04-30', 'DD/MM/YYYY') : ""*/
    //        $(`${formId} #txtApproveDate`).val(today);
    //    }
    //}
}

function renderTPQForm(data) {
    //var rowid = $('#tb-trans-queue tr').length;
    //var row;
    //var orderidlist = $("#hdorderid").val();
    /*  row.append($('<td style="display:none;">').html(length));*/
    console.log(data);
    var outtime = data.item.outboundtime.split(':');
    var intime = data.item.inboundtime.split(':');
    //var transdate = data.item.transportationdate ? convertDateTimeFormat(data.item.transportationdate, 'MM/DD/YYYY') : "";
    //console.log(transdate);

    var now = new Date(data.item.transportationdate);

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    $('#txtdrivername').val(data.item.drivername);
    $('#form-TPQueue #txttpdate').val(today);
    $('#txtsubdrivername1').val(data.item.subdrivername1);
    $('#txtsubdrivername2').val(data.item.subdrivername2);
    $('#txtoutboundmileage').val(data.item.outboundmileage);
    $('#txthh1').val(outtime[0]);
    $('#txtmm1').val(outtime[1]);
    $('#txthh2').val(intime[0]);
    $('#txtmm2').val(intime[1]);
    $('#txtinboundmileage').val(data.item.inboundmileage);
    $('#txtinboundtime').val(intime[0] + ":" + intime[1]);
    $('#txttpremark').val(data.item.remark);
    $(`#select-edit-tpq-name`).val(data.emp).trigger('change');
    $(`#select-edit-tpq-name`).attr('disabled', 'disabled')

    for (var i = 0; i < data.list.length; i++) {
        var row;
        row = $('<tr id="row' + i + '">');
        row.append($('<td style="display:none;">').html(i));
        row.append($('<td style="display:none;">').html(data.list[i].id));
        row.append($('<td style="display:none;">').html(data.list[i].orderid));
        row.append($('<td>').html(data.list[i].seqno));
        row.append($('<td>').html(data.list[i].fullname));
        row.append($('<td>').html(data.list[i].itemdescription));
        var timeto = data.list[i].timeto.split(':');
        var timeout = data.list[i].timeout.split(':');
        row.append($('<td>').html(timeto[0] + ":" + timeto[1]));
        row.append($('<td>').html(timeout[0] + ":" + timeout[1]));
        row.append($('<td>').html(data.list[i].address));

        row.append($('<td>').html(`-`));
        $('#tb-trans-queue').append(row);
    }
}

function clearTransQ() {
    $("#tb-trans-queue tbody tr").remove();
    $('input[type=text]').each(function () {
        $(this).val('');
    });
    $('input[type=number]').each(function () {
        $(this).val('');
    });
    $(`#txttpremark`).val('');
    $(`#select-edit-tpq-name`).val('').trigger('change');
    $(`#select-edit-tp-custname`).val('').trigger('change');
    $(`#select-edit-tp-number`).val('').trigger('change');
    $('#form-TPQueue #txttpdate').val('');
    $('input[type=checkbox]').each(
        function (index, checkbox) {
            if (index != 0) {
                checkbox.checked = false;
            }
        });
}

function settxtHeaderTP(steptype) {
    var txt = '';
    switch (steptype) {
        case 0: txt = 'รับเอกสารฟิตติ้งจาก Store';
        case 1: txt = 'รับเอกสารฟิตติ้งจาก Store';
            break;
        case 2: txt = 'รับเอกสารติดตั้ง (กรณีขึ้นบ้านใหม่)';
            break;
        case 3: txt = 'จัดคิวขนส่ง และ Print เอกสาร ของรถแต่ละคัน';
            break;
        case 4: txt = 'โหลดของขึ้นรถ';
            break;
        case 5: txt = 'อัพเดท Status หลังส่งของเรียบร้อยแล้ว';
            break;
        default: break;
    }
    return txt;
}

let validateInputTP = function (modal) {

    switch (modal) {
        case "modal-editTP":

            if (_product_item_action == "add") {
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
                    if (!$(`${_liMaxID} ${_maxIDcheck}`).is(":checked")) {
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
        case "modal-TPQueue":
            if ($('#form-TPQueue #txtdrivername').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกชื่อคนขับ",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('##form-TPQueue #txtdrivername').focus();
                });
                return false;
            }
            else if ($('#form-TPQueue #txttpdate').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกวันที่ขนส่ง",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('##form-TPQueue #txttpdate').focus();
                });
                return false;
            }
            else { return true; }
            break;
    }
};

function callSaveTP() {
    if (!validateInputTP("modal-editTP")) { return; }

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
            DoSaveTP();
        }
    });
}

function callSaveTPQ() {
    if (!validateInputTP("modal-TPQueue")) { return; }

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
            DoSaveTPQ();
        }
    });
}
function DoSaveTP() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/TransportationList/AddItem` : `${app_settings.api_url}/api/TransportationList/UpdateItem`;
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
            id: ($('#input-prod-id').val() == "") ? 0 : $('#input-prod-id').val(),
            orderid: $("#input-order-id").val(),
            specid: $("#input-spec-id").val(),
            fittingid: $("#input-fitting-id").val(),
            empid: $('#select-edit-tp-name').val(),
            listStatus: listurl,
            loginCode: _userCode
        };

        $('.btn-modal-save-tp').addLoading();
        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: JSON.stringify(obj),
            success: (res) => {
                if (res.result) {
                    callSuccessAlert();
                    $('.btn-modal-save-tp').removeLoading();
                    $(`#modal-editTP`).modal('hide');
                    callGetTPList();
                }
                else {

                    $('.btn-modal-save-tp').removeLoading();
                }
            },
            error: () => {
                $('.btn-modal-save-tp').removeLoading();
            }
        });
    }
    else {

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
            id: ($('#input-prod-id').val() == "") ? 0 : $('#input-prod-id').val(),
            orderid: $("#input-order-id").val(),
            specid: $("#input-spec-id").val(),
            fittingid: $("#input-fitting-id").val(),
            empid: $('#select-edit-tp-name').val(),
            checkliststatus: listurl,
            loginCode: _userCode
        };
        $('.btn-modal-save-tp').addLoading();

        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: JSON.stringify(obj),
            success: (res) => {
                if (res.result) {
                    callSuccessAlert();
                    $('.btn-modal-save-tp').removeLoading();
                    $(`#modal-editTP`).modal('hide');
                    callGetTPList();
                }
                else {

                    $('.btn-modal-save-tp').removeLoading();
                }
            },
            error: () => {
                $('.btn-modal-save-tp').removeLoading();
            }
        });

    }

}

function DoSaveTPQ() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/TransportationQueue/AddItem` : `${app_settings.api_url}/api/TransportationQueue/UpdateItem`;

    var listdata = new Array();
    var outsTime = getTime("timepicker1");
    var insTime = getTime("timepicker2");
    if ($('#tb-trans-queue tr').length > 0) {
        $("#tb-trans-queue tbody tr").each(function () {
            var row = $(this);
            var ManageDetail = {};
            ManageDetail.id = _product_item_action == 'add' ? 0 : row.find("td").eq(1).html();
            ManageDetail.orderid = row.find("td").eq(2).html();
            ManageDetail.seqno = row.find("td").eq(3).html();
            ManageDetail.timeto = row.find("td").eq(6).html();
            ManageDetail.timeout = row.find("td").eq(7).html();

            listdata.push(ManageDetail);
        });

        var obj = {
            id: ($('#input-tp-id').val() == "") ? 0 : $('#input-tp-id').val(),
            drivername: $('#txtdrivername').val(),
            transportationdate: $('#txttpdate').val(),
            subdrivername1: $('#txtsubdrivername1').val(),
            subdrivername2: $('#txtsubdrivername2').val(),
            outboundmileage: $('#txtoutboundmileage').val(),
            inboundmileage: $('#txtinboundmileage').val(),
            outboundtime: outsTime,
            inboundtime: insTime,
            remark: $('#txttpremark').val(),
            empid: $('#select-edit-tpq-name').val(),
            loginCode: _userCode,
            saveDetail: listdata
        };
        $('.btn-modal-save-tpq').addLoading();

        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: JSON.stringify(obj),
            success: (res) => {
                if (res.result) {
                    callSuccessAlert();
                   
                   
                    callGetTPList();
                    callGetTPQList();
                    $('.btn-modal-save-tpq').removeLoading();
                    $(`#modal-TPQueue`).modal('hide');
                }
                else {

                    $('.btn-modal-save-tpq').removeLoading();
                }
            },
            error: () => {
                $('.btn-modal-save-tpq').removeLoading();
            }
        });
    }
    else {

        Swal.fire({
            text: "กรุณากรอกข้อมูลให้ครบถ้วน",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {

        });
    }

    /*}*/

}

function callGetNameSelectTP() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/TransportationList/GetNameSelectTPList`,
        success: function (data) {
            renderNameSelectTP(data);
        },
        error: function (err) {
        }
    });
}

function callGetNameSelectTPQ() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/TransportationList/GetNameSelectTPList`,
        success: function (data) {
            renderNameSelectTPQ(data);
        },
        error: function (err) {
        }
    });
}
function renderNameSelectTP(data) {
    $(`#form-editTP #select-edit-tp-name`).empty();
    $(`#form-editTP #select-edit-tp-name`).append(`<option value="">กรุณาเลือก</option>`);
    data.forEach((v) => {
        $(`#form-editTP #select-edit-tp-name`).append(`<option value="${v.empId}">${v.fullName}</option>`);
    });
    $(`#form-editTP #select-edit-tp-name`).val('').trigger('change');
}

function renderNameSelectTPQ(data) {

    $(`#form-TPQueue #select-edit-tpq-name`).empty();
    $(`#form-TPQueue #select-edit-tpq-name`).append(`<option value="">กรุณาเลือก</option>`);
    data.forEach((v) => {
        $(`#form-TPQueue #select-edit-tpq-name`).append(`<option value="${v.empId}">${v.fullName}</option>`);
    });
    $(`#form-TPQueue #select-edit-tpq-name`).val('').trigger('change');
}
function onTypeChange(v) {
    var getval = v.value;
    console.log(getval);
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

    if (checkboxes.length > 0) {
        if (getval != null && getval != '' && getval != undefined) {
            if (getval == '1') {

                $("#select-edit-tp-custname").removeAttr("disabled");
                $("#select-edit-tp-number").attr('disabled', 'disabled');
            }
            else if (getval == '2') {
                $("#select-edit-tp-number").removeAttr("disabled");
                $("#select-edit-tp-custname").attr('disabled', 'disabled');
            }
        }
        else {
            $("#select-edit-tp-custname").attr('disabled', 'disabled');
            $("#select-edit-tp-number").attr('disabled', 'disabled');
        }
    }
    else {
        $("#select-edit-tp-custname").attr('disabled', 'disabled');
        $("#select-edit-tp-number").attr('disabled', 'disabled');
    }
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function printTransQ(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/TransportationQueue/GetPrintTPQList?drivername=${null}&id=${id}`,
        success: function (data) {

            generatePrintTransQDocument(data);

        },
        error: function (err) {
        }
    });
    /*   generatePrintTransQDocument();*/

}

async function generatePrintTransQDocument(data) {
    await renderPrintTransQtHtml(data);
}
async function renderPrintTransQtHtml(data) {

    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + (month) + (day);
    var transfilename = "trans_" + today + ".pdf"

    var transdate = new Date(data.item.transportationdate);
    var transday = ("0" + transdate.getDate()).slice(-2);
    var transmonth = ("0" + (transdate.getMonth() + 1)).slice(-2);

    var transtoday = (transday) + '/' + (transmonth) + '/' + transdate.getFullYear();

    console.log(data);
    var outtime = data.item.outboundtime.split(':');
    var intime = data.item.inboundtime.split(':');
    $('#txtdrivernameprint').val(data.item.drivername);
    $('#txttransdate').val(transtoday);
    $('#txtsubdrivername1print').val(data.item.subdrivername1);
    $('#txtsubdrivername2print').val(data.item.subdrivername2);
    $('#txtoutboundmileageprint').val(data.item.outboundmileage);
    $('#txtoutboundtime').val(outtime[0] + ":" + outtime[1]);
    $('#txtinboundmileageprint').val(data.item.inboundmileage);
    $('#txtinboundtime').val(intime[0] + ":" + intime[1]);
    $('#txtremark').val(data.item.remark);

    for (var i = 0; i < data.list.length; i++) {
        var row;
        row = $('<tr id="row' + data.list[i].id + '">');

        row.append($('<td class="column0 style6 s" style="padding-left:1.5%;"><span style="font-family:KaLaTeXaTEXT;text-align:center;">').html(data.list[i].seqno));
        row.append($('<td class="column1 style6 s" style="padding-left:1%;"><span style="font-family:KaLaTeXaTEXT;">').html(data.list[i].fullname));
        row.append($('<td class="column2 style6 s" style="padding-left:1%;"><span style="font-family:KaLaTeXaTEXT;">').html(data.list[i].itemdescription));
        var timeto = data.list[i].timeto.split(':');
        var timeout = data.list[i].timeout.split(':');
        row.append($('<td class="column3 style6 s" style="padding-right:1.5%;"><span style="font-family:KaLaTeXaTEXT;text-align:center;">').html(timeto[0] + ":" + timeto[1]));
        row.append($('<td class="column4 style6 s" style="padding-left:1.5%;"><span style="font-family:KaLaTeXaTEXT;text-align:center;">').html(timeout[0] + ":" + timeout[1]));
        row.append($('<td class="column4 style6 s" style="padding-left:1%;"><span style="font-family:KaLaTeXaTEXT;">').html(data.list[i].address));
        $('#tb-prin-q').append(row);
    }
    const options = {
        margin: 0.3,
        filename: transfilename,
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


    var element = document.getElementById("printTransQ");
    html2pdf()
        .set(options)
        .from(element)
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
            window.open(pdf.output('bloburl'), '_blank');
        });
}


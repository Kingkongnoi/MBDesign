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

function callSelect2StatusPD(id, isSearch = false) {
    $(id).empty();
    if (isSearch) {
        $(id).append(`<option value="">ทั้งหมด</option>`);
    }
    $(id).append(`<option value="1">ใช้งาน</option>`);
    $(id).append(`<option value="0">ไม่ใช้งาน</option>`);
}

function CreateNewCheckListPD() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/PDList/GetMasterSpecListPD`,
        success: function (data) {
            renderMasterCheckListPD(data);
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}

function renderMasterCheckListPD(data) {
    $("#listChecklistPD").empty();
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
                    $("#listChecklistPD").append(`<li id="liMaster${v.id}" class="list-group-item border-0 d-flex align-items-center ps-0">
                                   <input id="chkMaster${v.id}" name="chkMaster" class="form-check-input me-3" type="checkbox" value="${v.id}" aria-label="..." onclick="return false;"/>
                                    ${v.checklistname}</li>`);
            }
        }
        else {
            $("#listChecklistPD").append(`<li id="liMaster${v.id}" class="list-group-item border-0 d-flex align-items-center ps-0">
                                   <input id="chkMaster${v.id}" name="chkMaster" class="form-check-input me-3" type="checkbox" value="${v.id}" aria-label="..." onclick="return false;"/>
                                    ${v.checklistname}</li>`);
        }


    });
}

function callGetPDList() {
    let formId = '#form-search-pd-queue';

    let quotationNumber = ($(`${formId} #input-search-pd-quotation-number`).val() == '' || $(`${formId} #input-search-pd-quotation-number`).val() == undefined) ? null : $(`${formId} #input-search-pd-quotation-number`).val();

    let loaded = $('#tb-pd-queue-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/PDList/GetPDList?quotaioncode=${quotationNumber}`,
        success: function (data) {

            renderGetCheckListPD(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}

function renderGetCheckListPD(data) {
    $('#tb-pd-queue-list').DataTable(
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
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-print-pd-fitting" data-fittingid="${row.fittingid}" title="พิมพ์">
                    <i class="fa fa-print"></i></button>`;
                    },
                },
                {
                    targets: 8,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_3d_class_display}`,
                    render: function (data, type, row) {
                        /*       console.log(row);*/
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-print-pd-planks" data-orderid="${row.orderid}" title="พิมพ์">
                    <i class="fa fa-print"></i></button>`;
                    },
                },
                {
                    targets: 9,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_3d_class_display}`,
                    render: function (data, type, row) {
                        /*       console.log(row);*/
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-pd" data-id="${row.id}" data-orderid="${row.orderid}" data-specid="${row.specid}" data-fittingid="${row.fittingid}" data-step="${row.id == 0 ? 0 : row.statusid}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}

function renderEditPD(orderid, prodid, statusid) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/PDList/GetPDListByID?id=${prodid}&orderid=${orderid}`,
        success: function (data) {
            renderPDToForm(data, prodid);
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}

function renderPDToForm(data, prodid) {
    let maxValue = Math.max.apply(null,
        data.datapd.map(function (o) { return o.statusid; }));

    data.datapd.forEach((d) => {
        $(`#chkMaster${d.statusid}`).prop('checked', true);
        //if (d.statusid == 2) {
        //    $(`#txtvideourl`).val(d.videourl);
        //}
        if (d.statusid == 4) {
            $(`#txtApproveDate`).val(d.approveDate);
        }
    });
    if (data.datapd.length == 0) {
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

    let formId = '#form-editPD';
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

function settxtHeaderPD(steptype) {
    var txt = '';
    switch (steptype) {
        case 0: txt = 'รับบรีฟพร้อมรับไฟล์';
        case 1: txt = 'รับบรีฟพร้อมรับไฟล์';
            break;
        case 2: txt = 'โหลดไม้ขึ้นแท่นตัด';
            break;
        case 3: txt = 'CNC';
            break;
        case 4: txt = 'ปิดขอบ';
            break;
        case 5: txt = 'เจาะ';
            break;
        case 6: txt = 'ประกอบ';
            break;
        case 7: txt = 'QC';
            break;
        case 8: txt = 'PACKING';
            break;
        case 9: txt = 'โหลดของขึ้นรถ';
            break;
        default: break;
    }
    return txt;
}

let validateInputPD = function (modal) {

    switch (modal) {
        case "modal-editPD":

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
    }
};

function callSavePD() {
    if (!validateInputPD("modal-editPD")) { return; }

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
            DoSavePD();
        }
    });
}

function DoSavePD() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/PDList/AddItem` : `${app_settings.api_url}/api/PDList/UpdateItem`;
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
            empid: $('#select-edit-pd-name').val(),
            listStatus: listurl,
            loginCode: _userCode
        };

        $('.btn-modal-save-pd').addLoading();
        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: JSON.stringify(obj),
            success: (res) => {
                if (res.result) {
                    callSuccessAlert();
                    $('.btn-modal-save-pd').removeLoading();
                    $(`#modal-editPD`).modal('hide');
                    callGetPDList();
                }
                else {

                    $('.btn-modal-save-pd').removeLoading();
                }
            },
            error: () => {
                $('.btn-modal-save-pd').removeLoading();
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
            empid: $('#select-edit-pd-name').val(),
            checkliststatus: listurl,
            loginCode: _userCode
        };
        $('.btn-modal-save-pd').addLoading();

        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: JSON.stringify(obj),
            success: (res) => {
                if (res.result) {
                    callSuccessAlert();
                    $('.btn-modal-save-pd').removeLoading();
                    $(`#modal-editPD`).modal('hide');
                    callGetPDList();
                }
                else {

                    $('.btn-modal-save-pd').removeLoading();
                }
            },
            error: () => {
                $('.btn-modal-save-pd').removeLoading();
            }
        });

    }

}

function callGetNameSelectPD() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/PDList/GetNameSelectPDList`,
        success: function (data) {
            renderNameSelectPD(data);
        },
        error: function (err) {
        }
    });
}

function renderNameSelectPD(data) {
    $(`#form-editPD #select-edit-pd-name`).empty();
    $(`#form-editPD #select-edit-pd-name`).append(`<option value="">กรุณาเลือก</option>`);
    data.forEach((v) => {
        $(`#form-editPD #select-edit-pd-name`).append(`<option value="${v.empId}">${v.fullName}</option>`);
    });
    $(`#form-editPD #select-edit-pd-name`).val('').trigger('change');
}

function printFittingpd(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Fitting/GetItemByItemId?id=${id}`,
        success: function (data) {

            generatePrintFittingDocumentPD(data);

        },
        error: function (err) {
        }
    });

}
async function generatePrintFittingDocumentPD(data) {
    await renderPrintFittingtHtmlPD(data);
}
async function renderPrintFittingtHtmlPD(data) {
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

function printPlankspd(orderid) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Planks/GetItemByOrderId?orderid=${orderid}`,
        success: function (data) {

            generatePrintDocumentpd(data);

        },
        error: function (err) {
        }
    });

}

async function generatePrintDocumentpd(data) {
    await renderPrinttHtmlpd(data);
}
async function renderPrinttHtmlpd(data) {
   
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    $('#DateAction').html(today);
 
    for (var i = 0; i < data.list.length; i++) {
        var row;
        row = $('<tr id="row' + data.list[i].id + '">');

        row.append($('<td class="column0 style6 s" style="padding-left:1%;"><span style="font-family:KaLaTeXaTEXT;">').html(data.item.quotationNumber));
        row.append($('<td class="column1 style6 s" style="padding-left:1%;"><span style="font-family:KaLaTeXaTEXT;">').html(data.list[i].colorcode));
        row.append($('<td class="column2 style6 n" style="padding-right:1%;">0.05</td><span style="font-family:KaLaTeXaTEXT; ">').html(data.list[i].thicknesstype == 1 ? '18MM' : '9MM'));
        row.append($('<td class="column3 style6 n" style="padding-right:1%;"><span style="font-family:KaLaTeXaTEXT;">').html(data.list[i].amount));
        row.append($('<td class="column4 style6 s" style="padding-left:1%;"><span style="font-family:KaLaTeXaTEXT;">').html(data.list[i].remark));
        $('#tbl-planks-print').append(row);
     
    }
   
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
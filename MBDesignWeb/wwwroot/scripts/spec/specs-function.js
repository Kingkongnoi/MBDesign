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
function callSelect2Status(id, isSearch = false) {
    $(id).empty();
    if (isSearch) {
        $(id).append(`<option value="">ทั้งหมด</option>`);
    }
    $(id).append(`<option value="1">ใช้งาน</option>`);
    $(id).append(`<option value="0">ไม่ใช้งาน</option>`);
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
        url: `${app_settings.api_url}/api/Planks/GetPlanksList?quotaioncode=${docode}&saler=${saler}&getin=${getin}&stockinby=${stockinby}&stock=${stock}&status=${status}`,
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
                    data: 'quotationNumber',
                    className: "item-details"
                },
                {
                    targets: 2,
                    data: 'colorCode',
                    className: "item-details"
                },
                {
                    targets: 3,
                    data: 'thickness18MM',
                    className: "dt-center",
                },
                {
                    targets: 4,
                    data: 'thickness9MM',
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
                    className: `dt-center ${_role_product_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-planks" data-id="${row.id}" title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
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
            renderPlanksForm(data.item);
        },
        error: function (err) {
        }
    });
}

function renderPlanksForm(data, typeId) {
    let status = (data.status) ? 1 : 0;
    $('#form-createPlanks input[name="input-planks-id"]').val(data.id);
    $('#form-createPlanks #select-quotation-no').val(data.orderid).trigger('change');
    $('#form-createPlanks input[name="input-color-code"]').val(data.colorCode);
    $('#form-createPlanks input[name="input-18mm-amount"]').val(data.thickness18MM);
    $('#form-createPlanks input[name="input-9mm-amount"]').val(data.thickness9MM);
    $('#form-createPlanks #select-brand-status').val(status).trigger('change');
}

function clearSearchForm(area) {
    switch (area) {
        case "planks":
            $('#form-search-planks #input-search-quotation-code').val('');
            $('#form-search-planks #select-search-planks-status').val('').trigger('change');
            break;
    }
}

function clearForm(modal) {
    switch (modal) {
        case "modal-createPlanks" || "modal-viewPlanks":
            $('#form-createPlanks #select-quotation-no').val(0).trigger('change');
            $('#form-createPlanks input[name="input-color-code"]').val('');
            $('#form-createPlanks input[name="input-18mm-amount]').val('');
            $('#form-createPlanks input[name="input-9mm-amount]').val('');
            $('#form-createPlanks #select-planks-status').val(1).trigger('change');
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

let validateInputSpec = function (modal) {

    switch (modal) {
        case "modal-createPlanks":
            if ($('#form-createPlanks #select-quotation-no').val() == "") {
                Swal.fire({
                    text: "กรุณาเลือกเลขใบเสนอราคา",
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
            else if ($('#form-createPlanks #input-color-code').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกรหัสสี",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createPlanks #input-color-code').focus();
                });
                return false;
            }
            else if ($('#form-createPlanks #input-18mm-amount').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกจำนวนของ 18mm",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createPlanks #input-18mm-amount').focus();
                });
                return false;
            }
            else if ($('#form-createPlanks #input-9mm-amount').val() == "") {
                Swal.fire({
                    text: "กรุณากรอกจำนวนของ 9mm",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    //cancelButtonColor: _modal_default_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('#form-createPlanks #input-9mm-amount').focus();
                });
                return false;
            }

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
                if ($('#form-editSpec #select-edit-spec-quotation').val() == "") {
                    Swal.fire({
                        text: "กรุณาเลือกใบเสนอราคา",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-editSpec #select-edit-spec-quotation').focus();
                    });
                    return false;
                }
                else if (!$('#liMaster1 #chkMaster1').is(":checked")) {
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
                    console.log(_maxIDcheck);
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
    }
};

function callAddOrUpdatePlanks() {
    let url = (_product_item_action == 'add') ? `${app_settings.api_url}/api/Planks/AddItem` : `${app_settings.api_url}/api/Planks/UpdateItem`;


    var obj = {
        id: ($('#input-planks-id').val() == "") ? 0 : $('#input-planks-id').val(),
        orderid: $('#select-quotation-no').val(),
        colorCode: $('#input-color-code').val(),
        thickness18MM: $('#input-18mm-amount').val(),
        thickness9MM: $('#input-9mm-amount').val(),
        status: ($('#form-createPlanks #select-planks-status').val() == "1") ? true : false,
        loginCode: _userCode
    };


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
                $(`#modal-createBrand`).modal('hide');
                callGetBrandList();
                $('.btn-modal-save-brand').removeLoading();
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

function callQuatationNo(select2Id, select2FirstText) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Planks/GetQuatationList`,
        success: function (data) {
            console.log(data);
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
            console.log(data);
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
    console.log(data);
    $('#tb-spec-queue-list').DataTable(
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
                        return type === 'sort' ? data : row.commitDate ? convertDateTimeFormat(row.commitDate, 'DD/MM/YYYY') : "";
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
                    className: `dt-center ${_role_3d_class_display}`,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-spec" data-orderid="${row.orderId}" data-specid="${row.id}" data-step="${row.statusid}"  title="แก้ไข">
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

function renderEditSpec(orderid, specid, statusid) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/SpecList/GetSpecListByID?orderId=${specid}`,
        success: function (data) {
            renderSpecToForm(data);
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}

function renderEditChecklistStatus(checklistID) {

}

function renderSpecToForm(data) {

    let maxValue = Math.max.apply(null,
        data.dataspec.map(function (o) { return o.statusid; }));

    data.dataspec.forEach((d) => {
        $(`#chkMaster${d.statusid}`).prop('checked', true);
    });
    _maxIDcheck = `#chkMaster${maxValue + 1}`;
    _liMaxID = `#liMaster${maxValue + 1}`;
    $(`#chkMaster${maxValue + 1}`).removeAttr("onclick");
    $('#chkMaster1').attr("onclick", "return false;");
    if (_maxIDcheck == "#chkMaster2") {
        $('#chkMaster2').attr("onclick", "handleClick(this);");

    }

    let formId = '#form-editSpec';
    $(`${formId} #input-spec-id`).val(data.dataspec[0].id);
    $(`${formId} #txtquotationedit`).val(data.custOrder.quotationNumber);
    /*    $(`${formId} #input-edit-spec-quotation`).val(data.dataspec[0].orderid);*/
    var installDate = data.custOrder.installDate ? convertDateTimeFormat(data.custOrder.installDate, 'DD/MM/YYYY') : ""
    $(`${formId} #input-edit-spec-install-date`).val(installDate);

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

function test() {
    return false;
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
    data.forEach((v) => {
        console.log(v.id);
        /*$("#listChecklist").append(`<option value="${v.orderId}">${v.quotationNumber}</option>`);*/
        if (v.id != 1) {
            switch (v.id) {
                case 2:
                    $("#listChecklist").append(`<li id="liMaster${v.id}" class="list-group-item border-0 d-flex align-items-center ps-0">
                                   <input id="chkMaster${v.id}" class="form-check-input me-3 col-xl-2" type="checkbox" value="${v.id}" aria-label="..." onclick="return false;"/>
                                   <label class="col-xl-3"> ${v.checklistname}</label>
                                     <label class="col-xl-3 text-end" style="margin-right: 3%;">Video URL : </label><input class="form-control" type="text" id="txtvideourl" name="txtvideourl" disabled />
                                    </li>`);
                    break;
                default:
                    $("#listChecklist").append(`<li id="liMaster${v.id}" class="list-group-item border-0 d-flex align-items-center ps-0">
                                   <input id="chkMaster${v.id}" class="form-check-input me-3" type="checkbox" value="${v.id}" aria-label="..." onclick="return false;"/>
                                    ${v.checklistname}</li>`);
            }
        }
        else {
            $("#listChecklist").append(`<li id="liMaster${v.id}" class="list-group-item border-0 d-flex align-items-center ps-0">
                                   <input id="chkMaster${v.id}" class="form-check-input me-3" type="checkbox" value="${v.id}" aria-label="..."/>
                                    ${v.checklistname}</li>`);
        }


    });
}

function handleClick(cb) {
    console.log(cb.checked);
    if (cb.checked) {
        $("#txtvideourl").removeAttr("disabled");
    }
    else {
        $("#txtvideourl").attr('disabled', 'disabled');
        console.log("Booooo");
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

    if (_product_item_action == "edit") {
        $("#listChecklist li").each(function (index, item) {
            if ($(this).find("input[type=checkbox]").prop("checked")) {
                console.log("Check box in Checked");
                console.log(index); //Index start with 0 so when it's zero, 1st check box is checked.
                console.log($(this).text());
                console.log($(this).val());
            } else {
                console.log("Check box is not Checked");
            }
        });
    }
    else {
        var obj = {
            id: ($('#input-spec-id').val() == "") ? 0 : $('#input-spec-id').val(),
            orderid: $('#select-edit-spec-quotation').val(),
            commitdate: $('#input-edit-spec-due-date').val(),
            empid: $('#select-edit-spec-designName').val(),
            checkliststatus: $('#chkMaster1').val(),
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

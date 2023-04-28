let _modal_primary_color_code = "#F09723";
let _modal_default_color_code = "#EFEFEF";

let _customer_data_action = 'add';

function clearInputFormCustomerData() {
    let newCusForm = 'form-sale-new-customer';
    $(`#${newCusForm} #radioQuotationDraft`).prop('checked', true);
    $(`#${newCusForm} #input-cus-firstName`).val('');
    $(`#${newCusForm} #input-cus-nickname`).val('');
    $(`#${newCusForm} #input-cus-lineId`).val('');
    $(`#${newCusForm} #input-cus-bill-address`).val('');
    $(`#${newCusForm} #input-cus-location-address`).val('');
    $(`#${newCusForm} #input-cus-lastName`).val('');
    $(`#${newCusForm} #input-cus-tel`).val('');
    $(`#${newCusForm} #input-cus-install-date`).val('');
    $(`#${newCusForm} #input-cus-install-address`).val('');
}
let validateInputFormCustomerData = function () {
    let newCusForm = 'form-sale-new-customer';
    if ($(`#${newCusForm} #input-cus-firstName`).val() == "") {
        Swal.fire({
            text: "กรุณากรอกชื่อลูกค้า",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`#${newCusForm} #input-cus-firstName`).focus();
        });
        return false;
    }
    else if ($(`#${newCusForm} #input-cus-lastName`).val() == "") {
        Swal.fire({
            text: "กรุณากรอกนามสกุลลูกค้า",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`#${newCusForm} #input-cus-lastName`).focus();
        });
        return false;
    }
    else if ($(`#${newCusForm} #input-cus-tel`).val() == "") {
        Swal.fire({
            text: "กรุณากรอกเบอร์โทรศัพท์ลูกค้า",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`#${newCusForm} #input-cus-tel`).focus();
        });
        return false;
    }
    else if ($(`#${newCusForm} #input-cus-install-date`).val() == "") {
        Swal.fire({
            text: "กรุณากรอกวันที่พร้อมติดตั้ง",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`#${newCusForm} #input-cus-install-date`).focus();
        });
        return false;
    }
    else if ($(`#${newCusForm} #input-cus-bill-address`).val() == "") {
        Swal.fire({
            text: "กรุณากรอกที่อยู่ (สำหรับออกบิล)",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`#${newCusForm} #input-cus-bill-address`).focus();
        });
        return false;
    }
    else {
        return true;
    }
}


function callGetStyleSelect2(formName) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetSelect2ProductStyle`,
        success: function (data) {
            renderStyleSelect2(formName, data);
        },
        error: function (err) {
        }
    });
}
function renderStyleSelect2(formName, data) {
    $(`#${formName} #select-cus-product-style`).empty();
    $(`#${formName} #select-cus-product-style`).append(`<option value="">กรุณาเลือก</option>`);
    data.forEach((v) => {
        $(`#${formName} #select-cus-product-style`).append(`<option value="${v.styleId}">${v.styleName}</option>`);
    });
    $(`#${formName} #select-cus-product-style`).val('').trigger('change')
}
function callGetProductTypeSelect2(formName) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetSelect2ProductType`,
        success: function (data) {
            renderProductTypeSelect2(formName, data);
        },
        error: function (err) {
        }
    });
}
function renderProductTypeSelect2(formName, data) {
    $(`#${formName} #select-cus-product-type`).empty();
    $(`#${formName} #select-cus-product-type`).append(`<option value="">กรุณาเลือก</option>`);
    data.forEach((v) => {
        $(`#${formName} #select-cus-product-type`).append(`<option value="${v.typeId}">${v.typeName}</option>`);
    });
    $(`#${formName} #select-cus-product-type`).val('').trigger('change')
}
function callGetProductItemSelect2(formName) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetSelect2ProductItem`,
        success: function (data) {
            renderProductItemSelect2(formName, data);
        },
        error: function (err) {
        }
    });
}
function renderProductItemSelect2(formName, data) {
    $(`#${formName} #select-cus-product-items`).empty();
    $(`#${formName} #select-cus-product-items`).append(`<option value="">กรุณาเลือก</option>`);
    data.forEach((v) => {
        $(`#${formName} #select-cus-product-items`).append(`<option value="${v.itemId}" price="${v.itemPrice}" name="${v.itemName}">${v.fullItemPrice}</option>`);
    });
    $(`#${formName} #select-cus-product-items`).val('').trigger('change')
}
function clearCreateStyleSelect2() {
    $('#form-search-holiday #select-search-holiday-year').empty();
    $('#form-search-holiday #select-search-holiday-year').append(`<option value="">ทั้งหมด</option>`);
    data.forEach((v) => {
        $('#form-search-holiday #select-search-holiday-year').append(`<option value="${v.holidayYear}">${v.holidayYear}</option>`);
    });
    $('#form-search-holiday #select-search-holiday-year').val('').trigger('change')
}
function renderCreateStyleDiv() {
    let newSeq = $('div[name="seqCreateStyle"]').length == 0 ? 1 : $('div[name="seqCreateStyle"]').length + 1;
    let removeBtn = newSeq > 1 ? `<div class="col-sm-6 text-end">
                                    <button type="button" class="btn btn-primary" data-seq="${newSeq}" onclick="removeRenderStyleWithSeq(this)"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                </div>` : ``;
    let renderDiv = `<div id="divCreateStyle-${newSeq}" style="border:solid 0.025rem;" name="seqCreateStyle">
        <div class="card-header bg-primary text-light">
            <div class="row col-sm-12">
                <div class="col-sm-6 mt-2"><h6>ชิ้นงานที่ ${newSeq}</h6></div>
                ${removeBtn}
            </div>
        </div>
        <div class="card-body">
            <form id="formCreateStyle-${newSeq}">
                <div class="row d-sm-flex">

                    <div class="col-sm-6">
                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือกสไตล์<span class="text-danger">*</span></label>
                            <div class="col-sm-9">
                                <select class="form-select" id="select-cus-product-style" data-seq="${newSeq}">
                                    <option></option>
                                </select>
                            </div>
                        </div>

                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือกโซน</label>
                            <div class="col-sm-9">
                                <div class="col-sm-9">
                                    <input class="form-control" type="text" id="input-cus-product-zone" name="input-cus-product-zone" data-seq="${newSeq}" />
                                </div>
                            </div>
                        </div>

                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือก Items<span class="text-danger">*</span></label>
                            <div class="col-sm-9">
                                <select class="form-select" id="select-cus-product-items" onchange="callGetProductItemOptions(this);" data-seq="${newSeq}">
                                    <option></option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <div class="col-sm-6">
                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือกชั้น</label>
                            <div class="col-sm-9">
                                <input class="form-control" type="text" id="input-cus-product-floor" name="input-cus-product-floor" data-seq="${newSeq}" />
                            </div>
                        </div>

                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือกหมวดหมู่<span class="text-danger">*</span></label>
                            <div class="col-sm-9">
                                <select class="form-select" id="select-cus-product-type" data-seq="${newSeq}">
                                    <option></option>
                                </select>
                            </div>
                        </div>

                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือก Options<span class="text-danger">*</span></label>
                            <div class="col-sm-9" id="chkselectOptions-${newSeq}" data-seq="${newSeq}" style="overflow-y:auto;">
    
                            </div>
                        </div>


                    </div>

                </div>

                <div class="row">
                <div class="row col-sm-12 mb-2">
                    <label class="col-sm-3 col-form-label text-end">ขนาด</label>
                    <div class="row col-sm-9">
                        <div class="col-sm-4">
                            <label class="col-sm-3 col-form-label">ความยาว</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="number" id="input-cus-product-length" name="input-cus-product-length" data-seq="${newSeq}" />
                                </div>
                        </div>
                        <div class="col-sm-4">
                                <label class="col-sm-3 col-form-label">ความลึก</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="number" id="input-cus-product-depth" name="input-cus-product-depth" data-seq="${newSeq}" />
                                </div>
                        </div>
                        <div class="col-sm-4">
                          <label class="col-sm-3 col-form-label">ความสูง</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="number" id="input-cus-product-height" name="input-cus-product-height" data-seq="${newSeq}" />
                                </div>
                        </div>
                    </div>
                </div>

                <div class="row col-sm-12 mb-2">
                    <label class="col-sm-3 col-form-label text-end"></label>
                    <div class="row col-sm-9">
                        <div class="col-sm-12">
                            <label class="col-sm-3 col-form-label"></label>
                                <div class="col-sm-9">
                                     <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="chkSpecialHeight-${newSeq}">
                                            <label class="form-check-label">
                                            ความสูงพิเศษ (มากกว่าหรือเท่ากับ 2.70 เมตรขึ้นไป จะถูกคำนวณราคาเพิ่ม)
                                            </label>
                                    </div>
                                </div>
                        </div>
                        
                    </div>
                </div>

            </div>

            </form>

        </div>
    </div>`

    $('#divCreateStyle').append(renderDiv)

    ///Render input form
    let formName = `formCreateStyle-${newSeq}`;
    callGetStyleSelect2(formName);
    callGetProductTypeSelect2(formName);
    callGetProductItemSelect2(formName);
}
function removeRenderStyleWithSeq(obj) {
    Swal.fire({
        title: 'คุณต้องการลบหรือไม่?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'บันทึก',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            let currSeq = $(obj).data('seq');
            $(`#divCreateStyle-${currSeq}`).remove();
        }
    });
}
function callGetProductItemOptions(obj) {
    let currSeq = $(obj).data('seq');
    let formName = `formCreateStyle-${currSeq}`;
    let itemId = $(`#${formName} #select-cus-product-items`).val() == "" ? 0 : $(`#${formName} #select-cus-product-items`).val();

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetSelect2ProductItemOptionsByItemId?itemId=${itemId}`,
        success: function (data) {
            renderCheckboxOptions(formName, currSeq, data);
        },
        error: function (err) {
        }
    });
}
function renderCheckboxOptions(formName, seq, data) {
    let renderChk = ``;

    $(`#${formName} #chkselectOptions-${seq}`).empty();

    data.forEach((v) => {
        renderChk += `<div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="${seq}-${v.optionsId}" name="${v.options}" price="${v.optionsPrice}">
                            <label class="form-check-label">
                            ${v.options} - ${v.optionsPrice}
                            </label>
                        </div>`;
    });

    $(`#${formName} #chkselectOptions-${seq}`).append(renderChk);
}

var _bank_account = [];
function callGetActiveBankAccount() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetAllActiveBankAccount`,
        success: function (data) {
            _bank_account = data;
            displayBankAccount('personal');
        },
        error: function (err) {
        }
    });
}
function displayBankAccount(accountType) {
    $('#divCalculatePrice #displayAccountDetail').empty();

    var acc = _bank_account.filter(v => { return v.accountType == accountType });
    let bank = (acc.length == 0) ? "" : acc[0].bank;
    let accountName = (acc.length == 0) ? "" : acc[0].accountName;
    let accountNumber = (acc.length == 0) ? "" : acc[0].accountNumber;

    let render = `<span>
                    ${bank}<br />
                    ชื่อบัญชี ${accountName}<br />
                    เลขบัญชี ${accountNumber}<br />
                </span>`;

    $('#divCalculatePrice #displayAccountDetail').append(render)
}

var _style_list = [];
function callGetItemOptions() {
    $.each($(`#createStyle #divCreateStyle div[name="seqCreateStyle"]`), (i, item) => {
        let divId = $(item).attr('id');
        let seq = (divId.split("-")[1])

        let calStyle = $(`#${divId} #select-cus-product-style`).val();
        let calFloor = $(`#${divId} #input-cus-product-floor`).val();
        let calZone = $(`#${divId} #input-cus-product-zone`).val();
        let calType = $(`#${divId} #select-cus-product-type`).val();
        let calItems = $(`#${divId} #select-cus-product-items`).val();
        let calItemsPrice = $(`#${divId} #select-cus-product-items option:selected`).attr('price');
        let calItemsName = $(`#${divId} #select-cus-product-items option:selected`).attr('name');

        var options = [];
        $.each($(`#${divId} #chkselectOptions-${seq} input[type="checkbox"]`), (i, item) => {
            let chkId = $(item).attr('id');
            let optionsId = chkId.split("-")[1];
            let optionsName = $(item).attr('name');
            let optionsPrice = $(item).attr('price');

            options.push({ optionsId: optionsId, optionsChecked: $(`#${chkId}`).prop('checked'), optionsName: optionsName, optionsPrice: optionsPrice });
        });

        let calLength = $(`#${divId} #input-cus-product-length`).val();
        let calDepth = $(`#${divId} #input-cus-product-depth`).val();
        let calHeight = $(`#${divId} #input-cus-product-height`).val();
        let chkSpHeight = $(`#${divId} #chkSpecialHeight-${seq}`).prop('checked');

        _style_list.push({
            divId: divId,
            divSeq: seq,
            styleId: calStyle,
            floor: calFloor,
            zone: calZone,
            typeId: calType,
            itemId: calItems,
            itemName: calItemsName,
            itemPrice: calItemsPrice,
            options: options,
            orderLength: calLength,
            orderDepth: calDepth,
            orderHeight: calHeight,
            spHeight: chkSpHeight
        });
    });
}
function callCalculateItemOptions() {
    let render = "";
    _style_list.forEach((v) => {
        let itemName = v.itemName;
        let itemPrice = v.itemPrice;

        var activeOptions = v.options.filter(c => { return c.optionsChecked == true; });
        activeOptions.forEach((o) => { itemName += ` ${o.optionsName}`; itemPrice = parseFloat(itemPrice) + parseFloat(o.optionsPrice) });

        render += `<div class="row" id="cal-${v.divId}">
                            <div class="col-sm-8">
                            <input class="form-control mb-2" type="text" id="input-cal-itemOptions" name="input-cal-itemOptions" value="${itemName}" disabled/>
                            </div>
                        <div class="col-sm-2">
                            <input class="form-control mb-2" type="text" id="input-cal-itemPrice" name="input-cal-itemPrice" value="${itemPrice}" disabled/>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-primary btn-circle-xs mb-2" title="ลบ" data-seq=${v.seq} onclick="removeRenderStyleWithSeq(this)"><i class="fa fa-minus"></i></button>
                        </div>
                        </div>`
    });

    $('#divCalculatePrice #divCalItemOptions').append(render);
}

function callSaveAndCreateQuotation() {
    Swal.fire({
        title: 'คุณต้องการบันทึกใบเสนอราคาหรือไม่?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'บันทึก',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            saveCusData();
        }
    });
}
function saveCusData(action = 'add') {
    //customer data
    let newCusForm = 'form-sale-new-customer';
    let quotationType = ($(`#${newCusForm} #radioQuotationDraft`).prop('checked') == true) ? "draft" : "complete" ;
    let cusFirstName = $(`#${newCusForm} #input-cus-firstName`).val();
    let cusNickName = $(`#${newCusForm} #input-cus-nickname`).val();
    let cusLineId = $(`#${newCusForm} #input-cus-lineId`).val();
    let cusBillAddress = $(`#${newCusForm} #input-cus-bill-address`).val();
    let cusLocationAddress = $(`#${newCusForm} #input-cus-location-address`).val();
    let cusLastName = $(`#${newCusForm} #input-cus-lastName`).val();
    let cusTel = $(`#${newCusForm} #input-cus-tel`).val();
    let cusInstallDate = $(`#${newCusForm} #input-cus-install-date`).val();
    let cusInstallAddress = $(`#${newCusForm} #input-cus-install-address`).val();

    //style
    var items = [];
    _style_list.forEach((v) => {
        var options = [];

        var activeOptions = v.options.filter(c => { return c.optionsChecked == true; });
        activeOptions.forEach((o) => { options.push({ optionsId: o.optionsId }) });

        items.push({
            styleId: v.styleId,
            floor: v.floor,
            zone: v.zone, 
            typeId: v.typeId,
            itemId: v.itemId,
            orderLength: v.orderLength,
            orderDepth: v.orderDepth,
            orderHeight: v.orderHeight,
            options: options
        });
    });

    //Calculate
    let calFormId = 'form-createCalculatePrice';
    let calNote = $(`#${calFormId} #input-cal-note`).val();
    let subTotal = $(`#${calFormId} #input-cal-subTotal`).val();
    let discount = $(`#${calFormId} #input-cal-discount`).val();
    let vatPercentage = ($(`#${calFormId} #radioVat`).prop('checked') == true) ? 0.07 : 0;
    let vat = $(`#${calFormId} #input-cal-vat`).val();
    let grandTotal = $(`#${calFormId} #input-cal-grandTotal`).val();
    let disposite = $(`#${calFormId} #input-cal-disposite`).val();
    let accountType = ($(`#${calFormId} #radioBankPersonal`).prop('checked') == true) ? "บัญชีส่วนบุคคล" : "บัญชีบริษัท";

    let url = (action == 'add') ? `${app_settings.api_url}/api/Sale/SaveAndCreateQuotation` : `${app_settings.api_url}/api/Sale/SaveAndCreateQuotation`;

    var obj = {
        custFirstName: cusFirstName,
        custSurName: cusLastName,
        custNickName: cusNickName,
        custTel: cusTel,
        custLineId: cusLineId,
        custAddress: cusBillAddress,
        custLocation: cusLocationAddress,
        custInstallAddress: cusInstallAddress,
        quotationType: quotationType,
        installDate: cusInstallDate,
        items: items,
        orderNote: calNote,
        subTotal: subTotal,
        discount: discount,
        vat: vat,
        grandTotal: grandTotal,
        disposite: disposite,
        accountType: accountType,
        vatPercentage: vatPercentage
    };

    var data = JSON.stringify(obj);

    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: (res) => {
            if (res.data != "") {
                callSuccessAlert();
                //$(`#modal-createProduct`).modal('hide');
                //callGetItemList();
                renderQuotationNumber(data);
            }
        },
        error: () => {
        },
        contentType: 'application/json',
        dataType: "json",
    });
}

function renderQuotationNumber(quotationNumber) {
    $('#divUploadRef #form-uploadRef #input-quotation-number').val("");
    $('#divUploadRef #form-uploadRef #input-quotation-number').val(quotationNumber);
}

function callSuccessAlert() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'บันทึกข้อมูลสำเร็จ',
        showConfirmButton: false,
        timer: 1500
    });
}

function callSelect2QuotationStatus(id, isSearch = false) {
    $(id).empty();
    if (isSearch) {
        $(id).append(`<option value="">ทั้งหมด</option>`);
    }
    $(id).append(`<option value="อนุมัติ">อนุมัติ</option>`);
    $(id).append(`<option value="ไม่อนุมัติ">ไม่อนุมัติ</option>`);
}

function clearSearchQuotationForm() {
    let formId = '#form-search-quotation';

    $(`${formId} #input-search-quotation-number`).val('');
    $(`${formId} #input-search-quotation-cusName`).val('');
    $(`${formId} #select-search-quotation-status`).val('').trigger('change');
}
function callGetQuotationList() {
    let formId = '#form-search-quotation';
    let quotationNumber = ($(`${formId} #input-search-quotation-number`).val() == '') ? "%%" : $(`${formId} #input-search-quotation-number`).val();
    let quotationCusName = ($(`${formId} #input-search-quotation-cusName`).val() == '') ? "%%" : $(`${formId} #input-search-quotation-cusName`).val();
    let status = ($(`${formId} #select-search-quotation-status`).val() == '') ? "%%" : $(`${formId} #select-search-quotation-status`).val();

    //let loaded = $('#tb-quotation-list');

    //loaded.prepend(loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetQuotationList?quotationNumber=${quotationNumber}&quotationCusName=${quotationCusName}&status=${status}`,
        success: function (data) {
            renderGetQuotationList(data);
            //loaded.find(loader).remove();
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}
function renderGetQuotationList(data) {
    $('#tb-quotation-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bfrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.orderId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'quotationNumber',
                    className: "quotationNumber-details",
                },
                {
                    targets: 1,
                    data: 'fullName',
                },
                {
                    targets: 2,
                    data: 'createDate',
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 3,
                    data: 'createBy'
                },
                {
                    targets: 4,
                    data: 'createDate',
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 5,
                    data: 'updateDate',
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 6,
                    data: 'updateBy'
                },
                {
                    targets: 7,
                    data: null,
                    orderable: false,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-cus-quotation" data-id="${row.orderId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
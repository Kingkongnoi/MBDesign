﻿let _modal_primary_color_code = "#F09723";
let _modal_default_color_code = "#EFEFEF";

let _action = 'add';

let _userId = localStorage.getItem('loginId');
let _userCode = localStorage.getItem('loginCode');
let _userName = localStorage.getItem('loginName');

let _loader = $('<div/>').addClass('loader');

var _permission = [];
function renderPermissionMenu() {
    let loginId = localStorage.getItem('loginId');

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Login/GetMenuPermissionPerEmpData?id=${loginId}`,
        success: function (data) {
            _permission = data.filter((a) => { return a.menuName == "การขาย" });
        },
        error: function (err) {
        }
    });
}
function clearInputFormCustomerData() {
    let newCusForm = 'form-sale-new-customer';
    $(`#${newCusForm} #radioQuotationComplete`).prop('checked', true);
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
    else if ($(`#${newCusForm} #input-cus-tel`).val().length < 10 || $(`#${newCusForm} #input-cus-tel`).val().length > 10) {
        Swal.fire({
            text: "กรุณากรอกเบอร์โทรศัพท์ลูกค้า 10 หลัก",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`#${newCusForm} #input-cus-tel`).focus();
        });
        return false;
    }
    else if ($.isNumeric($(`#${newCusForm} #input-cus-tel`).val()) == false) {
        Swal.fire({
            text: "กรุณากรอกเบอร์โทรศัพท์ลูกค้าเป็นตัวเลข",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`#${newCusForm} #input-cus-tel`).focus();
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
    if (_action == 'add') {
        $(`#${formName} #select-cus-product-style`).val('').trigger('change');
    }
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
        $(`#${formName} #select-cus-product-type`).append(`<option value="${v.typeId}" price="${v.typePrice}" name="${v.typeName}">${v.fullTypePrice}</option>`);
    });
    if (_action == "add") {
        $(`#${formName} #select-cus-product-type`).val('').trigger('change');
    }
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
function renderProductItemSelect2(formName/*, data*/) {
    $(`#${formName} #select-cus-product-items`).empty();
    $(`#${formName} #select-cus-product-items`).append(`<option value="">กรุณาเลือก</option>`);
    //data.forEach((v) => {
    //    $(`#${formName} #select-cus-product-items`).append(`<option value="${v.itemId}" price="${v.itemPrice}" name="${v.itemName}">${v.fullItemPrice}</option>`);
    //});

    //if (_action == "add") {
        $(`#${formName} #select-cus-product-items`).val('').trigger('change');
    //}
}
function clearCreateStyleSelect2() {
    $('#form-search-holiday #select-search-holiday-year').empty();
    $('#form-search-holiday #select-search-holiday-year').append(`<option value="">ทั้งหมด</option>`);
    data.forEach((v) => {
        $('#form-search-holiday #select-search-holiday-year').append(`<option value="${v.holidayYear}">${v.holidayYear}</option>`);
    });
    $('#form-search-holiday #select-search-holiday-year').val('').trigger('change')
}

let validateInputFormStyle = function () {
    var result = true;

    $.each($(`#createStyle #divCreateStyle div[name="seqCreateStyle"]`), (i, item) => {
        let divId = $(item).attr('id');
        let seq = (divId.split("-")[1])

        let calStyle = $(`#${divId} #select-cus-product-style`).val();
        if (calStyle == "" || calStyle == null || calStyle == undefined) {
            Swal.fire({
                text: "กรุณาเลือกสไตล์",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: _modal_primary_color_code,
                confirmButtonText: 'ตกลง'
            }).then((result) => {
                $(`${divId} #select-cus-product-style`).focus();
            });
            result = false;
            return false;
        }

        let calType = $(`#${divId} #select-cus-product-type`).val();
        if (calType == "" || calType == null || calType == undefined) {
            Swal.fire({
                text: "กรุณาเลือกหมวดหมู่",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: _modal_primary_color_code,
                confirmButtonText: 'ตกลง'
            }).then((result) => {
                $(`${divId} #select-cus-product-type`).focus();
            });
            result = false;
            return false;
        }

        //let calItems = $(`#${divId} #select-cus-product-items`).val();
        //if (calItems == "" || calItems == null || calItems == undefined) {
        //    Swal.fire({
        //        text: "กรุณาเลือก Items",
        //        icon: 'warning',
        //        showCancelButton: false,
        //        confirmButtonColor: _modal_primary_color_code,
        //        confirmButtonText: 'ตกลง'
        //    }).then((result) => {
        //        $(`${divId} #select-cus-product-items`).focus();
        //    });
        //    result = false;
        //    return false;
        //}
       
        let inputHeight = $(`#${divId} #input-cus-product-height`).val();
        let checkedHeightSp = $(`#${divId} #chkSpecialHeight-${seq}`).prop('checked');
        $(`#${divId} #input-cus-product-height`).css('color', 'black');
        if (inputHeight >= 2.7 && checkedHeightSp == false) {
            Swal.fire({
                text: "กรุณาคลิก ความสูงพิเศษ เมื่อกรอกความสูง >= 2.70 เมตรขึ้นไป",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: _modal_primary_color_code,
                confirmButtonText: 'ตกลง'
            }).then((result) => {
                $(`#${divId} #input-cus-product-height`).css('color', 'red');
            });
            result = false;
            return false;
        }
        //var options = [];
        //$.each($(`#${divId} #chkselectOptions-${seq} input[type="checkbox"]`), (i, item) => {
        //    let chkId = $(item).attr('id');
        //    let optionsId = chkId.split("-")[1];
        //    let optionsName = $(item).attr('name');
        //    let optionsPrice = $(item).attr('price');

        //    options.push({ optionsId: optionsId, optionsChecked: $(`#${chkId}`).prop('checked'), optionsName: optionsName, optionsPrice: optionsPrice });
        //});
    });

    return result;
}
function renderCreateStyleDiv() {
    let newSeq = $('div[name="seqCreateStyle"]').length == 0 ? 1 : $('div[name="seqCreateStyle"]').length + 1;
    let removeBtn = newSeq > 1 ? `<div class="col-sm-6 text-end">
                                    <button type="button" class="btn btn-primary" data-seq="${newSeq}" onclick="removeRenderStyleWithSeq(this)"><i class="fa fa-minus" aria-hidden="true"></i></button>
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
                                    <input class="form-control" type="text" id="input-cus-product-zone" name="input-cus-product-zone" data-seq="${newSeq}" />
                            </div>
                        </div>

                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือก Items</label>
                            <div class="col-sm-9">
                                <select class="form-select" id="select-cus-product-items" onchange="callGetProductItemOptions(this);" data-seq="${newSeq}">
                                    <option></option>
                                </select>
                            </div>
                        </div>

                        <div class="row col-sm-12">
                            <label class="col-sm-3 col-form-label text-end">ขนาด</label>
                            <div class="row col-sm-9">
                                <div class="col-sm-4">
                                    <label class="col-sm-4 col-form-label">ความยาว</label>
                                    <div class="col-sm-12">
                                        <input class="form-control" type="number" id="input-cus-product-length" name="input-cus-product-length" data-seq="${newSeq}" />
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <label class="col-sm-4 col-form-label">ความลึก</label>
                                    <div class="col-sm-12">
                                        <input class="form-control" type="number" id="input-cus-product-depth" name="input-cus-product-depth" data-seq="${newSeq}" />
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <label class="col-sm-4 col-form-label">ความสูง</label>
                                    <div class="col-sm-12">
                                        <input class="form-control" type="number" id="input-cus-product-height" name="input-cus-product-height" data-seq="${newSeq}" onblur="setCheckedSpecialHeight(${newSeq});" onkeydown="setCheckedSpecialHeight(${newSeq});" />
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
                                                    <input class="form-check-input" type="checkbox" value="" id="chkSpecialHeight-${newSeq}" disabled>
                                                    <label class="form-check-label">
                                                    ความสูงพิเศษ (มากกว่าหรือเท่ากับ 2.70 เมตรขึ้นไป จะถูกคำนวณราคาเพิ่ม)
                                                    </label>
                                            </div>
                                        </div>
                                </div>
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
                                <select class="form-select" id="select-cus-product-type" onchange="callGetProductItemSelect2ByType(this);" data-seq="${newSeq}">
                                    <option></option>
                                </select>
                            </div>
                        </div>

                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือก Options</label>
                            <div class="col-sm-9" id="chkselectOptions-${newSeq}" data-seq="${newSeq}" style="overflow-y:auto;">
    
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
    //callGetProductItemSelect2(formName);
    renderProductItemSelect2(formName);
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
            let currDivId = $(obj).data('divid');
            $(`#divCreateStyle-${currSeq}`).remove();
            $(`#cal-${currDivId}`).remove();
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
            if (_action == "edit") {
                renderCustOptions();
            }
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
function callGetProductItemSelect2ByType(obj) {
    let currSeq = $(obj).data('seq');
    let formName = `formCreateStyle-${currSeq}`;
    let typeId = $(`#${formName} #select-cus-product-type`).val() == "" ? 0 : $(`#${formName} #select-cus-product-type`).val();

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetSelect2ProductItemByTypeId?typeId=${typeId}`,
        success: function (data) {
            renderProductItemSelect2ByType(formName, data);
            //if (_action == "edit") {
            //    renderCustOptions();
            //}
        },
        error: function (err) {
        }
    });
}
function renderProductItemSelect2ByType(formName, data) {
    $(`#${formName} #select-cus-product-items`).empty();
    $(`#${formName} #select-cus-product-items`).append(`<option value="">กรุณาเลือก</option>`);

    if (data.length > 0) {
        data.forEach((v) => {
            $(`#${formName} #select-cus-product-items`).append(`<option value="${v.itemId}" price="${v.itemPrice}" name="${v.itemName}">${v.fullItemPrice}</option>`);
        });

        if (_action == "add") {
            $(`#${formName} #select-cus-product-items`).val('').trigger('change');
        }
        else if (_action == "edit") {
            $(`#${formName} #select-cus-product-items`).val(_items[0].itemId).trigger('change');
        }
    }
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
var _subTotal = 0;
var _cal_grand_total = 0;
function callGetItemOptions() {
    _style_list = [];
    $.each($(`#createStyle #divCreateStyle div[name="seqCreateStyle"]`), (i, item) => {
        let divId = $(item).attr('id');
        let seq = (divId.split("-")[1])

        let calStyle = $(`#${divId} #select-cus-product-style`).val();
        let calFloor = $(`#${divId} #input-cus-product-floor`).val();
        let calZone = $(`#${divId} #input-cus-product-zone`).val();

        let calType = $(`#${divId} #select-cus-product-type`).val();
        let calTypePrice = $(`#${divId} #select-cus-product-type option:selected`).attr('price');
        let calTypeName = $(`#${divId} #select-cus-product-type option:selected`).attr('name');
        let calItems = $(`#${divId} #select-cus-product-items`).val();
        let calItemsPrice = ($(`#${divId} #select-cus-product-items option:selected`).attr('price') == undefined || $(`#${divId} #select-cus-product-items option:selected`).attr('price') == "")
            ? 0 : $(`#${divId} #select-cus-product-items option:selected`).attr('price');
        let calItemsName = ($(`#${divId} #select-cus-product-items option:selected`).attr('name') == undefined || $(`#${divId} #select-cus-product-items option:selected`).attr('name') == "")
            ? "" : $(`#${divId} #select-cus-product-items option:selected`).attr('name');

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
            typePrice: calTypePrice,
            typeName: calTypeName,
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
    _subTotal = 0;
    
    $('#divCalculatePrice #divCalItemOptions').empty();
    _style_list.forEach((v) => {
        let typeName = v.typeName;
        let typePrice = v.typePrice;

        let itemName = typeName + (v.itemName == "" ? "" : ` ${v.itemName}`);
        let itemPrice = parseFloat(typePrice) + (v.itemPrice == "" ? 0 : parseFloat(v.itemPrice));

        let calSpHeight = 0;
        let calSpHeightPercentage = 0;

        if (v.spHeight) {
            calSpHeightPercentage = ((100 / 2.60 * v.orderHeight) - 100)/100;
        }

        var activeOptions = v.options.filter(c => { return c.optionsChecked == true; });
        activeOptions.forEach((o) => { itemName += ` ${o.optionsName}`; itemPrice = parseFloat(itemPrice) + parseFloat(o.optionsPrice) });

        let showItemPrice = 0;
        if (v.spHeight) {
            calSpHeight = Math.ceil(((parseFloat(itemPrice) * parseFloat(calSpHeightPercentage)) + parseFloat(itemPrice))).toFixed(2);
            showItemPrice = calSpHeight;
        }
        else {
            showItemPrice = (parseFloat(itemPrice).toFixed(2));
        }
 
        render += `<div class="row" id="cal-${v.divId}">
                            <div class="col-sm-8">
                            <input class="form-control mb-2" type="text" id="input-cal-itemOptions" name="input-cal-itemOptions" value="${itemName}" disabled/>
                            </div>
                        <div class="col-sm-2">
                            <input class="form-control mb-2" type="text" id="input-cal-itemPrice" name="input-cal-itemPrice" value="${showItemPrice}" disabled/>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-primary btn-circle-xs mb-2" title="ลบ" data-seq=${v.divSeq} data-divid=${v.divId} onclick="removeRenderStyleWithSeq(this)"><i class="fa fa-minus"></i></button>
                        </div>
                        </div>`

        _subTotal = parseFloat(_subTotal) + parseFloat(showItemPrice);//+ parseFloat(itemPrice) + parseFloat(calSpHeight);

    });

    $('#divCalculatePrice #divCalItemOptions').append(render);

    calculateSubAndGrandTotal();
}

let validateInputCalPrice = function () {
    if ($('#form-createCalculatePrice input[name="input-cal-subTotal"]').val() == "" || $('#form-createCalculatePrice input[name="input-cal-subTotal"]').val() == "0") {
        Swal.fire({
            text: "กรุณากรอก ราคารวม (Sub. Total)",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-createCalculatePrice input[name="input-cal-subTotal"]').focus();
        });
        return false;
    }
    else if ($('#form-createCalculatePrice input[name="input-cal-discount"]').val() <0) {
        Swal.fire({
            text: "กรุณากรอกส่วนลดมากกว่า 0",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-createCalculatePrice input[name="input-cal-discount"]').focus();
        });
        return false;
    }
    else if ($('#form-createCalculatePrice input[name="input-cal-discount"]').val() > 0 && $('#form-createCalculatePrice input[name="input-cal-discount"]').val() > 1000) {
        Swal.fire({
            text: "กรุณากรอกส่วนลดไม่เกิน 1000",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-createCalculatePrice input[name="input-cal-discount"]').focus();
        });
        return false;
    }
    else if ($('#form-createCalculatePrice input[name="input-cal-grandTotal"]').val() == "" || $('#form-createCalculatePrice input[name="input-cal-grandTotal"]').val() == "0") {
        Swal.fire({
            text: "กรุณากรอก ราคารวมทั้งหมด (Grand Total)",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-createCalculatePrice input[name="input-cal-grandTotal"]').focus();
        });
        return false;
    }
    else if ($('#form-createCalculatePrice input[name="input-cal-disposite"]').val() == "" || $('#form-createCalculatePrice input[name="input-cal-disposite"]').val() == "0") {
        Swal.fire({
            text: "กรุณากดคำนวณยอดมัดจำ",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-createCalculatePrice input[name="input-cal-disposite"]').focus();
        });
        return false;
    }
    else {
        return true;
    }
};

function callSaveAndCreateQuotation() {
    if (!validateInputCalPrice()) { return; }

    Swal.fire({
        title: 'คุณต้องการบันทึกใบเสนอราคาหรือไม่?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'บันทึก',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            swal.close();
            saveQuotation();
        }
    });
}
function saveQuotation() {
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
    let calOrderNotePrice = $(`#${calFormId} #input-cal-note-price`).val();
    let subTotal = $(`#${calFormId} #input-cal-subTotal`).val();
    let discount = $(`#${calFormId} #input-cal-discount`).val();
    let vatPercentage = ($(`#${calFormId} #radioVat`).prop('checked') == true) ? 0.07 : 0;
    let vat = $(`#${calFormId} #input-cal-vat`).val();
    let grandTotal = $(`#${calFormId} #input-cal-grandTotal`).val();
    let disposite = $(`#${calFormId} #input-cal-disposite`).val();
    let accountType = ($(`#${calFormId} #radioBankPersonal`).prop('checked') == true) ? "บัญชีส่วนบุคคล" : "บัญชีนามบริษัท";
    let quotationComment = $(`#${calFormId} #input-cal-approve`).val();

    let url = `${app_settings.api_url}/api/Sale/SaveAndCreateQuotation`;

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
        orderNotePrice: calOrderNotePrice,
        subTotal: subTotal,
        discount: discount,
        vat: vat,
        grandTotal: grandTotal,
        disposite: disposite,
        accountType: accountType,
        vatPercentage: vatPercentage,
        action: _action,
        orderId: _order_id,
        custId: _cust_id,
        quotationComment: quotationComment,
        loginCode: _userCode,
    };

    var data = JSON.stringify(obj);

    $('.btn-save-and-create-quotation').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: (res) => {
            if (res != "") {
                callSuccessAlert();
                renderQuotationNumber(res);
                $('.btn-save-and-create-quotation').removeLoading();
                $('.nav-pills a[href="#nav-sale-fileUpload-tab"]').tab('show');
                clearAllInputCreateStyle();
            }
        },
        error: () => {
            $('.btn-save-and-create-quotation').removeLoading();
        },
        contentType: 'application/json',
        dataType: "json",
    });
}

function renderQuotationNumber(res) {
    $('#divUploadRef #form-uploadRef #custOrderId').val("");
    $('#divUploadRef #form-uploadRef #custOrderId').val(res.orderId);

    $('#divUploadRef #form-uploadRef #input-quotation-number').val("");
    $('#divUploadRef #form-uploadRef #input-quotation-number').val(res.quotationNumber);
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
    let quotationNumber = ($(`${formId} #input-search-quotation-number`).val() == '') ? null : $(`${formId} #input-search-quotation-number`).val();
    let quotationCusName = ($(`${formId} #input-search-quotation-cusName`).val() == '') ? null : $(`${formId} #input-search-quotation-cusName`).val();
    let status = ($(`${formId} #select-search-quotation-status`).val() == '') ? null : $(`${formId} #select-search-quotation-status`).val();

    let loaded = $('#tb-quotation-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetQuotationList?quotationNumber=${quotationNumber}&quotationCusName=${quotationCusName}&status=${status}`,
        success: function (data) {
            renderGetQuotationList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
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
            dom: 'Bflrtip',
            order: [],
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
                    data: 'orderStatus',
                    className: "dt-center",
                },
                {
                    targets: 7,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_sale_class_display}`,
                    //className: cls,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-cus-quotation" data-id="${row.orderId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}

function calculateSubAndGrandTotal(vatPercentage = 0) {
    let calNote = $('#form-createCalculatePrice input[name="input-cal-note-price"]').val() == "" ? 0 : $('#form-createCalculatePrice input[name="input-cal-note-price"]').val();
    let calSubTotal = parseFloat(_subTotal) + parseFloat(calNote);
    $('#form-createCalculatePrice input[name="input-cal-subTotal"]').val(calSubTotal.toFixed(2));

    let discount = $('#form-createCalculatePrice input[name="input-cal-discount"]').val() == "" ? 0 : parseFloat($('#form-createCalculatePrice input[name="input-cal-discount"]').val());

    let calVat = 0;
    if (_vat == 0) {
        vatPercentage = ($('#form-createCalculatePrice #radioVat').prop('checked') == true) ? 0.07 : 0;
        calVat = parseFloat(calSubTotal) * vatPercentage;
        let showVat = (calVat == 0) ? "" : calVat.toFixed(2);
        $('#form-createCalculatePrice input[name="input-cal-vat"]').val(showVat);
    }
    else {
        calVat = _vat;
        $('#form-createCalculatePrice input[name="input-cal-vat"]').val(_vat);
    }

    let calGrandTotal = (parseFloat(calSubTotal) - parseFloat(discount)) + parseFloat(calVat);
    _cal_grand_total = calGrandTotal.toFixed(2);
    $('#form-createCalculatePrice input[name="input-cal-grandTotal"]').val(calGrandTotal.toFixed(2));

    $('#form-createCalculatePrice input[name="input-cal-disposite"]').val('');
}
function calculateVat(vat_value) {
    let vatPercentage = 0;
    if (vat_value == "vat") {
        vatPercentage = 0.07;
        $('#form-createCalculatePrice input[name="input-cal-vat"]').removeAttr('disabled');

    }
    else {
        $('#form-createCalculatePrice input[name="input-cal-vat"]').attr('disabled', 'disabled');
        $('#form-createCalculatePrice input[name="input-cal-vat"]').val('')
    }
    calculateSubAndGrandTotal(vatPercentage);
}
function calculateDisposite() {
    let showDisposite = 0;
    $('#form-createCalculatePrice input[name="input-cal-disposite"]').val('');
    if (_cal_grand_total <= 200000) {
        showDisposite = 5000;
    }
    else if (_cal_grand_total > 200000 && _cal_grand_total <= 600000) {
        showDisposite = 10000;
    }
    else if (_cal_grand_total > 600000 && _cal_grand_total <= 900000) {
        showDisposite = 20000;
    }
    else if (_cal_grand_total > 900000) {
        showDisposite = 30000;
    }

    $('#form-createCalculatePrice input[name="input-cal-disposite"]').val(Math.floor(showDisposite));
}

function clearUploadRefForm() {
    $('#divUploadRef #form-uploadRef #custOrderId').val("");
    $('#divUploadRef #form-uploadRef #input-quotation-number').val("");

    $('#select-upload-plan').fileinput('destroy');
    $('#select-upload-plan').fileinput({
        uploadUrl: "Home/UploadFiles", // this is your home controller method url
        //maxFileCount: 1,
        showBrowse: true,
        browseOnZoneClick: true,
        browseLabel: 'เลือกไฟล์'
    });

    $('#select-upload-reference').fileinput('destroy')
    $('#select-upload-reference').fileinput({
        uploadUrl: "Home/UploadFiles", // this is your home controller method url
        //maxFileCount: 1,
        showBrowse: true,
        browseOnZoneClick: true,
        browseLabel: 'เลือกไฟล์'
    });

    $('#select-upload-disposite').fileinput('destroy')
    $('#select-upload-disposite').fileinput({
        uploadUrl: "Home/UploadFiles", // this is your home controller method url
        //maxFileCount: 1,
        showBrowse: true,
        browseOnZoneClick: true,
        browseLabel: 'เลือกไฟล์'
    });

    $('#select-upload-idcard').fileinput('destroy')
    $('#select-upload-idcard').fileinput({
        uploadUrl: "Home/UploadFiles", // this is your home controller method url
        //maxFileCount: 1,
        showBrowse: true,
        browseOnZoneClick: true,
        browseLabel: 'เลือกไฟล์'
    });
}
function callUploadRef() {
    Swal.fire({
        title: 'คุณต้องการบันทึกข้อมูลหรือไม่?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'บันทึก',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            swal.close();
            saveUpload();
        }
    });
}
function saveUpload() {
    var rsltUpload = true;

    var orderId = $('#divUploadRef #form-uploadRef #custOrderId').val();

    var selectUploadPlan = document.getElementById("select-upload-plan");
    var uploadPlan = selectUploadPlan.files;
    if (uploadPlan.length > 0) {
        rsltUpload = callSaveUpload(orderId, "CustOrderPlan", "select-upload-plan");
    }

    var selectUploadRef = document.getElementById("select-upload-reference");
    var uploadRef = selectUploadRef.files;
    if (uploadRef.length > 0) {
        rsltUpload = callSaveUpload(orderId, "CustOrderReference", "select-upload-reference");
    }

    var selectUploadDisposite = document.getElementById("select-upload-disposite");
    var uploadDisposite = selectUploadDisposite.files;
    if (uploadDisposite.length > 0) {
        rsltUpload = callSaveUpload(orderId, "CustOrderDisposite", "select-upload-disposite");
    }

    var selectUploadIdCard = document.getElementById("select-upload-idcard");
    var uploadIdCard = selectUploadIdCard.files;
    if (uploadIdCard.length > 0) {
        rsltUpload = callSaveUpload(orderId, "CustOrderIdCard", "select-upload-idcard");
    }

    //if (rsltUpload != null) {
    //    if (rsltUpload.isResult) {
    callSuccessAlert();
    clearUploadRefForm();
    $('.btn-save-cus-upload-ref').removeLoading();
    $('.nav-pills a[href="#nav-sale-empData-tab"]').tab('show');
    //    }
    //    else {
    //        Swal.fire({
    //            text: rsltUpload.message,
    //            icon: 'error',
    //            showCancelButton: false,
    //            confirmButtonColor: _modal_primary_color_code,
    //            confirmButtonText: 'ตกลง'
    //        }).then((result) => {
    //            $('.btn-save-cus-upload-ref').removeLoading();
    //        });
    //    }
    //}
}
let callSaveUpload = function(orderId = 0, categoryName = "", intputFileName = "") {
    let url = /*(_action == "add") ? */`${app_settings.api_url}/api/Sale/AddUpload?orderId=${orderId}&categoryName=${categoryName}&loginCode=${_userCode}`/* : ``*/;

    var control = document.getElementById(`${intputFileName}`);
    var files = control.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }

    var returnResult;

    $('.btn-save-cus-upload-ref').addLoading();

    $.ajax({
        url: url,
        type: "POST",
        contentType: false, // Do not set any content header
        //processData: false, // Do not process data
        data: formData,
        async: false,
        //cache: false,
        //contentType: false,
        //contentType: 'image/png',
        processData: false,
        success: function (result) {
            returnResult = result
        },
        error: function (err) {
            console.log(err);
        }
    });

    return returnResult;
}

function clearAllInputCreateStyle() {
    _action = 'add';
    clearInputFormCustomerData();
    renderCreateStyleDiv();
    _order_id = 0;
    _cust_id = 0;

    clearCalPriceForm();
    $(`#form-createCalculatePrice input[name="radioVatType"]`).attr('disabled', false);
    $(`#form-createCalculatePrice #divEditQuotation`).addClass('note-approve-show');
}

var _items = [];
var _items_options = [];
var _order_id = 0;
var _cust_id = 0;
function renderEditQuotation(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetQuotationDetailByOrderId?orderId=${id}`,
        success: function (data) {
            _items = data.items;
            _items_options = data.itemsOptions;
            renderCustQuotation(data);
            renderCustStyleDiv(data);
            renderCustCalPrice(data);
            renderCustUploadRef(data.uploadRef);
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}

function renderCustQuotation(data) {
    let newCusForm = 'form-sale-new-customer';
    let cust = data.cust;
    let custOrder = data.custOrder;
    if (custOrder.quotationType == "draft") {
        $(`#${newCusForm} #radioQuotationDraft`).prop('checked', true);
    }
    else {
        $(`#${newCusForm} #radioQuotationComplete`).prop('checked', true);
    }

    $(`#${newCusForm} #input-cus-firstName`).val(cust.custFirstName);
    $(`#${newCusForm} #input-cus-nickname`).val(cust.custNickName);
    $(`#${newCusForm} #input-cus-lineId`).val(cust.custLineId);
    $(`#${newCusForm} #input-cus-bill-address`).val(cust.custAddress);
    $(`#${newCusForm} #input-cus-location-address`).val(cust.custLocation);
    $(`#${newCusForm} #input-cus-lastName`).val(cust.custSurName);
    $(`#${newCusForm} #input-cus-tel`).val(cust.custTel);
    $(`#${newCusForm} #input-cus-install-date`).val(convertDateTimeFormat(custOrder.installDate, 'YYYY-MM-DD'));
    $(`#${newCusForm} #input-cus-install-address`).val(cust.custInstallAddress);
    _cust_id = cust.custId;
}
function renderCustStyleDiv(data) {
    data.items.forEach((v) => {

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
                                <input class="form-control" type="text" id="input-cus-product-zone" name="input-cus-product-zone" data-seq="${newSeq}" />
                            </div>
                        </div>

                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือก Items</label>
                            <div class="col-sm-9">
                                <select class="form-select" id="select-cus-product-items" onchange="callGetProductItemOptions(this);" data-seq="${newSeq}">
                                    <option></option>
                                </select>
                            </div>
                        </div>

                        <div class="row col-sm-12">
                            <label class="col-sm-3 col-form-label text-end">ขนาด</label>
                            <div class="row col-sm-9">
                                <div class="col-sm-4">
                                    <label class="col-sm-4 col-form-label">ความยาว</label>
                                    <div class="col-sm-12">
                                        <input class="form-control" type="number" id="input-cus-product-length" name="input-cus-product-length" data-seq="${newSeq}" />
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <label class="col-sm-4 col-form-label">ความลึก</label>
                                    <div class="col-sm-12">
                                        <input class="form-control" type="number" id="input-cus-product-depth" name="input-cus-product-depth" data-seq="${newSeq}" />
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <label class="col-sm-4 col-form-label">ความสูง</label>
                                    <div class="col-sm-12">
                                        <input class="form-control" type="number" id="input-cus-product-height" name="input-cus-product-height" data-seq="${newSeq}" onblur="setCheckedSpecialHeight(${newSeq});" onkeydown="setCheckedSpecialHeight(${newSeq});" />
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
                                                    <input class="form-check-input" type="checkbox" value="" id="chkSpecialHeight-${newSeq}" disabled>
                                                    <label class="form-check-label">
                                                    ความสูงพิเศษ (มากกว่าหรือเท่ากับ 2.70 เมตรขึ้นไป จะถูกคำนวณราคาเพิ่ม)
                                                    </label>
                                            </div>
                                        </div>
                                </div>
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
                                <select class="form-select" id="select-cus-product-type" onchange="callGetProductItemSelect2ByType(this);" data-seq="${newSeq}">
                                    <option></option>
                                </select>
                            </div>
                        </div>

                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือก Options</label>
                            <div class="col-sm-9" id="chkselectOptions-${newSeq}" data-seq="${newSeq}" style="overflow-y:auto;">
    
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
        //callGetProductItemSelect2(formName);
        renderProductItemSelect2(formName);
    });
}
function renderCustStyle() {
    let seq = 1;
    _items.forEach((v) => {
        $(`#formCreateStyle-${seq} #select-cus-product-style`).val(v.styleId).trigger('change');
        $(`#formCreateStyle-${seq} input[name="input-cus-product-zone"]`).val(v.zone);
        $(`#formCreateStyle-${seq} #select-cus-product-items`).val(v.itemId).trigger('change');
        $(`#formCreateStyle-${seq} input[name="input-cus-product-floor"]`).val(v.floor);
        $(`#formCreateStyle-${seq} #select-cus-product-type`).val(v.typeId).trigger('change');
        let orderLength = (v.orderLength == 0) ? "" : v.orderLength;
        $(`#formCreateStyle-${seq} #input-cus-product-length`).val(orderLength);
        let orderDepth = (v.orderDepth == 0) ? "" : v.orderDepth;
        $(`#formCreateStyle-${seq} #input-cus-product-depth`).val(orderDepth);
        let orderHeight = (v.orderHeight == 0) ? "" : v.orderHeight;
        $(`#formCreateStyle-${seq} #input-cus-product-height`).val(orderHeight);
        if (v.orderHeight >= 2.70) {
            $(`#formCreateStyle-${seq} #chkSpecialHeight-${seq}`).prop('checked', true);
        } else {
            $(`#formCreateStyle-${seq} #chkSpecialHeight-${seq}`).prop('checked', false);

        }

        seq++;
    });

}
function renderCustOptions() {
    let seq = 1;
    _items.forEach((v) => {
        var options = _items_options.filter((a) => { return a.custOrderDetailId == v.custOrderDetailId });
        options.forEach((o) => {
            $(`#formCreateStyle-${seq} #chkselectOptions-${seq} #${seq}-${o.optionsId}`).prop('checked', true);
        });
       
        seq++;
    });
}
var _vat = 0;
function renderCustCalPrice(data) {
    let formId = '#form-createCalculatePrice';
    let custOrder = data.custOrder;
    $(`${formId} input[name="input-cal-note"]`).val(custOrder.orderNote);
    let orderNotePrice = (custOrder.orderNotePrice == 0) ? "" : custOrder.orderNotePrice.toFixed(2);
    $(`${formId} input[name="input-cal-note-price"]`).val(orderNotePrice);

    let orderDisCount = (custOrder.discount == 0) ? "" : custOrder.discount.toFixed(2);
    $(`${formId} input[name="input-cal-discount"]`).val(orderDisCount);

    if (custOrder.vat != 0) {
        $(`${formId} #radioVat`).prop('checked', true);
    } else {
        $(`${formId} #radioNonVat`).prop('checked', true);
    }
    $(`${formId} input[name="radioVatType"]`).attr('disabled', true);
    var vat = (custOrder.vat == 0) ? "" : custOrder.vat.toFixed(2);
    $(`${formId} input[name="input-cal-vat"]`).val(vat);
    _vat = vat;

    if (custOrder.accountType == "บัญชีส่วนบุคคล") {
        $(`${formId} #radioBankPersonal`).prop('checked', true);
    }
    else {
        $(`${formId} #radioBankCompany`).prop('checked', true);
    }

    $(`${formId} #divEditQuotation`).removeClass('note-approve-show');
    $(`${formId} #input-cal-approve`).val(custOrder.quotationComment);
}
function renderCustUploadRef(data) {

    var planImg = data.filter(v => { return v.categoryName == "CustOrderPlan" });

    var lstPlanUrl = [];
    var lstPreviewImg = [];
    planImg.forEach((a) => {
        lstPlanUrl.push(`${a.url}`);

        var addPreview = {
            caption: a.fileName,
            width: '120px',
            //url: '/localhost/public/delete',
            key: a.uploadId,
            extra: { id: a.uploadId }
        };

        lstPreviewImg.push(addPreview);
    });

    $('#select-upload-plan').fileinput('destroy');
    if (planImg.length > 0) {
        $('#select-upload-plan').fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: true,
            showUpload: true,
            showCaption: true,
            initialPreview: lstPlanUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewImg
            ],
            overwriteInitial: false,
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }
    else {
        $('#select-upload-plan').fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: true,
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
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

    $('#select-upload-reference').fileinput('destroy');
    if (refImg.length > 0) {
        $('#select-upload-reference').fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: true,
            showUpload: true,
            showCaption: true,
            initialPreview: lstRefUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewRefImg
            ],
            overwriteInitial: false,
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }
    else {
        $('#select-upload-reference').fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: true,
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }

    var disImg = data.filter(v => { return v.categoryName == "CustOrderDisposite" });

    var lstDisUrl = [];
    var lstPreviewDisImg = [];
    disImg.forEach((a) => {
        lstDisUrl.push(`${a.url}`);

        var addPreview = {
            caption: a.fileName,
            width: '120px',
            //url: '/localhost/public/delete',
            key: a.uploadId,
            extra: { id: a.uploadId }
        };

        lstPreviewDisImg.push(addPreview);
    });

    $('#select-upload-disposite').fileinput('destroy');
    if (disImg.length > 0) {
        $('#select-upload-disposite').fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: true,
            showUpload: true,
            showCaption: true,
            initialPreview: lstDisUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewDisImg
            ],
            overwriteInitial: false,
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }
    else {
        $('#select-upload-disposite').fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: true,
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }

    var idImg = data.filter(v => { return v.categoryName == "CustOrderIdCard" });

    var lstIdUrl = [];
    var lstPreviewIdImg = [];
    idImg.forEach((a) => {
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

    $('#select-upload-idcard').fileinput('destroy');
    if (idImg.length > 0) {
        $('#select-upload-idcard').fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: true,
            showUpload: true,
            showCaption: true,
            initialPreview: lstIdUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewIdImg
            ],
            overwriteInitial: false,
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }
    else {
        $('#select-upload-idcard').fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: true,
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }
}
function clearCalPriceForm() {
    let formId = '#form-createCalculatePrice';
    $(`${formId} #input-cal-note`).val('');
    $(`${formId} #input-cal-note-price`).val('');
    $(`${formId} #input-cal-subTotal`).val('');
    $(`${formId} #input-cal-discount`).val('');
    $(`${formId} #radioNonVat`).prop('checked', true);
    $(`${formId} #input-cal-vat`).val('');
    $(`${formId} #input-cal-grandTotal`).val('');
    $(`${formId} #input-cal-disposite`).val('');
    $(`${formId} #radioBankPersonal`).prop('checked', true);
    $(`${formId} #input-cal-approve`).val('');
    _vat = 0;
}
function setCheckedSpecialHeight(seq) {
    if (parseFloat($(`#formCreateStyle-${seq} #input-cus-product-height`).val()) >= 2.7) {
        $(`#chkSpecialHeight-${seq}`).prop('checked', true);
    }
    else { $(`#chkSpecialHeight-${seq}`).prop('checked', false); }
}
function clearSearchContractForm() {
    let formId = '#form-search-cus-contract-document';

    $(`${formId} #input-search-doc-number`).val('');
    $(`${formId} #input-search-doc-quotation-number`).val('');
    $(`${formId} #input-search-doc-cusName`).val('');
    $(`${formId} #select-search-doc-contract-status`).val('').trigger('change');
    $(`${formId} #input-search-doc-date`).val('');
}
function callGetContractList() {
    let formId = '#form-search-cus-contract-document';

    let contractNumber = ($(`${formId} #input-search-doc-number`).val() == '') ? null : $(`${formId} #input-search-doc-number`).val();
    let quotationNumber = ($(`${formId} #input-search-doc-quotation-number`).val() == '') ? null : $(`${formId} #input-search-doc-quotation-number`).val();
    let cusName = ($(`${formId} #input-search-doc-cusName`).val() == '') ? null : $(`${formId} #input-search-doc-cusName`).val();
    let contractStatus = ($(`${formId} #select-search-doc-contract-status`).val() == '') ? null : $(`${formId} #select-search-doc-contract-status`).val();
    let contractDate = ($(`${formId} #input-search-doc-date`).val() == '') ? null : $(`${formId} #input-search-doc-date`).val();

    let loaded = $('#tb-cus-doc-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetContractList?contractNumber=${contractNumber}&quotationNumber=${quotationNumber}&cusName=${cusName}&contractStatus=${contractStatus}&contractDate=${contractDate}`,
        success: function (data) {
            renderGetContractList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function renderGetContractList(data) {
    $('#tb-cus-doc-list').DataTable(
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
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'contractNumber',
                    className: "contractNumber-details",
                },
                {
                    targets: 1,
                    data: 'quotationNumber',
                },
                {
                    targets: 2,
                    data: 'fullName',
                },
                {
                    targets: 3,
                    data: 'contractStatus',
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
                    data: null,
                    orderable: false,
                    className: "dt-center",
                    render: function (data, type, row) {
                        //return `<button type="button" class="btn-add-custom btn-view-cus-contract" data-id="${row.id}"  title="ดูเอกสาร">
                        //<img src="/images/analysis.png" width="25px" /></button>`;
                        return `<a class="btn btn-view-cus-contract" data-id="${row.id}"><img src="../images/analysis.png" width="25px" /></a>`;
                    },
                },
            ],
        }
    );
}
function callGetContractStatusSelect2() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetContractStatusSelect2`,
        success: function (data) {
            renderContractStatusSelect2(data);
        },
        error: function (err) {
        }
    });
}
function renderContractStatusSelect2(data) {
    $(`#form-search-cus-contract-document #select-search-doc-contract-status`).empty();
    $(`#form-search-cus-contract-document #select-search-doc-contract-status`).append(`<option value="">ทั้งหมด</option>`);
    data.forEach((v) => {
        $(`#form-search-cus-contract-document #select-search-doc-contract-status`).append(`<option value="${v.contractStatus}">${v.contractStatus}</option>`);
    });
    $(`#form-search-cus-contract-document #select-search-doc-contract-status`).val('').trigger('change');
}


function printQuotation() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Document/GetQuotaionByOrderId?orderId=${_order_id}`,
        success: function (data) {
            if (data.custOrder != null) {
                generateQuotationDocument(data);
            }
        },
        error: function (err) {
        }
    });
}

async function generateQuotationDocument(data) {
    debugger;
    if (data.custOrder.vat == 0) {
        await renderQuotationNonVatHtml(data);
    }
    else {
        await renderQuotationHtml(data);
    }
}
async function renderQuotationHtml(data) {
    var currDate = new Date();
    var createInvoiceDate = convertDateTimeFormat(currDate, 'DD/MM/YYYY');

    var custFullName = data.cust.custFirstName + ' ' + data.cust.custSurName;

    $('#quotationElement #spnQuotationNumber').html(data.custOrder.quotationNumber);
    $('#quotationElement #spnCreateQuotationDocDate').html(createInvoiceDate);

    $('#quotationElement #lblCusName').html(custFullName);
    $('#quotationElement #lblCusAddress').html(data.cust.custAddress);
    $('#quotationElement #lblCusTel').html(data.cust.custTel);

    var accname = `ชื่อบัญชี ${data.custOrder.accountName} ${data.custOrder.accountNumber}`
    var accbank = `${data.custOrder.bank}`;
    $('#quotationElement #spnAccName').html(accname);
    $('#quotationElement #spnAccBank').html(accbank);

    var item = ''
    var indx = 0;
    data.items.forEach((a) => {
        item += `<tr>
                    <td></td>
                    <td>${a.itemName}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;
        var style = `Style : ${a.styleName}`
        item += `<tr>
                    <td></td>
                    <td>${style}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;
        indx = 1;
       
        data.itemsOptions.forEach((b) => {
            var unitPrice = parseFloat(a.itemPrice) + parseFloat(b.optionsPrice);
            var unitPriceFormat = new Intl.NumberFormat().format(unitPrice);

            var size = `ยาว ${a.orderLength} x ${a.orderHeight} x ${a.orderDepth} m.`
            item += `<tr>
                    <td>${indx}</td>
                    <td>${b.options}</td>
                    <td>${size}</td>
                    <td>${unitPriceFormat}</td>
                    <td>${1}</td>
                    <td>${unitPriceFormat}</td>
                </tr>`;
            indx++;
        });
    });

    var subTotalFormat = new Intl.NumberFormat().format(data.custOrder.subTotal);
    item += `<tr>                       
                        <td rowspan="4" colspan="4" class="text-center" style="vertical-align : middle;font-size:18px;font-weight:bold;">${data.custOrder.grandTotalThaiBath}</td>

                        <td>Sub.Total</td>
                        <td>${subTotalFormat}</td>
                    </tr>`;

    var vatFormat = (data.custOrder.vat == 0) ? "" : new Intl.NumberFormat().format(data.custOrder.vat);
    item += `<tr>                       

                        <td>Vat 7%</td>
                        <td>${vatFormat}</td>
                    </tr>`;

    var discountFormat = new Intl.NumberFormat().format(data.custOrder.discount);
    item += `<tr>                       

                        <td>ส่วนลด</td>
                        <td>${discountFormat}</td>
                    </tr>`;

    var grandTotalFormat = new Intl.NumberFormat().format(data.custOrder.grandTotal);
    item += `<tr>
                        

                        <td>Grand Total%</td>
                        <td>${grandTotalFormat}</td>
                    </tr>`;

    $('#quotation-item-list').empty();
    $('#quotation-item-list').append(item);

    let options = {
        margin: 0.25,
        // pagebreak: { mode: "avoid-all", before: "#page2el" },
        image: { type: "png", quality: 1 },
        html2canvas: { scale: 1, logging: true, dpi: 300, letterRendering: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        filename: `Quotation_${data.custOrder.quotationNumber}`,
    };

    var element = document.getElementById("quotationElement");
    html2pdf()
        .set(options)
        .from(element)
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
            window.open(pdf.output('bloburl'), '_blank');
        });
}
async function renderQuotationNonVatHtml(data) {
    var currDate = new Date();
    var createInvoiceDate = convertDateTimeFormat(currDate, 'DD/MM/YYYY');

    var custFullName = data.cust.custFirstName + ' ' + data.cust.custSurName;

    $('#quotationNonVatElement #spnQuotationNumber').html(data.custOrder.quotationNumber);
    $('#quotationNonVatElement #spnCreateQuotationDocDate').html(createInvoiceDate);

    $('#quotationNonVatElement #lblCusName').html(custFullName);
    $('#quotationNonVatElement #lblCusAddress').html(data.cust.custAddress);
    $('#quotationNonVatElement #lblCusTel').html(data.cust.custTel);

    var accname = `ชื่อบัญชี ${data.custOrder.accountName} ${data.custOrder.accountNumber}`
    var accbank = `${data.custOrder.bank}`;
    $('#quotationNonVatElement #spnAccName').html(accname);
    $('#quotationNonVatElement #spnAccBank').html(accbank);

    var item = ''
    var indx = 0;
    data.items.forEach((a) => {
        item += `<tr>
                    <td></td>
                    <td>${a.itemName}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;
        var style = `Style : ${a.styleName}`
        item += `<tr>
                    <td></td>
                    <td>${style}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;
        indx = 1;

        data.itemsOptions.forEach((b) => {
            var unitPrice = parseFloat(a.itemPrice) + parseFloat(b.optionsPrice);
            var unitPriceFormat = new Intl.NumberFormat().format(unitPrice);

            var size = `ยาว ${a.orderLength} x ${a.orderHeight} x ${a.orderDepth} m.`
            item += `<tr>
                    <td>${indx}</td>
                    <td>${b.options}</td>
                    <td>${size}</td>
                    <td>${unitPriceFormat}</td>
                    <td>${1}</td>
                    <td>${unitPriceFormat}</td>
                </tr>`;
            indx++;
        });
    });

    //if (data.custOrder.orderNotePrice != 0) {
    //    var orderNotePriceFormat = new Intl.NumberFormat().format(data.custOrder.orderNotePrice);
    //    item += `<tr>                       
    //                    <td colspan="4">โน๊ตเพิ่มเติม : ${data.custOrder.orderNote}</td>

    //                    <td></td>
    //                    <td>${orderNotePriceFormat}</td>
    //                </tr>`;
    //}

    var subTotalFormat = new Intl.NumberFormat().format(data.custOrder.subTotal);
    item += `<tr>                       
                        <td rowspan="4" colspan="4" class="text-center" style="vertical-align : middle;font-size:18px;font-weight:bold;">${data.custOrder.grandTotalThaiBath}</td>

                        <td>Sub.Total</td>
                        <td>${subTotalFormat}</td>
                    </tr>`;

    var vatFormat = (data.custOrder.vat == 0) ? "" : new Intl.NumberFormat().format(data.custOrder.vat);
    item += `<tr>                       

                        <td>Vat 7%</td>
                        <td>${vatFormat}</td>
                    </tr>`;

    var discountFormat = new Intl.NumberFormat().format(data.custOrder.discount);
    item += `<tr>                       

                        <td>ส่วนลด</td>
                        <td>${discountFormat}</td>
                    </tr>`;

    var grandTotalFormat = new Intl.NumberFormat().format(data.custOrder.grandTotal);
    item += `<tr>
                        

                        <td>Grand Total%</td>
                        <td>${grandTotalFormat}</td>
                    </tr>`;

    $('#quotationNonVatElement #quotation-item-list').empty();
    $('#quotationNonVatElement #quotation-item-list').append(item);

    let showDisposite = 0;
    if (data.custOrder.grandTotal <= 200000) {
        showDisposite = 5000;
    }
    else if (data.custOrder.grandTotal > 200000 && data.custOrder.grandTotal <= 600000) {
        showDisposite = 10000;
    }
    else if (data.custOrder.grandTotal > 600000 && data.custOrder.grandTotal <= 900000) {
        showDisposite = 20000;
    }
    else if (data.custOrder.grandTotal > 900000) {
        showDisposite = 30000;
    }

    var showDispositeFormat = new Intl.NumberFormat().format(showDisposite);
    $('#quotationNonVatElement #spnFirstPeriod').append("");
    $('#quotationNonVatElement #spnFirstPeriod').append(showDispositeFormat);

    var second = (data.custOrder.grandTotal - parseFloat(showDisposite)) * 0.5;
    var secondFormat = new Intl.NumberFormat().format(second);
    $('#quotationNonVatElement #spnSecondPeriod').append("");
    $('#quotationNonVatElement #spnSecondPeriod').append(secondFormat);

    var third = (data.custOrder.grandTotal - parseFloat(showDisposite) - parseFloat(second)) * 0.4;
    var thirdFormat = new Intl.NumberFormat().format(third);
    $('#quotationNonVatElement #spnThirdPeriod').append("");
    $('#quotationNonVatElement #spnThirdPeriod').append(thirdFormat);

    var four = (data.custOrder.grandTotal - parseFloat(showDisposite) - parseFloat(second) - parseFloat(third));
    var fourFormat = new Intl.NumberFormat().format(four);
    $('#quotationNonVatElement #spnFourPeriod').append("");
    $('#quotationNonVatElement #spnFourPeriod').append(fourFormat);

    let options = {
        margin: 0.25,
        // pagebreak: { mode: "avoid-all", before: "#page2el" },
        image: { type: "png", quality: 1 },
        html2canvas: { scale: 1, logging: true, dpi: 300, letterRendering: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        filename: `Quotation_${data.custOrder.quotationNumber}`,
    };

    var element = document.getElementById("quotationNonVatElement");
    html2pdf()
        .set(options)
        .from(element)
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
            window.open(pdf.output('bloburl'), '_blank');
        });
}

function clearSearchCommission() {
    let formId = '#form-search-commission';

    $(`${formId} #input-search-commission-date`).val('');
    $(`${formId} #select-search-commission-status`).val('').trigger('change');
}
function callGetCommissionList() {
    let formId = '#form-search-commission';

    let commissionDate = ($(`${formId} #input-search-commission-date`).val() == '') ? null : $(`${formId} #input-search-commission-date`).val();
    let commissionStatus = ($(`${formId} #select-search-commission-status`).val() == '') ? null : $(`${formId} #select-search-commission-status`).val();

    let loaded = $('#tb-commission-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetCommissionList?commissionDate=${commissionDate}&commissionStatus=${commissionStatus}&loginCode=${_userCode}`,
        success: function (data) {
            renderGetCommissionList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function renderGetCommissionList(data) {
    $('#tb-commission-list').DataTable(
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
                $(row).attr('data-id', data.commissionId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'cvtCommissionDate',
                    //className: "contractNumber-details",
                },
                {
                    targets: 1,
                    data: 'monthlySales',
                },
                {
                    targets: 2,
                    data: 'commission',
                },
                {
                    targets: 3,
                    data: 'bonus',
                },
                {
                    targets: 4,
                    data: 'commissionStatus',
                },
                {
                    targets: 5,
                    data: 'saleEmpName'
                },
                {
                    targets: 6,
                    data: null,
                    orderable: false,
                    className: "dt-center",
                    render: function (data, type, row) {
                        return `<button type="button" class="btn-add-custom btn-view-commission" data-id="${row.commissionId}"  title="ดูข้อมูล">
                        <img src="/images/analysis.png" width="25px" /></button>`;
                    },
                },
            ],
        }
    );
}
function callSelect2CommissionStatus() {
    $(`#form-search-commission #select-search-commission-status`).empty();
    $(`#form-search-commission #select-search-commission-status`).append(`<option value="">ทั้งหมด</option>`);
    $(`#form-search-commission #select-search-commission-status`).append(`<option value="จ่ายแล้ว">จ่ายแล้ว</option>`);
    $(`#form-search-commission #select-search-commission-status`).append(`<option value="รอจ่าย">รอจ่าย</option>`);
}

function callGetCommissionDetail(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetCommissionDetail?commissionId=${id}`,
        success: function (data) {
            renderGetCommissionList(data);
            //loaded.find(loader).remove();
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}
function renderCommissionDetail(data) {
    let formId = "#form-viewCommission";

    $(`${formId} #input-commission-dateYear`).val(data[0].cvtCommissionDate);
    $(`${formId} #input-commission`).val(data[0].commission);
    $(`${formId} #input-commission-salesMonth`).val(data[0].monthlySales);
    $(`${formId} #input-commission-bonus`).val(data[0].bonus);

    $('#tb-commission-detail-list').DataTable(
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
                $(row).attr('data-id', data.commissionId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'quotationNumber',
                },
                {
                    targets: 1,
                    data: 'unitPrice',
                    className: "text-right"
                },
                {
                    targets: 2,
                    data: 'commissionBillStatus',
                },
            ],
        }
    );
}

function printContract(contractId) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Document/GetContractByContractId?contractId=${contractId}`,
        success: function (data) {
            if (data.contract != null) {
                generateContractDocument(data);
            }
        },
        error: function (err) {
        }
    });
}
async function generateContractDocument(data) {
    await renderContractHtml(data);
}
async function renderContractHtml(data) {
    let options = {
        margin: 0.25,
        // pagebreak: { mode: "avoid-all", before: "#page2el" },
        image: { type: "png", quality: 0.98 },
        html2canvas: { scale: 1, logging: true, dpi: 192, letterRendering: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        filename: `Contract_${data.contract.contractNumber}`,
    };

    var element = document.getElementById("contractElement");
    html2pdf()
        .set(options)
        .from(element)
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
            window.open(pdf.output('bloburl'), '_blank');
        });
}
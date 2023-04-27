let _modal_primary_color_code = "#F09723";
let _modal_default_color_code = "#EFEFEF";

var _localStorage = new GlobalObject.localStorage();

let _customer_data_action = 'add';

function clearInputForm() {
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
}
function DoAddOrUpdateCustomerData() {
    if (!validateInputFormCustomerData()) return;

    Swal.fire({
        title: 'คุณต้องการบันทึกข้อมูลหรือไม่?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'บันทึก',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            callAddOrUpdateHoliday(_department_action);
        }
    });
}
function callAddOrUpdateCustomerData() {
    let url = (_customer_data_action == 'add') ? `${app_settings.api_url}/api/Employee/AddHoliday` : `${app_settings.api_url}/api/Employee/UpdateHoliday`;

    var obj = {
        holidayId: $('#form-createHoliday #input-holiday-code').val(),
        day: $('#form-createHoliday #select-holiday-day').val(),
        holidayDate: $('#form-createHoliday #input-holiday-date').val(),
        holiday: $('#form-createHoliday #input-holiday-name').val(),
        status: ($('#form-createHoliday #select-holiday-status').val() == "1") ? true : false
    };

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $(`#${_modal_holiday_name}`).modal('hide');
                callSelect2SearchHolidayYear();
                callGetHolidayList();
            }
        },
        error: () => {
        }
    });

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
        $(`#${formName} #select-cus-product-items`).append(`<option value="${v.itemId}">${v.fullItemPrice}</option>`);
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
                            <label class="col-sm-3 col-form-label text-end">เลือกสไตล์</label>
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
                            <label class="col-sm-3 col-form-label text-end">เลือก Items</label>
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
                            <label class="col-sm-3 col-form-label text-end">เลือกหมวดหมู่</label>
                            <div class="col-sm-9">
                                <select class="form-select" id="select-cus-product-type" data-seq="${newSeq}">
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
            </form>


            <div class="row">
                <div class="row col-sm-12 mb-2">
                    <label class="col-sm-3 col-form-label text-end">ขนาด</label>
                    <div class="row col-sm-9">
                        <div class="col-sm-4">
                            <label class="col-sm-3 col-form-label">ความยาว</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="text" id="input-cus-product-floor" name="input-cus-product-length" data-seq="${newSeq}" />
                                </div>
                        </div>
                        <div class="col-sm-4">
                                <label class="col-sm-3 col-form-label">ความลึก</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="text" id="input-cus-product-floor" name="input-cus-product-depth" data-seq="${newSeq}" />
                                </div>
                        </div>
                        <div class="col-sm-4">
                          <label class="col-sm-3 col-form-label">ความสูง</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="text" id="input-cus-product-floor" name="input-cus-product-height" data-seq="${newSeq}" />
                                </div>
                        </div>
                    </div>
                </div>
                <div class="row col-sm-12 mb-2">
                <div class="row col-sm-3"></div>
                <div class="row col-sm-9">
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
                            <input class="form-check-input" type="checkbox" value="" id="${seq}-${v.optionsId}">
                            <label class="form-check-label">
                            ${v.options}
                            </label>
                        </div>`;
    });

    $(`#${formName} #chkselectOptions-${seq}`).append(renderChk);
}
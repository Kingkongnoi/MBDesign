$(function () {
    
    let format = {
        btnLoading: `<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> loading..`,
        icon: `<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>`
    }

    $.fn.addLoading = function (isShowText = true) {
        let targetBtn = $(this);
        //let txt = isShowText ? format.btnLoading : format.btnLoading.replace(' loading..', '');
        let txt = isShowText === true ? format.btnLoading : format.btnLoading.replace(' loading..', ` ${isShowText} `);
        targetBtn.each(function () {
            let target = $(this);
            let backup = target.html();
            target.attr('backup-txt', backup);
            target.prop('disabled', true);
            target.html(txt);
        });
    };
    $.fn.removeLoading = function () {
        let targetBtn = $(this);
        targetBtn.each(function () {
            let target = $(this);
            let backup = target.attr('backup-txt');
            target.prop('disabled', false);
            target.html(backup);
            target.removeAttr('backup-txt');
        });
    };

    $.fn.addSpinLoading = function (positionRelative = false) {
        let target = $(this);
        if (positionRelative) target.addClass("position-relative");

        let spinLoad = $('<div/>').addClass('loader');
        target.addClass('disable-event');
        target.prepend(spinLoad);
    };

    $.fn.removeSpinLoading = function () {
        let target = $(this);
        if (target.hasClass("position-relative")) target.removeClass("position-relative");
        let spinLoad = $('<div/>').addClass('loader');
        target.removeClass('disable-event');
        target.find('div.loader').remove();
    };

});

const configUTC = true;
function convertDateTimeFormat(date, format) {
    let dateFormat = "";
    if (date !== null && date !== "") {
        // check format date
        try {
            let timeZone = new Date().getTimezoneOffset() / 60 * -1;
            let formatDate = moment(date);
            if (configUTC) formatDate = formatDate.add(timeZone, 'hours');
            dateFormat = formatDate.format(format);
        }
        catch (ex) {
            console.error('date wrong format', ex);
        }
    }
    return dateFormat;
}

function callCountCustOrderWaitForApprove() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Approve/GetCountCustOrderWaitForApprove`,
        success: function (data) {
            console.log(data);
            if (data > 0) {
                $('#spnApproveNumber').removeClass('bagde-visible');
            }
            else {
                $('#spnApproveNumber').addClass('bagde-visible');
            }
            $('#spnApproveNumber').html(data);
        },
        error: function (err) {
        }
    });
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

function callRoleNavMenu() {
    $('#nav-sale').addClass('nav-no-display');
    $('#nav-3d').addClass('nav-no-display');
    $('#nav-foreman').addClass('nav-no-display');
    $('#nav-accounting').addClass('nav-no-display');
    $('#nav-master').addClass('nav-no-display');
    $('#nav-approve').addClass('nav-no-display');
    $('#nav-stores').addClass('nav-no-display');
    $('#nav-spec').addClass('nav-no-display');
    $('#nav-hr').addClass('nav-no-display');

    let loginId = localStorage.getItem('loginId');
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Login/GetMenuPermissionPerEmpData?id=${loginId}`,
        success: function (data) {
            data.forEach((v) => {
                setShowAndHiddenNavMenu(v.menuName, v.parentMenuName, v);
            })
        },
        error: function (err) {
        }
    });
}

function setShowAndHiddenNavMenu(menuName, parentMenuName, obj) {
    if (menuName == "ภาพรวมข้อมูล" || parentMenuName == "ภาพรวมข้อมูล") {

    }
    else if (menuName == "การขาย" || parentMenuName == "การขาย") {
        if (obj.canView) {
            $('#nav-sale').removeClass('nav-no-display');
            $('.nav-pills a[href="#nav-sale-quotation-tab"]').tab('show');
        }

        $('#nav-cus').addClass('no-display');
        $('#nav-style').addClass('no-display');
        $('#nav-calculate').addClass('no-display');
        $('#nav-upload').addClass('no-display');

        if (obj.canAdd) {
            $('#nav-cus').removeClass('no-display');
            $('#nav-style').removeClass('no-display');
            $('#nav-calculate').removeClass('no-display');
            $('#nav-upload').removeClass('no-display');
        }

        _role_sale_class_display = "no-display"
        if (obj.canEdit) {
            _role_sale_class_display = ""
        }
    }
    else if (menuName == "การออกแบบ 3D" || parentMenuName == "การออกแบบ 3D") {
        if (obj.canView) {
            $('#nav-3d').removeClass('nav-no-display');
        }

        _role_3d_class_display = "no-display"
        if (obj.canEdit) {
            _role_3d_class_display = ""
        }
    }
    else if (menuName == "โฟร์แมน" || parentMenuName == "โฟร์แมน") {
        if (obj.canView) {
            $('#nav-foreman').removeClass('nav-no-display');
        }

        _role_foreman_class_display = "no-display"
        if (obj.canEdit) {
            _role_foreman_class_display = ""
        }
    }
    else if (menuName == "บัญชีและเอกสาร" || parentMenuName == "บัญชีและเอกสาร") {
        if (obj.canView) {
            $('#nav-accounting').removeClass('nav-no-display');
        }

        $('#nav-cert').addClass('no-display');
        $('.btn-add-invoice').addClass('no-display');
        if (obj.canAdd) {
            $('#nav-cert').removeClass('no-display');
            $('.btn-add-invoice').removeClass('no-display');
        }

        _role_account_class_display = "no-display"
        if (obj.canEdit) {
            _role_account_class_display = ""
        }
    }
    else if (menuName == "ข้อมูลหลัก" || parentMenuName == "ข้อมูลหลัก") {
        if (obj.canView) {
            $('#nav-master').removeClass('nav-no-display');
        }
        
        if (obj.menuName == "ทั้งหมด") {
            //$('#nav-emp').addClass('no-display');
            $('#nav-product').addClass('no-display');
            //$('#nav-calculate').addClass('no-display');
            //$('#nav-inventory').addClass('no-display');
            $('#nav-accounting').addClass('no-display');
            $('#nav-transpotation').addClass('no-display');

            if (obj.canView) {
                _master_all_role = "all";

                if (_master_active == "") {
                    _master_active = "active";
                    $('.nav-pills a[href="#nav-mas-empData-tab"]').tab('show');
                }

                //$('#nav-emp').removeClass('no-display');
                $('#nav-product').removeClass('no-display');
                //$('#nav-calculate').removeClass('no-display');
                //$('#nav-inventory').removeClass('no-display');
                $('#nav-accounting').removeClass('no-display');
                $('#nav-transpotation').removeClass('no-display');
            }

            //$('.btn-add-employee').addClass('no-display');
            //$('.btn-add-role').addClass('no-display');
            //$('.btn-add-holiday').addClass('no-display');
            //$('.btn-add-department').addClass('no-display');
            //$('.btn-add-position').addClass('no-display');

            $('.btn-add-product').addClass('no-display');
            $('.btn-add-type').addClass('no-display');
            $('.btn-add-style').addClass('no-display');

            $('.btn-add-account').addClass('no-display');
            if (obj.canAdd) {
                _master_all_role = "all";
                //$('.btn-add-employee').removeClass('no-display');
                //$('.btn-add-role').removeClass('no-display');
                //$('.btn-add-holiday').removeClass('no-display');
                //$('.btn-add-department').removeClass('no-display');
                //$('.btn-add-position').removeClass('no-display');

                $('.btn-add-product').removeClass('no-display');
                $('.btn-add-type').removeClass('no-display');
                $('.btn-add-style').removeClass('no-display');

                $('.btn-add-account').removeClass('no-display');
            }

            //_role_emp_class_display = "no-display"
            if (obj.canEdit) {
                _master_all_role = "all"
                //_role_emp_class_display = ""
            }

        }
        else {
            if (_master_all_role == "") {
                switch (obj.menuName) {
                    //case "ข้อมูลพนักงาน":
                    //    $('#nav-emp').addClass('no-display');
                    //    if (obj.canView) {
                    //        $('#nav-emp').removeClass('no-display');

                    //        if (_master_active == "") {
                    //            _master_active = "active";
                    //            $('.nav-pills a[href="#nav-mas-empData-tab"]').tab('show');
                    //        }
                    //    }

                    //    $('.btn-add-employee').addClass('no-display');
                    //    $('.btn-add-role').addClass('no-display');
                    //    $('.btn-add-holiday').addClass('no-display');
                    //    $('.btn-add-department').addClass('no-display');
                    //    $('.btn-add-position').addClass('no-display');
                    //    if (obj.canAdd) {
                    //        $('.btn-add-employee').removeClass('no-display');
                    //        $('.btn-add-role').removeClass('no-display');
                    //        $('.btn-add-holiday').removeClass('no-display');
                    //        $('.btn-add-department').removeClass('no-display');
                    //        $('.btn-add-position').removeClass('no-display');
                    //    }

                    //    _role_emp_class_display = "no-display"
                    //    if (obj.canEdit) {
                    //        _role_emp_class_display = ""
                    //    }
                    //    break;
                    case "ตั้งค่าสินค้าและราคา":
                        $('#nav-product').addClass('no-display');
                        if (obj.canView) {
                            $('#nav-master').removeClass('nav-no-display');

                            $('#nav-product').removeClass('no-display');

                            if (_master_active == "") {
                                _master_active = "active";
                                $('.nav-pills a[href="#nav-mas-product-tab"]').tab('show');
                            }
                        }

                        $('.btn-add-product').addClass('no-display');
                        $('.btn-add-type').addClass('no-display');
                        $('.btn-add-style').addClass('no-display');
                        if (obj.canAdd) {
                            $('.btn-add-product').removeClass('no-display');
                            $('.btn-add-type').removeClass('no-display');
                            $('.btn-add-style').removeClass('no-display');
                        }

                        _role_product_class_display = "no-display"
                        if (obj.canEdit) {
                            _role_product_class_display = ""
                        }
                        break;
                    //case "ตั้งค่าสูตรคำนวณ":
                    //    $('#nav-calculate').addClass('no-display');
                    //    if (obj.canView) {
                    //        $('#nav-calculate').removeClass('no-display');
                    //    }
                    //    break;
                    //case "ข้อมูลคลังสินค้า":
                    //    $('#nav-inventory').addClass('no-display');
                    //    if (obj.canView) {
                    //        $('#nav-inventory').removeClass('no-display');
                    //    }
                    //    break;
                    case "ข้อมูลบัญชีรับเงิน":
                        $('#nav-accounting').addClass('no-display');
                        if (obj.canView) {
                            $('#nav-accounting').removeClass('no-display');

                            if (_master_active == "") {
                                _master_active = "active";
                                $('.nav-pills a[href="#nav-mas-account-tab"]').tab('show');
                            }
                        }

                        $('.btn-add-account').addClass('no-display');
                        if (obj.canAdd) {
                            $('.btn-add-account').removeClass('no-display');
                        }

                        _role_bank_class_display = "no-display"
                        if (obj.canEdit) {
                            _role_bank_class_display = ""
                        }
                        break;
                    case "ข้อมูลรถขนส่ง":
                        $('#nav-transpotation').addClass('no-display');
                        if (obj.canView) {
                            $('#nav-transpotation').removeClass('no-display');
                        }
                        break;
                }
            }
        }

    }
    else if (menuName == "สโตร์" || parentMenuName == "สโตร์") {
        if (obj.canView) {
            $('#nav-stores').removeClass('nav-no-display');
        }

        $('.btn-add-viewstock').addClass('no-display');
        $('.btn-add-getin').addClass('no-display');
        $('.btn-add-getout').addClass('no-display');
        $('.btn-add-group').addClass('no-display');
        $('.btn-add-subgroup').addClass('no-display');
        $('.btn-add-brand').addClass('no-display');
        $('.btn-add-unit').addClass('no-display');
        $('.btn-add-receiver').addClass('no-display');
        $('.btn-add-stock').addClass('no-display');
        if (obj.canAdd) {
            $('.btn-add-viewstock').removeClass('no-display');
            $('.btn-add-getin').removeClass('no-display');
            $('.btn-add-getout').removeClass('no-display');
            $('.btn-add-group').removeClass('no-display');
            $('.btn-add-subgroup').removeClass('no-display');
            $('.btn-add-brand').removeClass('no-display');
            $('.btn-add-unit').removeClass('no-display');
            $('.btn-add-receiver').removeClass('no-display');
            $('.btn-add-stock').removeClass('no-display');
        }

        _role_stores_class_display = "no-display"
        if (obj.canEdit) {
            _role_stores_class_display = ""
        }
    }
    else if (menuName == "การออกแบบ Spec" || parentMenuName == "การออกแบบ Spec") {
        if (obj.canView) {
            $('#nav-spec').removeClass('nav-no-display');
        }

        $('.btn-add-planks').addClass('no-display');
        $('.btn-add-fitting').addClass('no-display');
        if (obj.canAdd) {
            $('.btn-add-planks').removeClass('no-display');
            $('.btn-add-fitting').removeClass('no-display');
        }

        _role_spec_class_display = "no-display"
        if (obj.canEdit) {
            _role_spec_class_display = ""
        }
    }
    else if (menuName == "ฝ่ายบุคคล" || parentMenuName == "ฝ่ายบุคคล") {
        if (obj.canView) {
            $('#nav-hr').removeClass('nav-no-display');
        }

        $('.btn-add-employee').addClass('no-display');
        $('.btn-add-holiday').addClass('no-display');
        $('.btn-add-department').addClass('no-display');
        $('.btn-add-position').addClass('no-display');
        $('.btn-add-leave').addClass('no-display');
        $('.btn-add-attendance-time').addClass('no-display');
        $('.btn-add-attendance-setting').addClass('no-display');
        $('.btn-add-other-payment').addClass('no-display');
        if (obj.canAdd) {
            $('.btn-add-employee').removeClass('no-display');
            $('.btn-add-holiday').removeClass('no-display');
            $('.btn-add-department').removeClass('no-display');
            $('.btn-add-position').removeClass('no-display');
            $('.btn-add-leave').removeClass('no-display');
            $('.btn-add-attendance-time').removeClass('no-display');
            $('.btn-add-attendance-setting').removeClass('no-display');
            $('.btn-add-other-payment').removeClass('no-display');
        }

        _role_hr_class_display = "no-display"
        if (obj.canEdit) {
            _role_hr_class_display = ""
        }
    }
    else if (menuName == "การอนุมัติใบเสนอราคา" || parentMenuName == "การอนุมัติใบเสนอราคา") {
        if (obj.canView) {
            $('#nav-approve').removeClass('nav-no-display');
        }

        _role_approve_class_display = "no-display"
        //if (obj.canApprove) {
        if (obj.canEdit) {
            _role_approve_class_display = ""
        }
    }
}

let _master_active = "";
//let _role_emp_class_display = "";
let _role_product_class_display = "";
let _role_bank_class_display = "";
let _master_all_role = "";
let _role_sale_class_display = "";
let _role_3d_class_display = "";
let _role_foreman_class_display = "";
let _role_account_class_display = "";
let _role_approve_class_display = "";

//let _role_leave_type_class_disaply = "";
//let _role_leave_class_disaply = "";
//let _role_attendance_class_disaply = "";
let _role_productQuickQT_class_display = "";

let _role_stores_class_display = "";
let _role_spec_class_display = "";
let _role_hr_class_display = "";

function convertDroupDownData(json, addTmp = false) {
    let arr = [];
    if (addTmp) {
        let param = {
            id: '',
            header: '',
            detail: '',
            rev: ``
        }
        arr.push(param);
    }
    Array.from(json).forEach((v, i) => {
        let param = {
            id: v.id,
            title: v.header,
            text: generateRowSelect2(v),
            detail: v.detail
        };
        arr.push(param);
    });
    return arr;
}
function generateRowSelect2(v) {
    if (v.loading) {
        return v.text;
    }
    return `<div class='custom-dropdown'>
                <div class='header-dropdown'>${(v.header || '')}</div>
            </div>`
}
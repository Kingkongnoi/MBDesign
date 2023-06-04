﻿$(function () {

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

    let loginId = localStorage.getItem('loginId');
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Login/GetMenuPermissionPerEmpData?id=${loginId}`,
        success: function (data) {
            console.log(data);
            data.forEach((v) => {
                setShowAndHiddenNavMenu(v.menuName, v.parentMenuName, v.canView);
            })
        },
        error: function (err) {
        }
    });
}

function setShowAndHiddenNavMenu(menuName, parentMenuName, canView) {
    if (menuName == "ภาพรวมข้อมูล" || parentMenuName == "ภาพรวมข้อมูล") {

    }
    else if (menuName == "การขาย" || parentMenuName == "การขาย") {
        if (canView) {
            $('#nav-sale').removeClass('nav-no-display');
            $('.nav-pills a[href="#nav-sale-quotation-tab"]').tab('show');
        }
    }
    else if (menuName == "การออกแบบ 3D" || parentMenuName == "การออกแบบ 3D") {
        if (canView) {
            $('#nav-3d').removeClass('nav-no-display');
        }
    }
    else if (menuName == "โฟร์แมน" || parentMenuName == "โฟร์แมน") {
        if (canView) {
            $('#nav-foreman').removeClass('nav-no-display');
        }
    }
    else if (menuName == "บัญชีและเอกสาร" || parentMenuName == "บัญชีและเอกสาร") {
        if (canView) {
            $('#nav-accounting').removeClass('nav-no-display');
        }
    }
    else if (menuName == "ข้อมูลหลัก" || parentMenuName == "ข้อมูลหลัก") {
        if (canView) {
            $('#nav-master').removeClass('nav-no-display');
        }
    }
    else if (menuName == "การอนุมัติใบเสนอราคา" || parentMenuName == "การอนุมัติใบเสนอราคา") {
        if (canView) {
            $('#nav-approve').removeClass('nav-no-display');
        }
    }
}

let _master_active = "";
function callGetRolePerMenu() {
    let loginId = localStorage.getItem('loginId');
    $('.nav-pills').addClass('no-display');
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Login/GetMenuPermissionPerEmpData?id=${loginId}`,
        success: function (data) {
            _master_active = "";
            var master_menu = data.filter((b) => { return b.parentMenuName == "ข้อมูลหลัก" && b.canView });
            if (master_menu.length > 0) {
                $('.nav-pills').removeClass('no-display')
            }

            var sale_menu = data.filter((b) => { return b.parentMenuName == "ข้อมูลหลัก" && b.canView });
            if (sale_menu.length > 0) {
                $('.nav-pills').removeClass('no-display')
            }

            data.forEach((v) => {
                setPermissionMenu(v);
            })
        },
        error: function (err) {
        }
    });
}
function setPermissionMenu(v) {
    if (v.menuName == "ภาพรวมข้อมูล" || v.parentMenuName == "ภาพรวมข้อมูล") {

    }
    else if (v.menuName == "การขาย" || v.parentMenuName == "การขาย") {
        setPermissionSaleMenu(v);
    }
    else if (v.menuName == "การออกแบบ 3D" || v.parentMenuName == "การออกแบบ 3D") {
        
    }
    else if (v.menuName == "โฟร์แมน" || v.parentMenuName == "โฟร์แมน") {
        
    }
    else if (v.menuName == "บัญชีและเอกสาร" || v.parentMenuName == "บัญชีและเอกสาร") {
        
    }
    else if (v.menuName == "ข้อมูลหลัก" || v.parentMenuName == "ข้อมูลหลัก") {
        setPermissionMasterMenu(v);
    }
    else if (v.menuName == "การอนุมัติใบเสนอราคา" || v.parentMenuName == "การอนุมัติใบเสนอราคา") {
        
    }
}
function setPermissionMasterMenu(v) {

    switch (v.menuName) {
        case "ทั้งหมด":
            if (v.canView) {
                if (_master_active == "") { _master_active = "active"; $('.nav-pills a[href="#nav-mas-empData-tab"]').tab('show'); }

                $('#nav-emp').removeClass('no-display');
                $('#nav-product').removeClass('no-display');
                $('#nav-calculate').removeClass('no-display');
                $('#nav-inventory').removeClass('no-display');
                $('#nav-accounting').removeClass('no-display');
                $('#nav-transpotation').removeClass('no-display');
            }
            else {
                $('#nav-emp').addClass('no-display');
                $('#nav-product').addClass('no-display');
                $('#nav-calculate').addClass('no-display');
                $('#nav-inventory').addClass('no-display');
                $('#nav-accounting').addClass('no-display');
                $('#nav-transpotation').addClass('no-display');
            }

            if (v.canAdd) {
                $('#nav-master-empData .btn-add-employee').removeClass('no-display');
                $('#nav-master-role .btn-add-role').removeClass('no-display');
                $('#nav-master-holiday .btn-add-holiday').removeClass('no-display');
                $('#nav-master-department .btn-add-department').removeClass('no-display');
                $('#nav-master-position .btn-add-position').removeClass('no-display');
            }
            else {
                $('#nav-master-empData .btn-add-employee').addClass('no-display');
                $('#nav-master-role .btn-add-role').addClass('no-display');
                $('#nav-master-holiday .btn-add-holiday').addClass('no-display');
                $('#nav-master-department .btn-add-department').addClass('no-display');
                $('#nav-master-position .btn-add-position').addClass('no-display');

                $('#nav-master-productData .btn-add-product').addClass('no-display');
                $('#nav-master-productType .btn-add-type').addClass('no-display');
                $('#nav-master-productStyle .btn-add-style').addClass('no-display');

                $('#divBankAccount .btn-add-account').addClass('no-display');
            }
            break;
        case "ข้อมูลพนักงาน":
            if (v.canView) {
                if (_master_active == "")
                {
                    _master_active = "active";
                    $('.nav-pills a[href="#nav-mas-empData-tab"]').tab('show');
                }
                $('#nav-emp').removeClass('no-display');
            }
            else {
                $('#nav-emp').addClass('no-display');
            }

            if (v.canAdd) {
                $('#nav-master-empData .btn-add-employee').removeClass('no-display');
                $('#nav-master-role .btn-add-role').removeClass('no-display');
                $('#nav-master-holiday .btn-add-holiday').removeClass('no-display');
                $('#nav-master-department .btn-add-department').removeClass('no-display');
                $('#nav-master-position .btn-add-position').removeClass('no-display');

                $('#nav-master-productData .btn-add-product').removeClass('no-display');
                $('#nav-master-productType .btn-add-type').removeClass('no-display');
                $('#nav-master-productStyle .btn-add-style').removeClass('no-display');

                $('#divBankAccount .btn-add-account').removeClass('no-display');
            }
            else {
                $('#nav-master-empData .btn-add-employee').addClass('no-display');
                $('#nav-master-role .btn-add-role').addClass('no-display');
                $('#nav-master-holiday .btn-add-holiday').addClass('no-display');
                $('#nav-master-department .btn-add-department').addClass('no-display');
                $('#nav-master-position .btn-add-position').addClass('no-display');
            }
            break;

        case "ตั้งค่าสินค้าและราคา":
            if (v.canView) {
                if (_master_active == "") { _master_active = "active"; $('.nav-pills a[href="#nav-mas-product-tab"]').tab('show'); }
                $('#nav-product').removeClass('no-display');
            }
            else {
                $('#nav-product').addClass('no-display');
            }

            if (v.canAdd) {
                $('#nav-master-productData .btn-add-product').removeClass('no-display');
                $('#nav-master-productType .btn-add-type').removeClass('no-display');
                $('#nav-master-productStyle .btn-add-style').removeClass('no-display');
            }
            else {
                $('#nav-master-productData .btn-add-product').addClass('no-display');
                $('#nav-master-productType .btn-add-type').addClass('no-display');
                $('#nav-master-productStyle .btn-add-style').addClass('no-display');
            }

            break;
        case "ตั้งค่าสูตรคำนวณ":
            if (v.canView) {
                if (_master_active == "") { _master_active = "active"; $('.nav-pills a[href="#nav-mas-calculate-tab"]').tab('show'); }
                $('#nav-calculate').removeClass('no-display');
            }
            else {
                $('#nav-calculate').addClass('no-display');
            }

            break;
        case "ข้อมูลคลังสินค้า":
            if (v.canView) {
                if (_master_active == "") { _master_active = "active"; $('.nav-pills a[href="#nav-mas-inventory-tab"]').tab('show'); }
                
                $('#nav-inventory').removeClass('no-display');
            }
            else {
                $('#nav-inventory').addClass('no-display');
            }

            break;
        case "ข้อมูลบัญชีรับเงิน":
            if (v.canView) {
                if (_master_active == "") {
                    _master_active = "active";
                    $('.nav-pills a[href="#nav-mas-account-tab"]').tab('show');
                }
               
                $('#nav-accounting').removeClass('no-display');
            }
            else {
                $('#nav-accounting').addClass('no-display');
            }

            if (v.canAdd) {
                $('#divBankAccount .btn-add-account').removeClass('no-display');
            }
            else {
                $('#divBankAccount .btn-add-account').addClass('no-display');
            }
            break;
        case "ข้อมูลรถขนส่ง":
            if (v.canView) {
                if (_master_active == "") { _master_active = "active"; $('.nav-pills a[href="#nav-mas-transpotation-tab"]').tab('show'); }
                
                $('#nav-transpotation').removeClass('no-display');
            }
            else {
                $('#nav-transpotation').addClass('no-display');
            }
            break;
    }

}
function setPermissionSaleMenu(v) {
    if (v.canAdd) {
        $('#nav-cus').removeClass('no-display');
        $('#nav-style').removeClass('no-display');
        $('#nav-calculate').removeClass('no-display');
        $('#nav-upload').removeClass('no-display');
    }
    else {
        $('#nav-cus').removeClass('no-display');
        $('#nav-style').removeClass('no-display');
        $('#nav-calculate').removeClass('no-display');
        $('#nav-upload').removeClass('no-display');
    }
}
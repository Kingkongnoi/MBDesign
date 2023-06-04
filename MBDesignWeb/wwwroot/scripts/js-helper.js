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
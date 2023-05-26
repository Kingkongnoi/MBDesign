let format = {
    btnLoading: `<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> loading..`,
    icon: `<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>`
}

$.fn.addLoading = function (isShowText = true) {
    let targetBtn = $(this);
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
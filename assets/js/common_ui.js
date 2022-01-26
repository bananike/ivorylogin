// 알럿
function callAlert(value) {
    var body = $('body');
    var alert = '';
    alert += '<div class="alert"><div class="alert_container">';
    alert += '<div class="title">';
    alert += value.title;
    alert += '</div><div class="content">';
    alert += value.content;
    alert +=
        '</div><div class="btn_group"><button type="button" class="alert_conform">';
    alert += value.btn;
    alert += '</button></div></div><div class="back"></div></div>';
    body.addClass('alert_on');
    body.find('.container').append(alert);
}

// 알럿 컨펌 버튼
$(document).on('click', '.alert_conform, .alert .back', function () {
    var body = $('body');
    $('.alert').remove();
    body.removeClass('alert_on');
});

// 팝업
function callPopup(value) {
    var body = $('body');
    var popup = '';
    popup +=
        '<div class="popup"><div class="popup_container"><button type="button" class="popup_close"></button><div class="popup_content">';
    popup += '<h3 class="title">';
    popup += value.title;
    popup += '</h3><pre class="text">';
    popup += value.text;
    popup += '</pre></div>';
    popup += '<button type="button" data-target="';
    popup += value.target;
    popup +=
        '" class="popup_footer_btn">모든 약관에 동의합니다</button></div><div class="back"></div></div>';
    body.find('.container').append(popup);
    body.addClass('popup_on');
}

// 팝업 닫기
function closePopup() {
    var body = $('body');
    var popup = $('.popup');
    popup.find('.popup_container').addClass('closing');

    setTimeout(function () {
        popup.remove();
        body.removeClass('popup_on');
    }, 300);
}

// 팝업 닫기 버튼 클릭
$(document).on('click', '.popup_close, .popup .back', function () {
    closePopup();
});

// 팝업 동의
$(document).on('click', '.popup_footer_btn', function () {
    var target = $(this).attr('data-target');
    $('#' + target).prop('checked', true);
    closePopup();

    // 인증버튼 활성화체크
    checkBtnAuthentication();
});

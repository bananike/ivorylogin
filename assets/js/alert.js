function callAlert(value) {
    console.log(value);
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
    alert += '</button></div></div></div>';
    body.css('overflow', 'hidden');
    body.find('.container').append(alert);
}

// 알럿 컨펌 버튼
$(document).on('click', '.alert_conform', function () {
    console.log('asdasdsd');
    var body = $('body');
    $('.alert').remove();
    body.css('overflow', 'auto');
});

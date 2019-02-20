$(function(){
    $('#forgot-email').on('keyup keydown', function(){
        var email = "pdesai@spectacular.com";

        if ($('#forgot-email').val() === email) {
            $('#login-button').removeClass('disabled').removeAttr('disabled').attr('href', 'recover.html');
            $('#incorrect-email').hide();
            $('#correct-email').show();
        }
        else {
            $('#login-button').addClass('disabled').attr('disabled', true);
            if ($('#forgot-email').val() == "") {
                $('#incorrect-email').hide();
                $('#correct-email').hide();
            }
            else {
                $('#incorrect-email').show();
                $('#correct-email').hide();
            }
        }
    });
});
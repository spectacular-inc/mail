$(function(){
    $('#forgot-email').on('keyup keydown', function(e){
        var email = "pdesai@spectacular.com";

        if ($('#forgot-email').val() === email) {
            // correct email
            $('#login-button').removeClass('disabled').removeAttr('disabled').attr('href', 'recover.html')
                .removeClass('btn-secondary').addClass('btn-success');
            $('#incorrect-email').hide();
            $('#correct-email').show();
        }
        else {
            // wrong email
            $('#login-button').addClass('disabled').attr('disabled', true)
                .addClass('btn-secondary').removeClass('btn-success');

            if ($('#forgot-email').val() == "") {
                // cleared text box
                $('#incorrect-email').hide();
                $('#correct-email').hide();
            }
            else {
                // wrong text entered
                $('#incorrect-email').show();
                $('#correct-email').hide();
            }
        }
    });
});
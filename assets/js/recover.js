$(function(){
    $('#security-validation').on('submit', function(){

        var correctAnswers = [
            ['sherlock'],
            ['gutierrez', 'dr. gutierrez', 'dr gutierrez', 'doctor gutierrez'],
            ['geary', 'geary blvd', 'geary boulevard'],
            ['sunkist']
        ];

        var allCorrect = true;

        // selectively apply success or failure classes
        for (var i = 0; i < correctAnswers.length; i++) {
            // check if the text in the corresponding answer text matches the right answers
            if(correctAnswers[i].indexOf($('#question' + (i+1)).val().toLowerCase()) > -1) {
                // right answer!
                $('#question' + (i+1)).addClass('is-valid').removeClass('is-invalid');
            }
            else {
                // wrong answer!
                allCorrect = false;
                $('#question' + (i+1)).removeClass('is-valid').addClass('is-invalid');
            }
        }

        if (allCorrect === true) {
            // show button to log in
        }


        // stop a page reload so just always return false
        return false;
    });
});
const accounts = {
    "marioc@spectacular.com": {
        name: "Mario Clemente",
        password: "TnTyLX" },
    "estella@spectacular.com": {
        name: "Estella Lee",
        password: "password" },
    "dcart@spectacular.com": {
        name: "Devin Cartwright",
        password: "Picatsso" },
    "pdesai@spectacular.com": {
        name: "Priya Desai",
        password: "landofthefreehomeofthebingers",
        forgotPassword: true },
};

// priya's security questions
const securityQuestions = [
    {
        id: 1,
        question: "What is your favorite book?",
        hint: "It's the key to my heart",
        answers: ["Alice in Wonderland"]
    },
    {
        id: 2,
        question: "What is your doctor's name?",
        hint: "I swear I wrote it down somewhere...",
        answers: ["Gutierrez", "Dr. Gutierrez", "Dr Gutierrez", "Doctor Gutierrez"]
    }
];

let currentSecurityQuestionIndex = 0;

// the person who is logging in
let activeEmail = null;


$(() => {

    $('#input-email').on('keydown keyup change', e => {
        // only enable "next" button if a valid email is entered
        if(accounts.hasOwnProperty($(e.currentTarget).val())) {
            $('#email-next').removeAttr('disabled');
        }
        else {
            $('#email-next').attr('disabled', 'disabled');
        }
    });

   $('#email-next').click(e => {
       // handle "next" button after email click
       activeEmail = $('#input-email').val();

       const person = accounts[activeEmail];
       $('.field-email').html(activeEmail);
       $('.field-name').html(person.name);

       $('#username-form').hide();
       $('#password-form').show();

       // show the forgot password form if the person should have it
       if (person.forgotPassword) {
           $('#forgot-password-holder').show();
       }
       else {
           $('#forgot-password-holder').hide();
       }

       // prevent form submission
       e.preventDefault();
   });

   $('#login-button').click(e => {
       let enteredPassword = $('#input-password').val().trim();

        if (enteredPassword === accounts[activeEmail].password) {
            // right password
            $('#incorrect-password').hide();
        }
        else {
            // wrong password
            $('#incorrect-password').show();
        }

       e.preventDefault();
   });

    $('#forgot-password').click(e => {
       e.preventDefault();

       // assuming this is Priya

       // load the current security question
       // (onload it's initialized to 0, we want to not reset it
       // here b/c we want to save state if the user closes & reopens)
       loadSecurityQuestion(currentSecurityQuestionIndex);

       // fill in the total number of questions
       $('.field-security-question-total').html(securityQuestions.length);

       // open the forgot password modal
       $('#forgot-password-modal').modal('show');
   });

   $('#security-question-check').click(e => {
       // check if answer is part of accepted answers
       // put it all in lowercase to avoid capitalization problems
       let userAnswer = $('#security-question-input').val().trim().toLowerCase();
       let securityQuestion = securityQuestions[currentSecurityQuestionIndex];
       let acceptedAnswers = securityQuestion.answers.map(ans => ans.toLowerCase());
       let isCorrectAnswer = acceptedAnswers.indexOf(userAnswer) >= 0;

       // toggle feedback states
       $('#security-question-right').toggle(isCorrectAnswer);
       $('#security-question-wrong').toggle(!isCorrectAnswer);

       e.preventDefault();
   });

   $('#security-question-next').click(e => {
       // TODO this logic is in the wrong place. this button should be hidden
       // as soon as the user hits `check`.
       if (currentSecurityQuestionIndex === securityQuestions.length - 1) {
           // if this is the last security question, just give the password

           // first, hide the next button
           $('#security-question-next').hide();

           // get this user's password
           // (it's priya, but to be robust we'll programmatically find one)
           let user = accounts.filter(acc => acc.forgotPassword)[0];

           // fill in password
           $('.field-user-password').html(user.password);

           // show the field with the password
           $('#user-password-reveal').show();
       }
       else {
           // otherwise, show the next question
           loadSecurityQuestion(currentSecurityQuestionIndex + 1);
       }

       e.preventDefault();
   });
});

let loadSecurityQuestion = (newQuestionIndex) => {
    // set the current question
    currentSecurityQuestionIndex = newQuestionIndex;
    let securityQuestion = securityQuestions[currentSecurityQuestionIndex];

    // load dialog with fields
    $('.field-security-question-number').html(securityQuestion.id);
    $('.field-security-question-text').html(securityQuestion.question);

    // empty input field
    $('#security-question-input').val(null).focus();

    // hide all feedback
    $('#security-question-right').hide();
    $('#security-question-wrong').hide();
};
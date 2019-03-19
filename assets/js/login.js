const accounts = [
    {
        email: "marioc@spectacular.com",
        username: "marioc",
        name: "Mario Clemente",
        password: "TNTYLX",
        slug: "iTnPYiDLVvXPy0sW6N8y"
    },
    {
        email: "estella@spectacular.com",
        username: "estella",
        name: "Estella Lee",
        password: "qwerty123!",
        slug: "4DwE8vDhUZHqBSRfnF9V"
    },
    {
        email: "dcart@spectacular.com",
        username: "dcart",
        name: "Devin Cartwright",
        password: "ADEGJK",
        slug: "8NrmU2BIflHwa2Hzxhuf"
    },
    {
        email: "pdesai@spectacular.com",
        username: "pdesai",
        name: "Priya Desai",
        password: "landofthefreehomeofthebingers",
        slug: "2lahVBUNiYJNCBJx3FXA",
        forgotPassword: true
    }
];

// priya's security questions
const securityQuestions = [
    {
        id: 1,
        question: "What is your favorite children's book?",
        hint: "It's the key to my heart",
        answers: ["Alice in Wonderland"]
    },
    {
        id: 2,
        question: "What is your doctor's name?",
        hint: "I swear I wrote it down somewhere",
        answers: ["Gutierrez", "Dr. Gutierrez", "Dr Gutierrez", "Doctor Gutierrez"]
    },
    {
        id: 3,
        question: "What was your high school mascot?",
        hint: "I saved it somewhere",
        answers: ["Bearnard"]
    },
    {
        id: 4,
        question: "What is your dog's name?",
        hint: "I spend so much time on emails that I never see him again :(",
        answers: ["Sherlock"]
    }
];

let currentSecurityQuestionIndex = 0;

// the person who is logging in
let activeUser = null;

// jekyll-like consts
const SITE_BASEURL = "/mail";



$(() => {

    $('#input-email').on('keydown keyup change', e => {
        // only enable "next" button if a valid email is entered
        let validEmails = accounts.map(acc => acc.email);
        let enteredEmail = $(e.currentTarget).val();
        if(validEmails.indexOf(enteredEmail) >= 0) {
            $('#email-next').removeAttr('disabled');
        }
        else {
            $('#email-next').attr('disabled', 'disabled');
        }
    });

   $('#email-next').click(e => {
       // handle "next" button after email click

       // figure out who was chosen based on the inputted email
       // (we have already checked that there is SOME valid email)
       let enteredEmail = $('#input-email').val();
       activeUser = accounts.filter(acc => acc.email === enteredEmail)[0];

       $('.field-email').html(activeUser.email);
       $('.field-name').html(activeUser.name);

       $('#username-form').hide();
       $('#password-form').show();

       // show the forgot password form if the person should have it
       $('#forgot-password').toggle(activeUser.forgotPassword);

       // prevent form submission
       e.preventDefault();
   });

   $('#login-button').click(e => {
       let enteredPassword = $('#input-password').val().trim();

        if (enteredPassword === activeUser.password) {
            // right password :)
            $('#incorrect-password').hide();

            // go to inbox
            // URL = the base + /inbox + user's username + slug
            window.location.href = SITE_BASEURL + "/inbox/" +
                activeUser.username + "-" + activeUser.slug + ".html";
        }
        else {
            // wrong password :(
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

       // if this is the final question & they got it right,
       // don't show the "next" button -- instead just show
       // the password (in the "correct answer" feedback field, which we will show later)
        if (isCorrectAnswer && currentSecurityQuestionIndex === securityQuestions.length - 1) {
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

       // toggle feedback states
       $('#security-question-right').toggle(isCorrectAnswer);
       $('#security-question-wrong').toggle(!isCorrectAnswer);

       e.preventDefault();
   });

   $('#security-question-next').click(e => {
       // this function will take care of all UI updates
       loadSecurityQuestion(currentSecurityQuestionIndex + 1);

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

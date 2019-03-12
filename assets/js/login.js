const accounts = {
    "marioc@spectacular.com": {
        name: "Mario Clemente",
        password: "password" },
    "estella@spectacular.com": {
        name: "Estella Lee",
        password: "password" },
    "dcart@spectacular.com": {
        name: "Devin Cartwright",
        password: "password" },
    "pdesai@spectacular.com": {
        name: "Priya Desai",
        password: "landofthefreehomeofthebingers",
        forgotPassword: true },
};

const securityQuestions = [
    {
        id: 1,
        question: "What is your favorite book?",
        hint: "It's the key to my heart",
        answer: "Harry Potter"
    },
    {
        id: 2,
        question: "What is your doctor's name?",
        hint: "I swear
    }
]

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

   $('#forgot-password').click(e => {
       e.preventDefault();

       // assuming this is Priya
       // open the forgot password modal
       $('#forgot-password-modal').modal('show');


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
});
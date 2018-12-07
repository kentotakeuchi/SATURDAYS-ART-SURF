////////////////////////////////////////////////////
import $ from 'jquery';

// JavaScript of bootstrap.
import 'bootstrap';

// Custum scss
import './sass/style.scss';

// Models
import API from './model/apiTest';

// Views
import { els } from './view/base';
import * as landingView from './view/landingView';
/////////////////////////////////////////////////////

const state = {};

$('document').ready(() => {

    state.api = new API();

    state.api.getResults();

    setEventHandler();

});

function setEventHandler() {

    // Register form
    els.registerEmail.blur(registerCheckHandler);
    els.registerPassword.blur(registerCheckHandler);
    els.registerPassword2.blur(registerCheckHandler);
    els.registerBtn.click(registerUserHandler);
    els.registerToLogin.click(registerToLoginHandler);

    // Login form
    els.loginEmail.blur(loginCheckHandler);
    els.loginPassword.blur(loginCheckHandler);
    els.loginBtn.click(loginUserHandler);

    // Display artworks
    $(window).scroll(pagenationHandler);
};


///////////////////////////////////////////////
/// LANDING PAGE
function registerUserHandler() {

    $.ajax({
        method: "POST",
        url: "http://localhost:3000/auth/register",
        data: {
             email: els.registerEmail.val(),
             password: els.registerPassword.val()
        }
    })
    .done(( msg ) => {
        alert(`msg`, msg);
    })
    .fail(( err ) => {
        alert(`err`, err);
    });
};

function registerToLoginHandler() {

    // Clear register form.
    landingView.clearRegisterForm();

    // Display login form.
    landingView.renderLoginForm();
};

function loginUserHandler() {

    $.ajax({
        method: "POST",
        url: "http://localhost:3000/auth/login",
        data: {
             email: els.loginEmail.val(),
             password: els.loginPassword.val()
        }
    })
    .done(( user ) => {
        console.log(`user`, user);

        localStorage.setItem('user_id', user._id);
        localStorage.setItem('token', user.tokens[0].token);
        localStorage.setItem('userEmail', user.email);
        setTimeout(() => {
            window.location.href = '/main.html';
        }, 1000);
    })
    .fail(( err ) => {
        alert(`err`, err);
    });
};

function registerCheckHandler() {

    const inValid =
        !registerEmailFormatCheck(els.registerEmail.val()) ||
        !registerPasswordFormatCheck(els.registerPassword.val()) ||
        !registerPasswordsMatch(
            els.registerPassword.val(),
            els.registerPassword2.val()) ||
        els.registerEmail.val() === '' ||
        els.registerPassword.val() === '' ||
        els.registerPassword2.val() === '';

    if (inValid) {
        els.registerBtn.prop('disabled', true);
    } else {
        els.registerBtn.prop('disabled', false);
    }
    return !inValid;
};

function registerEmailFormatCheck(email) {

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid = true;

    if (email.length > 0) {
        valid = re.test(String(email).toLowerCase());
    }

    if (!valid) {
        els.registerErrorMessageContainer.addClass('dangerColor');
        els.registerErrorMessage.html('Email format is incorrect.');
        els.registerErrorMessageContainer.css('display', 'flex');
    } else {
        resetMessages();
    }

    return valid;
};

function registerPasswordFormatCheck(password) {

    var lowerCaseRegex = /.*[a-z].*/;
    var upperCaseRegex = /.*[A-Z].*/;
    var numberRegex = /.*\d.*/;
    var symbolRegex = /.*[!@#$%^&*+?].*/;
    var valid = true;

    if (password.length > 0) {
        valid = password.length >= 8 &&
        lowerCaseRegex.test(String(password)) &&
        upperCaseRegex.test(String(password)) &&
        numberRegex.test(String(password)) &&
        symbolRegex.test(String(password));
    }

    if (!valid) {
        els.registerErrorMessageContainer.addClass('dangerColor');
        els.registerErrorMessage.html('Password must be at least 8 characters in length, and must have at least one number, one uppercase letter, one lowercase letter, and one of the following symbols: ! @ # $ % ^ & * + ?');
        els.registerErrorMessageContainer.css('display', 'flex');
    } else {
        resetMessages();
    }

    return valid;
};

function registerPasswordsMatch(password1, password2) {
    var valid = password1 === password2;

    if (!valid) {
        els.registerErrorMessageContainer.addClass('dangerColor');
        els.registerErrorMessage.html('Password and confirm password fields do not match.');
        els.registerErrorMessageContainer.css('display', 'flex');
    } else {
        resetMessages();
    }

    return valid;
};

function loginCheckHandler() {

    const inValid =
        !loginEmailFormatCheck(els.loginEmail.val()) ||
        !loginPasswordFormatCheck(els.loginPassword.val()) ||
        els.loginEmail.val() === '' ||
        els.loginPassword.val() === '';

    if (inValid) {
        els.loginBtn.prop('disabled', true);
    } else {
        els.loginBtn.prop('disabled', false);
    }
    return !inValid;
};

function loginEmailFormatCheck(email) {

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid = true;

    if (email.length > 0) {
        valid = re.test(String(email).toLowerCase());
    }

    if (!valid) {
        els.loginErrorMessageContainer.addClass('dangerColor');
        els.loginErrorMessage.html('Email format is incorrect.');
        els.loginErrorMessageContainer.css('display', 'flex');
    } else {
        resetMessages();
    }

    return valid;
};

function loginPasswordFormatCheck(password) {

    var lowerCaseRegex = /.*[a-z].*/;
    var upperCaseRegex = /.*[A-Z].*/;
    var numberRegex = /.*\d.*/;
    var symbolRegex = /.*[!@#$%^&*+?].*/;
    var valid = true;

    if (password.length > 0) {
        valid = password.length >= 8 &&
        lowerCaseRegex.test(String(password)) &&
        upperCaseRegex.test(String(password)) &&
        numberRegex.test(String(password)) &&
        symbolRegex.test(String(password));
    }

    if (!valid) {
        els.loginErrorMessageContainer.addClass('dangerColor');
        els.loginErrorMessage.html('Password must be at least 8 characters in length, and must have at least one number, one uppercase letter, one lowercase letter, and one of the following symbols: ! @ # $ % ^ & * + ?');
        els.loginErrorMessageContainer.css('display', 'flex');
    } else {
        resetMessages();
    }

    return valid;
};

function resetMessages() {
    els.registerErrorMessageContainer.css('display', 'none');
    els.registerErrorMessageContainer.removeClass('dangerColor');
    els.registerErrorMessage.html('');
    els.loginErrorMessageContainer.css('display', 'none');
    els.loginErrorMessageContainer.removeClass('dangerColor');
    els.loginErrorMessage.html('');
}


///////////////////////////////////////////////
/// MAIN PAGE

function pagenationHandler() {
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
        state.api.getResults();
     }
};
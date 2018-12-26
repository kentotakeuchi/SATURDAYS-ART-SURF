import $ from 'jquery';
import { els } from '../view/base';

let userID = localStorage.getItem('user_id');
let token = localStorage.getItem('token');

export default class Auth {

    constructor() {}

    // TWITTER
    getReqTokenTW() {

        return $.ajax({
            method: "GET",
            url: "http://localhost:3000/auth/login/twitter"
        });
    }

    getAccessTokenTW() {

        return $.ajax({
            method: "GET",
            url: "http://localhost:3000/auth/login/twitter/accessToken"
        });
    }

    // FACEBOOK
    getTokenFB() {

        console.log(`getTokenFB`);

        return $.ajax({
            method: "GET",
            url: "http://localhost:3000/auth/login/facebook"
        });
    }

    registerUser() {

        return $.ajax({
            method: "POST",
            url: "http://localhost:3000/auth/register",
            data: {
                 email: els.registerEmail.val(),
                 password: els.registerPassword.val()
            }
        });
    }

    loginUser() {

        return $.ajax({
            method: "POST",
            url: "http://localhost:3000/auth/login",
            data: {
                 email: els.loginEmail.val(),
                 password: els.loginPassword.val()
            }
        })
    }

    persistData(user) {

        localStorage.setItem('user_id', user._id);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('token', user.tokens[0].token);
    }

    persistDataTW(data) {

        localStorage.setItem('user_id', data[0]);
        localStorage.setItem('token', data[1]);
    }

    registerCheck() {

        const emailInput = els.registerEmail.val();
        const pwdInput = els.registerPassword.val();
        const pwdInput2 = els.registerPassword2.val();

        const inValid =
        !registerEmailFormatCheck(emailInput) ||
        !registerPasswordFormatCheck(pwdInput) ||
        !registerPasswordsMatch(pwdInput, pwdInput2) ||
        emailInput === '' ||
        pwdInput === '' ||
        pwdInput2 === '';

        if (inValid) {
            els.registerBtn.prop('disabled', true);
        } else {
            els.registerBtn.prop('disabled', false);
        }
        return !inValid;
    }

    loginCheck() {

        const emailInput = els.loginEmail.val();
        const pwdInput = els.loginPassword.val();

        const inValid =
        !loginEmailFormatCheck(emailInput) ||
        !loginPasswordFormatCheck(pwdInput) ||
        emailInput === '' ||
        pwdInput === '';

        if (inValid) {
            els.loginBtn.prop('disabled', true);
        } else {
            els.loginBtn.prop('disabled', false);
        }
        return !inValid;
    }

    logoutUser() {

        userID = localStorage.getItem('user_id');
        token = localStorage.getItem('token');

        return $.ajax({
            method: "GET",
            url: "http://localhost:3000/auth/logout/" + userID,
            headers: { 'x-access-token': token }
        });
    }

    removeData() {

        localStorage.removeItem('user_id');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('token');
    }
};

///////////////////////////////////////////////
/// REGISTER

function registerEmailFormatCheck(email) {

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let valid = true;

    if (email.length > 0) {
        valid = re.test(String(email).toLowerCase());
    }

    // TODO: How to move to view?
    if (!valid) {
        els.registerMessageContainer.addClass('dangerColor');
        els.registerMessage.html('Email format is incorrect.');
        els.registerMessageContainer.css('display', 'flex');
    } else {
        resetMessages();
    }

    return valid;
};

function registerPasswordFormatCheck(password) {

    const lowerCaseRegex = /.*[a-z].*/;
    const upperCaseRegex = /.*[A-Z].*/;
    const numberRegex = /.*\d.*/;
    const symbolRegex = /.*[!@#$%^&*+?].*/;
    let valid = true;

    if (password.length > 0) {
        valid = password.length >= 8 &&
        lowerCaseRegex.test(String(password)) &&
        upperCaseRegex.test(String(password)) &&
        numberRegex.test(String(password)) &&
        symbolRegex.test(String(password));
    }

    // TODO: How to move to view?
    if (!valid) {
        els.registerMessageContainer.addClass('dangerColor');
        els.registerMessage.html('Password must be at least 8 characters in length, and must have at least one number, one uppercase letter, one lowercase letter, and one of the following symbols: ! @ # $ % ^ & * + ?');
        els.registerMessageContainer.css('display', 'flex');
    } else {
        resetMessages();
    }

    return valid;
};

function registerPasswordsMatch(password1, password2) {
    const valid = password1 === password2;

    // TODO: How to move to view?
    if (!valid) {
        els.registerMessageContainer.addClass('dangerColor');
        els.registerMessage.html('Password and confirm password fields do not match.');
        els.registerMessageContainer.css('display', 'flex');
    } else {
        resetMessages();
    }

    return valid;
};

///////////////////////////////////////////////
/// LOGIN

function loginEmailFormatCheck(email) {

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let valid = true;

    if (email.length > 0) {
        valid = re.test(String(email).toLowerCase());
    }

    // TODO: How to move to view?
    if (!valid) {
        els.loginMessageContainer.addClass('dangerColor');
        els.loginMessage.html('Email format is incorrect.');
        els.loginMessageContainer.css('display', 'flex');
    } else {
        resetMessages();
    }

    return valid;
};

function loginPasswordFormatCheck(password) {

    const lowerCaseRegex = /.*[a-z].*/;
    const upperCaseRegex = /.*[A-Z].*/;
    const numberRegex = /.*\d.*/;
    const symbolRegex = /.*[!@#$%^&*+?].*/;
    let valid = true;

    if (password.length > 0) {
        valid = password.length >= 8 &&
        lowerCaseRegex.test(String(password)) &&
        upperCaseRegex.test(String(password)) &&
        numberRegex.test(String(password)) &&
        symbolRegex.test(String(password));
    }

    // TODO: How to move to view?
    if (!valid) {
        els.loginMessageContainer.addClass('dangerColor');
        els.loginMessage.html('Password must be at least 8 characters in length, and must have at least one number, one uppercase letter, one lowercase letter, and one of the following symbols: ! @ # $ % ^ & * + ?');
        els.loginMessageContainer.css('display', 'flex');
    } else {
        resetMessages();
    }

    return valid;
};

// TODO: How to move to view?
function resetMessages() {
    els.registerMessageContainer.css('display', 'none');
    els.registerMessageContainer.removeClass('dangerColor');
    els.registerMessage.html('');
    els.loginMessageContainer.css('display', 'none');
    els.loginMessageContainer.removeClass('dangerColor');
    els.loginMessage.html('');
};
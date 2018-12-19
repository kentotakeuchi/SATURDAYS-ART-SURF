import { els } from './base';


export const init = () => {
    els.registerEmail.val(``);
    els.registerPassword.val(``);
    els.registerPassword2.val(``);
    els.loginEmail.val(``);
    els.loginPassword.val(``);
    els.registerBtn.prop(`disabled`, true);
    els.loginBtn.prop('disabled', true);
};

export const clearRegisterForm = () => {
    els.registerMessageContainer.css(`display`, `none`);
    els.registerForm.addClass(`hidden`);
};

export const clearLoginForm = () => {
    els.loginMessageContainer.css(`display`, `none`);
    els.loginForm.addClass(`hidden`);
};

export const renderLoginForm = () => {
    els.loginMessageContainer.removeClass(`hidden`);
    els.loginForm.removeClass(`hidden`);
};

export const renderRegisterForm = () => {
    els.registerMessageContainer.removeClass(`hidden`);
    els.registerForm.removeClass(`hidden`);
};


// Display success msg.
export const renderSuccessMsg = str => {

    // TODO: Error name should be removed from class name.
    if (str === `register`) {
        els.registerMessageContainer.addClass('successColor');
        els.registerMessage.html(`SUCCESS`);
        els.registerMessageContainer.css('display', 'flex');
    } else if (str === `login`) {
        els.loginMessageContainer.addClass('successColor');
        els.loginMessage.html(`SUCCESS`);
        els.loginMessageContainer.css('display', 'flex');
    }
};

// Display error msg as an alert.
export const renderErrMsg = (str, err) => {

    // Register
    const emailErr = `an account with this user\'s email already exists`;
    const someErr = `There was a problem registering the user`;

    // Login
    const userErr = `No user found.`;
    const pwdErr = `Password is incorrect.`;

    if (str === `register`) {

        if (err.responseText === emailErr) {
            alert(emailErr)
        } else if (err.responseText === someErr) {
            alert(someErr);
        }

    } else if (str === `login`) {

        if (err.responseText === userErr) {
            alert(userErr)
        } else if (err.responseText === pwdErr) {
            alert(pwdErr);
        } else if (err.responseText === someErr) {
            alert(someErr);
        }

    }
};

// LOGOUT
export const renderErrMsg2 = err => {
    alert(`There was a problem during logout.`);
};
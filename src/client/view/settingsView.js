import { els } from './base';


// Render current email on an input field settings modal popups.
export const renderUserData = user => {

    const email = user.email;
    const password = user.password;

    els.settingsEmail.val(email);

    // If user signs in with Twitter.
    if (email === `We don't have your email address and password.`) {
        els.settingsEmail.val(email);
        els.settingsCurPassword.val(password);
        els.settingsNewPassword.val(password);
        els.settingsNewPassword2.val(password);

        els.settingsEmail.prop(`disabled`, true);
        els.settingsCurPassword.prop(`disabled`, true);
        els.settingsNewPassword.prop(`disabled`, true);
        els.settingsNewPassword2.prop(`disabled`, true);
    }
};

// Initialize input fields & button.
export const init = () => {
    els.settingsEmail.val(``);
    els.settingsCurPassword.val(``);
    els.settingsNewPassword.val(``);
    els.settingsNewPassword2.val(``);
    els.settingsBtn.prop('disabled', true);
};


export const emailFormatValid = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let valid = true;

    if (email.length > 0) {
        valid = re.test(String(email).toLowerCase());
    }

    if (!valid) {
        els.settingsEmailErrorMessageContainer.addClass('dangerColor');
        els.settingsEmailErrorMessage.html('Email format is incorrect.');
        els.settingsEmailErrorMessageContainer.css('display', 'block');
    } else {
        clearEmailErrorMessages();
    }

    return valid;
};

export const compareCurPassword = msg => {
    const input = els.settingsCurPassword.val();

    if (input ===  ``) {
        clearCurPasswordErrorMessages();
    } else if (msg === `Password is incorrect.`) {
        els.settingsCurPasswordErrorMessageContainer.addClass(`dangerColor`);
        els.settingsCurPasswordErrorMessage.html(msg);
        els.settingsCurPasswordErrorMessageContainer.css(`display`, `block`);
    } else if (msg === `Match`) {
        clearCurPasswordErrorMessages();
    }
};

export const passwordFormatValid = password => {

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

    if (!valid) {
        els.settingsNewPasswordErrorMessageContainer.addClass('dangerColor');
        els.settingsNewPasswordErrorMessage.html('Password must be at least 8 characters in length, and must have at least one number, one uppercase letter, one lowercase letter, and one of the following symbols: ! @ # $ % ^ & * + ?');
        els.settingsNewPasswordErrorMessageContainer.css('display', 'block');
    } else {
        clearNewPasswordErrorMessages();
    }

    return valid;
};

export const checkPasswordsMatch = () => {
    const valid = els.settingsNewPassword.val() ===
                  els.settingsNewPassword2.val();

    if (els.settingsNewPassword.val() === `` ||
        els.settingsNewPassword2.val() === ``) {
            clearNewPassword2ErrorMessages();
    } else if (!valid) {
        els.settingsNewPassword2ErrorMessageContainer.addClass('dangerColor');
        els.settingsNewPassword2ErrorMessage.html('No match');
        els.settingsNewPassword2ErrorMessageContainer.css('display', 'block');
    } else {
        clearNewPassword2ErrorMessages();
    }
    return valid;
};

export const renderSuccessMsg = () => {
    alert(`SUCCESS`);
};

export const renderErrMsg = (err) => {
    alert(`There was a problem updating the user.`);
};











function clearEmailErrorMessages() {

    els.settingsEmailErrorMessageContainer.removeClass('dangerColor');
    els.settingsEmailErrorMessage.html('');
    els.settingsEmailErrorMessageContainer.css('display', 'none');
};

function clearCurPasswordErrorMessages() {

    els.settingsCurPasswordErrorMessageContainer.removeClass('dangerColor');
    els.settingsCurPasswordErrorMessage.html('');
    els.settingsCurPasswordErrorMessageContainer.css('display', 'none');
};

function clearNewPasswordErrorMessages() {

    els.settingsNewPasswordErrorMessageContainer.removeClass('dangerColor');
    els.settingsNewPasswordErrorMessage.html('');
    els.settingsNewPasswordErrorMessageContainer.css('display', 'none');
};

function clearNewPassword2ErrorMessages() {

    els.settingsNewPassword2ErrorMessageContainer.removeClass('dangerColor');
    els.settingsNewPassword2ErrorMessage.html('');
    els.settingsNewPassword2ErrorMessageContainer.css('display', 'none');
};

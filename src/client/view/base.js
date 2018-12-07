import $ from 'jquery';

export const els = {
    // Register
    registerErrorMessageContainer: $(`.register__errorMessageContainer`),
    registerErrorMessage: $(`.register__errorMessage`),
    registerForm: $(`#register__form`),
    registerEmail: $(`#register__email`),
    registerPassword: $(`#register__password`),
    registerPassword2: $(`#register__password2`),
    registerBtn: $(`#register__btn`),
    registerToLogin: $(`#register__toLogin`),

    // Login
    loginErrorMessageContainer: $(`.login__errorMessageContainer`),
    loginErrorMessage: $(`.login__errorMessage`),
    loginForm: $(`#login__form`),
    loginEmail: $(`#login__email`),
    loginPassword: $(`#login__password`),
    loginBtn: $(`#login__btn`)
};
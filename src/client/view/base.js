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
    loginBtn: $(`#login__btn`),

    // ARTWORKS
    items: $(`.items`),
    item: $(`.items__item`),

    // ARTWORK
    popupItem: $(`#popupItem`),
    popupItemBody: $(`#popupItem__body`),
    itemContainer: $(`.item__container`),

    // ARTWORK > likes
    likes: $(`.likes`),
    likesIcon: $(`.likes__icon`),

    // NAVIGATION > logout
    logout: $(`#logout`),

    // Navigation > about
    about: $(`#about`),
    popupAbout: $(`#popupAbout`),

    // Navigation > contact
    contact: $(`#contact`),
    popupContact: $(`#popupContact`),

    contactEmail: $(`#contactEmail`),
    contactEmailErrorMessageContainer: $(`.contactEmailErrorMessageContainer`),
    contactEmailErrorMessage: $(`.contactEmailErrorMessage`),

    contactInquiry: $(`#contactInquiry`),
    contactInquiryErrorMessageContainer: $(`.contactInquiryErrorMessageContainer`),
    contactInquiryErrorMessage: $(`.contactInquiryErrorMessage`),

    contactBtn: $(`#contactBtn`),

    // Navigation > settings
    settings: $(`#settings`),
    popupSettings: $(`#popupSettings`),

    settingsEmail: $(`#settingsEmail`),
    settingsEmailErrorMessageContainer: $(`.settingsEmailErrorMessageContainer`),
    settingsEmailErrorMessage: $(`.settingsEmailErrorMessage`),

    settingsCurPassword: $(`#settingsCurPassword`),
    settingsCurPasswordErrorMessageContainer: $(`.settingsCurPasswordErrorMessageContainer`),
    settingsCurPasswordErrorMessage: $(`.settingsCurPasswordErrorMessage`),

    settingsNewPassword: $(`#settingsNewPassword`),
    settingsNewPasswordErrorMessageContainer: $(`.settingsNewPasswordErrorMessageContainer`),
    settingsNewPasswordErrorMessage: $(`.settingsNewPasswordErrorMessage`),

    settingsNewPassword2: $(`#settingsNewPassword2`),
    settingsNewPassword2ErrorMessageContainer: $(`.settingsNewPassword2ErrorMessageContainer`),
    settingsNewPassword2ErrorMessage: $(`.settingsNewPassword2ErrorMessage`),

    settingsBtn: $(`#settingsBtn`)
};
import $ from 'jquery';

export const els = {

    // REGISTER
    registerErrorMessageContainer: $(`.register__errorMessageContainer`),
    registerErrorMessage: $(`.register__errorMessage`),
    registerForm: $(`#register__form`),
    registerEmail: $(`#register__email`),
    registerPassword: $(`#register__password`),
    registerPassword2: $(`#register__password2`),
    registerBtn: $(`#register__btn`),
    registerToLogin: $(`#register__toLogin`),

    // LOGIN
    loginErrorMessageContainer: $(`.login__errorMessageContainer`),
    loginErrorMessage: $(`.login__errorMessage`),
    loginForm: $(`#login__form`),
    loginEmail: $(`#login__email`),
    loginPassword: $(`#login__password`),
    loginBtn: $(`#login__btn`),

    // HEADER
    brandLink: $(`#brandLink`),

    // ARTWORKS
    items: $(`.items`),
    item: $(`.items__item`),
    itemImg: $(`.items__img`),

    // ARTWORK
    popupItem: $(`#popupItem`),
    popupItemBody: $(`#popupItem__body`),
    itemContainer: $(`.item__container`),

    // ARTWORK > likes
    likes: $(`.likes`),
    likesIcon: $(`.likes__icon`),

    // NAVIGATION > my collection
    collection: $(`#collection`),
    naviCheckbox: $(`.navigation__checkbox`),

    // NAVIGATION > about
    about: $(`#about`),
    popupAbout: $(`#popupAbout`),

    // NAVIGATION > contact
    contact: $(`#contact`),
    popupContact: $(`#popupContact`),

    contactEmail: $(`#contactEmail`),
    contactEmailErrorMessageContainer: $(`.contactEmailErrorMessageContainer`),
    contactEmailErrorMessage: $(`.contactEmailErrorMessage`),

    contactInquiry: $(`#contactInquiry`),
    contactInquiryErrorMessageContainer: $(`.contactInquiryErrorMessageContainer`),
    contactInquiryErrorMessage: $(`.contactInquiryErrorMessage`),

    contactBtn: $(`#contactBtn`),

    // NAVIGATION > settings
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

    settingsBtn: $(`#settingsBtn`),

    // NAVIGATION > logout
    logout: $(`#logout`)
};
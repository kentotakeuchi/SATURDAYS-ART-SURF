import $ from 'jquery';

export const els = {

    // REGISTER
    registerMessageContainer: $(`.register__messageContainer`),
    registerMessage: $(`.register__message`),
    registerForm: $(`#register__form`),
    registerEmail: $(`#register__email`),
    registerPassword: $(`#register__password`),
    registerPassword2: $(`#register__password2`),
    registerBtn: $(`#register__btn`),
    registerToLogin: $(`#register__toLogin`),

    // LOGIN
    loginMessageContainer: $(`.login__messageContainer`),
    loginMessage: $(`.login__message`),
    loginForm: $(`#login__form`),
    loginEmail: $(`#login__email`),
    loginPassword: $(`#login__password`),
    loginBtn: $(`#login__btn`),
    loginToRegister: $(`#login__toRegister`),

    // SEARCH
    searchIcon: $(`.search__icon`),
    popupSearch: $(`#popupSearch`),
    searchInput: $(`#searchInput`),
    searchBtn: $(`#searchBtn`),
    objInput: $(`#objInput`),
    geoInput: $(`#geoInput`),
    dateInput: $(`#dateInput`),
    deptInput: $(`#deptInput`),

    // HEADER
    brandLink: $(`#brandLink`),

    // ARTWORKS
    container: $(`.container`),
    num: $(`.num`),
    items: $(`.items`),
    item: $(`.items__item`),

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


export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
    <div class="${elementStrings.loader}">
        <svg>
            <use href="./asset/img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
    parent.after(loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};
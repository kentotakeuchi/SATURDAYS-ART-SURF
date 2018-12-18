////////////////////////////////////////////////////
import $ from 'jquery';

// BOOTSTRAP OF JAVASCRIPT
import 'bootstrap';

// CUSTOM SCSS
import './sass/style.scss';

// MODELS
import API from './models/API';
import Contact from './models/Contact';
import Likes from './models/Likes';
import Search from './models/Search';
import Settings from './models/Settings';

// VIEWS
import * as apiView from './view/apiView';
import { els, renderLoader, clearLoader } from './view/base';
import * as contactView from './view/contactView';
import * as landingView from './view/landingView';
import * as likesView from './view/likesView';
import * as searchView from './view/searchView';
import * as settingsView from './view/settingsView';
/////////////////////////////////////////////////////


// GLOBAL VARIABLE
const state = {};
const userID = localStorage.getItem('user_id');
const token = localStorage.getItem('token');

$('document').ready(() => {

    getAndRenderItemsHandler();

    setEventHandler();
});

function setEventHandler() {

    // REGISTER FORM
    els.registerEmail.blur(registerCheckHandler);
    els.registerPassword.blur(registerCheckHandler);
    els.registerPassword2.blur(registerCheckHandler);
    els.registerBtn.click(registerUserHandler);
    els.registerToLogin.click(registerToLoginHandler);

    // LOGIN FORM
    els.loginEmail.blur(loginCheckHandler);
    els.loginPassword.blur(loginCheckHandler);
    els.loginBtn.click(loginUserHandler);

    // SEARCH
    els.searchIcon.click(popupSearchModal);
    els.searchBtn.click(searchItemsHandler);
    els.objInput.change(searchItemsHandler);
    els.geoInput.change(searchItemsHandler);
    els.dateInput.change(searchItemsHandler);
    els.deptInput.change(searchItemsHandler);

    // HEADER
    els.brandLink.click(returnDefaultPageHandler);

    // ARTWORKS > display artworks infinitely
    $(window).scroll(pagenationHandler);

    // ARTWORKS > popup an item modal
    els.items.off(`click`, `.items__item`, popupItemModal);
    els.items.on(`click`, `.items__item`, popupItemModal);

    // NAVIGATION > collection
    els.collection.click(displayCollectionHandler);

    // NAVIGATION > about
    els.about.click(popupAboutModal);

    // NAVIGATION > contact
    els.contact.click(popupContactModal);
    setTimeout(() => {
        // TODO: Fix later on.
        els.contactEmail.focus();
    }, 50);
    els.contactEmail.blur(contactCheckHandler);
    els.contactInquiry.blur(contactCheckHandler);
    els.contactBtn.click(contactSendHandler);

    // NAVIGATION > settings
    els.settings.click(popupSettingsModal);
    setTimeout(() => {
        // TODO: Fix later on.
        els.settingsEmail.focus();
    }, 50);
    els.settingsEmail.blur(settingsCheckHandler);
    els.settingsCurPassword.blur(settingsCheckHandler);
    els.settingsNewPassword.blur(settingsCheckHandler);
    els.settingsNewPassword2.blur(settingsCheckHandler);
    els.settingsBtn.click(settingsUpdateHandler);

    // NAVIGATION > logout
    els.logout.click(logout);

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
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('token', user.tokens[0].token);
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
};


///////////////////////////////////////////////
/// MAIN PAGE

// Set loader > get items > render items > clear loader.
function getAndRenderItemsHandler() {

    // Prepare UI for changes
    renderLoader(els.items);

    // Create instance of API.
    state.api = new API();

    // Get items from api to display items.
    state.api.getItems()
    .done(data => {
        console.log(`data`, data);

        // Render search results.
        apiView.renderItems(data);
    })
    .fail(err => {
        console.log(`err`, err);
    });
    // Clear loader.
    clearLoader();
};

// Load new items when user scrolls down to bottom.
function pagenationHandler() {
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {

        getAndRenderItemsHandler();

        els.items.off(`click`, `.items__item`, popupItemModal);
        els.items.on(`click`, `.items__item`, popupItemModal);
     }
};


// Pop up a search modal when user clicks search icon.
function popupSearchModal() {
    els.popupSearch.modal(`toggle`);
};


// Display search results when user clicks search button.
function searchItemsHandler(e) {
    e.preventDefault();

    let query;
    if (e.type === `click`) {
        // 1) Get query from view
        query = searchView.getInput();
    } else if (e.type === `change`) {
        query = e.target.value;
    }

    if (query) {
        state.search = new Search(query);

        // Prepare for rendering search results.
        searchView.clearInput();
        searchView.clearItems();
        searchView.clearNumOfItems();
        renderLoader(els.items);

        // Get search data from db.
        state.search.getSearchItems()
        .done(data => {
            console.log(`data`, data);

            // Render the number of search results.
            searchView.renderNumOfItems(data, query);

            // Render search items.
            searchView.renderItems(data);
        })
        .fail(err => {
            console.log(`err`, err);
        });

        // Disable calling api with scroll down.
        $(window).off(`scroll`, pagenationHandler);

        els.popupSearch.modal(`toggle`);

        // Clear loader.
        clearLoader();
    }
};


function popupItemModal(e) {

    state.likes = new Likes();

    // Get "likes" data from local storage.
    state.likes.readStorage();

    // Prepare for rendering a new artwork.
    apiView.clearArtwork();

    // Get the id of artwork user clicks.
    const id = e.target.id;
    console.log(`id`, id);

    // TODO: Better to use the URL which is previously fetched.
    // Get the item data user clicks.
    state.api.getItem(id)
    .done(data => {
        console.log(`index2 data`, data);

        // Render the item data user clicks.
        apiView.renderItem(data, state.likes.isLiked(id));

        // MEMO: Setting event to SVG with jquery didn't work.
        const likes = document.querySelector(`.likes`);
        likes.addEventListener(`click`, e => {

            if (e.target.matches('.likes__icon, .likes__icon *')) {
                // Like controller
                likesHandler(e);
            }
        });
        els.popupItem.modal(`toggle`);
    })
    .fail(err => {
        console.log(err.responseText);
    });
};


function likesHandler(e) {

    state.likes = new Likes();

    const storage = state.likes.readStorage();

    // Get the id of artwork user clicks.
    let id;
    if (e.target.tagName === `svg`) {
        id = e.target.id;
    } else if (e.target.tagName === `use`) {
        id = e.target.parentElement.id;
    }

    if (state.likes.isLiked(id)) {

        // Delete id from the "this.likes[]" array.
        state.likes.deleteLike(id);

        // Toggle the like button
        likesView.toggleLikeBtn(false);
    } else {

        // Add id in the "this.likes[]" array.
        state.likes.addLike(id);

        // Toggle the like button
        likesView.toggleLikeBtn(true);
    }
};


function returnDefaultPageHandler() {

    // Transfer to a default page.
    window.location.href = `/main.html`;

    // Set the event calling api with scroll down again.
    $(window).on(`scroll`, pagenationHandler);
};


///////////////////////////////////////////////
/// NAVIGATION PAGE

// COLLECTION
function displayCollectionHandler() {

    state.likes = new Likes();

    // Prepare for rendering my collection.
    apiView.clearItems();
    searchView.clearNumOfItems();
    renderLoader(els.items);

    // Get data from "likes" array.
    const storage = state.likes.readStorage();

    // Iterate "likes" array.
    storage.forEach(el => {

        // Get my collection from api.
        state.api.getCollection(el)
        .done(data => {
            // Render my collection.
            apiView.renderCollection(data);
        })
        .fail(err => {
            console.log(`err`, err);
        });
    });

    // Disable calling api with scroll down.
    $(window).off(`scroll`, pagenationHandler);

    // Close navigation.
    els.naviCheckbox.prop( `checked`, false );

    // Clear loader.
    clearLoader();
};

// ABOUT
function popupAboutModal() {
    els.popupAbout.modal(`toggle`);
};



// CONTACT
function popupContactModal() {
    els.popupContact.modal(`toggle`);
};

function contactCheckHandler() {

    state.contact = new Contact();

    // Disable button unless user fills out all input.
    state.contact.inputCheck();

    // Handle rendering error messages.
    contactView.emailValid();
    contactView.inquiryValid();
};


function contactSendHandler(e) {
    e.preventDefault();

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/contact/',
        data: {
            email: els.contactEmail.val(),
            inquiry: els.contactInquiry.val()
        },
        headers: { 'x-access-token': token },
        success: ( msg ) => {
            alert('Your message has been sent successfully.');
            // window.location.href = '/main.html';
        },
        error: ( msg ) => {
            alert('A problem has been occurred while submitting your data.')
        }
    });
};



// SETTINGS
function popupSettingsModal() {

    state.settings = new Settings();

    // Initialize input fields & button.
    settingsView.init();

    // Get user data from db.
    state.settings.getUserData()
    .done(user => {
        // Render current email to input.
        settingsView.renderUserData(user.email);
    })
    .fail(err => {
        alert(err.responseText);
    });

    // Popup settings modal.
    els.popupSettings.modal(`toggle`);
};


function settingsCheckHandler() {

    // Check email format.
    settingsView.emailFormatValid(els.settingsEmail.val());

    // Compare input data with current password.
    state.settings.getCurPassword()
    .done(res => {
        settingsView.compareCurPassword(res);
    })
    .fail(err => {
        settingsView.compareCurPassword(err.responseText);
    });

    // Check new password format.
    settingsView.passwordFormatValid(els.settingsNewPassword.val());

    // Check matching the passwords between pwd1 and pwd2.
    settingsView.checkPasswordsMatch();

    // Controll the button whether it's disable or not.
    state.settings.inputCheck();
};


function settingsUpdateHandler(e) {
    e.preventDefault();

    $.ajax({
        method: `PUT`,
        url: `http://localhost:3000/user/${userID}`,
        data: {
            email: els.settingsEmail.val(),
            curPassword: els.settingsCurPassword.val(),
            newPassword: els.settingsNewPassword.val()
        },
        headers: { 'x-access-token': token },
        success: ( user ) => {
            localStorage.setItem('userEmail', user.email);
            alert(`success`);
            settingsView.init();
        },
        error: ( err ) => {
            alert(`error`);
        }
    });
};



// LOGOUT
function logout() {
    if (confirm("Logout?")) {
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/auth/logout/" + userID,
            headers: { 'x-access-token': token },
            success: () => {
                localStorage.removeItem('user_id');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('token');
                window.location.href = '/index.html';
            }
        });
    }
    return false;
};
////////////////////////////////////////////////////
import $ from 'jquery';

// BOOTSTRAP OF JAVASCRIPT
import 'bootstrap';

// CUSTOM SCSS
import './sass/style.scss';

// MODELS
import API from './models/API';
import Auth from './models/Auth';
import Bg from './models/Bg';
import Contact from './models/Contact';
import Likes from './models/Likes';
import Search from './models/Search';
import Settings from './models/Settings';

// VIEWS
import * as apiView from './view/apiView';
import * as authView from './view/authView';
import { els, renderLoader, clearLoader } from './view/base';
import * as bgView from './view/bgView';
import * as contactView from './view/contactView';
import * as likesView from './view/likesView';
import * as searchView from './view/searchView';
import * as settingsView from './view/settingsView';

import { proxy } from './config';
/////////////////////////////////////////////////////


// GLOBAL VARIABLE
const state = {};
let userID = localStorage.getItem('user_id');
let token = localStorage.getItem('token');

const baseURL = location.hostname === `www.kentotakeuchi.com` ? `http://${location.hostname}/saturdays-art-surf` : `http://localhost:8080`;
console.log('baseURL', baseURL);
console.log(location.hostname);



$('document').ready(() => {

    // LANDING PAGE
    if(window.location.href === `${baseURL}/index.html#` ||
       window.location.href === `${baseURL}/index.html` ||
       window.location.href === `${baseURL}/#` ||
       window.location.href === `${baseURL}/`)
    {
        // Initialize form.
        authView.init();

        // Get images from db and render them on the background.
        getAndRenderBgImgHandler();
    }
    // MAIN PAGE
    else if (window.location.href === `${baseURL}/main.html#` ||
             window.location.href === `${baseURL}/main.html` ||window.location.href === `${baseURL}/main.html#` ||
             window.location.href === `${baseURL}/main.html`)
    {
        // If user signs in with Twitter.
        if (userID === null) {

            state.auth = new Auth();

            state.auth.getAccessTokenTW()
            .done(data => {
                console.log(`getAccessTokenTW`, data);

                state.auth.persistDataTW(data);

                // Set loader > get items > render items > clear loader.
                getAndRenderItemsHandler();
            })
            .fail(err => {
                console.log(`err`, err);
            });
        } else {
            // Set loader > get items > render items > clear loader.
            getAndRenderItemsHandler();
        }
    }

    // Set events.
    setEventHandler();
});


// Set events.
function setEventHandler() {

    // REGISTER FORM
    els.registerEmail.keyup(registerCheckHandler);
    els.registerPassword.keyup(registerCheckHandler);
    els.registerPassword2.keyup(registerCheckHandler);
    els.registerBtn.click(registerUserHandler);
    els.registerToLogin.click(registerToLoginHandler);

    // LOGIN FORM
    els.loginTW.click(loginWithTWHandler);
    els.loginFB.click(loginWithFBHandler);
    els.loginEmail.keyup(loginCheckHandler);
    els.loginPassword.keyup(loginCheckHandler);
    els.loginBtn.click(loginUserHandler);
    els.loginToRegister.click(loginToRegisterHandler);

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
    els.contactEmail.keyup(contactCheckHandler);
    els.contactInquiry.keyup(contactCheckHandler);
    els.contactBtn.click(contactSendHandler);

    // NAVIGATION > settings
    els.settings.click(popupSettingsModal);
    setTimeout(() => {
        // TODO: Fix later on.
        els.settingsEmail.focus();
    }, 50);
    els.settingsEmail.keyup(settingsCheckHandler);
    els.settingsCurPassword.blur(settingsCheckHandler);
    els.settingsNewPassword.keyup(settingsCheckHandler);
    els.settingsNewPassword2.keyup(settingsCheckHandler);
    els.settingsBtn.click(settingsUpdateHandler);

    // NAVIGATION > logout
    els.logout.click(logout);
};


///////////////////////////////////////////////
/// LANDING PAGE

// Get images from db and render them on the background.
function getAndRenderBgImgHandler() {

    state.bg = new Bg();

    state.bg.getImg()
    .done(data => {
        console.log(`data`, data);
        bgView.renderImg(data);
    })
    .fail(err => {
        console.log(`err`, err);
        bgView.renderErrMsg(err);
    });
};


// Register an user.
function registerUserHandler(e) {
    e.preventDefault();

    const str = `register`;

    state.auth.registerUser()
    .done(( msg ) => {

        // Display success msg.
        authView.renderSuccessMsg(str);

        setTimeout(() => {
            registerToLoginHandler();
        }, 2000);
    })
    .fail(( err ) => {
        authView.renderErrMsg(str, err);
    });
};


// REGISTER > LOGIN
function registerToLoginHandler() {

    // Clear all value.
    authView.init();

    // Clear register form.
    authView.clearRegisterForm();

    // Display login form.
    authView.renderLoginForm();
};


// Login an user.
function loginUserHandler(e) {
    e.preventDefault();

    const str = `login`;

    state.auth = new Auth();

    state.auth.loginUser()
    .done(( user ) => {
        console.log(`user`, user);

        // Store data of "user_id", "email" and "token" to local storage.
        state.auth.persistData(user);

        // Display success msg.
        authView.renderSuccessMsg(str);

        setTimeout(() => {
            window.location.href = `${baseURL}/main.html`;
        }, 2000);
    })
    .fail(( err ) => {
        authView.renderErrMsg(str, err);
    });
};


// LOGIN > REGISTER
function loginToRegisterHandler() {

    // Clear all value.
    authView.init();

    // Clear login form.
    authView.clearLoginForm();

    // Display register form.
    authView.renderRegisterForm();
};

// Validation of register. (no mvc)
function registerCheckHandler() {

    state.auth = new Auth();

    state.auth.registerCheck();
};


// Validation of login. (no mvc)
function loginCheckHandler() {

    state.auth = new Auth();

    state.auth.loginCheck();
};


function loginWithTWHandler() {

    state.auth = new Auth();

    state.auth.getReqTokenTW()
    .done(data => {
        window.location.href = data.url;
    })
    .fail(err => {
        console.log(`err`, err);
    });
};


function loginWithFBHandler() {
    console.log(`facebook`);
    state.auth = new Auth();

    state.auth.getTokenFB()
    .done(data => {
        console.log(`data`, data);
    })
    .fail(err => {
        console.log(`err`, err);
    });
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

        // Clear loader.
        clearLoader();
    })
    .fail(err => {
        console.log(`err`, err);

        // Clear loader.
        clearLoader();
    });
};


// Load new items when user scrolls down to bottom.
function pagenationHandler() {
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {

        // Set loader > get items > render items > clear loader.
        getAndRenderItemsHandler();

        els.items.off(`click`, `.items__item`, popupItemModal);
        els.items.on(`click`, `.items__item`, popupItemModal);
     }
};


// Pop up a search modal when user clicks search icon.
function popupSearchModal() {

    state.search = new Search();

    state.search.getList()
    .done(data => {
        searchView.renderQueries(data);
    })
    .fail(err => {
        console.log(`err`, err);
    });

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
        searchView.init();
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

            // Clear loader.
            clearLoader();
        })
        .fail(err => {
            console.log(`err`, err);

            // Clear loader.
            clearLoader();
        });

        // Disable calling api with scroll down.
        $(window).off(`scroll`, pagenationHandler);

        els.popupSearch.modal(`toggle`);
    }
};


// Pop up an item modal when user clicks each image.
function popupItemModal(e) {

    state.likes = new Likes();

    // Get "likes" data from local storage.
    state.likes.readStorage();

    // Prepare for rendering a new artwork.
    apiView.clearArtwork();
    renderLoader(els.popupItemBody);

    // Get the id of artwork user clicks.
    const id = e.target.id;
    console.log(`id`, id);

    // Get the item data user clicks.
    state.api.getItemDB(id)
    .done(data => {
        console.log(`index2 data`, data);

        // Render the item data user clicks.
        apiView.renderItem(data, state.likes.isLiked(id));

        // Render additional images if there are.
        apiView.renderAddImg(data);

        // MEMO: Setting event to SVG with jquery didn't work.
        const likes = document.querySelector(`.likes`);
        likes.addEventListener(`click`, e => {

            if (e.target.matches('.likes__icon, .likes__icon *')) {
                // Like controller
                likesHandler(e);
            }
        });
        els.popupItem.modal(`toggle`);

        // Clear loader.
        clearLoader();
    })
    .fail(err => {
        console.log(err.responseText);

        // Clear loader.
        clearLoader();
    });

    // Set click event for additional image.
    els.popupItemBody.off(`click`, `.item__additionalImages`, itemAddImgHandler);
    els.popupItemBody.on(`click`, `.item__additionalImages`, itemAddImgHandler);
};


// Change a main image user clicks.
function itemAddImgHandler(e) {
    // Change current image into the image user clicks.
    apiView.changeMainImg(e);
};


// LIKES CONTROLLER
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


// Move to default page.
function returnDefaultPageHandler() {

    // Transfer to a default page.
    window.location.href = `${baseURL}/main.html`;

    // Set the event calling api with scroll down again.
    $(window).on(`scroll`, pagenationHandler);
};

///////////////////////////////////////////////
/// NAVIGATION PAGE

// COLLECTION CONTROLLER
function displayCollectionHandler() {

    state.likes = new Likes();

    // Prepare for rendering my collection.
    apiView.clearItems();
    searchView.clearNumOfItems();
    renderLoader(els.items);

    // Get data from "likes" array.
    const storage = state.likes.readStorage();

    if (storage === null) {
        alert(`Let's collect your favorite artworks.`);
    } else {
        // Iterate "likes" array.
        storage.forEach(el => {

            // Get my collection from api.
            state.api.getCollection(el)
            .done(data => {
                // Render my collection.
                apiView.renderCollection(data);

                // Clear loader.
                clearLoader();
            })
            .fail(err => {
                console.log(`err`, err);

                // Clear loader.
                clearLoader();
            });
        });

        // Disable calling api with scroll down.
        $(window).off(`scroll`, pagenationHandler);

        // Close navigation.
        els.naviCheckbox.prop( `checked`, false );
    }
};


// ABOUT
function popupAboutModal() {
    els.popupAbout.modal(`toggle`);
};


// CONTACT
function popupContactModal() {
    els.popupContact.modal(`toggle`);

    // Initialize all value.
    contactView.init();
};


// Validation of contact form.
function contactCheckHandler() {

    state.contact = new Contact();

    // Disable button unless user fills out all input.
    state.contact.inputCheck();

    // Handle rendering error messages.
    contactView.emailValid();
    contactView.inquiryValid();
};


// Submit contact form.
function contactSendHandler(e) {
    e.preventDefault();

    state.contact.contactSend()
    .done(msg => {
        contactView.renderMsg(msg);
    })
    .fail(err => {
        contactView.renderMsg(err);
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
        settingsView.renderUserData(user);
    })
    .fail(err => {
        alert(err.responseText);
    });

    // Popup settings modal.
    els.popupSettings.modal(`toggle`);
};


// Validation of settings form.
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


// Submit updated info.
function settingsUpdateHandler(e) {
    e.preventDefault();

    state.settings.updateUserData()
    .done(user => {
        state.settings.persistData(user);
        settingsView.renderSuccessMsg();
        settingsView.init();
    })
    .fail(err => {
        settingsView.renderErrMsg(err);
    });
};


// LOGOUT
function logout() {

    if (confirm(`Logout?`)) {

        state.auth = new Auth();

        state.auth.logoutUser()
        .done(() => {
            state.auth.removeData();
            window.location.href = `${baseURL}/index.html`;
        })
        .fail(err => {
            authView.renderErrMsg2(err);
        });
    }
    return false;
};
import $ from 'jquery';

import { els } from '../view/base';

let userID = localStorage.getItem('user_id');
let token = localStorage.getItem('token');

var port = location.hostname === 'localhost' ? ':3000' : '';
var saturdays_art_baseURL = 'http://' + location.hostname + port + '/api';
console.log(`saturdays_art_baseURL`, saturdays_art_baseURL);


export default class Settings {

    constructor() {
    }

    getUserData() {

        userID = localStorage.getItem('user_id');
        token = localStorage.getItem('token');

        return $.ajax({
            method: "GET",
            url: `${saturdays_art_baseURL}/user/${userID}`,
            headers: { 'x-access-token': token }
        });
    }

    inputCheck() {
        // Check whether there are empty input or not.
        const inValid =
            els.settingsEmail.val() === `` ||
            els.settingsCurPassword.val() === `` ||
            els.settingsNewPassword.val() === `` ||
            els.settingsNewPassword2.val() === ``;
        // Check whether there are error messages or not.
        const inValid2 = els.popupSettings.has(`.dangerColor`).length > 0;

        if (inValid || inValid2) {
            els.settingsBtn.prop('disabled', true);
        } else {
            els.settingsBtn.prop('disabled', false);
        }
    }

    getCurPassword() {

        return $.ajax({
            method: 'POST',
            url: `${saturdays_art_baseURL}/user/${userID}`,
            data: {
                password: els.settingsCurPassword.val()
            },
            headers: { 'x-access-token': token }
        });
    }

    updateUserData() {

        return $.ajax({
            method: `PUT`,
            url: `${saturdays_art_baseURL}/user/${userID}`,
            data: {
                email: els.settingsEmail.val(),
                curPassword: els.settingsCurPassword.val(),
                newPassword: els.settingsNewPassword.val()
            },
            headers: { 'x-access-token': token }
        });
    }

    persistData(user) {
        localStorage.setItem('userEmail', user.email);
    }
};
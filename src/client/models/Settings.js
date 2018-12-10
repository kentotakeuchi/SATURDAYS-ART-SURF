import $ from 'jquery';

import { els } from '../view/base';

const userID = localStorage.getItem('user_id');
const token = localStorage.getItem('token');


export default class Settings {

    constructor() {
    }

    getUserData() {
        return $.ajax({
            method: "GET",
            url: `http://localhost:3000/user/${userID}`,
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
            url: `http://localhost:3000/user/${userID}`,
            data: {
                password: els.settingsCurPassword.val()
            },
            headers: { 'x-access-token': token }
        });
    }
};
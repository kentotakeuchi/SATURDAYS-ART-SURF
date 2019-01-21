import $ from 'jquery';
import { els } from '../view/base';

let token = localStorage.getItem('token');

var port = location.hostname === 'localhost' ? ':3000' : '';
var saturdays_art_baseURL = 'http://' + location.hostname + port + '/api';
console.log(`saturdays_art_baseURL`, saturdays_art_baseURL);


export default class Contact {

    constructor() {
    }

    contactSend() {

        token = localStorage.getItem('token');

        return $.ajax({
            method: 'POST',
            url: `${saturdays_art_baseURL}/contact/`,
            data: {
                email: els.contactEmail.val(),
                inquiry: els.contactInquiry.val()
            },
            headers: { 'x-access-token': token }
        });
    }

    inputCheck() {

        const inValid =
            els.contactEmail.val() === `` ||
            els.contactInquiry.val() === ``;

        if (inValid) {
            els.contactBtn.prop('disabled', true);
        } else {
            els.contactBtn.prop('disabled', false);
        }
    }
};




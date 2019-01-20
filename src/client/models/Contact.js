import $ from 'jquery';
import { els } from '../view/base';


let token = localStorage.getItem('token');

export default class Contact {

    constructor() {
    }

    contactSend() {

        token = localStorage.getItem('token');

        return $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/api/contact/',
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




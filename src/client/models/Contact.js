import $ from 'jquery';
import { els } from '../view/base';


const token = localStorage.getItem('token');

export default class Contact {

    constructor() {
    }

    contactSend() {

        return $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/contact/',
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




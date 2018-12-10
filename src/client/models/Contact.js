import { els } from '../view/base';


export default class Contact {

    constructor() {
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




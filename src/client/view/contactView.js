import { els } from './base';

export const emailValid = () => {
    const inValid = els.contactEmail.val() === ``;

    if (inValid) {
        console.log(`here1`);

        els.contactEmailErrorMessageContainer.addClass('dangerColor');
        els.contactEmailErrorMessage.html('Please fill out something');
        els.contactEmailErrorMessageContainer.css('display', 'block');
    } else {
        clearEmailErrorMessages();
    }
};

export const inquiryValid = () => {
    const inValid = els.contactInquiry.val() === ``;

    if (inValid) {
        console.log(`here2`);

        els.contactInquiryErrorMessageContainer.addClass('dangerColor');
        els.contactInquiryErrorMessage.html('Please fill out something');
        els.contactInquiryErrorMessageContainer.css('display', 'block');
    } else {
        clearInquiryErrorMessages();
    }
};

function clearEmailErrorMessages() {

    els.contactEmailErrorMessageContainer.removeClass('dangerColor');
    els.contactEmailErrorMessage.html('');
    els.contactEmailErrorMessageContainer.css('display', 'none');
};

function clearInquiryErrorMessages() {

    els.contactInquiryErrorMessageContainer.removeClass('dangerColor');
    els.contactInquiryErrorMessage.html('');
    els.contactInquiryErrorMessageContainer.css('display', 'none');
};


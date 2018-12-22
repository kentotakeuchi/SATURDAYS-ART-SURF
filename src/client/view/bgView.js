import { els } from './base';


export const renderImg = data => {

    for (let i = 0; i < 15; i++) {

        const markup = `
            <img src="${data[i].primaryImageSmall}" class="bg__img">
        `;
        els.bgImgCtn.append(markup);
    }

    for (let i = 15; i < 30; i++) {

        const markup = `
            <img src="${data[i].primaryImageSmall}" class="bg__img">
        `;
        els.bgImgCtn2.append(markup);
    }

    for (let i = 30; i < 45; i++) {

        const markup = `
            <img src="${data[i].primaryImageSmall}" class="bg__img">
        `;
        els.bgImgCtn3.append(markup);
    }
};


export const renderErrMsg = err => {
    alert(`Error getting items.`);
};
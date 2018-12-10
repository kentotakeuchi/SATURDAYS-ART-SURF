import $ from 'jquery';
import { els } from './base';


export const clearArtwork = () => {
    $(`.item__container`).remove();
};

export const renderArtwork = data => {
    console.log(`data`, data);

    const markup = `
        <div class="item__container">
            <img src="${data.primaryImage}" class="item__primaryImage">
            <div class="item__title">Title: ${data.title}</div>
            <div class="item__artistDisplayName item__artistDate">Artist name: ${data.artistDisplayName}(${data.artistBeginDate} - ${data.artistEndDate})</div>
            <div class="item__artistNationality">Artist nationality: ${data.artistNationality}</div>
            <a href="${data.objectURL}">Do you want to know more?</a>
        </div>
    `;
    els.popupItemBody.append(markup);
};


/*
export const renderArtworks = data => {

    console.log('data', data);

    const id = data.objectID;

    if (data.primaryImage !== ``) {
        const markup = `
            <img src="${data.primaryImage}" class="item" id="${id}"></img>
        `;
        els.items.append(markup);
    }
};
*/

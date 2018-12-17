import $ from 'jquery';
import { els } from './base';

// TODO: change name to item
export const clearArtwork = () => {
    $(`.item__container`).remove();
};

export const clearItems = () => {
    els.items.children().remove();
};

export const renderItem = (data) => {

    if (data.primaryImageSmall !== ``) {
        const markup = `
            <div class="items__item" id="${data.objectID}" data-title="${data.title}">
                <img src="${data.primaryImageSmall}" class="items__img">
            </div>
        `;
        $(`.items`).append(markup);
    }
};

// TODO: change name to item
export const renderArtwork = (data, isLiked) => {

    // Display "unknown" when there are no data.
    let artistName = data.artistDisplayName === `` ? `unknown` : data.artistDisplayName;
    let artistNationality = data.artistNationality === `` ? `unknown` : data.artistNationality;

    // TODO: Fix styling of textarea.
    const markup = `
        <div class="item__container">

            <div class="likes">
                <div class="likes__field">
                    <svg class="likes__icon" id="${data.objectID}">
                        <use href="./asset/img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                    </svg>
                </div>
            </div>

            <img src="${data.primaryImage}" class="item__primaryImage">

            <div class=item__container--text>
                <div class="item__title">Title: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="item__text--strong">${data.title}</span></div>

                <div class="item__artistDisplayName item__artistDate">Artist name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="item__text--strong">${artistName} (${data.artistBeginDate} - ${data.artistEndDate})</span></div>

                <div class="item__artistNationality">Artist nationality: &nbsp;&nbsp;<span class="item__text--strong">${artistNationality}</span></div>
                <br>
                <a href="${data.objectURL}" class="item__objectURL">Do you want to know more?</a>
            </div>
        </div>
    `;
    els.popupItemBody.append(markup);
};

export const renderCollection = data => {

    if (data.primaryImageSmall !== ``) {
        const markup = `
            <div class="items__item" id="${data.objectID}" data-title="${data.title}">
                <img src="${data.primaryImageSmall}" class="items__img">
            </div>
        `;
        $(`.items`).append(markup);
    }
};

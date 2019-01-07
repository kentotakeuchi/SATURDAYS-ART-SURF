import $ from 'jquery';
import { els } from './base';

// TODO: change name to item
export const clearArtwork = () => {
    $(`.item__container`).remove();
};

export const clearItems = () => {
    els.items.children().remove();
};

// Render items data for "main page".
export const renderItems = (data) => {

    data.forEach(el => {
        const markup = `
            <div class="items__item" id="${el.objectID}" data-title="${el.title}">
                <img src="${el.primaryImageSmall}" class="items__img">
            </div>
        `;
        els.items.append(markup);
    });
};

// Render an item's data for "popupItemModal".
export const renderItem = (data, isLiked) => {

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

            <div class="item__addImg--container u-margin-bottom-small"></div>

            <div class=item__container--text>
                <div class="item__text--key">
                    <div class="item__title">Title:</div>
                    </div>
                <div class="item__text--val">
                    <div class="item__text--strong">${data.title}</div>
                </div>
            </div>

            <div class=item__container--text>
                <div class="item__text--key">
                    <div class="item__artistDisplayName item__artistDate">Artist name:</div>
                    </div>
                <div class="item__text--val">
                    <div class="item__text--strong">${artistName} (${data.artistBeginDate} - ${data.artistEndDate})</div>
                </div>
            </div>

            <div class=item__container--text>
                <div class="item__text--key">
                    <div class="item__artistNationality">Artist nationality:</div>
                    </div>
                <div class="item__text--val">
                    <div class="item__text--strong">${artistNationality}</div>
                </div>
            </div>

                <br>
                <a href="${data.objectURL}" class="item__objectURL">Do you want to know more?</a>
            </div>
        </div>
    `;
    els.popupItemBody.append(markup);
};

// Render additional images if there are.
export const renderAddImg = data => {

    const imgArr = data.additionalImages;

    // Include a primary image.
    const mainImg = data.primaryImage;
    imgArr.unshift(mainImg);

    imgArr.forEach(el => {

        const markup = `
            <img src="${el}" class="item__additionalImages">
        `;
        $(`.item__addImg--container`).append(markup);
    });
};

// Change current image into the image user clicks.
export const changeMainImg = e => {
    const curSrc = e.target.src;

    $(`.item__primaryImage`).attr(`src`, curSrc);
};

// Render collection's data for "my collection".
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

import $ from 'jquery';
import { els } from './base';


export const clearArtwork = () => {
    $(`.item__container`).remove();
};

export const renderArtwork = (data, isLiked) => {
    console.log(`data`, data);
    console.log(`isLiked`, isLiked);

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

                <div class="item__artistDisplayName item__artistDate">Artist name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="item__text--strong">${data.artistDisplayName} (${data.artistBeginDate} - ${data.artistEndDate})</span></div>

                <div class="item__artistNationality">Artist nationality: &nbsp;&nbsp;<span class="item__text--strong">${data.artistNationality}</span></div>
                <br>
                <a href="${data.objectURL}" class="item__objectURL">Do you want to know more?</a>
            </div>
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

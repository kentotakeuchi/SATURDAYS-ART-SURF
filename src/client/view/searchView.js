import $ from 'jquery';
import { els } from './base';


export const getInput = () => els.searchInput.val();

export const clearInput = () => {
    els.searchInput.val(``);
};

export const clearItems = () => {
    els.items.children().remove();
};

export const renderItems = (data) => {

    if (data.primaryImageSmall !== ``) {
        const markup = `
            <div class="items__item" id="${data.objectID}" data-title="${data.title}">
                <img src="${data.primaryImageSmall}" class="items__img">
            </div>
        `;
        $(`.items`).append(markup);
    }
};

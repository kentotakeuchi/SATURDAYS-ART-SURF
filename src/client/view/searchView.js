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
    console.log(`data`, data);

    data.forEach(el => {
        if (el.primaryImageSmall !== ``) {
            const markup = `
                <div class="items__item" id="${el.objectID}" data-title="${el.title}">
                    <img src="${el.primaryImageSmall}" class="items__img">
                </div>
            `;
            $(`.items`).append(markup);
        }
    });

};

import $ from 'jquery';
import { els } from './base';


export const getInput = () => els.searchInput.val();


export const init = () => {
    els.searchInput.val(``);
    els.objInput.val($("#objInput option:first").val());
    els.geoInput.val($("#geoInput option:first").val());
    els.dateInput.val($("#dateInput option:first").val());
    els.deptInput.val($("#deptInput option:first").val());
};


export const clearItems = () => {
    els.items.children().remove();
};


export const clearNumOfItems = () => {
    const prevResult = els.container.has(`.num`);
    if (prevResult) {
        $(`.num`).remove();
    }
};


export const renderNumOfItems = (data, query) => {

    const markup = `
        <div class="num">
            <div>
                ${data.length} results for "<span class="item__text--strong">${query}</span>"
            </div>
        </div>
    `;
    els.container.prepend(markup);
};


export const renderQueries = data => {

    const objArr = data[0].objQueries;
    const geoArr = data[0].geoQueries;
    const dateArr = data[0].dateQueries;
    const deptArr = data[0].deptQueries;

    objArr.forEach(el => {
        const markup = `
            <option>${el}</option>
        `;
        els.objInput.append(markup);
    });

    geoArr.forEach(el => {
        const markup = `
            <option>${el}</option>
        `;
        els.geoInput.append(markup);
    });

    dateArr.forEach(el => {
        const markup = `
            <option>${el}</option>
        `;
        els.dateInput.append(markup);
    });

    deptArr.forEach(el => {
        const markup = `
            <option>${el}</option>
        `;
        els.deptInput.append(markup);
    });
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





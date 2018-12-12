import $ from 'jquery';
import { proxy } from '../config';


export default class API {

    constructor() {
    }

    getResults() {

        const date = formatDate(new Date());

        $.ajax({
            method: "GET",
            url: `${proxy}https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=${date}`,
            success: (data) => {
                console.log(`data`, data);

                const ids = data.objectIDs;

                for(let i = 0; i < 10; i++) {
                    const index = Math.floor(Math.random() * ids.length);

                    const id = ids[index];

                    $.ajax({
                        method: "GET",
                        url: `${proxy}https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
                        success: (data) => {

                            if (data.primaryImage !== ``) {
                                const markup = `
                                    <div class="items__item" id="${id}" data-title="${data.title}">
                                        <img src="${data.primaryImage}" class="items__img">
                                    </div>
                                `;
                                $(`.items`).append(markup);
                            }
                        },
                        error: (err) => {
                            console.log(`err`, err);
                        }
                    });
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    getResult(id) {

        return $.ajax({
            method: "GET",
            url: `${proxy}https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        });
    }

    getAndRenderCollection(storage) {

        storage.forEach(el => {

            $.ajax({
                method: "GET",
                url: `${proxy}https://collectionapi.metmuseum.org/public/collection/v1/objects/${el}`,
                success: (data) => {
                    const markup = `
                        <div class="items__item" id="${data.objectID}" data-title="${data.title}">
                            <img src="${data.primaryImage}" class="items__img">
                        </div>
                    `;
                    $(`.items`).append(markup);
                },
                error: (err) => {
                    console.log(`err`, err);
                }
            });
        });
    }
};

function formatDate(date) {

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    if (month < 9 && day < 10) {
        return `${year}-0${month + 1}-0${day}`;
    } else if (month < 9 && day >= 10) {
        return `${year}-0${month + 1}-${day}`;
    } else if (month >= 9 && day < 10) {
        return `${year}-${month + 1}-0${day}`;
    } else if (month >= 9 && day >= 10) {
        return `${year}-${month + 1}-${day-1}`;
    }
};

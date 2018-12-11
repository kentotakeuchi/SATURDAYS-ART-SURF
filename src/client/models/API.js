import $ from 'jquery';
import { proxy } from '../config';


export default class API {

    constructor() {
    }

    getResults() {

        const date = formatDate(new Date());

        $.ajax({
            method: "GET",
            url: `https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=${date}`,
            success: (data) => {
                console.log('data', data);
                console.log('data.objectIDs', data.objectIDs);

                const ids = data.objectIDs;

                for(let i = 0; i < 10; i++) {
                    const index = Math.floor(Math.random() * ids.length);
                    console.log(`index`, index);

                    const id = ids[index];
                    console.log(`id`, id);

                    $.ajax({
                        method: "GET",
                        url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
                        success: (data) => {
                            console.log('data', data);

                            if (data.primaryImage !== ``) {
                                const markup = `
                                    <img src="${data.primaryImage}" class="items__item" id="${id}"></img>
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
            url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
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

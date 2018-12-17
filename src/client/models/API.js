import $ from 'jquery';
import { proxy } from '../config';


export default class API {

    constructor() {
    }

    // Get today's id of items.
    getIds() {

        const date = formatDate(new Date());

        return $.ajax({
            method: "GET",
            url: `${proxy}https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=${date}`
        });
    }

    // Get whole ids.
    getIds2() {

        return $.ajax({
            method: "GET",
            url: `${proxy}https://collectionapi.metmuseum.org/public/collection/v1/objects`
        });
    }

    // Get an item's data at random.
    getItems(ids) {

        const index = Math.floor(Math.random() * ids.length);

        const id = ids[index];

        return $.ajax({
            method: "GET",
            url: `${proxy}https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        });
    }

    // Get an item's data.
    getItem(id) {

        return $.ajax({
            method: "GET",
            url: `${proxy}https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        });
    }

    // TODO: probably, I can reuse "getItem(id)".
    // Get my collection.
    getCollection(el) {

        return $.ajax({
            method: "GET",
            url: `${proxy}https://collectionapi.metmuseum.org/public/collection/v1/objects/${el}`
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
        return `${year}-${month + 1}-${day-2}`;
    }
};

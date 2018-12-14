import $ from 'jquery';
import { proxy } from '../config';


export default class Search {

    constructor(query) {
        this.query = query;
    }

    getSearchIds() {

        const date = formatDate(new Date());

        return $.ajax({
            method: "GET",
            url: `${proxy}https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=${date}`
        });
    }

    getSearchResults(ids) {

        const index = Math.floor(Math.random() * ids.length);

        const id = ids[index];

        return $.ajax({
            method: "GET",
            url: `${proxy}https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
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

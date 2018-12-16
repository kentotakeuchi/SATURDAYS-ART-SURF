import $ from 'jquery';
import { proxy } from '../config';

const token = localStorage.getItem('token');


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

    getSearchItems() {

        return $.ajax({
            method: "GET",
            url: `http://localhost:3000/item/search/${this.query}`,
            headers: { 'x-access-token': token }
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

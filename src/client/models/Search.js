import $ from 'jquery';
import { proxy } from '../config';

const token = localStorage.getItem('token');


export default class Search {

    constructor(query) {
        this.query = query;
    }

    getSearchItems() {

        return $.ajax({
            method: "GET",
            url: `http://localhost:3000/item/search/${this.query}`,
            headers: { 'x-access-token': token }
        });
    }
};

import $ from 'jquery';
import { proxy } from '../config';

const token = localStorage.getItem('token');


export default class Search {

    constructor(query) {
        this.query = query;
    }

    getList() {

        return $.ajax({
            method: "GET",
            url: `http://localhost:3000/query/list`,
            headers: { 'x-access-token': token }
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

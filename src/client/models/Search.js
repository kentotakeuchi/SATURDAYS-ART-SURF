import $ from 'jquery';
import { proxy } from '../config';

let token = localStorage.getItem('token');

var port = location.hostname === 'localhost' ? ':3000' : '';
var saturdays_art_baseURL = 'http://' + location.hostname + port + '/api';
console.log(`saturdays_art_baseURL`, saturdays_art_baseURL);


export default class Search {

    constructor(query) {
        this.query = query;
    }

    getList() {

        token = localStorage.getItem('token');

        return $.ajax({
            method: "GET",
            url: `${saturdays_art_baseURL}/query/list`,
            headers: { 'x-access-token': token }
        });
    }

    getSearchItems() {

        return $.ajax({
            method: "GET",
            url: `${saturdays_art_baseURL}/item/search/${this.query}`,
            headers: { 'x-access-token': token }
        });
    }
};

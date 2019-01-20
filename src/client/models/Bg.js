import $ from 'jquery';
import { els } from '../view/base';

var port = location.hostname === 'localhost' ? ':3000' : '';
var saturdays_art_baseURL = 'http://' + location.hostname + port + '/api';
console.log(`saturdays_art_baseURL`, saturdays_art_baseURL);

export default class Bg {

    constructor() {}

    getImg() {

        return $.ajax({
            method: "GET",
            url: `${saturdays_art_baseURL}/item`
        });
    }
};
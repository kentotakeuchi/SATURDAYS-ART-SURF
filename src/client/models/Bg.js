import $ from 'jquery';
import { els } from '../view/base';

const userID = localStorage.getItem('user_id');
const token = localStorage.getItem('token');

export default class Bg {

    constructor() {}

    getImg() {

        return $.ajax({
            method: "GET",
            url: `http://localhost:3000/item`,
            headers: { 'x-access-token': token }
        });
    }
};
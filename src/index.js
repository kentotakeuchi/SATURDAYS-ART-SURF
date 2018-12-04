import $ from 'jquery';
// BootstrapのJavaScript側の機能を読み込む
import 'bootstrap';

// import文を使ってSassファイルを読み込む。
import './style.scss';

import API from './model/apiTest';

const state = {};

$('document').ready(function() {

    state.api = new API();

    state.api.getResults();
});
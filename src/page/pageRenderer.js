import $ from 'jquery';
import pageGenerator from './pageGenerator';
import store from '../data/localStore';

let buildPage = function () {
  $('#container').html(`<section id="contentbox"></section>
    <footer id="messagebox"></footer>`);
};

let render = function (renderState) {
  let scroll = $('main #bookmark-container').scrollTop(); // Fix scroll

  $('#contentbox').html(pageGenerator.updatePageState(renderState));

  $('main #bookmark-container').scrollTop(scroll); // Fix scroll issue
  $('#sort-item-button').val(store.sort); // Fix sort-display issue
};

let renderMessage = function (message, err) {
  $('#messagebox').html(pageGenerator.generateMessageBox(message, err));
};

export default {
  render,
  renderMessage,
  buildPage,
};

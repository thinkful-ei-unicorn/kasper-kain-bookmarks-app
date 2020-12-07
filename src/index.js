require('./styles/base.css');
require('./styles/bookmark.css');
require('./styles/message.css');
require('./styles/create.css');
require('./styles/anim.css');
require('./styles/title.css');
require('./styles/query.css');

import 'normalize.css';
import $ from 'jquery';
import store from './data/localStore';
import pageRenderer from './page/pageRenderer';
import eventHandler from './eventHandler';
import audio from './audio/audio';

/*
toggleSoundHandler,
  startAppHandler,
  bookMarkExpandHandler,
  deleteItemHandler,
  cancelAddItemHandler,
  addItemHandler,
  newItemHandler,
*/

const main = function () {
  pageRenderer.buildPage();
  store.updateItemDataBase().then(() => {
    eventHandler.toggleSoundHandler();
    eventHandler.startAppHandler();
    eventHandler.bookMarkExpandHandler();
    eventHandler.deleteItemHandler();
    eventHandler.sortItemHandler();
    eventHandler.cancelAddItemHandler();
    eventHandler.addItemHandler();
    eventHandler.newItemHandler();
    audio.PausePlayUserNav();
    pageRenderer.render(2);
  });
};

$(main);

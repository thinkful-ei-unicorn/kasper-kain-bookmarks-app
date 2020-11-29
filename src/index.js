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

const main = function () {
  pageRenderer.buildPage();
  store.updateItemDataBase().then(() => {
    eventHandler.handleTransitionEvents();
    eventHandler.handleSubmitEvents();
    eventHandler.handleBookmarkEvents();
    eventHandler.handleTitleEvents();
    audio.PausePlayUserNav();
    pageRenderer.render(2);
  });
};

$(main);

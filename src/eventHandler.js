//#region IMPORTS
import store from './data/localStore';

import $ from 'jquery';
import pageRenderer from './page/pageRenderer';
import persistentStore from './data/persistentStore';
import errorChecker from './errorChecker';
import messageLogger from './message/messageLogger';
import audio from './audio/audio.js';
import animator from './animator.js';

const getIdFromElement = function (el) {
  return $(el).closest('.bookmark').attr('id');
};

//#endregion

//#region HANDLES EVENTS THAT TRANSITION TO A NEW STATE
const handleTransitionEvents = function () {
  $('main').on('click', '#new-item-button', (e) => {
    e.preventDefault();

    audio.playSound(1);
    pageRenderer.render(1);
  });
  $('main').on('click', '#cancel-item-button', (e) => {
    e.preventDefault();

    audio.playSound(2);
    pageRenderer.render(0);
  });
};

//#endregion

//#region HANDLES EVENTS THAT SUBMIT DATA AND THEN TRANSITION
const handleSubmitEvents = function () {
  $('main').on('submit', '#item-custom', (e) => {
    e.preventDefault();

    let itemName = $('main input[name="item-name"]').val();
    let itemURL = $('main input[name="item-URL"]').val();
    let itemDesc = $('main textarea').val();
    let itemRating = $('main input[name="item-rating"]').val();

    let error = errorChecker.checkErrors(
      [
        itemName === '',
        itemURL === '',
        !itemURL.includes('https://') && !itemURL.includes('http://'),
      ],
      [
        'Title field cannot be empty',
        'URL field cannot be empty',
        'URL field must contain http(s)://',
      ]
    );

    if (!error) {
      let newItem = {
        title: itemName,
        url: itemURL,
        desc: itemDesc,
        rating: itemRating,
      };

      //pageRenderer.renderMessage('new_bookmark');
      messageLogger.logMessage('new_bookmark');

      persistentStore
        .addItem(newItem)
        .then(() => store.updateItemDataBase())
        .then(() => pageRenderer.render(0));
      audio.playSound(3);
      animator.playOneShot($('body'), 'white-flash');
      animator.playOneShot($('main'), 'shake');
      animator.playFaceOneShot(2);
    } else {
      audio.playSound(4);
    }
  });
};

//#endregion

//#region HANDLES EVENTS RELATED TO THE BOOKMARK ITEMS

const handleBookmarkEvents = function () {
  $('main').on('click', '.bookmark-titlebar', (e) => {
    let id = getIdFromElement(e.currentTarget);
    store.findItem(id).expanded = !store.findItem(id).expanded;

    pageRenderer.render(0);

    if (store.findItem(id).expanded) {
      messageLogger.logMessage('expand-bookmark');
      audio.playSound(1);
    } else {
      audio.playSound(2);
    }
  });

  $('main').on('click', '.bookmark-delete-button', (e) => {
    let id = getIdFromElement(e.currentTarget);
    persistentStore.deleteItem(id).then(() => {
      store.deleteItem(id);
      pageRenderer.render(0);
      messageLogger.logMessage('delete-bookmark');
      audio.playSound(0);
      animator.playOneShot($('body'), 'red-blink');
      animator.playOneShot($('main'), 'shake');
      animator.playFaceOneShot(1);
    });
  });

  $('main').on('change', '#sort-item-button', (e) => {
    store.sort = $(e.target).val();
    pageRenderer.render(0);
  });
};

//#endregion

//#region HANDLES TITLE EVENTS

const handleTitleEvents = function () {
  $('main').on('click', '#start-button', () => {
    pageRenderer.render(0);
    audio.playBackgroundMusic();
    store.hasStarted = true;
  });

  $('main').on('click', '#audio-toggle-button', (e) => {
    if (store.soundEnabled) {
      $(e.currentTarget).html('Audio off');
      store.soundEnabled = false;
    } else {
      $(e.currentTarget).html('Audio On');
      store.soundEnabled = true;
    }
  });
};

//#endregion

export default {
  handleTransitionEvents,
  handleSubmitEvents,
  handleBookmarkEvents,
  handleTitleEvents,
};

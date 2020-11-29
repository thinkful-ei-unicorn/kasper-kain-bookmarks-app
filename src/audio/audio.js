import $ from 'jquery';

import store from '../data/localStore';

import sound1 from './sounds/death.wav';
import sound2 from './sounds/select.wav';
import sound3 from './sounds/deselect.wav';
import sound4 from './sounds/summon.wav';
import sound5 from './sounds/error.wav';
import bgMusic from './sounds/bg.mp3';

const audioPlayer = {
  sounds: [sound1, sound2, sound3, sound4, sound5],
  soundPlayer: new Audio(),
  musicPlayer: new Audio(),
  soundVolume: 0.6,
  musicvolume: 0.6,
  playOneShot: function (src) {
    if (store.soundEnabled) {
      this.soundPlayer.volume = this.soundVolume;
      this.soundPlayer.src = src;
      this.soundPlayer.play();
    }
  },
  playMusic: function (src) {
    if (store.soundEnabled) {
      this.musicPlayer.volume = this.musicvolume;
      this.musicPlayer.src = src;
      this.musicPlayer.loop = true;
      this.musicPlayer.play();
    }
  },
  pauseMusic: function () {
    this.musicPlayer.pause();
  },
};

const playSound = function (index) {
  audioPlayer.playOneShot(audioPlayer.sounds[index]);
};

const playBackgroundMusic = function () {
  audioPlayer.playMusic(bgMusic);
};

const pauseBackgroundMusic = function () {
  audioPlayer.pauseMusic();
};

const PausePlayUserNav = function () {
  $(window).on('blur', () => {
    pauseBackgroundMusic();
  });

  $(window).on('focus', () => {
    if (store.soundEnabled && store.hasStarted) {
      playBackgroundMusic();
    }
  });
};

export default { playSound, playBackgroundMusic, PausePlayUserNav };

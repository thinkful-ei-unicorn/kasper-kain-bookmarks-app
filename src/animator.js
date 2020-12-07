import $ from 'jquery';

import face1 from './images/faces/skull.png';
import face2 from './images/faces/skull2.png';
import face3 from './images/faces/skull3.png';

let faces = [face1, face2, face3];

const playOneShot = function (element, animName) {
  $(element)
    .addClass(`animated-${animName}`)
    .one('animationend', () => $(element).removeClass(`animated-${animName}`));
};

const playFaceOneShot = function (index) {
  $('#skull-image').attr('src', `${faces[index]}`);

  setTimeout(() => {
    $('#skull-image').attr('src', `${faces[0]}`);
  }, 1000);
};

export default { playOneShot, playFaceOneShot };

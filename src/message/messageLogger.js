import messages from './messages.json';
import pageRenderer from '../page/pageRenderer';

let lastMessage = '';

const logMessage = function (messagetype) {
  let messageLength = messages[messagetype].length;
  let message = '';
  while (true) {
    message = messages[messagetype][Math.floor(Math.random() * messageLength)];

    if (message !== lastMessage) {
      break;
    }
  }
  lastMessage = message;
  pageRenderer.renderMessage(message, false);
};

const logErrorMessage = function (message) {
  pageRenderer.renderMessage(message, true);
};

export default {
  logErrorMessage,
  logMessage,
};

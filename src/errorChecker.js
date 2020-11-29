import messageLogger from './message/messageLogger';

const checkErrors = function (errs, messages) {
  for (let i = 0; i < errs.length; i++) {
    if (errs[i] === true) {
      messageLogger.logErrorMessage(messages[i]);
      return true;
    }
  }

  return false;
};

export default { checkErrors };

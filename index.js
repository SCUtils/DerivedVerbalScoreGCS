const WARNING_MESSAGE_DURATION = 5000;
const DECIMAL_TRUNCATION_LENGTH = 6;

/**
 * Handler invoked when the calculate button is clicked
 */
function handleCalculateDerivedVerbalScore() {
  const motorScore = document.getElementById('motorScoreInput').value;
  const eyeScore = document.getElementById('eyeScoreInput').value;

  if (motorScore === '' || eyeScore === '') {
    generateWarningMessage(
      'Please enter both Motor Score and Eye Score to calculate a Derived Verbal Score.'
    );
  } else if (!isNumeric(motorScore) || !isNumeric(eyeScore)) {
    generateWarningMessage(
      'Please enter valid numeric Motor Score and Eye Score values.'
    );
  } else {
    const derivedVerbalScore =
      -0.3756 + Number(motorScore) * 0.5713 + Number(eyeScore) * 0.4233;
    document.getElementById('derivedVerbalScore').innerHTML =
      derivedVerbalScore.toFixed(DECIMAL_TRUNCATION_LENGTH);
  }
}

/**
 * Handler invoked when the clear button is clicked
 */
function handleClearScores() {
  document.getElementById('motorScoreInput').value = '';
  document.getElementById('eyeScoreInput').value = '';
  document.getElementById('derivedVerbalScore').innerHTML = '';
  removeWarningMessage(0);
}

/**
 * Generates a temporary warning message for the form
 */
function generateWarningMessage(message) {
  const warningElement = document.getElementById('formWarning');
  requestAnimationFrame(() => {
    warningElement.innerHTML = message;
    warningElement.classList.add('form-warning-active');
  });

  removeWarningMessage(WARNING_MESSAGE_DURATION);
}

/**
 * Removes the warning message from the form with a timeout
 */
function removeWarningMessage(timeout = 0) {
  const warningElement = document.getElementById('formWarning');
  requestAnimationFrame(() => {
    if (timeout === 0) {
      warningElement.innerHTML = '';
      warningElement.classList.remove('form-warning-active');
    } else {
      setTimeout(() => {
        warningElement.innerHTML = '';
        warningElement.classList.remove('form-warning-active');
      }, timeout);
    }
  });
}

/**
 * Checks if the input is a valid number
 * @param {*} input The input. Ideally a string
 * @returns True if the input is a number. False if not.
 */
function isNumeric(input) {
  if (typeof input != 'string') return false;
  return !isNaN(input) && !isNaN(parseFloat(input));
}

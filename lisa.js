// initial HTML
let coreHTML = `<textarea class="textinput" name="thingy" wrap="on" rows="100" cols="50"></textarea>`;
let bodyDiv = document.querySelector(".boody");

let textHTML = document.createRange().createContextualFragment(coreHTML);
// console.log(coreHTML);

document.body.appendChild(textHTML);

// After initial HTML dump variables:

let textArea = document.querySelector(".textinput");
let askString = `Lisa, could you please answer my question? `; // 42 characters
let welcome = `I'm Lisa. Ask nicely every time or face the consequences. `;

// logic:
function writeFirst() {
  printLetterByLetter(textArea, welcome, 25);
}

writeFirst();

function printLetterByLetter(destination, message, speed) {
  var i = 0;
  var interval = setInterval(function() {
    destination.value += message.charAt(i);
    i++;
    if (i > message.length) {
      clearInterval(interval);
    }
  }, speed);
}

//la respuesta debe ser escrita entre dos characteres identificables.

//this is an option, but maybe they should be mapped. each character is bound to the other, that way if they are deleted they both get deleted.

let regex = /(?<=\[)(.*?)(?=\])/;
let whatsWritten = "";
let whatsWrittenCount = 0;

function resetVariables() {
  whatsWritten = "";
  whatsWrittenCount = 0;
  letterCount = 0;
}

document.body.addEventListener("keydown", pressedKey);

function pressedKey(e) {
  if (e.key == "Shift") {
    whatsWrittenCount = whatsWrittenCount;
  } else if (permittedKeys.includes(e.key)) {
    whatsWritten = whatsWritten.concat(e.key);
    whatsWrittenCount++;
    replaceFirst42(textArea, askString, 25);
  } else if (e.key == "Backspace") {
    whatsWritten = whatsWritten.slice(0, -1);
    whatsWrittenCount--;
    // replaceFirst42(textArea, e.key, 25);
  }
  if (whatsWrittenCount < 0) {
    whatsWrittenCount = 0;
  }
  if (whatsWrittenCount < 43) {
    e.preventDefault();
  }
  if (e.key == "Enter") {
    getAnswer(whatsWritten);
  }
  // console.log(`${whatsWrittenCount} ${whatsWritten}`);
  moveCursorToEnd(textArea);
}

letterCount = 0;
// var caretPosition = document.caretPositionFromPoint(float x, float y);
function replaceFirst42(destination, message) {
  if (whatsWrittenCount < 44) {
    destination.value += message.charAt(letterCount);
    letterCount++;
    // console.log(`This is i: ${letterCount}`);
  }
}

//move cursor to end (el) is a reference to an input or textarea
//https://css-tricks.com/snippets/javascript/move-cursor-to-end-of-input/
function moveCursorToEnd(el) {
  if (typeof el.selectionStart == "number") {
    el.selectionStart = el.selectionEnd = el.value.length;
  } else if (typeof el.createTextRange != "undefined") {
    el.focus();
    var range = el.createTextRange();
    range.collapse(false);
    range.select();
  }
}

function getAnswer(whatsWritten) {
  let newtextArea = textArea; 
  // console.log("running getAnswer");
  // console.log(newtextArea);
  // console.log(newtextArea.value);
  let hiddenAnswer = regex.exec(whatsWritten);
  // console.log(`Answer in HTML: ${answerInHTML}`);
  // console.log(`secret answer: ${answerInHTML}`);
  // console.log(`secret answer: ${typeof answerInHTML}`);
  // console.log(`new text area: ${newtextArea}`);
  revealSecret(newtextArea, hiddenAnswer);
  function revealSecret(newtextArea, hiddenAnswer) {
    printAnswerByLetter(newtextArea, hiddenAnswer);
  }
}

function printAnswerByLetter(destination, hiddenAnswer) {
  let priorvalue = destination.value;
  // console.log("running printAnswerByLetter");
  // console.log(destination);
  destination.value = `${priorvalue} ${hiddenAnswer[0]}`;
  resetVariables()
}
// En la segunda vuelta esta intentando usar printLetterByLetter() pero eso no va a functionar de nuevo.
// La funcion printLetterByLetter() deberria funcionar de una manera distinta... de adherir algo al valor en la ultima parte.


// try again.
// as a valid question.
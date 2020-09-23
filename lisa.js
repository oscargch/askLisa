// initial HTML
let coreHTML = `<textarea class="textinput" name="thingy" wrap="on" rows="100" cols="50"></textarea>`;
let bodyDiv = document.querySelector('.boody');

let textHTML = document.createRange().createContextualFragment(coreHTML);
// console.log(coreHTML);

document.body.appendChild(textHTML);

// After initial HTML dump variables:

let textArea = document.querySelector('.textinput');
let askString = `Lisa, could you please answer my question? `; // 42 characters
let welcome = `I'm Lisa. Ask nicely or face the consequences. `;

// logic:
function writeFirst() {
printLetterByLetter(textArea, welcome, 25);
}

writeFirst();

function printLetterByLetter(destination, message, speed){
var i = 0;
var interval = setInterval(function(){
destination.innerHTML += message.charAt(i);
i++;
if (i > message.length){
clearInterval(interval);
}
}, speed);
}

//this is an option, but maybe they should be mapped. each character is bound to the other, that way if they are deleted they both get deleted.
const permitedKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '.', ',', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ' ', '?'];

let hiddenAnswer = '';
let whatsWritten = '';
let whatsWrittenCount = 0;

window.addEventListener('keydown', pressedKey);

function pressedKey(e) {
if (e.key == 'Shift') {
whatsWrittenCount = whatsWrittenCount;
} else if (permitedKeys.includes(e.key)) {
whatsWritten = whatsWritten.concat(e.key);
whatsWrittenCount ++;
  replaceFirst42(textArea, askString, 25);
} else if (e.key == 'Backspace') {
whatsWritten = whatsWritten.slice(0, -1);
whatsWrittenCount --;
// replaceFirst42(textArea, e.key, 25);
}
if (whatsWrittenCount < 0){
  whatsWrittenCount = 0;
  }
if (whatsWrittenCount < 43){
  e.preventDefault();
  }
console.log(`${whatsWrittenCount} ${whatsWritten}`);
moveCursorToEnd(textArea);
} 

// 

letterCount = 0;
// var caretPosition = document.caretPositionFromPoint(float x, float y);
function replaceFirst42(destination, message) {
  if (whatsWrittenCount < 44) {

    destination.innerHTML += message.charAt(letterCount);
    letterCount++;
    console.log(`This is i: ${letterCount}`);
    // console.log(caretPosition);
}
}

// printLetterByLetter(textArea, welcome, 25);

//move cursor to end (el) is a reference to an input or textarea
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


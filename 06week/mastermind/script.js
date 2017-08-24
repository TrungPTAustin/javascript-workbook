'use strict';

let selection = null;
let activeRow = 1;
let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let lettersToColors = { a:'blue', b:'red', c:'green', d:'yellow', e:'orange', f:'black', g:'pink', h:'brown' };
let WON_MESSAGE = 'You guessed it!';


function generateChoices() {
  $('.choices').find('.dot').each((i, el) => {
    let $el = $(el);
    let value = $el.attr('data-letter');
    let color = lettersToColors[value];
    $el.css('background-color', color);

    $el.click(() => {
      saveSelection(value);
    });
  });

}


function saveSelection(value) {
  if (selection === value) {
    selection = undefined;
  } else {
    selection = value;
  }

  let $el = $('.selection > .dot');
  if (selection) {
    $el.css('background-color', lettersToColors[selection]);
  } else {
    $el.css('background-color', '');
  }
}


function activateRow(row) {
  let $row = $('[data-row="' + row + '"]');

  $row.find('.dot').each((i, el) => {
    let $el = $(el);
    $el.click(() => {
      if (selection) {
        $el.attr('data-value', selection);
        $el.css('background-color', lettersToColors[selection]);

        // Perform check once all are selected
        checkRow(row);
      }
    });
  });

  // $row.find('button').click(() => {
  //   checkRow(row);
  // });
}

function deactiveRow(row) {
  let $row = $('[data-row="' + row + '"]');

  $row.find('.dot').each((i, el) => {
    let $el = $(el);
    $el.unbind('click');
  });

  $row.find('button').unbind('click');
}

function checkRow(row) {
  let values = '';

  let $row = $('[data-row="' + row + '"]');
  $row.find('.dot').each((i, el) => {
    let $el = $(el);
    let value = $el.attr('data-value');
    if (value) {
      values += value;
    }
  });

  if (values.length != 4) {
    return;
  }

  let hint = generateHint(values);
  setHint(row, hint);

  if (determineIfWon(hint)) {
    setMessage(WON_MESSAGE);
  } else {
    nextRow();
  }
}

function setHint(row, hint) {
  let $row = $('[data-row="' + row + '"]');
  let $dots = $row.find('.hint').find('.dot');

  let index = 0;
  for (let i=0; i < hint.redDot; i++) {
    $($dots[index]).css('background-color', 'red');
    index++;
  }
  for (let i=0; i < hint.whiteDot; i++) {
    $($dots[index]).css('background-color', 'lightgray');
    index++;
  }

  for (let i=index; i < 4; i++) {
    $($dots[i]).addClass('empty');
  }
}

function clearHint() {
  $('.hint').find('.dot').each((i, el) => {
    let $el = $(el);
    $el.css('background-color', '');
    $el.removeClass('empty');
  });
}

function setMessage(message) {
  $('#message').html(message);
}

function nextRow() {
  deactiveRow(activeRow);

  if (activeRow < 10) {
    activeRow++;
    activateRow(activeRow);
  }
}

function initializeClear() {
  $('#clear').click(() => {
    // Clear click handlers
    deactiveRow(activeRow);

    // Clear dot data
    $('.row').find('.dot').each((i, el) => {
      let $el = $(el)
      $el.removeAttr('data-value');
      $el.css('background-color', '');
    });

    // Clear hint
    clearHint();

    // Clear message
    setMessage('');

    // Clear selection
    saveSelection();

    // Reset back to row;
    activeRow = 1;
    activateRow(activeRow);
    generateSolution();
  });
}


function generateSolution() {
  solution = '';
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }

  for (var i=0; i < solution.length; i++) {
    console.log(lettersToColors[solution[i]]);
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getCount(str, char) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      count++;
    }
  }
  return count;
}

function generateHint(guess) {
  let hint = { redDot: 0, whiteDot: 0 };

  let found = '';
  for (let i = 0; i < guess.length; i++) {
    if (solution[i] === guess[i]) {
      hint.redDot++;
      found += guess[i];
    }
  }

  for (let i = 0; i < guess.length; i++) {
    let char = guess[i];

    if (solution[i] !== char && solution.indexOf(char) > -1 && getCount(found, char) < getCount(solution, char)) {
      hint.whiteDot++;
      found += char;
    }
  }

  return hint;
}

function determineIfWon(hint) {
  return hint.redDot === 4;
}

function mastermind() {
  initializeClear();
  generateSolution();
  generateChoices();
  activateRow(activeRow);
}


document.addEventListener('DOMContentLoaded', () => {
  mastermind();
});

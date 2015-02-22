(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(a, obj){
  for (var i = 0; i < a.length; i++) {
    if (a[i] === obj) {
        return true;
    }
  }
  return false;
};
},{}],2:[function(require,module,exports){
module.exports = function(url){
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status === 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error('Network Error'));
    };

    // Make the request
    req.send();
  });
};
},{}],3:[function(require,module,exports){
var get           = require('./modules/get'),
  shuffleArray    = require('shuffle-array'),
  contains        = require('./modules/array-contains'),
  answers         = document.getElementById('answers'),
  question        = document.getElementById('question'),
  numberAsked     = 0,
  correct         = [],
  questionsAsked  = [],
  currentCat,
  currentQuestion,
  data;
// check if answer is correct
document.querySelector('body').addEventListener('click', function(event) {
  if (event.target.className === 'answer') {
    event.preventDefault();
    var rightWrong = false;
    var ans = data[currentQuestion].answers;
    for (var i = 0; i < ans.length; i++){
      if(ans[i].answer === event.target.innerHTML){
        if(ans[i].value === true){
          rightWrong = true;
        }else{
          rightWrong = false;
        }
      }
    }
    
    if(rightWrong === true){
      correct.push(1);
    }else{
      correct.push(0);
    }
    loadQuestion();
  }
});

get('questions.json').then(function(response) {
  data = JSON.parse(response);
  loadQuestion();
}, function(error) {
  console.error('Failed!', error);
});

function loadQuestion(){
  var answerList = '',
    numberQuestions = data.length;
  // clear previous question/answer
  question.innerHTML = '';
  answers.innerHTML = '';

  // randomly get question
  currentQuestion = Math.floor(Math.random() * numberQuestions);

  if(contains(currentQuestion, questionsAsked) === false){
    questionsAsked.push(currentQuestion);
    console.log(questionsAsked);
    numberAsked++;
    question.innerHTML = data[currentQuestion].question;

    currentCat = data[currentQuestion].category;

    var ans = shuffleArray(data[currentQuestion].answers);
    for (var i = 0; i < ans.length; i++){
      answerList += '<li><a href="#" class="answer">' + ans[i].answer + '</a></li>';
    }
    
    answers.innerHTML = answerList;
  }else if(numberQuestions < numberAsked){
    loadQuestion();
  }else{
    alert('all done');
  }
}
},{"./modules/array-contains":1,"./modules/get":2,"shuffle-array":4}],4:[function(require,module,exports){
'use strict';

/**
 * Randomize the order of the elements in a given array.
 * @param {Array} arr - The given array.
 * @param {Object} [options] - Optional configuration options.
 * @param {Boolean} [options.copy] - Sets if should return a shuffled copy of the given array. By default it's a falsy value.
 * @param {Function} [options.rng] - Specifies a custom random number generator.
 * @returns {Array}
 */
function shuffle(arr, options) {

  if (!Array.isArray(arr)) {
    throw new Error('shuffle expect an array as parameter.');
  }

  options = options || {};

  var collection = arr,
      len = arr.length,
      rng = options.rng || Math.random,
      random,
      temp;

  if (options.copy === true) {
    collection = arr.slice();
  }

  while (len) {
    random = Math.floor(rng() * len);
    len -= 1;
    temp = collection[len];
    collection[len] = collection[random];
    collection[random] = temp;
  }

  return collection;
};

/**
 * Pick one or more random elements from the given array.
 * @param {Array} arr - The given array.
 * @param {Object} [options] - Optional configuration options.
 * @param {Number} [options.picks] - Specifies how many random elements you want to pick. By default it picks 1.
 * @param {Function} [options.rng] - Specifies a custom random number generator.
 * @returns {Object}
 */
shuffle.pick = function(arr, options) {

  if (!Array.isArray(arr)) {
    throw new Error('shuffle.pick() expect an array as parameter.');
  }

  options = options || {};

  var rng = options.rng || Math.random,
      picks = options.picks || 1;

  if (typeof picks === 'number' && picks !== 1) {
    var len = arr.length,
        collection = arr.slice(),
        random = [],
        index;

    while (picks) {
      index = Math.floor(rng() * len);
      random.push(collection[index]);
      collection.splice(index, 1);
      len -= 1;
      picks -= 1;
    }

    return random;
  }

  return arr[Math.floor(rng() * arr.length)];
};

/**
 * Expose
 */
module.exports = shuffle;

},{}]},{},[3]);

var get           = require('./modules/get'),
  shuffleArray    = require('shuffle-array'),
  content         = document.getElementById('content'),
  answers         = document.getElementById('answers'),
  question        = document.getElementById('question'),
  timer           = document.getElementById('timer'),
  currentNum      = document.getElementById('current-number'),
  totalNum        = document.getElementById('total-questions'),
  quizTotal       = 25,
  numberAsked     = 0,
  correct         = [],
  questionsAsked  = [],
  currentCat,
  currentQuestion,
  time,
  data;

// set the number of questions being asked
totalNum.innerHTML = quizTotal;

// load questions json
get('questions.json').then(function(response) {
  data = JSON.parse(response);
  loadQuestion();
}, function(error) {
  console.error('Failed!', error);
});

// check if answer is correct
document.querySelector('body').addEventListener('click', function(event) {
  if (event.target.className === 'answer') {
    event.preventDefault();

    var rightWrong    = false,
      ans             = data[currentQuestion].answers;

    for (var i = 0; i < ans.length; i++){
      if(ans[i].answer === event.target.innerHTML){
        if(ans[i].value === true){
          rightWrong = true;
        }
      }
    }

    // if answered correct push to correct array
    if(rightWrong === true){
      correct.push(1);
    }

    // clear previous timer
    clearInterval(time);

    // load another question
    loadQuestion();
  }
});

function startTimer() {
    var seconds,
      thirtySecs = 30;

    time = setInterval(function() {
        seconds = parseInt(thirtySecs % 30);
        seconds = seconds < 10 ? '0' + seconds : seconds;

        timer.innerHTML ='00:' + seconds;
        thirtySecs--;

        if(thirtySecs < 0){
          clearInterval(time);
          console.log('time up');
          loadQuestion();
        }

    }, 1000);
}

function loadQuestion(){
  var answerList = '',
    numberQuestions = data.length;

  // clear previous question/answer
  question.innerHTML = '';
  answers.innerHTML = '';

  // randomly get question
  currentQuestion = Math.floor(Math.random() * numberQuestions);

  if(questionsAsked.indexOf(currentQuestion) === -1  && quizTotal > numberAsked){

    // add the current question to questionsAsked array so it isn't asked again
    questionsAsked.push(currentQuestion);

    //increase the number of questions asked
    numberAsked++;

    // update the current question number
    currentNum.innerHTML = numberAsked;

    // add question to HTML
    question.innerHTML = data[currentQuestion].question;

    // the question category
    currentCat = data[currentQuestion].category;



    // get the multiple choice answsers for the question
    var ans = shuffleArray(data[currentQuestion].answers);
    for (var i = 0; i < ans.length; i++){
      answerList += '<li><a href="#" class="answer">' + ans[i].answer + '</a></li>';
    }
    // add multiple choice answers to DOM
    answers.innerHTML = answerList;

    //start timer
    startTimer();

  }else if(quizTotal > numberAsked){
    // load another question
    loadQuestion();
  }else{
    // all questions have been answered
    var percent = parseInt((correct.length / quizTotal) * 100, 10);
    var failPass = 'pass';
    if(percent <= 50){
      failPass = 'fail';
    }
    content.innerHTML = '<div class="results"><h2 class="'+ failPass +'">'+ percent +'%</h2><p>'+ correct.length + '/' + quizTotal+'</p></div>';
  }
}
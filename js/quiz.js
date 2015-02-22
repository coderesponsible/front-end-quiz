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
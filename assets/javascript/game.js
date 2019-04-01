/* PSEUDOCODE - 
1. Things that need to stay the same are the background div, the heading div, and the main container - use bootstrap maybe
2. Things that update w/ timer or user input...maybe based on click events: time remaining, questions, answer choices
3. If the user picks the right answer: display a happy image and add 1 to the correct answer counter
4. If the user picks the wrong answer: display a prompt saying "try again", add 1 to the incorrect counter and advance to next question
5. Once the questions run out, display the counters of correct answers/incorrect answers  and skipped q's
6. Maybe add a reset function to start over. 

Functions required:
1. new game
2. display question
3. timer
4. seconds left
5. what's the answer
6. results

For Loop
1. One for loop that runs thru the answer choice array

Two click events: 1. on click of answer choice...2. on click of start game button

N.B: see image in notes.
*/

$(document).ready(function(){

// 1. List all global vars

var currentQ;
var correctAns;
var wrongAns;
var noAns;
var seconds;
var timer;
var isAnswered;
var userAns;  

// var reset = $('#reset'); if needed uncomment in html

// 2. Make an object for all questions

var myQuestions = [
    {
        category: "Grey's Anatomy",
        question: "Who is the father of Callie and Arizona's baby?",
        answerArray: ["Jackson Avery", "Derek Shepherd", "Mark Sloan", "George O'Malley"],
        correctAnswer: 2
    },
    {
        category: "Grey's Anatomy",
        question: "Which country did Christina move to?",
        answerArray: ["Switzerland", "France", "Norway", "Antarctica"],
        correctAnswer: 0
    },
    {
        category: "Brooklyn 99",
        question: "When Jake sends Captain Holt an email, what did he accidently leave as his signature?",
        answerArray: ["The name of Amy's sex tape", "My Stinky Butt", "H.A.G.S. Jake", "My smelly farts"],
        correctAnswer: 1
    },
    {
        category: "Grey's Anatomy",
        question: "What is Miranda Bailey's son's name?",
        answerArray: ["Tuck", "William George", "George William", "Ben"],
        correctAnswer: 1
    },
    {
        category: "Brooklyn 99",
        question: "When playing 'Never Have I Ever,' what's the one thing Amy has actually?",
        answerArray: ["Had sex in the back of a squad car", "Changed lanes without signaling", "Had a one night stand with a guy from  a band", "Left a movie before the credits finished"],
        correctAnswer: 2
    },
    {
        category: "Grey's Anatomy",
        question: "What was the name of Meredith's dog",
        answerArray: ["Jackson", "Jo", "Murphy", "Doc"],
        correctAnswer: 3
    },
    {
        category: "Brooklyn 99",
        question: "What is the name of Captain Holt's original car?",
        answerArray: ["Gertie", "Gertrude", "Cindy", "Cheryl"],
        correctAnswer: 0
    },
    {
        category: "Grey's Anatomy",
        question: "Where did Meredith grow up?",
        answerArray: ["Seattle", "Chicago", "Auckland", "Boston"],
        correctAnswer: 3
    },
    {
        category: "Brooklyn 99",
        question: "What is Terry's favorite flavor of yogurt?",
        answerArray: ["Apricot", "Strawberry", "Passionfruit", "Mango"],
        correctAnswer: 3
    },
    
    {
        category: "Grey's Anatomy",
        question: "Who was never a resident on the show?",
        answerArray: ["Ben Warren", "Derek Shepherd", "Miranda Bailey", "Jo"],
        correctAnswer: 1
    },
    {
        category: "Grey's Anatomy",
        question: "Which character moved to New York?",
        answerArray: ["Callie Torres", "Addison Shepherd", "Christina Yang", "Preston Burke"],
        correctAnswer: 0
    },
    //Add more questions here
];

// 3. Make an object of a set of prompts to be displayed

var prompt = {
    whenCorrect: "Good Job!",
    whenIncorrect: "Sorry, you'll get the next one!",
    whenNoTimeLeft: "You ran out of time!",
    whenQuizEnd: "Here's how you did"
};


// 9. On click events for the two buttons

$('#startGame').on('click', function(){
    $(this).hide();
    startMyGame();
});


$('#reset').on('click', function(){
    $(this).hide();
    startMyGame();
});

// 4. Make a function to start a new game, reset all items, empty all divs 

function startMyGame (){
    $('#prompt').empty();
    $('#correctAns').empty();
    $('#wrongAns').empty();
    $('#noAns').empty();
    currentQ = 0;
    correctAns = 0;
    wrongAns = 0;
    noAns = 0;
    displayQuestion();
}

// 5. Make a function to display a new question/choices from myQuestions object

function displayQuestion(){
    $('#prompt').empty();
    $('#fixedAns').empty();
    //$('#correctImg').empty();
    isAnswered = true;

    $('#category').html('<h3>' + "Category: " + myQuestions[currentQ].category + '</h3>');
    $('.question').html('<h2>' + myQuestions[currentQ].question + '</h2>');
        for (var x = 0; x < 4; x++) {
        var givenChoice = $('<div>');
        givenChoice.text(myQuestions[currentQ].answerArray[x]); //start here
        
        givenChoice.attr({'data-index': x });
        givenChoice.addClass('myChoice');
        
        $('.answers').append(givenChoice);
        
    }

    myTimer ();

    $('.myChoice').on('click', function () {
        userAns = $(this).data('index');
        clearInterval(clock);
        whatIsTheAns();
    });

} // end displayQuestion

// 5. Make a function that will set the timer to 10 seconds

function myTimer(){
    seconds = 15; //time alotted for each question
    $('#timer').html('<h3>You have ' + seconds + ' seconds left </h3>');
    isAnswered = true;
    clock = setInterval(howManySecs, 1000);
}

// 6. Make a function to execute the timer to go down

function howManySecs(){
    seconds--;
    $('#timer').html('<h3>You have ' + seconds + ' seconds left </h3>');
    if (seconds < 1){
        clearInterval(clock);
        isAnswered = false;
        whatIsTheAns();
    }
}

// 7. Make a function to switch to the page where the user will see if their answer was correct and if not, they'll see the correct answer

function whatIsTheAns(){
    $('#currentQ').empty();
    $('.myChoice').empty();
    $('.question').empty();

    // The correct answer is pulled out from the object myQuestions and stored  in var theAnswerText
    var theAnswerText = myQuestions[currentQ].answerArray[myQuestions[currentQ].correctAnswer];
    var theAnswerNum = myQuestions[currentQ].correctAnswer;
    //link img if you wish 144

    if((userAns === theAnswerNum) && (isAnswered === true)){
        correctAns++;
        $('#prompt').html(prompt.whenCorrect);
    } else if ((userAns !== theAnswerNum) && (isAnswered === true)){
        wrongAns++;
        $('#prompt').html(prompt.whenIncorrect);
        $('#fixedAns').html('The correct answer was: ' + theAnswerText);
    } else {
        noAns++;
        $('#prompt').html(prompt.whenNoTimeLeft);
        $('#fixedAns').html('The correct answer was: ' + theAnswerText);
        isAnswered = true;
    }

    if (currentQ === (myQuestions.length-1)){
        setTimeout(results, 1000);
    } else {
        currentQ++;
        setTimeout(displayQuestion, 1000);
    }

} 

// 8. Make a function to show the users their results after the questions have run out

function results (){
    $('#timer').empty();
    $('#prompt').empty();
    $('#fixedAns').empty();
    $('#category').empty();
    //if adding images, empty the image div

    $('#resultPrompt').html(prompt.quizEnd);
    //show counters
    $('#correctAns').html("You nailed " + correctAns + " question(s)!");
    $('#wrongAns').html("But missed " + wrongAns + " question(s)!");
    $('#noAns').html("And finally, ran out of time on " + noAns + " question(s)!");
    $('#reset').show();
    $('#reset').html('Play Again?');
}




});




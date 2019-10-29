/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*** GLOBAL VARIABLES ***/
// Array to hold both player's scores during game.
let scores = [0, 0];
// Variable to hold currently active player's current score for the current round.
let roundScore = 0;
// Variable to hold currently active player.
let activePlayer = 0;
// Variable to hold the winning game score.
let winningScore = 100;
// Variable to hold the value of random number between 1 and 6 (simulating  a dice roll).
let diceRoll;
// State variable to hold the boolean value for whether game is currently playing or if game has been won and has ended. Assigned value of true.
let gamePlaying = true;

// Select dice roll button element node from DOM and save to variable.
const diceRollEl = document.querySelector('.btn-roll');
// Select hold button element node from DOM and save to variable.
const holdButtonEl = document.querySelector('.btn-hold');
// Select new game button element node from DOM and save to variable.
const newButtonEl = document.querySelector('.btn-new');
// Select dice element node from DOM and save to variable.
const diceEl = document.querySelector('.dice');
// Select players current score element nodes from DOM and save to variable.
const currentScores = document.querySelectorAll('.player-current-score');
const player1ScoreEl = document.querySelector('#score-0');
const player2ScoreEl = document.querySelector('#score-1');
// Select both player's game score DOM element node and assign to variable.
const gameScores = document.querySelectorAll('.player-score');


/*** GAME INITIALIZATION FN ***/
function gameInit() {
  /* RESET VARIABLE VALUES */
  // Set both player's game score to value of 0.
  scores = [0, 0];
  // Set roundScore to 0.
  roundScore = 0;
  // Set activePLayer variable to value of 0.
  actievPlayer = 0;
  // Set winningScore variable to default value of 100.
  winningScore = 100;
  // Set gamePlaying state variable to value of true.
  gamePlaying = true;

  /* UI ELEMENTS */
  // Remove active class on both player panel DOM element nodes
  document.querySelector('.player-0-panel').classList.remove('active'); // Player 1
  document.querySelector('.player-1-panel').classList.remove('active'); // Player 2
  // Set active class on for player 1.
  document.querySelector('.player-0-panel').classList.add('active'); // Player 1 add active class.
  // Remove 'winner' class from both player panels DOM element nodes.
  document.querySelector('.player-0-panel').classList.remove('winner'); // Player 1
  document.querySelector('.player-1-panel').classList.remove('winner'); // Player 2
  // Set player's name DOM element nodes textContent vlaue to 'Player 1' and 'Player 2' respectively.
  document.querySelector('#name-0').textContent = 'Player 1'; // PLayer 1
  document.querySelector('#name-1').textContent = 'Player 2'; // PLayer 1
  // Loop through player score DOM nodelist and set player scores value to 0 for both players.
  for(let score of gameScores) {
    score.textContent = 0;
  }
  // Loop through both players current score DOM element nodes textContent value and set each to roundScore (0).
  for(currentScore of currentScores) {
    currentScore.textContent = roundScore;
  }
}


// Call gameInit function to get game into playable state.
gameInit();

/*** NEW BUTTON EL CLICK EVENT HANDLER ***/
newButtonEl.addEventListener('click', gameInit);
/*** DICE ROLL EL CLICK EVENT HANDLER ***/
diceRollEl.addEventListener('click', function() {
  diceRoll = Math.floor(Math.random() * 6) + 1; // generate rand. # between 1 and 6.
  diceEl.setAttribute('src', `dice-${diceRoll}.png`); // set src attribute on dice img element to image matching currently selected dice.
  if(diceRoll !== 1) { // Check if dice roll value is not equal to 1.
    roundScore += diceRoll; // Add current diceRoll value to the roundScore variable.
    // Update active player current score DOM element node textContent value to current roundScore value.
    document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    console.log(`round score: ${roundScore}`);
    console.log('value other than 1 rolled.');
  }
  else { // If current diceRoll value is = 1.
    roundScore = 0;
    for(let currentScore of currentScores) {
      currentScore.textContent = roundScore;
    }
    // update activePlayer value (if 0 set to 1, if 1 set to 0).
    activePlayer === 0? activePlayer = 1: activePlayer = 0;
    // Toggle active class on both player's panel DOM element nodes.
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
  }
  console.log('dice rolled!');
});

/*** HOLD BUTTON EL CLICK EVENT HANDLER ***/
holdButtonEl.addEventListener('click',function() {
  // Check if game is still active.
  if(gamePlaying) {
    // 1. Add current score to active player's global game score.
    scores[activePlayer] += roundScore;
    // 2. Update textContent value of active player's score panel.
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    // 3. Reset roundScore variable to value of 0.
    roundScore = 0;
    // 4. Reset both player's current score UI element textContent values to 0 (value of roundScore).
    for(let current of currentScores) {
      current.textContent = roundScore  // value will be 0.
    }
    // 5. Check whether active player's score is >= winningScore.
    if(scores[activePlayer] >= winningScore) {
      console.log('You won!');
      // Select active player's 'playername' DOM element node and update text content to 'Winner!'.
      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
      //  Remove active class from currently active player's panel (winner).
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      // Add 'winner' class to active player's panel DOM element node.
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      // Update value of gamePlaying variable to false as game is now complete.
      gamePlaying = false;
    }
    else { // If player score is not yet equal to winningScore.
      console.log('You did not win, other player\'s turn.');
      // Update actievPlayer variable to other player (if 0 set to 1, if 1 set to 0).
      activePlayer === 0? activePlayer = 1: activePlayer = 0;
      // Toggle active class on both player panel DOM element nodes to switch active player styling between players.
      document.querySelector('.player-0-panel').classList.toggle('active'); // player 1.
      document.querySelector('.player-1-panel').classList.toggle('active'); // player 2.
    }
  }
});

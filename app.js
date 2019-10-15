/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Global Variables
// Array to hold both player's scores during game.
let scores = [0, 0];
// Variable to hold currently active player's current score for the current round.
let roundScore = 0;
// Variable to hold currently active player.
let activePlayer = 0;
// Variable to hold the value of random number between 1 and 6 (simulating  a dice roll).
let diceRoll = Math.floor(Math.random() * 6) + 1;

// Select dice roll button element node from DOM and save to variable
const diceRollEl = document.querySelector('.btn-roll');
// Select hold button element node from DOM and save to variable
const holdButtonEl = document.querySelector('.btn-hold');

const player1ScoreEl = document.querySelector('#score-0');
const player2ScoreEl = document.querySelector('#score-1');

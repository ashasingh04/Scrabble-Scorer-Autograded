// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
   let score = 0;
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`; 
         score += pointValue;        
		 } 
	  }
	}
	return letterPoints;  
   //return score; 
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let word = "";
function isValidWord(str) {
   return Boolean(str.match(/^[A-Za-z' ']*$/));
 }

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   word = input.question('Enter a word to score:');
   while(!isValidWord(word))
   {
      word = input.question('Enter a word to score:');
   }
};

let simpleScorer = function(word){
   word = word.toUpperCase();
   let score = 0;
   for(let i = 0; i < word.length; i++){
      if(word[i] === ' '){
         score += 0;
      }else{
         score++;
      }
   }
   return score;
};

let vowelBonusScorer = function(word){
   word = word.toLowerCase();
   const vowels = ['a', 'e', 'i', 'o', 'u'];
   let score = 0;
   for(let i = 0; i < word.length; i++){
      if(vowels.includes(word[i])){
         score += 3;
      }else if (word[i] === ' '){
         score += 0;
      }else {
         score += 1;
      }
   }
   return score;
};

let scrabbleScorer = function(word) {
   word = word.toLowerCase();
	let score = 0;	 
   for (let i = 0; i < word.length; i++) { 
      for (const pointValue in newPointStructure) {  
        if (pointValue === word[i]) {          
            score += newPointStructure[pointValue];        
        }else if(word[i] === ' '){
            score += 0;
        }  
      }
    }
   return score;
 }
let simpleScoreObj = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
};
let bonusVowelsScoreObj = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};
let scrabbleObj = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
};
const scoringAlgorithms = [simpleScoreObj,bonusVowelsScoreObj,scrabbleObj];
let scoringAlgorithm;
function isValidScoringAlgorithm(scoringAlgorithm)
{
   let isValid;
   if(scoringAlgorithm === 0 || scoringAlgorithm === 1 || scoringAlgorithm === 2)
   {
      isValid = true;
   } else{
      isValid = false;
   }
   return isValid;
}
function scorerPrompt() {
   let prompt = `Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2:`
   scoringAlgorithm = Number(input.question(prompt));
   //console.log(scoringAlgorithm);   
   while(!isValidScoringAlgorithm(scoringAlgorithm))
   {
      scoringAlgorithm = Number(input.question(prompt));
   }
}

function transform(oldPointStructure) {
   let newPointStructure = {};
   for (const pointValue in oldPointStructure) {      
      for(let i = 0; i < oldPointStructure[pointValue].length; i++){
         newPointStructure[oldPointStructure[pointValue][i].toLowerCase()] = Number(pointValue);
      }      
    }
    return newPointStructure;
};
//console.log(transform(oldPointStructure));
let newPointStructure = transform(oldPointStructure);
console.log(newPointStructure);
function runProgram() {   
   initialPrompt();   
   scorerPrompt();
   //console.log(scoringAlgorithms[0].scorerFunction(word));
   if(Number(scoringAlgorithm) === 0)
   {
      console.log(`Score for '${word}': ${scoringAlgorithms[0].scorerFunction(word)}`);
   }else if(Number(scoringAlgorithm) === 1)
   {
      console.log(`Score for '${word}': ${scoringAlgorithms[1].scorerFunction(word)}`);
   }else if(Number(scoringAlgorithm) === 2)
   {
      console.log(`Score for '${word}': ${scoringAlgorithms[2].scorerFunction(word)}`);
   }
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

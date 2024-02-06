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
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function isValidWord(str) {
   return Boolean(str.match(/^[A-Za-z' ']*$/));
 }

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let word = input.question('Enter a word to score:');
   while(!isValidWord(word))
   {
      word = input.question('Enter a word to score:');
   }
   return word;
};

let simpleScorer = function(value){
   let word = value.toUpperCase();
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

let vowelBonusScorer = function(value){
   let word = value.toLowerCase();
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

let scrabbleScorer = function(value) {
   let word = value.toLowerCase();
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

function isValidScoringAlgorithm(scoringAlgorithm)
{  
   let options = [0,1,2];
   return options.includes(scoringAlgorithm) ? true : false;
}
function scorerPrompt(word) {
   let prompt = `Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2:`
   let scoringAlgorithm = Number(input.question(prompt));
   let resultObj;   
   while(!isValidScoringAlgorithm(scoringAlgorithm))
   {
      scoringAlgorithm = Number(input.question(prompt));
   }
   if(scoringAlgorithm === 0)
   {
      return scoringAlgorithms[0];
   }else if(Number(scoringAlgorithm) === 1)
   {
      return scoringAlgorithms[1];
   }else if(Number(scoringAlgorithm) === 2)
   {
      return scoringAlgorithms[2];
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

const newPointStructure = transform(oldPointStructure);

function runProgram() {   
   let word = initialPrompt();   
   let scoringAlgorithm = scorerPrompt(word);
   console.log(`Score for '${word}': ${scoringAlgorithm.scorerFunction(word)}`);   
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

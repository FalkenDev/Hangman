import { hangman } from './hangman.js';
import { buttonEvents } from './buttonEvents';

hangman.randomize();
hangman.hideAll();
console.log(hangman.wordlist());

const word = hangman.peek().split("");
const answer = [];
let hangmanPartCounter = 0;

const boxesElement = document.getElementById("boxes");
const result = document.getElementById("word");
const finnish = document.getElementById("finnish");

createButtons();
createResult();

// Skapar sträcken i resultatet så spelaren kan se hur många bokstäver det är i ordet
function createResult () {
    for (let i = 0; i < word.length; i++) {
        answer[i] = "_ ";
    }
    result.innerHTML = answer.join("");
}

// Skapar Alla Knapparna
function createButtons () {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split("");
    for (const letter of alphabet) {
        const letterButton = document.createElement("div");
        letterButton.className = "box";
        letterButton.id = letter;
        letterButton.innerHTML = letter;
        buttonEvents.addEventclick(letterButton);
        boxesElement.appendChild(letterButton);
    }
}

// Kollar om bokstaven finns i ordet
function wordChecker (box, word) {
    for (const letter of word) {
        if (letter === box.id) {
            box.classList.add("correct");
            buttonEvents.removeEvents(box);
            resultPrinter(letter);
            return;
        }
    }
    // Om det inte finns någon bokstav i ordet så får boxen klassen incorrect och hangmanParts() funktionen körs
    box.classList.add("incorrect");
    buttonEvents.removeEvents(box);
    hangmanParts();
}

// Printar ut resultatet för varje rätt bokstav i ordet
function resultPrinter (letter) {
    for (let i = 0; i < answer.length; i++) {
        if (word[i] === letter) {
            answer[i] = letter;
        }
    }
    // Kollar om alla bokstäver är i resultatet och om de matchar så har spelaren vunnit
    if (answer.join("") === word.join("")) {
        finnish.innerHTML = "Grattis du vann!";
        const allButtons = boxesElement.querySelectorAll("div");
        for (const buttons of allButtons) {
            buttonEvents.removeEvents(buttons);
        }
    }
    result.innerHTML = answer.join("");
}

// Hämtar ut Hangman delarna och kollar vilken del som blir den nästa vid fel
function hangmanParts () {
    const part = hangman.validParts[hangmanPartCounter];
    hangman.show(part);
    hangmanPartCounter += 1;
    if (hangmanPartCounter >= hangman.validParts.length) {
        finnish.innerHTML = "Tyvär, du förlorade :( Men gärna testa igen :D";
        const allButtons = boxesElement.querySelectorAll("div");
        for (const buttons of allButtons) {
            buttonEvents.removeEvents(buttons);
        }
    }
}
export { wordChecker };

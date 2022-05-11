import { wordChecker } from './main.js';
import { hangman } from './hangman.js';

const buttonEvents = {
    addEventclick: function (box) {
        box.addEventListener("click", letterClicker);
    },

    removeEvents: function (box) {
        box.removeEventListener("click", letterClicker);
    }
};

function letterClicker () {
    const word = hangman.peek().split("");
    wordChecker(event.target, word);
}

export { buttonEvents };

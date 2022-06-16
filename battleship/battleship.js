let model = {
    boardsize: 7,
    numShips: 3,
    shipLength: 3,
    shipSunks: 0,
    ships: [ 
        {locations: [0, 0, 0], hits: ["", "", ""] }, 
        {locations: [0, 0, 0], hits: ["", "", ""] },
        {locations: [0, 0, 0], hits: ["", "", ""] } 
    ],

    fire: function(guess) {
            for (let i=0; i < this.numShips; i++) {
                let ship = this.ships[i];
                let index = ship.locations.indexOf(guess);
                if (ship.hits[index] === "hits") {
                    view.displayMessage("You have already hit this cell.");
                    return true;
                }
                    if (index >= 0) {
                        ship.hits[index] = "hits";
                        view.displayHit(guess);
                        view.displayMessage('HIT!');
                        if (this.isSunk(ship)) {
                            this.shipSunks++;
                            view.displayMessage('You sunk my ship!');
                        }
                        return true;
                    }
                }
                view.displayMiss(guess);
                view.displayMessage('You missed.');
                return false;
            },

    isSunk: function(ship) {
        for (let i=0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hits") {
                return false;
            }
        }
                return true;
    },

    generateShipLocations: function () {
        let locations;
        for  (let i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
        console.log("Ships array: ");
		console.log(this.ships);
    },

    generateShip: function () {
        let direction = Math.floor(Math.random() * 2);
        let row, col;

        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardsize);
            col = Math.floor(Math.random() * (this.boardsize - this.shipLength + 1));
        } else {
            row = Math.floor(Math.random() * (this.boardsize - this.shipLength + 1))
            col = Math.floor(Math.random() * this.boardsize);
        }
        let newShipLocations = [];
        for (let i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },

    collision: function(locations) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            for (let j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >=0 ) {
                    return true;
                }
            }
        }
        return false;
    },
}

let view = {
    displayMessage: function(msg) {
        let messageArea = document.getElementById("messageArea");
        messageArea.innerHTML=msg;
    },
    displayHit: function(location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function(location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class" , "miss");
    }
}; 
let controller = {
    guesses: 0,
    
    processGuess: function(guess) {
        let  location = parseGuess(guess);
        if (location) {
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.shipSunks === model.numShips) {
                view.displayMessage('You sank all my battleships, in ' + 
                this.guesses + ' guesses');
            }
        }
    }
}
function parseGuess(guess) {
    let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    if (guess === null || guess.length !== 2) {
        alert('Oops, please enter a letter and a number on the board!');
    } else {
        let firstChar = guess.charAt(0);
        let row = alphabet.indexOf(firstChar);
        let column = guess.charAt(1);

        if (isNaN(row) || isNaN (column)) {
            alert("Oops, that isn't on the board.");
        } else if (row < 0 || row >= model.boardsize || 
            column < 0 || column >= model.boardsize) {
            alert("Oops, that's off the board.");
        } else {
            return row + column;
        }
    }
    return null;
}
function handleFireButton () {
    let guessInput = document.getElementById("guessInput");
    let guess = guessInput.value; 
    controller.processGuess(guess);
    guessInput.value = "";
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
    fireButton.click();
    return false;
    }
}

window.onload = init;

function init () {
    let fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    let guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
    model.generateShipLocations();
}
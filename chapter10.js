let passengers = [{name: "Jane Doloop", paid: true, ticket: "coach"},
    {name: "Dr. Evel", paid: true, ticket: "firstclass"},
    {name: "Sue Property", paid: false, ticket: "firstclass"},
    {name: "John Funcall", paid: true, ticket: "economy"}];

function processPassengers(passengers, testFunction) {
    for (let i = 0; i < passengers.length; i++) {
        if (testFunction(passengers[i])) {
            return false;
        }
    }
}

function checkNoFlyList(passenger) {
    return (passenger.name === "Dr. Evel");
}

function checkNotPaid(passenger) {
    return (!passenger.paid);
}

let allCanFly = processPassengers(passengers, checkNoFlyList);
if (!allCanFly) {
    console.log("The plane can't take off: we have a passenger on the no-fly-list!");
}

let allPaid = processPassengers(passengers, checkNotPaid);
if (!allPaid) {
    console.log("The plane can't take off: not everyone has paid.");
}

function printPassenger(passenger) {
    for (let i = 0; i < passengers.length; i++) {
        console.log(passengers[i].name + ' ' + passengers[i].paid);
    }
}

processPassengers(passengers, printPassenger);

function createDrinkOrder(passenger) {
    let orderFunction;
    if (passenger.ticket === "firstclass") {
        orderFunction = function () {
            alert("Would you like cocktail or wine?");
        };
    } else if (passenger.ticket === "coach") {
        orderFunction = function () {
            alert("Would you like juice or water?");
        };
    } else {
        orderFunction = function () {
            alert("Would you like lemonade, water or wine?");
        };
    }
    return orderFunction;
}

function createDinnerOrder(passenger) {
    let dinnerOrderFunction;
    if (passenger.ticket === "firstclass") {
        dinnerOrderFunction = function () {
            alert("Would you like chicken or pasta?");
        };
    } else if (passenger.ticket === "coach") {
        dinnerOrderFunction = function () {
            alert("Would you like snacks or cheese plate?");
        };
    } else {
        dinnerOrderFunction = function () {
            alert("Would you like nuts or crackers?");
        };
    }
    return dinnerOrderFunction;
}

function serveCustomers(passenger) {
    let getDrinkOrderFunction = createDrinkOrder(passenger);
    let getDinnerOrderFunction = createDinnerOrder(passenger);
    getDrinkOrderFunction();
    getDinnerOrderFunction();
    getDrinkOrderFunction();
    getDrinkOrderFunction();
    getDrinkOrderFunction();
}

function servePassengers(passengers) {
    for (let i = 0; i < passengers.length; i++) {
        serveCustomers(passengers[i]);
    }
}

servePassengers(passengers);
   
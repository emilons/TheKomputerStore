// ### DOM elements ###

const bankElement = document.getElementById("bank");
const loanBlockElement = document.getElementById("loanBlock");
const loanElement = document.getElementById("loanValue");
const balanceElement = document.getElementById("balanceValue");
const payElement = document.getElementById("payValue");
const computersElement = document.getElementById("computers");
const descriptionElement = document.getElementById("description");
const loanButton = document.getElementById("loanButton");
const workButton = document.getElementById("workButton");
const depositButton = document.getElementById("depositButton");

// ### Bank functionality ###

loanBlockElement.style.display = "none";
balanceElement.innerText = 0;
loanElement.innerText = 0;

const handleLoan = () => {
    let balance = parseInt(balanceElement.innerText);
    if (balance <= 0) return;
    let maxLoanAmount = 2*balance;
    let outstandingLoan = parseInt(loanElement.innerText);
    if (outstandingLoan > 0) confirm("Cannot grant another loan untill outstanding loan is repaid");
    else {
        let promptMessage = "Please enter loan amount (max: " + maxLoanAmount + ")"
        let loan = prompt(promptMessage, "" + maxLoanAmount);
        if (loan === null) return;
        if (loan > maxLoanAmount) return;
        loanElement.innerText = loan;
        balance += parseInt(loan);
        balanceElement.innerText = balance;
        handleLoanVisibility();
    }
}

// Helper function to set visibility of loan
const handleLoanVisibility = () => {
    let visibility = loanBlockElement.style.display;
    if (visibility === "block") {
        loanBlockElement.style.display = "none";
    }
    else {
        loanBlockElement.style.display = "block";
    }
}

// ### Work functionality ###

payElement.innerText = 0;

const handleWork = () => {
    let pay = parseInt(payElement.innerText);
    let hourlyRate = 100;
    pay += hourlyRate;
    payElement.innerText = pay;
}

const handleDeposit = () => {
    let pay = parseInt(payElement.innerText);
    let balance = parseInt(balanceElement.innerText);
    let loan = parseInt(loanElement.innerText);
    if (loan > 0) {
        let interest = 0.1 * pay;
        pay -= interest;
        balance += pay;
        loan -= interest;
        if (loan == 0) {
            outstandingLoan = 0;
            loan = 0;
            handleLoanVisibility();
        }
        else {
            outstandingLoan = loan;
        }
        loanElement.innerText = loan;
    }
    else {
        balance += pay;
    }
    payElement.innerText = 0;
    balanceElement.innerText = balance;
}

// ### Computer functionality ###

let computers = []

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToSale(computers))
    .then(() => setDefaultComputerDescription())

const addComputersToSale = (computers) => {
    computers.map(element => addComputerToSale(element));
}

const addComputerToSale = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    computersElement.appendChild(computerElement);
}

const setDefaultComputerDescription = () => {
    const computerElement = computers[0];
    descriptionElement.innerText = "";
    computerElement.specs.map(element => {
        const listElement = document.createElement("li");
        listElement.innerText = element;
        descriptionElement.appendChild(listElement)
    });    
}

const handleComputerChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    descriptionElement.innerText = "";
    selectedComputer.specs.map(element => {
        const listElement = document.createElement("li");
        listElement.innerText = element;
        descriptionElement.appendChild(listElement)
    })
}

// ### DISPLAY functionality ###


// ### Set event listeners ###
loanButton.addEventListener("click", handleLoan);
workButton.addEventListener("click", handleWork);
depositButton.addEventListener("click", handleDeposit);
computersElement.addEventListener("change", handleComputerChange);
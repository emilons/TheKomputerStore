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
balanceElement.innerHTML = 0;
loanElement.innerHTML = 0;

const handleLoan = () => {
    let balance = parseInt(balanceElement.innerHTML);
    let maxLoanAmount = 2*balance;
    let outstandingLoan = parseInt(loanElement.innerHTML);
    if (outstandingLoan > 0) {
        let loan = confirm("Cannot grant another loan untill outstanding loan is repaid");
    }
    else {
        let promptMessage = "Please enter loan amount (max: " + maxLoanAmount + ")"
        let loan = prompt(promptMessage, "" + maxLoanAmount);
        if (loan === null) return;
        loanElement.innerHTML = loan;
        balance += parseInt(loan);
        balanceElement.innerHTML = balance;
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

payElement.innerHTML = 0;

const handleWork = () => {
    let pay = parseInt(payElement.innerHTML);
    let hourlyRate = 100;
    pay += hourlyRate;
    payElement.innerHTML = pay;
}

const handleDeposit = () => {
    let pay = parseInt(payElement.innerHTML);
    let balance = parseInt(balanceElement.innerHTML);
    let loan = parseInt(loanElement.innerHTML);
    if (loan > 0) {
        if (pay >= loan) {
            pay -= loan;
            balance += pay;
            outstandingLoan = 0;
            loan = 0;
            handleLoanVisibility();
        }
        else {
            loan -= pay;
            outstandingLoan = loan;
            
        }
        loanElement.innerHTML = loan;
    }
    else {
        balance += pay;
    }
    payElement.innerHTML = 0;
    balanceElement.innerHTML = balance;
}

// ### Computer functionality ###

let computers = []

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToSale(computers))
    .then(() => setDefaultComputerDescription())

const addComputersToSale = (computers) => {
    computers.forEach(element => addComputerToSale(element));
}

const addComputerToSale = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    computersElement.appendChild(computerElement);
}

const setDefaultComputerDescription = () => {
    const computerElement = computers[0];
    descriptionElement.innerHTML = computerElement.description;
}

const handleComputerChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    descriptionElement.innerHTML = selectedComputer.description;
}

// ### DISPLAY functionality ###


// ### Set event listeners ###
loanButton.addEventListener("click", handleLoan);
workButton.addEventListener("click", handleWork);
depositButton.addEventListener("click", handleDeposit);
computersElement.addEventListener("change", handleComputerChange);
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
let startingBalance = 0;
let loanTaken = 0;
loanBlockElement.style.visibility = "hidden";



balanceElement.innerHTML = startingBalance;

loanElement.innerHTML = loanTaken;



if (parseInt(loanElement.innerHTML) > 0) {
    loanBlockElement.style.visibility = "visible";
}

const handleLoan = () => {
    let maxLoanAmount = parseInt(balanceElement.innerHTML)*2;
    // if already has a loan...
}


// ### Work functionality ###
let startingPay = 0;
let hourlyRate = 100;


payElement.innerHTML = startingPay;

// Add functionality so that working after a time increases hourlyRate

const handleWork = () => {
    let pay = parseInt(payElement.innerHTML);
    pay += hourlyRate;
    payElement.innerHTML = pay;
}

const handleDeposit = () => {
    let pay = parseInt(payElement.innerHTML);
    let balance = parseInt(balanceElement.innerHTML);
    balance += pay;
    payElement.innerHTML = 0;
    balanceElement.innerHTML = balance;
}

// ### Computer functionality ###

let computers = []

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToSale(computers));


const addComputersToSale = (computers) => {
    computers.forEach(element => addComputerToSale(element));
}

const addComputerToSale = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    computersElement.appendChild(computerElement);
}

const handleComputerChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    descriptionElement.innerHTML = selectedComputer.description;
}

// ### Set event listeners ###
loanButton.addEventListener("click", handleLoan);
workButton.addEventListener("click", handleWork);
depositButton.addEventListener("click", handleDeposit);
computersElement.addEventListener("change", handleComputerChange);
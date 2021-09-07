const bankElement = document.getElementById("bank");
const loanBlockElement = document.getElementById("loanBlock");
const loanElement = document.getElementById("loanValue");
const balanceElement = document.getElementById("balanceValue");
const payElement = document.getElementById("payValue");
const loanButton = document.getElementById("loanButton");
const workButton = document.getElementById("workButton");
const depositButton = document.getElementById("depositButton");


let startingBalance = 0;
let startingPay = 0;
let hourlyRate = 100;
let loanTaken = 0;
loanBlockElement.style.visibility = "hidden";

balanceElement.innerHTML = startingBalance;
payElement.innerHTML = startingPay;
loanElement.innerHTML = loanTaken;

if (parseInt(loanElement.innerHTML) > 0) {
    loanBlockElement.style.visibility = "visible";
}

const handleLoan = () => {
    
}

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

workButton.addEventListener("click", handleWork);
depositButton.addEventListener("click", handleDeposit);
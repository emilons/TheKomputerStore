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
const repayButton = document.getElementById("repayButton");

// ### Bank functionality ###

loanBlockElement.style.visibility = "hidden";
repayButton.style.visibility = "hidden";
balanceElement.innerText = `0 kr`;
loanElement.innerText = `0 kr`;

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
        loanElement.innerText = `${loan} kr`;
        balance += parseInt(loan);
        balanceElement.innerText = `${balance} kr`;
        handleLoanVisibility();
    }
}

// Helper function to set visibility and styling of loan and loan repayment functionality
const handleLoanVisibility = () => {
    let visibility = loanBlockElement.style.visibility;
    if (visibility === "visible") {
        loanBlockElement.style.visibility = "hidden";
        repayButton.style.visibility = "hidden";
        // loanBlockElement.style.marginBottom = "0";
        // repayButton.style.marginBottom = "0";
    }
    else {
        loanBlockElement.style.visibility = "visible";
        repayButton.style.visibility = "visible";
        // loanBlockElement.style.marginBottom = ".4rem";
        // repayButton.style.marginBottom = ".5rem";
    }
}

// ### Work functionality ###

payElement.innerText = `0 kr`;

const handleWork = () => {
    let pay = parseInt(payElement.innerText);
    let hourlyRate = 100;
    pay += hourlyRate;
    payElement.innerText = `${pay} kr`;
}

const handleDeposit = () => {
    let pay = parseInt(payElement.innerText);
    let balance = parseInt(balanceElement.innerText);
    let loan = parseInt(loanElement.innerText);
    if (loan > 0) {
        // fix so loan cant be negative...
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
        loanElement.innerText = `${loan} kr`;
    }
    else {
        balance += pay;
    }
    payElement.innerText = `0 kr`;
    balanceElement.innerText = `${balance} kr`;
}

const handleRepayLoan = () => {
    let pay = parseInt(payElement.innerText);
    let balance = parseInt(balanceElement.innerText);
    let loan = parseInt(loanElement.innerText);
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
    loanElement.innerHTML = `${loan} kr`;
    payElement.innerText = `0 kr`;
    balanceElement.innerText = `${balance} kr`;
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

// Helper function for handling comupter change, both for computer selection and the buy computer section
 const handleComputerChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    descriptionElement.innerText = "";
    selectedComputer.specs.map(element => {
        const listElement = document.createElement("li");
        listElement.innerText = element;
        descriptionElement.appendChild(listElement)
    })
}

// ### Buy Laptop functionality ###


// ### Set event listeners ###
loanButton.addEventListener("click", handleLoan);
workButton.addEventListener("click", handleWork);
depositButton.addEventListener("click", handleDeposit);
repayButton.addEventListener("click", handleRepayLoan);
computersElement.addEventListener("change", handleComputerChange);
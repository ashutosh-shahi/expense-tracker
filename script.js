const filterCategory =
document.getElementById("filterCategory");

const themeBtn =
document.getElementById("themeBtn");

const addBtn =
document.getElementById("addBtn");

const clearBtn =
document.getElementById("clearBtn");

const expenseList =
document.getElementById("expenseList");

const searchInput =
document.getElementById("search");


// ======================
// Dark Mode
// ======================

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

});


// ======================
// Variables
// ======================

let totalExpense = 0;
let expenseCount = 0;

let expenses =
JSON.parse(localStorage.getItem("expenses")) || [];


// ======================
// Update Stats
// ======================

function updateStats() {

    document.getElementById("count").textContent =
    `Number of Expenses: ${expenseCount}`;

    document.getElementById("total").textContent =
    `Total Expenses: ₹${totalExpense}`;
}


// ======================
// Filter Expenses
// ======================

function filterExpenses() {

    const selectedCategory =
    filterCategory.value;

    const searchText =
    searchInput.value.toLowerCase();

    const expenseItems =
    document.querySelectorAll("#expenseList li");

    expenseItems.forEach((item) => {

        const matchesSearch =
        item.textContent
            .toLowerCase()
            .includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            item.dataset.category === selectedCategory;

        if(matchesSearch && matchesCategory) {

            item.style.display = "flex";

        } else {

            item.style.display = "none";

        }

    });

}


// ======================
// Create Expense Element
// ======================

function createExpenseElement(expense) {

    const li =
    document.createElement("li");

    li.dataset.category =
    expense.category;

    li.textContent =
    `${expense.category} - ${expense.name} - ₹${expense.amount}`;

    const deleteBtn =
    document.createElement("button");

    deleteBtn.textContent =
    "Delete";

    li.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", () => {

        const index =
        expenses.findIndex((item) =>

            item.category === expense.category &&
            item.name === expense.name &&
            item.amount === expense.amount

        );

        if(index > -1) {

            expenses.splice(index, 1);

        }

        localStorage.setItem(
            "expenses",
            JSON.stringify(expenses)
        );

        li.remove();

        totalExpense -= expense.amount;
        expenseCount--;

        updateStats();

    });

    expenseList.appendChild(li);

}


// ======================
// Load Saved Expenses
// ======================

expenses.forEach((expense) => {

    createExpenseElement(expense);

    totalExpense += expense.amount;
    expenseCount++;

});

updateStats();


// ======================
// Add Expense
// ======================

addBtn.addEventListener("click", () => {

    const category =
    document.getElementById("category").value;

    const name =
    document.getElementById("expenseName").value;

    const amount = Number(
        document.getElementById("expenseAmount").value
    );

    if(name.trim() === "" || amount <= 0) {

        alert(
            "Please enter a valid expense and amount"
        );

        return;

    }

    const expense = {

        category: category,
        name: name,
        amount: amount

    };

    expenses.push(expense);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    createExpenseElement(expense);

    filterExpenses();

    totalExpense += amount;
    expenseCount++;

    updateStats();

    document.getElementById("expenseName").value = "";

    document.getElementById("expenseAmount").value = "";

});


// ======================
// Clear All
// ======================

clearBtn.addEventListener("click", () => {

    expenses = [];

    localStorage.removeItem("expenses");

    expenseList.innerHTML = "";

    totalExpense = 0;
    expenseCount = 0;

    updateStats();

});


// ======================
// Search
// ======================

searchInput.addEventListener(
    "input",
    filterExpenses
);


// ======================
// Category Filter
// ======================

filterCategory.addEventListener(
    "change",
    filterExpenses
);
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
let totalExpense = 0;
let expenseCount = 0;
const clearBtn = document.getElementById("clearBtn");
let expenses =
JSON.parse(localStorage.getItem("expenses")) || [];
expenses.forEach((expense) => {

    createExpenseElement(expense);

    totalExpense += expense.amount;
    expenseCount++;

});
document.getElementById("count").textContent =
`Number of Expenses: ${expenseCount}`;

document.getElementById("total").textContent =
`Total Expenses: ₹${totalExpense}`;
clearBtn.addEventListener("click", () => {

    expenses = [];

    localStorage.removeItem("expenses");

    expenseList.innerHTML = "";

    totalExpense = 0;
    expenseCount = 0;

    document.getElementById("count").textContent =
    `Number of Expenses: ${expenseCount}`;

    document.getElementById("total").textContent =
    `Total Expenses: ₹${totalExpense}`;

});
function createExpenseElement(expense) {
    console.log("createExpenseElement called");
    const li = document.createElement("li");

    li.textContent =
    `${expense.category} - ${expense.name} - ₹${expense.amount}`;

    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";

    li.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", () => {

        const index = expenses.findIndex((item) =>
            item.category === expense.category &&
            item.name === expense.name &&
            item.amount === expense.amount
        );

        if(index > -1){
            expenses.splice(index, 1);
        }

        localStorage.setItem(
            "expenses",
            JSON.stringify(expenses)
        );

        li.remove();

        totalExpense -= expense.amount;
        expenseCount--;

        document.getElementById("count").textContent =
        `Number of Expenses: ${expenseCount}`;

        document.getElementById("total").textContent =
        `Total Expenses: ₹${totalExpense}`;

    });

    expenseList.appendChild(li);
}

    
addBtn.addEventListener("click", () => {
    const category =
        document.getElementById("category").value;

    const name =
        document.getElementById("expenseName").value;

    const amount = Number(
    document.getElementById("expenseAmount").value
    );

    if (name.trim() === "" || amount <= 0) {
        alert("Please enter a valid expense and amount");
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
    console.log(expenses);

    
    
    
    createExpenseElement(expense);

    
    document.getElementById("expenseName").value = "";

    document.getElementById("expenseAmount").value = "";
    totalExpense += amount;
    

    expenseCount++;

    document.getElementById("count").textContent =
    `Number of Expenses: ${expenseCount}`;

    document.getElementById("total").textContent =
    `Total Expenses: ₹${totalExpense}`;

});
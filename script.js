const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
let totalExpense = 0;
let expenseCount = 0;
const expenses = [];
addBtn.addEventListener("click", () => {

    const name =
        document.getElementById("expenseName").value;

    const amount = Number(
    document.getElementById("expenseAmount").value
    );
    if (name.trim() === "" || amount <= 0) {
        alert("Please enter a valid expense and amount");
        return;
    }
    const expenseString = `${name}-${amount}`;

    if (expenses.includes(expenseString)) {
        alert("Expense already exists");
        return;
    }

    const li = document.createElement("li");

    li.textContent = `${name} - ₹${amount}`;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    li.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", () => {
        const index = expenses.indexOf(expenseString);

        if (index > -1) {
        expenses.splice(index, 1);
        }

        li.remove();

        totalExpense -= amount;
        expenseCount--;

        document.getElementById("count").textContent =
        `Number of Expenses: ${expenseCount}`;

        document.getElementById("total").textContent =
            `Total Expenses: ₹${totalExpense}`;

    

    });

    expenseList.appendChild(li);
    document.getElementById("expenseName").value = "";

    document.getElementById("expenseAmount").value = "";
    totalExpense += amount;
    expenses.push(expenseString);

    expenseCount++;

    document.getElementById("count").textContent =
    `Number of Expenses: ${expenseCount}`;

    document.getElementById("total").textContent =
    `Total Expenses: ₹${totalExpense}`;

});
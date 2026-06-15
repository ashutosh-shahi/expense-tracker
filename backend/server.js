const express = require("express");

const app = express();

app.use(express.json());

let expenses = [
    {
        id: 1,
        category: "Food",
        name: "Pizza",
        amount: 500
    }
];


// ======================
// GET ALL EXPENSES
// ======================

app.get("/expenses", (req, res) => {

    res.json(expenses);

});


// ======================
// ADD EXPENSE
// ======================

app.post("/expenses", (req, res) => {

    const expense = {
        id: Date.now(),
        ...req.body
    };

    expenses.push(expense);

    res.status(201).json({
        message: "Expense Added Successfully",
        expense: expense
    });

});


// ======================
// DELETE EXPENSE
// ======================

app.delete("/expenses/:id", (req, res) => {

    const id = Number(req.params.id);

    expenses = expenses.filter(
        expense => expense.id !== id
    );

    res.json({
        message: "Expense Deleted Successfully"
    });

});


// ======================
// UPDATE EXPENSE
// ======================

app.put("/expenses/:id", (req, res) => {

    const id = Number(req.params.id);

    const expense = expenses.find(
        expense => expense.id === id
    );

    if (!expense) {

        return res.status(404).json({
            message: "Expense Not Found"
        });

    }

    expense.category =
        req.body.category;

    expense.name =
        req.body.name;

    expense.amount =
        req.body.amount;

    res.json({
        message: "Expense Updated Successfully",
        expense: expense
    });

});


// ======================
// START SERVER
// ======================

app.listen(3000, () => {

    console.log(
        "Server running on port 3000"
    );

});
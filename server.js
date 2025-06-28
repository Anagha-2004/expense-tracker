const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");


// Middleware to parse JSON
app.use(express.json());

// In-memory expenses array
let expenses = [];
let currentId = 1;

// Route to get all expenses
app.get("/api/expenses", (req, res) => {
  res.json(expenses);
});

// Route to add an expense
app.post("/api/expenses", (req, res) => {
  const { description, amount } = req.body;
  if (!description || !amount) {
    return res.status(400).json({ message: "Description and amount are required." });
  }
  const expense = { id: currentId++, description, amount };
  expenses.push(expense);
  res.status(201).json(expense);
});

// Route to delete an expense
app.delete("/api/expenses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Expense not found." });
  }
  expenses.splice(index, 1);
  res.json({ message: "Expense deleted." });
});
// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));


// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

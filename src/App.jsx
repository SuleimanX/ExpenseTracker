import "./App.css";

import { useState } from "react";

const initialTransactions = [
  {
    id: 1,
    description: "Salary",
    amount: 80000,
    type: "income",
  },
  {
    id: 2,
    description: "Groceries",
    amount: 4500,
    type: "expense",
  },
  {
    id: 3,
    description: "Transport",
    amount: 2000,
    type: "expense",
  },
];

function App() {
  const [transactions, setTransactions] = useState(initialTransactions);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = income - expenses;

  const handleSubmit = (event) => {
    event.preventDefault();

    const numericAmount = Number(amount);

    setError("");
    setSuccessMessage("");

    if (!description.trim()) {
      setError("Please enter a transaction description.");
      return;
    }

    if (!amount || numericAmount <= 0) {
      setError("Please enter an amount greater than zero.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      description: description.trim(),
      amount: numericAmount,
      type,
    };

    setTransactions((currentTransactions) => [
      newTransaction,
      ...currentTransactions,
    ]);

    setDescription("");
    setAmount("");
    setType("expense");
    setSuccessMessage("Transaction added successfully.");
  };

  return (
    <main className="app">
      <header className="app-header">
        <h1>Expense Tracker</h1>
        <p>Manage your income and expenses in one place.</p>
      </header>

      <section className="dashboard">
        <h2>Add Transaction</h2>

        <form onSubmit={handleSubmit} className="transaction-form">
          {error && (
            <p className="form-message form-error" role="alert">
              {error}
            </p>
          )}

          {successMessage && (
            <p className="form-message form-success" role="status">
              {successMessage}
            </p>
          )}

          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="e.g. Groceries"
          />

          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="e.g. 1500"
            min="0"
            step="0.01"
          />

          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button type="submit">Add Transaction</button>
        </form>

        <div className="summary-cards">
          <article className="summary-card">
            <h3>Balance</h3>
            <p>KSh {balance.toLocaleString()}</p>
          </article>

          <article className="summary-card">
            <h3>Income</h3>
            <p>KSh {income.toLocaleString()}</p>
          </article>

          <article className="summary-card">
            <h3>Expenses</h3>
            <p>KSh {expenses.toLocaleString()}</p>
          </article>
        </div>

        <section className="transactions">
          <h2>Recent Transactions</h2>

          <ul className="transaction-list">
            {transactions.map((transaction) => (
              <li className="transaction-item" key={transaction.id}>
                <span>{transaction.description}</span>

                <span>
                  {transaction.type === "expense" ? "-" : "+"}KSh{" "}
                  {transaction.amount.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

export default App;

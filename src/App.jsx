import "./App.css";


const transactions = [
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
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = income - expenses;

  return (
    <main className="app">
      <header className="app-header">
        <h1>Expense Tracker</h1>
        <p>Manage your income and expenses in one place.</p>
      </header>

      <section className="dashboard">
        <h2>Dashboard</h2>

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
      </section>
    </main>
  );
}

export default App;
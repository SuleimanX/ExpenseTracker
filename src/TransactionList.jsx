import { useState } from "react";

function TransactionList({ transactions, onDelete }) {
  const [filter, setFilter] = useState("all");

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((transaction) => transaction.type === filter);

  return (
    <section className="transactions">
      <div className="transactions-header">
        <h2>Recent Transactions</h2>

        <div
          className="transaction-filters"
          role="group"
          aria-label="Transaction filters"
        >
          <span className="filter-status">
            Currently showing:{" "}
            {filter === "all"
              ? "All transactions"
              : filter === "income"
                ? "Income"
                : "Expenses"}
          </span>
          <button
            type="button"
            className={
              filter === "all" ? "filter-button active" : "filter-button"
            }
            onClick={() => setFilter("all")}
            aria-pressed={filter === "all"}
          >
            All
          </button>

          <button
            type="button"
            className={
              filter === "income" ? "filter-button active" : "filter-button"
            }
            onClick={() => setFilter("income")}
            aria-pressed={filter === "income"}
          >
            Income
          </button>

          <button
            type="button"
            className={
              filter === "expense" ? "filter-button active" : "filter-button"
            }
            onClick={() => setFilter("expense")}
            aria-pressed={filter === "expense"}
          >
            Expenses
          </button>
        </div>
      </div>

      {transactions.length === 0 ? (
        <p className="empty-state">
          No transactions yet. Add your first transaction using the form above.
        </p>
      ) : filteredTransactions.length === 0 ? (
        <p className="empty-state">
          No transactions match the selected filter.
        </p>
      ) : (
        <ul className="transaction-list">
          {filteredTransactions.map((transaction) => (
            <li className="transaction-item" key={transaction.id}>
              <div className="transaction-details">
                <span>{transaction.description}</span>

                <span className={transaction.type === "expense" ? "transaction-amount expense" : "transaction-amount income"}>
                  {transaction.type === "expense" ? "-" : "+"}KSh{" "}
                  {transaction.amount.toLocaleString()}
                </span>
              </div>

              <button
                type="button"
                className="delete-button"
                onClick={() => onDelete(transaction.id)}
                aria-label={`Delete ${transaction.description} transaction`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TransactionList;

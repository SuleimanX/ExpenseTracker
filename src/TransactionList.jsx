function TransactionList({ transactions, onDelete }) {
  return (
    <section className="transactions">
      <h2>Recent Transactions</h2>

      {transactions.length === 0 ? (
        <p className="empty-state">
          No transactions yet. Add your first transaction using the form
          above.
        </p>
      ) : (
        <ul className="transaction-list">
          {transactions.map((transaction) => (
            <li className="transaction-item" key={transaction.id}>
              <div className="transaction-details">
                <span>{transaction.description}</span>

                <span>
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
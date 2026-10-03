function ExpenseItem({ item, onDelete }) {
  return (
    <div className="expense-item">
      <span className="item-title">{item.title}</span>
      <div className="item-actions">
        <span className="item-amount">Rs. {Number(item.amount).toFixed(2)}</span>
        <button
          className="delete-btn"
          onClick={() => onDelete(item.id)}
          title="Delete expense"
          aria-label={`Delete ${item.title}`}
        >
          ❌
        </button>
      </div>
    </div>
  )
}

export default ExpenseItem
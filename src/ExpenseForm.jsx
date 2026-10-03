import { useState, useRef } from 'react'

function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const titleRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !amount) {
      alert("Please fill all fields!")
      return
    }

    const parsedAmount = parseFloat(amount)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid amount!")
      return
    }

    const newExpense = {
      id: Date.now(),
      title: title.trim(),
      amount: parsedAmount
    }

    onAddExpense(newExpense)
    setTitle("")
    setAmount("")
    titleRef.current?.focus()
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-inputs-row">
        <input
          className="title-input"
          placeholder="Expense Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={titleRef}
        />
        <input
          className="amount-input"
          placeholder="Amount (PKR)"
          type="number"
          step="any"
          min="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button type="submit" className="add-btn">Add Expense</button>
    </form>
  )
}

export default ExpenseForm
import { useState, useEffect } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      } catch (e) {
        console.error(e)
      }
    }
    return [
      { id: 1, title: 'Internet Charges', amount: 2500 },
      { id: 2, title: 'Train Ticket', amount: 1200 }
    ]
  })

  // Save to LocalStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses])

  // Add New Expense
  const addExpense = (expense) => {
    setExpenses((prev) => [expense, ...prev])
  }

  // Delete Expense
  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id))
  }

  // Clear all
  const clearExpenses = () => {
    if (expenses.length === 0) return
    if (window.confirm("Are you sure you want to clear all expenses?")) {
      setExpenses([])
    }
  }

  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0)

  return (
    <div className="page-wrapper">
      <div className="app-container">
        <h1>💰 Expense Tracker</h1>
        
        <ExpenseForm onAddExpense={addExpense} />

        <div className="total-container">
          <h3 className="total">
            Total Expense: <span className="total-amount">Rs. {totalExpenses.toFixed(2)}</span>
          </h3>
          {expenses.length > 0 && (
            <button className="clear-btn" onClick={clearExpenses}>
              Clear All
            </button>
          )}
        </div>

        <ExpenseList expenses={expenses} onDelete={deleteExpense} />
      </div>
    </div>
  )
}

export default App

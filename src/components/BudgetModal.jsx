import React, { useState } from 'react';
import { X, Target, Sparkles } from 'lucide-react';
import { formatMoney } from '../constants/currencies';

export default function BudgetModal({ isOpen, onClose, currentBudget, currencySymbol, onSaveBudget }) {
  const [budgetVal, setBudgetVal] = useState(currentBudget || '');

  if (!isOpen) return null;

  const quickPicks = [10000, 20000, 35000, 50000, 75000, 100000];

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(budgetVal);
    if (isNaN(val) || val <= 0) {
      return;
    }
    onSaveBudget(val);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-icon-badge">
              <Target size={20} />
            </div>
            <div>
              <h3>Monthly Budget Goal</h3>
              <p className="modal-subtitle">Set your spending limit to track and avoid overspending</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <label className="input-label" htmlFor="budget-input">
            Target Monthly Expense Budget ({currencySymbol})
          </label>
          <div className="input-group">
            <span className="input-prefix">{currencySymbol}</span>
            <input
              id="budget-input"
              type="number"
              step="any"
              min="1"
              value={budgetVal}
              onChange={(e) => setBudgetVal(e.target.value)}
              placeholder="e.g. 25000"
              autoFocus
              required
            />
          </div>

          <div className="quick-picks-section">
            <span className="quick-picks-label">Quick Suggestions:</span>
            <div className="quick-picks-grid">
              {quickPicks.map((amount) => (
                <button
                  type="button"
                  key={amount}
                  className={`quick-pick-btn ${parseFloat(budgetVal) === amount ? 'active' : ''}`}
                  onClick={() => setBudgetVal(amount.toString())}
                >
                  {formatMoney(amount, currencySymbol)}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Sparkles size={16} /> Save Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

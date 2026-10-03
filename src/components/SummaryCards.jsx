import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Target,
  AlertTriangle,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { formatMoney } from '../constants/currencies';

export default function SummaryCards({
  totalIncome,
  totalExpense,
  balance,
  budget,
  currencySymbol,
  onOpenBudgetModal,
}) {
  const expensePercentage = budget > 0 ? Math.min(Math.round((totalExpense / budget) * 100), 100) : 0;
  const rawPercentage = budget > 0 ? Math.round((totalExpense / budget) * 100) : 0;
  const remainingBudget = budget - totalExpense;

  let budgetStatus = 'safe';
  let budgetColor = '#10b981';
  let budgetLabel = 'Healthy';

  if (rawPercentage >= 100) {
    budgetStatus = 'danger';
    budgetColor = '#ef4444';
    budgetLabel = 'Exceeded';
  } else if (rawPercentage >= 80) {
    budgetStatus = 'warning';
    budgetColor = '#f59e0b';
    budgetLabel = 'Near Limit';
  }

  return (
    <div className="summary-grid">
      {/* Net Balance Card */}
      <div className="card summary-card balance-card">
        <div className="card-top">
          <span className="card-title">Net Balance</span>
          <div className="card-icon-badge balance-badge">
            <Wallet size={20} />
          </div>
        </div>
        <div className="card-value-wrap">
          <span className={`card-value ${balance >= 0 ? 'text-positive' : 'text-negative'}`}>
            {formatMoney(balance, currencySymbol)}
          </span>
        </div>
        <div className="card-subtext">
          <span>Income minus Expenses</span>
        </div>
      </div>

      {/* Total Expenses Card */}
      <div className="card summary-card expense-card">
        <div className="card-top">
          <span className="card-title">Total Spending</span>
          <div className="card-icon-badge expense-badge">
            <TrendingDown size={20} />
          </div>
        </div>
        <div className="card-value-wrap">
          <span className="card-value text-rose">
            {formatMoney(totalExpense, currencySymbol)}
          </span>
        </div>
        <div className="card-subtext">
          <span>Active spending outflow</span>
        </div>
      </div>

      {/* Total Income Card */}
      <div className="card summary-card income-card">
        <div className="card-top">
          <span className="card-title">Total Inflow</span>
          <div className="card-icon-badge income-badge">
            <TrendingUp size={20} />
          </div>
        </div>
        <div className="card-value-wrap">
          <span className="card-value text-emerald">
            {formatMoney(totalIncome, currencySymbol)}
          </span>
        </div>
        <div className="card-subtext">
          <span>Earnings & Deposits</span>
        </div>
      </div>

      {/* Monthly Budget Card */}
      <div className="card summary-card budget-card">
        <div className="card-top">
          <div className="budget-title-wrap">
            <span className="card-title">Monthly Budget</span>
            <button
              type="button"
              className="budget-edit-link"
              onClick={onOpenBudgetModal}
              title="Change target budget"
            >
              Edit
            </button>
          </div>
          <div className={`card-icon-badge budget-badge status-${budgetStatus}`}>
            <Target size={20} />
          </div>
        </div>

        <div className="budget-value-row">
          <span className="budget-target-val">
            {formatMoney(budget, currencySymbol)}
          </span>
          <span className={`budget-pill pill-${budgetStatus}`}>
            {rawPercentage}% {budgetLabel}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar-bg" title={`${rawPercentage}% of budget used`}>
          <div
            className={`progress-bar-fill fill-${budgetStatus}`}
            style={{ width: `${Math.min(rawPercentage, 100)}%` }}
          />
        </div>

        <div className="card-subtext budget-footer">
          {remainingBudget >= 0 ? (
            <span>
              <strong>{formatMoney(remainingBudget, currencySymbol)}</strong> left to spend
            </span>
          ) : (
            <span className="text-danger font-medium flex items-center gap-1">
              <AlertTriangle size={13} />
              Over by {formatMoney(Math.abs(remainingBudget), currencySymbol)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

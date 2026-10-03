import React, { useState } from 'react';
import { PieChart, BarChart3, Sparkles, TrendingUp } from 'lucide-react';
import { formatMoney } from '../constants/currencies';
import { getCategoryMeta } from '../constants/categories';

export default function AnalyticsCharts({ expenses, currencySymbol }) {
  const [activeTab, setActiveTab] = useState('category'); // 'category' | 'trend'

  // Only consider expense items for spending analytics
  const expenseItems = expenses.filter((item) => (item.type || 'expense') === 'expense');

  // Compute category totals
  const categoryMap = {};
  let totalSpent = 0;

  expenseItems.forEach((item) => {
    const catId = item.category || 'other';
    const amount = Number(item.amount) || 0;
    totalSpent += amount;
    if (!categoryMap[catId]) {
      const meta = getCategoryMeta(catId, 'expense');
      categoryMap[catId] = {
        id: catId,
        name: meta.name,
        icon: meta.icon,
        color: meta.color,
        amount: 0,
        count: 0,
      };
    }
    categoryMap[catId].amount += amount;
    categoryMap[catId].count += 1;
  });

  const categoryList = Object.values(categoryMap).sort((a, b) => b.amount - a.amount);

  // Calculate donut segments (SVG circle stroke-dasharray)
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  const donutSegments = categoryList.map((cat) => {
    const percent = totalSpent > 0 ? cat.amount / totalSpent : 0;
    const strokeDasharray = `${percent * circumference} ${circumference}`;
    const strokeDashoffset = -accumulatedPercent * circumference;
    accumulatedPercent += percent;
    return {
      ...cat,
      percent: Math.round(percent * 100),
      strokeDasharray,
      strokeDashoffset,
    };
  });

  // Calculate last 7 days daily spending
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
    last7Days.push({
      dateStr,
      label: dayLabel,
      total: 0,
    });
  }

  expenseItems.forEach((item) => {
    const itemDate = item.date ? item.date.split('T')[0] : '';
    const dayObj = last7Days.find((d) => d.dateStr === itemDate);
    if (dayObj) {
      dayObj.total += Number(item.amount) || 0;
    }
  });

  const maxDaySpending = Math.max(...last7Days.map((d) => d.total), 1);
  const topCategory = categoryList[0];

  return (
    <div className="card analytics-card">
      <div className="analytics-header">
        <div className="analytics-title-wrap">
          <div className="analytics-icon-badge">
            {activeTab === 'category' ? <PieChart size={18} /> : <BarChart3 size={18} />}
          </div>
          <div>
            <h3 className="analytics-title">Spending Analytics</h3>
            <p className="analytics-subtitle">Visual breakdown of your expenditure</p>
          </div>
        </div>

        <div className="tab-pill-group">
          <button
            type="button"
            className={`tab-pill ${activeTab === 'category' ? 'active' : ''}`}
            onClick={() => setActiveTab('category')}
          >
            <PieChart size={14} /> Categories
          </button>
          <button
            type="button"
            className={`tab-pill ${activeTab === 'trend' ? 'active' : ''}`}
            onClick={() => setActiveTab('trend')}
          >
            <BarChart3 size={14} /> 7-Day Trend
          </button>
        </div>
      </div>

      {expenseItems.length === 0 ? (
        <div className="analytics-empty">
          <p>Add some expenses to unlock visual spending insights!</p>
        </div>
      ) : activeTab === 'category' ? (
        <div className="donut-layout">
          {/* SVG Donut */}
          <div className="donut-graphic-wrapper">
            <svg viewBox="0 0 160 160" className="donut-svg">
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="donut-bg-ring"
              />
              {donutSegments.map((segment) => (
                <circle
                  key={segment.id}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke={segment.color}
                  strokeWidth="20"
                  strokeDasharray={segment.strokeDasharray}
                  strokeDashoffset={segment.strokeDashoffset}
                  className="donut-segment"
                />
              ))}
            </svg>
            <div className="donut-center-text">
              <span className="donut-center-label">Total Outflow</span>
              <span className="donut-center-amount">{formatMoney(totalSpent, currencySymbol)}</span>
            </div>
          </div>

          {/* Category Legend & Breakdown List */}
          <div className="category-legend-list">
            {donutSegments.map((cat) => (
              <div key={cat.id} className="legend-item">
                <div className="legend-item-left">
                  <span className="legend-emoji">{cat.icon}</span>
                  <div className="legend-meta">
                    <span className="legend-name">{cat.name}</span>
                    <span className="legend-count">{cat.count} txns</span>
                  </div>
                </div>
                <div className="legend-item-right">
                  <span className="legend-amount">{formatMoney(cat.amount, currencySymbol)}</span>
                  <div className="legend-bar-wrap">
                    <div
                      className="legend-bar-fill"
                      style={{
                        width: `${cat.percent}%`,
                        backgroundColor: cat.color,
                      }}
                    />
                    <span className="legend-percent">{cat.percent}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Trend Tab */
        <div className="trend-layout">
          <div className="trend-bars-container">
            {last7Days.map((day) => {
              const heightPercent = Math.max(Math.round((day.total / maxDaySpending) * 100), 4);
              return (
                <div key={day.dateStr} className="trend-col" title={`${day.label} (${day.dateStr}): ${formatMoney(day.total, currencySymbol)}`}>
                  <div className="trend-bar-wrapper">
                    <span className="trend-bar-tooltip">
                      {formatMoney(day.total, currencySymbol)}
                    </span>
                    <div
                      className="trend-bar"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="trend-col-label">{day.label}</span>
                </div>
              );
            })}
          </div>

          {topCategory && (
            <div className="smart-insight-banner">
              <Sparkles size={16} className="text-amber" />
              <span>
                Highest spending is on <strong>{topCategory.name}</strong> ({topCategory.percent}% of expenses).
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

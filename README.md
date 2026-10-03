# 💰 ExpenseTracker Pro

A modern, responsive, and intuitive personal finance and expense tracking application built with **React**, **Vite**, and vanilla **CSS Design Tokens**.

---

## ✨ Features

- **📊 Comprehensive Financial Overview**:
  - **Net Balance**: Live calculation of total earnings minus total expenses.
  - **Total Inflow & Outflow**: Categorized tracking of all income deposits and expenditures.
  - **Monthly Budget Tracking**: Visual progress bar indicating budget safety, warnings (at 80%), and overspending alerts (at 100%+).
  - **Custom Budget Goals**: Configure your monthly spending target at any time with quick presets.

- **📈 Visual Spending Analytics**:
  - **SVG Donut Chart**: Breakdown of expenses across categories with percentages and color codes.
  - **7-Day Spending Trend**: Dynamic bar visualizer showing daily outflows with hover amounts.
  - **Smart Insights**: Highlights your top spending category and its proportion.

- **💳 Rich Transaction Management**:
  - Supports both **Expenses** and **Income** entries.
  - Pre-configured categories (Food 🍔, Transport 🚗, Shopping 🛍️, Bills 💡, Entertainment 🎬, Health 💊, Travel ✈️, Salary 💼, Freelance 💻, etc.).
  - Payment methods tracking (UPI, Credit/Debit Card, Cash, Net Banking).
  - **Quick In-Place Edit**: Click the pencil icon on any transaction to edit it directly in the form.
  - **Delete with Undo**: Deleted transactions can be instantly restored via the floating toast notification.

- **🔍 Smart Search & Multi-Level Filtering**:
  - Real-time search across titles, categories, and payment methods.
  - Filter pills for All, Expenses Only, or Income Only.
  - Category and Timeframe (Today, Past 7 Days, This Month) dropdowns.
  - Sorting by Date (Newest/Oldest), Amount (High/Low), or Title (A–Z).

- **🌐 Data Portability & Settings**:
  - **Export to CSV**: Download your records as a standard CSV spreadsheet.
  - **Export to JSON**: Full database backup.
  - **Import CSV/JSON**: Restore or load external records seamlessly.
  - **Sample Demo Data**: Quick one-click loader to explore features with pre-populated entries.
  - **Multi-Currency Support**: Switch on-the-fly between ₹ (INR), $ (USD), € (EUR), £ (GBP), ¥ (JPY), CA$, and AU$.
  - **Dark & Light Modes**: Beautiful glassmorphism UI with smooth transitions and theme persistence in `localStorage`.

- **📁 Dual Format**:
  - Full **React + Vite** app in `src/`.
  - Standalone single-file version in `expense-tracker.html` for direct browser opening.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Running the React App
```bash
# 1. Install dependencies (already completed)
npm install

# 2. Start Vite development server
npm run dev

# 3. Open in your browser
http://localhost:5173/
```

### Production Build
```bash
npm run build
npm run preview
```

### Standalone HTML
You can also directly double-click or open [expense-tracker.html](file:///c:/Users/jj332/OneDrive/Desktop/expense-tracker/expense-tracker.html) in any browser without needing a Node server.

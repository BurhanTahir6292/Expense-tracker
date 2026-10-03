import React, { useState, useRef, useEffect } from 'react';
import {
  Wallet,
  Sun,
  Moon,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  FileSpreadsheet,
  FileCode,
  Trash2
} from 'lucide-react';
import { CURRENCIES } from '../constants/currencies';

export default function Navbar({
  currency,
  onCurrencyChange,
  theme,
  onToggleTheme,
  onOpenBudgetModal,
  onExportCSV,
  onExportJSON,
  onImportData,
  onLoadDemoData,
  onClearAll,
}) {
  const [dataMenuOpen, setDataMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setDataMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportData(file);
      e.target.value = '';
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="brand-group">
          <div className="brand-logo">
            <Wallet size={24} />
          </div>
          <div className="brand-info">
            <h1 className="brand-title">ExpenseTracker<span className="brand-badge">Pro</span></h1>
            <p className="brand-subtitle">Smart Personal Finance & Budgeting</p>
          </div>
        </div>

        <div className="nav-actions">
          {/* Currency Selector */}
          <div className="currency-selector-wrapper">
            <select
              value={currency.code}
              onChange={(e) => {
                const found = CURRENCIES.find((c) => c.code === e.target.value);
                if (found) onCurrencyChange(found);
              }}
              className="currency-select"
              aria-label="Select Currency"
            >
              {CURRENCIES.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.symbol} {curr.code} ({curr.name})
                </option>
              ))}
            </select>
          </div>

          {/* Budget Setting Button */}
          <button
            type="button"
            className="nav-btn btn-budget"
            onClick={onOpenBudgetModal}
            title="Set Monthly Budget Goal"
          >
            <SlidersHorizontal size={16} />
            <span className="nav-btn-text">Budget Goal</span>
          </button>

          {/* Data Menu Dropdown (Export/Import/Demo/Reset) */}
          <div className="dropdown-wrapper" ref={menuRef}>
            <button
              type="button"
              className="nav-btn btn-menu"
              onClick={() => setDataMenuOpen(!dataMenuOpen)}
              aria-expanded={dataMenuOpen}
              title="Data management"
            >
              <span>Data</span>
              <ChevronDown size={14} className={dataMenuOpen ? 'rotate-180' : ''} />
            </button>

            {dataMenuOpen && (
              <div className="dropdown-menu animate-fade-in">
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    setDataMenuOpen(false);
                    onExportCSV();
                  }}
                >
                  <FileSpreadsheet size={16} className="text-emerald" />
                  <span>Export to CSV</span>
                </button>
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    setDataMenuOpen(false);
                    onExportJSON();
                  }}
                >
                  <FileCode size={16} className="text-indigo" />
                  <span>Export to JSON</span>
                </button>
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    setDataMenuOpen(false);
                    fileInputRef.current?.click();
                  }}
                >
                  <Upload size={16} className="text-blue" />
                  <span>Import JSON / CSV</span>
                </button>
                <div className="dropdown-divider" />
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    setDataMenuOpen(false);
                    onLoadDemoData();
                  }}
                >
                  <Sparkles size={16} className="text-amber" />
                  <span>Load Sample Demo Data</span>
                </button>
                <button
                  type="button"
                  className="dropdown-item text-danger"
                  onClick={() => {
                    setDataMenuOpen(false);
                    onClearAll();
                  }}
                >
                  <Trash2 size={16} />
                  <span>Clear All Records</span>
                </button>
              </div>
            )}
          </div>

          {/* Hidden File Input for Import */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.csv"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          {/* Theme Toggle Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export const EXPENSE_CATEGORIES = [
  { id: 'food', name: 'Food & Dining', icon: '🍔', color: '#f97316' },
  { id: 'transport', name: 'Transportation', icon: '🚗', color: '#3b82f6' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#ec4899' },
  { id: 'bills', name: 'Bills & Utilities', icon: '💡', color: '#eab308' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: '#8b5cf6' },
  { id: 'health', name: 'Health & Fitness', icon: '💊', color: '#10b981' },
  { id: 'travel', name: 'Travel & Trips', icon: '✈️', color: '#06b6d4' },
  { id: 'education', name: 'Education', icon: '📚', color: '#6366f1' },
  { id: 'other', name: 'Other Expenses', icon: '🏷️', color: '#64748b' },
];

export const INCOME_CATEGORIES = [
  { id: 'salary', name: 'Salary', icon: '💼', color: '#10b981' },
  { id: 'freelance', name: 'Freelance & Side Gig', icon: '💻', color: '#059669' },
  { id: 'investments', name: 'Investments & Returns', icon: '📈', color: '#14b8a6' },
  { id: 'gift', name: 'Gifts & Rewards', icon: '🎁', color: '#f59e0b' },
  { id: 'other_income', name: 'Other Income', icon: '💵', color: '#22c55e' },
];

export const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI' },
  { id: 'card', name: 'Credit/Debit Card' },
  { id: 'cash', name: 'Cash' },
  { id: 'net_banking', name: 'Net Banking' },
];

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export const getCategoryMeta = (categoryId, type = 'expense') => {
  const match = ALL_CATEGORIES.find((c) => c.id === categoryId);
  if (match) return match;
  return type === 'income'
    ? { id: 'other_income', name: 'Other Income', icon: '💵', color: '#22c55e' }
    : { id: 'other', name: 'Other', icon: '🏷️', color: '#64748b' };
};

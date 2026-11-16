export const gbp = (n: number) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n);
export const owned = (m: number) => (m < 12 ? `${m} month${m === 1 ? '' : 's'}` : `${Math.round((m / 12) * 10) / 10} years`);

export const formatCurrency = (val: number) =>
  `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

export const formatNav = (val: number) => (isNaN(val) ? '0.00' : val.toFixed(2));

export const formatPercent = (val: number) => `${val >= 0 ? '+' : ''}${val.toFixed(2)}%`;

export const formatDate = (str: string) =>
  new Date(str).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

export const formatShortDate = (str: string) =>
  (() => {
    const parts = new Date(str)
      .toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })
      .split(' ');
    if (parts.length < 3) {
      return parts.join(' ');
    }
    const [day, month, year] = parts;
    return `${day} ${month}'${year}`;
  })();

export const safeValue = (val: unknown, fallback = '--') =>
  val === null || val === undefined || val === '' ? fallback : String(val);

export const parseNumericInput = (text: string) => parseFloat(text.replace(/[^0-9.]/g, '')) || 0;

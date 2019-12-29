export const { format: formatPrice } = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'USD',
});

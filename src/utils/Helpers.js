export function formatCurrency (value, digits = 2) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value)
}

export function formatNumber (value, digits = 2, kFormat = false) {
  if (kFormat && Math.abs(value) > 999) {
    return `${Math.sign(value) * ((Math.abs(value) / 1000).toFixed(1))}k`
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    currency: 'BRL',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value)
}

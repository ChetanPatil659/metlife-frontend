/**
 * Formats a number to Indian currency format (Crores/Lakhs)
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatIndianCurrency = (amount) => {
  if (!amount || isNaN(amount)) return '₹0';
  
  const num = parseFloat(amount);
  
  // Convert to Crores if >= 1 Crore
  if (num >= 10000000) {
    const crores = num / 10000000;
    return `₹${crores.toFixed(1)} Cr`;
  }
  
  // Convert to Lakhs if >= 1 Lakh
  if (num >= 100000) {
    const lakhs = num / 100000;
    return `₹${lakhs.toFixed(1)} L`;
  }
  
  // For smaller amounts, show in thousands
  if (num >= 1000) {
    const thousands = num / 1000;
    return `₹${thousands.toFixed(1)}K`;
  }
  
  // For very small amounts, show as is
  return `₹${num.toFixed(0)}`;
};

/**
 * Formats yearly investment amount
 * @param {number} amount - The yearly investment amount
 * @returns {string} Formatted investment string
 */
export const formatYearlyInvestment = (amount) => {
  if (!amount || isNaN(amount)) return '₹0';
  
  const num = parseFloat(amount);
  
  // Convert to Lakhs if >= 1 Lakh
  if (num >= 100000) {
    const lakhs = num / 100000;
    return `₹${lakhs.toFixed(1)} Lacs`;
  }
  
  // For smaller amounts, show in thousands
  if (num >= 1000) {
    const thousands = num / 1000;
    return `₹${thousands.toFixed(1)}K`;
  }
  
  // For very small amounts, show as is
  return `₹${num.toFixed(0)}`;
}; 
const groupTransactionsByMonth = (transactions) => {
  
  const currentYear = new Date().getFullYear();

  // Create an array of month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Initialize an array for each month
  const monthlySums = Array.from({ length: 12 }, (_, month) => ({
    month: monthNames[month],
    totalAmount: 0
  }));

  // Calculate the monthly sums based on transactions
  for (const transaction of transactions) {
    const date = new Date(transaction.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth(); // Months are zero-based.

    if (year === currentYear) {
      monthlySums[month].totalAmount += transaction.amount;
    }
  }

  return monthlySums;

}

module.exports = {groupTransactionsByMonth};
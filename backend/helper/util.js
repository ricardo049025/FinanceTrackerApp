const isNumber = (number) => {

    return !isNaN(number);
}

const formatDateToYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1 and pad with leading zeros if needed.
    const day = String(date.getDate()).padStart(2, '0'); // Pad day with leading zeros if needed.
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  }

module.exports = {isNumber,formatDateToYYYMMDD};
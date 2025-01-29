export const formatDate = (dateString) => {
  // const dateString = data.split("_")[1];
  // const parts = data.split('_');
  // const dateString = parts.slice(2).join('_');

  const date = new Date(dateString);

  const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
  const formattedTime = date.toLocaleString('en-US', timeOptions);

  const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleString('en-US', dateOptions);

  return `${formattedTime}, ${formattedDate}`;
}

export function formatTokenNumber(num) {
    if (num < 1000) {
        return num.toString(); 
    } else if (num >= 1000 && num < 1_000_000) {
        return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "K";
    } else if (num >= 1_000_000 && num < 1_000_000_000) {
        return (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1) + "M"; 
    } else if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(num % 1_000_000_000 === 0 ? 0 : 1) + "B"; 
    }
}

export function formatNumber (num) {
  return num.toLocaleString();
};
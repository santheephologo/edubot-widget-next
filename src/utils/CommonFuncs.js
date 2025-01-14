export const formatDate = (dateString) => {
  // const dateString = data.split("_")[1];
  // const parts = data.split('_');
  // const dateString = parts.slice(2).join('_');

  const date = new Date(dateString);

  // Format time as 12-hour with AM/PM
  const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
  const formattedTime = date.toLocaleString('en-US', timeOptions);

  // Format date
  const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleString('en-US', dateOptions);

  return `${formattedTime}, ${formattedDate}`;
}
const formatDate = (value: Date): string => {
  const dateTimeFormat = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(value);
  return dateTimeFormat;
};
export default formatDate;

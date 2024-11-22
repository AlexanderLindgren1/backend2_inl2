export function generateAvailabilityDates(selectedDate: Date[]) {
  const stringDate = selectedDate.toString();

  if (typeof stringDate[0] !== 'string') {
    throw new TypeError('selectedDate must be a string');
  }
  
  const today = new Date();
  const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

  const minDate = new Date(todayUTC);
  minDate.setUTCDate(todayUTC.getUTCDate() + 7);

  const [year, month, day] = stringDate.split('-').map(Number);
  const chosenDateUTC = new Date(Date.UTC(year, month - 1, day));

  if (chosenDateUTC <= minDate) {
    throw new Error('The chosen date must be at least one week from today.');
  }

  const dates: Date[] = [];
  let currentDate = new Date(todayUTC);

  while (currentDate <= chosenDateUTC) {
    dates.push(new Date(currentDate));
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  return dates;
}

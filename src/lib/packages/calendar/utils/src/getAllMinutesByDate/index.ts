export const getAllMinutesByDate = (date: Date) => date.getMinutes() + date.getHours() * 60

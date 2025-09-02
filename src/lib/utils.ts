import moment from "moment";

export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(
  date: string | Date,
  format: string = "MMMM Do YYYY, h:mm A"
): string {
  return moment(date).format(format);
}

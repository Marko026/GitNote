import { modernTechnologies } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractKeywords(inputString: string) {
  // Modern technologies list

  const cleanedString = inputString
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .toLowerCase();

  const wordsArray = cleanedString.split(" ");

  const wordFrequency: { [key: string]: number } = {};

  wordsArray.forEach((word) => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });

  const sortedWords = Object.keys(wordFrequency).sort(
    (a, b) => wordFrequency[b] - wordFrequency[a]
  );

  const relatedWords = sortedWords.filter((word) =>
    modernTechnologies.includes(word)
  );

  return [...relatedWords.slice(0, 3), ...sortedWords.slice(0, 3)].join(" ");
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
export const extractIdFromPath = (path: string) => {
  const pathArray = path.split("/");
  return pathArray[pathArray.length - 1];
};

export function formatDateProfile(dateString: string) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const timezone = "CET";

  const formattedDate = `${month} ${day}, ${year} - ${
    hours % 12 || 12
  }:${minutes.toString().padStart(2, "0")} ${ampm} ${timezone}`;

  return formattedDate;
}
export function subtractSixMonthsFromDate(currentDate: Date) {
  if (!(currentDate instanceof Date)) {
    throw new Error("Invalid date format. Please provide a valid Date object.");
  }

  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  let newMonth = currentMonth - 6;
  let newYear = currentYear;

  if (newMonth < 0) {
    newMonth += 12;
    newYear--;
  }

  let newDate = new Date(currentDate);
  newDate.setMonth(newMonth);
  newDate.setFullYear(newYear);

  return newDate;
}

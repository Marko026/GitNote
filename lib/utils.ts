import { modernTechnologies } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractKeywords(inputString: string) {
  // Modern technologies list

  // Remove punctuation and convert to lowercase
  const cleanedString = inputString
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .toLowerCase();

  // Split the string into an array of words
  const wordsArray = cleanedString.split(" ");

  // Create an object to store the frequency of each word
  const wordFrequency: { [key: string]: number } = {};

  // Count the frequency of each word
  wordsArray.forEach((word) => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });

  // Sort the words by frequency
  const sortedWords = Object.keys(wordFrequency).sort(
    (a, b) => wordFrequency[b] - wordFrequency[a]
  );

  // Check if any word matches modern technologies list
  const relatedWords = sortedWords.filter((word) =>
    modernTechnologies.includes(word)
  );

  // Return the top one or two keywords along with related words
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

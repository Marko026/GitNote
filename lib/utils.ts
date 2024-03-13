import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractKeywords(inputString: string) {
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

  // Return the top one or two keywords
  return sortedWords.slice(0, 2).join(" ");
}

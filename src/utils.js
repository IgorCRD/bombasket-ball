export const remInPixels = rem =>
  rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

export const randomBetween = (begin, end) =>
  Math.random() * (end - begin) + begin;

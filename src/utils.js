export const remInPixels = rem =>
  rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

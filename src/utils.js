export const remInPixels = rem =>
  rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

export const randomBetween = (begin, end) =>
  Math.random() * (end - begin) + begin;

// expontial shaped curve with integral from 0 to 120 equals to
// 126813 (witch is the aproximate duration of the game in milliseconds)
// curve created at https://mycurvefit.com/
// integral verified at https://www.wolframalpha.com/
// -121.1693 + (5000.018 + 121.1693)/(1 + (x/6.225041)^0.6608268)
export const calculateNextInterval = x => {
  return (
    -121.1693 + (5000.018 + 121.1693) / (1 + Math.pow(x / 6.225041, 0.6608268))
  );
};

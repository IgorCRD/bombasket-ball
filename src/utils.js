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

export const randomScrambler = array => {
  let ar = [...array];
  let scrambled = [];
  let last;

  for (let loops = ar.length; loops > 1; --loops) {
    last = ar[parseInt(randomBetween(0, loops))];
    scrambled.push(last);

    ar = ar.filter(item => item !== last);
  }
  scrambled.push(ar[0]);

  return scrambled;
};

export const isFirefox =
  navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

export const colors = {
  red: 'rgb(209, 49, 53)',
  green: 'rgb(60, 141, 64)',
  blue: 'rgb(34, 120, 207)',
};

export const colorShades = {
  red: 'rgb(239, 79, 83)',
  green: 'rgb(90, 171, 94)',
  blue: 'rgb(64, 150, 237)',
};

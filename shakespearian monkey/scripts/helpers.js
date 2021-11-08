export function randomNumBetween(min, max) {
  return min + Math.random() * (max - min);
}

export function newChar() {
  let c = Math.floor(randomNumBetween(63, 122));
  if (c === 63) c = 32;
  if (c === 64) c = 46;

  return String.fromCharCode(c);
}

export function toPercentage(num) {
  return (num * 100).toFixed(2).concat("%");
}

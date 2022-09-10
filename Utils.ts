export function randomNumbers(length: number): number[] {
  var numbers: number[] = [];
  var isRunning = true;
  if (length === 0) {
    return [];
  }
  while (isRunning) {
    let number = Math.floor(Math.random() * 100) + 1;
    if (!numbers.includes(number)) {
      numbers.push(number);
    }
    if (numbers.length === length) {
      isRunning = false;
    }
  }
  return numbers;
}

export function shuffleArray(array: any[]) {
  return array.slice().sort(() => Math.random() - 0.5);
}

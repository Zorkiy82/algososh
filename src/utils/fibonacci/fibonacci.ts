export function getFibonacciNumbers(num: number) {
  if (num < 0) {
    return [];
  }
  const res = [1, 1];

  for (let i=2;i<(num+1);i++){
    const nextValue = res[i-1] + res[i-2];
    res.push(nextValue)
  }
  
  return res.slice(0,num+1);
}

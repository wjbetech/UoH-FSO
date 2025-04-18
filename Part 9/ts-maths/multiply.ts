const multiply = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);
multiply(a, b, `The result of ${a} * ${b} is:`);

interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArgs = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments provided!");
  if (args.length > 4) throw new Error("Too many arguments provided!");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error("Provided values are not of type number!");
  }
};

const multiply = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

try {
  const { value1, value2 } = parseArgs(process.argv);
  multiply(value1, value2, `The result of ${value1} x ${value2} is:`);
} catch (error: unknown) {
  let errorMessage = "An error occurred in multiply()";
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}

export default multiply;

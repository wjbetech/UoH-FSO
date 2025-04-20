interface BmiValues {
  value1: number;
  value2: number;
}

// pass args as string[] because Node.js provides the args array as a set of strings!
const parseBmiArgs = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments in calculateBmi!");
  if (args.length > 4) throw new Error("Too many arguments in calculateBmi!");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  }
  throw new Error("Provided weight and height were not numeric values!");
};

// height in cm, weight in kg!
export const calculateBmi = (height: number, weight: number) => {
  const heightInMeters = height / 100;
  const bmi = Number((weight / (heightInMeters * heightInMeters)).toFixed(2));
  if (bmi < 18.5) {
    return `Your BMI is ${bmi}. You are underweight.`;
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return `Your BMI is ${bmi}. You are normal weight.`;
  } else if (bmi >= 25 && bmi < 29.9) {
    return `Your BMI is ${bmi}. You are overweight.`;
  } else {
    return `Your BMI is ${bmi}. You are obese.`;
  }
};

try {
  const { value1, value2 } = parseBmiArgs(process.argv);
  calculateBmi(value1, value2);
} catch (error: unknown) {
  let errorMessage = "You provided some invalid statistics in calculateBmi()!";
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  } else {
    errorMessage += ` Error: ${String(error)}`;
  }
  console.log(errorMessage);
}

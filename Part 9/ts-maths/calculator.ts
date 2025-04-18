type Operation = "multiply" | "add" | "subtract" | "divide";

const calculator = (a: number, b: number, operation: Operation): number => {
  switch (operation) {
    case "multiply":
      return a * b;
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "divide":
      if (b === 0) {
        throw new Error("Cannot divide by zero!");
      } else {
        return a / b;
      }
    default:
      throw new Error("Invalid operation");
  }
};

try {
  console.log(calculator(1, 5, "divide"));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

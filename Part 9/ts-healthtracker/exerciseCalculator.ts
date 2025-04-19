interface HoursAndTarget {
  target: number;
  hours: number[];
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// we STILL have to pass args as an array of strings - Node.js always
// provides the args as an array of strings!
const parseExerciseArgs = (args: string[]): HoursAndTarget => {
  if (!args || args.length < 4) throw new Error("Not enough arguments in calculateExercise!");

  // !
  // we can't set a limit of args - each hour passed counts as a single arg
  // and we want to theoretically pass any n args
  // !

  const target = Number(args[2]);
  if (isNaN(target)) throw new Error("Target must be a number");

  // map the hours from the string array from Node into an actual array of numbers
  const hours = args.slice(3).map((val) => {
    const num = Number(val);
    if (isNaN(num)) throw new Error("All hours must be numbers");
    return num;
  });

  return { hours, target };
};

const calculateExercise = (target: number, hours: number[]): Result => {
  const days = hours.length;
  const trainingDays = hours.filter((h) => h > 0).length;
  const avgTime = hours.reduce((a, b) => a + b, 0) / days;
  const success = avgTime >= target;
  const rating = success ? 3 : avgTime >= target * 0.75 ? 2 : 1;
  if (rating === 3) {
    return {
      periodLength: days,
      trainingDays,
      success,
      rating,
      ratingDescription: "You did great!",
      target,
      average: Number(avgTime.toPrecision(2))
    };
  } else if (rating === 2) {
    return {
      periodLength: days,
      trainingDays,
      success,
      rating,
      ratingDescription: "You did good, but there's room to improve!",
      target,
      average: Number(avgTime.toPrecision(2))
    };
  } else if (rating === 1) {
    return {
      periodLength: days,
      trainingDays,
      success,
      rating,
      ratingDescription: "You need to work harder!",
      target,
      average: Number(avgTime.toPrecision(2))
    };
  } else {
    return {
      periodLength: days,
      trainingDays,
      success,
      rating,
      ratingDescription: "You did not try at all :(",
      target,
      average: Number(avgTime.toPrecision(2))
    };
  }
};

try {
  const { target, hours } = parseExerciseArgs(process.argv);
  const result = calculateExercise(target, hours);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = "You provided some invalid statistics in calculateExercise()!";
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  } else {
    errorMessage += ` Error: ${String(error)}`;
  }
  console.log(errorMessage);
}

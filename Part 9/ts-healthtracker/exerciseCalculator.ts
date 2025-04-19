interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercise = (hours: number[], target: number): Result => {
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
      average: avgTime
    };
  } else if (rating === 2) {
    return {
      periodLength: days,
      trainingDays,
      success,
      rating,
      ratingDescription: "You did good, but there's room to improve!",
      target,
      average: avgTime
    };
  } else if (rating === 1) {
    return {
      periodLength: days,
      trainingDays,
      success,
      rating,
      ratingDescription: "You need to work harder!",
      target,
      average: avgTime
    };
  } else {
    return {
      periodLength: days,
      trainingDays,
      success,
      rating,
      ratingDescription: "You did not try at all :(",
      target,
      average: avgTime
    };
  }
};

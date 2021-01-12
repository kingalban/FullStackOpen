
interface report { 
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: 1 | 2 | 3;
    ratingDescription: string;
    target: number;
    average: number;
}

interface exerciseValues {
    exerciseRecord: number[];
    target: number;
}
  
const parseExerciseArguments = (args: Array<string>): exerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    args.slice(2).forEach(e => {
        if(isNaN(Number(e))) {
            throw new Error(`provided '${e}' - not a number`);
        }
    });

    return {
        exerciseRecord: args.slice(2, args.length-1).map(e => Number(e)),
        target: Number(args[args.length-1]),
    };
};

const calculateExercises = (exerciseRecord: Array<number>, target: number): report => {

    const periodLength = exerciseRecord.length;
    const trainingDays = exerciseRecord.filter(d => d > 0).length;
    const average = exerciseRecord.reduce( (acc: number, cur: number) => acc + cur) / periodLength;
    const success = average >= target;


    const rating = success
        ? (
            average - target > target 
            ? 3     // more than double the target
            : 2     // more than target but less than double
        )
        : 1;         // less than target
    const ratingDescription = [
        "didn't quite make it, better luck next time",
        "not too bad but could be better",
        "amazing effort!"
    ][rating - 1];


    return { 
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
    const { exerciseRecord, target } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(exerciseRecord, target));
} catch (e) {
    console.log("error:", e.message);
}
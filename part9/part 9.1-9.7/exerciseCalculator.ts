import { calculateExercises, exerciseValues } from "./calculators"
  
const parseExerciseArguments = (args: Array<string>): exerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    args.slice(2).forEach(e => {
        if(isNaN(Number(e))) {
            throw new Error(`provided '${e}' - not a number`);
        }
    });

    return {
        daily_exercises: args.slice(2, args.length-1).map(e => Number(e)),
        target: Number(args[args.length-1]),
    };
};

try {
    const { daily_exercises, target } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(daily_exercises, target));
} catch (e) {
    console.log("error:", e.message);
}
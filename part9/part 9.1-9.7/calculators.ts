
/* 
Calculators organised into this file to avoid running command line parsing during import in index.js
*/

export interface exercisesReport { 
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: 1 | 2 | 3;
    ratingDescription: string;
    target: number;
    average: number;
}

export interface exerciseValues {
    daily_exercises: number[];
    target: number;
}

export const calculateExercises = (daily_exercises: Array<number>, target: number): exercisesReport => {

    const periodLength = daily_exercises.length;
    const trainingDays = daily_exercises.filter(d => d > 0).length;
    const average = daily_exercises.reduce( (acc: number, cur: number) => acc + cur) / periodLength;
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

export const calculateBmi = (height: number, weight: number): string => {

    const BMI: number = weight / (height/100)**2;

    if (BMI < 15) {
        return "Very severely underweight";
    } else if (BMI < 16) {
        return "Severely underweight";
    } else if (BMI < 18.5) {
        return "Underweight";
    } else if (BMI < 25) {
        return "Normal (healthy weight)";
    } else if (BMI < 30) {
        return "Overweight";
    } else if (BMI < 35) {
        return "Obese Class I (Moderately obese)";
    } else if (BMI < 40) {
        return "Obese Class II (Severely obese)";
    } else {
        return "Obese Class III (Very severely obese)";
    }    
};


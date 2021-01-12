import express from 'express';
import { calculateBmi, calculateExercises, exerciseValues } from "./calculators";

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);

    if(isNaN(height) || isNaN(weight) || req.query.height === "" || req.query.weight === "") {
        res.json({
            error: "malformatted parameters"
        });
    } else {
        res.json({ 
            height, weight, bmi 
        });
    }

});

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target }: exerciseValues = req.body;
    
    try {
        if(!daily_exercises || !daily_exercises.length || !target) {
            throw new Error("parameters missing");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } else if(daily_exercises.every((e) => isNaN(Number(e))) || isNaN(Number(target)) ) {
            throw new Error("malformatted parameters");
        } else {
            res.json(calculateExercises(daily_exercises, target));
        }
    } catch ({ message }) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        res.json({ error: message });
    }

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
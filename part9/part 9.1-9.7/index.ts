import express from 'express';
import { calculateBmi } from "./bmiCalculator"
// import { calculateExercises } from "./exerciseCalculator"
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
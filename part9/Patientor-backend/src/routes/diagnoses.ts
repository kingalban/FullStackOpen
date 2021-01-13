import express from "express";
import { getAll } from "../services/diagnoses";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
    const diagnoses = getAll();
    res.json(diagnoses);
});

export default diagnosesRouter;
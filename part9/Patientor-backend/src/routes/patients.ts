import express from "express";
import { getAll, addPatient } from "../services/patients";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
    const patients = getAll();
    res.json(patients);
});

patientsRouter.post("/", (req, res) => {
    try {
        const newPatient = addPatient(req.body);
        res.json(newPatient);
    } catch (e) {
        if(e instanceof Error) {
            res.status(400).json({ error: e.message }).end();
        }
    }
});

export default patientsRouter;
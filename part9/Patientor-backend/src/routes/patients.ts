import express from "express";
import { getAll, addPatient, getPatient } from "../services/patients";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
    const patients = getAll();
    res.json(patients);
});

patientsRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    const patient = getPatient(id);
    if(patient){
        res.json(patient);
    } else {
        res.status(404).json({error: "patient not found"}).end();
    }
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
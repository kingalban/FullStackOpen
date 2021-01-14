
import patientsData from "../../data/patients.json";
import { Patient, PatientNoSSN } from "../types";
import { toNewPatient } from "../utils/parsing"


const patients: Array<Patient> = patientsData.map(obj => {
    const object = toNewPatient(obj);
    return object;
});
  
const newID = (): string => {
    return String(patientsData.length + 1);
};

export const getAll = (): PatientNoSSN[]  => {
    return patients.map((p:Patient): PatientNoSSN => {
        return {
            id: p.id,
            name: p.name,
            dateOfBirth: p.dateOfBirth,
            gender: p.gender,
            occupation: p.occupation,
            entries: p.entries
        };
    });
};

export const addPatient = (newPatientData: Patient): PatientNoSSN => {
    const parsedPatient = toNewPatient({ ...newPatientData, id: newID()});
    patients.concat(parsedPatient);
    return parsedPatient;
};

export const getPatient = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};
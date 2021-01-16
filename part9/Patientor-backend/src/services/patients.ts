
import patients from "../../data/patients";
import { Patient, PatientNoSSN, Entry } from "../types";
import { toNewPatient, toNewEntry } from "../utils/parsing";

let patientList: Array<Patient> = patients.map(toNewPatient);
  

const newID = (): string => {
    return String(patientList.length + 1);
};

export const getAll = (): PatientNoSSN[]  => {
    return patientList.map((p:Patient): PatientNoSSN => {
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
    patientList.concat(parsedPatient);
    return parsedPatient;
};

export const getPatient = (id: string): Patient | undefined => {
    return patientList.find(p => p.id === id);
};

export const addPatientEntry = (patientID: string, newEntry: Entry): Entry => {
    const entryID = (patientList.find(p => p.id === patientID)?.entries?.length || 0) + 1;
    const parsedEntry = toNewEntry({ ...newEntry, id:entryID });

    patientList = patientList.map((p: Patient) => 
        p.id === patientID
        ? { ...p, entries: p.entries
            ? p.entries.concat(parsedEntry)
            : [parsedEntry]}
        : p
        );
    return parsedEntry;
};

import patientsData from "../../data/patients.json";
import { Patient, PatientNoSSN } from "../types";
import { toNewPatient } from "../utils/parsing"

// const patients: Patient[]  = patientsData.map();

const patients: Patient [] = patientsData.map(obj => {
    const object = toNewPatient(obj);
    // object.id = obj.id;
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
            occupation: p.occupation
        };
    });
};

export const addPatient = (newPatientData: Patient): PatientNoSSN => {
    const parsedPatient = toNewPatient({ ...newPatientData, id: newID()});
    patients.concat(parsedPatient);
    return parsedPatient;
}
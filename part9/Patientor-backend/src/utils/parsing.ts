import { Gender, Patient } from "../types";

const isString = (str: string): str is string => {
    return typeof str === "string";
};

const isDate = (date: string): date is string => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const isSSN = (SSN: string): SSN is string => {
    return typeof SSN === "string" 
        && SSN.length >= 10 
        && SSN.slice(6,7) === "-"
        && !isNaN(Number(SSN.slice(0,6)));
};

const parseName = (name: string): string => {
    if(!name || !isString(name)) {
        throw new Error("Incorrect or missing name: " + name);
    }
    return name;
};

const parseDateOfBirth = (dateOfBirth: string): string => {
    if(!dateOfBirth || !isDate(dateOfBirth)) {
        throw new Error("Incorrect or missing date of birth: " + dateOfBirth);
    }
    return dateOfBirth;
};

const parseSSN = (SSN: string): string => {
    if(!SSN || !isSSN(SSN)) {
        throw new Error("Incorrect or missing SSN: " + SSN);
    }
    return SSN;
};

const parseOccupation = (occupation: string): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation: " + occupation);
    }
    return occupation;
};

const parseGender = (gender: string): Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};

export const toNewPatient = (object: any): Patient => {
    return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: object.id,
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };
};
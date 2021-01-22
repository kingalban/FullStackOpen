import { Gender, Patient, Entry, HealthCheckRating } from "../types";
import {assertNever, isArray, isDate, isEntry, isString, isSSN, isGender, isHealthCheckRating} from "./typeguards";

const parseString = (str: string): string => {
    if(!str || !isString(str)) {
        throw new Error("Incorrect or missing string: " + str);
    }
    return str;
};

const parseDate = (dateOfBirth: string): string => {
    if(!dateOfBirth || !isDate(dateOfBirth)) {
        throw new Error("Incorrect or missing date: " + dateOfBirth);
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

const parseEntries = (entries: any): Array<Entry> => {
    if(!isArray(entries) || !entries.every(isEntry)) {
        throw new Error("Incorrect or missing entries: " + JSON.stringify(entries));    
    }
    return entries;
};

const parseDiagnosisCodes = (codes: any): Array<string> | undefined=> {
    if(codes === undefined) {
        return undefined;
    }
    if(!isArray(codes) || !codes.every(isString)) {
        throw new Error("Incorrect or missing diagnosis codes");    
    }
    return codes;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if(!rating || !isHealthCheckRating(rating)) {
        throw new Error("Incorrect or missing health check rating: " + JSON.stringify(rating));
    }
    return rating;
};

export const toNewPatient = (object: any): Patient => {
    return {
        id: parseString(object.id),
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: object.entries ? parseEntries(object.entries) : [],
    };
};

export const toNewEntry = (object: any): Entry => {
    console.log("object:", object);
    const baseObject = {
        id: parseString(object.id),
        type: isEntry(object) ? object.type : null,
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    };

    switch (baseObject.type) {
        case "Hospital":
            return {
                ...baseObject,
                type: "Hospital",
                discharge: {
                    date: parseDate(object.dischargeDate),
                    criteria: parseString(object.dischargeCriteria),
                }
            };
            
        case "OccupationalHealthcare":
            return {
                ...baseObject,
                type: "OccupationalHealthcare",
                employerName: parseString(object.employerName),
                sickLeave:  object.sickLeaveStartDate || object.sickLeaveEndDate 
                    ? {
                        startDate: parseDate(object.sickLeaveStartDate),
                        endDate: parseDate(object.sickLeaveEndDate)
                    }
                    : undefined
            };

        case "HealthCheck":
            return {
                ...baseObject,
                type: "HealthCheck",
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
    }

    return assertNever(object as never);
};
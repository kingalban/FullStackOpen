import { Gender, Patient, Entry, HealthCheckRating } from "../types";

const assertNever = (x: never): never => {
    throw new Error("Unexpected error:" + JSON.stringify(x));
}

const isString = (str: string): str is string => {
    return typeof str === "string";
};

const isDate = (date: string): date is string => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const isArray = (arr: any): arr is Array<any> => {
    return arr instanceof Array;
};

const isSSN = (SSN: string): SSN is string => {
    return typeof SSN === "string" 
        && SSN.length >= 10 
        && SSN.slice(6,7) === "-"
        && !isNaN(Number(SSN.slice(0,6)));
};

const isEntry = (entry: any): entry is Entry => {
    return ["Hospital", "OccupationalHealthcare", "HealthCheck" ].includes(entry.type)
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(rating);
};

const parseString = (str: string): string => {
    if(!str || !isString(str)) {
        throw new Error("Incorrect or missing string: " + str);
    }
    return str;
};

const parseDate = (dateOfBirth: string): string => {
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
    if(!rating || isHealthCheckRating(rating)) {
        throw new Error("Incorrect or missing health check rating: " + rating);
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

    const baseObject = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: object.id,
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
                    date: parseDate(object.discharge?.date),
                    criteria: parseString(object.discharge?.criteria),
                }
            };
            
        case "OccupationalHealthcare":
            return {
                ...baseObject,
                type: "OccupationalHealthcare",
                employerName: parseString(object.employerName),
                sickLeave: object.sickLeave
                    ? {
                        startDate: parseString(object.sickLeave.startDate),
                        endDate: parseString(object.sickLeave.endDate)
                    }
                    : undefined
            };

        case "HealthCheck":
            return {
                ...baseObject,
                type: "HealthCheck",
                healthCheckRating: parseHealthCheckRating(object.HealthCheckRating)
            };
    }

    return assertNever(object as never);
};
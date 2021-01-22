import { Gender, Entry, HealthCheckRating } from "../types";

export const assertNever = (x: never): never => {
    throw new Error("Unexpected error:" + JSON.stringify(x));
};

export const isString = (str: string): str is string => {
    return typeof str === "string";
};

export const isDate = (date: string): date is string => {
    return Boolean(Date.parse(date));
};

export const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

export const isArray = (arr: any): arr is Array<any> => {
    return arr instanceof Array;
};

export const isSSN = (SSN: string): SSN is string => {
    return typeof SSN === "string" 
        && SSN.length >= 10 
        && SSN.slice(6,7) === "-"
        && !isNaN(Number(SSN.slice(0,6)));
};

export const isEntry = (entry: any): entry is Entry => {
    return ["Hospital", "OccupationalHealthcare", "HealthCheck" ].includes(entry.type);
};

export const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(e => e.toString()).includes(rating);
};

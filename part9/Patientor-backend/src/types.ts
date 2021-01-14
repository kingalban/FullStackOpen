
export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export interface Entry {
    description: string;
    date: string;
    information?: string;
    diagnosisCode?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries?: Entry[];
}

export type PatientNoSSN = Omit<Patient, "ssn">;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;
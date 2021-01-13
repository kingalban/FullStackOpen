
import diagnoses from "../../data/diagnoses.json";
import { Diagnose } from "../types";


const diagnosesData: Diagnose[]  = diagnoses;

export const getAll = (): Diagnose[]  => {
    return diagnosesData;
};
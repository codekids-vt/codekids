/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InputResultOutcome } from './InputResultOutcome';
export type MaternityRecord = {
    id: string;
    user_id: string;
    Age: number;
    SystolicBP: number;
    DiastolicBP: number;
    BS: number;
    BodyTemp: number;
    HeartRate: number;
    res_age: InputResultOutcome;
    res_systolic_bp: InputResultOutcome;
    res_diastolic_bp: InputResultOutcome;
    res_bs: InputResultOutcome;
    res_body_temp: InputResultOutcome;
    res_heart_rate: InputResultOutcome;
    recommendation: string;
    date: string;
    result: number;
};


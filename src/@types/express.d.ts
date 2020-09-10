import { id } from "date-fns/locale";
import { request } from "express";

declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
    }
}
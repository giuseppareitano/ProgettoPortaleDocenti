import{Registration} from './registration';
import {Prenotation} from './prenotation';

export interface Student {
    id: string;
    name: string;
    surname: string;
    email: string;
    dateOfBirth: Date;
    courses: string;
    registrations: Registration[];
    prenotations: Prenotation[];
    
}
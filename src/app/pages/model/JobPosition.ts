import { User } from './User';
import { Competence } from './Competence';

export class JobPosition {
    id?: number;
    nom?: string;
    description?: string;
    utilisateurs?: User;
    competencesRequises?: Competence[];

   
}
import { JobPosition } from './JobPosition';
import { ServiceEq } from './ServiceEq';
import { UserType } from './UserType';

export class User {
    id?: number;
    identifiantUser?: string;
    nom?: string;
    prenom?: string;
    mdp?: string;
    type?: UserType;
    poste?: JobPosition;
    serviceEq?: ServiceEq;

   
}
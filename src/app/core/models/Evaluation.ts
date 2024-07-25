import { Competence } from './Competence';
import { EvaluationType } from './EvaluationType';

export class Evaluation {
    id?: number;
    eval?: EvaluationType;
    competence?:Competence;
    note?:number;

    
}
import { Question } from './question';

export interface Quizz {
    id: number;
    type: string;
    maxscore: number;
    documentId: number;
    questions: Question[];
}
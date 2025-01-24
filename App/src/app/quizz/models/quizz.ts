import { Question } from './question';

export interface Quizz {
    id: string;
    type: string;
    max_score: number;
    documentId: string;
    questions: Question[];
}
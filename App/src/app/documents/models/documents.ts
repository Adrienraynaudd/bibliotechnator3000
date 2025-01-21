import { Library } from "./library";

export interface Document {
    id: number;
    title: string;
    documentLink: string;
    category: string;
    synopsis: string;
    library: Library;
}
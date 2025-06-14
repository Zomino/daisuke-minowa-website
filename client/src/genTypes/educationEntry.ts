export interface EducationEntry {
    id?: number;
    documentId?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string;
    locale?: string | null;
    experience_name: string;
    year_from: number;
    year_to?: number;
    notes?: string;
}

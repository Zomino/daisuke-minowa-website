export interface ExhibitionEntry {
    id?: number;
    documentId?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string;
    locale?: string | null;
    event_name: string;
    date_from: Date | string;
    date_to?: Date | string;
    location?: string;
    notes?: string;
}

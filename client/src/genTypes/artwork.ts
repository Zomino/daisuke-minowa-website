import { Media } from './media';

export interface Artwork {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title: string;
  image: Media | null;
  height_cm: number;
  width_cm: number;
  technique?: string;
  date?: Date | string;
  description?: string;
};

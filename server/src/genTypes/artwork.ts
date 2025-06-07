import { Media } from './media';

export interface Artwork {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title: string;
  height: number;
  width: number;
  image: Media | null;
  description?: string;
  alt?: string;
  date?: Date | string;
};

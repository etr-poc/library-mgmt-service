import { IBase } from './Base';

export interface IBook extends IBase {
  author: string;
  borrowedBy: string | null;
  description?: string;
  isAvailable: boolean;
  publishedYear: number;
  referenceId: string;
  title: string;
};

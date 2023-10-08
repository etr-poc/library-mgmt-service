import { Document, Schema, Types } from 'mongoose';

import { IBase } from '../types/interfaces';

export interface IBaseSchema extends IBase, Document {}

export const BaseSchema = new Schema<IBaseSchema>(
  {
    originalId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },
);

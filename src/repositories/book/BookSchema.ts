import mongoose, { Schema } from 'mongoose';

import { IBook } from '../../types/interfaces';
import { BaseSchema, IBaseSchema } from '../BaseSchema';

interface IBookSchema extends IBook, IBaseSchema {}

const bookSchema = new Schema<IBookSchema>(
  {
    author: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    borrowedBy: {
      type: String,
      required: false,
      default: null,
    },
    referenceId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
    publishedYear: {
      type: Number,
      required: true,
      max: new Date().getFullYear(),
    },
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 200,
    },
  },
  {
    _id: false,
    timestamps: true,
    toJSON: {
      transform: function (_, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

bookSchema.add(BaseSchema);

const Book = mongoose.model<IBookSchema>('Books', bookSchema);

export { Book, IBookSchema };

import mongoose, { Schema } from 'mongoose';

import { IUser } from '../../types/interfaces';
import { BaseSchema, IBaseSchema } from '../BaseSchema';

interface IUserSchema extends IUser, IBaseSchema {}

const userSchema: Schema<IUserSchema> = new Schema<IUserSchema>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
    },
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    _id: false,
    toJSON: {
      transform: function (_, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

userSchema.add(BaseSchema);

const User = mongoose.model<IUserSchema>('Users', userSchema);

export { User, IUserSchema };

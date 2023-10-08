import { IBase } from './Base';

export interface IUser extends IBase {
  username: string;
  firstName: string;
  lastName?: string;
  email: string;
}

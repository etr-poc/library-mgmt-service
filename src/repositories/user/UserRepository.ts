import BaseRepository from '../BaseRepository';
import { IUserSchema, User } from './UserSchema';

class UserRepository extends BaseRepository<IUserSchema> {
  private static instance: UserRepository;

  constructor() {
    super(User);
  }

  static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }

    return UserRepository.instance;
  }

  async list(skip?: number, limit?: number): Promise<IUserSchema[]> {
    return this.findAll(skip, limit);
  }

  async getById(originalId: string): Promise<IUserSchema | null> {
    return this.findByQuery({ originalId });
  }

  async insertMany(data: Partial<IUserSchema>[]): Promise<IUserSchema[]> {
    return this.bulkInsert(data);
  }
}

export default UserRepository.getInstance();

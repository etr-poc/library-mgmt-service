import BaseRepository from '../BaseRepository';
import { getBookListPipeline, getBookListByIdsPipeline } from './aggregations';
import { Book, IBookSchema } from './BookSchema';

class BookRepository extends BaseRepository<IBookSchema> {
  private static instance: BookRepository;

  constructor() {
    super(Book);
  }

  static getInstance(): BookRepository {
    if (!BookRepository.instance) {
      BookRepository.instance = new BookRepository();
    }

    return BookRepository.instance;
  }

  async list(userId?: string, skip?: number, limit?: number): Promise<IBookSchema[]> {
    try {
      let pipeline: any[];

      if (userId) {
        pipeline = getBookListByIdsPipeline(userId);
      } else {
        pipeline = getBookListPipeline(skip, limit);
      }

      return this.aggregate(pipeline);
    } catch (error) {
      throw error;
    }
  }

  async getByQuery(query: Record<string, any>): Promise<IBookSchema | null> {
    return this.findByQuery(query);
  }

  async insertMany(data: Partial<IBookSchema>[]): Promise<IBookSchema[]> {
    return this.bulkInsert(data);
  }

  async update(id: string, data: Partial<IBookSchema>): Promise<IBookSchema | null> {
    return this.findByIdAndUpdate(id, data);
  }
}

export default BookRepository.getInstance();

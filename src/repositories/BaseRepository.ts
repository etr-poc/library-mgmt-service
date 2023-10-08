import mongoose, { Document, Model } from 'mongoose';

class BaseRepository<T extends Document> {
  private model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  private generateIdAndDate(obj: T): T {
    return ({
      ...obj,
      originalId: new mongoose.Types.ObjectId(),
      createdAt: new Date(),
    })
  } 

  async create(data: Partial<T>): Promise<T> {
    const doc = new this.model(this.generateIdAndDate(data as T));
    return doc.save();
  }

  async bulkInsert(data: Partial<T>[]): Promise<T[]> {
    const generatedData = data.map((obj) => this.generateIdAndDate(obj as T));
    return this.model.insertMany(generatedData) as any;
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findByQuery(query: Record<string, any>): Promise<T | null> {
    return this.model.findOne(query).exec();
  }

  async findAll(skip: number = 0, limit: number = 0): Promise<T[]> {
    return this.model.find({}).skip(skip).limit(limit).exec();
  }

  async findByIdAndUpdate(originalId: string, data: Partial<T>): Promise<T | null> {
    return this.model.findOneAndUpdate({ originalId }, data, { new: true }).exec();
  }

  async aggregate(pipeline: object[]): Promise<any[]> {
    return this.model.aggregate(pipeline as any);
  }

  async remove(id: string): Promise<void> {
    await this.model.findByIdAndRemove(id).exec();
  }
}

export default BaseRepository;

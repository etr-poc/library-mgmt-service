export interface IBase {
  originalId: string;
  createdAt: string;
}

export interface IListInput {
  limit?: number;
  skip?: number;
  userId?: string;
}

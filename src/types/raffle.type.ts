export interface Raffle {
  id: string;
  name: string;
  description: string;
  termsAndConditions: string;
  imageUrl?: string | null;
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
  startAt: Date;
  endAt: Date;
  authorId: string;
}

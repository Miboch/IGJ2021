export interface FeedbackModel {
  rating: number;
  description: string;
  type: string;
  submitted?: Date,
  id?: number;
  read: boolean;
}

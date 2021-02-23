export interface FeedbackModel {
  rating: number;
  description: string;
  type: string;
  submitted?: string,
  id?: number;
  read: boolean;
}

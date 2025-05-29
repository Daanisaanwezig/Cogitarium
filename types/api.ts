export interface BaseApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}
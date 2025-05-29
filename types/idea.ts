import type { BaseApiResponse } from "./api";

export interface Idea {
  id?: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ApiResponse extends BaseApiResponse<Idea[]> {

}
import type { BaseApiResponse } from "./api";
import type { Idea } from "./idea";

export interface SearchOptions {
  query: string;
  context: string;
  diversity: number;
  mode: TabType;
}

export type TabType = 'simple' | 'advanced';

export interface ApiResponse extends BaseApiResponse<Idea[]> {

}
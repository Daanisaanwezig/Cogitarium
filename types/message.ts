import type { BaseApiResponse } from "./api";

export interface Message {
  text: Ref;
  sender: 'user' | 'ai';
}

export interface ApiResponse extends BaseApiResponse<string> {

}
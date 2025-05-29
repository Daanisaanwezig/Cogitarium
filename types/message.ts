import type { BaseApiResponse } from "./api";

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  avatar: string;
  timestamp: string; // ISO
}

export interface ApiResponse extends BaseApiResponse<Message[] | Message> {

}
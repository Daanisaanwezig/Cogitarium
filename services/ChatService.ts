import type { ApiResponse } from '~/types/message';
import { ApiService } from './ApiService';
export class ChatService {
    static async sendMessage(payload: { text: string }): Promise<ApiResponse> {
        return new Promise(async (resolve, reject) => {
            const response = await ApiService.post('generate/chat', { message: payload.text}) as ApiResponse
            return resolve(response)
        })
    }
}
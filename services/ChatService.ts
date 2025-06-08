import type { Message } from '~/types/message';
import { ApiService } from './ApiService';
export class ChatService {
    static async sendMessage(chatId: string, payload: { text: string }, message: Ref<string>): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const response = await ApiService.postStream('chat', { chatId: chatId, message: payload.text })

            if (!response.body) return;
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');

            let result = '';
            let parsedChatId = false;
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const text = decoder.decode(value);
                if (! parsedChatId) {
                    chatId = JSON.parse(text.split('\n')[0]).chatId;
                    parsedChatId = true;
                    result += text.split('\n')[1]
                } else {
                    result += text;
                    message.value = result;
                }
            }
            return resolve(chatId)
        })
    }
}
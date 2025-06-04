import type { Message } from '~/types/message';
import { ChatService } from '~/services/ChatService';

export function useChat() {
    // TODO: Add functionality to retrieve an old chat based on a chat id
    // TODO: Add functionality to create a new chat
    const messages = ref<Message[]>([]);
    async function sendMessage(text: string) {
        const msg: Message = { text, sender: 'user' };
        messages.value.push(msg);
        const res = await ChatService.sendMessage({ text });
        messages.value.push({ text: res.data, sender: 'ai'});
    }
    return { messages, sendMessage };
}
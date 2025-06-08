import type { Message } from '~/types/message';
import { ChatService } from '~/services/ChatService';

export function useChat() {
    // TODO: Add functionality to create a new chat

    const chatId = ref<string>('');
    const messages = ref<Message[]>([]);
    async function sendMessage(text: string) {
        const userMessage = ref(text)
        const msg: Message = { text: userMessage, sender: 'user' };
        messages.value.push(msg);

        const response = ref<string>('');
        messages.value.push({ text: response, sender: 'ai'});
        const id = await ChatService.sendMessage(chatId.value, { text }, response);
        chatId.value = id;
    }
    return { messages, sendMessage };
}
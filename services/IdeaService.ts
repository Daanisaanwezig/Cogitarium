import type { ApiResponse } from '~/types/idea';
import type { Idea } from '~/types/idea';
import { ApiService } from './ApiService';
export class IdeaService {
    static async saveIdea(idea: Idea): Promise<ApiResponse> {
        return new Promise(async (resolve, reject) => {
            const response = await ApiService.post('ideas', idea) as ApiResponse;
            return resolve(response);
        })
    }

    static async getIdeas(): Promise<ApiResponse> {
        return new Promise(async (resolve, reject) => {
            const response = await ApiService.get('ideas') as ApiResponse;
            return resolve(response);
        })
    }

    static async getIdea(id: number): Promise<ApiResponse> {
        return new Promise(async (resolve, reject) => {
            const response = await ApiService.get(`ideas/${id}`) as ApiResponse;
            return resolve(response);
        })
    }

    static async removeIdea(id: number): Promise<ApiResponse> {
        return new Promise(async (resolve, reject) => {
            const response = await ApiService.delete(`ideas/${id}`) as ApiResponse;
            return resolve(response);
        })
    }
}
import type { ApiResponse } from '~/types/search';
import type { SearchOptions } from '~/types/search';
import { ApiService } from './ApiService';

export class SearchService {
    static async performSearch(options: SearchOptions): Promise<ApiResponse> {
        return new Promise(async (resolve, reject) => {
            const query = options.query.trim();
            const response = await ApiService.post('generate/search', { query: query }) as ApiResponse;

            return resolve(response);
        })
    }
    static async performAdvancedSearch(options: SearchOptions): Promise<ApiResponse> {
        return new Promise(async (resolve, reject) => {
            let query = options.query.trim();
            if (options.context) {
                query += ` ${options.context.trim()}`;
            }
            const response = await ApiService.post('generate/advancedSearch', { query: query }) as ApiResponse;

            const diversity = options.diversity;

            response.data = response.data.map(idea => {
                if (! idea.similarity) idea.similarity = "0";
                const sim = parseFloat(idea.similarity) / 100;
                const random = Math.random();
                const score = (1 - diversity) * sim + diversity * random;
                return { ...idea, score };
            }).sort((a, b) => b.score - a.score);

            return resolve(response);
        })
    }
}
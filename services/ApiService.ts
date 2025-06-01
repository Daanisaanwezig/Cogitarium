const baseURL = 'http://localhost:8080/api'

import type { BaseApiResponse } from "~/types/api"

export class ApiService {
    static post(location: string, postData: {}): Promise<BaseApiResponse<unknown>> {
        return new Promise(async (resolve, reject) => {
            const response = await $fetch<BaseApiResponse<unknown>>(`${baseURL}/${location}`, {
                method: 'POST',
                body: postData
            })
    
            // TODO: Add error handling
            
            const result = await response;
            return resolve(result);
        })
    }
    static get(location: string, options?: string): Promise<BaseApiResponse<unknown>> {
        return new Promise(async (resolve, reject) => {
            const response = await $fetch<BaseApiResponse<unknown>>(`${baseURL}/${location}`, {
                method: 'GET'
            })

            const result = await response;
            return resolve(result);
        })
    }

    static delete(location: string, options?: string): Promise<BaseApiResponse<unknown>> {
        return new Promise(async (resolve, reject) => {
            const response = await $fetch<BaseApiResponse<unknown>>(`${baseURL}/${location}`, {
                method: 'DELETE'
            })

            const result = await response;
            return resolve(result);
        })
    }
}
import type { Idea } from '~/types/idea'

const baseURL = 'http://localhost:8080/api'

export const getIdeas = async (): Promise<Idea[]> => {
    return await $fetch(`${baseURL}/ideas`)
}

export const getIdea = async (id: Number): Promise<Idea> => {
    return await $fetch(`${baseURL}/ideas/${id}`)
}

export const createIdea = async (idea: Idea): Promise<Idea> => {
    return await $fetch(`${baseURL}/ideas`, {
        method: 'POST',
        body: idea
    })
}

export const removeIdea = async (idea: Idea) => {
    return await $fetch(`${baseURL}/ideas/${idea.id}`, {
        method: 'DELETE'
    })
}

export const searchIdeas = async (query: string): Promise<Idea[]> => {
    return await $fetch(`${baseURL}/generate/search`, {
        method: 'POST',
        body: { query: query }
    })
}

export const advancedSearchIdeas = async (query: string): Promise<Idea[]> => {
    return await $fetch(`${baseURL}/generate/advancedSearch`, {
        method: 'POST',
        body: { query: query }
    })
}
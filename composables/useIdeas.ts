import { IdeaService } from '~/services/IdeaService';
import type { Idea } from '~/types/idea';

export function UseIdeas() {
    const ideas = ref<Idea[]>([]);
    const loading = ref<Boolean>(true);

    async function fetchIdeas() {
        const result = await IdeaService.getIdeas();
        ideas.value = result.data;
        loading.value = false;
    }

    async function fetchIdea(id: number) {
        const result = await IdeaService.getIdea(id);
        ideas.value = result.data;
        loading.value = false;
    }

    async function removeIdea(id: number) {
        const result = await IdeaService.removeIdea(id);
        if (result.status != 200) {
            loading.value = false;
            return false;
        }
        loading.value = false;
        return true;
    }

    return { ideas, loading, fetchIdeas, fetchIdea, removeIdea};
}
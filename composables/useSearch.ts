import type { SearchOptions } from '~/types/search';
import { SearchService } from '~/services/SearchService';
import type { Idea } from '~/types/idea';

export function UseSearch() {
    const options = ref<SearchOptions>({ query: '', context: '', diversity: 1, mode: 'simple' });
    const results = ref<Idea[]>([]);
    const loading = ref<Boolean>(false);
    const searched = ref<Boolean>(false);
    const summarizing = ref<boolean>(false);
    const summary = ref<String>('');

    async function search() {
        loading.value = true;

        let result;
        if (options.value.mode == 'simple') {
            result = await SearchService.performSearch(options.value);
        } else {
            result = await SearchService.performAdvancedSearch(options.value);
        }

        if (! result) {
            searched.value = true;
            loading.value = true;
            return // TODO: Add error handling
        }
        results.value = result.data;
        console.log(results.value);
        
        
        searched.value = true;
        loading.value = false;
    }

    async function summarize() {
        summarizing.value = true;
        const result = await SearchService.summarizeIdeas(results.value);
        console.log(result);
        summary.value = result.data;
        summarizing.value = false;
    }

    return { options, results, loading, searched, summary, summarizing, search, summarize };
}
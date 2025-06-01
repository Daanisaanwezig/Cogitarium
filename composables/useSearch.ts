import type { SearchOptions } from '~/types/search';
import { SearchService } from '~/services/SearchService';
import type { Idea } from '~/types/idea';

export function UseSearch() {
    const options = ref<SearchOptions>({ query: '', context: '', diversity: 1, mode: 'simple' });
    const results = ref<Idea[]>([]);
    const loading = ref<Boolean>(false);
    const searched = ref<Boolean>(false);

    async function search() {
        loading.value = true;

        let res;
        if (options.value.mode == 'simple') {
            res = await SearchService.performSearch(options.value);
        } else {
            res = await SearchService.performAdvancedSearch(options.value);
        }

        if (! res) {
            searched.value = true;
            loading.value = true;
            return // TODO: Add error handling
        }
        results.value = res.data;
        
        searched.value = true;
        loading.value = false;
    }
    return { options, results, loading, searched, search };
}
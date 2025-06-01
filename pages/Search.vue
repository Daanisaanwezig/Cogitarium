<script setup lang="ts">
import { useBEM } from '~/composables/useBEM';
import SearchForm from '~/components/organisms/SearchForm.vue';
import TabBar from '~/components/organisms/TabBar.vue';
import { UseSearch } from '~/composables/useSearch';
import type { Idea } from '~/types/idea';
import IdeaItem from '~/components/molecules/IdeaItem.vue';

const useSearch = UseSearch();
const searched = ref<boolean>(useSearch.searched);
const loading = ref<Boolean>(useSearch.loading);
const ideas = ref<Idea[]>(useSearch.results);

const componentName = 'p-search';
const BEM = useBEM(componentName);
</script>
<template>
    <div :class="componentName">
        <h2 :class="BEM.childClass('page-title')">Search</h2>
        <SearchForm :useSearch="useSearch" />
        <template v-if="!searched && !loading">
            <p :class="BEM.childClass('not-searched')">Search something<br>and the results will end up here</p>
        </template>
        <template v-if="loading">
            <p :class="BEM.childClass('loading')">Loading results...</p>
        </template>
        <div :class="BEM.childClass('results')" v-if="!loading && ideas">
            <IdeaItem v-for="(item, id) in ideas" :key="id" :idea="item">
                <template #title>{{ item.title }}</template>
                <template #description>{{ item.description }}</template>
            </IdeaItem>
        </div>
    </div>
    <TabBar />
</template>
<style lang="scss">
$componentName: 'p-search';

.#{$componentName} {
    margin: var(--spacing-md);
    
    &__page-title {
        text-align: center;
    }
    &__not-searched {
        margin: 0 var(--spacing-xl);
        margin-top: var(--spacing-md);
        text-align: center;
    }
    &__loading {
        margin: 0 var(--spacing-xl);
        margin-top: var(--spacing-md);
        text-align: center;
    }
    &__results {
        margin-top: var(--spacing-xl);
        margin-bottom: 12rem;
    }
}
</style>
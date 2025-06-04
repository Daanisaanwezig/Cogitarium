<script setup lang="ts">
import { useBEM } from '~/composables/useBEM';
import { UseSearch } from '~/composables/useSearch';
import Button from '~/components/atoms/Button.vue';
import IdeaItem from '~/components/molecules/IdeaItem.vue';
import SearchForm from '~/components/organisms/SearchForm.vue';
import TabBar from '~/components/organisms/TabBar.vue';
import Header from '~/components/organisms/Header.vue';
import { ButtonType } from '~/types/Button';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();
const useSearch = UseSearch();
const { searched, loading, results, summary, summarizing } = useSearch;

const componentName = 'p-search';
const BEM = useBEM(componentName);
</script>
<template>
    <div :class="componentName">
        <Header>New Idea</Header>
        <SearchForm :useSearch="useSearch" />
        <template v-if="!searched && !loading">
            <p :class="BEM.childClass('not-searched')">Search something<br>and the results will end up here</p>
        </template>
        <template v-if="loading">
            <p :class="BEM.childClass('loading')">Loading results...</p>
        </template>
        <div :class="BEM.childClass('results')" v-if="!loading && results.length > 0">
            <p :class="BEM.childClass('summary')">
                <span v-if="summarizing">
                    Generating summary.
                </span>
                <span v-else v-html="md.render(summary.replace(/\n/g, '  \n'))">
                </span>
            </p>
            <IdeaItem v-for="(item, id) in results" :key="id" :idea="item">
                <template #title>{{ item.title }}</template>
                <template #description>{{ item.description }}</template>
            </IdeaItem>
            <Button :class="BEM.childClass('summarize')" :type="ButtonType.Primary" :disabled="summarizing" @click="useSearch.summarize()">Summarize</Button>
        </div>
    </div>
    <TabBar />
</template>
<style lang="scss">
$componentName: 'p-search';

.#{$componentName} {
    margin: var(--spacing-md);
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
    &__summary {
        margin-bottom: var(--spacing-md);
        p,
        ul {
            line-height: 160%;
        }
        p {
            margin-bottom: var(--spacing-xs);
        }
        ul {
            margin-bottom: var(--spacing--sm);
            padding-left: var(--spacing-md);
        }
    }
    &__results {
        margin-top: var(--spacing-md);
        margin-bottom: 12rem;
    }
    &__summarize {
        position: sticky;
        bottom: 6rem;
        margin-top: var(--spacing-xl);
    }
}
</style>
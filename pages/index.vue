<script setup lang="ts">
import IdeaItem from '~/components/molecules/IdeaItem.vue'
import { UseIdeas } from '~/composables/useIdeas'
import { useBEM } from '#imports';
import TabBar from '~/components/organisms/TabBar.vue';

const componentName = 'p-index';
const BEM = useBEM(componentName);

const useIdeas = UseIdeas()

useIdeas.fetchIdeas()
const ideas = useIdeas.ideas
</script>
<template>
    <div :class="componentName">
        <h2 :class="BEM.childClass('page-title')">Ideas</h2>
        <template v-for="idea in ideas">
            <IdeaItem :idea="idea">
                <template #title>{{ idea.title }}</template>
                <template #description>{{ idea.description }}</template>
            </IdeaItem>
        </template>
        <TabBar />
    </div>
</template>
<style lang="scss">
$componentName: 'p-index';

.#{$componentName} {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    margin: 0 var(--spacing-md);
    margin-bottom: 12rem;

    &__page-title {
        margin-top: var(--spacing-md);
        text-align: center;
    }
}
</style>
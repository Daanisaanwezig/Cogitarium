<script setup lang="ts">
import { useBEM } from '~/composables/useBEM';

import Header from '~/components/organisms/Header.vue';
import Button from '~/components/atoms/Button.vue';
import TabBar from '~/components/organisms/TabBar.vue';

import { UseIdeas } from '~/composables/useIdeas';
import { ButtonType } from '~/types/Button';
import type { Idea } from '~/types/idea';
const useIdea = UseIdeas();
const router = useRouter();
const route = useRoute();

const ideaId = parseInt(route.params.id.toString());
useIdea.fetchIdea(parseInt(ideaId.toString()));
const idea: Idea = useIdea.ideas;
const loading = ref(useIdea.loading);

const componentName = 'p-idea-detail';
const BEM = useBEM(componentName);

function stripIdeaDescription(description: string): string {
    return description.replaceAll('\n', '<br>');
}

function remove() {
    useIdea.removeIdea(ideaId);
    router.back();
}
</script>
<template>
    <div :class="componentName">
        <Header>
            <h2>Idea</h2>
        </Header>
        <template v-if="!loading">
            <h2 :class="BEM.childClass('idea-title')">{{ idea.title }}</h2>
            <p v-html="stripIdeaDescription(idea.description)"></p>
            <Button :type="ButtonType.Primary" :disabled="false" :class="BEM.childClass('remove-button')" @click="remove()">Verwijderen</Button>
        </template>
        <TabBar />
    </div>
</template>
<style lang="scss">
$componentName: 'p-idea-detail';

.#{$componentName} {
    margin: 0 var(--spacing-md);
    &__idea-title {
        margin-bottom: var(--spacing-sm);
    }
    &__remove-button {
        width: fit-content;
        margin-top: var(--spacing-md);
    }
}
</style>
<script setup lang="ts">
import { useBEM } from '~/composable/useBEM'

import Button from '~/components/atoms/Button.vue'
import IdeaItem from '~/components/molecules/IdeaItem.vue'

import { buttonSize, buttonColor } from '~/types/button'

import { getIdeas } from '~/services/api'

const router = useRouter()

const componentName = 'p-ideas-index'
const BEM = useBEM(componentName)

const ideas = await getIdeas()

function navigate() {
    router.push('/ideas/new')
}
</script>
<template>
    <div class="container">
        <div :class="BEM.childClass('no-results')" v-if="ideas.length == 0">
            <p>Er is nog niks om te zien hier...</p>
            <Button :color="buttonColor.Primary" :size="buttonSize.Large" @click="navigate()">Voeg je eerste idee toe</Button>
        </div>
        <div :class="BEM.childClass('results')" v-if="ideas.length > 0">
            <IdeaItem v-for="idea in ideas" :key="idea.id" :idea="idea">
                <template #title> {{ idea.title }}</template>
                <template #description>{{ idea.description }}</template>
            </IdeaItem>
            <Button :color="buttonColor.Primary" :size="buttonSize.Large" @click="navigate()">Nieuw idee</Button>
        </div>
    </div>
</template>

<style lang="scss">
$componentName: 'p-ideas-index';

.#{$componentName} {
    &__no-results {
        text-align: center;
    }
    &__results {
        display: grid;
        gap: 1rem;
        background-color: var(--background);
        padding: 1rem;
    }
}
</style>
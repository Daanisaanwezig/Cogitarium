<script setup lang="ts">
import { useBEM } from '~/composable/useBEM'

import Button from '~/components/atoms/Button.vue'
import Input from '~/components/atoms/Input.vue'
import IdeaItem from '~/components/molecules/IdeaItem.vue'

import { buttonSize, buttonColor } from '~/types/button'

import { advancedSearchIdeas, getIdeas, searchIdeas } from '~/services/api'

const router = useRouter()

const searching = ref()
const ideas = ref()
searching.value = false

const componentName = 'p-ideas-index'
const BEM = useBEM(componentName)

ideas.value = await getIdeas()

function navigate() {
    router.push('/ideas/new')
}
async function search() {
    if (searching.value) return
    searching.value = true

    const input = document.querySelector('#searchInput') as HTMLFormElement
    if (! input || ! input.value) {
        return
    }
    const searchString = input.value

    const results = await searchIdeas(searchString)
    ideas.value = results
    const results2 = await advancedSearchIdeas(searchString)
    console.log(results2);
    
    searching.value = false
}
</script>
<template>
    <div class="container">
        <div :class="BEM.childClass('no-results')" v-if="ideas.length == 0">
            <p>Er is nog niks om te zien hier...</p>
            <Button :color="buttonColor.Primary" :size="buttonSize.Large" @click="navigate()" :disabled="searching">Voeg je eerste idee toe</Button>
        </div>
        <div v-if="ideas.length > 0">
            <div :class="BEM.childClass('search')">
                <Input :placeholder="'Zoeken...'" :name="'search'" id="searchInput" @keydown.enter="search"></Input>
                <Button :color="buttonColor.Secondary" :size="buttonSize.Large" @click="search">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                    </svg>
                </Button>
            </div>
            <div :class="BEM.childClass('results')">
                <IdeaItem v-for="idea in ideas" :key="idea.id" :idea="idea">
                    <template #title> {{ idea.title }}</template>
                    <template #description>{{ idea.description }}</template>
                </IdeaItem>
                <Button :color="buttonColor.Primary" :size="buttonSize.Large" @click="navigate()">Nieuw idee</Button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
$componentName: 'p-ideas-index';

.#{$componentName} {
    &__no-results {
        text-align: center;
    }
    &__search {
        display: flex;
        align-items: center;
        margin-top: 0.5rem;
        input {
            margin-top: 0;
            margin-right: 1rem;
        }
        button {
            margin: 0;
            padding: 6px;
            width: fit-content;
            svg {
                width: 16px;
                fill: #fff;
            }
        }
    }
    &__results {
        display: grid;
        gap: 1rem;
        background-color: var(--background);
        padding-top: 1rem;
    }
}
</style>
<script setup lang="ts">
import { useBEM } from '~/composable/useBEM'

import Button from '~/components/atoms/Button.vue'
import Input from '~/components/atoms/Input.vue'
import Textarea from '~/components/atoms/Textarea.vue'
import IdeaItem from '~/components/molecules/IdeaItem.vue'

import { buttonSize, buttonColor } from '~/types/button'

import { advancedSearchIdeas, getIdeas, searchIdeas } from '~/services/api'

const router = useRouter()

const searching = ref(false)
const ideas = ref()
const isAdvanced = ref(false);
const searchInput = ref('');
const temperature = ref(50);


const componentName = 'p-ideas-index'
const BEM = useBEM(componentName)

ideas.value = await getIdeas()

function navigate() {
    router.push('/ideas/new')
}
async function search() {
    if (searching.value) return
    searching.value = true

    console.log(searchInput.value);
    
    if (!searchInput.value) {
        return searching.value = false
    }

    if (isAdvanced.value) {
        const results = await advancedSearchIdeas(searchInput.value)
        console.log(results);
        ideas.value = results
    } else {
        const results = await searchIdeas(searchInput.value)
        ideas.value = results
    }
    
    searching.value = false
}
</script>
<template>
    <div class="container" :class="componentName">
        <div :class="BEM.childClass('no-results')" v-if="ideas.length == 0">
            <p>Er is nog niks om te zien hier...</p>
            <Button :color="buttonColor.Primary" :size="buttonSize.Large" @click="navigate()" :disabled="searching">Voeg je eerste idee toe</Button>
        </div>
        <div v-if="ideas.length > 0">
            <div :class="BEM.childClass('search')">
                <div :class="BEM.childClass('search-toggle')">
                    <button :class="{ active: !isAdvanced }" @click="isAdvanced = false">Simple Search</button>
                    <button :class="{ active: isAdvanced }" @click="isAdvanced = true">Advanced Search</button>
                </div>

                <div :class="BEM.childClass('search')">
                    <div :class="BEM.childClass('regular-search')" v-if="!isAdvanced">
                        <Input :placeholder="'Zoeken...'" :name="'search'" id="searchInput" v-model="searchInput" @keydown.enter="search" />
                        <Button :color="buttonColor.Secondary" :size="buttonSize.Large" @click="search">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                            </svg>
                        </Button>
                    </div>
                    <div :class="BEM.childClass('advanced-search')" v-else>
                        <Textarea v-model="searchInput" :required="false" :placeholder="'Waar ben je naar op zoek?'" :name="'advanced-textarea'" :rows="5"></Textarea>
                        <div class="temp-slider">
                            <label for="temperature">Temperature: {{ temperature }}</label>
                            <input type="range" id="temperature" v-model="temperature" min="0" max="100" step="1" />
                        </div>
                        <Button :color="buttonColor.Secondary" :size="buttonSize.Large" @click="search">
                            Zoeken
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                            </svg>
                        </Button>
                    </div>
                </div>
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
        margin-top: 0.5rem;
        input {
            margin-top: 0;
        }
        button {
            margin: 0;
            // margin-left: 1rem;
            padding: 6px;
            svg {
                width: 16px;
                fill: #fff;
            }
        }
    }

    &__search-toggle {
        display: flex;
        gap: 0.25rem;
        background-color: var(--surface);
        border-radius: 0.25rem;
        margin-bottom: 1rem;
        padding: 0.25rem;
        button {
            width: 100%;
            padding: 0.5rem 1rem;
            background: none;
            border: none;
            cursor: pointer;
            color: var(--text-light);
            border-radius: 0.25rem;
            
            &.active {
                background-color: var(--background);
                color: var(--text);
                font-weight: 600;
            }
        }
    }
    &__regular-search {
        display: flex;
        button {
            width: fit-content;
            margin-left: 1rem;
        }
    }
    &__advanced-search {
        .temp-slider {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 1rem;
            margin-bottom: 1rem;

            label {
                font-weight: 500;
            }

            input[type='range'] {
                flex-grow: 1;
            }
        }
        button {
            display: flex;
            justify-content: center;
            svg {
                margin-left: 0.5rem;
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
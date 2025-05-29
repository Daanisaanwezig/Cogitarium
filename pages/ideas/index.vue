<script setup lang="ts">
import { useBEM } from '~/composable/useBEM'

import Button from '~/components/atoms/Button.vue'
import Input from '~/components/atoms/Input.vue'
import Textarea from '~/components/atoms/Textarea.vue'
import IdeaItem from '~/components/molecules/IdeaItem.vue'

import { buttonSize, buttonColor } from '~/types/button'

import { advancedSearchIdeas, getIdeas, searchIdeas } from '~/services/api'
import type { Idea } from '~/types/idea'

const router = useRouter()

const searching = ref(false)
const searched = ref(false)
const ideas = ref()
const isAdvanced = ref(false)
const searchInput = ref('')
const temperature = ref(0)


const componentName = 'p-ideas-index'
const BEM = useBEM(componentName)

ideas.value = await getIdeas()

function navigate() {
    router.push('/ideas/new')
}
async function search() {
    if (searching.value) return
    searching.value = true
    
    if (!searchInput.value) {
        return searching.value = false
    }

    if (isAdvanced.value) {
        const results: Idea[] = await advancedSearchIdeas(searchInput.value)
        const sorted = sortIdeasWithCreativity(results, temperature.value)
        ideas.value = sorted
    } else {
        const results = await searchIdeas(searchInput.value)
        ideas.value = results
    }
    searched.value = true
    searching.value = false
}

const visibleIdeas = computed(() => {
  return searched.value ? ideas.value.slice(0, 5) : ideas.value
})


function sortIdeasWithCreativity(sortIdeas: Idea[], creativity: number) {
    const sorted = sortIdeas.map(idea => {
        if (! idea.similarity) idea.similarity = "0"
        const sim = parseFloat(idea.similarity) / 100
        const random = Math.random()
        const score = (1 - creativity) * sim + creativity * random
        return { ...idea, score }
    }).sort((a, b) => b.score - a.score)

    ideas.value = sorted
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
                            <label for="temperature">Creativiteit: {{ temperature }}</label>
                            <input type="range" id="temperature" v-model="temperature" min="0" max="100" step="1" />
                        </div>
                        <div :class="BEM.childClass('advanced-search-buttons')">
                            <Button :color="buttonColor.Secondary" :size="buttonSize.Large" @click="search">
                                Zoeken
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                                </svg>
                            </Button>
                            <Button :color="buttonColor.Secondary" :size="buttonSize.Large" @click="search">
                                Genereren
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"/>
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="BEM.childClass('results')">
                <template v-if="searching">
                    <div :class="BEM.childClass('searching')">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"/>
                        </svg>
                        <p>Ideeën aan het zoeken</p>
                    </div>
                </template>
                <template v-else>
                    <IdeaItem v-for="idea in visibleIdeas" :key="idea.id" :idea="idea">
                        <template #title> {{ idea.title }}</template>
                        <template #description>{{ idea.description }}</template>
                    </IdeaItem>
                </template>
                <button @click="sortIdeasWithCreativity(ideas, temperature)" :class="BEM.childClass('shuffle')" v-if="searched">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6l0-32-32 0c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96l32 0 0-32c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6l0-32-32 0c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8l32 0 0-32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z"/>
                    </svg>
                </button>
                <button @click="navigate()" :class="BEM.childClass('new-idea')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
                    </svg>
                </button>
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
    &__advanced-search-buttons {
        display: flex;
        gap: 0.5rem;
    }
    
    &__results {
        display: grid;
        gap: 1rem;
        background-color: var(--background);
        padding-top: 1rem;
    }
    &__searching {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
        svg {
            width: 2rem;
            margin-right: 0.5rem;
        }
    }

    &__shuffle {
        position: fixed;
        left: 0;
        bottom: 0;
        background: var(--secondary);
    }
    &__new-idea {
        position: fixed;
        right: 0;
        background: var(--primary);
    }
    &__shuffle,
    &__new-idea {
        bottom: 0;
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: none;
        margin: 1rem;
        svg {
            fill: var(--surface);
            width: 1.25rem;
            height: 1.25rem;
        }
    }
}
</style>
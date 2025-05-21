<script setup lang="ts">
import { useBEM } from '~/composable/useBEM'

import Header from '~/components/organisms/Header.vue'
import Button from '~/components/atoms/Button.vue'

import { buttonSize, buttonColor } from '~/types/button'

import { getIdea, removeIdea } from '~/services/api'

const componentName = 'p-idea-detail'
const BEM = useBEM(componentName)

const route = useRoute()
const ideaId = route.params.id
let idea = await getIdea(parseInt(ideaId as string))

function remove() {
    removeIdea(idea)
}
</script>
<template>
    <!-- Add idea detail page -->
    <div class="container">
        <Header>Idee</Header>
        <h2>{{ idea.title }}</h2>
        <p v-html="idea.description.replaceAll('\n', '<br>')"></p>

        <Button :size="buttonSize.Small" :color="buttonColor.Primary" :class="BEM.childClass('remove-button')" @click="remove()">Verwijderen</Button>
    </div>
</template>
<style lang="scss">
$componentName: 'p-idea-detail';

.#{$componentName} {
    &__remove-button {
        width: fit-content;
        margin-left: auto;
    }
}
</style>
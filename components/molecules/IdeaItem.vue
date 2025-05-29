<script setup lang="ts">
// Composables
import { useBEM } from '~/composables/useBEM'

// Types
import type { Idea } from '~/types/idea'

const componentName = 'm-idea-item'
const BEM = useBEM(componentName)

defineProps<{
    idea: Idea
}>()
</script>
<template>
    <NuxtLink :to="`/ideas/${idea.id}`" :class="componentName">
        <h2 :class="BEM.childClass('title')">
            <slot name="title" />
        </h2>
        <p :class="BEM.childClass('text')">
            <slot name="description" />
        </p>
        <p :class="BEM.childClass('link')">Lees meer →</p>
    </NuxtLink>
</template>

<style lang="scss">
$componentName: 'm-idea-item';

.#{$componentName} {
    background-color: var(--surface);
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-decoration: none;

    &__title {
        color: var(--text);
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
    }

    &__text {
        color: var(--text-light);
        font-size: 0.9rem;
        margin: 0;
    }

    &__link {
        color: var(--primary);
        font-weight: 500;
        font-size: 0.9rem;
        text-decoration: none;
        margin-top: auto;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
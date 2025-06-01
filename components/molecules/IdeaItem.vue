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
        <div :class="BEM.childClass('icon')">
            <Icon name="mdi:note-text-outline"></Icon>
        </div>
        <div :class="BEM.childClass('content')">
            <h2 :class="BEM.childClass('title')">
                <slot name="title" />
            </h2>
            <p :class="BEM.childClass('text')">
                <slot name="description" />
            </p>
            <p :class="BEM.childClass('link')">Read more →</p>
        </div>
    </NuxtLink>
</template>

<style lang="scss">
$componentName: 'm-idea-item';

.#{$componentName} {
    background-color: var(--surface);
    display: flex;
    color: var(--color-text-primary);
    text-decoration: none;
    gap: 1rem;

    &__icon {
        flex-shrink: 0;
        height: fit-content;
        padding: 12px;
        background-color: var(--color-surface);
        border-radius: var(--radius-default);
        line-height: 0;
        i {
            width: var(--spacing-lg);
            height: var(--spacing-lg);
        }
    }
    &__content {
        width: fit-content;
    }

    &__title {
        color: var(--text);
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
        margin-bottom: 0.25rem;
    }

    &__text {
        color: var(--text-light);
        margin: 0;
        margin-bottom: 0.25rem;
    }
    
    &__link {
        color: var(--color-text-secondary);
        font-weight: 500;
        font-size: var(--font-size-small);
        text-decoration: none;
        margin-top: auto;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
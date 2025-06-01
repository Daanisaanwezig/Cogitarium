<script setup lang="ts">
import { useBEM } from '~/composables/useBEM';
import type { TabType } from '~/types/search';

const componentName = 'm-tab-switcher';
const BEM = useBEM(componentName);

const props = defineProps<{
    modelValue: TabType;
}>();
const emit = defineEmits(['update:modelValue']);

function select(tab: TabType) {
    emit('update:modelValue', tab);
}
</script>
<template>
    <div :class="componentName">
        <button v-for="tab in ['simple', 'advanced']" :key="tab" :class="[
            BEM.modifierClass(tab),
            props.modelValue === tab && BEM.modifierClass('active')
        ]" @click="select(tab as TabType)">
            {{ tab }}
        </button>
    </div>
</template>
<style lang="scss">
$componentName: 'm-tab-switcher';

.#{$componentName} {
    background-color: var(--color-surface);
    display: flex;
    margin-top: var(--spacing-lg);
    border-radius: var(--radius-default);

    &--simple,
    &--advanced {
        flex: 1 1;
        justify-content: center;
        background: none;
        border: none;
        border-radius: var(--radius-default);
        margin: var(--spacing-xs);
        padding: var(--spacing-sm) var(--spacing-md);
        color: var(--color-text-secondary);
        cursor: pointer;
    }

    &--active {
        background: var(--color-background);
        font-weight: var(--font-weight-bold);
        color: var(--color-text-primary)
    }
}
</style>
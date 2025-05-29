<script setup lang="ts">
import { useBEM } from '~/composables/useBEM';
import type { ButtonType } from '~/types/Button';

const componentName = 'a-button';
const BEM = useBEM(componentName);

const props = defineProps<{
    type: ButtonType;
    disabled: boolean;
}>();

const emit = defineEmits(['click']);

function handleClick(e: MouseEvent) {
    if (!props.disabled) {
        emit('click', e);
    }
}
</script>

<template>
    <button :class="[
        componentName,
        BEM.modifierClass(props.type),
        props.disabled && BEM.modifierClass('disabled')
    ]" :disabled="props.disabled" @click="handleClick">
        <slot />
    </button>
</template>

<style lang="scss">
$componentName: 'a-button';

.#{$componentName} {
    font-family: var(--font-family-sans);
    font-weight: var(--font-weight-medium);
    border-radius: var(--radius-default);
    border: var(--border-width) var(--border-style) var(--border-color);
    padding: var(--spacing-sm) var(--spacing-md);
    cursor: pointer;
    transition: background-color 150ms ease;

    &--primary {
        background-color: var(--color-primary);
        color: var(--color-text-white);

        &:hover:not(&--disabled) {
            background-color: var(--color-primary-light);
        }
    }

    &--disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
}
</style>
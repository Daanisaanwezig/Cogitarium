<script setup lang="ts">
import { useBEM } from '~/composables/useBEM';

const componentName = 'a-textarea';
const BEM = useBEM(componentName);

const props = defineProps<{
    modelValue: string;
    placeholder?: string;
    rows?: number;
}>();
const emit = defineEmits(['update:modelValue']);

function onInput(e: Event) {
    const val = (e.target as HTMLTextAreaElement).value;
    emit('update:modelValue', val);
}
</script>
<template>
    <textarea :class="componentName" :value="props.modelValue" :placeholder="props.placeholder" :rows="props.rows || 3" @input="onInput" />
</template>
<style lang="scss">
$componentName: 'a-textarea';

.#{$componentName} {
    font-family: var(--font-family-sans);
    font-size: var(--font-size-base);
    border: var(--border-width) var(--border-style) var(--border-color);
    border-radius: var(--radius-default);
    padding: var(--spacing-sm) var(--spacing-md);
    width: 100%;
    resize: vertical;
    background: var(--color-surface);
    color: var(--color-text-secondary)
}
</style>
<script setup lang="ts">
import { useBEM } from '~/composable/useBEM'

const componentName = 'a-input'
const BEM = useBEM(componentName)
defineProps<{
    required?: boolean,
    placeholder?: string,
    name: string,
    modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])

function onInput(event: Event) {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}
</script>
<template>
    <input  type="text"
            :placeholder="placeholder"
            :required="required"
            :class="componentName"
            :name="name"
            :value="modelValue"
            @input="onInput">
</template>

<style lang="scss">
$componentName: 'a-input';

.#{$componentName} {
    width: 100%;
    margin-top: 16px;
    padding: 8px;
    border: none;
    border-bottom: 1px solid transparent;
    border-radius: 4px;
    background-color: var(--surface);
    color: var(--text);

    &:focus,
    &:focus-visible {
        outline: none;
        border-bottom-color: var(--text);
    }
}
</style>
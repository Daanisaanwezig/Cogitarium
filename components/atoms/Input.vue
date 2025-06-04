<script setup lang="ts">
import { useBEM } from '~/composables/useBEM';

const componentName = 'a-input';
const BEM = useBEM(componentName);

const props = defineProps<{
    modelValue: string;
    placeholder?: string;
}>();
const emit = defineEmits(['update:modelValue']);

function onInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    emit('update:modelValue', val);
}

const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({
  focus: () => inputRef.value?.focus(),
  el: inputRef
});
</script>
<template>
    <input ref="inputRef" :class="componentName" :value="props.modelValue" :placeholder="props.placeholder" @input="onInput" />
</template>
<style lang="scss">
$componentName: 'a-input';

.#{$componentName} {
    font-size: var(--font-size-base);
    border: var(--border-width) var(--border-style) var(--border-color);
    border-radius: var(--radius-default);
    padding: var(--spacing-sm) var(--spacing-md);
    width: 100%;
    background: var(--color-surface);
    color: var(--color-text-secondary)
}
</style>
<script setup lang="ts">
import { useBEM } from '~/composables/useBEM';

const componentName = 'm-slider-input';
const BEM = useBEM(componentName);

const props = defineProps<{
    modelValue: number;
    min: number;
    max: number;
}>();
const emit = defineEmits(['update:modelValue']);

function onInput(e: Event) {
    emit('update:modelValue', Number((e.target as HTMLInputElement).value));
}
</script>
<template>
    <div :class="componentName">
        <label>{{ props.modelValue }}</label>
        <input type="range" :min="props.min" :max="props.max" :value="props.modelValue" @input="onInput" />
    </div>
</template>
<style lang="scss">
$componentName: 'm-slider-input';

.#{$componentName} {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}
</style>
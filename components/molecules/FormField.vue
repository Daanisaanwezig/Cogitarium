<script setup lang="ts">
import { useBEM } from '~/composable/useBEM'

const componentName = 'm-form-field'
const BEM = useBEM(componentName)

defineProps<{
    id?: string,
}>()
</script>
<template>
    <div :class="componentName">
        <label :for="id" :class="BEM.childClass('label')"><slot name="label"/></label>
        <div :class="BEM.childClass('input')">
            <slot name="input" />
        </div>
    </div>
</template>

<style lang="scss">
$componentName: 'm-form-field';

.#{$componentName} {
    margin-top: 8px;
    &__label {
        margin-bottom: 4px;
        font-size: 12px;
        color: var(--text-light);
    }
    &__input {
        background: var(--surface);
        border-radius: 4px;
        overflow: hidden;
        > * {
            margin-top: 0;
            padding: 8px 12px;
        }
    }
}
</style>
<script setup lang="ts">
import { useBEM } from '~/composable/useBEM'

import { buttonSize, buttonColor } from '~/types/button';

const componentName = 'a-button'
const BEM = useBEM(componentName)

defineProps<{
    size?: buttonSize,
    color?: buttonColor
}>()
</script>
<template>
    <button :class="[componentName, size ? BEM.modifierClass(size.toString().toLowerCase()) : '', color ? BEM.modifierClass(color.toString().toLowerCase()) : '']"><slot/></button>
</template>

<style lang="scss">
$componentName: 'a-button';

.#{$componentName} {
    display: block;
    width: 100%;
    margin-top: 24px;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;

    transition: 0.2s ease;

    &:hover {
        cursor: pointer;
    }

    &--large {
        padding: 6px;
    }
    &--small {
        padding: 4px;
    }
    &--primary {
        background: var(--primary);
        &:hover,
        &:focus {
            box-shadow: inset 0 -4px 0 0 var(--primary-light);
            outline: none;
        }
    }
    &--secondary {
        background: var(--secondary);
    }
    &--accent {
        background: var(--accent);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}
</style>
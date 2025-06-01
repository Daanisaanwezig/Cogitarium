<script setup lang="ts">
import { useBEM } from '~/composables/useBEM'
import Button from '~/components/atoms/Button.vue'

const componentName = 'o-header'
const BEM = useBEM(componentName)
const router = useRouter()

function goBack() {
  router.back()
}
</script>
<template>
  <div :class="componentName">
    <button :class="BEM.childClass('back-button')" @click="goBack">
      <Icon name="mdi-arrow-left"></Icon>
    </button>
    <div :class="BEM.childClass('title')">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
$componentName: 'o-header';

.#{$componentName} {
  display: flex;
  align-items: center;
  padding: 12px 0;
  &__back-button {
    position: absolute;
    width: fit-content;
    margin-top: 0;
    background: transparent;
    border: none;
    outline: none;
    font-size: var(--font-size-lg);
    cursor: pointer;
  }
  &__title {
    flex: 1;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text);
  }
}
</style>
<script setup lang="ts">
import { useBEM } from '~/composable/useBEM'
import Button from '~/components/atoms/Button.vue'
import { useRouter } from 'vue-router'
import { buttonSize, buttonColor } from '~/types/button'

const componentName = 'o-header'
const BEM = useBEM(componentName)
const router = useRouter()

function goBack() {
  router.back()
}
</script>
<template>
  <div :class="componentName">
    <Button class="header-back-button" :color="buttonColor.Primary" :size="buttonSize.Small" @click="goBack">
      <!-- Simple left arrow SVG icon -->
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;"><path d="M12 15L7 10L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </Button>
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
  .header-back-button {
    position: absolute;
    width: fit-content;
    margin-top: 0;
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
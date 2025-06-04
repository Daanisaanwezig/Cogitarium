<script setup lang="ts">
import { useBEM } from '~/composables/useBEM';
import type { Message } from '~/types/message';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();
const componentName = 'm-message-bubble';
const BEM = useBEM(componentName);
const props = defineProps<Message>();
</script>

<template>
  <div :class="[componentName, BEM.modifierClass(props.sender)]">
    <div :class="BEM.childClass('icon')">
      <Icon v-if="props.sender == 'ai'" name="mdi:stars"></Icon>
      <Icon v-else name="mdi:user"></Icon>
    </div>
    <div :class="BEM.childClass('container')">
      <button :class="BEM.childClass('save-idea')" v-if="props.sender == 'ai'">Save idea <Icon name="mdi:plus"></Icon></button>
      <div :class="BEM.childClass('content')">
        <p :class="BEM.childClass('text')" v-html="md.render(props.text.replace(/\n/g, '  \n'))"></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$componentName: 'm-message-bubble';

.#{$componentName} {
  display: flex;
  align-items: flex-end;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);

  &--user {
    flex-direction: row-reverse;
  }

  &--ai {
    flex-direction: row;
  }

  &__icon {
    width: 40px;
    height: 40px;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    background-color: var(--color-surface);
    color: var(--color-primary);
    border-radius: 50%;
    font-size: 24px;
  }

  &__container {
    width: 100%;
  }
  &--user &__container {
    justify-items: end;

  }
  &--ai &__container {
    justify-items: start;
  }

  &__save-idea {
    background-color: transparent;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    color: var(--color-primary);
    margin-bottom: var(--spacing-xs);
    span {
      margin-left: var(--spacing-xs);
    }
  }

  &__content {
    background-color: var(--color-surface);
    border: var(--border-width) var(--border-style) var(--color-border);
    border-radius: var(--radius-default);
    padding: var(--spacing-sm) var(--spacing-md);
    width: 100%;
  }

  &__text {
    margin: 0;
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    overflow-wrap: break-word;
    p:not(:last-child) {
      margin-bottom: var(--spacing-sm);
    }
    ul {
      padding-left: var(--spacing-md);
    }
  }

  &__time {
    display: block;
    margin-top: var(--spacing-xs);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    text-align: right;
  }
}
</style>
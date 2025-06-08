<script setup lang="ts">
import { ref } from 'vue';
import { useBEM } from '~/composables/useBEM';
import ChatList from '~/components/organisms/ChatList.vue';
import Input from '~/components/atoms/Input.vue';
import Textarea from '~/components/atoms/Textarea.vue';
import Button from '~/components/atoms/Button.vue';
import Header from '~/components/organisms/Header.vue';
import TabBar from '~/components/organisms/TabBar.vue';
import { useChat } from '~/composables/useChat';
import { ButtonType } from '~/types/Button';

const componentName = 'p-inspire-chat';
const BEM = useBEM(componentName);

const { messages, sendMessage } = useChat();
const currentInput = ref<string>('');
const useTextarea = ref<boolean>()
const inputComponent = ref();
const textareaComponent = ref();

function onSend() {
  if (currentInput.value.trim()) {
    sendMessage(currentInput.value);
    currentInput.value = '';
  }
}

watch(currentInput, async(value, oldValue) => {
  if (value.length > 20) {
    useTextarea.value = true;
    await nextTick();
    textareaComponent.value?.focus?.();
  } else {
    useTextarea.value = false;
    await nextTick();
    inputComponent.value?.focus?.();
  }
})
</script>

<template>
  <div :class="componentName">
    <Header>Chat</Header>

    <ChatList :messages="messages" />

    <div :class="[BEM.childClass('input-area'), BEM.childClass(useTextarea ? 'input-area--textarea' : 'input-area--input')]">
      <Input
        v-if="!useTextarea"
        ref="inputComponent"
        v-model="currentInput"
        placeholder="Ask Inspire AI..."
        :class="BEM.childClass('input')"
        @keyup.enter="onSend"
      />
      <Textarea
        v-else
        ref="textareaComponent"
        v-model="currentInput"
        :placeholder="'Ask inspire AI...'"
        :class="BEM.childClass('input--extended')"
        :rows="5">
      </Textarea>

      <Button :class="BEM.childClass('submit-button')" :disabled="!currentInput" :type="ButtonType.Primary" @click="onSend">Send</Button>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<style lang="scss">
$componentName: 'p-inspire-chat';

.#{$componentName} {
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
  margin: var(--spacing-md);

  &__title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    margin: 0;
  }

  &__input-area {
    position: fixed;
    bottom: 5.5rem;
    left: 0;
    width: 100%;
    display: flex;
    padding: var(--spacing-sm);
    gap: var(--spacing-sm);
    background-color: var(--color-background);
    border-top: var(--border-width) var(--border-style) var(--color-border);
  }
  &__input-area--textarea {
    flex-direction: column;
    .#{$componentName}__submit-button {
      width: 100%;
    }
  }
  &__submit-button {
    width: fit-content;
    padding-left: 24px;
    padding-right: 24px;
  }
}
</style>
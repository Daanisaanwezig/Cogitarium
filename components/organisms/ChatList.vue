<script setup lang="ts">
import { useBEM } from '~/composables/useBEM';
import type { Message } from '~/types/message';
import MessageBubble from '~/components/molecules/MessageBubble.vue';

const componentName = 'o-chat-list';
const BEM = useBEM(componentName);

const props = defineProps<{ messages: Message[] }>();
</script>
<template>
    <div :class="componentName">
        <MessageBubble :class="BEM.childClass('message')" v-for="msg in props.messages" v-bind="msg" />
    </div>
</template>
<style lang="scss">
$componentName: 'o-chat-list';

.#{$componentName} {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-md);
    &__message:last-child {
        margin-bottom: 8rem;
    }
}
</style>
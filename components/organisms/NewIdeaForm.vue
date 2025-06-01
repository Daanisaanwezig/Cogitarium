<script setup lang="ts">
import { useBEM } from '~/composables/useBEM';
import Button from '../atoms/Button.vue';
import type { Idea } from '~/types/idea';
import Input from '../atoms/Input.vue';
import Textarea from '../atoms/Textarea.vue';
import { ButtonType } from '~/types/Button';

const componentName = 'o-new-idea-form';
const BEM = useBEM(componentName);

const emit = defineEmits<{
    (event: 'save', payload: Idea): Idea;
}>();

const title = ref('');
const description = ref('');

function save() {
    emit('save', { title: title.value, description: description.value, tags: [] });
}
</script>
<template>
    <div :class="componentName">
        <Input v-model="title" placeholder="Title"></Input>
        <Textarea v-model="description" placeholder="Describe your idea"></Textarea>
        <Button :type="ButtonType.Primary" :disabled="false" @click="save">Save</Button>
    </div>
</template>
<style lang="scss">
$componentName: 'o-new-idea-form';

.#{$componentName} {
    background: var(--color-background);
    border-radius: var(--radius-default);
    padding-top: var(--spacing-md);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}
</style>
<script setup lang="ts">
import { useBEM } from '~/composables/useBEM';
import type { TabType } from '~/types/search';
import { ButtonType } from '~/types/Button';
import Button from '~/components/atoms/Button.vue';
import Input from '~/components/atoms/Input.vue';
import Textarea from '~/components/atoms/Textarea.vue';
import TabSwitcher from '~/components/molecules/TabSwitcher.vue';
import SliderInput from '~/components/molecules/SliderInput.vue';

const props = defineProps<{
    useSearch: Object
}>()

const componentName = 'o-search-form';
const BEM = useBEM(componentName);

const mode = ref<TabType>('simple');
</script>
<template>
    <div :class="componentName">
        <TabSwitcher v-model="mode" @update:modelValue="useSearch.options.value.mode = $event" />
        <div :class="[BEM.childClass('search'), BEM.childClass('simple-search')]" v-if="mode === 'simple'">
            <Input v-model="useSearch.options.value.query" placeholder="Search..." />
            <Button :type="ButtonType.Primary" :disabled="false" @click="useSearch.search">Search</Button>
        </div>
        <div :class="[BEM.childClass('search'), BEM.childClass('advanced-search')]" v-else>
            <Input v-model="useSearch.options.value.query" placeholder="Search..." />
            <Textarea v-model="useSearch.options.value.context" placeholder="Search context"></Textarea>
            <p>Variability</p>
            <SliderInput v-model="useSearch.options.value.diversity" :min="1" :max="100" />
            <Button :type="ButtonType.Primary" :disabled="false" @click="useSearch.search">Search</Button>
        </div>
    </div>
</template>
<style lang="scss">
$componentName: 'o-search-form';

.#{$componentName} {
    &__search {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        padding-top: var(--spacing-md);
    }
}
</style>
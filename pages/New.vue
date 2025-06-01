<script setup lang="ts">
import { useBEM } from '~/composables/useBEM';
import NewIdeaForm from '~/components/organisms/NewIdeaForm.vue';
import type { Idea } from '~/types/idea';
import { IdeaService } from '~/services/IdeaService';
import TabBar from '~/components/organisms/TabBar.vue';

const componentName = 'p-new';
const BEM = useBEM(componentName);

const router = useRouter()
function saveIdea(idea: Idea) {
    IdeaService.saveIdea(idea).then((result) => {
        router.push('/Search');
        // TODO: Show "Idea added" message
    }).catch(error => {
        // TODO: Add error handling
    })
}
</script>
<template>
    <div :class="componentName">
        <h2 :class="BEM.childClass('page-title')">New Idea</h2>
        <NewIdeaForm @save="saveIdea($event)"/>
    </div>
    <TabBar />
</template>
<style lang="scss">
$componentName: 'p-new';

.#{$componentName} {
    margin: var(--spacing-md);
    
    &__page-title {
        margin-top: var(--spacing-md);
        text-align: center;
    }
}
</style>
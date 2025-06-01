<script setup>
import { useRoute } from 'vue-router'
import { useBEM } from '~/composables/useBEM';

const componentName = 'o-tab-bar';
const BEM = useBEM(componentName);

const route = useRoute()

const tabs = [
    { label: 'Home', icon: 'mdi:home', route: '/' },
    { label: 'Search', icon: 'mdi:magnify', route: '/search' },
    { label: 'New', icon: 'mdi:plus', route: '/new' },
    { label: 'Chat', icon: 'mdi:message-outline', route: '/chat' },
    { label: 'Profile', icon: 'mdi:account-outline', route: '/profile' },
]

const isActive = (path) => route.path === path
</script>

<template>
    <nav :class="componentName">
        <NuxtLink v-for="tab in tabs" :key="tab.route" :to="tab.route"
            :class="[{ active: isActive(tab.route) }, BEM.childClass('item')]">
            <Icon :name="tab.icon" :class="BEM.childClass('icon')" />
            <span :class="BEM.childClass('label')">{{ tab.label }}</span>
        </NuxtLink>
    </nav>
</template>

<style lang="scss">
$componentName: 'o-tab-bar';

.#{$componentName} {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: var(--color-background);
    border-top: 1px solid var(--color-border);
    padding: var(--spacing-md);
    
    &__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--color-text-secondary);
        text-decoration: none;
        transition: transform 0.2s ease, color 0.2s ease;
    
        &.router-link-active {
            color: var(--color-text-primary);
        }
    }
    
    &__icon {
        font-size: 24px;
        transition: transform 0.2s ease;
    }
    
    &__label {
        font-size: 12px;
        margin-top: var(--spacing-xs);
        transition: transform 0.2s ease;
    }
}
</style>
